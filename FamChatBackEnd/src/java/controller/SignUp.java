/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import entity.UserStatus;
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
import model.Validations;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author Prince
 */
@MultipartConfig
@WebServlet(name = "SignUp", urlPatterns = {"/SignUp"})
public class SignUp extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Gson gson = new Gson();
        JsonObject resp_json = new JsonObject();
        resp_json.addProperty("success", false);

        String mobile = req.getParameter("mobile");
        String fname = req.getParameter("fname");
        String lname = req.getParameter("lname");
        String password = req.getParameter("password");
        Part avatarImage = req.getPart("avatarImage");

        if (mobile.isEmpty()) {
            resp_json.addProperty("message", "Please fill mobile number");
        } else if (!Validations.isMobileNumberValid(mobile)) {
            resp_json.addProperty("message", "Invalid mobile");
        } else if (fname.isEmpty()) {
            resp_json.addProperty("message", "Please fill first name");
        } else if (lname.isEmpty()) {
            resp_json.addProperty("message", "Please fill last name");
        } else if (password.isEmpty()) {
            resp_json.addProperty("message", "Please fill password");
        } else if (!Validations.isPasswordValid(password)) {
            resp_json.addProperty("message", "Invalid password");
        } else {
            Session session = HibernateUtil.getSessionFactory().openSession();
            Criteria criteria = session.createCriteria(User.class);
            criteria.add(Restrictions.eq("mobile", mobile));

            if (criteria.list().isEmpty()) {
                User user = new User();
                user.setMobile(mobile);
                user.setFname(fname);
                user.setLname(lname);
                user.setPassword(password);
                user.setDatetime(new Date());

                UserStatus status = (UserStatus) session.get(UserStatus.class, 2);
                user.setUserStatus(status);

                session.save(user);
                session.beginTransaction().commit();

                if (avatarImage != null) {
                    String serverPath = req.getServletContext().getRealPath("");
                    String projectRootPath = serverPath.replace("build" + File.separator + "web", "web");
                    String avatarPath = projectRootPath + File.separator + "AvatarImages" + File.separator + mobile + ".png";
                    File file = new File(avatarPath);
                    file.getParentFile().mkdirs();
                    Files.copy(avatarImage.getInputStream(), file.toPath(), StandardCopyOption.REPLACE_EXISTING);

                }

                resp_json.addProperty("success", true);
                resp_json.addProperty("message", "Registration complete");
            } else {
                resp_json.addProperty("message", "User already exists");
            }

            session.close();
        }
        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(resp_json));
    }

}
