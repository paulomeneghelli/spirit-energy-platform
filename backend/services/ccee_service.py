from services.ccee_client import CCEEClient
from config import Config


class CCEEService:


    def __init__(self):

        self.client = CCEEClient()



    def listar_ativos_medicao(
        self,
        codigo_agente
    ):


        xml = f"""
<soapenv:Envelope
xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:oas="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd"
xmlns:v2="http://xmlns.energia.org.br/MH/v2"
xmlns:v21="http://xmlns.energia.org.br/BM/v2"
xmlns:v22="http://xmlns.energia.org.br/BO/v2">

<soapenv:Header>


<v2:messageHeader>

<v2:codigoPerfilAgente>
{codigo_agente}
</v2:codigoPerfilAgente>

<v2:versao>
2.1
</v2:versao>

</v2:messageHeader>


<oas:Security>

<oas:UsernameToken>

<oas:Username>
{Config.CCEE_USERNAME}
</oas:Username>

<oas:Password>
{Config.CCEE_PASSWORD}
</oas:Password>

</oas:UsernameToken>

</oas:Security>


<v2:paginacao>

<v2:numero>
1
</v2:numero>

<v2:quantidadeItens>
100
</v2:quantidadeItens>

</v2:paginacao>


</soapenv:Header>



<soapenv:Body>

<v21:listarAtivoMedicaoRequest>


<v21:ativoMedicao>


<v22:tipo>

<v22:descricao>
CARGA
</v22:descricao>

</v22:tipo>


<v22:parcelasAtivo>

<v22:parcelaAtivo>

<v22:participanteMercado>

<v22:codigo>
{codigo_agente}
</v22:codigo>

</v22:participanteMercado>


</v22:parcelaAtivo>

</v22:parcelasAtivo>


</v21:ativoMedicao>


</v21:listarAtivoMedicaoRequest>


</soapenv:Body>


</soapenv:Envelope>
"""


        resposta = self.client.post(

            endpoint="/ws/v2/AtivoMedicaoBSv2",

            xml=xml,

            soap_action="listarAtivoMedicao"

        )


        return resposta