/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.Chat;
import entity.ChatStatus;
import entity.MessageType;
import entity.User;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import model.HibernateUtil;
import org.hibernate.Session;

/**
 *
 * @author Prince
 */
@MultipartConfig
@WebServlet(name = "SendChat", urlPatterns = {"/SendChat"})
public class SendChat extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Session session = HibernateUtil.getSessionFactory().openSession();
        Gson gson = new Gson();
        JsonObject resp_json = new JsonObject();
        resp_json.addProperty("success", false);
        resp_json.addProperty("message", "Unable to process your request");

        String user_id = req.getParameter("id");
        String f_user_id = req.getParameter("f_id");
        String message = req.getParameter("msg");
        String type_id = req.getParameter("type");
        Part chatImage = req.getPart("image");

        User user = (User) session.get(User.class, Integer.parseInt(user_id));
        User f_user = (User) session.get(User.class, Integer.parseInt(f_user_id));
        MessageType type = (MessageType) session.get(MessageType.class, Integer.parseInt(type_id));

        ChatStatus chatStatus = (ChatStatus) session.get(ChatStatus.class, 2);

        Chat chat = new Chat();
        chat.setChatStatus(chatStatus);
        chat.setDatetime(new Date());
        chat.setFrom(user);
        chat.setTo(f_user);
        chat.setMessage(message);
        chat.setMessageType(type);

        int id = (int) session.save(chat);

        if (chatImage != null) {
            String serverPath = req.getServletContext().getRealPath("");
            String projectRootPath = serverPath.replace("build" + File.separator + "web", "web");
            String avatarPath = projectRootPath + File.separator + "ChatImages" + File.separator + id + ".png";
            File file = new File(avatarPath);
            file.getParentFile().mkdirs();
            Files.copy(chatImage.getInputStream(), file.toPath(), StandardCopyOption.REPLACE_EXISTING);

        }

        session.beginTransaction().commit();
        session.close();

        resp_json.addProperty("success", true);

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(resp_json));
    }

}
