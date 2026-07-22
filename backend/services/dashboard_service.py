from models.agente import Agente
from models.contrato import Contrato
from models.medicao import Medicao
from models.pld import PLD


class DashboardService:


    def indicadores(self):


        total_agentes = Agente.query.count()


        total_contratos = Contrato.query.count()


        total_medicoes = Medicao.query.count()


        ultimo_pld = (
            PLD.query
            .order_by(PLD.data.desc())
            .first()
        )


        valor_pld = None


        if ultimo_pld:

            valor_pld = ultimo_pld.valor



        return {

            "agentes": total_agentes,

            "contratos": total_contratos,

            "medicoes": total_medicoes,

            "pld": valor_pld

        }