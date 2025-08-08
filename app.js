(() => {
  const cfg = window.APP_CONFIG || {};
  const statusList = document.getElementById('statusList');
  const waLink = document.getElementById('waLink');
  const baseWA = "https://wa.me/";
  const hello = encodeURIComponent("Olá, quero falar com a HIA Solutions pelo app do Augusto.");
  waLink.href = baseWA + (cfg.WHATSAPP_NUMBER || "") + "?text=" + hello;
  function pushStatus(msg){
    const li = document.createElement('li');
    li.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    statusList.prepend(li);
  }
  document.querySelectorAll('.btn.action').forEach(btn => {
    btn.addEventListener('click', () => {
      const map = {chatbot:"Criação de chatbot",automacao:"Automação com IA",agenda:"Agendamento de reuniões",especialista:"Falar com um especialista",servicos:"Ver todos os serviços"};
      const label = map[btn.dataset.action] || btn.dataset.action;
      pushStatus(`Ação selecionada: ${label}`);
      const text = encodeURIComponent(`[Augusto App]\nSolicitação: ${label}\nProjeto: ${cfg.PROJECT_NAME}`);
      window.open(baseWA + (cfg.WHATSAPP_NUMBER || "") + "?text=" + text, "_blank");
    });
  });
  pushStatus('App iniciado. Pronto para atendimento.');
})();