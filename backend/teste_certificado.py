from services.certificado_service import CertificadoService
from config import Config


print("================================")
print(" TESTE CERTIFICADO CCEE")
print("================================")


print("Caminho:")
print(Config.CCEE_CERT_PATH)

print("Senha configurada:")
print(bool(Config.CCEE_CERT_PASSWORD))


cert_service = CertificadoService(
    Config.CCEE_CERT_PATH,
    Config.CCEE_CERT_PASSWORD
)


certificado, chave = cert_service.carregar_certificado()


print("")
print("TIPO CERTIFICADO:")
print(type(certificado))

print("")
print("TIPO CHAVE:")
print(type(chave))


if hasattr(certificado, "subject"):

    print("")
    print("CERTIFICADO:")
    print(certificado.subject)

    print("")
    print("VALIDADE:")
    print(certificado.not_valid_before)
    print(certificado.not_valid_after)


print("")
print("CHAVE PRIVADA:")
print(chave)