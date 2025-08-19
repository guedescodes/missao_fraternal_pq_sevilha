# Missão Fraternal - Cadastro

Sistema de cadastro para a Missão Fraternal da Congregação Cristã no Brasil.

## 📋 Sobre o Projeto

Este projeto é uma aplicação web desenvolvida em Next.js para gerenciar o cadastro de irmãos interessados em participar da Missão Fraternal que acontecerá nos dias 20 e 21 de setembro de 2024.

## ✨ Funcionalidades

- **Formulário de Cadastro Completo**: Coleta todos os dados necessários dos participantes
- **Validação de Dados**: Validação em tempo real com feedback visual
- **Interface Responsiva**: Design moderno e adaptável a diferentes dispositivos
- **Feedback Visual**: Confirmação de envio e mensagens de erro claras
- **Acessibilidade**: Interface acessível com labels e navegação por teclado
- **Armazenamento Local**: Dados salvos em arquivo JSON local
- **Lista de Cadastros**: Página para visualizar todos os cadastros confirmados
- **Filtros e Estatísticas**: Filtros por disponibilidade e estatísticas em tempo real
- **Exportação CSV**: Funcionalidade para exportar dados em formato CSV
- **Logo Oficial**: Integração com o logo oficial da Congregação Cristã no Brasil

## 🎯 Campos do Formulário

- **Nome Completo** (obrigatório)
- **Idade** (obrigatório)
- **Celular/WhatsApp** (obrigatório)
- **É motorista e possui carro?** (opcional)
- **Disponibilidade** (obrigatório):
  - Dia 20 (sábado) e 21 (domingo) de Setembro
  - Dia 20 (sábado) de Setembro
  - Dia 21 (domingo) de Setembro
- **Qual instrumento toca?** (opcional) - Ex: Violino, Trompete, Tuba, etc.
- **Congregação** (obrigatório)

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **Lucide React** - Ícones
- **File System API** - Armazenamento local em JSON

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd missao_fraternal_pq_sevilha
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### Scripts Disponíveis

- `npm run dev` - Executa o servidor de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run start` - Executa a aplicação em modo de produção
- `npm run lint` - Executa o linter
- `npm run type-check` - Verifica tipos TypeScript

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css          # Estilos globais
│   ├── layout.tsx           # Layout principal
│   ├── page.tsx             # Página de cadastro
│   ├── lista/
│   │   └── page.tsx         # Página de lista de cadastros
│   └── api/
│       └── cadastro/
│           └── route.ts     # API para cadastros
├── components/              # Componentes reutilizáveis (futuro)
└── lib/                     # Utilitários e configurações (futuro)
data/
└── cadastros.json          # Arquivo de armazenamento local
public/
└── logo-ccb.png           # Logo oficial da CCB
```

## 🎨 Design

O projeto utiliza um design moderno e limpo com:
- Gradiente azul suave no fundo
- Cards com sombras e bordas arredondadas
- Ícones intuitivos para cada campo
- Feedback visual para estados de loading e sucesso
- Cores consistentes com a identidade da congregação
- Logo oficial da Congregação Cristã no Brasil
- Animações suaves e responsivas

## 📱 Responsividade

A aplicação é totalmente responsiva e funciona bem em:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 💾 Armazenamento de Dados

Os dados são armazenados localmente em:
- **Arquivo**: `data/cadastros.json`
- **Formato**: JSON estruturado
- **Backup**: Recomenda-se fazer backup regular do arquivo

### Estrutura dos Dados

```json
{
  "cadastros": [
    {
      "id": "timestamp",
      "nomeCompleto": "Nome do Irmão",
      "idade": 25,
      "celular": "(11) 99999-9999",
      "motorista": true,
      "disponibilidade": "ambos",
      "instrumento": "Violino",
      "congregacao": "Nome da Congregação",
      "dataCadastro": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## 📊 Funcionalidades da Lista

### Estatísticas em Tempo Real
- Total de cadastros
- Número de motoristas
- Disponibilidade por dia
- Filtros dinâmicos

### Filtros Disponíveis
- Todos os cadastros
- Apenas motoristas
- Disponibilidade: Ambos os dias
- Disponibilidade: Sábado
- Disponibilidade: Domingo

### Exportação
- Exportação em formato CSV
- Nome do arquivo com data atual
- Dados formatados para Excel/Google Sheets

## 🔧 Configuração de Produção

Para fazer o deploy em produção:

1. Execute o build:
```bash
npm run build
```

2. Execute a aplicação:
```bash
npm start
```

### Considerações de Produção

- **Backup**: Configure backup automático do arquivo `data/cadastros.json`
- **Segurança**: Implemente autenticação para a página de lista
- **Banco de Dados**: Considere migrar para um banco de dados real para produção
- **Monitoramento**: Configure logs e monitoramento de erros

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através do site oficial:
[congregacaocristanobrasil.org.br](https://congregacaocristanobrasil.org.br/)

## 📄 Licença

Este projeto é desenvolvido para uso interno da Congregação Cristã no Brasil.

---

**Desenvolvido com ❤️ para a Missão Fraternal**
