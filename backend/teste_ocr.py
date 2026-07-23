from services.fatura_ocr_service import extrair_texto_pdf


arquivo = r"C:\Users\PauloMeneghelliStrey\Downloads\API Spirit\backend\teste.pdf.pdf"


texto = extrair_texto_pdf(arquivo)


print("==================== TEXTO EXTRAÍDO ====================")
print(texto)
print("=========================================================")