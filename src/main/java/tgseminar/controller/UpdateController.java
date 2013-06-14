package tgseminar.controller;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;
import org.slim3.datastore.EntityNotFoundRuntimeException;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;

public class UpdateController extends Controller {

	@Override
	protected Navigation run() throws Exception {

		String idString = request.getParameter("id");
		if(idString == null || "".equals(idString))
		{
			response.setStatus(400);
			return null;
		}
		
		int id;
		try{
			id = Integer.parseInt(idString);
		}catch(NumberFormatException e){
			response.setStatus(400);
			return null;
		}
		
		String title = request.getParameter("title");
		if(title == null || "".equals(title))
		{
			response.setStatus(400);
			return null;
		}
		
		Key key = Datastore.createKey("ToDo", id);
		Entity entity = Datastore.getOrNull(key);
		if(entity == null){
			response.setStatus(404);
			return null;
		}
		
		User user = UserServiceFactory.getUserService().getCurrentUser();
		String email = user.getEmail();
		
		String curEmail = entity.getProperty("createBy").toString();
		if(!curEmail.equals(email))
		{
			response.setStatus(404);
			return null;
		}
		
		entity.setProperty("title", title);
		Datastore.put(entity);
		
		response.setStatus(200);
		
		return null;
	}

}
