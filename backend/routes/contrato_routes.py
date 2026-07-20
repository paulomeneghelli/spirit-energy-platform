from flask import Blueprint, render_template, request, redirect, url_for

from services.contrato_service import ContratoService
from models.agente import Agente


contrato_bp = Blueprint(
    "contratos",
    __name__
)


service = ContratoService()



@contrato_bp.route("/contratos")
def listar_contratos():

    contratos = service.listar()

    return render_template(
        "contratos.html",
        contratos=contratos
    )



@contrato_bp.route("/contratos/novo", methods=["GET", "POST"])
def novo_contrato():

    if request.method == "POST":

        dados = {

            "agente_id": request.form["agente_id"],

            "codigo": request.form["codigo"],

            "contraparte": request.form["contraparte"],

            "tipo_energia": request.form["tipo_energia"],

            "volume_mwh": float(
                request.form["volume_mwh"]
            ),

            "preco_mwh": float(
                request.form["preco_mwh"]
            ),

            "inicio_vigencia": request.form["inicio_vigencia"],

            "fim_vigencia": request.form["fim_vigencia"],

            "status": request.form["status"]

        }


        service.criar(dados)


        return redirect(
            url_for(
                "contratos.listar_contratos"
            )
        )


    agentes = Agente.query.all()


    return render_template(
        "novo_contrato.html",
        agentes=agentes
    )