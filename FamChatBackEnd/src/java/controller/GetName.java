/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.HibernateUtil;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author Prince
 */
@WebServlet(name = "GetName", urlPatterns = {"/GetName"})
public class GetName extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject resp_json = new JsonObject();
        resp_json.addProperty("name", "");

        String mobile = req.getParameter("mobile");
        Session session = HibernateUtil.getSessionFactory().openSession();

        Criteria criteria = session.createCriteria(User.class);
        criteria.add(Restrictions.eq("mobile", mobile));

        if (!criteria.list().isEmpty()) {
            User user = (User) criteria.uniqueResult();
            String avatarLetters = user.getFname().charAt(0) + "" + user.getLname().charAt(0);
            resp_json.addProperty("name", avatarLetters);
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(resp_json));
        session.close();

    }

}
