from flask_sqlalchemy import SQLAlchemy     #? La libreria 'flask_sqlalchemy' è un ponte tra Python e il database

db = SQLAlchemy()

#§ Questa classe 'ModelCreatureDB' serve a mappare la tabella del database dove sono salvati i Pokemon
class ModelCreatureDB(db.Model):
    __tablename__ = "Creatures table Database"

    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.Text, nullable=False, unique=True)
    height = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    types = db.Column(db.Text, nullable=False)
    stats = db.Column(db.Text, nullable=False)
    