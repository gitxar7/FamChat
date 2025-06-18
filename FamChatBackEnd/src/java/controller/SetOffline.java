/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import entity.UserStatus;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Session;

/**
 *
 * @author Prince
 */
@WebServlet(name = "SetOffline", urlPatterns = {"/SetOffline"})
public class SetOffline extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

//        System.out.println("signout");
        
        Session session = HibernateUtil.getSessionFactory().openSession();
        Gson gson = new Gson();
        JsonObject resp_json = new JsonObject();
        resp_json.addProperty("success", false);
        resp_json.addProperty("message", "Unable to process your request");

        String user_id = req.getParameter("id");

        User user = (User) session.get(User.class, Integer.parseInt(user_id));
        UserStatus userStatus = (UserStatus) session.get(UserStatus.class, 2);

        user.setUserStatus(userStatus);
        session.update(user);
        session.beginTransaction().commit();
        session.close();

        resp_json.addProperty("success", true);

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(resp_json));
    }

}
