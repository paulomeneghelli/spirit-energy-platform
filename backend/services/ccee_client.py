import requests_pkcs12

from services.ccee_auth import CCEEAuthService


class CCEEClient:


    def __init__(self):

        self.host = "https://servicos.ccee.org.br:443"


        auth = CCEEAuthService()


        certificado = auth.obter_configuracao_certificado()


        self.certificado = certificado["certificado"]

        self.senha_certificado = certificado["senha_certificado"]



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



        print("=== ENVIANDO REQUISIÇÃO CCEE ===")

        print(
            f"Endpoint: {endpoint}"
        )



        response = requests_pkcs12.post(

            url=f"{self.host}{endpoint}",

            data=xml.encode("utf-8"),

            headers=headers,

            pkcs12_filename=self.certificado,

            pkcs12_password=self.senha_certificado,

            timeout=60

        )



        print(
            f"Status CCEE: {response.status_code}"
        )



        response.raise_for_status()


        return response.text