/* =====================================================================
   QE — Quociente de Expressividade
   ---------------------------------------------------------------------
   Um número de 0 a 100 que resume o treino do aluno. Usado pelo Painel
   (index.html) e pela tela de resultado de cada treino.

   Como é calculado (pesos em QE.PESOS):
     70 pontos  estrelas nos 20 treinos (vale a maior nota de cada um)
     15 pontos  estrelas nas preparações
     15 pontos  dias treinados no total (chega no máximo com QE.DIAS_CHEIO)

   Regra de ouro: o QE NUNCA CAI. Por isso usa o TOTAL de dias treinados,
   e não "dias seguidos". Parar de treinar não tira nada do aluno.
   ===================================================================== */
(function(){
  const QE = {
    PESOS:{ treinos:70, preparacao:15, constancia:15 },
    TREINOS:20,          /* 4 pilares x 5 treinos */
    PILARES:4,
    POR_PILAR:5,
    PREPARACOES:9,       /* situações da aba Preparação (prontas ou não) */
    DIAS_CHEIO:30        /* com 30 dias treinados, a constância está cheia */
  };

  /* notas: {"1.1":5, "2.4":3}   prep: {"entrevista":4}   dias: ["2026-10-30", ...]
     Devolve { total, partes:{treinos,preparacao,constancia}, pilares:[0..100 x4] } */
  QE.calcular = function(notas, prep, dias){
    notas = notas || {}; prep = prep || {}; dias = dias || [];

    let estrelas = 0;
    const porPilar = [0,0,0,0];
    Object.keys(notas).forEach(function(k){
      const m = /^([1-4])\.([1-5])$/.exec(k);
      if(!m) return;
      const v = Math.max(0, Math.min(5, notas[k] || 0));
      estrelas += v;
      porPilar[m[1] - 1] += v;
    });

    let estrelasPrep = 0;
    Object.keys(prep).forEach(function(k){ estrelasPrep += Math.max(0, Math.min(5, prep[k] || 0)); });

    const diasUnicos = {};
    dias.forEach(function(d){ diasUnicos[d] = true; });
    const nDias = Object.keys(diasUnicos).length;

    const partes = {
      treinos: estrelas / (QE.TREINOS * 5) * QE.PESOS.treinos,
      preparacao: Math.min(1, estrelasPrep / (QE.PREPARACOES * 5)) * QE.PESOS.preparacao,
      constancia: Math.min(1, nDias / QE.DIAS_CHEIO) * QE.PESOS.constancia
    };
    const bruto = partes.treinos + partes.preparacao + partes.constancia;

    return {
      total: Math.min(100, Math.round(bruto)),
      bruto: bruto,
      partes: partes,
      pilares: porPilar.map(function(s){ return Math.round(s / (QE.POR_PILAR * 5) * 100); })
    };
  };

  /* Lê o que este aparelho sabe do aluno: o que está salvo no navegador
     mais a última cópia do Cademí. Só para exibir. */
  QE.lerDoAparelho = function(quem){
    const r = { notas:{}, prep:{}, dias:[] };
    function juntar(notas, dias){
      Object.keys(notas || {}).forEach(function(k){
        if(r.notas[k] === undefined || notas[k] > r.notas[k]) r.notas[k] = notas[k];
      });
      (dias || []).forEach(function(d){ if(r.dias.indexOf(d) === -1) r.dias.push(d); });
    }
    try{
      quem = quem || localStorage.getItem("tae_aluno_atual") || "visitante";
      juntar(JSON.parse(localStorage.getItem("tae_notas_" + quem) || "{}"),
             JSON.parse(localStorage.getItem("tae_dias_" + quem) || "[]"));
      const c = JSON.parse(localStorage.getItem("tae_cademi_" + quem) || "null");
      if(c) juntar(c.notas, c.dias);
      r.prep = JSON.parse(localStorage.getItem("tae_prep_" + quem) || "{}");
    }catch(e){}
    return r;
  };

  QE.doAparelho = function(quem){
    const d = QE.lerDoAparelho(quem);
    return QE.calcular(d.notas, d.prep, d.dias);
  };

  /* ---------- Tela de resultado: "+3 QE" ----------
     Uso em qualquer treino:
       TAE_QE.comGanho(function(){ guardarNota(estrelas); });
     Tira uma foto do QE antes, roda a gravação, compara e mostra o ganho
     logo abaixo das estrelas (#f-estrelas). */
  QE.comGanho = function(gravar){
    let antes = null;
    try{ antes = QE.doAparelho(); }catch(e){}
    gravar();
    try{
      const depois = QE.doAparelho();
      if(antes) QE.mostrarGanho(antes.total, depois.total);
    }catch(e){}
  };

  function estilo(){
    if(document.getElementById("qe-estilo")) return;
    const s = document.createElement("style");
    s.id = "qe-estilo";
    s.textContent =
      ".qe-ganho{display:flex;align-items:center;justify-content:center;gap:10px;" +
      "margin:2px auto 14px;padding:9px 16px;border-radius:99px;width:max-content;max-width:100%;" +
      "background:rgba(247,208,70,.10);border:1px solid rgba(247,208,70,.35);" +
      "font-size:14px;line-height:1.3;color:var(--texto,#dee2e6)}" +
      ".qe-ganho b{font-size:20px;font-weight:800;color:var(--amarelo,#f7d046);font-variant-numeric:tabular-nums}" +
      ".qe-ganho .qe-mais{font-weight:800;color:var(--verde,#4ade80);" +
      "animation:qe-sobe .9s ease-out both}" +
      "@keyframes qe-sobe{0%{opacity:0;transform:translateY(8px) scale(.8)}" +
      "60%{opacity:1;transform:translateY(-2px) scale(1.12)}100%{transform:none}}" +
      "@media(prefers-reduced-motion:reduce){.qe-ganho .qe-mais{animation:none}}";
    document.head.appendChild(s);
  }

  /* Conta o número subindo de "antes" até "depois". */
  function animarNumero(el, de, ate){
    if(de === ate || !window.requestAnimationFrame){ el.textContent = ate; return; }
    const ini = performance.now(), dur = 900;
    function passo(t){
      const k = Math.min(1, (t - ini) / dur);
      el.textContent = Math.round(de + (ate - de) * (1 - Math.pow(1 - k, 3)));
      if(k < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  }

  QE.mostrarGanho = function(antes, depois){
    const ref = document.getElementById("f-estrelas");
    if(!ref || !ref.parentNode) return;
    estilo();
    let caixa = document.getElementById("qe-ganho");
    if(!caixa){
      caixa = document.createElement("div");
      caixa.id = "qe-ganho";
      caixa.className = "qe-ganho";
      ref.parentNode.insertBefore(caixa, ref.nextSibling);
    }
    const ganho = depois - antes;
    caixa.innerHTML = 'Seu QE <b class="qe-num">' + antes + '</b>' +
      (ganho > 0 ? '<span class="qe-mais">+' + ganho + '</span>' : '');
    if(ganho <= 0) caixa.title = "O QE sobe com nota mais alta ou com um novo dia de treino.";
    animarNumero(caixa.querySelector(".qe-num"), antes, depois);
  };

  window.TAE_QE = QE;
})();
