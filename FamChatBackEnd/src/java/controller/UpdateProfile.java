/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
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
@WebServlet(name = "UpdateProfile", urlPatterns = {"/UpdateProfile"})
public class UpdateProfile extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        Session session = HibernateUtil.getSessionFactory().openSession();

        Gson gson = new Gson();
        JsonObject resp_json = new JsonObject();
        resp_json.addProperty("success", false);
        resp_json.addProperty("message", "Unable to process your request");

        String id = req.getParameter("id");
        User user = (User) session.get(User.class, Integer.parseInt(id));
        Part avatarImage = req.getPart("avatarImage");

        if (avatarImage != null) {
            String serverPath = req.getServletContext().getRealPath("");
            String projectRootPath = serverPath.replace("build" + File.separator + "web", "web");
            String avatarPath = projectRootPath + File.separator + "AvatarImages" + File.separator + user.getMobile() + ".png";
//            String serverPath = req.getServletContext().getRealPath("");
//            String avatarPath = serverPath + File.separator + "AvatarImages" + File.separator + user.getMobile() + ".png";
            File file = new File(avatarPath);
//            file.delete();
            Files.copy(avatarImage.getInputStream(), file.toPath(), StandardCopyOption.REPLACE_EXISTING);
            resp_json.addProperty("success", true);
        }

        resp.setContentType("application/json");
        resp.getWriter().write(gson.toJson(resp_json));
    }

}
