from services.ccee_client import CCEEClient


cliente = CCEEClient()

info = cliente.testar_conexao()


print()

print("========== SPIRIT ==========")

print()

print(f"URL CCEE........: {info['base_url']}")

print(f"Certificado.....: {info['certificado']}")

print(f"Arquivo existe..: {info['certificado_encontrado']}")

print(f"Senha definida..: {info['senha_configurada']}")

print()

print("============================")