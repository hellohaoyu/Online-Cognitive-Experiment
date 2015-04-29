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


class Experiment(ndb.Model):
  # userid = ndb.IntegerProperty()
  userid = ndb.StringProperty()
  date = ndb.DateTimeProperty(auto_now_add=True)
  time = ndb.IntegerProperty()

class Player(ndb.Model):
    """Models an individual Guestbook entry with author, content, and date."""
    name = ndb.StringProperty()
    # userid = ndb.IntegerProperty()
    userid = ndb.StringProperty()
    registerDate = ndb.DateTimeProperty(auto_now_add=True)
    experiments = ndb.StructuredProperty(Experiment, repeated=True)

    @classmethod
    def query_Player(cls, ancestor_key):
    	return cls.query(ancestor=ancestor_key)

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
		logging.info(self.request.get("Name"))
		logging.info(self.request.get("ID"))

		qry = Player.query(Player.userid == self.request.get("ID"))
		logging.info(Player.get_by_id(self.request.get("ID")))
		playerid = (self.request.get("ID"))
		logging.info(qry.get())
		if qry.get() == None:
			self.player = Player(parent=ndb.Key("Players", "PlayersKeys"), name = self.request.get("Name"), userid = playerid)
			self.player.put()



class CoinGame(webapp2.RequestHandler):
	def get(self):
		pass
	# 	template = jinja_environment.get_template('coingame.html')
	# 	self.template_value[] = 
	# 	self.response.write(template.render())
	# def post(self):
	# 	logging.info(self.request.get("Name"))
	# 	logging.info(self.request.get("ID"))

	# 	qry = Player.query(Player.userid == self.request.get("ID"))
	# 	logging.info(Player.get_by_id(self.request.get("ID")))
	# 	playerid = (self.request.get("ID"))
	# 	logging.info(qry.get())
	# 	if qry.get() == None:
	# 		self.player = Player(parent=ndb.Key("Players", "PlayersKeys"), name = self.request.get("Name"), userid = playerid)
	# 		self.player.put()
class DiskGame(webapp2.RequestHandler):
	def get(self):
		pass
	# 	# self.response.write("<h1>%s</h1>" % self.request.get("Name"));
	# 	self.response.write("<h1>New Page</h1>");

	# def post(self):
	# 	logging.info(self.request.get("Name"))
	# 	logging.info(self.request.get("ID"))

	# 	qry = Player.query(Player.userid == self.request.get("ID"))
	# 	logging.info(Player.get_by_id(self.request.get("ID")))
	# 	playerid = (self.request.get("ID"))
	# 	logging.info(qry.get())
	# 	if qry.get() == None:
	# 		self.player = Player(parent=ndb.Key("Players", "PlayersKeys"), name = self.request.get("Name"), userid = playerid)
	# 		self.player.put()
app = webapp2.WSGIApplication([('/', MainPage), ('/coingame', CoinGame), ('/diskgame', DiskGame),], debug= True)