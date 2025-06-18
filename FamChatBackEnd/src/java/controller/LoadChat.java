/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import entity.Chat;
import entity.ChatStatus;
import entity.MessageType;
import entity.User;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author Prince
 */
@WebServlet(name = "LoadChat", urlPatterns = {"/LoadChat"})
public class LoadChat extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Session session = HibernateUtil.getSessionFactory().openSession();
        Gson gson = new Gson();

        String user_id = req.getParameter("id");
        String f_user_id = req.getParameter("f_id");

        User user = (User) session.get(User.class, Integer.parseInt(user_id));
        User f_user = (User) session.get(User.class, Integer.parseInt(f_user_id));

        Criteria criteria = session.createCriteria(Chat.class);
        criteria.add(Restrictions.or(
                Restrictions.and(
                        Restrictions.eq("from", f_user),
                        Restrictions.eq("to", user)
                ),
                Restrictions.and(
                        Restrictions.eq("from", user),
                        Restrictions.eq("to", f_user)
                )
        ));

        criteria.addOrder(Order.asc("datetime"));
        List<Chat> chats = criteria.list();

        ChatStatus chatStatus = (ChatStatus) session.get(ChatStatus.class, 1);
//        MessageType messageType = (MessageType) session.get(MessageType.class, 1);
        System.out.println(chatStatus.getName());
        JsonArray chat_array = new JsonArray();

        for (Chat chat : chats) {
//            System.out.println(chat.getMessage());

            JsonObject chat_json = new JsonObject();
            chat_json.addProperty("id", chat.getId());
            chat_json.addProperty("message", chat.getMessage());
            chat_json.addProperty("type", chat.getMessageType().getId());
            chat_json.addProperty("datetime", new SimpleDateFormat("yyyy, MM dd hh:mm a").format(chat.getDatetime()));

            if (chat.getFrom().getId() == f_user.getId()) {
                chat_json.addProperty("side", "left");
                if (chat.getChatStatus().getId() == 2) {
                    chat.setChatStatus(chatStatus);
                    session.update(chat);
                }
            } else {
                chat_json.addProperty("side", "right");
                chat_json.addProperty("status", chat.getChatStatus().getId());
            }

            chat_array.add(chat_json);
        }

        session.beginTransaction().commit();
        session.close();
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(chat_array));
    }

}
