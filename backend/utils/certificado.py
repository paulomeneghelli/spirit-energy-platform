from pathlib import Path
from cryptography.hazmat.primitives.serialization import pkcs12


class CertificadoManager:

    def __init__(self, caminho_certificado: str, senha: str):
        self.caminho = Path(caminho_certificado)
        self.senha = senha.encode()

    def carregar(self):
        if not self.caminho.exists():
            raise FileNotFoundError(
                f"Certificado não encontrado: {self.caminho}"
            )

        with open(self.caminho, "rb") as arquivo:
            dados = arquivo.read()

        chave_privada, certificado, cadeia = pkcs12.load_key_and_certificates(
            dados,
            self.senha
        )

        return {
            "private_key": chave_privada,
            "certificate": certificado,
            "chain": cadeia
        }

    def validar(self):
        try:
            self.carregar()
            return True
        except Exception:
            return False