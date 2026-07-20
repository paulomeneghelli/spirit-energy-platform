from repositories.consumo_repository import ConsumoRepository

from models.consumo import Consumo


class ConsumoService:

    def __init__(self):

        self.repo = ConsumoRepository()

    def criar_mock(self):

        consumo = Consumo(

            "Julho",

            2026,

            1245.87,

            1.72,

            389000

        )

        self.repo.inserir(consumo)

    def listar(self):

        return self.repo.listar()