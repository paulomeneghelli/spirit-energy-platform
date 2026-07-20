from datetime import datetime

from database import db


class Liquidacao(db.Model):

    __tablename__ = "liquidacoes"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    agente_id = db.Column(
        db.Integer,
        db.ForeignKey("agentes.id"),
        nullable=False
    )


    mes = db.Column(
        db.Integer,
        nullable=False
    )


    ano = db.Column(
        db.Integer,
        nullable=False
    )


    energia_mwh = db.Column(
        db.Float,
        nullable=False
    )


    valor_energia = db.Column(
        db.Float,
        nullable=False
    )


    valor_pld = db.Column(
        db.Float
    )


    resultado = db.Column(
        db.Float
    )


    status = db.Column(
        db.String(30),
        default="pendente"
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    agente = db.relationship(
        "Agente",
        backref="liquidacoes"
    )


    def __repr__(self):

        return f"<Liquidacao {self.mes}/{self.ano}>"