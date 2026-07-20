import logging
import os


def configurar_logger():

    if not os.path.exists("logs"):
        os.makedirs("logs")


    logger = logging.getLogger("spirit")


    if logger.handlers:
        return logger


    logger.setLevel(logging.INFO)


    formatter = logging.Formatter(

        "%(asctime)s | %(levelname)s | %(message)s"

    )


    arquivo = logging.FileHandler(

        "logs/spirit.log",

        encoding="utf-8"

    )

    arquivo.setFormatter(formatter)


    console = logging.StreamHandler()

    console.setFormatter(formatter)


    logger.addHandler(arquivo)

    logger.addHandler(console)


    return logger


logger = configurar_logger()