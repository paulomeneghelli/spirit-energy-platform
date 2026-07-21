from services.ccee_client import CCEEClient


def testar_conexao():

    print("=== TESTE CONEXÃO CCEE ===")

    cliente = CCEEClient()

    print("Certificado:")
    print(cliente.certificado)

    print("Senha carregada:")
    print(bool(cliente.senha_certificado))

    print("\nCliente CCEE criado com sucesso!")


if __name__ == "__main__":
    testar_conexao()