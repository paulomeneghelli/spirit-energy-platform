from datetime import datetime

from database import db


class PLD(db.Model):

    __tablename__ = "plds"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    data = db.Column(
        db.Date,
        nullable=False
    )


    submercado = db.Column(
        db.String(50),
        nullable=False
    )


    valor_mwh = db.Column(
        db.Float,
        nullable=False
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    def __repr__(self):

        return f"<PLD {self.submercado} {self.data}>"