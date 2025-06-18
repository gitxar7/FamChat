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
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author Prince
 */
@WebServlet(name = "SignIn", urlPatterns = {"/SignIn"})
public class SignIn extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Gson gson = new Gson();
        JsonObject resp_json = new JsonObject();
        resp_json.addProperty("success", false);

        JsonObject req_json = gson.fromJson(req.getReader(), JsonObject.class);
        String mobile = req_json.get("mobile").getAsString();
        String password = req_json.get("password").getAsString();

        if (mobile.isEmpty()) {
            resp_json.addProperty("message", "Please fill mobile number");
        } else if (!Validations.isMobileNumberValid(mobile)) {
            resp_json.addProperty("message", "Invalid mobile");
        } else if (password.isEmpty()) {
            resp_json.addProperty("message", "Please fill password");
//        } else if (!Validations.isPasswordValid(password)) {
//            resp_json.addProperty("message", "Invalid password");
        } else {
            Session session = HibernateUtil.getSessionFactory().openSession();
            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("mobile", mobile));
            criteria.add(Restrictions.eq("password", password));

            if (criteria.list().isEmpty()) {

                resp_json.addProperty("message", "Invalid credentials");
            } else {
                User user = (User) criteria.uniqueResult();
                resp_json.addProperty("success", true);
                resp_json.addProperty("message", "Sign In succesful");
                resp_json.add("user", gson.toJsonTree(user));
            }

            session.close();
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(resp_json));
    }

}
