from datetime import datetime

from database import db


class Medicao(db.Model):

    __tablename__ = "medicoes"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    agente_id = db.Column(
        db.Integer,
        db.ForeignKey("agentes.id"),
        nullable=False
    )


    data = db.Column(
        db.Date,
        nullable=False
    )


    energia_medida = db.Column(
        db.Float,
        nullable=False
    )


    unidade = db.Column(
        db.String(20),
        default="MWh"
    )


    origem = db.Column(
        db.String(50),
        default="CCEE"
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    agente = db.relationship(
        "Agente",
        backref="medicoes"
    )


    def __repr__(self):

        return f"<Medicao {self.data}>"