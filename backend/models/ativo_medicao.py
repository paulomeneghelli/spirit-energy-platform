from datetime import datetime

from database import db


class AtivoMedicao(db.Model):

    __tablename__ = "ativos_medicao"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    agente_id = db.Column(
        db.Integer,
        db.ForeignKey("agentes.id"),
        nullable=False
    )


    codigo_ativo = db.Column(
        db.String(100),
        nullable=False
    )


    descricao = db.Column(
        db.String(255)
    )


    tipo = db.Column(
        db.String(50)
    )


    status = db.Column(
        db.String(50),
        default="ATIVO"
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    agente = db.relationship(
        "Agente",
        backref="ativos_medicao"
    )