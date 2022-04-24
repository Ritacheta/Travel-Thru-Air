
import java.sql.*;
import java.util.*;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/**
 * Servlet implementation class Flights
 */
@WebServlet("/Flights")
public class Flights extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Flights() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String fromCity = request.getParameter("fromcity");
		String toCity = request.getParameter("tocity");
		String day = request.getParameter("day");
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.addHeader("Access-Control-Allow-Origin", "*");
		ArrayList<String> cols = new ArrayList<String>();
		Collections.addAll(cols, "CARRIER", "SOURCE", "DESTINATION", "RATE", "DEPARTURE", "ARRIVAL", "DAYS", "ECAPACITY", "BCAPACITY", "STOPS", "STOPNAMES");
		try {
			Connection con = (Connection)getServletContext().getAttribute("dbconn");
			Statement stmt=con.createStatement();
			ResultSet rs=stmt.executeQuery(String.format("SELECT * FROM FLIGHTS WHERE SOURCE = '%s' AND DESTINATION = '%s' AND (DAYS = 'ALL' OR DAYS LIKE '%%%s%%')", fromCity, toCity, day));
			PrintWriter out = response.getWriter();
			Map<String, Map<String, String>> flights = new HashMap<String, Map<String, String>>();
			while(rs.next()) {
				Map<String, String> flight= new HashMap<String, String>();
				for(String col: cols) {
					flight.put(col, rs.getString(col));					
				}
				flights.put(rs.getString("ID"), flight);
			}
			rs.close();
			stmt.close();
			JSONObject jobj = new JSONObject(flights);
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
		doGet(request, response);
	}

}
