from models.contrato import Contrato
from repositories.contrato_repository import ContratoRepository


class ContratoService:

    def __init__(self):

        self.repository = ContratoRepository()


    def listar(self):

        return self.repository.listar()


    def criar(self, dados):

        if not dados.get("codigo"):
            raise ValueError("Código do contrato é obrigatório.")

        if not dados.get("agente_id"):
            raise ValueError("Agente é obrigatório.")

        contrato = Contrato(

            agente_id=dados["agente_id"],

            codigo=dados["codigo"],

            contraparte=dados["contraparte"],

            tipo_energia=dados.get("tipo_energia"),

            volume_mwh=dados["volume_mwh"],

            preco_mwh=dados["preco_mwh"],

            inicio_vigencia=dados.get("inicio_vigencia"),

            fim_vigencia=dados.get("fim_vigencia"),

            status=dados.get("status", "ativo")

        )

        return self.repository.inserir(contrato)