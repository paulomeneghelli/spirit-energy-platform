import os

from config import Config


def carregar_certificado():

    certificado = getattr(
        Config,
        "CCEE_CERT_PATH",
        None
    )


    senha = getattr(
        Config,
        "CCEE_CERT_PASSWORD",
        None
    )


    if not certificado:

        raise Exception(
            "Certificado CCEE não configurado"
        )


    return {
        "certificado": certificado,
        "senha": senha
    }