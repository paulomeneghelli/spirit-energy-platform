import xml.etree.ElementTree as ET


class CCEEParser:


    def parse_ativos_medicao(self, xml):

        ativos = []


        root = ET.fromstring(xml)


        for ativo in root.iter():

            if ativo.tag.endswith("ativoMedicao"):


                dados = {}


                for campo in ativo.iter():

                    nome = campo.tag.split("}")[-1]


                    if nome == "codigo":

                        dados["codigo"] = campo.text


                    elif nome == "descricao":

                        dados["descricao"] = campo.text


                    elif nome == "tipo":

                        dados["tipo"] = campo.text



                if "codigo" in dados:

                    ativos.append(dados)


        return ativos