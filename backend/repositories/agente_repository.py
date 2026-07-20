from models.agente import Agente
from database import db


class AgenteRepository:

    def listar(self):

        return Agente.query.order_by(
            Agente.nome
        ).all()


    def buscar_por_id(self, id):

        return Agente.query.get(id)


    def buscar_por_codigo(self, codigo_ccee):

        return Agente.query.filter_by(
            codigo_ccee=codigo_ccee
        ).first()


    def criar(self, dados):

        agente = Agente(

            codigo_ccee=dados["codigo_ccee"],

            nome=dados["nome"],

            cnpj=dados["cnpj"],

            tipo_agente=dados["tipo_agente"],

            status=dados["status"]

        )

        db.session.add(agente)

        db.session.commit()

        return agente


    def salvar_ou_atualizar(self, dados):

        agente = self.buscar_por_codigo(
            dados["codigo_ccee"]
        )


        if agente:

            agente.nome = dados.get(
                "nome",
                agente.nome
            )

            agente.cnpj = dados.get(
                "cnpj",
                agente.cnpj
            )

            agente.tipo_agente = dados.get(
                "tipo_agente",
                agente.tipo_agente
            )

            agente.status = dados.get(
                "status",
                agente.status
            )

        else:

            agente = Agente(

                codigo_ccee=dados["codigo_ccee"],

                nome=dados["nome"],

                cnpj=dados.get("cnpj"),

                tipo_agente=dados.get("tipo_agente"),

                status=dados.get(
                    "status",
                    "ativo"
                )

            )

            db.session.add(agente)


        db.session.commit()

        return agente


    def excluir(self, id):

        agente = self.buscar_por_id(id)

        if agente:

            db.session.delete(agente)

            db.session.commit()

        return agente