from zeep import Client
from zeep.transports import Transport

import requests

from services.certificado_service import CertificadoService


class CCEESOAP:


    def __init__(self, wsdl, certificado_path, senha_certificado):

        self.wsdl = wsdl

        self.certificado_path = certificado_path
        self.senha_certificado = senha_certificado


        self.client = self._criar_cliente()



    def _criar_cliente(self):

        print("=== INICIANDO CLIENTE SOAP CCEE ===")


        cert_service = CertificadoService(
            self.certificado_path,
            self.senha_certificado
        )


        certificado, chave = cert_service.carregar_certificado()


        session = requests.Session()


        # cria arquivos temporários PEM
        cert_pem, key_pem = cert_service.converter_para_pem()


        session.cert = (
            cert_pem,
            key_pem
        )


        transport = Transport(
            session=session
        )


        client = Client(
            self.wsdl,
            transport=transport
        )


        print("✅ Cliente SOAP CCEE criado")


        return client



    def listar_servicos(self):

        return self.client.wsdl.services.keys()



    def listar_operacoes(self):

        operacoes = []


        for service in self.client.wsdl.services.values():

            for port in service.ports.values():

                for operation in port.binding._operations.values():

                    operacoes.append(
                        operation.name
                    )


        return operacoes