from models.ativo_medicao import AtivoMedicao

from repositories.ativo_medicao_repository import AtivoMedicaoRepository

from services.ccee_service import CCEEService

from services.ccee_parser import CCEEParser



class AtivoMedicaoService:


    def __init__(self):

        self.repository = AtivoMedicaoRepository()

        self.ccee = CCEEService()

        self.parser = CCEEParser()



    def sincronizar_ativos(
        self,
        agente_id,
        codigo_agente
    ):


        resposta = self.ccee.listar_ativos_medicao(
            codigo_agente
        )


        ativos = self.parser.parse_ativos_medicao(
            resposta
        )


        salvos = []


        for item in ativos:


            ativo = AtivoMedicao(

                agente_id=agente_id,

                codigo_ativo=item["codigo"],

                descricao=item.get("descricao"),

                tipo=item.get("tipo")

            )


            self.repository.inserir(
                ativo
            )


            salvos.append(
                ativo
            )


        return salvos