# Augusto — HIA Solutions (PWA)

PWA pronto para atendimento com botões principais, WhatsApp integrado e trilha para integração com Google Sheets via Apps Script.

## Como usar (rápido)

1. **Edite `config.js`** e confirme:
   - `WHATSAPP_NUMBER`: já está com +5531999787762
   - `GAS_ENDPOINT`: cole aqui a URL do Apps Script quando criar
   - `SHEET_ID`: opcional

2. **Rodar local (qualquer servidorzinho):**
   - Python: `python3 -m http.server 8080`
   - Node: `npx serve .`
   - Acesse `http://localhost:8080`

3. **Publicar no GitHub Pages (rápido para teste):**
   - Faça commit de tudo na branch `main`
   - Em **Settings > Pages**, selecione **Deploy from a branch**, branch `main`, pasta `/root`
   - Abra a URL que o GitHub gerar

4. **Publicar no Firebase Hosting (recomendado):**
   - `firebase init hosting` (Use um projeto na conta `hamiltontvbox8@gmail.com`)
   - Selecione **Single-page app?**: `Yes`
   - `firebase deploy`

## Integração com Planilha (via Apps Script)

- Crie um Apps Script do tipo Web App com um endpoint público (GET/POST) e leia-escreva na planilha desejada.
- Cole a URL final do Web App em `GAS_ENDPOINT` no `config.js`.
- O app envia eventos `{ event, label, project, ts }` por `POST` quando o usuário clica nos botões.

---

**Cores**: preto, cinza, amarelo (identidade HIA).  
**Contato**: WhatsApp HIA Solutions: +55 31 99978-7762.