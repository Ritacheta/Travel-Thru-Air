

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/**
 * Servlet implementation class Bookings
 */
@WebServlet("/Bookings")
public class Bookings extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Bookings() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String cid = request.getParameter("cid");
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.addHeader("Access-Control-Allow-Origin", "*");
		ArrayList<String> cols = new ArrayList<String>();
		Collections.addAll(cols, "CUSTOMERID", "FLIGHTID", "SEATS", "BOOKINGDATE", "DEPARTUREDATE");
		try {
			Connection con = (Connection)getServletContext().getAttribute("dbconn");
			Statement stmt=con.createStatement();
			ResultSet rs=stmt.executeQuery(String.format("SELECT * FROM BOOKINGS WHERE CUSTOMERID = '%s'", cid));
			Map<String, Map<String, String>> bookings = new HashMap<String, Map<String, String>>();
			while(rs.next()) {
				Map<String, String> booking= new HashMap<String, String>();
				for(String col: cols) {
					booking.put(col, rs.getString(col));
				}
				bookings.put(rs.getString("BOOKINGID"), booking);
			}
			rs.close();
			stmt.close();
			PrintWriter out = response.getWriter();
			JSONObject jobj = new JSONObject(bookings);
			out.print(jobj.toString());
			out.flush();
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
		
	}

}
