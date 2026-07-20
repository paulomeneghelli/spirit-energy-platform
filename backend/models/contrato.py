from datetime import datetime

from database import db


class Contrato(db.Model):

    __tablename__ = "contratos"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    agente_id = db.Column(
        db.Integer,
        db.ForeignKey("agentes.id"),
        nullable=False
    )


    codigo = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )


    contraparte = db.Column(
        db.String(150),
        nullable=False
    )


    tipo_energia = db.Column(
        db.String(50)
    )


    volume_mwh = db.Column(
        db.Float,
        nullable=False
    )


    preco_mwh = db.Column(
        db.Float,
        nullable=False
    )


    inicio_vigencia = db.Column(
        db.Date
    )


    fim_vigencia = db.Column(
        db.Date
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


    # relacionamento com agente
    agente = db.relationship(
        "Agente",
        backref="contratos"
    )


    def __repr__(self):

        return f"<Contrato {self.codigo}>"