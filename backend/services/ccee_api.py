from datetime import datetime


class CCEEAPI:

    def status(self):

        return {
            "online": True,
            "api": "API Spirit",
            "data": datetime.now().strftime("%d/%m/%Y %H:%M:%S")
        }

    def consumo(self):

        return {
            "mes": "Julho",
            "mwh": 1245.38,
            "mw_medio": 1.67,
            "valor": 358421.90
        }

    def contratos(self):

        return [
            {
                "contrato": "CTR-001",
                "fornecedor": "Empresa Alpha",
                "energia": "Convencional",
                "quantidade": 5,
                "preco": 189.40
            },
            {
                "contrato": "CTR-002",
                "fornecedor": "Empresa Beta",
                "energia": "Incentivada",
                "quantidade": 3,
                "preco": 176.80
            }
        ]

    def pld(self):

        return {
            "submercado": "Sul",
            "valor": 187.52
        }