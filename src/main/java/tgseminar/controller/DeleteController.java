package tgseminar.controller;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;

public class DeleteController extends Controller {

	@Override
	protected Navigation run() throws Exception {

		
		String idStr = request.getParameter("id");
		if (idStr == null || "".equals(idStr)) {
			response.setStatus(response.SC_BAD_REQUEST);
			return null;
		}
		
		int id;
		try {
			
			id =Integer.parseInt(idStr);
		} catch(NumberFormatException e) {
			response.setStatus(400);
			return null;
		}

//		
		Key key = Datastore.createKey("ToDo", id);
		
		Datastore.delete(key);
//		
		response.setStatus(response.SC_OK);
		
		return null;
	}

}
