package tgseminar.controller;

import java.util.Date;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;
import org.slim3.memcache.Memcache;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;

public class PostController extends Controller {

	@Override
	protected Navigation run() throws Exception {
		String title = super.request.getParameter("title");
		//String title = asString("title");
		if(title == null || "".equals(title))
		{
			//response.setStatus(response.SC_BAD_REQUEST);
			response.setStatus(400);
			return null;
		}
		
		User user = UserServiceFactory.getUserService().getCurrentUser();
		String createBy = user.getEmail();
		Date createAt = new Date();
		
		Entity entity = new Entity("ToDo");
		entity.setProperty("title", title);
		entity.setProperty("createBy", createBy);
		entity.setProperty("createAt", createAt);
		Datastore.put(entity);
		Memcache.delete(createBy);
		response.setStatus(200);
		return null;
	}

}
