from flask import Blueprint, render_template, request, redirect, url_for

from services.agente_service import AgenteService

agente_bp = Blueprint(
    "agentes",
    __name__
)

service = AgenteService()


@agente_bp.route("/agentes")
def listar_agentes():

    agentes = service.listar()

    return render_template(
        "agentes.html",
        agentes=agentes
    )


@agente_bp.route("/agentes/novo", methods=["GET", "POST"])
def novo_agente():

    if request.method == "POST":

        dados = {
            "codigo_ccee": request.form["codigo_ccee"],
            "nome": request.form["nome"],
            "cnpj": request.form["cnpj"],
            "tipo_agente": request.form["tipo_agente"],
            "status": request.form["status"]
        }

        service.criar(dados)

        return redirect(
            url_for("agentes.listar_agentes")
        )

    return render_template(
        "novo_agente.html"
    )