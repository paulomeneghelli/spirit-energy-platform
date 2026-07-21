import ssl
import tempfile
import os

from cryptography.hazmat.primitives.serialization import pkcs12


class CertificadoService:

    def __init__(self, caminho_certificado, senha):
        self.caminho_certificado = caminho_certificado
        self.senha = senha


    def carregar_certificado(self):

        print("=== CARREGANDO CERTIFICADO CCEE ===")

        if not os.path.exists(self.caminho_certificado):
            raise FileNotFoundError(
                f"Certificado não encontrado: {self.caminho_certificado}"
            )


        with open(self.caminho_certificado, "rb") as arquivo:
            dados = arquivo.read()


        certificado, chave_privada, certificados_ca = pkcs12.load_key_and_certificates(
            dados,
            self.senha.encode() if self.senha else None
        )


        if certificado is None:
            raise Exception(
                "Não foi possível carregar o certificado."
            )


        print("✅ Certificado carregado com sucesso!")

        return certificado, chave_privada



    def criar_contexto_ssl(self):

        certificado, chave = self.carregar_certificado()


        contexto = ssl.create_default_context()

        return contexto