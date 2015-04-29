from controllers import datastore
import jinja2
import webapp2
import logging
import os
from google.appengine.ext import ndb
from google.appengine.ext import db

jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)


# class Experiment(ndb.Model):
#   player = ndb.UserProperty()
#   date = ndb.DateTimeProperty(auto_now_add=True)
#   time = ndb.IntegerProperty()

# class Player(ndb.Model):
#     """Models an individual Guestbook entry with author, content, and date."""
#     player = ndb.UserProperty()
#     email = ndb.StringProperty()
#     registerDate = ndb.DateTimeProperty(auto_now_add=True)
#     experiments = ndb.StructuredProperty(Experiment, repeated=True)

# class Sample(db.Model):
#   name = db.StringProperty()
#   date = db.DateTimeProperty(auto_now_add=True)
#   time = db.IntegerProperty()


class MainPage(webapp2.RequestHandler):
	def get(self):
		template = jinja_environment.get_template('index.html')
		self.response.write(template.render(name="haoyu"))
		self.alldata = datastore.Sample.all()
		# logging.info(self.alldata)
		# i = 0
		# for self.data in self.alldata:
		# 	i = i + 1
		# 	# logging.info(data.name)
		# 	logging.info("Testing log: " + str(i) )
		# 	self.response.write("<span> Name: %s</span>" %  self.data.name)
		# 	self.response.write("<span> Time: %s</span><br>" % self.data.time)
		# 	# self.response.write('<p> date: </p><p>%s</p>' % data.date)

		# self.response.write(""" 
		# 	Enter your comment: 
		# 	<form method="post">
		# 	<span>UserName</span> <input type= "textarea" name="name">
		# 	<span>Time</span><input type= "textarea" name="time">
		# 	<input type="submit">
		# 	</form>""")
		# self.response.write("</body></html>");

	def post(self):
		Username = self.request.get("name")
		Costtime = int(self.request.get("time"))
		self.sample = datastore.Sample(name = Username, time = Costtime)
		self.sample.put()
		self.redirect("/")

app = webapp2.WSGIApplication([('/', MainPage)], debug= True)