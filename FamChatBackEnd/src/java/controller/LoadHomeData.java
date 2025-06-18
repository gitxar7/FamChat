/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import entity.Chat;
import entity.User;
import entity.UserStatus;
import java.io.File;
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
@WebServlet(name = "LoadHomeData", urlPatterns = {"/LoadHomeData"})
public class LoadHomeData extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject resp_json = new JsonObject();
        resp_json.addProperty("success", false);
        resp_json.addProperty("message", "Unable to process your request");
        try {

            Session session = HibernateUtil.getSessionFactory().openSession();
            String userId = req.getParameter("id");
            String serverPath = req.getServletContext().getRealPath("");

            User user = (User) session.get(User.class, Integer.parseInt(userId));
            UserStatus userStatus = (UserStatus) session.get(UserStatus.class, 1);

            user.setUserStatus(userStatus);
            session.update(user);

            JsonObject user_json = new JsonObject();
            user_json.addProperty("mobile", user.getMobile());
            user_json.addProperty("name", user.getFname() + " " + user.getLname());
            user_json.addProperty("date", new SimpleDateFormat("yyyy, MM dd | hh:mm a").format(user.getDatetime()));

            String userAvatar = serverPath + File.separator + "AvatarImages" + File.separator + user.getMobile() + ".png";
            File userAvatarFile = new File(userAvatar);

            if (userAvatarFile.exists()) {
                user_json.addProperty("avatar", true);
            } else {
                user_json.addProperty("avatar", false);
                user_json.addProperty("avatar_letters", user.getFname().charAt(0) + "" + user.getLname().charAt(0));
            }

            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.ne("id", user.getId()));
            List<User> users = criteria.list();

            JsonArray chat_array = new JsonArray();

            for (User user1 : users) {
//                user1.setPassword(null);

                Criteria criteria1 = session.createCriteria(Chat.class);
                criteria1.add(Restrictions.or(
                        Restrictions.and(
                                Restrictions.eq("from", user1),
                                Restrictions.eq("to", user)
                        ),
                        Restrictions.and(
                                Restrictions.eq("from", user),
                                Restrictions.eq("to", user1)
                        )
                ));
                criteria1.addOrder(Order.desc("id"));
                criteria1.setMaxResults(1);
                List<Chat> chats = criteria1.list();

                JsonObject chat_item = new JsonObject();
                chat_item.addProperty("f_id", user1.getId());
                chat_item.addProperty("f_mobile", user1.getMobile());
                chat_item.addProperty("f_user_status", user1.getUserStatus().getId());
                chat_item.addProperty("f_name", user1.getFname() + " " + user1.getLname());

                String foreignUserAvatar = serverPath + File.separator + "AvatarImages" + File.separator + user1.getMobile() + ".png";
                File foreignUserAvatarFile = new File(foreignUserAvatar);

                if (foreignUserAvatarFile.exists()) {
                    chat_item.addProperty("f_avatar", true);
                } else {
                    chat_item.addProperty("f_avatar", false);
                    chat_item.addProperty("f_avatar_letters", user1.getFname().charAt(0) + "" + user1.getLname().charAt(0));
                }

                if (criteria1.list().isEmpty()) {
                    chat_item.addProperty("f_message", "Start a conversation");
                    chat_item.addProperty("f_date", new SimpleDateFormat("yyyy, MM dd hh:mm a").format(user1.getDatetime()));
                    chat_item.addProperty("f_chat_status", 3);
                } else {
                    chat_item.addProperty("msg_type", chats.get(0).getMessageType().getName());
                    if (chats.get(0).getFrom() == user) {
                        chat_item.addProperty("f_chat_status", chats.get(0).getChatStatus().getId());
                    } else {
                        if (chats.get(0).getChatStatus().getId() == 2) {
                            chat_item.addProperty("new_msg", true);
                        } else {
                            chat_item.addProperty("new_msg", false);
                        }
                        chat_item.addProperty("f_chat_status", 3);
                    }
                    chat_item.addProperty("f_message", chats.get(0).getMessage());
                    chat_item.addProperty("f_date", new SimpleDateFormat("yyyy, MM dd hh a").format(chats.get(0).getDatetime()));

                }

                chat_array.add(chat_item);
            }

            resp_json.addProperty("success", true);
            resp_json.addProperty("message", "Success");
            resp_json.add("user", gson.toJsonTree(user_json));
            resp_json.add("chat_array", gson.toJsonTree(chat_array));

            session.beginTransaction().commit();
            session.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(resp_json));
    }

}
