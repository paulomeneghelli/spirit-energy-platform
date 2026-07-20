import os

from config import Config


def testar_certificado():

    print("=== TESTE CERTIFICADO CCEE ===")


    caminho = Config.CCEE_CERT_PATH

    senha = Config.CCEE_CERT_PASSWORD



    print(f"\nCaminho configurado:")
    print(caminho)



    if os.path.exists(caminho):

        print("\n✅ Certificado encontrado!")

    else:

        print("\n❌ Certificado não encontrado!")

        print(
            "Coloque o arquivo .pfx dentro da pasta certificados/"
        )



    if senha:

        print("\n✅ Senha configurada!")

    else:

        print("\n⚠️ Senha ainda não informada!")




if __name__ == "__main__":

    testar_certificado()