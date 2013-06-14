package tgseminar.controller;

import java.util.Date;
import java.util.List;

import org.slim3.memcache.Memcache;
import org.slim3.repackaged.org.json.JSONObject;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.memcache.Expiration;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserServiceFactory;

public class ListController extends Controller {

	@Override
	protected Navigation run() throws Exception {

		
		response.setContentType("application/json; charset=UTF-8");
		User user = UserServiceFactory.getUserService().getCurrentUser();
		String email = user.getEmail();
		
		List<Entity> list = Memcache.get(email);
		if(list == null){
			System.out.print("Not hit!");
			list = Datastore.query("ToDo")
					.filter("createBy", FilterOperator.EQUAL, email).sort("createAt",SortDirection.DESCENDING).asList();

			Memcache.put(email, list,Expiration.byDeltaSeconds(60));
		}else{
			System.out.print("hit!");
		}
		System.out.println("list.size="+list.size());


		response.getWriter().println("[");
		
		boolean isFirst = true;
		for(Entity e : list)
		{	
			JSONObject json = new JSONObject();
			json.put("id",e.getKey().getId());
			json.put("title", e.getProperty("title"));
			json.put("createAt", e.getProperty("createAt"));
			
			if(isFirst)
			{
				isFirst = false;
			}
			else
			{
				response.getWriter().println(",");
			}
			response.getWriter().println( json.valueToString(json));
			
		}
		response.getWriter().println("]");
		
		response.setStatus(200);
		response.flushBuffer();
		
		
		return null;
	}

}
