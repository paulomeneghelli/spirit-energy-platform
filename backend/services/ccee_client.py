import requests_pkcs12

from config import Config


class CCEEClient:

    def __init__(self):

        self.host = "https://servicos.ccee.org.br:443"

        self.certificado = Config.CCEE_CERT_PATH

        self.senha_certificado = Config.CCEE_CERT_PASSWORD



    def post(
        self,
        endpoint,
        xml,
        soap_action
    ):

        headers = {

            "Content-Type": "text/xml;charset=UTF-8",

            "SOAPAction": soap_action

        }


        response = requests_pkcs12.post(

            url=f"{self.host}{endpoint}",

            data=xml.encode("utf-8"),

            headers=headers,

            pkcs12_filename=self.certificado,

            pkcs12_password=self.senha_certificado,

            timeout=60

        )


        response.raise_for_status()


        return response.text