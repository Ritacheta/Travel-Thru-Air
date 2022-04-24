

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class Auth
 */
@WebServlet("/Auth")
public class Auth extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Auth() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.addHeader("Access-Control-Allow-Origin", "*");
		String cid = request.getParameter("cid");
		String pwd = request.getParameter("pwd");
		try {
			if (!(cid == null || pwd==null)) {
				Connection con = (Connection)getServletContext().getAttribute("dbconn");
				Statement stmt=con.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE, ResultSet.CONCUR_READ_ONLY);
				ResultSet rs=stmt.executeQuery(String.format("SELECT * FROM CUSTOMERS WHERE CID = '%s'", cid));
				response.setContentType("text/*");
				PrintWriter out = response.getWriter();
				int rows = 0;
				rs.last();
				rows = rs.getRow();
				rs.beforeFirst();
				rs.next();
				if(rows > 0 && rs.getString("PASSWORD").equals(pwd)) {
					out.print("SUCCESS");
				}
				else if (rows == 0) {
					Statement stmt2=con.createStatement();
					stmt2.executeUpdate(String.format("INSERT INTO CUSTOMERS VALUES ('%s', '%s')", cid, pwd));
					stmt2.close();
					out.print("SUCCESS");
				}
				else {
					out.print("ERROR");
				}
				stmt.close();
				out.flush();
			}
			else {
				PrintWriter out = response.getWriter();
				out.print("ERROR");
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
