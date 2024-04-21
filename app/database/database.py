from peewee import Model
import json
from playhouse.mysql_ext import MySQLDatabase
from playhouse.shortcuts import model_to_dict
from os import getenv

mysql_db = MySQLDatabase(user=getenv('BD_USER'), password=getenv('BD_PASS'), host=getenv('BD_HOST'), database=getenv('BD_NAME'))

class BaseModel(Model):
    class Meta:
        database = mysql_db
    
    def to_dict(self):
        model_dict = json.loads(json.dumps(model_to_dict(self), default=str))
        return model_dict
    