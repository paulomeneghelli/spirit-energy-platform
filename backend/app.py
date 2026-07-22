from flask import Flask, render_template
from flask_cors import CORS

from config import Config
from database import db

from routes.api_routes import api
from routes.agente_routes import agente_bp
from routes.sincronizacao_routes import sincronizacao_bp
from routes.contrato_routes import contrato_bp
from routes.modulos_routes import modulos_bp
from routes.energy_analytics import energy_analytics_bp
from models.agente import Agente
from services.dashboard_service import DashboardService


def create_app():

    app = Flask(__name__)


    # =========================
    # Configuração geral
    # =========================

    app.config["SECRET_KEY"] = getattr(
        Config,
        "SECRET_KEY",
        "spirit-secret"
    )


    # =========================
    # Configuração do banco
    # =========================

    app.config["SQLALCHEMY_DATABASE_URI"] = (
        Config.SQLALCHEMY_DATABASE_URI
    )

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = (
        Config.SQLALCHEMY_TRACK_MODIFICATIONS
    )


    # =========================
    # Inicialização
    # =========================

    db.init_app(app)

    CORS(app)


    # =========================
    # Blueprints
    # =========================

    app.register_blueprint(
        api,
        url_prefix="/api"
    )


    app.register_blueprint(
        agente_bp
    )


    app.register_blueprint(
        sincronizacao_bp
    )



    app.register_blueprint(
        contrato_bp
    )


    app.register_blueprint(
        modulos_bp
    )


    app.register_blueprint(
        energy_analytics_bp
    )

    # =========================
    # Dashboard
    # =========================

    @app.route("/")
    def dashboard():


        dashboard_service = DashboardService()


        indicadores = dashboard_service.indicadores()


        agentes = Agente.query.all()


        return render_template(

            "dashboard.html",

            indicadores=indicadores,

            agentes=agentes

        )


    # =========================
    # Importa Models
    # =========================

    import models


    # =========================
    # Criação das tabelas
    # =========================

    with app.app_context():

        db.create_all()


    return app


app = create_app()


if __name__ == "__main__":

    app.run(
        host=Config.HOST,
        port=Config.PORT,
        debug=True
    )