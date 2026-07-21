from services.ccee_service import CCEEService


def testar_servico():

    print("=== TESTE SERVIÇO CCEE ===")

    service = CCEEService()

    resposta = service.listar_ativos_medicao(
        "59134"
    )

    print("\nResposta CCEE:")
    print(resposta)


if __name__ == "__main__":
    testar_servico()