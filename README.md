# 🚀 Slack Messenger

Envie mensagens personalizadas para múltiplos usuários do Slack direto pelo navegador — sem instalar nada.

## [→ Abrir o Slack Messenger](https://lucasldantas.github.io/slack-messenger/)

---

## ✨ Funcionalidades

- Mensagens personalizadas com tags dinâmicas por destinatário
- Formatação completa: negrito, itálico, tachado, código, bloco, citação
- Links clicáveis com texto personalizado
- Picker de emojis integrado
- Prévia em tempo real com renderização do Slack
- Status por destinatário em tempo real
- Token salvo localmente no navegador

---

## 🚀 Como usar

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

---

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

**Exemplo:**
```
Olá <b><primeiro_nome></b>! 🎉

Segue o link para o seu acesso: [Clique aqui](https://empresa.com/login)

<cita>Lembre-se de trocar sua senha no primeiro acesso.</cita>

Qualquer dúvida, fale com <@user> — ou responda este chat.
```

---

## 🔐 Permissões necessárias no token

| Escopo | Finalidade |
|---|---|
| `users:read.email` | Buscar usuário pelo e-mail |
| `chat:write` | Enviar mensagens diretas |

---

## ⚠️ Segurança

- O token **não está no código** — fica apenas no `localStorage` do navegador de quem usa
- Nunca compartilhe seu token `xoxb-` publicamente
