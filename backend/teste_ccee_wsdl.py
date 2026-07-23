from services.ccee_soap import CCEESOAP
from config import Config


soap = CCEESOAP(
    Config.CCEE_WSDL,
    Config.CCEE_CERT_PATH,
    Config.CCEE_CERT_PASSWORD
)


print("\nSERVIÇOS:")
print(soap.listar_servicos())


print("\nOPERAÇÕES:")
for op in soap.listar_operacoes():
    print(op)