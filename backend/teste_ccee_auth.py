from services.ccee_auth import CCEEAuthService


auth = CCEEAuthService()


config = auth.validar_configuracao()


print(config)