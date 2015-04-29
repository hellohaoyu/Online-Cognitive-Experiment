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
template_value = {'is_Login': False}

class Experiment(ndb.Model):
  # userid = ndb.IntegerProperty()
  userid = ndb.StringProperty()
  date = ndb.DateTimeProperty(auto_now_add=True)
  time = ndb.StringProperty()

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
		logging.info("Get MainPage" )
		global template_value
		logging.info(template_value )
		template = jinja_environment.get_template('index.html')
		self.response.write(template.render(template_value))


	def post(self):
		logging.info("Post MainPage" )
		global template_value
		template_value['is_Login'] = True
		template_value['name'] = self.request.get("Name")
		template_value['ID'] = self.request.get("ID")
		self.redirect('/')
		qry = Player.query(Player.userid == self.request.get("ID"))
		# logging.info(Player.get_by_id(self.request.get("ID")))
		playerid = (self.request.get("ID"))
		# logging.info(qry.get())
		# logging.info("AddExperiment")
		if (qry.get() == None) and (self.request.get("Type") == "AddUser") :
			logging.info("AddUser")
			self.player = Player(parent=ndb.Key("Players", "PlayersKeys"), name = self.request.get("Name"), userid = playerid)
			self.player.put()

		if (self.request.get("Type") == "AddExperiment"):
			logging.info("AddExperiment")
			self.experiment = Experiment(parent=ndb.Key("Experiments", self.request.get("ID")), userid = playerid, time = self.request.get("TimeCost"))
			myplayer = qry.get()
			myplayer.experiments.append(self.experiment)
			myplayer.put()

		template_value['is_Play_CoinGame'] = False
		template_value['is_Play_DiskGame'] = False

		if self.request.get("GameId") == '1':
			template_value['is_Play_CoinGame'] = True
		else:
			template_value['is_Play_DiskGame'] = True

		# template = jinja_environment.get_template('index.html')
		# self.response.write(template.render(template_value))
		# logging.info("GameId: "+ str(self.request.get("GameId")))
		# logging.info(self.request.get("GameId") == 1)
		# if self.request.get("GameId") == '1':
		# 	logging.info("GameId: 1 and Redirect to CoinGame" )
		# 	self.redirect('/coingame')
		# else:
		# 	self.redirect('/diskgame')


class CoinGame(webapp2.RequestHandler):
	def get(self):
		# self.response.write("Thanks Again!!");
		global template_value
		logging.info("Get CoinGame")
		template = jinja_environment.get_template('coingame.html')

		logging.info(template_value)
		self.response.write(template.render(template_value))

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


class Logout(webapp2.RequestHandler):
	def post(self):
		global template_value
		logging.info("Logout")
		template_value = {'is_Login': False}

class Test(webapp2.RequestHandler):

    def get(self):
        self.redirect('/coingame')
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
app = webapp2.WSGIApplication([('/', MainPage), ('/coingame', CoinGame),('/logout', Logout), ('/diskgame', DiskGame),('/test', Test)], debug= True)