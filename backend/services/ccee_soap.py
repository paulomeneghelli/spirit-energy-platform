from zeep import Client


class CCEESOAP:

    def __init__(self, wsdl):

        self.wsdl = wsdl

        self.client = Client(wsdl)

    def listar_servicos(self):

        return self.client.wsdl.services.keys()

    def listar_operacoes(self):

        operacoes = []

        for service in self.client.wsdl.services.values():

            for port in service.ports.values():

                for operation in port.binding._operations.values():

                    operacoes.append(operation.name)

        return operacoes