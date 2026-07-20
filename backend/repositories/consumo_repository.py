from database import db
from models.consumo import Consumo


class ConsumoRepository:


    def inserir(self, consumo):

        db.session.add(consumo)
        db.session.commit()

        return consumo



    def listar(self):

        return Consumo.query.all()