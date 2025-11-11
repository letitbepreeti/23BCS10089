package com.example;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String user = request.getParameter("username");
        String pass = request.getParameter("password");

        // Hardcoded validation
        if ("admin".equals(user) && "1234".equals(pass)) {
            out.println("<h2>Welcome, " + user + "!</h2>");
            out.println("<p>Login Successful!</p>");
        } else {
            out.println("<h3 style='color:red;'>Invalid Credentials</h3>");
            out.println("<a href='index.html'>Try Again</a>");
        }
        out.close();
    }
}
