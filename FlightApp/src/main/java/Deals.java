

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/**
 * Servlet implementation class Deals
 */
@WebServlet("/Deals")
public class Deals extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Deals() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.addHeader("Access-Control-Allow-Origin", "*");
		ArrayList<String> cols = new ArrayList<String>();
		Collections.addAll(cols, "CARRIER", "SOURCE", "DESTINATION", "RATE", "DEPARTURE", "ARRIVAL", "DAYS", "ECAPACITY", "BCAPACITY", "STOPS", "STOPNAMES");
		try {
			Connection con = (Connection)getServletContext().getAttribute("dbconn");
			Statement stmt=con.createStatement();
			ResultSet rs=stmt.executeQuery("SELECT * FROM FLIGHTDEALS");
			Map<String, Map<String, String>> deals = new HashMap<String, Map<String, String>>();
			while(rs.next()) {
				String id = rs.getString("FLIGHTID");
				String discount = rs.getString("DISCOUNT");
				Map<String, String> flight= new HashMap<String, String>();
				stmt=con.createStatement();
				ResultSet rs2 = stmt.executeQuery(String.format("SELECT * FROM FLIGHTS WHERE ID = '%s'", id));
				rs2.next();
				for(String col: cols) {
					flight.put(col, rs2.getString(col));					
				}
				rs2.close();
				flight.put("DISCOUNT", discount);
				deals.put(id, flight);
				stmt.close();
			}
			rs.close();
			stmt.close();
			PrintWriter out = response.getWriter();
			JSONObject jobj = new JSONObject(deals);
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
		String fid = request.getParameter("fid");
		int discount = Integer.parseInt(request.getParameter("discount"));
		response.addHeader("Access-Control-Allow-Origin", "*");
		try {
			Connection con = (Connection)getServletContext().getAttribute("dbconn");
			Statement stmt=con.createStatement();
			int res = stmt.executeUpdate(String.format("INSERT INTO FLIGHTDEALS VALUES ('%s', %d)", fid, discount));
			if (res>0)
				response.setStatus(200);
			else
				response.setStatus(400);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
