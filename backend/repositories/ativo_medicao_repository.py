from database import db
from models.ativo_medicao import AtivoMedicao


class AtivoMedicaoRepository:


    def inserir(self, ativo):

        db.session.add(ativo)
        db.session.commit()

        return ativo


    def listar(self):

        return AtivoMedicao.query.all()