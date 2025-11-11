package com.example;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class EmployeeServlet extends HttpServlet {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/company";
    private static final String USER = "root";
    private static final String PASS = "root";

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String empid = request.getParameter("empid");
        String viewAll = request.getParameter("viewAll");

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(DB_URL, USER, PASS);
            Statement st = con.createStatement();

            ResultSet rs;
            if (viewAll != null) {
                rs = st.executeQuery("SELECT * FROM Employee");
                out.println("<h2>All Employees</h2>");
            } else if (empid != null && !empid.isEmpty()) {
                rs = st.executeQuery("SELECT * FROM Employee WHERE EmpID=" + empid);
                out.println("<h2>Search Result</h2>");
            } else {
                out.println("<h3>No Employee ID Entered</h3>");
                return;
            }

            out.println("<table border='1'><tr><th>ID</th><th>Name</th><th>Salary</th></tr>");
            boolean found = false;
            while (rs.next()) {
                found = true;
                out.println("<tr><td>" + rs.getInt("EmpID") + "</td><td>" + rs.getString("Name") +
                            "</td><td>" + rs.getDouble("Salary") + "</td></tr>");
            }
            out.println("</table>");
            if (!found) out.println("<p>No records found!</p>");

            con.close();
        } catch (Exception e) {
            out.println("<h3>Error: " + e.getMessage() + "</h3>");
        }
        out.close();
    }
}
