from flask import Blueprint, jsonify

from services.health_service import HealthService
from services.consumo_service import ConsumoService
from services.contrato_service import ContratoService
from services.ccee_client import CCEEClient
from services.ccee_soap import CCEESOAP

api = Blueprint("api", __name__)

health = HealthService()
consumo = ConsumoService()
contrato = ContratoService()
cliente = CCEEClient()

# Troque a URL se estivermos usando outro WSDL
soap = None


@api.get("/health")
def health_check():
    return jsonify(health.status())


@api.get("/consumo")
def listar_consumo():
    return jsonify(consumo.listar())


@api.get("/consumo/mock")
def criar_mock_consumo():
    consumo.criar_mock()

    return jsonify({
        "status": "ok"
    })


@api.get("/contratos")
def listar_contratos():
    return jsonify(contrato.listar())


@api.get("/contratos/mock")
def criar_mock_contrato():
    contrato.criar_mock()

    return jsonify({
        "status": "ok"
    })


@api.get("/ccee")
def status_ccee():
    return jsonify({
        "consumo": cliente.consumo(),
        "contratos": cliente.contratos(),
        "medicao": cliente.medicao(),
        "pld": cliente.pld(),
        "liquidacao": cliente.liquidacao()
    })


@api.get("/soap")
def soap_info():

    try:

        return jsonify({

            "servicos": list(soap.listar_servicos()),

            "operacoes": soap.listar_operacoes()

        })

    except Exception as e:

        return jsonify({

            "erro": str(e)

        }), 500