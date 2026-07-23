import ssl
import os

from cryptography.hazmat.primitives.serialization import pkcs12
from cryptography.hazmat.primitives import serialization


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

        chave_privada, certificado, certificados_ca = pkcs12.load_key_and_certificates(
            dados,
            self.senha.encode() if self.senha else None
        )

        if certificado is None:
            raise Exception(
                "Não foi possível carregar o certificado."
            )

        if chave_privada is None:
            raise Exception(
                "Não foi possível carregar a chave privada."
            )

        print("✅ Certificado carregado com sucesso!")

        return certificado, chave_privada

    def criar_contexto_ssl(self):

        certificado, chave = self.carregar_certificado()

        certificado_pem = certificado.public_bytes(
            serialization.Encoding.PEM
        )

        chave_pem = chave.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.TraditionalOpenSSL,
            encryption_algorithm=serialization.NoEncryption()
        )

        caminho_cert = "certificado_temp.pem"
        caminho_key = "chave_temp.pem"

        with open(caminho_cert, "wb") as arquivo:
            arquivo.write(certificado_pem)

        with open(caminho_key, "wb") as arquivo:
            arquivo.write(chave_pem)

        contexto = ssl.create_default_context()

        contexto.load_cert_chain(
            certfile=caminho_cert,
            keyfile=caminho_key
        )

        print("✅ SSL configurado com certificado cliente")

        return contexto

        def converter_para_pem(self):

    from cryptography.hazmat.primitives.serialization import (
        Encoding,
        PrivateFormat,
        NoEncryption
    )

    import tempfile

    certificado, chave = self.carregar_certificado()

    cert_file = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pem"
    )

    key_file = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pem"
    )

    cert_file.write(
        certificado.public_bytes(
            Encoding.PEM
        )
    )

    key_file.write(
        chave.private_bytes(
            Encoding.PEM,
            PrivateFormat.TraditionalOpenSSL,
            NoEncryption()
        )
    )

    cert_file.close()
    key_file.close()

    return (
        cert_file.name,
        key_file.name
    )
