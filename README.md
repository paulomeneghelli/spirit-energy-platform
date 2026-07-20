# ⚡ SPIRIT ENERGY PLATFORM

<p align="center">
  <b>Plataforma de Integração e Gestão de Dados do Mercado Livre de Energia</b>
</p>

<p align="center">
  Backend desenvolvido em Python para automação de processos, integração com a CCEE e centralização de informações estratégicas para comercializadoras de energia.
</p>

---

## 📌 Sobre o Projeto

A **SPIRIT ENERGY PLATFORM** é uma plataforma backend desenvolvida para automatizar processos e centralizar informações relacionadas ao **Mercado Livre de Energia**.

O projeto tem como objetivo reduzir atividades manuais, melhorar a eficiência operacional e criar uma estrutura tecnológica capaz de integrar dados da **CCEE (Câmara de Comercialização de Energia Elétrica)** com sistemas internos de gestão.

A plataforma foi projetada para realizar autenticação segura, processamento de informações energéticas, armazenamento estruturado de dados e disponibilização das informações para acompanhamento operacional.

---

## 🚀 Principais Funcionalidades

✅ Integração com serviços da CCEE  
✅ Autenticação utilizando certificado digital  
✅ Comunicação com Web Services SOAP  
✅ Estrutura preparada para sincronização automática de dados  
✅ Cadastro e gerenciamento de agentes  
✅ Controle de contratos de energia  
✅ Armazenamento de dados de consumo  
✅ Estrutura para medições energéticas  
✅ Preparação para acompanhamento de PLD e liquidação financeira  
✅ Base para dashboards operacionais  

---

## 🏗️ Arquitetura do Projeto

O projeto utiliza uma arquitetura organizada em camadas, permitindo maior organização, escalabilidade e facilidade de manutenção.


spirit-energy-platform/

│
├── backend/
│
├── models/
│ └── Modelos das entidades do sistema
│
├── repositories/
│ └── Comunicação e manipulação dos dados no banco
│
├── services/
│ └── Regras de negócio da aplicação
│
├── routes/
│ └── Rotas e endpoints da API
│
├── certificados/
│ └── Certificados digitais utilizados na integração
│
├── database/
│ └── Estrutura do banco de dados
│
├── templates/
│ └── Interfaces do sistema
│
├── static/
│ └── Arquivos estáticos e estilos
│
├── app.py
│ └── Inicialização da aplicação
│
└── requirements.txt
└── Dependências do projeto


---

## 🛠️ Tecnologias Utilizadas

### Backend

- Python 3
- Flask
- SQLAlchemy
- PyMySQL

### Banco de Dados

- MySQL

### Integrações

- API CCEE
- Web Services SOAP
- Certificado Digital (.pfx / .p12)

### Ferramentas

- Git
- GitHub
- Visual Studio Code

---

# ⚡ Integração com a CCEE

A plataforma foi desenvolvida considerando os principais processos utilizados por empresas participantes do **Mercado Livre de Energia**.

A integração contempla a estrutura necessária para trabalhar com informações como:

- Agentes CCEE
- Contratos de energia
- Consumo
- Medição
- PLD
- Liquidação financeira

A autenticação utiliza certificado digital, garantindo uma comunicação segura com os serviços disponibilizados pela CCEE.

---

# 📊 Estrutura de Dados

A plataforma possui uma modelagem preparada para representar as principais entidades do mercado energético.

## 👤 Usuários

Controle dos usuários que utilizam a plataforma.

## 🏢 Agentes

Representação dos agentes cadastrados na CCEE.

Informações:

- Código CCEE
- Nome
- CNPJ
- Tipo de agente
- Status

## 📄 Contratos

Gerenciamento dos contratos de energia.

Possibilitando controle de:

- Cliente
- Volume contratado
- Período
- Energia negociada

## ⚡ Consumo

Armazenamento dos dados de consumo energético.

## 📈 Medição

Estrutura preparada para informações de medição e acompanhamento de energia.

## 💰 PLD

Base preparada para informações do Preço de Liquidação das Diferenças.

## 💵 Liquidação

Estrutura para acompanhamento dos processos financeiros relacionados ao mercado energético.

---

# 📚 Conceitos do Mercado Livre de Energia

A plataforma considera conceitos fundamentais do setor elétrico:

- MWh
- MW médio
- PLD (Preço de Liquidação das Diferenças)
- Lastro
- Energia incentivada
- Energia convencional
- Exposição ao PLD
- Curva de carga
- Flexibilidade contratual
- Sazonalização
- Modulação

---

# 🖥️ Dashboard

A plataforma possui uma interface operacional para acompanhamento das informações processadas.

Funcionalidades:

- Indicadores energéticos
- Visualização de dados
- Monitoramento de sincronizações
- Acompanhamento de contratos
- Informações operacionais

---

# 🔐 Segurança

O projeto possui uma estrutura preparada para proteção de informações sensíveis:

- Utilização de variáveis de ambiente
- Proteção de certificados digitais
- Separação de configurações
- Controle de acesso preparado para evolução

---

# 🚧 Status do Projeto

Atualmente o projeto encontra-se em desenvolvimento.

## Próximas etapas:

- [ ] Finalização da integração completa com a CCEE
- [ ] Sincronização automática de dados
- [ ] Dashboard avançado
- [ ] Módulo financeiro
- [ ] Gestão completa de contratos
- [ ] Deploy em ambiente cloud

---

# 🎯 Objetivo do Projeto

A **SPIRIT ENERGY PLATFORM** busca transformar processos manuais do Mercado Livre de Energia em fluxos automatizados, proporcionando maior eficiência operacional, organização dos dados e suporte à tomada de decisão.

---

# 👨‍💻 Autoria

**Paulo Meneghelli strey**

Projeto desenvolvido para aplicação prática no setor de energia elétrica, com foco em automação, integração de sistemas e gestão inteligente de dados.

---

⭐ Evoluindo constantemente para se tornar uma plataforma completa de gestão energética.
