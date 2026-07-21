from flask import Blueprint, jsonify

from services.ativo_medicao_service import AtivoMedicaoService


ativo_medicao_bp = Blueprint(
    "ativo_medicao",
    __name__
)


service = AtivoMedicaoService()



@ativo_medicao_bp.route(
    "/sincronizar/<codigo_agente>",
    methods=["GET"]
)
def sincronizar_ativos(codigo_agente):


    try:

        ativos = service.sincronizar_ativos(
            agente_id=1,
            codigo_agente=codigo_agente
        )


        return jsonify({

            "status": "sucesso",

            "quantidade": len(ativos)

        })


    except Exception as erro:

        return jsonify({

            "status": "erro",

            "mensagem": str(erro)

        }), 500