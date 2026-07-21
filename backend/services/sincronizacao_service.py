from datetime import datetime

from repositories.sincronizacao_repository import (
    SincronizacaoRepository
)

from services.ativo_medicao_service import (
    AtivoMedicaoService
)



class SincronizacaoService:


    def __init__(self):

        self.repository = SincronizacaoRepository()

        self.ativo_medicao_service = AtivoMedicaoService()



    def listar(self):

        return self.repository.listar()



    def ultima_sincronizacao(self, modulo):

        return self.repository.ultima_sincronizacao(
            modulo
        )



    def registrar(

        self,

        modulo,

        status,

        mensagem="",

        registros=0

    ):

        return self.repository.criar({

            "modulo": modulo,

            "status": status,

            "mensagem": mensagem,

            "registros": registros,

            "iniciado_em": datetime.now(),

            "finalizado_em": datetime.now()

        })



    def sincronizar_agentes(self):

        return self.registrar(

            modulo="Agentes",

            status="Sucesso",

            mensagem="Sincronização simulada.",

            registros=0

        )



    def sincronizar_contratos(self):

        return self.registrar(

            modulo="Contratos",

            status="Sucesso",

            mensagem="Sincronização simulada.",

            registros=0

        )



    def sincronizar_consumo(self):

        return self.registrar(

            modulo="Consumo",

            status="Sucesso",

            mensagem="Sincronização simulada.",

            registros=0

        )



    def sincronizar_pld(self):

        return self.registrar(

            modulo="PLD",

            status="Sucesso",

            mensagem="Sincronização simulada.",

            registros=0

        )



    def sincronizar_ativos(

        self,

        agente_id,

        codigo_agente

    ):


        ativos = self.ativo_medicao_service.sincronizar_ativos(

            agente_id,

            codigo_agente

        )


        return self.registrar(

            modulo="Ativos Medição",

            status="Sucesso",

            mensagem="Ativos de medição sincronizados.",

            registros=len(ativos)

        )



    def sincronizar_tudo(self):

        self.sincronizar_agentes()

        self.sincronizar_contratos()

        self.sincronizar_consumo()

        self.sincronizar_pld()