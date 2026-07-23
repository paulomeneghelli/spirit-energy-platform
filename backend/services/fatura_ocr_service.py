from pdf2image import convert_from_path
import pytesseract


POPPLER_PATH = r"C:\Users\PauloMeneghelliStrey\Downloads\Release-26.02.0-0\poppler-26.02.0\Library\bin"


def extrair_texto_pdf(caminho_pdf):

    imagens = convert_from_path(
        caminho_pdf,
        poppler_path=POPPLER_PATH
    )

    texto = ""

    for imagem in imagens:
        texto += pytesseract.image_to_string(
            imagem,
            lang="por"
        )

    return texto