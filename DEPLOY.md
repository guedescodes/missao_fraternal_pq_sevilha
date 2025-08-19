# Guia de Deploy - Missão Fraternal

Este documento contém instruções para fazer o deploy da aplicação de cadastro da Missão Fraternal.

## 🚀 Opções de Deploy

### 1. Vercel (Recomendado)

A forma mais simples de fazer o deploy é usando a Vercel:

1. **Conecte seu repositório**:
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com sua conta GitHub
   - Clique em "New Project"
   - Importe este repositório

2. **Configure o projeto**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Deploy**:
   - Clique em "Deploy"
   - Aguarde o build ser concluído
   - Sua aplicação estará disponível em `https://seu-projeto.vercel.app`

### 2. Netlify

1. **Conecte o repositório**:
   - Acesse [netlify.com](https://netlify.com)
   - Clique em "New site from Git"
   - Conecte seu repositório GitHub

2. **Configure o build**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18 (ou superior)

3. **Deploy**:
   - Clique em "Deploy site"
   - Aguarde o build ser concluído

### 3. Servidor Próprio

Para deploy em servidor próprio:

1. **Prepare o servidor**:
   ```bash
   # Instale Node.js 18+
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Clone o repositório
   git clone [URL_DO_REPOSITORIO]
   cd missao_fraternal_pq_sevilha
   
   # Instale dependências
   npm install
   ```

2. **Build da aplicação**:
   ```bash
   npm run build
   ```

3. **Execute em produção**:
   ```bash
   npm start
   ```

4. **Configure o PM2 (opcional)**:
   ```bash
   npm install -g pm2
   pm2 start npm --name "missao-fraternal" -- start
   pm2 startup
   pm2 save
   ```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local` para configurações específicas:

```env
# Configurações da aplicação
NEXT_PUBLIC_APP_NAME="Missão Fraternal"
NEXT_PUBLIC_APP_URL="https://sua-url.com"

# Configurações de banco de dados (se necessário)
DATABASE_URL="sua_url_do_banco"
```

## 📊 Monitoramento

### Vercel Analytics
- Ative o Vercel Analytics no dashboard
- Monitore performance e erros

### Logs
- Monitore os logs da aplicação
- Configure alertas para erros

## 🔒 Segurança

1. **HTTPS**: Certifique-se de que HTTPS está habilitado
2. **Headers de Segurança**: Configure headers de segurança
3. **Rate Limiting**: Implemente rate limiting na API
4. **Validação**: Mantenha a validação de dados ativa

## 📱 Testes Pós-Deploy

Após o deploy, teste:

- [ ] Formulário de cadastro funciona
- [ ] Validação de campos obrigatórios
- [ ] Mensagem de sucesso aparece
- [ ] Responsividade em diferentes dispositivos
- [ ] Performance da aplicação

## 🆘 Suporte

Em caso de problemas:

1. Verifique os logs do deploy
2. Teste localmente com `npm run build && npm start`
3. Verifique se todas as dependências estão instaladas
4. Consulte a documentação do Next.js

## 📈 Próximos Passos

Após o deploy bem-sucedido:

1. Configure um domínio personalizado
2. Implemente analytics
3. Configure backup dos dados
4. Implemente monitoramento de performance
5. Configure CI/CD para deploys automáticos

---

**Boa sorte com o deploy! 🎉**
