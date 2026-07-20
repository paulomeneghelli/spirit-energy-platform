from repositories.agente_repository import AgenteRepository


class AgenteService:

    def __init__(self):
        self.repository = AgenteRepository()

    def listar(self):
        return self.repository.listar()

    def criar(self, dados):

        if not dados.get("codigo_ccee"):
            raise ValueError("Código CCEE é obrigatório.")

        if not dados.get("nome"):
            raise ValueError("Nome é obrigatório.")

        return self.repository.criar(dados)

    def excluir(self, id):
        return self.repository.excluir(id)