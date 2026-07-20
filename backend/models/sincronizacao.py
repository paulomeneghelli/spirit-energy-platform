from datetime import datetime

from database import db


class Sincronizacao(db.Model):

    __tablename__ = "sincronizacoes"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    modulo = db.Column(
        db.String(100),
        nullable=False
    )


    status = db.Column(
        db.String(30),
        nullable=False
    )


    mensagem = db.Column(
        db.Text
    )


    registros = db.Column(
        db.Integer,
        default=0
    )


    iniciado_em = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    finalizado_em = db.Column(
        db.DateTime
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    def __repr__(self):

        return f"<Sincronizacao {self.modulo}>"