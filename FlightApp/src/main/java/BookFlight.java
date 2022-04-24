

import java.io.IOException;
import java.sql.Connection;
import java.sql.Statement;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class BookFlight
 */
@WebServlet("/BookFlight")
public class BookFlight extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BookFlight() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Date now = new Date();
		String bid = "B" + String.format("%d", now.getTime()).substring(9, 13);
		String fid = request.getParameter("fid");
		String cid = request.getParameter("cid");
		int seats = Integer.parseInt(request.getParameter("seats"));
		String bdate = request.getParameter("bdate");
		String ddate = request.getParameter("ddate");
		response.addHeader("Access-Control-Allow-Origin", "*");
		try {
			Connection con = (Connection)getServletContext().getAttribute("dbconn");
			Statement stmt=con.createStatement();
			int res = stmt.executeUpdate(String.format("INSERT INTO BOOKINGS VALUES ('%s', '%s', '%s', %d, TO_DATE('%s', 'dd/mm/yyyy'), TO_DATE('%s', 'dd/mm/yyyy'))", bid, cid, fid, seats, bdate, ddate));
			if (res>0)
				response.setStatus(200);
			else
				response.setStatus(400);
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
