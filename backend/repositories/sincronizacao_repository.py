from models.sincronizacao import Sincronizacao
from database import db


class SincronizacaoRepository:

    def listar(self):

        return Sincronizacao.query.order_by(
            Sincronizacao.created_at.desc()
        ).all()


    def listar_por_modulo(self, modulo):

        return Sincronizacao.query.filter_by(
            modulo=modulo
        ).order_by(
            Sincronizacao.created_at.desc()
        ).all()


    def ultima_sincronizacao(self, modulo):

        return Sincronizacao.query.filter_by(
            modulo=modulo
        ).order_by(
            Sincronizacao.created_at.desc()
        ).first()


    def criar(self, dados):

        sincronizacao = Sincronizacao(

            modulo=dados["modulo"],

            status=dados["status"],

            mensagem=dados.get("mensagem"),

            registros=dados.get("registros", 0),

            iniciado_em=dados.get("iniciado_em"),

            finalizado_em=dados.get("finalizado_em")

        )

        db.session.add(sincronizacao)

        db.session.commit()

        return sincronizacao