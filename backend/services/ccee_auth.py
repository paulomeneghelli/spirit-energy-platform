from config import Config


class CCEEAuthService:


    def __init__(self):

        self.certificado = Config.CCEE_CERT_PATH

        self.senha_certificado = Config.CCEE_CERT_PASSWORD

        self.usuario = getattr(
            Config,
            "CCEE_USERNAME",
            None
        )

        self.senha = getattr(
            Config,
            "CCEE_PASSWORD",
            None
        )



    def obter_configuracao_certificado(self):

        print("=== CONFIGURAÇÃO CERTIFICADO CCEE ===")


        if not self.certificado:

            raise Exception(
                "Certificado CCEE não configurado"
            )


        return {

            "certificado": self.certificado,

            "senha_certificado": self.senha_certificado

        }



    def obter_credenciais(self):

        print("=== CREDENCIAIS CCEE ===")


        if not self.usuario:

            raise Exception(
                "Usuário CCEE não configurado"
            )


        if not self.senha:

            raise Exception(
                "Senha CCEE não configurada"
            )


        return {

            "usuario": self.usuario,

            "senha": self.senha

        }



    def validar_configuracao(self):

        certificado = self.obter_configuracao_certificado()

        credenciais = self.obter_credenciais()


        print("✅ Configuração CCEE encontrada!")


        return {

            **certificado,

            **credenciais

        }