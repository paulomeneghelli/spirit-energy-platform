from services.ativo_medicao_service import AtivoMedicaoService


service = AtivoMedicaoService()


resultado = service.sincronizar_ativos(
    agente_id=1,
    codigo_agente="59134"
)


print(resultado)