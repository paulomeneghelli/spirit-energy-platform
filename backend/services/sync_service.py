from datetime import datetime

from services.agente_service import AgenteService
from services.contrato_service import ContratoService
from services.consumo_service import ConsumoService


class SyncService:

    def __init__(self):

        self.agentes = AgenteService()

        self.contratos = ContratoService()

        self.consumos = ConsumoService()


    def sincronizar_agentes(self):

        return {

            "modulo": "Agentes",

            "status": "Aguardando integração com a CCEE",

            "data": datetime.now().strftime("%d/%m/%Y %H:%M:%S")

        }


    def sincronizar_contratos(self):

        return {

            "modulo": "Contratos",

            "status": "Aguardando integração com a CCEE",

            "data": datetime.now().strftime("%d/%m/%Y %H:%M:%S")

        }


    def sincronizar_consumo(self):

        return {

            "modulo": "Consumo",

            "status": "Aguardando integração com a CCEE",

            "data": datetime.now().strftime("%d/%m/%Y %H:%M:%S")

        }


    def sincronizar_pld(self):

        return {

            "modulo": "PLD",

            "status": "Aguardando integração com a CCEE",

            "data": datetime.now().strftime("%d/%m/%Y %H:%M:%S")

        }


    def sincronizar_tudo(self):

        return {

            "agentes": self.sincronizar_agentes(),

            "contratos": self.sincronizar_contratos(),

            "consumo": self.sincronizar_consumo(),

            "pld": self.sincronizar_pld()

        }

        