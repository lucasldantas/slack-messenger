const SLACK_TOKEN = 'xbob'; // Substitua pelo seu token xoxb-...

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('📨 Slack')
    .addItem('Enviar Mensagens', 'enviarMensagensSlack')
    .addToUi();
}

function enviarMensagensSlack() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const abaDestinatarios = ss.getSheetByName('Destinatarios');
  const abaMensagem = ss.getSheetByName('Mensagem');

  if (!abaDestinatarios || !abaMensagem) {
    SpreadsheetApp.getUi().alert('❌ Erro: Abas "Destinatarios" ou "Mensagem" não encontradas.');
    return;
  }

  const mensagem = abaMensagem.getRange('A1').getValue().toString().trim();
  if (!mensagem) {
    SpreadsheetApp.getUi().alert('❌ Erro: Nenhuma mensagem encontrada em Mensagem!A1.');
    return;
  }

  const ultimaLinha = abaDestinatarios.getLastRow();
  if (ultimaLinha < 2) {
    SpreadsheetApp.getUi().alert('❌ Nenhum destinatário encontrado na aba Destinatarios.');
    return;
  }

  const emails = abaDestinatarios
    .getRange(2, 1, ultimaLinha - 1, 1)
    .getValues()
    .flat()
    .filter(e => e.toString().trim() !== '');

  if (emails.length === 0) {
    SpreadsheetApp.getUi().alert('❌ Nenhum e-mail válido encontrado.');
    return;
  }

  let enviados = 0;
  let erros = [];

  emails.forEach(email => {
    const emailStr = email.toString().trim();
    try {
      const usuario = buscarUsuarioPorEmail_(emailStr);
      if (!usuario) {
        erros.push(`${emailStr}: usuário não encontrado`);
        return;
      }

      const mensagemFinal = aplicarTags_(mensagem, usuario);
      enviarMensagem_(usuario.id, mensagemFinal);
      enviados++;
    } catch (e) {
      erros.push(`${emailStr}: ${e.message}`);
    }
  });

  let resumo = `✅ Mensagens enviadas: ${enviados}`;
  if (erros.length > 0) {
    resumo += `\n\n⚠️ Erros (${erros.length}):\n` + erros.join('\n');
  }
  SpreadsheetApp.getUi().alert(resumo);
}

// Substitui as tags da mensagem com os dados do usuário e formatações
function aplicarTags_(mensagem, usuario) {
  return mensagem
    // --- Dados do usuário ---
    .replace(/<user>/gi,          usuario.nomeCompleto)
    .replace(/<primeiro_nome>/gi, usuario.primeiroNome)
    .replace(/<@user>/gi,         `<@${usuario.id}>`)   // menção clicável no Slack
    .replace(/<email>/gi,         usuario.email)
    .replace(/<username>/gi,      usuario.username)

    // --- Formatação de texto ---
    // <b>texto</b>  →  *texto*  (negrito)
    .replace(/<b>([\s\S]*?)<\/b>/gi,      '*$1*')
    // <i>texto</i>  →  _texto_  (itálico)
    .replace(/<i>([\s\S]*?)<\/i>/gi,      '_$1_')
    // <s>texto</s>  →  ~texto~  (tachado)
    .replace(/<s>([\s\S]*?)<\/s>/gi,      '~$1~')
    // <code>texto</code>  →  `texto`  (código inline)
    .replace(/<code>([\s\S]*?)<\/code>/gi, '`$1`')
    // <bloco>texto</bloco>  →  ```texto```  (bloco de código)
    .replace(/<bloco>([\s\S]*?)<\/bloco>/gi, '```$1```')
    // <cita>texto</cita>  →  > texto  (citação / blockquote)
    .replace(/<cita>([\s\S]*?)<\/cita>/gi, (_, t) => t.split('\n').map(l => `> ${l}`).join('\n'))

    // --- Links ---
    // [texto](https://url)  →  <https://url|texto>
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<$2|$1>');
}

function buscarUsuarioPorEmail_(email) {
  const url = `https://slack.com/api/users.lookupByEmail?email=${encodeURIComponent(email)}`;
  const resposta = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: { Authorization: `Bearer ${SLACK_TOKEN}` },
    muteHttpExceptions: true
  });

  const json = JSON.parse(resposta.getContentText());
  if (!json.ok) throw new Error(json.error || 'Erro ao buscar usuário');

  const u = json.user;
  const nomeCompleto = u.profile.real_name || u.profile.display_name || u.name;
  const primeiroNome = nomeCompleto.split(' ')[0];

  return {
    id:           u.id,
    email:        email,
    username:     u.name,
    nomeCompleto: nomeCompleto,
    primeiroNome: primeiroNome
  };
}

function enviarMensagem_(userId, texto) {
  const payload = JSON.stringify({ channel: userId, text: texto, mrkdwn: true });
  const resposta = UrlFetchApp.fetch('https://slack.com/api/chat.postMessage', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: `Bearer ${SLACK_TOKEN}` },
    payload: payload,
    muteHttpExceptions: true
  });

  const json = JSON.parse(resposta.getContentText());
  if (!json.ok) throw new Error(json.error || 'Erro ao enviar mensagem');
}
