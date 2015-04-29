from google.appengine.ext import ndb
from google.appengine.ext import db

class Experiment(ndb.Model):
  player = ndb.UserProperty()
  date = ndb.DateTimeProperty(auto_now_add=True)
  time = ndb.IntegerProperty()

class Player(ndb.Model):
    """Models an individual Guestbook entry with author, content, and date."""
    player = ndb.UserProperty()
    email = ndb.StringProperty()
    registerDate = ndb.DateTimeProperty(auto_now_add=True)
    experiments = ndb.StructuredProperty(Experiment, repeated=True)

class Sample(db.Model):
  name = db.StringProperty()
  date = db.DateTimeProperty(auto_now_add=True)
  time = db.IntegerProperty()
