// Sistema de só-símbolos: cada item tem `s` (índice 0–6 → ◣ ♥ ● ▲ ◀ ★ ◆).
// Para formar frase: pegar item da coluna I + II + III + IV com o MESMO símbolo.
// Estrutura: { chapterId: { colIndex: { replace:true, items:[{en,pt,s},...] } } }

(function() {
  const TRI=0, HRT=1, DOT=2, UP=3, LFT=4, STAR=5, DIA=6;

window.SSF_OVERRIDES = {

  // ════════════════════════════════════════════
  // PROBLEMS
  // ◣ We have to talk over [topic] before [acao]
  // ♥ I have been [vb-ing] [topic/qtd] [obj] for [tempo]
  // ● I am [vb-ing] [qtd] [obj]
  // ════════════════════════════════════════════
  "problems": {
    0: { replace:true, items:[
      {en:"We have to",pt:"Nós precisamos",s:TRI},
      {en:"I have been",pt:"Eu venho",s:HRT},
      {en:"I am",pt:"Eu estou",s:DOT},
    ]},
    1: { replace:true, items:[
      {en:"talk over",pt:"discutir sobre",s:TRI},
      {en:"wrestling with",pt:"quebrando a cabeça com",s:HRT},
      {en:"running up against",pt:"lutando contra",s:HRT},
      {en:"thinking through",pt:"ponderando",s:HRT},
      {en:"sorting out",pt:"resolvendo",s:DOT},
      {en:"running into",pt:"me deparando com",s:DOT},
      {en:"dealing with",pt:"lidando com",s:DOT},
    ]},
    2: { replace:true, items:[
      {en:"this problem",pt:"esse problema",s:TRI},
      {en:"this decision",pt:"essa decisão",s:TRI},
      {en:"this purchase",pt:"essa compra",s:TRI},
      {en:"this decision",pt:"essa decisão",s:HRT},
      {en:"my plans",pt:"meus planos",s:HRT},
      {en:"many",pt:"muitos(as)",s:DOT},
      {en:"some",pt:"algumas",s:DOT},
      {en:"all",pt:"todos(as)",s:DOT},
    ]},
    3: { replace:true, items:[
      {en:"before buying it",pt:"antes de comprar",s:TRI},
      {en:"before deciding",pt:"antes de decidir",s:TRI},
      {en:"for making a decision",pt:"para tomar uma decisão",s:TRI},
      {en:"for a long time",pt:"por um bom tempo",s:HRT},
      {en:"for a few days",pt:"por alguns dias",s:HRT},
      {en:"problems",pt:"problemas",s:DOT},
      {en:"difficulties",pt:"dificuldades",s:DOT},
      {en:"snags",pt:"empecilhos",s:DOT},
    ]},
  },

  // ════════════════════════════════════════════
  // SLEEPING
  // ◣ I [woke up/got up] [tempo/lugar] [quando]
  // ♥ I have [vb] [contexto] [tempo]
  // ● I will [vb] [lugar] [propósito]
  // ▲ My alarm [goes off] [tempo]
  // ════════════════════════════════════════════
  "sleeping": {
    0: { replace:true, items:[
      {en:"I",pt:"Eu",s:TRI},
      {en:"I have",pt:"Eu",s:HRT},
      {en:"I will",pt:"Eu irei",s:DOT},
      {en:"My alarm",pt:"Meu alarme",s:UP},
    ]},
    1: { replace:true, items:[
      {en:"woke up",pt:"acordei",s:TRI},
      {en:"got up",pt:"levantei",s:TRI},
      {en:"dropped off",pt:"apaguei",s:TRI},
      {en:"dozed off",pt:"adormeci",s:HRT},
      {en:"stayed up",pt:"fiquei acordado",s:HRT},
      {en:"slept through",pt:"dormi por",s:HRT},
      {en:"lay down",pt:"deitar",s:DOT},
      {en:"sleep over",pt:"dormir fora",s:DOT},
      {en:"sleep in",pt:"dormir até mais tarde",s:DOT},
      {en:"goes off",pt:"dispara",s:UP},
      {en:"went off",pt:"disparou",s:UP},
    ]},
    2: { replace:true, items:[
      {en:"at 7 a.m.",pt:"às 7 da manhã",s:TRI},
      {en:"early",pt:"cedo",s:TRI},
      {en:"late",pt:"tarde",s:TRI},
      {en:"on the couch",pt:"no sofá",s:TRI},
      {en:"working at the office",pt:"trabalhando no escritório",s:HRT},
      {en:"playing at home",pt:"jogando em casa",s:HRT},
      {en:"the whole night",pt:"a noite toda",s:HRT},
      {en:"on the bed",pt:"na cama",s:DOT},
      {en:"at my friend’s",pt:"na casa do(a) amigo(a)",s:DOT},
      {en:"till lunchtime",pt:"até a hora do almoço",s:DOT},
      {en:"at 6 a.m.",pt:"às 6 da manhã",s:UP},
      {en:"too early",pt:"cedo demais",s:UP},
      {en:"too late",pt:"tarde demais",s:UP},
    ]},
    3: { replace:true, items:[
      {en:"today",pt:"hoje",s:TRI},
      {en:"yesterday",pt:"ontem",s:TRI},
      {en:"this morning",pt:"essa manhã",s:TRI},
      {en:"this week",pt:"essa semana",s:HRT},
      {en:"lately",pt:"ultimamente",s:HRT},
      {en:"to take a nap",pt:"para tirar um cochilo",s:DOT},
      {en:"on Friday",pt:"na sexta",s:DOT},
      {en:"on Sundays",pt:"aos domingos",s:DOT},
      {en:"every day",pt:"todo dia",s:UP},
      {en:"on weekdays",pt:"em dias úteis",s:UP},
    ]},
  },

  // ════════════════════════════════════════════
  // MONEY — Banco, câmbio, pagamentos, finanças
  // ◣ Câmbio — "I need to exchange dollars for euros today please"
  // ♥ Pagamento — "I'd like to pay by credit card if possible thanks"
  // ● Banco — "I want to open a new account online this week"
  // ▲ Gastos — "I spent too much on dinner last weekend honestly"
  // ◀ Cotação — "How much does this cost in dollars please?"
  // ★ Negociar — "Could you give me a discount on this item please"
  // ◆ Economizar — "I'm saving up for a new laptop these days"
  // ════════════════════════════════════════════
  "money": {
    title: "money",
    sub: "Banco, câmbio & pagamentos",
    desc: "Frases pra qualquer situação envolvendo dinheiro em inglês — câmbio, pagamento, banco, negociação. Cada símbolo é uma situação típica. Combine itens das 4 colunas com o mesmo símbolo.",
    0: { replace:true, items:[
      {en:"I need to",pt:"Eu preciso",s:TRI},
      {en:"I'd like to",pt:"Eu gostaria de",s:TRI},
      {en:"Could I",pt:"Posso",s:TRI},
      {en:"Where can I",pt:"Onde posso",s:TRI},

      {en:"I'd like to",pt:"Eu gostaria de",s:HRT},
      {en:"I'll",pt:"Vou",s:HRT},
      {en:"Can I",pt:"Posso",s:HRT},
      {en:"I prefer to",pt:"Prefiro",s:HRT},

      {en:"I want to",pt:"Eu quero",s:DOT},
      {en:"I'd like to",pt:"Eu gostaria de",s:DOT},
      {en:"I'm thinking of",pt:"Estou pensando em",s:DOT},
      {en:"How do I",pt:"Como eu",s:DOT},

      {en:"I spent",pt:"Eu gastei",s:UP},
      {en:"I blew",pt:"Torrei",s:UP},
      {en:"I wasted",pt:"Desperdicei",s:UP},
      {en:"I dropped",pt:"Larguei",s:UP},

      {en:"How much does",pt:"Quanto",s:LFT},
      {en:"What's the price of",pt:"Qual o preço de",s:LFT},
      {en:"How much is",pt:"Quanto é",s:LFT},
      {en:"What does it cost",pt:"Quanto custa",s:LFT},

      {en:"Could you give me",pt:"Você pode me dar",s:STAR},
      {en:"Is there",pt:"Tem",s:STAR},
      {en:"Do you offer",pt:"Vocês oferecem",s:STAR},
      {en:"Can I get",pt:"Posso ter",s:STAR},

      {en:"I'm saving up",pt:"Estou economizando",s:DIA},
      {en:"I'm putting aside",pt:"Estou separando",s:DIA},
      {en:"I'm setting money aside",pt:"Estou guardando dinheiro",s:DIA},
      {en:"I've been saving",pt:"Tenho economizado",s:DIA},
    ]},
    1: { replace:true, items:[
      {en:"exchange",pt:"trocar",s:TRI},
      {en:"withdraw",pt:"sacar",s:TRI},
      {en:"convert",pt:"converter",s:TRI},
      {en:"deposit",pt:"depositar",s:TRI},

      {en:"pay",pt:"pagar",s:HRT},
      {en:"split the bill",pt:"dividir a conta",s:HRT},
      {en:"tip",pt:"dar gorjeta",s:HRT},
      {en:"settle up",pt:"acertar",s:HRT},

      {en:"open a new account",pt:"abrir uma conta nova",s:DOT},
      {en:"transfer money",pt:"transferir dinheiro",s:DOT},
      {en:"apply for a loan",pt:"pedir um empréstimo",s:DOT},
      {en:"close my account",pt:"fechar minha conta",s:DOT},

      {en:"too much",pt:"demais",s:UP},
      {en:"a fortune",pt:"uma fortuna",s:UP},
      {en:"way too much",pt:"muito mais do que devia",s:UP},
      {en:"all my savings",pt:"todas as minhas economias",s:UP},

      {en:"this",pt:"isto",s:LFT},
      {en:"that",pt:"aquilo",s:LFT},
      {en:"the room",pt:"o quarto",s:LFT},
      {en:"the service",pt:"o serviço",s:LFT},

      {en:"a discount",pt:"um desconto",s:STAR},
      {en:"a deal",pt:"uma promo",s:STAR},
      {en:"a payment plan",pt:"um plano de pagamento",s:STAR},
      {en:"any promotion",pt:"alguma promoção",s:STAR},

      {en:"for a new laptop",pt:"para um notebook novo",s:DIA},
      {en:"for a trip",pt:"para uma viagem",s:DIA},
      {en:"for retirement",pt:"para a aposentadoria",s:DIA},
      {en:"for emergencies",pt:"para emergências",s:DIA},
    ]},
    2: { replace:true, items:[
      {en:"dollars for euros",pt:"dólares por euros",s:TRI},
      {en:"some cash",pt:"um dinheiro",s:TRI},
      {en:"a hundred reais",pt:"cem reais",s:TRI},
      {en:"five hundred",pt:"quinhentos",s:TRI},

      {en:"by credit card",pt:"no cartão",s:HRT},
      {en:"in cash",pt:"em dinheiro",s:HRT},
      {en:"by debit",pt:"no débito",s:HRT},
      {en:"with Pix",pt:"no Pix",s:HRT},

      {en:"with this bank",pt:"nesse banco",s:DOT},
      {en:"as a non-resident",pt:"como não-residente",s:DOT},
      {en:"with no fees",pt:"sem taxas",s:DOT},
      {en:"in dollars",pt:"em dólares",s:DOT},

      {en:"on dinner",pt:"com jantar",s:UP},
      {en:"on shopping",pt:"em compras",s:UP},
      {en:"on the trip",pt:"na viagem",s:UP},
      {en:"on this hotel",pt:"nesse hotel",s:UP},

      {en:"in dollars",pt:"em dólares",s:LFT},
      {en:"in cash",pt:"em dinheiro",s:LFT},
      {en:"per night",pt:"por noite",s:LFT},
      {en:"with tax included",pt:"com taxa incluída",s:LFT},

      {en:"on this item",pt:"nesse item",s:STAR},
      {en:"if I pay in cash",pt:"se eu pagar em dinheiro",s:STAR},
      {en:"for paying upfront",pt:"por pagar à vista",s:STAR},
      {en:"for buying two",pt:"por levar dois",s:STAR},

      {en:"these days",pt:"hoje em dia",s:DIA},
      {en:"this year",pt:"esse ano",s:DIA},
      {en:"every month",pt:"todo mês",s:DIA},
      {en:"diligently",pt:"com disciplina",s:DIA},
    ]},
    3: { replace:true, items:[
      {en:"today please",pt:"hoje por favor",s:TRI},
      {en:"at the airport",pt:"no aeroporto",s:TRI},
      {en:"with a good rate",pt:"com boa cotação",s:TRI},
      {en:"if possible",pt:"se possível",s:TRI},

      {en:"if possible",pt:"se possível",s:HRT},
      {en:"thanks",pt:"obrigado(a)",s:HRT},
      {en:"please",pt:"por favor",s:HRT},
      {en:"separately",pt:"separadamente",s:HRT},

      {en:"online",pt:"online",s:DOT},
      {en:"this week",pt:"essa semana",s:DOT},
      {en:"with low fees",pt:"com taxas baixas",s:DOT},
      {en:"as soon as possible",pt:"o mais rápido possível",s:DOT},

      {en:"last weekend",pt:"fim de semana passado",s:UP},
      {en:"this month",pt:"esse mês",s:UP},
      {en:"honestly",pt:"sinceramente",s:UP},
      {en:"on impulse",pt:"por impulso",s:UP},

      {en:"please",pt:"por favor",s:LFT},
      {en:"by the way",pt:"a propósito",s:LFT},
      {en:"approximately",pt:"aproximadamente",s:LFT},
      {en:"in total",pt:"no total",s:LFT},

      {en:"please",pt:"por favor",s:STAR},
      {en:"if you can",pt:"se puder",s:STAR},
      {en:"to close the deal",pt:"pra fechar o negócio",s:STAR},
      {en:"as a regular customer",pt:"como cliente fiel",s:STAR},

      {en:"slowly but surely",pt:"devagar mas sempre",s:DIA},
      {en:"for the future",pt:"para o futuro",s:DIA},
      {en:"as much as I can",pt:"o máximo que consigo",s:DIA},
      {en:"and it's working",pt:"e tá dando certo",s:DIA},
    ]},
    examples: [
      {en:"I need to exchange dollars for euros today please",pt:"Preciso trocar dólares por euros hoje por favor"},
      {en:"Where can I withdraw some cash with a good rate?",pt:"Onde posso sacar um dinheiro com boa cotação?"},
      {en:"I'd like to pay by credit card if possible thanks",pt:"Eu gostaria de pagar no cartão se possível obrigado"},
      {en:"Can I split the bill separately please?",pt:"Posso dividir a conta separadamente por favor?"},
      {en:"I want to open a new account online this week",pt:"Eu quero abrir uma conta nova online essa semana"},
      {en:"How do I transfer money with low fees as soon as possible?",pt:"Como eu transfiro dinheiro com taxas baixas o mais rápido possível?"},
      {en:"I spent too much on dinner last weekend honestly",pt:"Gastei demais com jantar fim de semana passado sinceramente"},
      {en:"I blew a fortune on shopping on impulse",pt:"Torrei uma fortuna em compras por impulso"},
      {en:"How much does this cost in dollars please?",pt:"Quanto isto custa em dólares por favor?"},
      {en:"What's the price of the room per night with tax included?",pt:"Qual o preço do quarto por noite com taxa incluída?"},
      {en:"Could you give me a discount on this item please?",pt:"Você pode me dar um desconto nesse item por favor?"},
      {en:"Is there a deal if I pay in cash to close the deal?",pt:"Tem uma promo se eu pagar em dinheiro pra fechar o negócio?"},
      {en:"I'm saving up for a new laptop these days slowly but surely",pt:"Estou economizando para um notebook novo hoje em dia devagar mas sempre"},
      {en:"I've been saving for retirement diligently for the future",pt:"Tenho economizado para a aposentadoria com disciplina para o futuro"},
    ],
    phrasals: [
      {term:"I need to / I'd like to (com câmbio)",desc:"'Exchange' = trocar moedas. 'Withdraw' = sacar do caixa. Sempre 'X for Y' (dollars FOR euros). Note: 'a good rate' (boa cotação) é a chave em qualquer câmbio.",ex:[
        {en:"I need to exchange dollars for euros today",pt:"Preciso trocar dólares por euros hoje"},
        {en:"Where can I withdraw some cash with a good rate?",pt:"Onde posso sacar um dinheiro com boa cotação?"}
      ]},
      {term:"I'd like to pay by",desc:"'Pay BY card' (preposição 'by' + meio) ou 'pay IN cash/dollars' (preposição 'in' + moeda física). Erro clássico: 'pay with card' não é o padrão. Sempre 'pay by'.",ex:[
        {en:"I'd like to pay by credit card if possible",pt:"Eu gostaria de pagar no cartão se possível"},
        {en:"Can I split the bill separately?",pt:"Posso dividir a conta separadamente?"}
      ]},
      {term:"I want to open / How do I transfer",desc:"Frases de banco. 'Open an account' (sempre 'an'). 'Transfer money' não 'transfer wage' (que é outra coisa). 'Apply for a loan' = pedir empréstimo.",ex:[
        {en:"I want to open a new account online",pt:"Eu quero abrir uma conta nova online"},
        {en:"How do I transfer money with low fees?",pt:"Como eu transfiro dinheiro com taxas baixas?"}
      ]},
      {term:"I spent / I blew",desc:"'Spent' é neutro; 'blew' (passado de blow) é gastou demais, com arrependimento. 'Wasted' implica desperdício real. 'Dropped' (informal) = larguei muito dinheiro em algo.",ex:[
        {en:"I spent too much on dinner last weekend",pt:"Gastei demais com jantar fim de semana passado"},
        {en:"I blew a fortune on shopping on impulse",pt:"Torrei uma fortuna em compras por impulso"}
      ]},
      {term:"How much does / What's the price of",desc:"Pra perguntar preço. 'How much DOES this cost' (com 'does' + verbo no infinitivo). 'How much IS this' (com 'is' + sem verbo). Ambos funcionam. 'In [moeda]' especifica moeda.",ex:[
        {en:"How much does this cost in dollars?",pt:"Quanto isto custa em dólares?"},
        {en:"How much is the room per night?",pt:"Quanto é o quarto por noite?"}
      ]},
      {term:"Could you give me a discount",desc:"Pra negociar. 'Discount' (desconto) é o termo padrão. 'Deal' implica oferta especial. 'Promotion' é mais formal. Adicionar contexto ('if I pay in cash', 'as a regular customer') aumenta chance de sucesso.",ex:[
        {en:"Could you give me a discount on this item?",pt:"Você pode me dar um desconto nesse item?"},
        {en:"Is there a deal if I pay in cash?",pt:"Tem uma promo se eu pagar em dinheiro?"}
      ]},
      {term:"I'm saving up / I've been saving",desc:"'Saving up FOR [objetivo]' = economizando com propósito. 'I'm saving' (presente contínuo) = ação atual. 'I've been saving' (present perfect continuous) = vem economizando há um tempo.",ex:[
        {en:"I'm saving up for a new laptop these days",pt:"Estou economizando para um notebook novo hoje em dia"},
        {en:"I've been saving for retirement diligently",pt:"Tenho economizado para a aposentadoria com disciplina"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // HEALTH — Médico, farmácia, falando de saúde
  // ◣ Sintomas — "I have a headache that started yesterday morning"
  // ♥ Marcando consulta — "I'd like to make an appointment with a doctor today"
  // ● Histórico / alergias — "I'm allergic to penicillin since I was a kid"
  // ▲ Pedindo medicamento — "Can you prescribe something for the pain please"
  // ◀ Hábitos saudáveis — "I usually exercise three times a week at the gym"
  // ★ Como tem se sentido — "I've been feeling tired for days now lately"
  // ◆ Pergunta sobre seriedade — "Is this anything serious doctor by any chance"
  // ════════════════════════════════════════════
  "health": {
    title: "health",
    sub: "Médico, farmácia & saúde",
    desc: "Frases pra qualquer situação médica em inglês — descrever sintomas, marcar consulta, falar de alergias, pedir medicamento. Cada símbolo é uma situação típica. Combine itens das 4 colunas com o mesmo símbolo.",
    0: { replace:true, items:[
      {en:"I have",pt:"Eu tenho",s:TRI},
      {en:"I've got",pt:"Eu peguei",s:TRI},
      {en:"I'm dealing with",pt:"Estou lidando com",s:TRI},
      {en:"I think I have",pt:"Acho que tenho",s:TRI},

      {en:"I'd like to",pt:"Eu gostaria de",s:HRT},
      {en:"I need to",pt:"Eu preciso",s:HRT},
      {en:"Could I",pt:"Posso",s:HRT},
      {en:"Can I",pt:"Posso",s:HRT},

      {en:"I'm allergic to",pt:"Sou alérgico(a) a",s:DOT},
      {en:"I can't take",pt:"Não posso tomar",s:DOT},
      {en:"I'm sensitive to",pt:"Sou sensível a",s:DOT},
      {en:"I've had bad reactions to",pt:"Tive reação ruim a",s:DOT},

      {en:"Can you prescribe",pt:"Você pode receitar",s:UP},
      {en:"Could I get",pt:"Posso pegar",s:UP},
      {en:"Do you have something for",pt:"Tem algo para",s:UP},
      {en:"What do you recommend for",pt:"O que você recomenda para",s:UP},

      {en:"I usually exercise",pt:"Eu geralmente faço exercício",s:LFT},
      {en:"I work out",pt:"Eu malho",s:LFT},
      {en:"I try to stay active",pt:"Tento ficar ativo(a)",s:LFT},
      {en:"I go for a run",pt:"Eu corro",s:LFT},

      {en:"I've been feeling",pt:"Eu venho me sentindo",s:STAR},
      {en:"I've been having",pt:"Eu venho tendo",s:STAR},
      {en:"I've felt",pt:"Eu me senti",s:STAR},
      {en:"Lately I've been",pt:"Ultimamente tenho estado",s:STAR},

      {en:"Is this",pt:"Isto é",s:DIA},
      {en:"Is it",pt:"É",s:DIA},
      {en:"Should I be worried about",pt:"Devo me preocupar com",s:DIA},
      {en:"Could it be",pt:"Pode ser",s:DIA},
    ]},
    1: { replace:true, items:[
      {en:"a headache",pt:"uma dor de cabeça",s:TRI},
      {en:"a fever",pt:"febre",s:TRI},
      {en:"a sore throat",pt:"dor de garganta",s:TRI},
      {en:"stomach pain",pt:"dor de estômago",s:TRI},

      {en:"make an appointment",pt:"marcar uma consulta",s:HRT},
      {en:"see a doctor",pt:"ver um médico",s:HRT},
      {en:"get a check-up",pt:"fazer um check-up",s:HRT},
      {en:"speak with a nurse",pt:"falar com uma enfermeira",s:HRT},

      {en:"penicillin",pt:"penicilina",s:DOT},
      {en:"ibuprofen",pt:"ibuprofeno",s:DOT},
      {en:"aspirin",pt:"aspirina",s:DOT},
      {en:"antibiotics",pt:"antibióticos",s:DOT},

      {en:"something for",pt:"algo para",s:UP},
      {en:"painkillers for",pt:"analgésicos para",s:UP},
      {en:"medicine for",pt:"remédio para",s:UP},
      {en:"a cream for",pt:"uma pomada para",s:UP},

      {en:"three times a week",pt:"três vezes por semana",s:LFT},
      {en:"every morning",pt:"toda manhã",s:LFT},
      {en:"on weekends",pt:"nos fins de semana",s:LFT},
      {en:"after work",pt:"depois do trabalho",s:LFT},

      {en:"tired",pt:"cansado(a)",s:STAR},
      {en:"dizzy",pt:"tonto(a)",s:STAR},
      {en:"weak",pt:"fraco(a)",s:STAR},
      {en:"nauseous",pt:"enjoado(a)",s:STAR},

      {en:"anything serious",pt:"algo sério",s:DIA},
      {en:"contagious",pt:"contagioso",s:DIA},
      {en:"normal",pt:"normal",s:DIA},
      {en:"an emergency",pt:"uma emergência",s:DIA},
    ]},
    2: { replace:true, items:[
      {en:"that started",pt:"que começou",s:TRI},
      {en:"that gets worse",pt:"que piora",s:TRI},
      {en:"that comes and goes",pt:"que vai e vem",s:TRI},
      {en:"that won't go away",pt:"que não passa",s:TRI},

      {en:"with a doctor",pt:"com um médico",s:HRT},
      {en:"at the clinic",pt:"na clínica",s:HRT},
      {en:"online if possible",pt:"online se possível",s:HRT},
      {en:"as soon as possible",pt:"o mais rápido possível",s:HRT},

      {en:"since I was a kid",pt:"desde criança",s:DOT},
      {en:"so be careful",pt:"então cuidado",s:DOT},
      {en:"please note this",pt:"por favor anote",s:DOT},
      {en:"in my medical history",pt:"no meu histórico",s:DOT},

      {en:"the pain",pt:"a dor",s:UP},
      {en:"the headache",pt:"a dor de cabeça",s:UP},
      {en:"the cough",pt:"a tosse",s:UP},
      {en:"the inflammation",pt:"a inflamação",s:UP},

      {en:"at the gym",pt:"na academia",s:LFT},
      {en:"in the park",pt:"no parque",s:LFT},
      {en:"at home",pt:"em casa",s:LFT},
      {en:"with a trainer",pt:"com um personal",s:LFT},

      {en:"for days",pt:"há dias",s:STAR},
      {en:"this whole week",pt:"essa semana toda",s:STAR},
      {en:"since Monday",pt:"desde segunda",s:STAR},
      {en:"all morning",pt:"a manhã toda",s:STAR},

      {en:"doctor",pt:"doutor(a)",s:DIA},
      {en:"or just a phase",pt:"ou só uma fase",s:DIA},
      {en:"in your opinion",pt:"na sua opinião",s:DIA},
      {en:"to be safe",pt:"pra garantir",s:DIA},
    ]},
    3: { replace:true, items:[
      {en:"yesterday morning",pt:"ontem de manhã",s:TRI},
      {en:"a few days ago",pt:"alguns dias atrás",s:TRI},
      {en:"after the trip",pt:"depois da viagem",s:TRI},
      {en:"last night",pt:"ontem à noite",s:TRI},

      {en:"today",pt:"hoje",s:HRT},
      {en:"tomorrow",pt:"amanhã",s:HRT},
      {en:"this week",pt:"essa semana",s:HRT},
      {en:"if available",pt:"se houver vaga",s:HRT},

      {en:"please write it down",pt:"por favor anote",s:DOT},
      {en:"important to mention",pt:"importante mencionar",s:DOT},
      {en:"just so you know",pt:"só pra você saber",s:DOT},
      {en:"for safety",pt:"por segurança",s:DOT},

      {en:"please",pt:"por favor",s:UP},
      {en:"if possible",pt:"se possível",s:UP},
      {en:"thanks",pt:"obrigado(a)",s:UP},
      {en:"any over-the-counter option",pt:"alguma opção sem receita",s:UP},

      {en:"to stay healthy",pt:"pra ficar saudável",s:LFT},
      {en:"to lose weight",pt:"pra perder peso",s:LFT},
      {en:"to relieve stress",pt:"pra aliviar o estresse",s:LFT},
      {en:"because I love it",pt:"porque amo",s:LFT},

      {en:"now",pt:"agora",s:STAR},
      {en:"lately",pt:"ultimamente",s:STAR},
      {en:"and it's getting worse",pt:"e está piorando",s:STAR},
      {en:"and I'm worried",pt:"e estou preocupado(a)",s:STAR},

      {en:"by any chance",pt:"por acaso",s:DIA},
      {en:"or normal",pt:"ou normal",s:DIA},
      {en:"just to be sure",pt:"só pra ter certeza",s:DIA},
      {en:"or am I overreacting",pt:"ou estou exagerando",s:DIA},
    ]},
    examples: [
      {en:"I have a headache that started yesterday morning",pt:"Eu tenho uma dor de cabeça que começou ontem de manhã"},
      {en:"I've got a fever that won't go away after the trip",pt:"Peguei febre que não passa depois da viagem"},
      {en:"I'd like to make an appointment with a doctor today",pt:"Gostaria de marcar uma consulta com médico hoje"},
      {en:"I need to see a doctor as soon as possible please",pt:"Preciso ver um médico o mais rápido possível por favor"},
      {en:"I'm allergic to penicillin since I was a kid please write it down",pt:"Sou alérgico a penicilina desde criança por favor anote"},
      {en:"I can't take ibuprofen so be careful important to mention",pt:"Não posso tomar ibuprofeno então cuidado importante mencionar"},
      {en:"Can you prescribe something for the pain please?",pt:"Você pode receitar algo para a dor por favor?"},
      {en:"Do you have something for the headache any over-the-counter option?",pt:"Tem algo para a dor de cabeça alguma opção sem receita?"},
      {en:"I usually exercise three times a week at the gym to stay healthy",pt:"Eu geralmente faço exercício três vezes por semana na academia pra ficar saudável"},
      {en:"I go for a run every morning in the park because I love it",pt:"Eu corro toda manhã no parque porque amo"},
      {en:"I've been feeling tired for days now lately",pt:"Eu venho me sentindo cansado há dias ultimamente"},
      {en:"Lately I've been dizzy this whole week and I'm worried",pt:"Ultimamente tenho estado tonto essa semana toda e estou preocupado"},
      {en:"Is this anything serious doctor by any chance?",pt:"Isto é algo sério doutor por acaso?"},
      {en:"Could it be contagious or just a phase just to be sure?",pt:"Pode ser contagioso ou só uma fase só pra ter certeza?"},
    ],
    phrasals: [
      {term:"I have / I've got",desc:"Pra descrever sintomas. 'I have' é mais formal e americano; 'I've got' é mais britânico e casual. Sempre seguido de 'a/an' + sintoma. Não esqueça o artigo: 'I have headache' está errado.",ex:[
        {en:"I have a headache that started yesterday",pt:"Tenho uma dor de cabeça que começou ontem"},
        {en:"I've got a fever that won't go away",pt:"Peguei febre que não passa"}
      ]},
      {term:"I'd like to make an appointment",desc:"A frase exata pra marcar consulta. Sempre 'make an appointment' (não 'mark' como em português). Pode adicionar 'with' (médico específico) ou deixar genérico ('with a doctor').",ex:[
        {en:"I'd like to make an appointment with a doctor today",pt:"Gostaria de marcar uma consulta com médico hoje"},
        {en:"I need to make an appointment as soon as possible",pt:"Preciso marcar uma consulta o mais rápido possível"}
      ]},
      {term:"I'm allergic to / I can't take",desc:"Crítico em qualquer farmácia/hospital. 'Allergic to' = alergia médica (reação física). 'Can't take' = mais geral, evitação. Sempre seguido do nome do medicamento ou substância.",ex:[
        {en:"I'm allergic to penicillin since I was a kid",pt:"Sou alérgico a penicilina desde criança"},
        {en:"I can't take ibuprofen please note this",pt:"Não posso tomar ibuprofeno por favor anote"}
      ]},
      {term:"Can you prescribe / Do you have something for",desc:"'Can you prescribe' é com médico (precisa receita). 'Do you have something for' é mais comum em farmácia (over-the-counter, sem receita). Use 'painkillers' pra analgésicos genéricos.",ex:[
        {en:"Can you prescribe something for the pain?",pt:"Você pode receitar algo para a dor?"},
        {en:"Do you have something for the headache?",pt:"Tem algo para a dor de cabeça?"}
      ]},
      {term:"I usually exercise / I work out",desc:"'Exercise' é mais geral; 'work out' implica academia/musculação. Pra correr: 'go for a run'. Pra esporte: 'play [sport]'. 'Exercise' é incontável — não 'exercises'.",ex:[
        {en:"I usually exercise three times a week",pt:"Eu geralmente faço exercício três vezes por semana"},
        {en:"I work out at the gym after work",pt:"Eu malho na academia depois do trabalho"}
      ]},
      {term:"I've been feeling / Lately I've been",desc:"Present perfect continuous pra descrever sintoma duradouro. Diferente de 'I'm feeling' (agora) — 'I've been feeling' implica há um tempo. 'Lately' reforça essa duração.",ex:[
        {en:"I've been feeling tired for days now",pt:"Eu venho me sentindo cansado há dias"},
        {en:"Lately I've been dizzy this whole week",pt:"Ultimamente tenho estado tonto essa semana toda"}
      ]},
      {term:"Is this anything serious? / Could it be...",desc:"Pra perguntar gravidade ao médico. 'Is this anything serious?' é o mais usado. 'Could it be [doença]?' é educado pra sugerir hipóteses. Termine com 'doctor' pra soar respeitoso.",ex:[
        {en:"Is this anything serious doctor?",pt:"Isto é algo sério doutor?"},
        {en:"Could it be contagious by any chance?",pt:"Pode ser contagioso por acaso?"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // WORK — Carreira & entrevistas
  // ◣ Background acadêmico — "I have a master's in marketing from a top university"
  // ♥ Personalidade — "I am very ambitious under pressure"
  // ● Pontos fortes — "I excel at public speaking when prepared at this company"
  // ▲ Dificuldades — "I struggle with delegating in fast-paced environments"
  // ◀ Cargo & função — "I work as a manager in marketing at a startup"
  // ★ Conquistas — "I led a team of 10 that launched the product last year"
  // ◆ Procurando — "I'm looking for a senior role in tech with growth potential"
  // ════════════════════════════════════════════
  "working": {
    title: "work",
    sub: "Carreira & entrevistas",
    desc: "Frases prontas pra falar sobre seu trabalho — em entrevistas, networking e papos de carreira. Cada símbolo é um padrão diferente. Combine itens das 4 colunas com o mesmo símbolo.",
    0: { replace:true, items:[
      {en:"I have",pt:"Eu tenho",s:TRI},
      {en:"I'm working on",pt:"Estou fazendo",s:TRI},
      {en:"I just finished",pt:"Acabei de terminar",s:TRI},
      {en:"I'm pursuing",pt:"Estou buscando",s:TRI},

      {en:"I am",pt:"Eu sou",s:HRT},
      {en:"I'm",pt:"Eu sou",s:HRT},
      {en:"I tend to be",pt:"Costumo ser",s:HRT},
      {en:"I consider myself",pt:"Me considero",s:HRT},

      {en:"I excel",pt:"Eu me destaco",s:DOT},
      {en:"I'm good",pt:"Eu sou bom(a)",s:DOT},
      {en:"I'm great",pt:"Eu sou ótimo(a)",s:DOT},
      {en:"I really shine",pt:"Eu brilho mesmo",s:DOT},

      {en:"I struggle",pt:"Eu tenho dificuldade",s:UP},
      {en:"I have trouble",pt:"Eu tenho problemas",s:UP},
      {en:"I'm not great",pt:"Não sou ótimo(a)",s:UP},
      {en:"I sometimes battle",pt:"Às vezes luto",s:UP},

      {en:"I work",pt:"Eu trabalho",s:LFT},
      {en:"I'm employed",pt:"Estou empregado(a)",s:LFT},
      {en:"I currently work",pt:"Atualmente trabalho",s:LFT},
      {en:"I serve",pt:"Atuo",s:LFT},

      {en:"I led",pt:"Eu liderei",s:STAR},
      {en:"I managed",pt:"Eu gerenciei",s:STAR},
      {en:"I drove",pt:"Eu conduzi",s:STAR},
      {en:"I oversaw",pt:"Eu supervisionei",s:STAR},

      {en:"I'm looking for",pt:"Estou procurando",s:DIA},
      {en:"I'm searching for",pt:"Estou buscando",s:DIA},
      {en:"I'm open to",pt:"Estou aberto(a) a",s:DIA},
      {en:"I want",pt:"Eu quero",s:DIA},
    ]},
    1: { replace:true, items:[
      {en:"a bachelor's",pt:"uma graduação",s:TRI},
      {en:"a master's",pt:"um mestrado",s:TRI},
      {en:"a doctorate",pt:"um doutorado",s:TRI},
      {en:"an MBA",pt:"um MBA",s:TRI},
      {en:"a certificate",pt:"um certificado",s:TRI},
      {en:"a degree",pt:"uma formação",s:TRI},

      {en:"very",pt:"muito",s:HRT},
      {en:"quite",pt:"bem",s:HRT},
      {en:"extremely",pt:"extremamente",s:HRT},
      {en:"pretty",pt:"bastante",s:HRT},
      {en:"naturally",pt:"naturalmente",s:HRT},

      {en:"at public speaking",pt:"em falar em público",s:DOT},
      {en:"at meeting deadlines",pt:"em cumprir prazos",s:DOT},
      {en:"at managing teams",pt:"em gerenciar times",s:DOT},
      {en:"at problem-solving",pt:"em resolver problemas",s:DOT},
      {en:"at multitasking",pt:"em fazer várias coisas",s:DOT},
      {en:"at negotiating",pt:"em negociar",s:DOT},

      {en:"with work pressure",pt:"com pressão no trabalho",s:UP},
      {en:"with public speaking",pt:"com falar em público",s:UP},
      {en:"with multitasking",pt:"com fazer várias coisas",s:UP},
      {en:"with delegating",pt:"em delegar",s:UP},
      {en:"with strict deadlines",pt:"com prazos apertados",s:UP},
      {en:"with conflict",pt:"com conflitos",s:UP},

      {en:"as a manager",pt:"como gerente",s:LFT},
      {en:"as an analyst",pt:"como analista",s:LFT},
      {en:"as a designer",pt:"como designer",s:LFT},
      {en:"as a developer",pt:"como desenvolvedor(a)",s:LFT},
      {en:"as a director",pt:"como diretor(a)",s:LFT},

      {en:"a project",pt:"um projeto",s:STAR},
      {en:"a team of 10",pt:"um time de 10",s:STAR},
      {en:"a strategy",pt:"uma estratégia",s:STAR},
      {en:"an initiative",pt:"uma iniciativa",s:STAR},

      {en:"a senior role",pt:"uma vaga sênior",s:DIA},
      {en:"a remote job",pt:"um emprego remoto",s:DIA},
      {en:"new challenges",pt:"novos desafios",s:DIA},
      {en:"a leadership position",pt:"uma posição de liderança",s:DIA},
      {en:"fresh opportunities",pt:"oportunidades novas",s:DIA},
    ]},
    2: { replace:true, items:[
      {en:"in marketing",pt:"em marketing",s:TRI},
      {en:"in business",pt:"em administração",s:TRI},
      {en:"in design",pt:"em design",s:TRI},
      {en:"in engineering",pt:"em engenharia",s:TRI},
      {en:"in finance",pt:"em finanças",s:TRI},
      {en:"in HR",pt:"em RH",s:TRI},

      {en:"easygoing",pt:"tranquilo(a)",s:HRT},
      {en:"ambitious",pt:"ambicioso(a)",s:HRT},
      {en:"methodical",pt:"metódico(a)",s:HRT},
      {en:"detail-oriented",pt:"orientado(a) a detalhes",s:HRT},
      {en:"proactive",pt:"proativo(a)",s:HRT},
      {en:"collaborative",pt:"colaborativo(a)",s:HRT},

      {en:"when I'm prepared",pt:"quando estou preparado(a)",s:DOT},
      {en:"under pressure",pt:"sob pressão",s:DOT},
      {en:"with clear goals",pt:"com metas claras",s:DOT},
      {en:"in groups",pt:"em grupos",s:DOT},
      {en:"on tight schedules",pt:"em prazos apertados",s:DOT},
      {en:"when given autonomy",pt:"com autonomia",s:DOT},

      {en:"sometimes",pt:"às vezes",s:UP},
      {en:"when tired",pt:"quando cansado(a)",s:UP},
      {en:"at first",pt:"no começo",s:UP},
      {en:"on Mondays",pt:"nas segundas",s:UP},
      {en:"in tense moments",pt:"em momentos tensos",s:UP},

      {en:"in marketing",pt:"em marketing",s:LFT},
      {en:"in operations",pt:"em operações",s:LFT},
      {en:"in product",pt:"em produto",s:LFT},
      {en:"in engineering",pt:"em engenharia",s:LFT},
      {en:"in HR",pt:"em RH",s:LFT},

      {en:"that grew revenue 30%",pt:"que cresceu o faturamento 30%",s:STAR},
      {en:"that launched the product",pt:"que lançou o produto",s:STAR},
      {en:"that cut costs in half",pt:"que cortou custos pela metade",s:STAR},
      {en:"that won an award",pt:"que ganhou um prêmio",s:STAR},
      {en:"that hit our targets",pt:"que bateu as metas",s:STAR},

      {en:"in tech",pt:"em tech",s:DIA},
      {en:"in finance",pt:"em finanças",s:DIA},
      {en:"in startups",pt:"em startups",s:DIA},
      {en:"in marketing",pt:"em marketing",s:DIA},
    ]},
    3: { replace:true, items:[
      {en:"from a top university",pt:"de uma universidade top",s:TRI},
      {en:"from a public school",pt:"de uma escola pública",s:TRI},
      {en:"abroad",pt:"no exterior",s:TRI},
      {en:"online",pt:"online",s:TRI},
      {en:"from FGV",pt:"da FGV",s:TRI},
      {en:"through extension",pt:"por extensão",s:TRI},

      {en:"at work",pt:"no trabalho",s:HRT},
      {en:"under pressure",pt:"sob pressão",s:HRT},
      {en:"with deadlines",pt:"com prazos",s:HRT},
      {en:"in meetings",pt:"em reuniões",s:HRT},
      {en:"in teams",pt:"em times",s:HRT},
      {en:"with clients",pt:"com clientes",s:HRT},

      {en:"at this company",pt:"nessa empresa",s:DOT},
      {en:"in my role",pt:"no meu cargo",s:DOT},
      {en:"in any setting",pt:"em qualquer ambiente",s:DOT},
      {en:"professionally",pt:"profissionalmente",s:DOT},
      {en:"day-to-day",pt:"no dia a dia",s:DOT},

      {en:"early in projects",pt:"no início de projetos",s:UP},
      {en:"in big groups",pt:"em grupos grandes",s:UP},
      {en:"with new tools",pt:"com ferramentas novas",s:UP},
      {en:"under stress",pt:"sob estresse",s:UP},
      {en:"day after day",pt:"dia após dia",s:UP},

      {en:"at a startup",pt:"em uma startup",s:LFT},
      {en:"at a multinational",pt:"em uma multinacional",s:LFT},
      {en:"at a small agency",pt:"em uma agência pequena",s:LFT},
      {en:"at a tech company",pt:"em uma empresa de tech",s:LFT},
      {en:"remotely",pt:"remotamente",s:LFT},

      {en:"in six months",pt:"em seis meses",s:STAR},
      {en:"last year",pt:"ano passado",s:STAR},
      {en:"within a quarter",pt:"em um trimestre",s:STAR},
      {en:"recently",pt:"recentemente",s:STAR},
      {en:"at my last job",pt:"no meu último emprego",s:STAR},

      {en:"with growth potential",pt:"com potencial de crescimento",s:DIA},
      {en:"that pays well",pt:"que pague bem",s:DIA},
      {en:"with good culture",pt:"com boa cultura",s:DIA},
      {en:"abroad",pt:"no exterior",s:DIA},
      {en:"right away",pt:"o quanto antes",s:DIA},
    ]},
    examples: [
      {en:"I have a master's in marketing from a top university",pt:"Tenho mestrado em marketing por uma universidade top"},
      {en:"I'm pursuing an MBA in business abroad",pt:"Estou fazendo um MBA em administração no exterior"},
      {en:"I tend to be very methodical with deadlines",pt:"Costumo ser bem metódico com prazos"},
      {en:"I consider myself naturally collaborative in teams",pt:"Me considero naturalmente colaborativo em times"},
      {en:"I excel at public speaking when I'm prepared at this company",pt:"Eu me destaco em falar em público quando preparado nessa empresa"},
      {en:"I'm good at multitasking under pressure professionally",pt:"Sou bom em fazer várias coisas sob pressão profissionalmente"},
      {en:"I struggle with delegating at first with new tools",pt:"Tenho dificuldade em delegar no começo com ferramentas novas"},
      {en:"I work as a designer in product at a tech company",pt:"Trabalho como designer em produto numa empresa de tech"},
      {en:"My role is as an analyst in operations remotely",pt:"Meu cargo é analista em operações remotamente"},
      {en:"I led a team of 10 that launched the product last year",pt:"Liderei um time de 10 que lançou o produto ano passado"},
      {en:"I drove an initiative that cut costs in half within a quarter",pt:"Conduzi uma iniciativa que cortou custos pela metade em um trimestre"},
      {en:"I'm looking for a leadership position in startups with good culture",pt:"Estou procurando uma posição de liderança em startups com boa cultura"},
      {en:"I'm open to new challenges in tech right away",pt:"Estou aberto a novos desafios em tech o quanto antes"},
    ],
    phrasals: [
      {term:"I have a [degree]",desc:"Forma direta de descrever sua formação. Use 'a' antes de bachelor's/master's/MBA/certificate. Para doutorado: 'a doctorate' ou 'a PhD'.",ex:[
        {en:"I have a master's in marketing",pt:"Tenho mestrado em marketing"},
        {en:"I'm pursuing a doctorate in finance",pt:"Estou fazendo um doutorado em finanças"}
      ]},
      {term:"I tend to be / I consider myself",desc:"Forma humilde e natural de descrever sua personalidade — soa menos arrogante que 'I am very X'. Ótimo em entrevistas para descrever soft skills.",ex:[
        {en:"I tend to be quite methodical with deadlines",pt:"Costumo ser bem metódico com prazos"},
        {en:"I consider myself naturally proactive in teams",pt:"Me considero naturalmente proativo em times"}
      ]},
      {term:"I excel at / I'm good at",desc:"Para falar de pontos fortes. 'Excel at' é mais formal; 'good at' mais conversacional. Sempre seguido de gerúndio (-ing) ou substantivo.",ex:[
        {en:"I excel at public speaking when I'm prepared",pt:"Eu me destaco em falar em público quando preparado"},
        {en:"I'm great at managing teams in any setting",pt:"Sou ótimo em gerenciar times em qualquer ambiente"}
      ]},
      {term:"I struggle with / I have trouble with",desc:"Forma honesta de admitir pontos fracos numa entrevista — sem soar fraco. Mostra autoconhecimento. Sempre seguido de gerúndio ou substantivo, com 'with'.",ex:[
        {en:"I struggle with delegating at first",pt:"Tenho dificuldade em delegar no começo"},
        {en:"I have trouble with strict deadlines under stress",pt:"Tenho problemas com prazos apertados sob estresse"}
      ]},
      {term:"I work as / I'm employed as",desc:"Forma natural de dizer seu cargo. 'I work as a manager' soa muito melhor que 'My job is manager'. Sempre 'as a/an' antes do cargo.",ex:[
        {en:"I work as a developer in engineering at a tech company",pt:"Trabalho como dev em engenharia numa empresa de tech"},
        {en:"I'm currently employed as an analyst at a multinational",pt:"Atualmente sou analista numa multinacional"}
      ]},
      {term:"I led/managed [X] that [result]",desc:"Estrutura STAR pra contar conquistas em entrevistas. Sempre conecte o que você fez com o resultado quantificável. Substitua os números pelos seus reais.",ex:[
        {en:"I led a project that grew revenue 30% in six months",pt:"Liderei um projeto que cresceu o faturamento 30% em seis meses"},
        {en:"I managed a team of 10 that hit our targets last year",pt:"Gerenciei um time de 10 que bateu as metas ano passado"}
      ]},
      {term:"I'm looking for / I'm open to",desc:"Para networking e LinkedIn. 'Looking for' é específico (cargo definido); 'open to' é mais flexível (várias possibilidades). Use ambos pra mostrar abertura sem parecer perdido.",ex:[
        {en:"I'm looking for a senior role in tech with growth potential",pt:"Estou procurando uma vaga sênior em tech com potencial de crescimento"},
        {en:"I'm open to new challenges abroad",pt:"Estou aberto a novos desafios no exterior"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // EDUCATION — Estudos, faculdade, cursos
  // ◣ Apresentando estudo — "I'm studying business at a university in São Paulo"
  // ♥ Conquista acadêmica — "I graduated from college last year with honors"
  // ● Curso atual — "I'm taking a course on data science online this semester"
  // ▲ Plano de estudo — "I'm planning to apply for a master's next year abroad"
  // ◀ Desafio acadêmico — "I'm struggling with calculus this semester honestly"
  // ★ Hábito de estudo — "I usually study at the library after class daily"
  // ◆ Discutindo nota — "I got an A on the test which surprised me really"
  // ════════════════════════════════════════════
  "education": {
    title: "education",
    sub: "Estudos & cursos",
    desc: "Frases pra falar sobre seus estudos em inglês — onde estuda, o que cursa, planos acadêmicos. Cada símbolo é uma situação típica. Combine itens das 4 colunas com o mesmo símbolo.",
    0: { replace:true, items:[
      {en:"I'm studying",pt:"Estou estudando",s:TRI},
      {en:"I study",pt:"Eu estudo",s:TRI},
      {en:"I major in",pt:"Faço",s:TRI},
      {en:"My major is",pt:"Minha graduação é",s:TRI},

      {en:"I graduated",pt:"Eu me formei",s:HRT},
      {en:"I just finished",pt:"Acabei de terminar",s:HRT},
      {en:"I completed",pt:"Concluí",s:HRT},
      {en:"I earned",pt:"Conquistei",s:HRT},

      {en:"I'm taking",pt:"Estou fazendo",s:DOT},
      {en:"I'm enrolled in",pt:"Estou matriculado em",s:DOT},
      {en:"I signed up for",pt:"Me inscrevi em",s:DOT},
      {en:"I'm doing",pt:"Estou fazendo",s:DOT},

      {en:"I'm planning to apply",pt:"Estou planejando aplicar",s:UP},
      {en:"I want to pursue",pt:"Quero buscar",s:UP},
      {en:"I'm thinking of doing",pt:"Estou pensando em fazer",s:UP},
      {en:"I plan to study",pt:"Pretendo estudar",s:UP},

      {en:"I'm struggling",pt:"Estou tendo dificuldade",s:LFT},
      {en:"I'm having trouble",pt:"Estou tendo problemas",s:LFT},
      {en:"I find it tough",pt:"Acho difícil",s:LFT},
      {en:"I'm falling behind",pt:"Estou atrasado(a)",s:LFT},

      {en:"I usually study",pt:"Geralmente estudo",s:STAR},
      {en:"I tend to review",pt:"Costumo revisar",s:STAR},
      {en:"I always read",pt:"Sempre leio",s:STAR},
      {en:"I prefer to learn",pt:"Prefiro aprender",s:STAR},

      {en:"I got an A",pt:"Tirei um A",s:DIA},
      {en:"I scored",pt:"Fiquei com",s:DIA},
      {en:"I passed",pt:"Passei",s:DIA},
      {en:"I failed",pt:"Reprovei",s:DIA},
    ]},
    1: { replace:true, items:[
      {en:"business",pt:"administração",s:TRI},
      {en:"computer science",pt:"ciência da computação",s:TRI},
      {en:"law",pt:"direito",s:TRI},
      {en:"engineering",pt:"engenharia",s:TRI},
      {en:"design",pt:"design",s:TRI},

      {en:"from college",pt:"da faculdade",s:HRT},
      {en:"my degree",pt:"minha graduação",s:HRT},
      {en:"a master's",pt:"um mestrado",s:HRT},
      {en:"my certification",pt:"minha certificação",s:HRT},

      {en:"a course",pt:"um curso",s:DOT},
      {en:"an online program",pt:"um programa online",s:DOT},
      {en:"extra classes",pt:"aulas extras",s:DOT},
      {en:"a workshop",pt:"um workshop",s:DOT},

      {en:"for a master's",pt:"para um mestrado",s:UP},
      {en:"a doctorate",pt:"um doutorado",s:UP},
      {en:"an MBA",pt:"um MBA",s:UP},
      {en:"another degree",pt:"outra graduação",s:UP},

      {en:"with calculus",pt:"com cálculo",s:LFT},
      {en:"with statistics",pt:"com estatística",s:LFT},
      {en:"with this professor",pt:"com esse professor",s:LFT},
      {en:"with the workload",pt:"com a carga horária",s:LFT},

      {en:"at the library",pt:"na biblioteca",s:STAR},
      {en:"at home",pt:"em casa",s:STAR},
      {en:"in groups",pt:"em grupo",s:STAR},
      {en:"in coffee shops",pt:"em cafeterias",s:STAR},

      {en:"on the test",pt:"na prova",s:DIA},
      {en:"the final exam",pt:"o exame final",s:DIA},
      {en:"my last assignment",pt:"meu último trabalho",s:DIA},
      {en:"the entrance exam",pt:"o vestibular",s:DIA},
    ]},
    2: { replace:true, items:[
      {en:"at a university",pt:"em uma universidade",s:TRI},
      {en:"at FGV",pt:"na FGV",s:TRI},
      {en:"online",pt:"online",s:TRI},
      {en:"at a public school",pt:"em uma escola pública",s:TRI},

      {en:"last year",pt:"ano passado",s:HRT},
      {en:"with honors",pt:"com honras",s:HRT},
      {en:"in record time",pt:"em tempo recorde",s:HRT},
      {en:"after four years",pt:"depois de quatro anos",s:HRT},

      {en:"on data science",pt:"de ciência de dados",s:DOT},
      {en:"in marketing",pt:"em marketing",s:DOT},
      {en:"about photography",pt:"sobre fotografia",s:DOT},
      {en:"in English",pt:"em inglês",s:DOT},

      {en:"next year",pt:"ano que vem",s:UP},
      {en:"in two years",pt:"em dois anos",s:UP},
      {en:"after graduation",pt:"depois da formatura",s:UP},
      {en:"in the future",pt:"no futuro",s:UP},

      {en:"this semester",pt:"esse semestre",s:LFT},
      {en:"in this class",pt:"nessa matéria",s:LFT},
      {en:"on this assignment",pt:"nesse trabalho",s:LFT},
      {en:"with the deadlines",pt:"com os prazos",s:LFT},

      {en:"after class",pt:"depois das aulas",s:STAR},
      {en:"before the test",pt:"antes da prova",s:STAR},
      {en:"on weekends",pt:"nos fins de semana",s:STAR},
      {en:"in the morning",pt:"de manhã",s:STAR},

      {en:"which surprised me",pt:"o que me surpreendeu",s:DIA},
      {en:"a B+ overall",pt:"um B+ no geral",s:DIA},
      {en:"by one point",pt:"por um ponto",s:DIA},
      {en:"with the highest grade",pt:"com a maior nota",s:DIA},
    ]},
    3: { replace:true, items:[
      {en:"in São Paulo",pt:"em São Paulo",s:TRI},
      {en:"abroad",pt:"no exterior",s:TRI},
      {en:"part-time",pt:"meio período",s:TRI},
      {en:"full-time",pt:"integral",s:TRI},

      {en:"thankfully",pt:"felizmente",s:HRT},
      {en:"finally",pt:"finalmente",s:HRT},
      {en:"and it's a relief",pt:"e é um alívio",s:HRT},
      {en:"with hard work",pt:"com trabalho duro",s:HRT},

      {en:"this semester",pt:"esse semestre",s:DOT},
      {en:"to learn more",pt:"pra aprender mais",s:DOT},
      {en:"to improve my skills",pt:"pra melhorar habilidades",s:DOT},
      {en:"out of curiosity",pt:"por curiosidade",s:DOT},

      {en:"abroad",pt:"no exterior",s:UP},
      {en:"online if possible",pt:"online se possível",s:UP},
      {en:"with a scholarship",pt:"com bolsa",s:UP},
      {en:"in a top program",pt:"num programa top",s:UP},

      {en:"honestly",pt:"sinceramente",s:LFT},
      {en:"to be fair",pt:"pra ser justo(a)",s:LFT},
      {en:"but I'll figure it out",pt:"mas vou conseguir",s:LFT},
      {en:"more than usual",pt:"mais que o normal",s:LFT},

      {en:"daily",pt:"diariamente",s:STAR},
      {en:"for a few hours",pt:"por algumas horas",s:STAR},
      {en:"with focus music",pt:"com música de foco",s:STAR},
      {en:"with a study buddy",pt:"com um(a) parceiro(a) de estudos",s:STAR},

      {en:"really",pt:"de verdade",s:DIA},
      {en:"after all that effort",pt:"depois de todo esforço",s:DIA},
      {en:"I'm proud of it",pt:"orgulho disso",s:DIA},
      {en:"in my class",pt:"da minha turma",s:DIA},
    ]},
    examples: [
      {en:"I'm studying business at a university in São Paulo",pt:"Estou estudando administração em uma universidade em São Paulo"},
      {en:"My major is computer science online part-time",pt:"Minha graduação é ciência da computação online meio período"},
      {en:"I graduated from college last year with honors thankfully",pt:"Eu me formei da faculdade ano passado com honras felizmente"},
      {en:"I just finished a master's after four years finally",pt:"Acabei de terminar um mestrado depois de quatro anos finalmente"},
      {en:"I'm taking a course on data science online this semester",pt:"Estou fazendo um curso de ciência de dados online esse semestre"},
      {en:"I signed up for a workshop in marketing to improve my skills",pt:"Me inscrevi em um workshop em marketing pra melhorar habilidades"},
      {en:"I'm planning to apply for a master's next year abroad",pt:"Estou planejando aplicar para um mestrado ano que vem no exterior"},
      {en:"I want to pursue a doctorate after graduation with a scholarship",pt:"Quero buscar um doutorado depois da formatura com bolsa"},
      {en:"I'm struggling with calculus this semester honestly",pt:"Estou tendo dificuldade com cálculo esse semestre sinceramente"},
      {en:"I'm having trouble with the workload more than usual but I'll figure it out",pt:"Estou tendo problemas com a carga horária mais que o normal mas vou conseguir"},
      {en:"I usually study at the library after class daily",pt:"Geralmente estudo na biblioteca depois das aulas diariamente"},
      {en:"I prefer to learn in groups on weekends with a study buddy",pt:"Prefiro aprender em grupo nos fins de semana com um parceiro de estudos"},
      {en:"I got an A on the test which surprised me really",pt:"Tirei um A na prova o que me surpreendeu de verdade"},
      {en:"I scored the final exam with the highest grade in my class",pt:"Fiquei com o exame final com a maior nota da minha turma"},
    ],
    phrasals: [
      {term:"I'm studying / I major in",desc:"'I'm studying [área]' = forma geral. 'I major in [área]' = especificamente sua graduação principal. 'My major is' soa mais formal. Não use 'I do' (que é vago).",ex:[
        {en:"I'm studying business at a university",pt:"Estou estudando administração em uma universidade"},
        {en:"My major is computer science online",pt:"Minha graduação é ciência da computação online"}
      ]},
      {term:"I graduated / I completed",desc:"'I graduated FROM [instituição]' (com 'from'). 'I completed [tipo de curso]' (sem preposição). 'With honors' = com honras (cum laude).",ex:[
        {en:"I graduated from college last year with honors",pt:"Eu me formei da faculdade ano passado com honras"},
        {en:"I completed my degree in record time",pt:"Concluí minha graduação em tempo recorde"}
      ]},
      {term:"I'm taking / I'm enrolled in",desc:"Pra falar de curso atual. 'Take a course' (não 'do a course' como em português). 'Enrolled in' = matriculado oficialmente. 'Signed up for' = inscrito (mais casual).",ex:[
        {en:"I'm taking a course on data science",pt:"Estou fazendo um curso de ciência de dados"},
        {en:"I signed up for a workshop in marketing",pt:"Me inscrevi em um workshop em marketing"}
      ]},
      {term:"I'm planning to apply / I want to pursue",desc:"Pra falar de planos acadêmicos. 'Apply FOR a master's/PhD' (com 'for' + tipo de programa). 'Pursue' (mais formal) = buscar (uma carreira/grau).",ex:[
        {en:"I'm planning to apply for a master's next year",pt:"Estou planejando aplicar para um mestrado ano que vem"},
        {en:"I want to pursue a doctorate after graduation",pt:"Quero buscar um doutorado depois da formatura"}
      ]},
      {term:"I'm struggling with / I'm having trouble with",desc:"Pra reconhecer dificuldade acadêmica. Sempre seguido de 'with' + matéria/coisa. Adicione 'honestly' ou 'to be fair' pra suavizar. Evite 'I'm bad' que soa derrotista.",ex:[
        {en:"I'm struggling with calculus this semester",pt:"Estou tendo dificuldade com cálculo esse semestre"},
        {en:"I'm having trouble with this professor honestly",pt:"Estou tendo problemas com esse professor sinceramente"}
      ]},
      {term:"I usually study / I prefer to learn",desc:"Pra hábitos de estudo. 'Study at [lugar]' / 'study with [pessoa/material]'. 'I'm a [adjetivo] learner' (visual learner, hands-on learner) é outra estrutura comum.",ex:[
        {en:"I usually study at the library after class",pt:"Geralmente estudo na biblioteca depois das aulas"},
        {en:"I prefer to learn in groups on weekends",pt:"Prefiro aprender em grupo nos fins de semana"}
      ]},
      {term:"I got an A / I scored",desc:"Sistema de notas em inglês: A (excelente), B (bom), C (médio), D (baixo), F (reprovou). 'I got [nota] ON [prova]' (não 'in'). 'I scored [pontos]' = pontuei.",ex:[
        {en:"I got an A on the test which surprised me",pt:"Tirei um A na prova o que me surpreendeu"},
        {en:"I scored the highest grade in my class",pt:"Fiquei com a maior nota da minha turma"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // DRIVING
  // ◣ I [vb] [obj] [tempo/lugar]
  // ♥ I am [vb-ing] [contexto]
  // ● I have [vb] [obj] [contexto]
  // ▲ I was [vb] [contexto]
  // ════════════════════════════════════════════
  "driving": {
    0: { replace:true, items:[
      {en:"I",pt:"Eu",s:TRI},
      {en:"I am",pt:"Eu estou",s:HRT},
      {en:"I have",pt:"Eu",s:DOT},
      {en:"I was",pt:"Eu fui",s:UP},
    ]},
    1: { replace:true, items:[
      {en:"buckle up",pt:"coloco o cinto",s:TRI},
      {en:"slow down",pt:"desacelero",s:TRI},
      {en:"pull over",pt:"encosto",s:TRI},
      {en:"backing up",pt:"dando ré",s:HRT},
      {en:"filling up",pt:"abastecendo",s:HRT},
      {en:"picking up",pt:"buscando",s:HRT},
      {en:"turned on",pt:"liguei",s:DOT},
      {en:"turned off",pt:"desliguei",s:DOT},
      {en:"run over",pt:"atropelei",s:DOT},
      {en:"cut off",pt:"fechado",s:UP},
      {en:"hit",pt:"atingido",s:UP},
    ]},
    2: { replace:true, items:[
      {en:"every day",pt:"todo dia",s:TRI},
      {en:"when driving",pt:"quando dirijo",s:TRI},
      {en:"on the road",pt:"na estrada",s:TRI},
      {en:"the car",pt:"o carro",s:HRT},
      {en:"the truck",pt:"o caminhão",s:HRT},
      {en:"my friend",pt:"meu amigo",s:HRT},
      {en:"my kids",pt:"meus filhos",s:HRT},
      {en:"the lights",pt:"os faróis",s:DOT},
      {en:"the wipers",pt:"o limpador",s:DOT},
      {en:"the engine",pt:"o motor",s:DOT},
      {en:"a dog",pt:"um cachorro",s:DOT},
      {en:"by a car",pt:"por um carro",s:UP},
      {en:"by a truck",pt:"por um caminhão",s:UP},
    ]},
    3: { replace:true, items:[
      {en:"for safety",pt:"por segurança",s:TRI},
      {en:"in the rain",pt:"na chuva",s:TRI},
      {en:"to avoid accidents",pt:"para evitar acidentes",s:TRI},
      {en:"at the gas station",pt:"no posto",s:HRT},
      {en:"at the mall",pt:"no shopping",s:HRT},
      {en:"this morning",pt:"essa manhã",s:HRT},
      {en:"lately",pt:"ultimamente",s:DOT},
      {en:"by accident",pt:"por acidente",s:DOT},
      {en:"on the highway",pt:"na rodovia",s:DOT},
      {en:"yesterday",pt:"ontem",s:UP},
      {en:"last week",pt:"semana passada",s:UP},
    ]},
  },

  // ════════════════════════════════════════════
  // PARTYING
  // ◣ We are going to [vb] [obj] [tempo]
  // ♥ I will [vb] [obj] [tempo]
  // ● I am [vb-ing] [obj] [contexto]
  // ▲ We had [obj] [contexto]
  // ════════════════════════════════════════════
  "partying": {
    0: { replace:true, items:[
      {en:"We are going to",pt:"Nós vamos",s:TRI},
      {en:"I will",pt:"Eu irei",s:HRT},
      {en:"I am",pt:"Eu estou",s:DOT},
      {en:"We had",pt:"Nós tivemos",s:UP},
    ]},
    1: { replace:true, items:[
      {en:"throw",pt:"dar",s:TRI},
      {en:"have",pt:"ter",s:TRI},
      {en:"pick up",pt:"buscar",s:HRT},
      {en:"go out with",pt:"sair com",s:HRT},
      {en:"blowing up",pt:"enchendo",s:DOT},
      {en:"turning up",pt:"aumentando",s:DOT},
      {en:"turning down",pt:"diminuindo",s:DOT},
      {en:"a blast",pt:"uma curtição",s:UP},
      {en:"a great",pt:"uma ótima",s:UP},
    ]},
    2: { replace:true, items:[
      {en:"a birthday party",pt:"uma festa de aniversário",s:TRI},
      {en:"a pool party",pt:"uma festa na piscina",s:TRI},
      {en:"a surprise party",pt:"uma festa surpresa",s:TRI},
      {en:"my girlfriend",pt:"minha namorada",s:HRT},
      {en:"my boyfriend",pt:"meu namorado",s:HRT},
      {en:"my crush",pt:"minha paixão",s:HRT},
      {en:"balloons",pt:"balões",s:DOT},
      {en:"the speakers",pt:"as caixas de som",s:DOT},
      {en:"the lights",pt:"as luzes",s:DOT},
      {en:"party",pt:"festa",s:UP},
      {en:"night out",pt:"noitada",s:UP},
    ]},
    3: { replace:true, items:[
      {en:"this weekend",pt:"esse fim de semana",s:TRI},
      {en:"on Saturday",pt:"no sábado",s:TRI},
      {en:"next month",pt:"mês que vem",s:TRI},
      {en:"tonight",pt:"hoje à noite",s:HRT},
      {en:"on Friday",pt:"na sexta",s:HRT},
      {en:"for the party",pt:"para a festa",s:DOT},
      {en:"at home",pt:"em casa",s:DOT},
      {en:"yesterday",pt:"ontem",s:UP},
      {en:"last weekend",pt:"fim de semana passado",s:UP},
    ]},
  },

  // ════════════════════════════════════════════
  // DAILY — Rotina, hobbies, small talk
  // ◣ Rotina diária — "I usually wake up early on weekdays"
  // ♥ Fim de semana — "On weekends I relax at home all day"
  // ● Hobbies / interesses — "I'm into cooking on weekends it's my therapy"
  // ▲ O que detesta — "I can't stand waking up early in the morning honestly"
  // ◀ Pergunta de small talk — "What's your favorite movie lately around here"
  // ★ Atualizações recentes — "I just finished a great book over the weekend"
  // ◆ Abrir conversa — "How was your weekend by the way I want to hear"
  // ════════════════════════════════════════════
  "at-home": {
    title: "daily",
    sub: "Rotina & small talk",
    desc: "Frases pra papo do dia a dia — descrever sua rotina, falar de hobbies, abrir conversa em inglês. Cada símbolo é uma situação típica. Combine itens das 4 colunas com o mesmo símbolo.",
    0: { replace:true, items:[
      {en:"I usually",pt:"Eu geralmente",s:TRI},
      {en:"I always",pt:"Eu sempre",s:TRI},
      {en:"I normally",pt:"Eu normalmente",s:TRI},
      {en:"I tend to",pt:"Costumo",s:TRI},

      {en:"On weekends I",pt:"Nos finais de semana eu",s:HRT},
      {en:"On Saturdays I",pt:"Nos sábados eu",s:HRT},
      {en:"In my free time I",pt:"No meu tempo livre eu",s:HRT},
      {en:"When I'm off I",pt:"Quando estou de folga eu",s:HRT},

      {en:"I'm into",pt:"Eu curto",s:DOT},
      {en:"I love",pt:"Eu amo",s:DOT},
      {en:"I'm a fan of",pt:"Sou fã de",s:DOT},
      {en:"I'm passionate about",pt:"Sou apaixonado(a) por",s:DOT},

      {en:"I can't stand",pt:"Eu não suporto",s:UP},
      {en:"I hate",pt:"Eu odeio",s:UP},
      {en:"I'm not a fan of",pt:"Não sou fã de",s:UP},
      {en:"I dislike",pt:"Não gosto de",s:UP},

      {en:"What's your favorite",pt:"Qual seu(sua) favorito(a)",s:LFT},
      {en:"Do you have a favorite",pt:"Você tem um(a) favorito(a)",s:LFT},
      {en:"What's the best",pt:"Qual o(a) melhor",s:LFT},
      {en:"How do you feel about",pt:"O que acha de",s:LFT},

      {en:"I just",pt:"Eu acabei de",s:STAR},
      {en:"I recently",pt:"Eu recentemente",s:STAR},
      {en:"I've just",pt:"Eu acabei de",s:STAR},
      {en:"Yesterday I",pt:"Ontem eu",s:STAR},

      {en:"How was your",pt:"Como foi seu(sua)",s:DIA},
      {en:"How did your",pt:"Como foi seu(sua)",s:DIA},
      {en:"Did you enjoy your",pt:"Você curtiu seu(sua)",s:DIA},
      {en:"How's the",pt:"Como está o(a)",s:DIA},
    ]},
    1: { replace:true, items:[
      {en:"wake up early",pt:"acordo cedo",s:TRI},
      {en:"work from home",pt:"trabalho de casa",s:TRI},
      {en:"check my phone",pt:"checo o celular",s:TRI},
      {en:"have breakfast",pt:"tomo café",s:TRI},

      {en:"relax",pt:"relaxo",s:HRT},
      {en:"hang out with friends",pt:"saio com amigos",s:HRT},
      {en:"watch movies",pt:"assisto filmes",s:HRT},
      {en:"go to the gym",pt:"vou na academia",s:HRT},

      {en:"cooking",pt:"cozinhar",s:DOT},
      {en:"reading",pt:"ler",s:DOT},
      {en:"running",pt:"correr",s:DOT},
      {en:"photography",pt:"fotografia",s:DOT},

      {en:"waking up early",pt:"acordar cedo",s:UP},
      {en:"loud noises",pt:"barulho alto",s:UP},
      {en:"rude people",pt:"gente grossa",s:UP},
      {en:"traffic",pt:"trânsito",s:UP},

      {en:"movie",pt:"filme",s:LFT},
      {en:"restaurant",pt:"restaurante",s:LFT},
      {en:"weekend activity",pt:"atividade de fim de semana",s:LFT},
      {en:"way to relax",pt:"jeito de relaxar",s:LFT},

      {en:"finished",pt:"terminei",s:STAR},
      {en:"started",pt:"comecei",s:STAR},
      {en:"tried",pt:"experimentei",s:STAR},
      {en:"watched",pt:"assisti",s:STAR},

      {en:"weekend",pt:"fim de semana",s:DIA},
      {en:"day",pt:"dia",s:DIA},
      {en:"trip",pt:"viagem",s:DIA},
      {en:"week",pt:"semana",s:DIA},
    ]},
    2: { replace:true, items:[
      {en:"around 7am",pt:"por volta das 7",s:TRI},
      {en:"before the kids",pt:"antes das crianças",s:TRI},
      {en:"after lunch",pt:"depois do almoço",s:TRI},
      {en:"in the morning",pt:"de manhã",s:TRI},

      {en:"at home",pt:"em casa",s:HRT},
      {en:"at the park",pt:"no parque",s:HRT},
      {en:"with family",pt:"com a família",s:HRT},
      {en:"by the pool",pt:"na piscina",s:HRT},

      {en:"on weekends",pt:"nos fins de semana",s:DOT},
      {en:"lately",pt:"ultimamente",s:DOT},
      {en:"since I was a kid",pt:"desde criança",s:DOT},
      {en:"for years",pt:"há anos",s:DOT},

      {en:"at all",pt:"de jeito nenhum",s:UP},
      {en:"in the morning",pt:"de manhã",s:UP},
      {en:"on weekends",pt:"nos fins de semana",s:UP},
      {en:"honestly",pt:"sinceramente",s:UP},

      {en:"lately",pt:"ultimamente",s:LFT},
      {en:"these days",pt:"hoje em dia",s:LFT},
      {en:"honestly",pt:"sinceramente",s:LFT},
      {en:"overall",pt:"no geral",s:LFT},

      {en:"a great book",pt:"um livro ótimo",s:STAR},
      {en:"a new gym",pt:"uma academia nova",s:STAR},
      {en:"sushi for the first time",pt:"sushi pela primeira vez",s:STAR},
      {en:"an awesome movie",pt:"um filme incrível",s:STAR},

      {en:"by the way",pt:"a propósito",s:DIA},
      {en:"so far",pt:"até agora",s:DIA},
      {en:"overall",pt:"no geral",s:DIA},
      {en:"honestly",pt:"sinceramente",s:DIA},
    ]},
    3: { replace:true, items:[
      {en:"on weekdays",pt:"nos dias úteis",s:TRI},
      {en:"before work",pt:"antes do trabalho",s:TRI},
      {en:"first thing",pt:"a primeira coisa",s:TRI},
      {en:"no matter what",pt:"não importa o que",s:TRI},

      {en:"all day",pt:"o dia todo",s:HRT},
      {en:"for hours",pt:"por horas",s:HRT},
      {en:"mostly",pt:"a maior parte",s:HRT},
      {en:"sometimes",pt:"às vezes",s:HRT},

      {en:"it's my therapy",pt:"é minha terapia",s:DOT},
      {en:"it relaxes me",pt:"isso me relaxa",s:DOT},
      {en:"I do it daily",pt:"faço diariamente",s:DOT},
      {en:"I never miss",pt:"nunca perco",s:DOT},

      {en:"it drives me crazy",pt:"me deixa louco",s:UP},
      {en:"it ruins my day",pt:"arruína meu dia",s:UP},
      {en:"no exceptions",pt:"sem exceção",s:UP},
      {en:"period",pt:"ponto final",s:UP},

      {en:"around here",pt:"por aqui",s:LFT},
      {en:"in São Paulo",pt:"em São Paulo",s:LFT},
      {en:"for a Friday night",pt:"pra uma sexta",s:LFT},
      {en:"for a date",pt:"pra um encontro",s:LFT},

      {en:"last week",pt:"semana passada",s:STAR},
      {en:"over the weekend",pt:"no fim de semana",s:STAR},
      {en:"it was amazing",pt:"foi incrível",s:STAR},
      {en:"highly recommend",pt:"recomendo muito",s:STAR},

      {en:"I want to hear",pt:"quero saber",s:DIA},
      {en:"spill the tea",pt:"conta a fofoca",s:DIA},
      {en:"no boring details",pt:"sem detalhes chatos",s:DIA},
      {en:"I'm curious",pt:"tô curioso",s:DIA},
    ]},
    examples: [
      {en:"I usually wake up early before work first thing",pt:"Eu geralmente acordo cedo antes do trabalho a primeira coisa"},
      {en:"I tend to check my phone after lunch on weekdays",pt:"Costumo checar o celular depois do almoço nos dias úteis"},
      {en:"On weekends I relax at home all day",pt:"Nos fins de semana eu relaxo em casa o dia todo"},
      {en:"In my free time I hang out with friends at the park for hours",pt:"No meu tempo livre eu saio com amigos no parque por horas"},
      {en:"I'm into cooking on weekends it's my therapy",pt:"Eu curto cozinhar nos fins de semana é minha terapia"},
      {en:"I'm a fan of running for years I do it daily",pt:"Sou fã de correr há anos faço diariamente"},
      {en:"I can't stand traffic in the morning it drives me crazy",pt:"Não suporto trânsito de manhã me deixa louco"},
      {en:"I hate loud noises honestly no exceptions",pt:"Eu odeio barulho alto sinceramente sem exceção"},
      {en:"What's your favorite restaurant lately around here?",pt:"Qual seu restaurante favorito ultimamente por aqui?"},
      {en:"What's the best way to relax overall for a Friday night?",pt:"Qual o melhor jeito de relaxar pra uma sexta?"},
      {en:"I just finished a great book over the weekend",pt:"Acabei de terminar um livro ótimo no fim de semana"},
      {en:"I recently tried sushi for the first time it was amazing",pt:"Recentemente experimentei sushi pela primeira vez foi incrível"},
      {en:"How was your weekend by the way I want to hear?",pt:"Como foi seu fim de semana a propósito quero saber?"},
      {en:"How's the trip so far I'm curious?",pt:"Como está a viagem até agora tô curioso?"},
    ],
    phrasals: [
      {term:"I usually / I tend to",desc:"Pra falar de rotina e hábitos. 'I usually' é direto ('eu geralmente'); 'I tend to' é mais suave, sugerindo padrão. Sempre seguido de verbo no presente simples (sem -ing).",ex:[
        {en:"I usually wake up early on weekdays",pt:"Eu geralmente acordo cedo nos dias úteis"},
        {en:"I tend to check my phone first thing",pt:"Costumo checar o celular a primeira coisa"}
      ]},
      {term:"On weekends I / In my free time I",desc:"Estruturas pra falar de tempo livre. Note a inversão: o adverbial vem PRIMEIRO, depois o sujeito ('On weekends I relax', não 'I relax on weekends'). Ambos funcionam mas o primeiro soa mais natural quando o tempo é o foco.",ex:[
        {en:"On weekends I relax at home",pt:"Nos fins de semana eu relaxo em casa"},
        {en:"In my free time I go to the gym",pt:"No meu tempo livre eu vou na academia"}
      ]},
      {term:"I'm into / I'm a fan of",desc:"Forma natural de falar de hobbies. 'I'm into' é casual, comum entre jovens; 'I'm a fan of' é mais neutro. Sempre seguido de gerúndio (-ing) ou substantivo, NUNCA infinitivo.",ex:[
        {en:"I'm into cooking on weekends",pt:"Eu curto cozinhar nos fins de semana"},
        {en:"I'm a fan of photography lately",pt:"Sou fã de fotografia ultimamente"}
      ]},
      {term:"I can't stand / I'm not a fan of",desc:"Pra falar de pet peeves. 'I can't stand' é forte ('não suporto'); 'I'm not a fan of' é mais educado. Ambos seguidos de gerúndio ou substantivo.",ex:[
        {en:"I can't stand waking up early honestly",pt:"Não suporto acordar cedo sinceramente"},
        {en:"I'm not a fan of loud noises at all",pt:"Não sou fã de barulho alto de jeito nenhum"}
      ]},
      {term:"What's your favorite [X]?",desc:"Pergunta de small talk universal. Sempre 'What IS your favorite' (não 'What ARE'), mesmo se a resposta for plural. Após resposta, geralmente pede 'why?' ou 'how come?'.",ex:[
        {en:"What's your favorite movie lately?",pt:"Qual seu filme favorito ultimamente?"},
        {en:"What's your favorite way to relax?",pt:"Qual seu jeito favorito de relaxar?"}
      ]},
      {term:"I just / I recently",desc:"'I just' = ação muito recente (minutos/horas atrás, ou recente como surpresa). 'I recently' = nas últimas semanas/meses, mais distanciado. Ambos com verbo no passado simples.",ex:[
        {en:"I just finished a great book",pt:"Acabei de terminar um livro ótimo"},
        {en:"I recently tried sushi for the first time",pt:"Recentemente experimentei sushi pela primeira vez"}
      ]},
      {term:"How was your [event]?",desc:"O abridor de conversa mais comum em inglês. 'How WAS your weekend?' (passado), 'How IS the trip?' (em andamento). Saber a diferença evita erro clássico de brasileiro.",ex:[
        {en:"How was your weekend by the way?",pt:"Como foi seu fim de semana a propósito?"},
        {en:"How's the trip so far?",pt:"Como está a viagem até agora?"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // ANIMALS 1
  // ◣ I was [vb-ing] [contexto]
  // ♥ She/He is [vb-ing] [obj]
  // ● You have been [vb-ing] [contexto]
  // ════════════════════════════════════════════
  "animals-1": {
    0: { replace:true, items:[
      {en:"I was",pt:"Eu estava",s:TRI},
      {en:"She is",pt:"Ela está",s:HRT},
      {en:"He is",pt:"Ele está",s:HRT},
      {en:"You have been",pt:"Você tem",s:DOT},
    ]},
    1: { replace:true, items:[
      {en:"horsing around",pt:"fazendo bagunça",s:TRI},
      {en:"rabbiting on about",pt:"tagarelando sobre",s:HRT},
      {en:"droning on about",pt:"falando monotonamente sobre",s:HRT},
      {en:"leeching off",pt:"sugando",s:DOT},
      {en:"parroting",pt:"papagaiando",s:DOT},
    ]},
    2: { replace:true, items:[
      {en:"with",pt:"com",s:TRI},
      {en:"work",pt:"trabalho",s:HRT},
      {en:"life",pt:"a vida",s:HRT},
      {en:"problems",pt:"problemas",s:HRT},
      {en:"your parents",pt:"seus pais",s:DOT},
      {en:"your friends",pt:"seus amigos",s:DOT},
    ]},
    3: { replace:true, items:[
      {en:"my brother",pt:"meu irmão",s:TRI},
      {en:"my friends",pt:"meus amigos",s:TRI},
      {en:"for hours",pt:"por horas",s:HRT},
      {en:"for years",pt:"há anos",s:HRT},
      {en:"non-stop",pt:"sem parar",s:HRT},
      {en:"for years",pt:"há anos",s:DOT},
      {en:"like a parasite",pt:"como um parasita",s:DOT},
    ]},
  },

  // ════════════════════════════════════════════
  // ANIMALS 2
  // ◣ I have [vb] [obj] [contexto]
  // ♥ I am [adj] at [vb-ing] [obj]
  // ● I [vb-ed] [obj] [contexto]
  // ════════════════════════════════════════════
  "animals-2": {
    0: { replace:true, items:[
      {en:"I have",pt:"Eu",s:TRI},
      {en:"I am",pt:"Eu sou",s:HRT},
      {en:"I",pt:"Eu",s:DOT},
    ]},
    1: { replace:true, items:[
      {en:"ducked out",pt:"saí de fininho",s:TRI},
      {en:"fished out",pt:"pesquei",s:TRI},
      {en:"pigged out",pt:"comi muito",s:TRI},
      {en:"beavered away",pt:"trabalhei pesado",s:TRI},
      {en:"clammed up",pt:"me calei",s:TRI},
      {en:"good at",pt:"bom em",s:HRT},
      {en:"bad at",pt:"ruim em",s:HRT},
      {en:"wormed out",pt:"descobri (com astúcia)",s:DOT},
      {en:"ferreted out",pt:"farejei",s:DOT},
      {en:"wolfed down",pt:"engoli rápido",s:DOT},
      {en:"ratted on",pt:"delatei",s:DOT},
    ]},
    2: { replace:true, items:[
      {en:"of the meeting",pt:"da reunião",s:TRI},
      {en:"a coin from the pocket",pt:"uma moeda do bolso",s:TRI},
      {en:"on the buffet",pt:"no buffet",s:TRI},
      {en:"on this project",pt:"nesse projeto",s:TRI},
      {en:"during the interview",pt:"na entrevista",s:TRI},
      {en:"ferreting out the truth",pt:"descobrir a verdade",s:HRT},
      {en:"sniffing out problems",pt:"farejar problemas",s:HRT},
      {en:"the truth",pt:"a verdade",s:DOT},
      {en:"the scam",pt:"a fraude",s:DOT},
      {en:"my dinner",pt:"meu jantar",s:DOT},
      {en:"my colleague",pt:"meu colega",s:DOT},
    ]},
    3: { replace:true, items:[
      {en:"early",pt:"cedo",s:TRI},
      {en:"lately",pt:"ultimamente",s:TRI},
      {en:"this week",pt:"essa semana",s:TRI},
      {en:"all night",pt:"a noite toda",s:TRI},
      {en:"because of fear",pt:"de medo",s:TRI},
      {en:"in business",pt:"em negócios",s:HRT},
      {en:"in detective work",pt:"em trabalho de detetive",s:HRT},
      {en:"after a week",pt:"depois de uma semana",s:DOT},
      {en:"to the police",pt:"à polícia",s:DOT},
      {en:"in five minutes",pt:"em cinco minutos",s:DOT},
    ]},
  },

  // ════════════════════════════════════════════
  // CLOTHING
  // ◣ I am [vb-ing] [obj] [contexto]
  // ♥ I have to [vb] [obj] [propósito]
  // ════════════════════════════════════════════
  "clothing": {
    0: { replace:true, items:[
      {en:"I am",pt:"Eu estou",s:TRI},
      {en:"I have to",pt:"Eu preciso",s:HRT},
    ]},
    1: { replace:true, items:[
      {en:"doing up",pt:"fechando",s:TRI},
      {en:"dressing up",pt:"me arrumando",s:TRI},
      {en:"putting on",pt:"colocando",s:TRI},
      {en:"taking off",pt:"tirando",s:TRI},
      {en:"hanging up",pt:"pendurando",s:TRI},
      {en:"trying on",pt:"experimentando",s:TRI},
      {en:"wrapping up",pt:"me agasalhando",s:TRI},
      {en:"zipping up",pt:"fechando o zíper",s:TRI},
      {en:"kicking off",pt:"chutando para tirar",s:TRI},
      {en:"take in",pt:"reduzir",s:HRT},
      {en:"take up",pt:"encurtar",s:HRT},
      {en:"let down",pt:"alongar",s:HRT},
    ]},
    2: { replace:true, items:[
      {en:"my tie",pt:"minha gravata",s:TRI},
      {en:"my shoes",pt:"meus calçados",s:TRI},
      {en:"my jacket",pt:"minha jaqueta",s:TRI},
      {en:"a shirt",pt:"uma camisa",s:TRI},
      {en:"my coat",pt:"meu casaco",s:TRI},
      {en:"my dress",pt:"meu vestido",s:TRI},
      {en:"some clothes",pt:"algumas roupas",s:TRI},
      {en:"the sleeves",pt:"as mangas",s:HRT},
      {en:"the hem",pt:"a barra",s:HRT},
      {en:"the waist",pt:"a cintura",s:HRT},
      {en:"the trousers",pt:"a calça",s:HRT},
    ]},
    3: { replace:true, items:[
      {en:"for a date",pt:"para um encontro",s:TRI},
      {en:"for work",pt:"para o trabalho",s:TRI},
      {en:"for an interview",pt:"para uma entrevista",s:TRI},
      {en:"for a wedding",pt:"para um casamento",s:TRI},
      {en:"because it’s cold",pt:"porque está frio",s:TRI},
      {en:"in the closet",pt:"no guarda-roupa",s:TRI},
      {en:"to wear it",pt:"para vestir",s:HRT},
      {en:"to fit better",pt:"para servir melhor",s:HRT},
    ]},
  },

  // ════════════════════════════════════════════
  // BUSINESS 1
  // ◣ I have [vb] [obj] [contexto]
  // ♥ I [try/struggle] to [vb] [obj] [contexto]
  // ════════════════════════════════════════════
  "business-1": {
    0: { replace:true, items:[
      {en:"I have",pt:"Eu",s:TRI},
      {en:"I",pt:"Eu",s:HRT},
    ]},
    1: { replace:true, items:[
      {en:"branched out into",pt:"diversifiquei para",s:TRI},
      {en:"broken into",pt:"entrei no",s:TRI},
      {en:"set up",pt:"abri",s:TRI},
      {en:"noted down",pt:"anotei",s:TRI},
      {en:"backed up",pt:"fiz backup de",s:TRI},
      {en:"stepped down as",pt:"renunciei a",s:TRI},
      {en:"come up with",pt:"vim com",s:TRI},
      {en:"gone through",pt:"passei por",s:TRI},
      {en:"try to keep up with",pt:"tento acompanhar",s:HRT},
      {en:"struggle to carry out",pt:"luto para executar",s:HRT},
    ]},
    2: { replace:true, items:[
      {en:"marketing",pt:"marketing",s:TRI},
      {en:"the music industry",pt:"a indústria musical",s:TRI},
      {en:"the tech industry",pt:"a indústria tech",s:TRI},
      {en:"a new company",pt:"uma nova empresa",s:TRI},
      {en:"all my contacts",pt:"todos meus contatos",s:TRI},
      {en:"manager",pt:"gerente",s:TRI},
      {en:"a slogan",pt:"um slogan",s:TRI},
      {en:"a difficult time",pt:"um período difícil",s:TRI},
      {en:"the trends",pt:"as tendências",s:HRT},
      {en:"the competition",pt:"a concorrência",s:HRT},
      {en:"my tasks",pt:"minhas tarefas",s:HRT},
    ]},
    3: { replace:true, items:[
      {en:"this year",pt:"esse ano",s:TRI},
      {en:"recently",pt:"recentemente",s:TRI},
      {en:"of the company",pt:"da empresa",s:TRI},
      {en:"on my phone",pt:"no celular",s:TRI},
      {en:"after the crisis",pt:"depois da crise",s:TRI},
      {en:"every day",pt:"todo dia",s:HRT},
      {en:"on time",pt:"no prazo",s:HRT},
    ]},
  },

  // ════════════════════════════════════════════
  // BUSINESS 2
  // ◣ I have [vb] [obj] [contexto]
  // ♥ I am [vb-ing] [obj] [contexto]
  // ● I’m going to [vb] [obj] [contexto]
  // ════════════════════════════════════════════
  "business-2": {
    0: { replace:true, items:[
      {en:"I have",pt:"Eu",s:TRI},
      {en:"I am",pt:"Eu estou",s:HRT},
      {en:"I’m going to",pt:"Eu irei",s:DOT},
    ]},
    1: { replace:true, items:[
      {en:"found out",pt:"descobri",s:TRI},
      {en:"joined in",pt:"entrei em",s:TRI},
      {en:"taken over",pt:"assumi",s:TRI},
      {en:"cut back on",pt:"cortei",s:TRI},
      {en:"run out of",pt:"fiquei sem",s:TRI},
      {en:"pulled out of",pt:"saí de",s:TRI},
      {en:"weighing up",pt:"avaliando",s:HRT},
      {en:"dealing with",pt:"lidando com",s:HRT},
      {en:"carry on",pt:"continuar",s:DOT},
    ]},
    2: { replace:true, items:[
      {en:"a way",pt:"um jeito",s:TRI},
      {en:"a reason",pt:"uma razão",s:TRI},
      {en:"the meeting",pt:"a reunião",s:TRI},
      {en:"a new role",pt:"um novo cargo",s:TRI},
      {en:"expenses",pt:"gastos",s:TRI},
      {en:"time",pt:"tempo",s:TRI},
      {en:"the deal",pt:"o negócio",s:TRI},
      {en:"the pros and cons",pt:"os prós e contras",s:HRT},
      {en:"a difficult client",pt:"um cliente difícil",s:HRT},
      {en:"the team",pt:"a equipe",s:HRT},
      {en:"with the meeting",pt:"com a reunião",s:DOT},
      {en:"with the project",pt:"com o projeto",s:DOT},
    ]},
    3: { replace:true, items:[
      {en:"to grow",pt:"para crescer",s:TRI},
      {en:"to carry on",pt:"para continuar",s:TRI},
      {en:"lately",pt:"ultimamente",s:TRI},
      {en:"this week",pt:"essa semana",s:TRI},
      {en:"recently",pt:"recentemente",s:TRI},
      {en:"now",pt:"agora",s:HRT},
      {en:"professionally",pt:"profissionalmente",s:HRT},
      {en:"to next week",pt:"para semana que vem",s:DOT},
      {en:"despite issues",pt:"apesar dos problemas",s:DOT},
    ]},
  },

  // ════════════════════════════════════════════
  // BUSINESS 3
  // ◣ I am [vb-ing] [obj] [contexto]
  // ♥ The company [vb] [obj] [contexto]
  // ● It [vb] [tempo/obj]
  // ════════════════════════════════════════════
  "business-3": {
    0: { replace:true, items:[
      {en:"I am",pt:"Eu estou",s:TRI},
      {en:"The company",pt:"A empresa",s:HRT},
      {en:"It",pt:"Isso",s:DOT},
    ]},
    1: { replace:true, items:[
      {en:"filling out",pt:"preenchendo",s:TRI},
      {en:"sorting out",pt:"organizando",s:TRI},
      {en:"closed down",pt:"fechou",s:HRT},
      {en:"took off",pt:"decolou",s:HRT},
      {en:"is going to go under",pt:"vai falir",s:HRT},
      {en:"takes up",pt:"leva",s:DOT},
    ]},
    2: { replace:true, items:[
      {en:"a form",pt:"um formulário",s:TRI},
      {en:"the data",pt:"os dados",s:TRI},
      {en:"my schedule",pt:"minha agenda",s:TRI},
      {en:"the mess",pt:"a bagunça",s:TRI},
      {en:"because of Covid",pt:"por causa da Covid",s:HRT},
      {en:"after the pandemic",pt:"depois da pandemia",s:HRT},
      {en:"too much time",pt:"muito tempo",s:DOT},
      {en:"too much room",pt:"muito espaço",s:DOT},
    ]},
    3: { replace:true, items:[
      {en:"in Excel",pt:"no Excel",s:TRI},
      {en:"this morning",pt:"essa manhã",s:TRI},
      {en:"this year",pt:"esse ano",s:HRT},
      {en:"after that event",pt:"depois daquele evento",s:HRT},
      {en:"recently",pt:"recentemente",s:HRT},
      {en:"on my desk",pt:"na minha mesa",s:DOT},
      {en:"every day",pt:"todo dia",s:DOT},
    ]},
  },

  // ════════════════════════════════════════════
  // SHOPPING — Lojas, tamanhos, devolução
  // ◣ Procurar item — "I'm looking for a shirt in size medium please"
  // ♥ Provar / experimentar — "Can I try this on in a different size?"
  // ● Pergunta sobre produto — "Does this come in any other color?"
  // ▲ Comparar / preço — "How much is this on sale this week?"
  // ◀ Pagar — "I'd like to pay by card if you accept it"
  // ★ Devolução / troca — "I'd like to return this item I bought yesterday"
  // ◆ Reclamar / pedir ajuda — "Can someone help me find the fitting room?"
  // ════════════════════════════════════════════
  "shopping": {
    title: "shopping",
    sub: "Lojas, tamanhos & trocas",
    desc: "Frases pra qualquer compra em loja, mercado ou shopping em inglês — procurar, experimentar, pagar, devolver. Cada símbolo é uma situação típica. Combine itens das 4 colunas com o mesmo símbolo.",
    0: { replace:true, items:[
      {en:"I'm looking for",pt:"Estou procurando",s:TRI},
      {en:"Do you have",pt:"Vocês têm",s:TRI},
      {en:"I need",pt:"Preciso",s:TRI},
      {en:"Where can I find",pt:"Onde encontro",s:TRI},

      {en:"Can I try",pt:"Posso provar",s:HRT},
      {en:"Could I try",pt:"Posso experimentar",s:HRT},
      {en:"I'd like to try",pt:"Gostaria de experimentar",s:HRT},
      {en:"Where can I try",pt:"Onde experimento",s:HRT},

      {en:"Does this come",pt:"Isso vem",s:DOT},
      {en:"Is this available",pt:"Isso está disponível",s:DOT},
      {en:"Do you have this",pt:"Vocês têm isso",s:DOT},
      {en:"Is there",pt:"Tem",s:DOT},

      {en:"How much is",pt:"Quanto é",s:UP},
      {en:"What's the price of",pt:"Qual o preço de",s:UP},
      {en:"Is this",pt:"Isso está",s:UP},
      {en:"Are these",pt:"Esses estão",s:UP},

      {en:"I'd like to pay",pt:"Gostaria de pagar",s:LFT},
      {en:"Can I pay",pt:"Posso pagar",s:LFT},
      {en:"Do you accept",pt:"Vocês aceitam",s:LFT},
      {en:"I'll pay",pt:"Vou pagar",s:LFT},

      {en:"I'd like to return",pt:"Gostaria de devolver",s:STAR},
      {en:"Can I exchange",pt:"Posso trocar",s:STAR},
      {en:"I want a refund",pt:"Quero reembolso",s:STAR},
      {en:"This doesn't fit",pt:"Não serve",s:STAR},

      {en:"Can someone help me",pt:"Alguém pode me ajudar",s:DIA},
      {en:"Excuse me, do you work",pt:"Com licença, você trabalha",s:DIA},
      {en:"Could you point me to",pt:"Pode me indicar",s:DIA},
      {en:"I have a question about",pt:"Tenho uma dúvida sobre",s:DIA},
    ]},
    1: { replace:true, items:[
      {en:"a shirt",pt:"uma camisa",s:TRI},
      {en:"some jeans",pt:"uma calça",s:TRI},
      {en:"sneakers",pt:"tênis",s:TRI},
      {en:"a gift",pt:"um presente",s:TRI},

      {en:"this on",pt:"isso",s:HRT},
      {en:"these on",pt:"esses",s:HRT},
      {en:"this dress on",pt:"esse vestido",s:HRT},
      {en:"another one",pt:"outro",s:HRT},

      {en:"in any other color",pt:"em outra cor",s:DOT},
      {en:"in a smaller size",pt:"em um tamanho menor",s:DOT},
      {en:"in stock",pt:"em estoque",s:DOT},
      {en:"online",pt:"online",s:DOT},

      {en:"this",pt:"isso",s:UP},
      {en:"the dress",pt:"o vestido",s:UP},
      {en:"the bag",pt:"a bolsa",s:UP},
      {en:"the watch",pt:"o relógio",s:UP},

      {en:"by card",pt:"no cartão",s:LFT},
      {en:"in cash",pt:"em dinheiro",s:LFT},
      {en:"with PayPal",pt:"com PayPal",s:LFT},
      {en:"in installments",pt:"parcelado",s:LFT},

      {en:"this item",pt:"esse item",s:STAR},
      {en:"this product",pt:"esse produto",s:STAR},
      {en:"these shoes",pt:"esses sapatos",s:STAR},
      {en:"my purchase",pt:"minha compra",s:STAR},

      {en:"find the fitting room",pt:"achar o provador",s:DIA},
      {en:"locate this product",pt:"localizar esse produto",s:DIA},
      {en:"check the price",pt:"checar o preço",s:DIA},
      {en:"reach the manager",pt:"falar com o gerente",s:DIA},
    ]},
    2: { replace:true, items:[
      {en:"in size medium",pt:"tamanho médio",s:TRI},
      {en:"in black",pt:"em preto",s:TRI},
      {en:"on sale",pt:"em promoção",s:TRI},
      {en:"under fifty dollars",pt:"abaixo de cinquenta dólares",s:TRI},

      {en:"in a different size",pt:"em outro tamanho",s:HRT},
      {en:"in another color",pt:"em outra cor",s:HRT},
      {en:"before deciding",pt:"antes de decidir",s:HRT},
      {en:"in the next size up",pt:"no próximo tamanho",s:HRT},

      {en:"in blue",pt:"em azul",s:DOT},
      {en:"in size large",pt:"tamanho grande",s:DOT},
      {en:"with free shipping",pt:"com frete grátis",s:DOT},
      {en:"in this style",pt:"nesse estilo",s:DOT},

      {en:"on sale",pt:"em promoção",s:UP},
      {en:"with the discount",pt:"com o desconto",s:UP},
      {en:"per item",pt:"por item",s:UP},
      {en:"including tax",pt:"com taxa",s:UP},

      {en:"if you accept it",pt:"se vocês aceitarem",s:LFT},
      {en:"thanks",pt:"obrigado(a)",s:LFT},
      {en:"please",pt:"por favor",s:LFT},
      {en:"as a deposit",pt:"como entrada",s:LFT},

      {en:"I bought yesterday",pt:"que comprei ontem",s:STAR},
      {en:"that doesn't fit",pt:"que não serve",s:STAR},
      {en:"with the receipt",pt:"com o recibo",s:STAR},
      {en:"unworn",pt:"sem uso",s:STAR},

      {en:"please",pt:"por favor",s:DIA},
      {en:"if you can",pt:"se puder",s:DIA},
      {en:"I'm a bit lost",pt:"estou meio perdido(a)",s:DIA},
      {en:"thanks in advance",pt:"obrigado(a) desde já",s:DIA},
    ]},
    3: { replace:true, items:[
      {en:"please",pt:"por favor",s:TRI},
      {en:"thanks",pt:"obrigado(a)",s:TRI},
      {en:"if available",pt:"se houver",s:TRI},
      {en:"by any chance",pt:"por acaso",s:TRI},

      {en:"thanks",pt:"obrigado(a)",s:HRT},
      {en:"please",pt:"por favor",s:HRT},
      {en:"first",pt:"primeiro",s:HRT},
      {en:"to be sure",pt:"pra ter certeza",s:HRT},

      {en:"by any chance",pt:"por acaso",s:DOT},
      {en:"these days",pt:"hoje em dia",s:DOT},
      {en:"please",pt:"por favor",s:DOT},
      {en:"in stock",pt:"em estoque",s:DOT},

      {en:"this week",pt:"essa semana",s:UP},
      {en:"with the promotion",pt:"com a promoção",s:UP},
      {en:"all together",pt:"tudo junto",s:UP},
      {en:"approximately",pt:"aproximadamente",s:UP},

      {en:"please",pt:"por favor",s:LFT},
      {en:"separately",pt:"separadamente",s:LFT},
      {en:"in two installments",pt:"em duas vezes",s:LFT},
      {en:"in cash",pt:"em dinheiro",s:LFT},

      {en:"please",pt:"por favor",s:STAR},
      {en:"if possible",pt:"se possível",s:STAR},
      {en:"thanks",pt:"obrigado(a)",s:STAR},
      {en:"as soon as possible",pt:"o mais rápido possível",s:STAR},

      {en:"please",pt:"por favor",s:DIA},
      {en:"if it's not too much trouble",pt:"se não for incômodo",s:DIA},
      {en:"I'd appreciate it",pt:"agradeço",s:DIA},
      {en:"thanks",pt:"obrigado(a)",s:DIA},
    ]},
    examples: [
      {en:"I'm looking for a shirt in size medium please",pt:"Estou procurando uma camisa tamanho médio por favor"},
      {en:"Do you have sneakers under fifty dollars by any chance?",pt:"Vocês têm tênis abaixo de cinquenta dólares por acaso?"},
      {en:"Can I try this on in a different size first?",pt:"Posso provar isso em outro tamanho primeiro?"},
      {en:"I'd like to try this dress on in another color thanks",pt:"Gostaria de experimentar esse vestido em outra cor obrigado"},
      {en:"Does this come in any other color these days?",pt:"Isso vem em outra cor hoje em dia?"},
      {en:"Is this available in size large with free shipping?",pt:"Isso está disponível tamanho grande com frete grátis?"},
      {en:"How much is this on sale this week?",pt:"Quanto isso está em promoção essa semana?"},
      {en:"Are these the watch with the discount all together?",pt:"Esses estão o relógio com o desconto tudo junto?"},
      {en:"I'd like to pay by card if you accept it please",pt:"Gostaria de pagar no cartão se vocês aceitarem por favor"},
      {en:"Do you accept PayPal in installments separately?",pt:"Vocês aceitam PayPal parcelado separadamente?"},
      {en:"I'd like to return this item I bought yesterday please",pt:"Gostaria de devolver esse item que comprei ontem por favor"},
      {en:"Can I exchange these shoes that doesn't fit if possible?",pt:"Posso trocar esses sapatos que não servem se possível?"},
      {en:"Can someone help me find the fitting room please?",pt:"Alguém pode me ajudar a achar o provador por favor?"},
      {en:"Could you point me to check the price thanks?",pt:"Pode me indicar pra checar o preço obrigado?"},
    ],
    phrasals: [
      {term:"I'm looking for / Do you have",desc:"Pra começar a busca por um item. 'I'm looking for' implica que ainda não decidiu; 'Do you have' é mais direto. Sempre seguido de 'a/an' + item.",ex:[
        {en:"I'm looking for a shirt in size medium",pt:"Estou procurando uma camisa tamanho médio"},
        {en:"Do you have sneakers under fifty dollars?",pt:"Vocês têm tênis abaixo de cinquenta dólares?"}
      ]},
      {term:"Can I try this on",desc:"Frase essencial pra prova de roupas. 'Try ON' é phrasal verb separável: 'try this on' (com pronome objeto entre verbo e partícula). Sempre 'on', não 'try this' sem partícula.",ex:[
        {en:"Can I try this on in a different size?",pt:"Posso provar isso em outro tamanho?"},
        {en:"Could I try these on before deciding?",pt:"Posso experimentar esses antes de decidir?"}
      ]},
      {term:"Does this come in / Is this available",desc:"Pra perguntar variações. 'Does this come in [cor/tamanho]?' = vem em? 'Is this available in...?' = está disponível em? Mesmo significado prático.",ex:[
        {en:"Does this come in any other color?",pt:"Isso vem em outra cor?"},
        {en:"Is this available in size large?",pt:"Isso está disponível tamanho grande?"}
      ]},
      {term:"How much is / What's the price of",desc:"'How much IS this' (com 'is' direto) é mais natural pra item específico. 'What's the price of [X]?' soa um pouco mais formal. Ambos funcionam.",ex:[
        {en:"How much is this on sale this week?",pt:"Quanto isso está em promoção essa semana?"},
        {en:"What's the price of the dress with the discount?",pt:"Qual o preço do vestido com o desconto?"}
      ]},
      {term:"I'd like to pay by / Do you accept",desc:"'Pay BY [meio]' (cartão) ou 'pay IN [moeda]' (dinheiro). 'Do you accept [meio]?' é universal pra checar se aceita determinado pagamento. Erro clássico: 'pay with card' (não é o padrão).",ex:[
        {en:"I'd like to pay by card if you accept it",pt:"Gostaria de pagar no cartão se vocês aceitarem"},
        {en:"Do you accept PayPal in installments?",pt:"Vocês aceitam PayPal parcelado?"}
      ]},
      {term:"I'd like to return / Can I exchange",desc:"'Return' = devolução (recebe dinheiro de volta). 'Exchange' = troca (por outro produto). Sempre traga 'with the receipt' (com o recibo) e mencione o motivo se possível.",ex:[
        {en:"I'd like to return this item I bought yesterday",pt:"Gostaria de devolver esse item que comprei ontem"},
        {en:"Can I exchange these shoes that don't fit?",pt:"Posso trocar esses sapatos que não servem?"}
      ]},
      {term:"Can someone help me / Excuse me",desc:"Pra começar a pedir ajuda numa loja. 'Excuse me' é o opener mais educado. 'Can someone help me [verbo no infinitivo]' especifica o que precisa.",ex:[
        {en:"Can someone help me find the fitting room?",pt:"Alguém pode me ajudar a achar o provador?"},
        {en:"Excuse me, do you work in this section?",pt:"Com licença, você trabalha nessa seção?"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // FOOD — Restaurantes & comida
  // ◣ Pedindo formal — "I'd like to order the steak well-done please"
  // ♥ Pedindo casual — "Can I get a coffee with milk to go"
  // ● Pergunta sobre prato — "Is this dish vegetarian by any chance"
  // ▲ Restrição alimentar — "I'm allergic to peanuts unfortunately"
  // ◀ Pedido extra — "Could we have some bread with the meal"
  // ★ Feedback — "The food is delicious honestly we love it"
  // ◆ Fechar conta — "Could you bring the bill when you have a chance"
  // ════════════════════════════════════════════
  "cooking-1": {
    title: "food",
    sub: "Restaurantes & pedidos",
    desc: "Frases pra usar em qualquer restaurante de língua inglesa — pedir prato, falar sobre alergias, pedir conta. Cada símbolo é um momento da refeição. Combine itens das 4 colunas com o mesmo símbolo.",
    0: { replace:true, items:[
      {en:"I'd like to order",pt:"Eu gostaria de pedir",s:TRI},
      {en:"I'll have",pt:"Vou querer",s:TRI},
      {en:"I'll go with",pt:"Vou de",s:TRI},
      {en:"For me,",pt:"Pra mim,",s:TRI},

      {en:"Can I get",pt:"Posso pedir",s:HRT},
      {en:"Could I have",pt:"Posso ter",s:HRT},
      {en:"I'd like",pt:"Eu queria",s:HRT},
      {en:"Just",pt:"Só",s:HRT},

      {en:"Is this",pt:"Isto é",s:DOT},
      {en:"Is the",pt:"O(a)",s:DOT},
      {en:"Does this have",pt:"Isso tem",s:DOT},
      {en:"What's in",pt:"O que tem em",s:DOT},

      {en:"I'm allergic to",pt:"Sou alérgico(a) a",s:UP},
      {en:"I can't eat",pt:"Não posso comer",s:UP},
      {en:"I don't eat",pt:"Não como",s:UP},
      {en:"Please no",pt:"Sem",s:UP},

      {en:"Could we have",pt:"Podemos ter",s:LFT},
      {en:"Could you bring us",pt:"Pode trazer",s:LFT},
      {en:"Can we get",pt:"Podemos pedir",s:LFT},
      {en:"We'd like",pt:"Nós gostaríamos",s:LFT},

      {en:"The food is",pt:"A comida está",s:STAR},
      {en:"This dish is",pt:"Esse prato está",s:STAR},
      {en:"Everything is",pt:"Tudo está",s:STAR},
      {en:"The service is",pt:"O atendimento está",s:STAR},

      {en:"Could you bring",pt:"Pode trazer",s:DIA},
      {en:"Can I have",pt:"Posso pedir",s:DIA},
      {en:"We'd like to pay",pt:"Gostaríamos de pagar",s:DIA},
      {en:"Could we get",pt:"Podemos pedir",s:DIA},
    ]},
    1: { replace:true, items:[
      {en:"the steak",pt:"o bife",s:TRI},
      {en:"the pasta",pt:"a massa",s:TRI},
      {en:"the salad",pt:"a salada",s:TRI},
      {en:"the chef's special",pt:"o prato do chef",s:TRI},

      {en:"a coffee",pt:"um café",s:HRT},
      {en:"a beer",pt:"uma cerveja",s:HRT},
      {en:"a glass of wine",pt:"uma taça de vinho",s:HRT},
      {en:"a sandwich",pt:"um sanduíche",s:HRT},

      {en:"dish",pt:"prato",s:DOT},
      {en:"sauce",pt:"molho",s:DOT},
      {en:"soup",pt:"sopa",s:DOT},
      {en:"meat",pt:"carne",s:DOT},

      {en:"peanuts",pt:"amendoim",s:UP},
      {en:"dairy",pt:"laticínio",s:UP},
      {en:"gluten",pt:"glúten",s:UP},
      {en:"shellfish",pt:"frutos do mar",s:UP},

      {en:"some bread",pt:"um pão",s:LFT},
      {en:"some water",pt:"uma água",s:LFT},
      {en:"another menu",pt:"outro menu",s:LFT},
      {en:"some napkins",pt:"alguns guardanapos",s:LFT},

      {en:"delicious",pt:"deliciosa",s:STAR},
      {en:"amazing",pt:"incrível",s:STAR},
      {en:"a bit cold",pt:"um pouco fria",s:STAR},
      {en:"too salty",pt:"salgada demais",s:STAR},

      {en:"the bill",pt:"a conta",s:DIA},
      {en:"the check",pt:"a conta",s:DIA},
      {en:"a doggy bag",pt:"uma quentinha",s:DIA},
      {en:"the receipt",pt:"o recibo",s:DIA},
    ]},
    2: { replace:true, items:[
      {en:"well-done",pt:"bem passado",s:TRI},
      {en:"medium",pt:"ao ponto",s:TRI},
      {en:"with extra cheese",pt:"com extra queijo",s:TRI},
      {en:"without onions",pt:"sem cebola",s:TRI},

      {en:"with milk",pt:"com leite",s:HRT},
      {en:"to go",pt:"pra viagem",s:HRT},
      {en:"on the rocks",pt:"com gelo",s:HRT},
      {en:"with no ice",pt:"sem gelo",s:HRT},

      {en:"vegetarian",pt:"vegetariano",s:DOT},
      {en:"vegan",pt:"vegano",s:DOT},
      {en:"spicy",pt:"apimentado",s:DOT},
      {en:"gluten-free",pt:"sem glúten",s:DOT},

      {en:"unfortunately",pt:"infelizmente",s:UP},
      {en:"I'm sorry",pt:"desculpa",s:UP},
      {en:"if possible",pt:"se possível",s:UP},
      {en:"strictly",pt:"estritamente",s:UP},

      {en:"with the meal",pt:"com a refeição",s:LFT},
      {en:"to start with",pt:"pra começar",s:LFT},
      {en:"on the side",pt:"à parte",s:LFT},
      {en:"for the table",pt:"pra mesa",s:LFT},

      {en:"honestly",pt:"sinceramente",s:STAR},
      {en:"by the way",pt:"a propósito",s:STAR},
      {en:"to be fair",pt:"pra ser justo",s:STAR},
      {en:"I have to say",pt:"tenho que admitir",s:STAR},

      {en:"when you have a chance",pt:"quando puder",s:DIA},
      {en:"please",pt:"por favor",s:DIA},
      {en:"separately",pt:"separadamente",s:DIA},
      {en:"with the card machine",pt:"com a maquininha",s:DIA},
    ]},
    3: { replace:true, items:[
      {en:"please",pt:"por favor",s:TRI},
      {en:"thanks",pt:"obrigado(a)",s:TRI},
      {en:"if possible",pt:"se possível",s:TRI},
      {en:"to start",pt:"pra começar",s:TRI},

      {en:"please",pt:"por favor",s:HRT},
      {en:"if you can",pt:"se puder",s:HRT},
      {en:"thanks",pt:"obrigado(a)",s:HRT},
      {en:"to drink",pt:"pra beber",s:HRT},

      {en:"by any chance",pt:"por acaso",s:DOT},
      {en:"or not",pt:"ou não",s:DOT},
      {en:"on the menu",pt:"no cardápio",s:DOT},
      {en:"as an option",pt:"como opção",s:DOT},

      {en:"in the dish",pt:"no prato",s:UP},
      {en:"in the meal",pt:"na refeição",s:UP},
      {en:"at all",pt:"de jeito nenhum",s:UP},
      {en:"please",pt:"por favor",s:UP},

      {en:"please",pt:"por favor",s:LFT},
      {en:"if you don't mind",pt:"se não se importar",s:LFT},
      {en:"to share",pt:"pra dividir",s:LFT},
      {en:"to enjoy",pt:"pra curtir",s:LFT},

      {en:"we love it",pt:"estamos amando",s:STAR},
      {en:"compliments to the chef",pt:"parabéns ao chef",s:STAR},
      {en:"could be better",pt:"poderia ser melhor",s:STAR},
      {en:"we'll come back",pt:"vamos voltar",s:STAR},

      {en:"thanks",pt:"obrigado(a)",s:DIA},
      {en:"if possible",pt:"se possível",s:DIA},
      {en:"to share",pt:"pra dividir",s:DIA},
      {en:"by card",pt:"no cartão",s:DIA},
    ]},
    examples: [
      {en:"I'd like to order the steak well-done please",pt:"Eu gostaria de pedir o bife bem passado por favor"},
      {en:"I'll have the pasta with extra cheese to start",pt:"Vou querer a massa com extra queijo pra começar"},
      {en:"Can I get a coffee with milk please?",pt:"Posso pedir um café com leite por favor?"},
      {en:"Could I have a beer to go thanks?",pt:"Posso ter uma cerveja pra viagem obrigado?"},
      {en:"Is this dish vegetarian by any chance?",pt:"Esse prato é vegetariano por acaso?"},
      {en:"Does this have meat in the dish?",pt:"Isso tem carne no prato?"},
      {en:"I'm allergic to peanuts unfortunately at all",pt:"Sou alérgico a amendoim infelizmente de jeito nenhum"},
      {en:"I can't eat dairy I'm sorry please",pt:"Não posso comer laticínio desculpa por favor"},
      {en:"Could we have some bread with the meal please?",pt:"Podemos ter um pão com a refeição por favor?"},
      {en:"Can we get some water for the table to share?",pt:"Podemos pedir uma água pra mesa pra dividir?"},
      {en:"The food is delicious honestly we love it",pt:"A comida está deliciosa sinceramente estamos amando"},
      {en:"This dish is amazing I have to say compliments to the chef",pt:"Esse prato está incrível tenho que admitir parabéns ao chef"},
      {en:"Could you bring the bill when you have a chance thanks?",pt:"Pode trazer a conta quando puder obrigado?"},
      {en:"We'd like to pay separately by card",pt:"Gostaríamos de pagar separadamente no cartão"},
    ],
    phrasals: [
      {term:"I'd like to order / I'll have",desc:"As duas formas mais usadas pra pedir num restaurante. 'I'd like to order' é mais formal e completa; 'I'll have' é casual e mais comum no dia a dia. Sempre seguido de 'the' + nome do prato.",ex:[
        {en:"I'd like to order the steak please",pt:"Eu gostaria de pedir o bife por favor"},
        {en:"I'll have the pasta with extra cheese",pt:"Vou querer a massa com extra queijo"}
      ]},
      {term:"Can I get / Could I have",desc:"Para pedidos casuais (cafés, bares, fast food). 'Can I get' é mais americano, 'Could I have' mais britânico/educado. Funcionam intercambiavelmente.",ex:[
        {en:"Can I get a coffee with milk to go?",pt:"Posso pedir um café com leite pra viagem?"},
        {en:"Could I have a beer please?",pt:"Posso ter uma cerveja por favor?"}
      ]},
      {term:"Is this / Does this have",desc:"Pra perguntar sobre ingredientes. 'Is this [adjetivo]?' (vegan, gluten-free, spicy). 'Does this have [substantivo]?' (peanuts, dairy, meat). Confundir os dois é erro clássico.",ex:[
        {en:"Is this dish vegetarian?",pt:"Esse prato é vegetariano?"},
        {en:"Does this have peanuts?",pt:"Isso tem amendoim?"}
      ]},
      {term:"I'm allergic to / I can't eat",desc:"Pra restrições alimentares. 'Allergic to' é alergia médica; 'I can't eat' é mais geral (pode ser dieta, gosto). Sempre 'to + substantivo' depois de 'allergic'.",ex:[
        {en:"I'm allergic to peanuts unfortunately",pt:"Sou alérgico a amendoim infelizmente"},
        {en:"I can't eat dairy please",pt:"Não posso comer laticínio por favor"}
      ]},
      {term:"Could we have / Could you bring us",desc:"Pra pedidos no plural (mesa). Mais educado que 'we want' ou 'give us'. Padrão em restaurantes formais.",ex:[
        {en:"Could we have some bread with the meal?",pt:"Podemos ter um pão com a refeição?"},
        {en:"Could you bring us another menu please?",pt:"Pode trazer outro menu por favor?"}
      ]},
      {term:"The food is / The service is",desc:"Estruturas pra dar feedback. Note: 'food' e 'service' são incontáveis (não 'foods are', sempre 'food is'). Adicione adverbial ('honestly', 'to be fair') pra suavizar críticas.",ex:[
        {en:"The food is delicious honestly we love it",pt:"A comida está deliciosa sinceramente estamos amando"},
        {en:"The service is amazing by the way",pt:"O atendimento está incrível a propósito"}
      ]},
      {term:"Could you bring / We'd like to pay",desc:"Pra fechar conta. 'Could you bring the bill' (UK) ou 'check' (US) — ambos funcionam. 'We'd like to pay separately' é fundamental quando vai dividir.",ex:[
        {en:"Could you bring the bill when you have a chance?",pt:"Pode trazer a conta quando puder?"},
        {en:"We'd like to pay separately by card",pt:"Gostaríamos de pagar separadamente no cartão"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // COOKING 2
  // ◣ I am [vb-ing] [obj] [propósito]
  // ════════════════════════════════════════════
  "cooking-2": {
    0: { replace:true, items:[
      {en:"I am",pt:"Eu estou",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"pinching",pt:"pegando uma pitada de",s:TRI},
      {en:"pouring",pt:"despejando",s:TRI},
      {en:"adding",pt:"adicionando",s:TRI},
      {en:"roasting",pt:"assando",s:TRI},
      {en:"baking",pt:"assando",s:TRI},
      {en:"melting",pt:"derretendo",s:TRI},
      {en:"frying",pt:"fritando",s:TRI},
      {en:"cracking",pt:"quebrando",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"some salt",pt:"sal",s:TRI},
      {en:"some pepper",pt:"pimenta",s:TRI},
      {en:"some sugar",pt:"açúcar",s:TRI},
      {en:"water",pt:"água",s:TRI},
      {en:"wine",pt:"vinho",s:TRI},
      {en:"milk",pt:"leite",s:TRI},
      {en:"chicken",pt:"frango",s:TRI},
      {en:"potatoes",pt:"batatas",s:TRI},
      {en:"the fish",pt:"o peixe",s:TRI},
      {en:"a cake",pt:"um bolo",s:TRI},
      {en:"some cookies",pt:"cookies",s:TRI},
      {en:"a pizza",pt:"uma pizza",s:TRI},
      {en:"chocolate",pt:"chocolate",s:TRI},
      {en:"cheese",pt:"queijo",s:TRI},
      {en:"some chips",pt:"batatas fritas",s:TRI},
      {en:"an egg",pt:"um ovo",s:TRI},
    ]},
    3: { replace:true, items:[
      {en:"on the meat",pt:"na carne",s:TRI},
      {en:"into a glass",pt:"em um copo",s:TRI},
      {en:"into a mug",pt:"em uma caneca",s:TRI},
      {en:"to the sauce",pt:"no molho",s:TRI},
      {en:"in the oven",pt:"no forno",s:TRI},
      {en:"for the recipe",pt:"para a receita",s:TRI},
      {en:"for nachos",pt:"para nachos",s:TRI},
      {en:"in the pan",pt:"na panela",s:TRI},
    ]},
  },

  // ════════════════════════════════════════════
  // PHONE — Ligações, reuniões online, mensagens
  // ◣ Atender / iniciar — "Hi this is Marina speaking how can I help"
  // ♥ Pedir conexão — "Could I speak to the manager please if available"
  // ● Reuniões online — "Can you hear me clearly on this call now"
  // ▲ Problemas técnicos — "You're breaking up could you repeat that please"
  // ◀ Reagendar / cancelar — "I'd like to reschedule our call for tomorrow afternoon"
  // ★ Mensagem / recado — "Could you tell her I called when she's free"
  // ◆ Despedida — "Talk to you soon take care for now"
  // ════════════════════════════════════════════
  "phone": {
    title: "phone",
    sub: "Ligações & reuniões online",
    desc: "Frases pra qualquer ligação, videoconferência ou call em inglês — atender, falar com pessoa específica, lidar com problemas de áudio. Cada símbolo é uma situação típica. Combine itens das 4 colunas com o mesmo símbolo.",
    0: { replace:true, items:[
      {en:"Hi this is",pt:"Oi aqui é",s:TRI},
      {en:"Hello, my name is",pt:"Alô, meu nome é",s:TRI},
      {en:"Speaking,",pt:"Sou eu,",s:TRI},
      {en:"This is",pt:"Aqui é",s:TRI},

      {en:"Could I speak to",pt:"Posso falar com",s:HRT},
      {en:"May I speak with",pt:"Posso falar com",s:HRT},
      {en:"Is there anyone who",pt:"Tem alguém que",s:HRT},
      {en:"Can you transfer me to",pt:"Pode me transferir para",s:HRT},

      {en:"Can you hear me",pt:"Você me ouve",s:DOT},
      {en:"Am I coming through",pt:"Estou chegando",s:DOT},
      {en:"Is my audio",pt:"Meu áudio está",s:DOT},
      {en:"Can everyone see me",pt:"Todo mundo me vê",s:DOT},

      {en:"You're breaking up",pt:"Você está cortando",s:UP},
      {en:"I can't hear you",pt:"Não consigo te ouvir",s:UP},
      {en:"The connection is",pt:"A conexão está",s:UP},
      {en:"There's an echo",pt:"Tem um eco",s:UP},

      {en:"I'd like to reschedule",pt:"Gostaria de reagendar",s:LFT},
      {en:"Can we reschedule",pt:"Podemos reagendar",s:LFT},
      {en:"I need to cancel",pt:"Preciso cancelar",s:LFT},
      {en:"Could we move",pt:"Podemos mover",s:LFT},

      {en:"Could you tell",pt:"Pode dizer a",s:STAR},
      {en:"Please let",pt:"Por favor avise",s:STAR},
      {en:"Can you ask",pt:"Pode perguntar a",s:STAR},
      {en:"Would you let",pt:"Você pode avisar",s:STAR},

      {en:"Talk to you",pt:"Falo com você",s:DIA},
      {en:"Have a great",pt:"Tenha um(a) ótimo(a)",s:DIA},
      {en:"Thanks for",pt:"Obrigado(a) por",s:DIA},
      {en:"It was nice",pt:"Foi ótimo",s:DIA},
    ]},
    1: { replace:true, items:[
      {en:"Marina speaking",pt:"Marina falando",s:TRI},
      {en:"Marina from sales",pt:"Marina do comercial",s:TRI},
      {en:"calling about",pt:"ligando sobre",s:TRI},
      {en:"returning your call",pt:"retornando sua ligação",s:TRI},

      {en:"the manager",pt:"o(a) gerente",s:HRT},
      {en:"someone in HR",pt:"alguém do RH",s:HRT},
      {en:"customer service",pt:"o atendimento",s:HRT},
      {en:"the responsible person",pt:"a pessoa responsável",s:HRT},

      {en:"clearly",pt:"claramente",s:DOT},
      {en:"loud and clear",pt:"alto e claro",s:DOT},
      {en:"OK",pt:"OK",s:DOT},
      {en:"good enough",pt:"bem o suficiente",s:DOT},

      {en:"could you repeat that",pt:"pode repetir",s:UP},
      {en:"sorry, what did you say",pt:"desculpa, o que disse",s:UP},
      {en:"could you speak louder",pt:"pode falar mais alto",s:UP},
      {en:"unstable",pt:"instável",s:UP},

      {en:"our call",pt:"nossa ligação",s:LFT},
      {en:"the meeting",pt:"a reunião",s:LFT},
      {en:"our chat",pt:"nossa conversa",s:LFT},
      {en:"the appointment",pt:"o compromisso",s:LFT},

      {en:"her",pt:"a ela",s:STAR},
      {en:"him",pt:"a ele",s:STAR},
      {en:"the team",pt:"a equipe",s:STAR},
      {en:"the office",pt:"o escritório",s:STAR},

      {en:"to you soon",pt:"em breve",s:DIA},
      {en:"day ahead",pt:"dia",s:DIA},
      {en:"calling me",pt:"ter ligado",s:DIA},
      {en:"talking to you",pt:"falar com você",s:DIA},
    ]},
    2: { replace:true, items:[
      {en:"how can I help",pt:"como posso ajudar",s:TRI},
      {en:"how may I assist you",pt:"como posso te assistir",s:TRI},
      {en:"what can I do for you",pt:"o que posso fazer por você",s:TRI},
      {en:"is this the right person",pt:"sou a pessoa certa",s:TRI},

      {en:"please",pt:"por favor",s:HRT},
      {en:"if available",pt:"se disponível",s:HRT},
      {en:"if possible",pt:"se possível",s:HRT},
      {en:"thanks",pt:"obrigado(a)",s:HRT},

      {en:"on this call",pt:"nessa ligação",s:DOT},
      {en:"on Zoom",pt:"no Zoom",s:DOT},
      {en:"in the meeting",pt:"na reunião",s:DOT},
      {en:"with everyone",pt:"com todo mundo",s:DOT},

      {en:"please",pt:"por favor",s:UP},
      {en:"a bit slower",pt:"um pouco mais devagar",s:UP},
      {en:"I missed it",pt:"perdi o que disse",s:UP},
      {en:"the volume",pt:"o volume",s:UP},

      {en:"for tomorrow afternoon",pt:"para amanhã à tarde",s:LFT},
      {en:"to next week",pt:"para a semana que vem",s:LFT},
      {en:"to a different time",pt:"para outro horário",s:LFT},
      {en:"to Friday morning",pt:"para sexta de manhã",s:LFT},

      {en:"I called",pt:"que liguei",s:STAR},
      {en:"about the meeting",pt:"sobre a reunião",s:STAR},
      {en:"to call me back",pt:"para me ligar de volta",s:STAR},
      {en:"about the project",pt:"sobre o projeto",s:STAR},

      {en:"take care",pt:"se cuida",s:DIA},
      {en:"have a great day",pt:"tenha um ótimo dia",s:DIA},
      {en:"goodbye",pt:"tchau",s:DIA},
      {en:"thanks again",pt:"obrigado(a) de novo",s:DIA},
    ]},
    3: { replace:true, items:[
      {en:"now",pt:"agora",s:TRI},
      {en:"today",pt:"hoje",s:TRI},
      {en:"please",pt:"por favor",s:TRI},
      {en:"this morning",pt:"essa manhã",s:TRI},

      {en:"if available",pt:"se disponível",s:HRT},
      {en:"thanks",pt:"obrigado(a)",s:HRT},
      {en:"this is urgent",pt:"é urgente",s:HRT},
      {en:"if you can",pt:"se puder",s:HRT},

      {en:"now",pt:"agora",s:DOT},
      {en:"please confirm",pt:"por favor confirme",s:DOT},
      {en:"thanks",pt:"obrigado(a)",s:DOT},
      {en:"or do I need to adjust",pt:"ou preciso ajustar",s:DOT},

      {en:"please",pt:"por favor",s:UP},
      {en:"thanks",pt:"obrigado(a)",s:UP},
      {en:"this is frustrating",pt:"está difícil",s:UP},
      {en:"sorry",pt:"desculpa",s:UP},

      {en:"if possible",pt:"se possível",s:LFT},
      {en:"thanks for understanding",pt:"obrigado(a) pela compreensão",s:LFT},
      {en:"please",pt:"por favor",s:LFT},
      {en:"sorry for the change",pt:"desculpa pela mudança",s:LFT},

      {en:"when she's free",pt:"quando ela estiver livre",s:STAR},
      {en:"as soon as possible",pt:"o mais rápido possível",s:STAR},
      {en:"today if possible",pt:"hoje se possível",s:STAR},
      {en:"thanks",pt:"obrigado(a)",s:STAR},

      {en:"for now",pt:"por enquanto",s:DIA},
      {en:"and goodbye",pt:"e tchau",s:DIA},
      {en:"have a good one",pt:"tenha um ótimo dia",s:DIA},
      {en:"see you next time",pt:"até a próxima",s:DIA},
    ]},
    examples: [
      {en:"Hi this is Marina speaking how can I help now?",pt:"Oi aqui é Marina falando como posso ajudar agora?"},
      {en:"Hello my name is Marina from sales is this the right person?",pt:"Alô meu nome é Marina do comercial sou a pessoa certa?"},
      {en:"Could I speak to the manager please if available?",pt:"Posso falar com o gerente por favor se disponível?"},
      {en:"Can you transfer me to customer service please thanks?",pt:"Pode me transferir para o atendimento por favor obrigado?"},
      {en:"Can you hear me clearly on this call now?",pt:"Você me ouve claramente nessa ligação agora?"},
      {en:"Is my audio OK in the meeting please confirm?",pt:"Meu áudio está OK na reunião por favor confirme?"},
      {en:"You're breaking up could you repeat that please?",pt:"Você está cortando pode repetir por favor?"},
      {en:"I can't hear you a bit slower thanks?",pt:"Não consigo te ouvir um pouco mais devagar obrigado?"},
      {en:"I'd like to reschedule our call for tomorrow afternoon if possible",pt:"Gostaria de reagendar nossa ligação para amanhã à tarde se possível"},
      {en:"Can we reschedule the meeting to Friday morning please?",pt:"Podemos reagendar a reunião para sexta de manhã por favor?"},
      {en:"Could you tell her I called when she's free?",pt:"Pode dizer a ela que liguei quando ela estiver livre?"},
      {en:"Please let the team about the project as soon as possible thanks",pt:"Por favor avise a equipe sobre o projeto o mais rápido possível obrigado"},
      {en:"Talk to you soon take care for now",pt:"Falo com você em breve se cuida por enquanto"},
      {en:"Thanks for calling me have a great day",pt:"Obrigado por ter ligado tenha um ótimo dia"},
    ],
    phrasals: [
      {term:"Hi this is [nome] / Speaking",desc:"Pra atender ou iniciar uma ligação. 'Hi this is Marina' (apresentação completa). 'Speaking' (resposta curta quando alguém pergunta por você ao telefone).",ex:[
        {en:"Hi this is Marina speaking",pt:"Oi aqui é Marina falando"},
        {en:"Speaking, how can I help?",pt:"Sou eu, como posso ajudar?"}
      ]},
      {term:"Could I speak to / May I speak with",desc:"'Speak TO' é mais americano e direto; 'speak WITH' é levemente mais formal/britânico. 'Could I' é mais educado que 'Can I'. 'May I' é máximo de formalidade.",ex:[
        {en:"Could I speak to the manager please?",pt:"Posso falar com o gerente por favor?"},
        {en:"May I speak with someone in HR?",pt:"Posso falar com alguém do RH?"}
      ]},
      {term:"Can you hear me / Am I coming through",desc:"Frases padrão pra checar áudio em call. 'Can you hear me clearly?' é o mais usado. 'Am I coming through?' é mais informal e moderno (uso popularizado em videocalls).",ex:[
        {en:"Can you hear me clearly on this call?",pt:"Você me ouve claramente nessa ligação?"},
        {en:"Am I coming through OK in the meeting?",pt:"Estou chegando OK na reunião?"}
      ]},
      {term:"You're breaking up / I can't hear you",desc:"Pra problemas de áudio. 'Breaking up' = áudio cortando. 'I can't hear you' é direto. Sempre adicione um pedido: 'could you repeat that' ou 'could you speak louder'.",ex:[
        {en:"You're breaking up could you repeat that?",pt:"Você está cortando pode repetir?"},
        {en:"I can't hear you a bit slower please",pt:"Não consigo te ouvir um pouco mais devagar por favor"}
      ]},
      {term:"I'd like to reschedule / Can we reschedule",desc:"'Reschedule' (verb) = remarcar. 'I'd like to' é educado; 'Can we' é colaborativo. Sempre 'reschedule [evento] FOR/TO [novo tempo]'. Erro brasileiro: 'remark' (não existe) ou 're-schedule' separado.",ex:[
        {en:"I'd like to reschedule our call for tomorrow",pt:"Gostaria de reagendar nossa ligação para amanhã"},
        {en:"Can we reschedule the meeting to Friday?",pt:"Podemos reagendar a reunião para sexta?"}
      ]},
      {term:"Could you tell [pessoa] / Please let [pessoa]",desc:"Pra deixar recado. 'Could you tell her [recado]' é o mais comum. 'Please let X know [info]' é mais formal. Sempre seguido de info compacta + 'when she's free' ou 'as soon as possible'.",ex:[
        {en:"Could you tell her I called when she's free?",pt:"Pode dizer a ela que liguei quando estiver livre?"},
        {en:"Please let the team know about the project",pt:"Por favor avise a equipe sobre o projeto"}
      ]},
      {term:"Talk to you soon / Have a great day",desc:"Despedidas profissionais. 'Talk to you soon' é o padrão (não 'until later' que é tradução literal). 'Take care' é informal mas universal. 'Have a great day' é caloroso e profissional.",ex:[
        {en:"Talk to you soon take care",pt:"Falo com você em breve se cuida"},
        {en:"Thanks for calling have a great day",pt:"Obrigado por ligar tenha um ótimo dia"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // TRAVEL — Aeroporto, hotel, direções
  // ◣ Imigração / propósito da viagem — "I'm here for business for two weeks"
  // ♥ Reservar / pedir — "I'd like to book a flight to Paris"
  // ● Pedir info — "Can you tell me where the airport is from here"
  // ▲ Pedir direção — "How do I get to the hotel by taxi from the station"
  // ◀ Experiência de viagem — "I've been to Paris last year for vacation"
  // ★ Onde está hospedado — "I'm staying at a hotel downtown for three nights"
  // ◆ Itinerário — "I plan to visit the museum tomorrow before I leave"
  // ════════════════════════════════════════════
  "traveling": {
    title: "travel",
    sub: "Aeroporto, hotel & direções",
    desc: "Frases pra usar em qualquer viagem internacional — imigração, hotel, restaurantes, perguntando direções. Cada símbolo é uma situação típica. Combine itens das 4 colunas com o mesmo símbolo.",
    0: { replace:true, items:[
      {en:"I'm here for",pt:"Estou aqui a",s:TRI},
      {en:"I'm visiting for",pt:"Estou visitando a",s:TRI},
      {en:"I'm traveling for",pt:"Estou viajando a",s:TRI},
      {en:"I'm staying for",pt:"Vou ficar por",s:TRI},

      {en:"I'd like to",pt:"Eu gostaria de",s:HRT},
      {en:"I want to",pt:"Eu quero",s:HRT},
      {en:"I need to",pt:"Eu preciso",s:HRT},
      {en:"Could I",pt:"Posso",s:HRT},

      {en:"Can you tell me",pt:"Você pode me dizer",s:DOT},
      {en:"Could you tell me",pt:"Você poderia me dizer",s:DOT},
      {en:"Excuse me,",pt:"Com licença,",s:DOT},
      {en:"Sorry,",pt:"Desculpa,",s:DOT},

      {en:"How do I get to",pt:"Como eu chego",s:UP},
      {en:"What's the best way to",pt:"Qual a melhor forma de chegar",s:UP},
      {en:"Can I walk to",pt:"Dá pra ir andando até",s:UP},
      {en:"How far is",pt:"Quão longe fica",s:UP},

      {en:"I've been to",pt:"Eu já fui a",s:LFT},
      {en:"I visited",pt:"Eu visitei",s:LFT},
      {en:"I went to",pt:"Eu fui a",s:LFT},
      {en:"I've traveled to",pt:"Eu já viajei pra",s:LFT},

      {en:"I'm staying at",pt:"Estou hospedado em",s:STAR},
      {en:"I booked",pt:"Reservei",s:STAR},
      {en:"We're at",pt:"Estamos em",s:STAR},
      {en:"I'm checked into",pt:"Fiz check-in em",s:STAR},

      {en:"I plan to",pt:"Pretendo",s:DIA},
      {en:"I want to",pt:"Eu quero",s:DIA},
      {en:"I'd love to",pt:"Eu adoraria",s:DIA},
      {en:"I'm going to",pt:"Vou",s:DIA},
    ]},
    1: { replace:true, items:[
      {en:"business",pt:"negócios",s:TRI},
      {en:"leisure",pt:"lazer",s:TRI},
      {en:"tourism",pt:"turismo",s:TRI},
      {en:"vacation",pt:"férias",s:TRI},
      {en:"a conference",pt:"uma conferência",s:TRI},

      {en:"book",pt:"reservar",s:HRT},
      {en:"reserve",pt:"reservar",s:HRT},
      {en:"change",pt:"mudar",s:HRT},
      {en:"cancel",pt:"cancelar",s:HRT},

      {en:"where",pt:"onde",s:DOT},
      {en:"how to find",pt:"como achar",s:DOT},
      {en:"what time",pt:"que horas",s:DOT},
      {en:"how much",pt:"quanto",s:DOT},

      {en:"the hotel",pt:"o hotel",s:UP},
      {en:"downtown",pt:"o centro",s:UP},
      {en:"the museum",pt:"o museu",s:UP},
      {en:"the airport",pt:"o aeroporto",s:UP},

      {en:"Paris",pt:"Paris",s:LFT},
      {en:"Tokyo",pt:"Tóquio",s:LFT},
      {en:"many countries",pt:"vários países",s:LFT},
      {en:"South America",pt:"a América do Sul",s:LFT},

      {en:"a hotel",pt:"um hotel",s:STAR},
      {en:"an Airbnb",pt:"um Airbnb",s:STAR},
      {en:"a hostel",pt:"um hostel",s:STAR},
      {en:"a resort",pt:"um resort",s:STAR},

      {en:"visit",pt:"visitar",s:DIA},
      {en:"explore",pt:"explorar",s:DIA},
      {en:"try",pt:"experimentar",s:DIA},
      {en:"see",pt:"ver",s:DIA},
    ]},
    2: { replace:true, items:[
      {en:"for two weeks",pt:"por duas semanas",s:TRI},
      {en:"for a few days",pt:"por alguns dias",s:TRI},
      {en:"for a month",pt:"por um mês",s:TRI},
      {en:"for the holidays",pt:"para as festas",s:TRI},

      {en:"a flight",pt:"um voo",s:HRT},
      {en:"a room",pt:"um quarto",s:HRT},
      {en:"a tour",pt:"um tour",s:HRT},
      {en:"my reservation",pt:"minha reserva",s:HRT},

      {en:"the airport is",pt:"o aeroporto fica",s:DOT},
      {en:"the bus stop is",pt:"o ponto de ônibus fica",s:DOT},
      {en:"check-in opens",pt:"o check-in abre",s:DOT},
      {en:"a taxi costs",pt:"um táxi custa",s:DOT},

      {en:"by taxi",pt:"de táxi",s:UP},
      {en:"by bus",pt:"de ônibus",s:UP},
      {en:"on foot",pt:"a pé",s:UP},
      {en:"by metro",pt:"de metrô",s:UP},

      {en:"last year",pt:"ano passado",s:LFT},
      {en:"a few times",pt:"algumas vezes",s:LFT},
      {en:"once",pt:"uma vez",s:LFT},
      {en:"on business",pt:"a negócios",s:LFT},

      {en:"downtown",pt:"no centro",s:STAR},
      {en:"near the airport",pt:"perto do aeroporto",s:STAR},
      {en:"in the city center",pt:"no centro da cidade",s:STAR},
      {en:"by the beach",pt:"perto da praia",s:STAR},

      {en:"the museum",pt:"o museu",s:DIA},
      {en:"the local food",pt:"a comida local",s:DIA},
      {en:"the old city",pt:"a cidade antiga",s:DIA},
      {en:"some landmarks",pt:"alguns pontos turísticos",s:DIA},
    ]},
    3: { replace:true, items:[
      {en:"on this trip",pt:"nessa viagem",s:TRI},
      {en:"abroad",pt:"no exterior",s:TRI},
      {en:"officially",pt:"oficialmente",s:TRI},
      {en:"for the first time",pt:"pela primeira vez",s:TRI},

      {en:"to Paris",pt:"para Paris",s:HRT},
      {en:"for tonight",pt:"pra hoje à noite",s:HRT},
      {en:"for two nights",pt:"por duas noites",s:HRT},
      {en:"online",pt:"online",s:HRT},

      {en:"from here",pt:"daqui",s:DOT},
      {en:"nearby",pt:"perto",s:DOT},
      {en:"in this area",pt:"nessa área",s:DOT},
      {en:"right now",pt:"agora",s:DOT},

      {en:"from here",pt:"daqui",s:UP},
      {en:"from the station",pt:"da estação",s:UP},
      {en:"quickly",pt:"rapidinho",s:UP},
      {en:"safely",pt:"com segurança",s:UP},

      {en:"for vacation",pt:"de férias",s:LFT},
      {en:"for work",pt:"a trabalho",s:LFT},
      {en:"with my family",pt:"com a família",s:LFT},
      {en:"alone",pt:"sozinho(a)",s:LFT},

      {en:"for three nights",pt:"por três noites",s:STAR},
      {en:"for a week",pt:"por uma semana",s:STAR},
      {en:"until Sunday",pt:"até domingo",s:STAR},
      {en:"on a budget",pt:"com orçamento limitado",s:STAR},

      {en:"tomorrow",pt:"amanhã",s:DIA},
      {en:"this weekend",pt:"esse fim de semana",s:DIA},
      {en:"on my last day",pt:"no meu último dia",s:DIA},
      {en:"before I leave",pt:"antes de eu ir",s:DIA},
    ]},
    examples: [
      {en:"I'm here for business for two weeks officially",pt:"Estou aqui a negócios por duas semanas oficialmente"},
      {en:"I'm staying for vacation for a few days for the first time",pt:"Vou ficar de férias por alguns dias pela primeira vez"},
      {en:"I'd like to book a flight to Paris online",pt:"Eu gostaria de reservar um voo para Paris online"},
      {en:"I need to cancel my reservation for tonight",pt:"Eu preciso cancelar minha reserva pra hoje à noite"},
      {en:"Excuse me, where the airport is from here?",pt:"Com licença, onde o aeroporto fica daqui?"},
      {en:"Can you tell me how much a taxi costs in this area?",pt:"Você pode me dizer quanto um táxi custa nessa área?"},
      {en:"How do I get to downtown by metro from here?",pt:"Como eu chego no centro de metrô daqui?"},
      {en:"How far is the airport by taxi from the station?",pt:"Quão longe fica o aeroporto de táxi da estação?"},
      {en:"I've been to Paris last year for vacation",pt:"Eu já fui a Paris ano passado de férias"},
      {en:"I went to many countries on business with my family",pt:"Eu fui a vários países a negócios com a família"},
      {en:"I'm staying at a hotel downtown for three nights",pt:"Estou hospedado em um hotel no centro por três noites"},
      {en:"I booked an Airbnb near the airport on a budget",pt:"Reservei um Airbnb perto do aeroporto com orçamento limitado"},
      {en:"I plan to visit the museum tomorrow",pt:"Pretendo visitar o museu amanhã"},
      {en:"I'd love to try the local food this weekend",pt:"Eu adoraria experimentar a comida local esse fim de semana"},
    ],
    phrasals: [
      {term:"I'm here for [purpose]",desc:"Frase essencial em imigração / customs. 'I'm here for business' ou 'for leisure/tourism' são as mais usadas. Sempre seguido de substantivo abstrato (não de gerúndio).",ex:[
        {en:"I'm here for business for two weeks",pt:"Estou aqui a negócios por duas semanas"},
        {en:"I'm visiting for tourism for a few days",pt:"Estou visitando a turismo por alguns dias"}
      ]},
      {term:"I'd like to / I want to",desc:"'I'd like to' é mais formal e educado, ideal pra hotéis e restaurantes. 'I want to' é direto, mais comum em conversa casual. Sempre seguido de verbo no infinitivo (sem 'to' duplicado).",ex:[
        {en:"I'd like to book a flight to Paris",pt:"Eu gostaria de reservar um voo para Paris"},
        {en:"I want to change my reservation for tonight",pt:"Eu quero mudar minha reserva pra hoje à noite"}
      ]},
      {term:"Can you tell me / Could you tell me",desc:"Forma natural de pedir informação a estranhos. Sempre seguido de pergunta indireta — sem inversão verbo-sujeito ('where IS the airport' vira 'where the airport IS').",ex:[
        {en:"Can you tell me where the airport is from here?",pt:"Você pode me dizer onde o aeroporto fica daqui?"},
        {en:"Could you tell me what time check-in opens?",pt:"Você poderia me dizer que horas o check-in abre?"}
      ]},
      {term:"How do I get to / What's the best way to",desc:"As duas formas mais práticas de pedir direção. 'How do I get to' é universal; 'what's the best way to' implica comparar opções (taxi vs metrô).",ex:[
        {en:"How do I get to the hotel by taxi?",pt:"Como eu chego no hotel de táxi?"},
        {en:"What's the best way to downtown on foot?",pt:"Qual a melhor forma de chegar no centro a pé?"}
      ]},
      {term:"I've been to / I went to",desc:"'I've been to [lugar]' = experiência geral, sem tempo definido ('I've been to Paris' = já fui em Paris alguma vez). 'I went to [lugar] [tempo]' = uma viagem específica ('I went to Paris last year').",ex:[
        {en:"I've been to many countries on business",pt:"Já fui a vários países a negócios"},
        {en:"I went to Tokyo last year with my family",pt:"Fui a Tóquio ano passado com a família"}
      ]},
      {term:"I'm staying at",desc:"Pra dizer onde você se hospedou. Sempre 'at' antes do tipo (a hotel/an Airbnb/a hostel). Não confunda com 'I live at' (que é casa fixa).",ex:[
        {en:"I'm staying at a hotel downtown for three nights",pt:"Estou hospedado em um hotel no centro por três noites"},
        {en:"I'm staying at an Airbnb near the airport",pt:"Estou hospedado em um Airbnb perto do aeroporto"}
      ]},
      {term:"I plan to / I'd love to",desc:"Pra falar de planos de viagem. 'I plan to' é mais firme (já decidi); 'I'd love to' é desejo flexível (gostaria de fazer). Ambos seguidos de verbo no infinitivo.",ex:[
        {en:"I plan to visit the museum tomorrow",pt:"Pretendo visitar o museu amanhã"},
        {en:"I'd love to try the local food this weekend",pt:"Eu adoraria experimentar a comida local esse fim de semana"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // RELATIONSHIPS — Namoro, parceiros, amigos
  // ◣ Apresentar parceiro — "I'm with my boyfriend for two years now"
  // ♥ Como se conheceram — "We met at work three years ago"
  // ● Buscando namoro — "I'm looking for someone fun and easygoing"
  // ▲ Tipo de pessoa — "I'm into someone who loves traveling honestly"
  // ◀ Status atual — "We're getting married next year actually"
  // ★ História do casal — "We've been dating since college believe it or not"
  // ◆ Sentimentos — "I really care about her a lot lately"
  // ════════════════════════════════════════════
  "relationships": {
    title: "relationships",
    sub: "Namoro & parceiros",
    desc: "Frases pra falar de relacionamentos em inglês — apresentar parceiro, contar como se conheceram, descrever o que busca. Cada símbolo é uma situação típica. Combine itens das 4 colunas com o mesmo símbolo.",
    0: { replace:true, items:[
      {en:"I'm with",pt:"Estou com",s:TRI},
      {en:"I'm dating",pt:"Estou namorando",s:TRI},
      {en:"This is",pt:"Esse(a) é",s:TRI},
      {en:"Meet",pt:"Conheça",s:TRI},

      {en:"We met",pt:"A gente se conheceu",s:HRT},
      {en:"We started dating",pt:"Começamos a namorar",s:HRT},
      {en:"We got together",pt:"Ficamos juntos",s:HRT},
      {en:"We've known each other",pt:"A gente se conhece",s:HRT},

      {en:"I'm looking for",pt:"Estou procurando",s:DOT},
      {en:"I want",pt:"Eu quero",s:DOT},
      {en:"I'd like to meet",pt:"Gostaria de conhecer",s:DOT},
      {en:"I'm into",pt:"Curto",s:DOT},

      {en:"I'm into",pt:"Curto",s:UP},
      {en:"I love",pt:"Eu amo",s:UP},
      {en:"I'm attracted to",pt:"Sou atraído por",s:UP},
      {en:"My type is",pt:"Meu tipo é",s:UP},

      {en:"We're",pt:"Estamos",s:LFT},
      {en:"We're getting",pt:"Vamos",s:LFT},
      {en:"We just",pt:"A gente acabou de",s:LFT},
      {en:"We recently",pt:"A gente recentemente",s:LFT},

      {en:"We've been dating",pt:"A gente namora",s:STAR},
      {en:"We've been together",pt:"A gente está junto",s:STAR},
      {en:"We've been married",pt:"A gente é casado",s:STAR},
      {en:"We've been seeing each other",pt:"A gente sai",s:STAR},

      {en:"I really care about",pt:"Eu me importo muito com",s:DIA},
      {en:"I'm crazy about",pt:"Sou louco por",s:DIA},
      {en:"I'm falling for",pt:"Tô me apaixonando por",s:DIA},
      {en:"I miss",pt:"Sinto falta de",s:DIA},
    ]},
    1: { replace:true, items:[
      {en:"my boyfriend",pt:"meu namorado",s:TRI},
      {en:"my girlfriend",pt:"minha namorada",s:TRI},
      {en:"my partner",pt:"meu(minha) parceiro(a)",s:TRI},
      {en:"my husband",pt:"meu marido",s:TRI},
      {en:"my wife",pt:"minha esposa",s:TRI},

      {en:"at work",pt:"no trabalho",s:HRT},
      {en:"through friends",pt:"por amigos",s:HRT},
      {en:"on a dating app",pt:"em um app de namoro",s:HRT},
      {en:"at a party",pt:"em uma festa",s:HRT},

      {en:"someone fun",pt:"alguém divertido",s:DOT},
      {en:"a serious relationship",pt:"um relacionamento sério",s:DOT},
      {en:"someone caring",pt:"alguém carinhoso",s:DOT},
      {en:"a long-term partner",pt:"um(a) parceiro(a) de longo prazo",s:DOT},

      {en:"someone who",pt:"alguém que",s:UP},
      {en:"people who",pt:"pessoas que",s:UP},
      {en:"a partner who",pt:"um(a) parceiro(a) que",s:UP},
      {en:"someone with",pt:"alguém com",s:UP},

      {en:"engaged",pt:"noivos",s:LFT},
      {en:"married next year",pt:"casar ano que vem",s:LFT},
      {en:"got engaged",pt:"ficamos noivos",s:LFT},
      {en:"moved in together",pt:"fomos morar juntos",s:LFT},

      {en:"since college",pt:"desde a faculdade",s:STAR},
      {en:"for three years",pt:"há três anos",s:STAR},
      {en:"for a few months",pt:"há alguns meses",s:STAR},
      {en:"for ages",pt:"há séculos",s:STAR},

      {en:"her",pt:"ela",s:DIA},
      {en:"him",pt:"ele",s:DIA},
      {en:"my partner",pt:"meu(minha) parceiro(a)",s:DIA},
      {en:"my crush",pt:"minha paixão",s:DIA},
    ]},
    2: { replace:true, items:[
      {en:"for two years",pt:"há dois anos",s:TRI},
      {en:"happily",pt:"felizmente",s:TRI},
      {en:"for now",pt:"por enquanto",s:TRI},
      {en:"officially",pt:"oficialmente",s:TRI},

      {en:"three years ago",pt:"três anos atrás",s:HRT},
      {en:"in college",pt:"na faculdade",s:HRT},
      {en:"during the pandemic",pt:"na pandemia",s:HRT},
      {en:"on a trip",pt:"em uma viagem",s:HRT},

      {en:"and easygoing",pt:"e tranquilo(a)",s:DOT},
      {en:"and ambitious",pt:"e ambicioso(a)",s:DOT},
      {en:"and family-oriented",pt:"e família",s:DOT},
      {en:"and adventurous",pt:"e aventureiro(a)",s:DOT},

      {en:"loves traveling",pt:"ama viajar",s:UP},
      {en:"is loyal",pt:"é leal",s:UP},
      {en:"makes me laugh",pt:"me faz rir",s:UP},
      {en:"shares my values",pt:"divide meus valores",s:UP},

      {en:"after two years",pt:"depois de dois anos",s:LFT},
      {en:"this summer",pt:"esse verão",s:LFT},
      {en:"last month",pt:"mês passado",s:LFT},
      {en:"already",pt:"já",s:LFT},

      {en:"believe it or not",pt:"acredite ou não",s:STAR},
      {en:"and going strong",pt:"e firmes",s:STAR},
      {en:"and we're happy",pt:"e a gente é feliz",s:STAR},
      {en:"already",pt:"já",s:STAR},

      {en:"a lot",pt:"muito",s:DIA},
      {en:"more than ever",pt:"mais do que nunca",s:DIA},
      {en:"every day",pt:"todo dia",s:DIA},
      {en:"more than I should",pt:"mais do que devia",s:DIA},
    ]},
    3: { replace:true, items:[
      {en:"now",pt:"agora",s:TRI},
      {en:"and going strong",pt:"e firmes",s:TRI},
      {en:"by the way",pt:"a propósito",s:TRI},
      {en:"believe it or not",pt:"acredite ou não",s:TRI},

      {en:"and it's been great",pt:"e tem sido ótimo",s:HRT},
      {en:"surprisingly",pt:"surpreendentemente",s:HRT},
      {en:"by chance",pt:"por acaso",s:HRT},
      {en:"and clicked instantly",pt:"e nos demos super bem",s:HRT},

      {en:"honestly",pt:"sinceramente",s:DOT},
      {en:"finally",pt:"finalmente",s:DOT},
      {en:"that's all",pt:"é isso",s:DOT},
      {en:"these days",pt:"hoje em dia",s:DOT},

      {en:"honestly",pt:"sinceramente",s:UP},
      {en:"more than anything",pt:"mais que tudo",s:UP},
      {en:"as a person",pt:"como pessoa",s:UP},
      {en:"in general",pt:"no geral",s:UP},

      {en:"actually",pt:"na verdade",s:LFT},
      {en:"finally",pt:"finalmente",s:LFT},
      {en:"surprisingly",pt:"surpreendentemente",s:LFT},
      {en:"and it's serious",pt:"e é sério",s:LFT},

      {en:"and counting",pt:"e contando",s:STAR},
      {en:"if you can believe it",pt:"se dá pra acreditar",s:STAR},
      {en:"now",pt:"agora",s:STAR},
      {en:"and we're solid",pt:"e estamos firmes",s:STAR},

      {en:"lately",pt:"ultimamente",s:DIA},
      {en:"to be honest",pt:"pra ser sincero",s:DIA},
      {en:"deeply",pt:"profundamente",s:DIA},
      {en:"in a good way",pt:"do bom jeito",s:DIA},
    ]},
    examples: [
      {en:"I'm with my boyfriend for two years now",pt:"Estou com meu namorado há dois anos"},
      {en:"This is my partner happily by the way",pt:"Esse(a) é meu(minha) parceiro(a) felizmente a propósito"},
      {en:"We met at work three years ago and it's been great",pt:"A gente se conheceu no trabalho três anos atrás e tem sido ótimo"},
      {en:"We started dating on a dating app during the pandemic surprisingly",pt:"Começamos a namorar em um app de namoro na pandemia surpreendentemente"},
      {en:"I'm looking for someone fun and easygoing honestly",pt:"Estou procurando alguém divertido e tranquilo sinceramente"},
      {en:"I'd like to meet a long-term partner and family-oriented these days",pt:"Gostaria de conhecer um(a) parceiro(a) de longo prazo e família hoje em dia"},
      {en:"I'm into someone who loves traveling honestly",pt:"Curto alguém que ama viajar sinceramente"},
      {en:"My type is a partner who shares my values as a person",pt:"Meu tipo é um(a) parceiro(a) que divide meus valores como pessoa"},
      {en:"We're getting married next year this summer actually",pt:"Vamos casar ano que vem esse verão na verdade"},
      {en:"We just moved in together last month and it's serious",pt:"A gente acabou de ir morar juntos mês passado e é sério"},
      {en:"We've been dating since college believe it or not",pt:"A gente namora desde a faculdade acredite ou não"},
      {en:"We've been together for three years and going strong",pt:"A gente está junto há três anos e firmes"},
      {en:"I really care about her a lot lately",pt:"Eu me importo muito com ela ultimamente"},
      {en:"I'm crazy about him more than ever to be honest",pt:"Sou louco por ele mais do que nunca pra ser sincero"},
    ],
    phrasals: [
      {term:"I'm with / I'm dating",desc:"'I'm with [pessoa]' = relação estabelecida (namoro/casamento). 'I'm dating [pessoa]' = saindo, mais casual. 'I'm seeing someone' é deliberadamente vago.",ex:[
        {en:"I'm with my boyfriend for two years",pt:"Estou com meu namorado há dois anos"},
        {en:"I'm dating my partner happily",pt:"Estou namorando meu(minha) parceiro(a) felizmente"}
      ]},
      {term:"We met / We started dating",desc:"Pra contar como começou. 'We met [lugar/jeito]' = primeira vez que se viram. 'We started dating' = quando viraram casal. Sempre passado simples (não 'we have met').",ex:[
        {en:"We met at work three years ago",pt:"A gente se conheceu no trabalho três anos atrás"},
        {en:"We started dating during the pandemic",pt:"Começamos a namorar na pandemia"}
      ]},
      {term:"I'm looking for / I want",desc:"Pra falar do que busca em dating. 'I'm looking for' é mais romântico/sério; 'I want' é direto. Após o objeto, pode adicionar 'who...' (qualidade) ou 'and...' (mais traços).",ex:[
        {en:"I'm looking for someone fun and easygoing",pt:"Estou procurando alguém divertido e tranquilo"},
        {en:"I want a serious relationship honestly",pt:"Eu quero um relacionamento sério sinceramente"}
      ]},
      {term:"I'm into / My type is",desc:"Pra descrever atração/preferência. 'I'm into [pessoa/tipo]' é casual; 'My type is' é mais filosófico. Após, geralmente vem 'who [verbo]' ou adjetivo.",ex:[
        {en:"I'm into someone who loves traveling",pt:"Curto alguém que ama viajar"},
        {en:"My type is a partner who shares my values",pt:"Meu tipo é um(a) parceiro(a) que divide meus valores"}
      ]},
      {term:"We're getting / We just",desc:"Pra eventos atuais ou recentes do casal. 'We're getting [married/engaged]' = futuro próximo. 'We just [moved/got]' = passado muito recente.",ex:[
        {en:"We're getting married next year",pt:"Vamos casar ano que vem"},
        {en:"We just moved in together last month",pt:"A gente acabou de ir morar juntos mês passado"}
      ]},
      {term:"We've been dating / together",desc:"Present perfect continuous pra duração de relacionamento. 'We've been dating' (namoro), 'together' (mais geral), 'married' (casamento). Sempre seguido de 'for [duração]' ou 'since [marco].",ex:[
        {en:"We've been dating since college",pt:"A gente namora desde a faculdade"},
        {en:"We've been together for three years",pt:"A gente está junto há três anos"}
      ]},
      {term:"I really care about / I'm crazy about",desc:"Pra falar de sentimentos. 'Care about' é amoroso e respeitoso; 'crazy about' é apaixonado/intenso; 'falling for' é o início de paixão. Sempre seguido de pessoa ou pronome.",ex:[
        {en:"I really care about her a lot",pt:"Eu me importo muito com ela"},
        {en:"I'm crazy about him more than ever",pt:"Sou louco por ele mais do que nunca"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // FAMILY — Apresentar, descrever, falar de origem
  // ◣ Apresentar familiar — "This is my brother who lives in São Paulo"
  // ♥ Como foi criado — "I grew up in a small town with my parents"
  // ● Composição familiar — "I have two siblings and a younger sister honestly"
  // ▲ Relação com familiar — "I'm really close to my mom these days"
  // ◀ Reuniões / eventos — "We get together for Christmas every year"
  // ★ Descrever a família — "My family is super loud and loving honestly"
  // ◆ Comparações — "I take after my dad more than my mom personally"
  // ════════════════════════════════════════════
  "family": {
    title: "family",
    sub: "Apresentar e descrever",
    desc: "Frases pra falar da sua família em inglês — apresentar parentes, contar de onde veio, descrever relações. Cada símbolo é uma situação típica. Combine itens das 4 colunas com o mesmo símbolo.",
    0: { replace:true, items:[
      {en:"This is",pt:"Esse(a) é",s:TRI},
      {en:"Meet",pt:"Conheça",s:TRI},
      {en:"Let me introduce",pt:"Deixa eu te apresentar",s:TRI},
      {en:"Here's",pt:"Aqui está",s:TRI},

      {en:"I grew up",pt:"Eu cresci",s:HRT},
      {en:"I was raised",pt:"Eu fui criado(a)",s:HRT},
      {en:"I was born",pt:"Eu nasci",s:HRT},
      {en:"I lived",pt:"Eu morei",s:HRT},

      {en:"I have",pt:"Eu tenho",s:DOT},
      {en:"I'm one of",pt:"Sou um(a) de",s:DOT},
      {en:"There are",pt:"Somos",s:DOT},
      {en:"My family includes",pt:"Minha família inclui",s:DOT},

      {en:"I'm really close to",pt:"Sou super próximo(a) de",s:UP},
      {en:"I get along well with",pt:"Me dou bem com",s:UP},
      {en:"I don't get along with",pt:"Não me dou bem com",s:UP},
      {en:"I'm not close to",pt:"Não sou próximo(a) de",s:UP},

      {en:"We get together",pt:"A gente se reúne",s:LFT},
      {en:"We celebrate",pt:"A gente celebra",s:LFT},
      {en:"We always meet up",pt:"A gente sempre se encontra",s:LFT},
      {en:"We have dinner",pt:"A gente janta",s:LFT},

      {en:"My family is",pt:"Minha família é",s:STAR},
      {en:"We're",pt:"Nós somos",s:STAR},
      {en:"My household is",pt:"Minha casa é",s:STAR},
      {en:"My parents are",pt:"Meus pais são",s:STAR},

      {en:"I take after",pt:"Eu puxei",s:DIA},
      {en:"I look like",pt:"Eu pareço",s:DIA},
      {en:"I'm just like",pt:"Sou igualzinho(a) a",s:DIA},
      {en:"I get my [trait] from",pt:"Eu peguei o(a) [traço] de",s:DIA},
    ]},
    1: { replace:true, items:[
      {en:"my brother",pt:"meu irmão",s:TRI},
      {en:"my sister",pt:"minha irmã",s:TRI},
      {en:"my mom",pt:"minha mãe",s:TRI},
      {en:"my cousin",pt:"meu(minha) primo(a)",s:TRI},

      {en:"in a small town",pt:"em uma cidade pequena",s:HRT},
      {en:"in a big city",pt:"em uma cidade grande",s:HRT},
      {en:"in São Paulo",pt:"em São Paulo",s:HRT},
      {en:"abroad",pt:"no exterior",s:HRT},

      {en:"two siblings",pt:"dois irmãos",s:DOT},
      {en:"one brother and one sister",pt:"um irmão e uma irmã",s:DOT},
      {en:"a big family",pt:"uma família grande",s:DOT},
      {en:"only one sister",pt:"só uma irmã",s:DOT},

      {en:"my mom",pt:"minha mãe",s:UP},
      {en:"my dad",pt:"meu pai",s:UP},
      {en:"my siblings",pt:"meus irmãos",s:UP},
      {en:"my grandparents",pt:"meus avós",s:UP},

      {en:"for Christmas",pt:"no Natal",s:LFT},
      {en:"for birthdays",pt:"em aniversários",s:LFT},
      {en:"on Sundays",pt:"aos domingos",s:LFT},
      {en:"for holidays",pt:"nos feriados",s:LFT},

      {en:"super loud",pt:"super barulhenta",s:STAR},
      {en:"really close",pt:"bem unida",s:STAR},
      {en:"a bit chaotic",pt:"meio caótica",s:STAR},
      {en:"pretty traditional",pt:"bem tradicional",s:STAR},

      {en:"my dad",pt:"meu pai",s:DIA},
      {en:"my mom",pt:"minha mãe",s:DIA},
      {en:"my grandfather",pt:"meu avô",s:DIA},
      {en:"my whole family",pt:"toda a família",s:DIA},
    ]},
    2: { replace:true, items:[
      {en:"who lives",pt:"que mora",s:TRI},
      {en:"who works",pt:"que trabalha",s:TRI},
      {en:"who studies",pt:"que estuda",s:TRI},
      {en:"who travels",pt:"que viaja",s:TRI},

      {en:"with my parents",pt:"com meus pais",s:HRT},
      {en:"by my grandparents",pt:"pelos meus avós",s:HRT},
      {en:"in a big house",pt:"em uma casa grande",s:HRT},
      {en:"with my single mom",pt:"com minha mãe solo",s:HRT},

      {en:"and a younger sister",pt:"e uma irmã mais nova",s:DOT},
      {en:"all older than me",pt:"todos mais velhos que eu",s:DOT},
      {en:"and a baby cousin",pt:"e um(a) primo(a) bebê",s:DOT},
      {en:"plus a stepbrother",pt:"mais um meio-irmão",s:DOT},

      {en:"these days",pt:"hoje em dia",s:UP},
      {en:"as adults",pt:"agora adultos",s:UP},
      {en:"despite the distance",pt:"apesar da distância",s:UP},
      {en:"more than ever",pt:"mais que nunca",s:UP},

      {en:"every year",pt:"todo ano",s:LFT},
      {en:"once a month",pt:"uma vez por mês",s:LFT},
      {en:"whenever possible",pt:"sempre que possível",s:LFT},
      {en:"without fail",pt:"sem falhar",s:LFT},

      {en:"and loving",pt:"e amorosa",s:STAR},
      {en:"and supportive",pt:"e apoiadora",s:STAR},
      {en:"and Italian",pt:"e italiana",s:STAR},
      {en:"and complicated",pt:"e complicada",s:STAR},

      {en:"more than my mom",pt:"mais que minha mãe",s:DIA},
      {en:"in many ways",pt:"de várias formas",s:DIA},
      {en:"physically",pt:"fisicamente",s:DIA},
      {en:"in personality",pt:"em personalidade",s:DIA},
    ]},
    3: { replace:true, items:[
      {en:"in São Paulo",pt:"em São Paulo",s:TRI},
      {en:"abroad",pt:"no exterior",s:TRI},
      {en:"with us",pt:"com a gente",s:TRI},
      {en:"nearby",pt:"perto",s:TRI},

      {en:"happy childhood",pt:"infância feliz",s:HRT},
      {en:"a tough situation",pt:"uma situação difícil",s:HRT},
      {en:"with lots of love",pt:"com muito amor",s:HRT},
      {en:"surrounded by family",pt:"cercado(a) pela família",s:HRT},

      {en:"honestly",pt:"sinceramente",s:DOT},
      {en:"believe it or not",pt:"acredite ou não",s:DOT},
      {en:"only",pt:"só",s:DOT},
      {en:"in total",pt:"no total",s:DOT},

      {en:"honestly",pt:"sinceramente",s:UP},
      {en:"unfortunately",pt:"infelizmente",s:UP},
      {en:"surprisingly",pt:"surpreendentemente",s:UP},
      {en:"thankfully",pt:"felizmente",s:UP},

      {en:"no matter what",pt:"não importa o que",s:LFT},
      {en:"as a tradition",pt:"como tradição",s:LFT},
      {en:"and it's lovely",pt:"e é lindo",s:LFT},
      {en:"and we all show up",pt:"e todos comparecem",s:LFT},

      {en:"honestly",pt:"sinceramente",s:STAR},
      {en:"in a good way",pt:"do bom jeito",s:STAR},
      {en:"to be fair",pt:"pra ser justo",s:STAR},
      {en:"by Brazilian standards",pt:"pra padrões brasileiros",s:STAR},

      {en:"personally",pt:"pessoalmente",s:DIA},
      {en:"according to everyone",pt:"segundo todo mundo",s:DIA},
      {en:"thankfully",pt:"felizmente",s:DIA},
      {en:"for better or worse",pt:"pra melhor ou pior",s:DIA},
    ]},
    examples: [
      {en:"This is my brother who lives in São Paulo",pt:"Esse é meu irmão que mora em São Paulo"},
      {en:"Meet my sister who works abroad",pt:"Conheça minha irmã que trabalha no exterior"},
      {en:"I grew up in a small town with my parents happy childhood",pt:"Eu cresci em uma cidade pequena com meus pais infância feliz"},
      {en:"I was raised in São Paulo by my grandparents with lots of love",pt:"Fui criado em São Paulo pelos meus avós com muito amor"},
      {en:"I have two siblings and a younger sister honestly",pt:"Tenho dois irmãos e uma irmã mais nova sinceramente"},
      {en:"My family includes a big family plus a stepbrother in total",pt:"Minha família inclui uma família grande mais um meio-irmão no total"},
      {en:"I'm really close to my mom these days honestly",pt:"Sou super próximo da minha mãe hoje em dia sinceramente"},
      {en:"I get along well with my siblings as adults thankfully",pt:"Me dou bem com meus irmãos agora adultos felizmente"},
      {en:"We get together for Christmas every year no matter what",pt:"A gente se reúne no Natal todo ano não importa o que"},
      {en:"We always meet up on Sundays whenever possible and it's lovely",pt:"A gente sempre se encontra aos domingos sempre que possível e é lindo"},
      {en:"My family is super loud and loving honestly",pt:"Minha família é super barulhenta e amorosa sinceramente"},
      {en:"We're really close and supportive in a good way",pt:"Nós somos bem unidos e apoiadores do bom jeito"},
      {en:"I take after my dad more than my mom personally",pt:"Eu puxei meu pai mais que minha mãe pessoalmente"},
      {en:"I look like my grandfather physically according to everyone",pt:"Eu pareço meu avô fisicamente segundo todo mundo"},
    ],
    phrasals: [
      {term:"This is / Meet [pessoa]",desc:"Pra apresentar familiar/amigo. 'This is' é casual; 'Meet [nome]' é mais informal e amigável. Sempre seguido de 'who [verbo]' adiciona contexto rapidinho.",ex:[
        {en:"This is my brother who lives in São Paulo",pt:"Esse é meu irmão que mora em São Paulo"},
        {en:"Meet my sister who works abroad",pt:"Conheça minha irmã que trabalha no exterior"}
      ]},
      {term:"I grew up / I was raised",desc:"Pra contar origem. 'I grew up' enfatiza o lugar/contexto; 'I was raised by' enfatiza quem te criou. Ambos passado simples (não present perfect).",ex:[
        {en:"I grew up in a small town with my parents",pt:"Eu cresci em uma cidade pequena com meus pais"},
        {en:"I was raised by my grandparents with lots of love",pt:"Fui criado pelos meus avós com muito amor"}
      ]},
      {term:"I have / I'm one of",desc:"Pra descrever quantos irmãos. 'I have two siblings' é o padrão. 'I'm one of three' = sou o terceiro de três. Não confunda 'siblings' (irmãos em geral) com 'brother/sister' (gênero específico).",ex:[
        {en:"I have two siblings and a younger sister",pt:"Tenho dois irmãos e uma irmã mais nova"},
        {en:"I'm one of three children",pt:"Sou um(a) de três filhos"}
      ]},
      {term:"I'm close to / I get along with",desc:"Pra descrever relação. 'Close to' = proximidade emocional. 'Get along with' = relação tranquila, sem brigas. Negativos: 'I'm not close to' / 'I don't get along with'.",ex:[
        {en:"I'm really close to my mom these days",pt:"Sou super próximo da minha mãe hoje em dia"},
        {en:"I get along well with my siblings as adults",pt:"Me dou bem com meus irmãos agora adultos"}
      ]},
      {term:"We get together / We celebrate",desc:"Pra falar de eventos familiares. 'Get together' é genérico (qualquer reunião); 'celebrate' é específico (datas comemorativas). Sempre seguido de 'for [evento]' ou 'on [dia]'.",ex:[
        {en:"We get together for Christmas every year",pt:"A gente se reúne no Natal todo ano"},
        {en:"We celebrate birthdays without fail",pt:"A gente celebra aniversários sem falhar"}
      ]},
      {term:"My family is / We're [adjetivo]",desc:"Pra descrever a família como um todo. Adjetivos comuns: 'loud', 'loving', 'close-knit', 'traditional', 'chaotic', 'supportive'. 'Family' é singular ('is', não 'are').",ex:[
        {en:"My family is super loud and loving",pt:"Minha família é super barulhenta e amorosa"},
        {en:"We're really close and supportive",pt:"Nós somos bem unidos e apoiadores"}
      ]},
      {term:"I take after / I look like",desc:"'Take after' = parecer (em personalidade ou hábitos); 'look like' = parecer fisicamente. 'I take after my dad' = sou como meu pai. Não confunda 'take after' com 'look after' (cuidar de).",ex:[
        {en:"I take after my dad more than my mom",pt:"Eu puxei meu pai mais que minha mãe"},
        {en:"I look like my grandfather physically",pt:"Eu pareço meu avô fisicamente"}
      ]},
    ]
  },

};

})();
