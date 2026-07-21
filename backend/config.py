import os

from dotenv import load_dotenv


load_dotenv()



class Config:


    # =========================
    # Flask
    # =========================

    HOST = os.getenv(
        "HOST",
        "0.0.0.0"
    )


    PORT = int(
        os.getenv(
            "PORT",
            5000
        )
    )


    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "spirit-secret"
    )



    # =========================
    # Sistema
    # =========================

    API_NAME = "SPIRIT ENERGY PLATFORM"

    VERSION = "1.0.0"



    # =========================
    # CCEE
    # =========================

    CCEE_URL = os.getenv(
        "CCEE_URL",
        "https://api.ccee.org.br"
    )


    CCEE_CERT_PATH = os.getenv(
        "CCEE_CERT_PATH",
        "certificados/spiritgestaocertacom.pfx"
    )


    CCEE_CERT_PASSWORD = os.getenv(
        "CCEE_CERT_PASSWORD",
        ""
    )


    CCEE_USERNAME = os.getenv(
        "CCEE_USERNAME",
        ""
    )


    CCEE_PASSWORD = os.getenv(
        "CCEE_PASSWORD",
        ""
    )



    # =========================
    # Banco de Dados
    # =========================

    DB_HOST = os.getenv(
        "DB_HOST",
        "localhost"
    )


    DB_PORT = int(
        os.getenv(
            "DB_PORT",
            3306
        )
    )


    DB_USER = os.getenv(
        "DB_USER",
        "root"
    )


    DB_PASSWORD = os.getenv(
        "DB_PASSWORD",
        "spirit"
    )


    DB_NAME = os.getenv(
        "DB_NAME",
        "spirit_db"
    )



    SQLALCHEMY_DATABASE_URI = (

        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}"
        f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"

    )


    SQLALCHEMY_TRACK_MODIFICATIONS = False