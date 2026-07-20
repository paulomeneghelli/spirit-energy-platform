import os
import requests

from config import Config


class CCEEClient:

    def __init__(self):

        self.base_url = Config.CCEE_URL

        self.cert_path = Config.CCEE_CERT_PATH

        self.cert_password = Config.CCEE_CERT_PASSWORD

        self.session = requests.Session()

        self.session.headers.update({

            "Accept": "application/json",

            "User-Agent": "Spirit/1.0"

        })


    def certificado_existe(self):

        return os.path.exists(self.cert_path)


    def informacoes(self):

        return {

            "base_url": self.base_url,

            "certificado": self.cert_path,

            "certificado_encontrado": self.certificado_existe(),

            "senha_configurada": bool(self.cert_password)

        }


    def testar_conexao(self):

        return self.informacoes()