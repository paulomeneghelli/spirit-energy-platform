from datetime import datetime

from database import db


class Agente(db.Model):

    __tablename__ = "agentes"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    codigo_ccee = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )


    nome = db.Column(
        db.String(150),
        nullable=False
    )


    cnpj = db.Column(
        db.String(20),
        unique=True
    )


    tipo_agente = db.Column(
        db.String(50)
    )


    status = db.Column(
        db.String(30),
        default="ativo"
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )


    def __repr__(self):

        return f"<Agente {self.nome}>"