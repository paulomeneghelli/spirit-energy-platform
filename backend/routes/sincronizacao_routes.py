from flask import Blueprint
from flask import redirect
from flask import render_template
from flask import url_for

from services.sincronizacao_service import (
    SincronizacaoService
)


sincronizacao_bp = Blueprint(

    "sincronizacao",

    __name__

)


service = SincronizacaoService()


@sincronizacao_bp.route("/sincronizacoes")
def sincronizacoes():

    return render_template(

        "sincronizacoes.html",

        sincronizacoes=service.listar()

    )


@sincronizacao_bp.route("/sincronizar/agentes")
def sincronizar_agentes():

    service.sincronizar_agentes()

    return redirect(

        url_for(

            "sincronizacao.sincronizacoes"

        )

    )


@sincronizacao_bp.route("/sincronizar/contratos")
def sincronizar_contratos():

    service.sincronizar_contratos()

    return redirect(

        url_for(

            "sincronizacao.sincronizacoes"

        )

    )


@sincronizacao_bp.route("/sincronizar/consumo")
def sincronizar_consumo():

    service.sincronizar_consumo()

    return redirect(

        url_for(

            "sincronizacao.sincronizacoes"

        )

    )


@sincronizacao_bp.route("/sincronizar/pld")
def sincronizar_pld():

    service.sincronizar_pld()

    return redirect(

        url_for(

            "sincronizacao.sincronizacoes"

        )

    )


@sincronizacao_bp.route("/sincronizar/tudo")
def sincronizar_tudo():

    service.sincronizar_tudo()

    return redirect(

        url_for(

            "sincronizacao.sincronizacoes"

        )

    )
    