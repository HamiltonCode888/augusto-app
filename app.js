(() => {
  const cfg = window.APP_CONFIG || {};
  const statusList = document.getElementById('statusList');
  const waLink = document.getElementById('waLink');
  const installBtn = document.getElementById('installBtn');

  // WhatsApp link
  const baseWA = "https://wa.me/";
  const hello = encodeURIComponent("Olá, quero falar com a HIA Solutions pelo app do Augusto.");
  const waHref = baseWA + (cfg.WHATSAPP_NUMBER || "") + "?text=" + hello;
  waLink.href = waHref;

  function pushStatus(msg){
    const li = document.createElement('li');
    const time = new Date().toLocaleTimeString();
    li.textContent = `[${time}] ${msg}`;
    statusList.prepend(li);
  }

  // Handle action buttons
  document.querySelectorAll('.btn.action').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      handleAction(action);
    });
  });

  function handleAction(action){
    const map = {
      chatbot: "Criação de chatbot",
      automacao: "Automação com IA",
      agenda: "Agendamento de reuniões",
      especialista: "Falar com um especialista",
      servicos: "Ver todos os serviços"
    };
    const label = map[action] || action;
    pushStatus(`Ação selecionada: ${label}`);

    // Enviar intenção via WhatsApp com pré-texto
    const text = encodeURIComponent(`
[Augusto App]
Solicitação: ${label}
Projeto: ${cfg.PROJECT_NAME}
`);
    const href = baseWA + (cfg.WHATSAPP_NUMBER || "") + "?text=" + text;
    window.open(href, "_blank");

    // (Opcional) Disparar registro no GAS (quando o endpoint existir)
    if (cfg.GAS_ENDPOINT){
      fetch(cfg.GAS_ENDPOINT, {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({event:"action", label, project: cfg.PROJECT_NAME, ts: Date.now()})
      }).then(r=>r.json()).then(() => {
        pushStatus(`Evento registrado na planilha: ${label}`);
      }).catch(() => pushStatus("Falha ao registrar no GAS (verifique o endpoint)."));
    }
  }

  // PWA install
  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'inline-flex';
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    pushStatus(outcome === 'accepted' ? 'App instalado!' : 'Instalação cancelada.');
    deferredPrompt = null;
    installBtn.style.display = 'none';
  });

  // initial
  pushStatus('App iniciado. Pronto para atendimento.');
})();