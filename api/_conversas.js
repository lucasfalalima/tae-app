/* =====================================================================
   CONTEÚDO DOS TREINOS DE CONVERSA COM IA
   ---------------------------------------------------------------------
   Este arquivo só guarda conteúdo. A mecânica fica em api/converse.js
   e em converse.html. Treino novo de conversa = uma entrada nova em
   TREINOS, sem mexer no resto.

   Por que o conteúdo fica aqui (no servidor) e não na página:
   as instruções do personagem e da avaliação não podem ser alteradas
   por quem abre a página. A página só recebe o que o aluno vê.
   (Arquivo começa com "_" = a Vercel não transforma em endereço.)
   ===================================================================== */

const TREINOS = {

  /* ---------------- Treino 11: Diga não sem rodeio ---------------- */
  "3.1": {
    titulo: "Treino 11: Diga não sem rodeio",
    pilar: "Pilar 3: Assertividade",
    icone: "🙅",
    instrucoes: "Alguém vai te pedir uma coisa que você não quer ou não pode fazer. Responda falando, como numa conversa de verdade. A pessoa vai insistir. No fim, você recebe sua nota.",

    /* A técnica que a IA usa para avaliar. Mantenha alinhada com a aula. */
    tecnica: "Dizer não sem rodeio: o não vem logo no começo, com no máximo um motivo curto, sem 'talvez' e sem pedir desculpas demais. Quando a pessoa insiste, o aluno repete o não com calma, sem inventar novas justificativas e sem ceder. Firme, mas com respeito: pode reconhecer o pedido e, se fizer sentido, oferecer uma alternativa que ele realmente queira oferecer.",

    /* Cada critério vale 1 estrela (nota de 0 a 5).
       nome = o que o aluno vê. regra = como a IA decide. */
    criterios: [
      { nome: "Não logo de cara",
        regra: "Na PRIMEIRA resposta do aluno, a recusa clara aparece logo no começo (na primeira ou segunda frase). Se ele enrola, faz rodeio, explica antes de recusar ou só recusa no fim, não ganha." },
      { nome: "Sem \"talvez\"",
        regra: "Em nenhuma resposta o aluno usa frases que deixam a porta aberta, como 'vou ver', 'acho que não vai dar', 'quem sabe', 'vou tentar', 'depois te falo', 'acho difícil'. Um 'não' claro ('não vou', 'não posso', 'não dá') ganha." },
      { nome: "Motivo curto",
        regra: "O aluno dá no máximo um motivo curto (ou nenhum). Não ganha se fizer uma lista de justificativas, se explicar demais ou se pedir desculpas mais de uma vez na conversa." },
      { nome: "Manteve o não",
        regra: "Quando o personagem insistiu, o aluno sustentou a recusa até o fim. Não ganha se cedeu, aceitou parte do pedido que tinha recusado ou trocou o não por 'tá bom, vou ver'. Oferecer uma alternativa menor e diferente, por iniciativa própria, não é ceder." },
      { nome: "Com respeito",
        regra: "O aluno foi firme sem ser grosso: tom cordial, sem ironia, sem ataque e sem acusar a pessoa. Reconhecer o pedido ou a pessoa ('entendo que é importante', 'obrigado por lembrar de mim') conta a favor." }
    ],

    /* Personagens. O aluno recebe um sorteado e pode sortear outro.
       cena = contexto que o aluno lê antes de começar.
       abertura = primeira fala do personagem (fixa, para começar sem esperar).
       jeito = como o personagem fala.
       taticas = formas de insistir, uma por vez, na ordem. */
    personagens: [
      { id: "chefe", papel: "Chefe", nome: "Marcelo", emoji: "👔",
        cena: "Sexta-feira, 17h40. Você já tem duas entregas para segunda e combinou de jantar com a família hoje. Marcelo, seu gestor, para na sua mesa.",
        abertura: "Opa, que bom que te achei! O cliente pediu uma apresentação nova pra segunda cedo e eu pensei logo em você. Dá pra você fazer no fim de semana, né? É rapidinho.",
        jeito: "Gestor simpático, mas que costuma empurrar trabalho. Fala de forma informal e corrida, como em escritório brasileiro.",
        taticas: [
          "Elogio: diz que o aluno é o único que faz isso bem.",
          "Minimizar: diz que é coisa de duas horinhas, só um ajuste.",
          "Pressão de carreira: lembra que isso conta na avaliação de fim de ano."
        ] },

      { id: "cliente", papel: "Cliente", nome: "Dona Sandra", emoji: "🧾",
        cena: "Há dois anos você cuida das redes sociais da loja da Dona Sandra. O valor do mês já está fechado. Ela te liga com um pedido a mais.",
        abertura: "Oi, tudo bem? Olha, queria te pedir uma coisinha: além dos posts, você podia fazer também os vídeos da loja esse mês? Sem mudar o valor, né, que a gente já é parceira há tanto tempo.",
        jeito: "Cliente antiga, carinhosa, que usa a amizade para pedir mais sem pagar. Fala com jeitinho, chama de 'querido(a)' sem marcar gênero quando possível.",
        taticas: [
          "Relação: lembra que são parceiros há anos e que ela sempre indicou o aluno.",
          "Minimizar: diz que é só um vídeo curtinho, coisa de celular.",
          "Ameaça velada: comenta que um sobrinho dela faz isso de graça."
        ] },

      { id: "amigo", papel: "Amigo", nome: "Rafa", emoji: "🍻",
        cena: "Vocês são amigos desde a escola. Ele ainda não devolveu os R$ 800 que você emprestou no começo do ano. Ele te manda um áudio.",
        abertura: "E aí, quanto tempo! Cara, tô numa situação chata... tu consegue me emprestar dois mil até o fim do mês? Juro que dessa vez eu te pago certinho.",
        jeito: "Amigo de longa data, brincalhão, fala bem informal ('cara', 'mano', 'tu').",
        taticas: [
          "Desespero: diz que é sério, que o aluguel está atrasado.",
          "Amizade: diz que faria o mesmo pelo aluno sem pensar duas vezes.",
          "Barganha: pede então metade, só mil."
        ] },

      { id: "conjuge", papel: "Cônjuge", nome: "Dani", emoji: "💛",
        cena: "Feriado prolongado chegando. Você está sem energia e planejou descansar em casa. Dani, seu amor, chega com outro plano e muita empolgação.",
        abertura: "Amor, adivinha! Minha mãe chamou a gente pra passar o feriado todo lá no sítio. Já falei que a gente vai, tá? Ela ficou tão feliz!",
        jeito: "Cônjuge carinhoso e animado, fala com intimidade ('amor'). Evite marcar o gênero de Dani e do aluno nas falas.",
        taticas: [
          "Fato consumado: diz que já confirmou com a mãe.",
          "Culpa: diz que a mãe vai ficar chateada e que ela está sozinha.",
          "Cobrança: lembra que no último feriado foram na família do aluno."
        ] },

      { id: "colega", papel: "Colega", nome: "Bruno", emoji: "🗂️",
        cena: "É a terceira vez no mês que o Bruno pede para você cobrir o plantão de sábado dele. Neste sábado é o aniversário do seu sobrinho.",
        abertura: "Fala! Seguinte, surgiu um negócio aqui e eu não vou conseguir ficar no plantão de sábado. Tu cobre pra mim? Depois eu te devolvo, prometo.",
        jeito: "Colega de equipe boa-praça, mas folgado. Fala informal e rápido.",
        taticas: [
          "Promessa: jura que devolve dois plantões depois.",
          "Pressão do grupo: diz que já perguntou para todo mundo e só sobrou o aluno.",
          "Culpa: diz que vai se complicar com o chefe se ninguém cobrir."
        ] },

      { id: "irma", papel: "Irmã", nome: "Cláudia", emoji: "👶",
        cena: "Sua irmã tem dois filhos pequenos e quer viajar com o marido no fim de semana. Você tem uma prova importante na segunda e precisa estudar.",
        abertura: "Oi! Preciso muito da sua ajuda: fica com as crianças sábado e domingo pra mim? A gente quase nunca consegue sair só nós dois…",
        jeito: "Irmã próxima, cansada da rotina, fala com carinho e um pouco de drama.",
        taticas: [
          "Minimizar: diz que as crianças dão zero trabalho e dormem cedo.",
          "Família: diz que a mãe sempre falou que irmão tem que ajudar irmão.",
          "Culpa: diz que já pagou a pousada e vai perder o dinheiro."
        ] }
    ]
  }

};

module.exports = { TREINOS };
