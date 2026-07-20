from database import db
from models.contrato import Contrato


class ContratoRepository:


    def inserir(self, contrato):

        db.session.add(contrato)
        db.session.commit()

        return contrato



    def listar(self):

        return Contrato.query.all()