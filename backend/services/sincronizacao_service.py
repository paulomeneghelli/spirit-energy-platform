from datetime import datetime

from repositories.sincronizacao_repository import (
    SincronizacaoRepository
)


class SincronizacaoService:

    def __init__(self):

        self.repository = SincronizacaoRepository()


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

        # Aqui entra a integração CCEE

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


    def sincronizar_tudo(self):

        self.sincronizar_agentes()

        self.sincronizar_contratos()

        self.sincronizar_consumo()

        self.sincronizar_pld()