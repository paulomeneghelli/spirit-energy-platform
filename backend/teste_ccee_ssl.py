import requests

from config import Config
from services.certificado_service import CertificadoService


print("================================")
print(" TESTE SSL CCEE")
print("================================")


cert_service = CertificadoService(
    Config.CCEE_CERT_PATH,
    Config.CCEE_CERT_PASSWORD
)


certificado, chave = cert_service.carregar_certificado()


print("")
print("Certificado OK")
print(certificado.subject)


# cria os arquivos temporários para o requests
cert_service.criar_contexto_ssl()


print("")
print("Tentando conexão HTTPS...")


try:

    resposta = requests.get(
        "https://www.ccee.org.br",
        timeout=20,
        verify=True,
        cert=(
            "certificado_temp.pem",
            "chave_temp.pem"
        )
    )


    print("")
    print("STATUS:")
    print(resposta.status_code)


    print("")
    print("CONEXÃO REALIZADA COM SUCESSO")


except Exception as e:

    print("")
    print("ERRO NA CONEXÃO:")
    print(e)