package tgseminar.controller;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;

import org.junit.Before;
import org.junit.Test;
import org.slim3.datastore.Datastore;
import org.slim3.tester.ControllerTestCase;
import org.slim3.tester.TestEnvironment;

import com.google.appengine.api.datastore.Entity;
import com.google.apphosting.api.ApiProxy;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

public class UpdateControllerTest extends ControllerTestCase {
	
	@Test
	public void respond400IfIdNotSpecified() throws NullPointerException, IllegalArgumentException, IOException, ServletException{
//		tester.param("id", "id");
		tester.param("title", "To-Do #1");
		
		tester.start("/Update");
		
		assertThat(tester.response.getStatus(),is(400));
	}
	
	@Test
	public void respond400IfIdNotNumber() throws NullPointerException, IllegalArgumentException, IOException, ServletException{
		tester.param("id", "isNotNumber");
		tester.param("title", "To-Do #1");
		
		tester.start("/Update");
		
		assertThat(tester.response.getStatus(),is(400));
	}
	
	@Test
	public void respond400IfTitleNotSpecified() throws NullPointerException, IllegalArgumentException, IOException, ServletException{
		tester.param("id", 1);
//		tester.param("title", "To-Do #1");
		
		tester.start("/Update");

		assertThat(tester.response.getStatus(),is(400));
	}
	@Test
	public void respond404IfEntityNotExist() throws NullPointerException, IllegalArgumentException, IOException, ServletException{
		tester.param("id", 3);
		tester.param("title", "To-Do #3");
		
		tester.start("/Update");
		
		assertThat(tester.response.getStatus(),is(404));
	}
	
	@Test
	public void respond404IfEmailIsNotCurrentUser() throws NullPointerException, IllegalArgumentException, IOException, ServletException{
		
		Entity entity = Datastore.getOrNull(Datastore.createKey("ToDo", 1));
		assertThat("pre-condition",entity,is(notNullValue()));
		
		tester.param("id", 1);
		tester.param("title", "To-Do #1");
		tester.start("/Update");
		
		assertThat(tester.response.getStatus(),is(404));
	}

	@Override
	public void setUp() throws Exception {
		super.setUp();
		Entity entity1 = new Entity(Datastore.createKey("ToDo", 1));
		entity1.setProperty("title", "To-Do 1");
		entity1.setProperty("createBy", "hgg1@gmail.com");
		entity1.setProperty("createAt", new Date());
		Entity entity2 = new Entity(Datastore.createKey("ToDo", 2));
		entity2.setProperty("title", "To-Do 2");
		entity2.setProperty("createBy", "hgg2@gmail.com");
		entity2.setProperty("createAt", new Date());
		
		Datastore.put(entity1,entity2);
		
		TestEnvironment env = (TestEnvironment)ApiProxy.getCurrentEnvironment();
		env.setEmail("aaa@gmail.com");
	}
	
	
}

