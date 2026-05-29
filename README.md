# 🚀 Slack Messenger

Envie mensagens personalizadas para múltiplos usuários do Slack — via **web app** ou **Google Sheets**.

---

## ✨ Funcionalidades

- **Mensagens personalizadas** com tags dinâmicas por destinatário
- **Formatação completa**: negrito, itálico, tachado, código, bloco, citação
- **Links clicáveis** com texto personalizado
- **Picker de emojis** integrado
- **Prévia em tempo real** com renderização do Slack mrkdwn
- **Status por destinatário**: acompanhe cada envio em tempo real
- **Token salvo** no navegador (localStorage)

---

## 🌐 Web App

### [→ Abrir o Slack Messenger](https://lucasldantas.github.io/slack-messenger/)

Nenhuma instalação necessária. Funciona direto no navegador.

**Como usar:**
1. Cole o token do bot (`xoxb-...`) e clique em **Salvar token**
2. Escreva a mensagem usando a barra de formatação ou as tags manualmente
3. Cole os e-mails dos destinatários (um por linha)
4. Clique em **▶ Enviar mensagens**

---

## 🏷️ Tags disponíveis

| Tag | Resultado |
|---|---|
| `<user>` | Nome completo do usuário |
| `<primeiro_nome>` | Primeiro nome |
| `<@user>` | Menção @clicável no Slack |
| `<email>` | E-mail do destinatário |
| `<username>` | Username do Slack |

## ✍️ Formatação

| Sintaxe | Resultado |
|---|---|
| `<b>texto</b>` | **negrito** |
| `<i>texto</i>` | *itálico* |
| `<s>texto</s>` | ~~tachado~~ |
| `<code>texto</code>` | `código inline` |
| `<bloco>texto</bloco>` | bloco de código |
| `<cita>texto</cita>` | > blockquote |
| `[texto](https://url)` | link clicável |

**Exemplo de mensagem:**
```
Olá <b><primeiro_nome></b>! 🎉

Segue o link para o seu acesso: [Clique aqui](https://empresa.com/login)

<cita>Lembre-se de trocar sua senha no primeiro acesso.</cita>

Qualquer dúvida, fale com <@user> — ou responda este chat.
```

---

## 📊 Google Sheets (Apps Script)

Para enviar direto de uma planilha sem abrir o web app, use o script `SlackBotSheets.gs`.

### Estrutura da planilha

| Aba | Célula | Conteúdo |
|---|---|---|
| `Mensagem` | `A1` | Texto da mensagem (com tags) |
| `Destinatarios` | `A1` | Cabeçalho: `Destinatario` |
| `Destinatarios` | `A2+` | E-mails dos destinatários |

### Instalação

1. Abra a planilha → **Extensões → Apps Script**
2. Apague o código padrão e cole o conteúdo de `SlackBotSheets.gs`
3. Substitua `'xbob'` pelo seu token `xoxb-...`
4. Salve e execute `onOpen` para registrar o menu
5. Recarregue a planilha — o menu **📨 Slack** aparecerá na barra

---

## 🔐 Permissões necessárias no token

| Escopo | Finalidade |
|---|---|
| `users:read.email` | Buscar usuário pelo e-mail |
| `chat:write` | Enviar mensagens diretas |

---

## ⚠️ Segurança

- O token **não está no código** — é salvo apenas no `localStorage` do navegador de quem usa
- Esta página é pública; qualquer pessoa com a URL pode acessar o formulário
- Nunca compartilhe seu token `xoxb-` publicamente
