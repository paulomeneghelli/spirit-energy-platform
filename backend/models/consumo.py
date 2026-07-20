from datetime import datetime

from database import db


class Consumo(db.Model):

    __tablename__ = "consumos"


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


    mwh = db.Column(
        db.Float,
        nullable=False
    )


    mw_medio = db.Column(
        db.Float
    )


    valor = db.Column(
        db.Float
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    agente = db.relationship(
        "Agente",
        backref="consumos"
    )


    def __repr__(self):

        return f"<Consumo {self.mes}/{self.ano}>"