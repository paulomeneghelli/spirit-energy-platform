from flask import Blueprint, render_template


modulos_bp = Blueprint(
    "modulos",
    __name__
)


@modulos_bp.route("/contratos")
def contratos():

    return render_template(
        "contratos.html"
    )



@modulos_bp.route("/consumo")
def consumo():

    return render_template(
        "consumo.html"
    )



@modulos_bp.route("/medicoes")
def medicoes():

    return render_template(
        "medicoes.html"
    )



@modulos_bp.route("/pld")
def pld():

    return render_template(
        "pld.html"
    )



@modulos_bp.route("/exposicao")
def exposicao():

    return render_template(
        "exposicao.html"
    )



@modulos_bp.route("/liquidacao")
def liquidacao():

    return render_template(
        "liquidacao.html"
    )



@modulos_bp.route("/relatorios")
def relatorios():

    return render_template(
        "relatorios.html"
    )



@modulos_bp.route("/configuracoes")
def configuracoes():

    return render_template(
        "configuracoes.html"
    )