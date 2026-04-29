// Compatibility groups: cada item tem `s` (0–6) — campo interno que define
// quais itens nas 4 colunas combinam pra formar uma frase real. Itens com o
// mesmo `s` na sequência I→II→III→IIII viram uma frase válida. Esse campo
// não é exibido ao usuário; a UI só apaga as células que não combinam com
// a seleção atual. As constantes TRI/HRT/etc são apelidos legados (eram
// símbolos visuais ◣ ♥ ● ▲ ◀ ★ ◆) — preservadas pra evitar mexer em todo
// chapter override.
// Estrutura: { chapterId: { colIndex: { replace:true, items:[{en,pt,s},...] } } }

(function() {
  const TRI=0, HRT=1, DOT=2, UP=3, LFT=4, STAR=5, DIA=6;

  // ──────────────────────────────────────────────
  // FOOD — col-III modifiers (reused across openers)
  // ──────────────────────────────────────────────
  const STEAK_OPT = [
    {en:"well-done",pt:"bem passado"},
    {en:"medium",pt:"ao ponto"},
    {en:"rare",pt:"mal passado"},
    {en:"with mashed potatoes",pt:"com purê"},
    {en:"with sauce on the side",pt:"com molho à parte"},
    {en:"to go",pt:"pra viagem"},
    {en:"for here",pt:"pra comer aqui"},
  ];
  const PASTA_OPT = [
    {en:"with extra cheese",pt:"com queijo extra"},
    {en:"without sauce",pt:"sem molho"},
    {en:"with chicken",pt:"com frango"},
    {en:"to share",pt:"pra dividir"},
    {en:"to go",pt:"pra viagem"},
    {en:"for here",pt:"pra comer aqui"},
  ];
  const COFFEE_OPT = [
    {en:"with milk",pt:"com leite"},
    {en:"black",pt:"puro"},
    {en:"iced",pt:"gelado"},
    {en:"with no sugar",pt:"sem açúcar"},
    {en:"to go",pt:"pra viagem"},
    {en:"for here",pt:"pra tomar aqui"},
  ];
  const BEER_OPT = [
    {en:"cold",pt:"gelada"},
    {en:"on tap",pt:"de barril"},
    {en:"by the bottle",pt:"em garrafa"},
    {en:"in a pint glass",pt:"no copo grande"},
    {en:"please",pt:"por favor"},
  ];
  const SALAD_OPT = [
    {en:"with dressing on the side",pt:"com molho à parte"},
    {en:"without onions",pt:"sem cebola"},
    {en:"with chicken",pt:"com frango"},
    {en:"to share",pt:"pra dividir"},
    {en:"please",pt:"por favor"},
  ];
  const WINE_OPT = [
    {en:"red",pt:"tinto"},
    {en:"white",pt:"branco"},
    {en:"by the glass",pt:"em taça"},
    {en:"by the bottle",pt:"em garrafa"},
    {en:"please",pt:"por favor"},
  ];
  const CHICKEN_OPT = [
    {en:"grilled",pt:"grelhado"},
    {en:"breaded",pt:"empanado"},
    {en:"with rice",pt:"com arroz"},
    {en:"with fries",pt:"com batatas fritas"},
    {en:"to go",pt:"pra viagem"},
    {en:"please",pt:"por favor"},
  ];
  const SOUP_OPT = [
    {en:"hot",pt:"bem quente"},
    {en:"with bread",pt:"com pão"},
    {en:"to share",pt:"pra dividir"},
    {en:"to go",pt:"pra viagem"},
    {en:"please",pt:"por favor"},
  ];
  const SANDWICH_OPT = [
    {en:"toasted",pt:"tostado"},
    {en:"with extra cheese",pt:"com queijo extra"},
    {en:"with no mayo",pt:"sem maionese"},
    {en:"to go",pt:"pra viagem"},
    {en:"please",pt:"por favor"},
  ];
  const FRIES_OPT = [
    {en:"with ketchup",pt:"com ketchup"},
    {en:"large",pt:"grande"},
    {en:"with extra salt",pt:"com sal extra"},
    {en:"to share",pt:"pra dividir"},
    {en:"please",pt:"por favor"},
  ];
  const APPETIZER_OPT = [
    {en:"for the table",pt:"pra mesa"},
    {en:"to share",pt:"pra dividir"},
    {en:"with bread",pt:"com pão"},
    {en:"please",pt:"por favor"},
  ];
  const WATER_OPT = [
    {en:"still",pt:"sem gás"},
    {en:"sparkling",pt:"com gás"},
    {en:"with ice",pt:"com gelo"},
    {en:"with no ice",pt:"sem gelo"},
    {en:"please",pt:"por favor"},
  ];
  const SNACK_OPT = [
    {en:"quick",pt:"rapidinho"},
    {en:"to go",pt:"pra viagem"},
    {en:"please",pt:"por favor"},
  ];

  // Col-II items (dish/drink) — each pairs a noun with its modifier list
  const STEAK     = {en:"the steak",      pt:"o bife",          colIII: STEAK_OPT};
  const PASTA     = {en:"the pasta",      pt:"a massa",         colIII: PASTA_OPT};
  const CHICKEN   = {en:"the chicken",    pt:"o frango",        colIII: CHICKEN_OPT};
  const SALAD     = {en:"the salad",      pt:"a salada",        colIII: SALAD_OPT};
  const COFFEE    = {en:"a coffee",       pt:"um café",         colIII: COFFEE_OPT};
  const BEER      = {en:"a beer",         pt:"uma cerveja",     colIII: BEER_OPT};
  const WINE      = {en:"a glass of wine",pt:"uma taça de vinho",colIII: WINE_OPT};
  const SOUP      = {en:"the soup",       pt:"a sopa",          colIII: SOUP_OPT};
  const SANDWICH  = {en:"a sandwich",     pt:"um sanduíche",    colIII: SANDWICH_OPT};
  const FRIES     = {en:"fries",          pt:"batatas fritas",  colIII: FRIES_OPT};
  const APPETIZER = {en:"an appetizer",   pt:"uma entrada",     colIII: APPETIZER_OPT};
  const WATER     = {en:"a water",        pt:"uma água",        colIII: WATER_OPT};
  const SNACK     = {en:"a snack",        pt:"um lanche",       colIII: SNACK_OPT};

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
  // MONEY — Pedir transação financeira (single-frame)
  // Frame: [request opener] + [transaction verb] + [method/spec]
  // Example: "I'd like to pay by credit card"
  // ════════════════════════════════════════════
  "money": {
    title: "money",
    sub: "Banco, cartão & contas",
    desc: "Pra resolver questões de banco e dinheiro em inglês — abrir conta, pagar, transferir, contestar cobrança. Cada opener abre uma cena de banco diferente.",
    tree: [
      // Ação bancária
      { en:"I need to", pt:"Preciso", colII:[
        { en:"open an account", pt:"abrir uma conta", colIII:[
          {en:"this week",pt:"essa semana"},
          {en:"a checking account",pt:"corrente"},
          {en:"a savings account",pt:"poupança"},
          {en:"for my business",pt:"pra meu negócio"},
        ]},
        { en:"withdraw cash", pt:"sacar", colIII:[
          {en:"500 dollars",pt:"500 dólares"},
          {en:"from my checking account",pt:"da conta corrente"},
          {en:"today",pt:"hoje"},
          {en:"in 20s",pt:"em notas de 20"},
        ]},
        { en:"deposit a check", pt:"depositar um cheque", colIII:[
          {en:"in my account",pt:"na minha conta"},
          {en:"for 1,000 dollars",pt:"de 1.000 dólares"},
          {en:"today",pt:"hoje"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"wire money", pt:"fazer uma transferência", colIII:[
          {en:"abroad",pt:"pro exterior"},
          {en:"to Brazil",pt:"pro Brasil"},
          {en:"by Friday",pt:"até sexta"},
          {en:"urgently",pt:"urgente"},
        ]},
        { en:"cancel my card", pt:"cancelar meu cartão", colIII:[
          {en:"right now",pt:"agora mesmo"},
          {en:"I lost it",pt:"perdi"},
          {en:"and get a new one",pt:"e pegar um novo"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Operação online / app
      { en:"I'd like to", pt:"Quero", colII:[
        { en:"transfer money", pt:"transferir dinheiro", colIII:[
          {en:"from savings to checking",pt:"da poupança pra corrente"},
          {en:"500 reais",pt:"500 reais"},
          {en:"to another bank",pt:"pra outro banco"},
          {en:"right now",pt:"agora"},
        ]},
        { en:"pay a bill", pt:"pagar uma conta", colIII:[
          {en:"online",pt:"online"},
          {en:"with my card",pt:"no cartão"},
          {en:"by Friday",pt:"até sexta"},
          {en:"in installments",pt:"parcelado"},
        ]},
        { en:"dispute a charge", pt:"contestar uma cobrança", colIII:[
          {en:"on my statement",pt:"na fatura"},
          {en:"for 200 reais",pt:"de 200 reais"},
          {en:"that I don't recognize",pt:"que não reconheço"},
          {en:"as fraud",pt:"como fraude"},
        ]},
        { en:"close my account", pt:"encerrar minha conta", colIII:[
          {en:"by the end of the month",pt:"até o fim do mês"},
          {en:"and transfer my balance",pt:"e transferir o saldo"},
          {en:"because I'm moving",pt:"porque vou mudar"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Bloqueio / problema
      { en:"I can't", pt:"Não consigo", colII:[
        { en:"log in to my account", pt:"entrar na conta", colIII:[
          {en:"online",pt:"online"},
          {en:"on the app",pt:"no app"},
          {en:"with my password",pt:"com minha senha"},
          {en:"can you reset it?",pt:"pode resetar?"},
        ]},
        { en:"make this payment", pt:"fazer este pagamento", colIII:[
          {en:"my card got declined",pt:"meu cartão foi recusado"},
          {en:"there's an error",pt:"deu erro"},
          {en:"can you help?",pt:"pode ajudar?"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"withdraw", pt:"sacar", colIII:[
          {en:"from this ATM",pt:"deste caixa"},
          {en:"with my card",pt:"com meu cartão"},
          {en:"what's the daily limit?",pt:"qual o limite diário?"},
          {en:"any amount",pt:"nenhum valor"},
        ]},
        { en:"use my card", pt:"usar meu cartão", colIII:[
          {en:"abroad",pt:"no exterior"},
          {en:"online",pt:"online"},
          {en:"can you unlock it?",pt:"pode desbloquear?"},
          {en:"it keeps getting declined",pt:"fica sendo recusado"},
        ]},
      ]},

      // Perda
      { en:"I lost", pt:"Perdi", colII:[
        { en:"my card", pt:"meu cartão", colIII:[
          {en:"yesterday",pt:"ontem"},
          {en:"and I need a replacement",pt:"e preciso de outro"},
          {en:"please block it",pt:"por favor bloqueia"},
          {en:"can you send a new one?",pt:"pode mandar um novo?"},
        ]},
        { en:"my checkbook", pt:"meu talão de cheques", colIII:[
          {en:"and I need a new one",pt:"e preciso de outro"},
          {en:"can you cancel the checks?",pt:"pode cancelar os cheques?"},
          {en:"last week",pt:"semana passada"},
        ]},
        { en:"my phone with the app", pt:"meu celular com o app", colIII:[
          {en:"and I can't access my account",pt:"e não acesso a conta"},
          {en:"please block remote access",pt:"por favor bloqueia o acesso"},
          {en:"how do I recover it?",pt:"como recupero?"},
        ]},
      ]},

      // Cobrança suspeita
      { en:"There's a charge", pt:"Tem uma cobrança", colII:[
        { en:"I don't recognize", pt:"que não reconheço", colIII:[
          {en:"on my statement",pt:"na fatura"},
          {en:"from a place I never went",pt:"de um lugar que nunca fui"},
          {en:"can you investigate?",pt:"podem investigar?"},
          {en:"please reverse it",pt:"por favor estorna"},
        ]},
        { en:"for 200 reais", pt:"de 200 reais", colIII:[
          {en:"I didn't authorize",pt:"que não autorizei"},
          {en:"that's repeating",pt:"que tá se repetindo"},
          {en:"and I want it removed",pt:"e quero que remova"},
          {en:"can you explain?",pt:"podem explicar?"},
        ]},
        { en:"on my statement", pt:"na minha fatura", colIII:[
          {en:"I want to dispute",pt:"que quero contestar"},
          {en:"that doesn't make sense",pt:"que não faz sentido"},
          {en:"from last month",pt:"do mês passado"},
          {en:"please review it",pt:"por favor revisa"},
        ]},
      ]},

      // Configurar
      { en:"I want to set up", pt:"Quero configurar", colII:[
        { en:"a transfer", pt:"uma transferência", colIII:[
          {en:"every month",pt:"todo mês"},
          {en:"to my savings account",pt:"pra minha poupança"},
          {en:"of 500 reais",pt:"de 500 reais"},
          {en:"on the 5th",pt:"todo dia 5"},
        ]},
        { en:"direct deposit", pt:"depósito direto", colIII:[
          {en:"for my paycheck",pt:"do meu salário"},
          {en:"into checking",pt:"na conta corrente"},
          {en:"starting next month",pt:"a partir do próximo mês"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"autopay", pt:"débito automático", colIII:[
          {en:"for rent",pt:"pro aluguel"},
          {en:"for my bills",pt:"pras contas"},
          {en:"every month",pt:"todo mês"},
          {en:"on the due date",pt:"no vencimento"},
        ]},
        { en:"a savings goal", pt:"uma meta de poupança", colIII:[
          {en:"of 10,000 reais",pt:"de 10.000 reais"},
          {en:"by the end of the year",pt:"até o fim do ano"},
          {en:"for a trip",pt:"pra uma viagem"},
          {en:"in the app",pt:"no app"},
        ]},
      ]},

      // Tutorial / dúvida
      { en:"How do I", pt:"Como faço pra", colII:[
        { en:"check my balance", pt:"ver meu saldo", colIII:[
          {en:"on the app",pt:"no app"},
          {en:"online",pt:"online"},
          {en:"at this ATM",pt:"neste caixa"},
          {en:"by phone",pt:"por telefone"},
        ]},
        { en:"send money abroad", pt:"mandar dinheiro pro exterior", colIII:[
          {en:"to Brazil",pt:"pro Brasil"},
          {en:"the cheapest way",pt:"do jeito mais barato"},
          {en:"using this app",pt:"usando este app"},
          {en:"in dollars",pt:"em dólar"},
        ]},
        { en:"get a new card", pt:"pegar um cartão novo", colIII:[
          {en:"after I lost mine",pt:"depois que perdi o meu"},
          {en:"with a different limit",pt:"com outro limite"},
          {en:"in the mail",pt:"pelos correios"},
          {en:"by tomorrow",pt:"até amanhã"},
        ]},
        { en:"dispute a charge", pt:"contestar uma cobrança", colIII:[
          {en:"online",pt:"online"},
          {en:"over the phone",pt:"por telefone"},
          {en:"if I don't recognize it",pt:"se eu não reconheço"},
          {en:"in the app",pt:"no app"},
        ]},
      ]},
    ],
    examples: [
      {en:"I need to open an account this week",pt:"Preciso abrir uma conta essa semana"},
      {en:"I'd like to transfer money from savings to checking",pt:"Quero transferir da poupança pra corrente"},
      {en:"I can't log in to my account on the app",pt:"Não consigo entrar na conta pelo app"},
      {en:"I lost my card and I need a replacement",pt:"Perdi meu cartão e preciso de outro"},
      {en:"There's a charge for 200 reais I didn't authorize",pt:"Tem uma cobrança de 200 reais que não autorizei"},
      {en:"I want to set up autopay for rent",pt:"Quero configurar débito automático pro aluguel"},
      {en:"How do I send money abroad to Brazil",pt:"Como faço pra mandar dinheiro pro Brasil"},
      {en:"I need to wire money to Brazil urgently",pt:"Preciso fazer uma transferência pro Brasil urgente"},
      {en:"I'd like to dispute a charge on my statement",pt:"Quero contestar uma cobrança na fatura"},
    ],
    phrasals: [
      {term:"I need to / I'd like to / I want to",desc:"Os três openers de banco. 'I need to' = urgência. 'I'd like to' = formal e educado (banco gosta). 'I want to' = direto. Cada um abre cenários levemente diferentes na col II.",ex:[
        {en:"I need to open an account this week",pt:"Preciso abrir uma conta essa semana"},
        {en:"I'd like to dispute a charge on my statement",pt:"Quero contestar uma cobrança na fatura"}
      ]},
      {term:"open an account / close my account",desc:"Pra abrir/fechar conta. 'Open AN account' (com 'an'). Tipos: 'a checking account' (conta corrente) e 'a savings account' (poupança). Pra fechar: SEMPRE 'close MY account' (com possessivo).",ex:[
        {en:"I need to open a checking account",pt:"Preciso abrir uma conta corrente"},
        {en:"I'd like to close my account by the end of the month",pt:"Quero encerrar minha conta até o fim do mês"}
      ]},
      {term:"withdraw / deposit",desc:"'Withdraw' = sacar (tirar). 'Deposit' = depositar (colocar). Withdraw cash AT an ATM (no caixa). Deposit a check (cheque). Withdraw FROM my account (de onde está saindo).",ex:[
        {en:"I need to withdraw 500 dollars",pt:"Preciso sacar 500 dólares"},
        {en:"I need to deposit a check for 1,000 dollars",pt:"Preciso depositar um cheque de 1.000 dólares"}
      ]},
      {term:"transfer / wire",desc:"'Transfer' = transferência interna (entre suas contas) ou nacional. 'Wire' = transferência internacional (mais formal e cara). 'Wire money abroad' é o termo padrão pra mandar pro exterior.",ex:[
        {en:"I'd like to transfer money from savings to checking",pt:"Quero transferir da poupança pra corrente"},
        {en:"I need to wire money to Brazil urgently",pt:"Preciso transferir pro Brasil urgente"}
      ]},
      {term:"dispute a charge",desc:"Pra contestar cobrança suspeita. SEMPRE 'dispute A charge' (com 'a'). 'On my statement' = na fatura. 'I don't recognize' = não reconheço. Bancos americanos respondem rápido a 'dispute'.",ex:[
        {en:"I'd like to dispute a charge for 200 reais",pt:"Quero contestar uma cobrança de 200 reais"},
        {en:"There's a charge I don't recognize on my statement",pt:"Tem uma cobrança que não reconheço na fatura"}
      ]},
      {term:"set up autopay / direct deposit",desc:"Termos do dia a dia. 'Autopay' = débito automático. 'Direct deposit' = depósito direto do salário. SEMPRE 'set up' (verbo separável). 'For [item]' especifica o quê.",ex:[
        {en:"I want to set up autopay for rent",pt:"Quero configurar débito automático pro aluguel"},
        {en:"I want to set up direct deposit for my paycheck",pt:"Quero configurar depósito direto do salário"}
      ]},
      {term:"How do I",desc:"Pra perguntar processo bancário. 'How do I check my balance' (ver saldo) / 'send money abroad' (mandar pro exterior) / 'get a new card' (pegar cartão novo). Sempre verbo no infinitivo SEM 'to' depois de 'I'.",ex:[
        {en:"How do I check my balance on the app",pt:"Como vejo o saldo no app"},
        {en:"How do I get a new card",pt:"Como pego um cartão novo"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // HEALTH — Sintomas (single-frame)
  // Frame: [symptom verb] + [a + symptom] + [duration/context]
  // Example: "I have a headache since yesterday"
  // ════════════════════════════════════════════
  "health": {
    title: "health",
    sub: "Sintomas & médico",
    desc: "Frases pra descrever sintomas em qualquer consulta médica em inglês. Toque em qualquer item da coluna I e qualquer combinação forma uma frase real.",
    0: { replace:true, items:[
      {en:"I have",pt:"Eu tenho",s:TRI},
      {en:"I've got",pt:"Eu peguei",s:TRI},
      {en:"I'm dealing with",pt:"Estou lidando com",s:TRI},
      {en:"I think I have",pt:"Acho que tenho",s:TRI},
      {en:"I keep getting",pt:"Continuo tendo",s:TRI},
      {en:"I've been having",pt:"Venho tendo",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"a headache",pt:"dor de cabeça",s:TRI},
      {en:"a fever",pt:"febre",s:TRI},
      {en:"a sore throat",pt:"dor de garganta",s:TRI},
      {en:"a bad cough",pt:"uma tosse forte",s:TRI},
      {en:"a stomachache",pt:"dor de estômago",s:TRI},
      {en:"a runny nose",pt:"nariz escorrendo",s:TRI},
      {en:"a cold",pt:"um resfriado",s:TRI},
      {en:"a mild flu",pt:"uma gripe leve",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"since yesterday",pt:"desde ontem",s:TRI},
      {en:"for a few days",pt:"há alguns dias",s:TRI},
      {en:"and I'm worried",pt:"e estou preocupado(a)",s:TRI},
      {en:"that won't go away",pt:"que não passa",s:TRI},
      {en:"mostly at night",pt:"mais à noite",s:TRI},
      {en:"on and off",pt:"que vai e vem",s:TRI},
      {en:"really bad",pt:"bem ruim",s:TRI},
      {en:"honestly",pt:"sinceramente",s:TRI},
      {en:"lately",pt:"ultimamente",s:TRI},
    ]},
    examples: [
      {en:"I have a headache since yesterday",pt:"Eu tenho dor de cabeça desde ontem"},
      {en:"I've got a fever for a few days",pt:"Peguei febre há alguns dias"},
      {en:"I'm dealing with a bad cough that won't go away",pt:"Estou lidando com uma tosse forte que não passa"},
      {en:"I think I have a cold and I'm worried",pt:"Acho que tenho um resfriado e estou preocupado"},
      {en:"I keep getting a stomachache mostly at night",pt:"Continuo tendo dor de estômago mais à noite"},
      {en:"I've been having a runny nose on and off",pt:"Venho tendo nariz escorrendo que vai e vem"},
      {en:"I have a sore throat really bad",pt:"Eu tenho dor de garganta bem ruim"},
      {en:"I've got a mild flu honestly",pt:"Peguei uma gripe leve sinceramente"},
      {en:"I'm dealing with a fever lately",pt:"Estou lidando com febre ultimamente"},
    ],
    phrasals: [
      {term:"I have / I've got",desc:"Pra descrever sintomas. 'I have' é americano e formal; 'I've got' é britânico e casual — os dois funcionam em qualquer país. SEMPRE seguido de 'a/an' + sintoma. Erro clássico: 'I have headache' (sem 'a') está errado.",ex:[
        {en:"I have a headache since yesterday",pt:"Eu tenho dor de cabeça desde ontem"},
        {en:"I've got a fever for a few days",pt:"Peguei febre há alguns dias"}
      ]},
      {term:"I'm dealing with",desc:"Forma mais reflexiva: 'tô lidando com'. Sugere que você já tá tentando resolver o problema. Bom pra sintomas que persistem (tosse, gripe, dor crônica).",ex:[
        {en:"I'm dealing with a bad cough that won't go away",pt:"Estou lidando com uma tosse forte que não passa"},
        {en:"I'm dealing with a fever lately",pt:"Estou lidando com febre ultimamente"}
      ]},
      {term:"I think I have",desc:"Pra suspeita (não tem certeza ainda). Soa humilde, deixa o médico avaliar. Bom abridor de consulta. Sempre seguido de 'a/an' + sintoma.",ex:[
        {en:"I think I have a cold and I'm worried",pt:"Acho que tenho um resfriado e estou preocupado"},
        {en:"I think I have a sore throat lately",pt:"Acho que tenho dor de garganta ultimamente"}
      ]},
      {term:"I keep getting",desc:"Pra sintomas recorrentes. 'I keep getting headaches' = continuo tendo dores de cabeça (acontece várias vezes). Diferente de 'I have a headache' (uma única ocorrência).",ex:[
        {en:"I keep getting a stomachache mostly at night",pt:"Continuo tendo dor de estômago mais à noite"},
        {en:"I keep getting a runny nose on and off",pt:"Continuo tendo nariz escorrendo que vai e vem"}
      ]},
      {term:"I've been having",desc:"Present perfect continuous: enfatiza que o sintoma vem ocorrendo ao longo do tempo. 'I've been having headaches for a week' = venho tendo dores há uma semana. Mais grave que 'I have'.",ex:[
        {en:"I've been having a runny nose for a few days",pt:"Venho tendo nariz escorrendo há alguns dias"},
        {en:"I've been having a bad cough lately",pt:"Venho tendo uma tosse forte ultimamente"}
      ]},
      {term:"since yesterday / for a few days",desc:"Marcadores de duração — críticos pra médico entender quanto tempo o sintoma existe. 'Since [marco]' = desde quando começou. 'For [tempo]' = quanto tempo passou. Não confunda os dois.",ex:[
        {en:"I have a headache since yesterday",pt:"Tenho dor de cabeça desde ontem"},
        {en:"I've been having a fever for a few days",pt:"Venho tendo febre há alguns dias"}
      ]},
      {term:"that won't go away / mostly at night",desc:"Detalhes do sintoma. 'That won't go away' = que não passa (persistente). 'Mostly at night' = principalmente à noite (padrão). 'On and off' = vai e vem. 'Really bad' = bem ruim (intensidade). Estes detalhes ajudam o médico diagnosticar.",ex:[
        {en:"I'm dealing with a bad cough that won't go away",pt:"Estou lidando com uma tosse forte que não passa"},
        {en:"I keep getting a stomachache mostly at night",pt:"Continuo tendo dor de estômago mais à noite"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // WORK — Falar do cargo (single-frame)
  // Frame: [job verb] + [role] + [context]
  // Example: "I work as a manager at a startup"
  // ════════════════════════════════════════════
  "working": {
    title: "work",
    sub: "Cargo & networking",
    desc: "Frases pra falar do seu cargo em inglês — entrevistas, networking, LinkedIn. Toque em qualquer item da coluna I e qualquer combinação forma uma frase real.",
    0: { replace:true, items:[
      {en:"I work as",pt:"Trabalho como",s:TRI},
      {en:"I'm employed as",pt:"Sou empregado(a) como",s:TRI},
      {en:"I serve as",pt:"Atuo como",s:TRI},
      {en:"I used to work as",pt:"Eu trabalhava como",s:TRI},
      {en:"I'm now",pt:"Agora sou",s:TRI},
      {en:"I'm currently",pt:"Atualmente sou",s:TRI},
      {en:"I just started as",pt:"Acabei de começar como",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"a manager",pt:"gerente",s:TRI},
      {en:"an analyst",pt:"analista",s:TRI},
      {en:"a designer",pt:"designer",s:TRI},
      {en:"a developer",pt:"dev",s:TRI},
      {en:"a director",pt:"diretor(a)",s:TRI},
      {en:"a consultant",pt:"consultor(a)",s:TRI},
      {en:"a project lead",pt:"líder de projeto",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"at a startup",pt:"em uma startup",s:TRI},
      {en:"at a multinational",pt:"em uma multinacional",s:TRI},
      {en:"in marketing",pt:"em marketing",s:TRI},
      {en:"in tech",pt:"em tech",s:TRI},
      {en:"remotely",pt:"remotamente",s:TRI},
      {en:"in São Paulo",pt:"em São Paulo",s:TRI},
      {en:"for a small agency",pt:"em uma agência pequena",s:TRI},
      {en:"part-time",pt:"meio período",s:TRI},
    ]},
    examples: [
      {en:"I work as a manager at a startup",pt:"Trabalho como gerente em uma startup"},
      {en:"I'm employed as an analyst in marketing",pt:"Sou empregado como analista em marketing"},
      {en:"I serve as a designer in tech",pt:"Atuo como designer em tech"},
      {en:"I used to work as a developer in São Paulo",pt:"Eu trabalhava como dev em São Paulo"},
      {en:"I'm now a director at a multinational",pt:"Agora sou diretor em uma multinacional"},
      {en:"I'm currently a consultant remotely",pt:"Atualmente sou consultor remotamente"},
      {en:"I just started as a project lead for a small agency",pt:"Acabei de começar como líder de projeto em uma agência pequena"},
      {en:"I work as a designer part-time",pt:"Trabalho como designer meio período"},
      {en:"I'm employed as a developer in tech",pt:"Sou empregado como dev em tech"},
    ],
    phrasals: [
      {term:"I work as / I'm employed as",desc:"As duas formas mais usadas pra dizer seu cargo. 'I work as' é o mais comum em conversa; 'I'm employed as' é mais formal (CV, LinkedIn). SEMPRE 'as A/AN' antes do cargo. Erro clássico do brasileiro: 'I work like a manager' (errado, sempre 'as').",ex:[
        {en:"I work as a manager at a startup",pt:"Trabalho como gerente em uma startup"},
        {en:"I'm employed as an analyst in marketing",pt:"Sou empregado como analista em marketing"}
      ]},
      {term:"I serve as",desc:"Forma mais formal e elegante. Comum em descrições de função em conselhos, comitês, ou cargos sêniores. 'I serve as a director on the board' soa muito profissional. Mesmo padrão: 'as A/AN'.",ex:[
        {en:"I serve as a designer in tech",pt:"Atuo como designer em tech"},
        {en:"I serve as a consultant for a small agency",pt:"Atuo como consultor em uma agência pequena"}
      ]},
      {term:"I used to work as",desc:"Pra falar de cargo passado. 'Used to' é a estrutura clássica pra hábito/situação no passado que mudou. SEMPRE 'used to + verbo no infinitivo' (sem -ed). 'I used to worked' está errado.",ex:[
        {en:"I used to work as a developer in São Paulo",pt:"Eu trabalhava como dev em São Paulo"},
        {en:"I used to work as an analyst at a multinational",pt:"Eu trabalhava como analista em uma multinacional"}
      ]},
      {term:"I'm now / I'm currently",desc:"Pra cargo atual com ênfase. 'I'm now [cargo]' = mudou recentemente. 'I'm currently [cargo]' = situação presente, mais formal. Os dois funcionam direto com substantivo (sem 'as a/an').",ex:[
        {en:"I'm now a director at a multinational",pt:"Agora sou diretor em uma multinacional"},
        {en:"I'm currently a consultant remotely",pt:"Atualmente sou consultor remotamente"}
      ]},
      {term:"I just started as",desc:"Pra novo emprego (semanas/meses). 'I just started' = comecei há pouco. SEMPRE 'as A/AN' como em 'work as'. Bom pra primeiro dia, networking inicial.",ex:[
        {en:"I just started as a project lead",pt:"Acabei de começar como líder de projeto"},
        {en:"I just started as a manager at a startup",pt:"Acabei de começar como gerente em uma startup"}
      ]},
      {term:"at a startup / at a multinational",desc:"Pra falar do tipo de empresa. 'AT a [empresa]' (sempre 'at'). Tipos: startup, multinational (multinacional), small agency (agência pequena), tech company (empresa de tech). NÃO 'in a startup' que é raro.",ex:[
        {en:"I work as a manager at a startup",pt:"Trabalho como gerente em uma startup"},
        {en:"I'm now a director at a multinational",pt:"Agora sou diretor em uma multinacional"}
      ]},
      {term:"in marketing / in tech / remotely",desc:"Pra área ou modalidade. 'IN [área]' (in marketing, in tech, in finance). 'Remotely' = remoto (sem preposição). 'Part-time' = meio período. 'Full-time' = integral. Todos funcionam no fim da frase.",ex:[
        {en:"I'm employed as an analyst in marketing",pt:"Sou empregado como analista em marketing"},
        {en:"I'm currently a consultant remotely",pt:"Atualmente sou consultor remotamente"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // EDUCATION — Falar dos estudos (single-frame)
  // Frame: [study verb] + [subject/area] + [context]
  // Example: "I'm studying business at FGV"
  // ════════════════════════════════════════════
  "education": {
    title: "education",
    sub: "Estudos & cursos",
    desc: "Frases pra falar dos seus estudos em inglês — área, instituição, modalidade. Toque em qualquer item da coluna I e qualquer combinação forma uma frase real.",
    0: { replace:true, items:[
      {en:"I'm studying",pt:"Estou estudando",s:TRI},
      {en:"I'm learning",pt:"Estou aprendendo",s:TRI},
      {en:"I'm taking a course on",pt:"Estou fazendo um curso de",s:TRI},
      {en:"I'm interested in",pt:"Tenho interesse em",s:TRI},
      {en:"I'm focused on",pt:"Estou focado(a) em",s:TRI},
      {en:"I'm reading about",pt:"Estou lendo sobre",s:TRI},
      {en:"I'm working on",pt:"Estou trabalhando em",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"business",pt:"administração",s:TRI},
      {en:"computer science",pt:"ciência da computação",s:TRI},
      {en:"law",pt:"direito",s:TRI},
      {en:"engineering",pt:"engenharia",s:TRI},
      {en:"design",pt:"design",s:TRI},
      {en:"English",pt:"inglês",s:TRI},
      {en:"marketing",pt:"marketing",s:TRI},
      {en:"psychology",pt:"psicologia",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"at FGV",pt:"na FGV",s:TRI},
      {en:"online",pt:"online",s:TRI},
      {en:"on YouTube",pt:"no YouTube",s:TRI},
      {en:"for fun",pt:"por diversão",s:TRI},
      {en:"for my career",pt:"pra minha carreira",s:TRI},
      {en:"lately",pt:"ultimamente",s:TRI},
      {en:"since last year",pt:"desde o ano passado",s:TRI},
      {en:"part-time",pt:"meio período",s:TRI},
      {en:"full-time",pt:"integral",s:TRI},
    ]},
    examples: [
      {en:"I'm studying business at FGV",pt:"Estou estudando administração na FGV"},
      {en:"I'm learning computer science online",pt:"Estou aprendendo ciência da computação online"},
      {en:"I'm taking a course on law on YouTube",pt:"Estou fazendo um curso de direito no YouTube"},
      {en:"I'm interested in engineering for my career",pt:"Tenho interesse em engenharia pra minha carreira"},
      {en:"I'm focused on design lately",pt:"Estou focado em design ultimamente"},
      {en:"I'm reading about psychology for fun",pt:"Estou lendo sobre psicologia por diversão"},
      {en:"I'm working on marketing since last year",pt:"Estou trabalhando em marketing desde o ano passado"},
      {en:"I'm studying English part-time",pt:"Estou estudando inglês meio período"},
      {en:"I'm interested in psychology lately",pt:"Tenho interesse em psicologia ultimamente"},
    ],
    phrasals: [
      {term:"I'm studying / I'm learning",desc:"'I'm studying' = formal, geralmente faculdade ou curso oficial. 'I'm learning' = mais geral, inclui auto-estudo. 'I'm taking a course on' especifica que é um curso. Não use 'I do English' (errado) — sempre 'study/learn English'.",ex:[
        {en:"I'm studying business at FGV",pt:"Estou estudando administração na FGV"},
        {en:"I'm learning computer science online",pt:"Estou aprendendo ciência da computação online"}
      ]},
      {term:"I'm taking a course on",desc:"Estrutura específica pra cursos individuais (não graduação completa). SEMPRE 'a course ON [assunto]' (com preposição 'on'). Erro clássico: 'a course OF business' (errado, sempre 'on').",ex:[
        {en:"I'm taking a course on law on YouTube",pt:"Estou fazendo um curso de direito no YouTube"},
        {en:"I'm taking a course on marketing online",pt:"Estou fazendo um curso de marketing online"}
      ]},
      {term:"I'm interested in / I'm focused on",desc:"'Interested IN' (sempre 'in') = tenho interesse. 'Focused ON' (sempre 'on') = focado em. Os dois funcionam pra falar de área de estudo. 'In' é mais geral; 'on' é mais ativo, com dedicação.",ex:[
        {en:"I'm interested in engineering for my career",pt:"Tenho interesse em engenharia pra minha carreira"},
        {en:"I'm focused on design lately",pt:"Estou focado em design ultimamente"}
      ]},
      {term:"I'm reading about / I'm working on",desc:"'Reading about [tema]' = lendo sobre (auto-estudo informal). 'Working on [tema]' = trabalhando em (estudo ativo, projeto). Os dois são bons pra mostrar interesse autodidata.",ex:[
        {en:"I'm reading about psychology for fun",pt:"Estou lendo sobre psicologia por diversão"},
        {en:"I'm working on marketing since last year",pt:"Estou trabalhando em marketing desde o ano passado"}
      ]},
      {term:"at FGV / online / on YouTube",desc:"Como falar onde estuda. 'AT [instituição]' (sempre 'at' pra escola/faculdade). 'Online' não precisa preposição. 'On YouTube' (sempre 'on' pra plataforma de vídeo). Erro comum: 'in FGV' (errado, sempre 'at').",ex:[
        {en:"I'm studying business at FGV",pt:"Estou estudando administração na FGV"},
        {en:"I'm learning English on YouTube",pt:"Estou aprendendo inglês no YouTube"}
      ]},
      {term:"for fun / for my career",desc:"Motivações comuns. 'For fun' = por diversão (hobby). 'For my career' = pra carreira (profissional). 'For my own learning' = pra meu aprendizado (autodidata). 'For school' = pra escola.",ex:[
        {en:"I'm reading about psychology for fun",pt:"Estou lendo sobre psicologia por diversão"},
        {en:"I'm interested in engineering for my career",pt:"Tenho interesse em engenharia pra minha carreira"}
      ]},
      {term:"part-time / full-time / since last year",desc:"Modalidade de estudo. 'Part-time' = meio período. 'Full-time' = integral. 'Online' = à distância. 'Since [marco]' = desde quando começou ('since last year'). 'Lately' = recentemente. Sempre no fim da frase.",ex:[
        {en:"I'm studying English part-time",pt:"Estou estudando inglês meio período"},
        {en:"I'm working on marketing since last year",pt:"Estou trabalhando em marketing desde o ano passado"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // DRIVING — Pedir serviço relacionado ao carro (single-frame)
  // Frame: [request opener] + [car action] + [specification]
  // Example: "I'd like to rent a car for the weekend"
  // ════════════════════════════════════════════
  "driving": {
    title: "driving",
    sub: "Aluguel & serviços",
    desc: "Frases pra qualquer serviço com carro em inglês — alugar, abastecer, estacionar, lavar. Toque em qualquer item da coluna I e qualquer combinação forma uma frase real.",
    0: { replace:true, items:[
      {en:"I'd like to",pt:"Eu gostaria de",s:TRI},
      {en:"I want to",pt:"Eu quero",s:TRI},
      {en:"I need to",pt:"Eu preciso",s:TRI},
      {en:"Can I",pt:"Posso",s:TRI},
      {en:"Could I",pt:"Posso",s:TRI},
      {en:"Where can I",pt:"Onde posso",s:TRI},
      {en:"Could you help me",pt:"Pode me ajudar a",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"rent a car",pt:"alugar um carro",s:TRI},
      {en:"fill up the tank",pt:"encher o tanque",s:TRI},
      {en:"park the car",pt:"estacionar o carro",s:TRI},
      {en:"wash the car",pt:"lavar o carro",s:TRI},
      {en:"return this car",pt:"devolver esse carro",s:TRI},
      {en:"drop off the keys",pt:"deixar as chaves",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"today",pt:"hoje",s:TRI},
      {en:"right now",pt:"agora",s:TRI},
      {en:"nearby",pt:"perto",s:TRI},
      {en:"with insurance",pt:"com seguro",s:TRI},
      {en:"safely",pt:"com segurança",s:TRI},
      {en:"quickly",pt:"rapidinho",s:TRI},
      {en:"if possible",pt:"se possível",s:TRI},
      {en:"in advance",pt:"com antecedência",s:TRI},
      {en:"please",pt:"por favor",s:TRI},
    ]},
    examples: [
      {en:"I'd like to rent a car with insurance",pt:"Eu gostaria de alugar um carro com seguro"},
      {en:"I need to fill up the tank quickly",pt:"Eu preciso encher o tanque rapidinho"},
      {en:"Where can I park the car nearby?",pt:"Onde posso estacionar o carro perto?"},
      {en:"Could you help me wash the car if possible?",pt:"Pode me ajudar a lavar o carro se possível?"},
      {en:"Can I return this car today?",pt:"Posso devolver esse carro hoje?"},
      {en:"Could I drop off the keys in advance?",pt:"Posso deixar as chaves com antecedência?"},
      {en:"I want to rent a car for the weekend please",pt:"Eu quero alugar um carro pra o fim de semana por favor"},
      {en:"I need to park the car safely right now",pt:"Eu preciso estacionar o carro com segurança agora"},
      {en:"Where can I fill up the tank nearby?",pt:"Onde posso encher o tanque perto?"},
    ],
    phrasals: [
      {term:"rent a car",desc:"Frase exata pra alugar carro. SEMPRE 'rent A car' (com 'a'). Não 'rent the car' (que seria um carro específico). Pra duração: 'for [tempo]' — 'for the weekend', 'for three days'.",ex:[
        {en:"I'd like to rent a car with insurance",pt:"Eu gostaria de alugar um carro com seguro"},
        {en:"I want to rent a car for the weekend",pt:"Eu quero alugar um carro pra o fim de semana"}
      ]},
      {term:"fill up the tank",desc:"Pra abastecer. 'Fill up' (separável) + 'the tank' (objeto). Em conversa rápida, só 'fill up' já entende-se que é o tanque. Pra tipo de combustível: 'with regular/premium/diesel'.",ex:[
        {en:"I need to fill up the tank quickly",pt:"Eu preciso encher o tanque rapidinho"},
        {en:"Could you fill up the tank please?",pt:"Pode encher o tanque por favor?"}
      ]},
      {term:"park the car",desc:"Estacionar. 'Park' é o verbo, 'the car' é o objeto direto. SEMPRE 'park IN [lugar]' ou 'park AT [lugar específico]'. Não confunda com 'parking' (substantivo) que é o ato/lugar de estacionar.",ex:[
        {en:"Where can I park the car nearby?",pt:"Onde posso estacionar o carro perto?"},
        {en:"I need to park the car safely",pt:"Eu preciso estacionar o carro com segurança"}
      ]},
      {term:"wash the car / drop off the keys",desc:"'Wash the car' = lavar o carro. 'Drop off' = deixar (entregar). 'Drop off the keys' = deixar as chaves (na devolução). 'Drop off' é phrasal verb separável.",ex:[
        {en:"Could you help me wash the car?",pt:"Pode me ajudar a lavar o carro?"},
        {en:"I'd like to drop off the keys in advance",pt:"Eu gostaria de deixar as chaves com antecedência"}
      ]},
      {term:"return this car",desc:"Pra devolver carro alugado. 'Return' (devolver) é o verbo padrão em locadoras. SEMPRE 'return THIS car' (apontando o seu) ou 'return the car' (genérico). Não 'give back' que é informal demais.",ex:[
        {en:"Can I return this car today?",pt:"Posso devolver esse carro hoje?"},
        {en:"I need to return this car right now",pt:"Eu preciso devolver esse carro agora"}
      ]},
      {term:"with insurance",desc:"Crítico em locação. 'With insurance' = com seguro. 'With full coverage' = com cobertura total. 'Without insurance' = sem seguro (perigoso, geralmente mais barato). 'Insurance' é incontável (não 'insurances').",ex:[
        {en:"I'd like to rent a car with insurance",pt:"Eu gostaria de alugar um carro com seguro"},
        {en:"Could I rent a car with full coverage?",pt:"Posso alugar um carro com cobertura total?"}
      ]},
      {term:"nearby / safely / quickly",desc:"Especificadores comuns ao dirigir. 'Nearby' = perto. 'Safely' = com segurança. 'Quickly' = rapidinho. 'In advance' = com antecedência. Todos funcionam no fim da frase pra dar contexto.",ex:[
        {en:"Where can I park the car nearby?",pt:"Onde posso estacionar o carro perto?"},
        {en:"I need to fill up the tank quickly",pt:"Eu preciso encher o tanque rapidinho"}
      ]},
    ]
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
  // HOBBIES — Gostos & preferências (single-frame, 3 cols)
  // Frame: [emotional verb that takes gerund/noun] + [activity] + [context]
  // All Col I items take gerund/noun; all Col II are gerunds/nouns; all Col III
  // are time/manner adverbials. Any combination produces valid English.
  // Example: "I love cooking on weekends"
  // ════════════════════════════════════════════
  "at-home": {
    title: "hobbies",
    sub: "Gostos & preferências",
    desc: "Frases pra falar do que você gosta, ama, odeia. Toque em qualquer item da coluna I e qualquer combinação nas próximas colunas forma uma frase real em inglês.",
    // All items share s:0. Filtering becomes trivially "all available", so
    // any Col I × Col II × Col III combination is valid English.
    0: { replace:true, items:[
      {en:"I love",pt:"Eu amo",s:TRI},
      {en:"I enjoy",pt:"Eu curto",s:TRI},
      {en:"I'm into",pt:"Curto muito",s:TRI},
      {en:"I'm a fan of",pt:"Sou fã de",s:TRI},
      {en:"I'm passionate about",pt:"Sou apaixonado(a) por",s:TRI},
      {en:"I can't stand",pt:"Não suporto",s:TRI},
      {en:"I hate",pt:"Eu odeio",s:TRI},
      {en:"I'm not a fan of",pt:"Não sou fã de",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"cooking",pt:"cozinhar",s:TRI},
      {en:"reading",pt:"ler",s:TRI},
      {en:"running",pt:"correr",s:TRI},
      {en:"photography",pt:"fotografia",s:TRI},
      {en:"going to the gym",pt:"ir na academia",s:TRI},
      {en:"watching movies",pt:"assistir filmes",s:TRI},
      {en:"hanging out with friends",pt:"sair com amigos",s:TRI},
      {en:"listening to music",pt:"ouvir música",s:TRI},
      {en:"traveling",pt:"viajar",s:TRI},
      {en:"shopping",pt:"fazer compras",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"on weekends",pt:"nos fins de semana",s:TRI},
      {en:"lately",pt:"ultimamente",s:TRI},
      {en:"for years",pt:"há anos",s:TRI},
      {en:"since I was a kid",pt:"desde criança",s:TRI},
      {en:"honestly",pt:"sinceramente",s:TRI},
      {en:"in general",pt:"no geral",s:TRI},
      {en:"daily",pt:"diariamente",s:TRI},
      {en:"to relax",pt:"pra relaxar",s:TRI},
      {en:"when I'm stressed",pt:"quando estou estressado(a)",s:TRI},
    ]},
    examples: [
      {en:"I love cooking on weekends",pt:"Eu amo cozinhar nos fins de semana"},
      {en:"I'm into photography lately",pt:"Curto muito fotografia ultimamente"},
      {en:"I'm passionate about running since I was a kid",pt:"Sou apaixonado por correr desde criança"},
      {en:"I'm a fan of watching movies to relax",pt:"Sou fã de assistir filmes pra relaxar"},
      {en:"I enjoy traveling for years",pt:"Curto viajar há anos"},
      {en:"I can't stand shopping honestly",pt:"Não suporto fazer compras sinceramente"},
      {en:"I hate going to the gym daily",pt:"Odeio ir na academia diariamente"},
      {en:"I'm not a fan of listening to music when I'm stressed",pt:"Não sou fã de ouvir música quando estou estressado"},
      {en:"I'm passionate about shopping when I'm stressed",pt:"Sou apaixonada por fazer compras quando estou estressada"},
      {en:"I love hanging out with friends in general",pt:"Amo sair com amigos no geral"},
    ],
    phrasals: [
      {term:"I love / I enjoy",desc:"Os dois verbos mais comuns pra dizer que gosta de algo. 'I love' é mais forte e expressivo; 'I enjoy' é mais neutro/elegante. Os dois sempre seguidos de gerúndio (-ing) ou substantivo, NUNCA do infinitivo após eles.",ex:[
        {en:"I love cooking on weekends",pt:"Eu amo cozinhar nos fins de semana"},
        {en:"I enjoy traveling lately",pt:"Curto viajar ultimamente"}
      ]},
      {term:"I'm into / I'm a fan of",desc:"Formas mais casuais de dizer que curte algo. 'I'm into' é informal e popular entre jovens. 'I'm a fan of' funciona em qualquer contexto. Cuidado: ambos pedem gerúndio (-ing) ou substantivo, NUNCA infinitivo.",ex:[
        {en:"I'm into running for years",pt:"Curto correr há anos"},
        {en:"I'm a fan of photography in general",pt:"Sou fã de fotografia no geral"}
      ]},
      {term:"I'm passionate about",desc:"Forma mais forte e elegante pra dizer que ama algo. Soa profissional e maduro — perfeito pra entrevistas e bio do LinkedIn. Sempre seguido de gerúndio ou substantivo.",ex:[
        {en:"I'm passionate about traveling",pt:"Sou apaixonado(a) por viajar"},
        {en:"I'm passionate about photography since I was a kid",pt:"Sou apaixonado(a) por fotografia desde criança"}
      ]},
      {term:"I can't stand / I hate",desc:"Pra falar do que detesta. 'I can't stand' é o mais comum em conversa ('não suporto'); 'I hate' é mais forte e direto. Ambos seguidos de gerúndio ou substantivo. Não confundir com 'don't like' que é bem mais brando.",ex:[
        {en:"I can't stand shopping honestly",pt:"Não suporto fazer compras sinceramente"},
        {en:"I hate going to the gym daily",pt:"Odeio ir na academia diariamente"}
      ]},
      {term:"I'm not a fan of",desc:"Forma educada e suave de dizer que não gosta de algo. Soa diplomático e evita conflito — ideal em conversa com pessoas que você não conhece bem. Sempre seguido de gerúndio ou substantivo.",ex:[
        {en:"I'm not a fan of cooking honestly",pt:"Não sou fã de cozinhar sinceramente"},
        {en:"I'm not a fan of running in general",pt:"Não sou fã de correr no geral"}
      ]},
      {term:"Atividade em -ing (gerúndio)",desc:"Regra crítica: depois de 'love/enjoy/hate/can't stand/be into/be a fan of' SEMPRE vem gerúndio (-ing) ou substantivo. Nunca infinitivo. Erro clássico do brasileiro: 'I love to cook' soa antiquado; o correto natural é 'I love cooking'.",ex:[
        {en:"I love cooking, not 'I love to cook'",pt:"Sempre cooking (gerúndio)"},
        {en:"I'm into running, not 'I'm into to run'",pt:"Sempre running"}
      ]},
      {term:"on weekends / lately / for years",desc:"Fechadores de frase pra dar contexto temporal. 'On weekends' = padrão regular. 'Lately' = recentemente, com mudança. 'For years' = há muito tempo (ainda em curso). 'Since I was a kid' = desde a infância (raiz profunda).",ex:[
        {en:"I'm into running for years",pt:"Curto correr há anos"},
        {en:"I'm a fan of photography since I was a kid",pt:"Sou fã de fotografia desde criança"}
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
  // SHOPPING — Procurar produto na loja (single-frame)
  // Frame: [search opener] + [product] + [specification]
  // Example: "I'm looking for a shirt in size medium"
  // ════════════════════════════════════════════
  "shopping": {
    title: "shopping",
    sub: "Loja, prova & checkout",
    desc: "Pra comprar em qualquer loja em inglês — procurar item, provar, perguntar preço, devolver, pagar. Cada opener abre uma cena.",
    tree: [
      // Procurar item
      { en:"I'm looking for", pt:"Estou procurando", colII:[
        { en:"a t-shirt", pt:"uma camiseta", colIII:[
          {en:"in size M",pt:"tamanho M"},
          {en:"in black",pt:"em preto"},
          {en:"on sale",pt:"em promoção"},
          {en:"for a gift",pt:"de presente"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"shoes", pt:"sapatos", colIII:[
          {en:"in size 9",pt:"número 39"},
          {en:"in black",pt:"em preto"},
          {en:"for running",pt:"pra correr"},
          {en:"under 100 dollars",pt:"abaixo de 100 dólares"},
        ]},
        { en:"a gift", pt:"um presente", colIII:[
          {en:"for my mom",pt:"pra minha mãe"},
          {en:"for a coworker",pt:"pra um colega"},
          {en:"under 50 dollars",pt:"abaixo de 50 dólares"},
          {en:"that comes wrapped",pt:"que venha embrulhado"},
        ]},
        { en:"a backpack", pt:"uma mochila", colIII:[
          {en:"for travel",pt:"pra viagem"},
          {en:"with a laptop sleeve",pt:"com bolso pra notebook"},
          {en:"in black",pt:"em preto"},
          {en:"under 100 dollars",pt:"abaixo de 100 dólares"},
        ]},
        { en:"a dress", pt:"um vestido", colIII:[
          {en:"in size M",pt:"tamanho M"},
          {en:"in black",pt:"em preto"},
          {en:"for a wedding",pt:"pra um casamento"},
          {en:"under 100 dollars",pt:"abaixo de 100 dólares"},
        ]},
      ]},

      // Disponibilidade
      { en:"Do you have", pt:"Vocês têm", colII:[
        { en:"this in another size", pt:"isso em outro tamanho", colIII:[
          {en:"in size L",pt:"tamanho L"},
          {en:"in size XL",pt:"tamanho XL"},
          {en:"smaller",pt:"menor"},
          {en:"in stock",pt:"em estoque"},
        ]},
        { en:"this in another color", pt:"isso em outra cor", colIII:[
          {en:"in black",pt:"em preto"},
          {en:"in white",pt:"em branco"},
          {en:"in blue",pt:"em azul"},
          {en:"in stock",pt:"em estoque"},
        ]},
        { en:"a bigger one", pt:"um maior", colIII:[
          {en:"in this style",pt:"neste estilo"},
          {en:"in stock",pt:"em estoque"},
          {en:"in the back",pt:"no estoque"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"something cheaper", pt:"algo mais barato", colIII:[
          {en:"on sale",pt:"em promoção"},
          {en:"in this size",pt:"neste tamanho"},
          {en:"under 50 dollars",pt:"abaixo de 50 dólares"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Provar
      { en:"Can I try", pt:"Posso provar", colII:[
        { en:"this on", pt:"isso", colIII:[
          {en:"real quick",pt:"rapidinho"},
          {en:"in the fitting room",pt:"no provador"},
          {en:"before I decide",pt:"antes de decidir"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"a different size", pt:"outro tamanho", colIII:[
          {en:"in size M",pt:"tamanho M"},
          {en:"in size L",pt:"tamanho L"},
          {en:"smaller",pt:"menor"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"this in red", pt:"isso em vermelho", colIII:[
          {en:"in size M",pt:"tamanho M"},
          {en:"if you have it",pt:"se vocês tiverem"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"both", pt:"os dois", colIII:[
          {en:"to compare",pt:"pra comparar"},
          {en:"real quick",pt:"rapidinho"},
          {en:"in the fitting room",pt:"no provador"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Preço
      { en:"How much is", pt:"Quanto custa", colII:[
        { en:"this", pt:"isso", colIII:[
          {en:"with tax",pt:"com imposto"},
          {en:"with the discount",pt:"com desconto"},
          {en:"on sale",pt:"em promoção"},
          {en:"in cash",pt:"em dinheiro"},
        ]},
        { en:"that one", pt:"aquele", colIII:[
          {en:"on the wall",pt:"da parede"},
          {en:"in the window",pt:"da vitrine"},
          {en:"with tax",pt:"com imposto"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"the total", pt:"o total", colIII:[
          {en:"with tax",pt:"com imposto"},
          {en:"with the discount",pt:"com desconto"},
          {en:"in cash",pt:"em dinheiro"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"the discount", pt:"o desconto", colIII:[
          {en:"on this",pt:"nisso"},
          {en:"on sale items",pt:"nos itens em promoção"},
          {en:"for the bundle",pt:"no combo"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Devolver
      { en:"I'd like to return", pt:"Quero devolver", colII:[
        { en:"this", pt:"isso", colIII:[
          {en:"for a refund",pt:"pra reembolso"},
          {en:"for store credit",pt:"pra crédito na loja"},
          {en:"because it doesn't fit",pt:"porque não serviu"},
          {en:"because I changed my mind",pt:"porque mudei de ideia"},
        ]},
        { en:"these shoes", pt:"estes sapatos", colIII:[
          {en:"because they're too tight",pt:"porque estão apertados"},
          {en:"because they don't fit",pt:"porque não servem"},
          {en:"for a refund",pt:"pra reembolso"},
          {en:"for store credit",pt:"pra crédito na loja"},
        ]},
        { en:"a gift", pt:"um presente", colIII:[
          {en:"for store credit",pt:"pra crédito na loja"},
          {en:"because I got two",pt:"porque ganhei dois"},
          {en:"without a receipt",pt:"sem nota"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"what I bought yesterday", pt:"o que comprei ontem", colIII:[
          {en:"for a refund",pt:"pra reembolso"},
          {en:"because it's defective",pt:"porque tá com defeito"},
          {en:"because it doesn't fit",pt:"porque não serviu"},
          {en:"and exchange it",pt:"e trocar"},
        ]},
      ]},

      // Pagamento
      { en:"Do you accept", pt:"Vocês aceitam", colII:[
        { en:"credit cards", pt:"cartão de crédito", colIII:[
          {en:"here",pt:"aqui"},
          {en:"in installments",pt:"parcelado"},
          {en:"for under 10 dollars",pt:"abaixo de 10 dólares"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"cash", pt:"dinheiro", colIII:[
          {en:"only",pt:"só"},
          {en:"in dollars",pt:"em dólar"},
          {en:"in reais",pt:"em real"},
          {en:"with change",pt:"com troco"},
        ]},
        { en:"Pix", pt:"Pix", colIII:[
          {en:"please",pt:"por favor"},
          {en:"with QR code",pt:"com QR code"},
          {en:"to a CNPJ",pt:"pra CNPJ"},
        ]},
        { en:"Apple Pay", pt:"Apple Pay", colIII:[
          {en:"here",pt:"aqui"},
          {en:"or contactless",pt:"ou aproximação"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Fechamento
      { en:"I'll take", pt:"Vou levar", colII:[
        { en:"this one", pt:"este", colIII:[
          {en:"please",pt:"por favor"},
          {en:"in red",pt:"em vermelho"},
          {en:"in size M",pt:"tamanho M"},
          {en:"and a bag",pt:"e uma sacola"},
        ]},
        { en:"both", pt:"os dois", colIII:[
          {en:"please",pt:"por favor"},
          {en:"with the discount",pt:"com desconto"},
          {en:"as a bundle",pt:"como combo"},
          {en:"and a bag",pt:"e uma sacola"},
        ]},
        { en:"the small one", pt:"o pequeno", colIII:[
          {en:"in black",pt:"em preto"},
          {en:"please",pt:"por favor"},
          {en:"and the receipt",pt:"e a nota"},
        ]},
        { en:"two of these", pt:"dois desses", colIII:[
          {en:"please",pt:"por favor"},
          {en:"with the discount",pt:"com desconto"},
          {en:"in different colors",pt:"em cores diferentes"},
          {en:"and a bag",pt:"e uma sacola"},
        ]},
      ]},
    ],
    examples: [
      {en:"I'm looking for a t-shirt in size M",pt:"Estou procurando uma camiseta tamanho M"},
      {en:"Do you have this in another color in black",pt:"Vocês têm isso em outra cor, em preto"},
      {en:"Can I try this on in the fitting room",pt:"Posso provar isso no provador"},
      {en:"How much is this with the discount",pt:"Quanto custa isso com desconto"},
      {en:"I'd like to return this for a refund",pt:"Quero devolver isso pra reembolso"},
      {en:"Do you accept credit cards in installments",pt:"Vocês aceitam cartão parcelado"},
      {en:"I'll take both with the discount",pt:"Vou levar os dois com desconto"},
      {en:"I'm looking for a gift for my mom",pt:"Estou procurando um presente pra minha mãe"},
      {en:"Can I try a different size smaller",pt:"Posso provar outro tamanho, menor"},
    ],
    phrasals: [
      {term:"I'm looking for",desc:"Pra começar busca. Sempre 'looking FOR' (com 'for'). Funciona pra item ('a t-shirt'), pessoa ('my friend') ou serviço.",ex:[
        {en:"I'm looking for shoes for running",pt:"Estou procurando sapatos pra correr"},
        {en:"I'm looking for a gift for my mom",pt:"Estou procurando um presente pra minha mãe"}
      ]},
      {term:"Do you have / Can I try",desc:"'Do you have' = pra checar disponibilidade. 'Can I try [X] on' (provar roupa, com 'on' no fim). 'Can I try a different size' (sem 'on' quando o objeto já é específico).",ex:[
        {en:"Do you have this in another color",pt:"Vocês têm isso em outra cor"},
        {en:"Can I try this on in the fitting room",pt:"Posso provar isso no provador"}
      ]},
      {term:"How much is",desc:"Pergunta de preço básica. 'How much IS this' (singular) / 'How much ARE these' (plural). Combine com 'with tax' (com imposto), 'with the discount' (com desconto), 'in cash' (à vista).",ex:[
        {en:"How much is this with tax",pt:"Quanto custa isso com imposto"},
        {en:"How much is the total in cash",pt:"Quanto é o total à vista"}
      ]},
      {term:"I'd like to return",desc:"Pra devolver compra. Sempre 'return [item]'. Combine com motivo: 'because it doesn't fit' (porque não serviu) / 'for a refund' (pra reembolso) / 'for store credit' (pra crédito na loja).",ex:[
        {en:"I'd like to return this for a refund",pt:"Quero devolver isso pra reembolso"},
        {en:"I'd like to return these shoes because they don't fit",pt:"Quero devolver estes sapatos porque não servem"}
      ]},
      {term:"Do you accept",desc:"Pra checar forma de pagamento. 'Credit cards' (plural — cartões em geral). 'Cash' (sem artigo — dinheiro em geral). 'In installments' = parcelado.",ex:[
        {en:"Do you accept credit cards in installments",pt:"Vocês aceitam cartão parcelado"},
        {en:"Do you accept cash in dollars",pt:"Vocês aceitam dinheiro em dólar"}
      ]},
      {term:"I'll take",desc:"Frase de fechamento na loja — equivalente a 'vou levar'. Sempre seguido de pronome ou quantidade: 'this one', 'both', 'two of these'. Adicione 'please' pra educação.",ex:[
        {en:"I'll take this one in red",pt:"Vou levar este em vermelho"},
        {en:"I'll take two of these with the discount",pt:"Vou levar dois desses com desconto"}
      ]},
      {term:"in size / in [color]",desc:"Sempre preposição 'in' pra tamanho e cor. 'In size M' (não 'on size'). 'In black' (não 'with black'). Erro clássico do brasileiro: 'on size'/'with black color'.",ex:[
        {en:"I'm looking for a t-shirt in size M",pt:"Estou procurando uma camiseta tamanho M"},
        {en:"Do you have this in black",pt:"Vocês têm isso em preto"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // FOOD — Pedir num restaurante (cascata personalizada)
  // Col I (opener) → Col II (prato/bebida que combina com aquele opener)
  //               → Col III (modificador específico daquele item)
  // Ex: "I'll have" → "the steak" → "well-done"
  //     "Can I get" → "a coffee" → "to go"
  // ════════════════════════════════════════════
  "cooking-1": {
    title: "food",
    sub: "Restaurantes & pedidos",
    desc: "Pedir num restaurante em inglês. Cada escolha personaliza as próximas — só aparece o que faz sentido pro pedido que você está montando.",
    tree: [
      // Universal opener — qualquer prato ou bebida cabe
      { en:"I'll have", pt:"Vou querer",
        colII: [STEAK, PASTA, CHICKEN, SALAD, SOUP, COFFEE, BEER, WATER] },

      // Formal universal — mesmo cardápio, registro elegante
      { en:"I'd like to order", pt:"Eu gostaria de pedir",
        colII: [STEAK, PASTA, CHICKEN, SALAD, SOUP, COFFEE, WINE, WATER] },

      // Casual / rápido — café, bar, fast food
      { en:"Can I get", pt:"Posso pedir",
        colII: [COFFEE, BEER, SANDWICH, FRIES, SNACK, WATER] },

      // Educado / britânico — pratos bem definidos, com bebidas
      { en:"Could I have", pt:"Posso ter",
        colII: [STEAK, PASTA, CHICKEN, COFFEE, BEER, WINE, WATER] },

      // Direto — usado pra fazer pedido sem rodeio
      { en:"I want", pt:"Eu quero",
        colII: [STEAK, PASTA, CHICKEN, SALAD, COFFEE] },

      // Pra começar — entradas, drinks de início
      { en:"I'll start with", pt:"Vou começar com",
        colII: [SALAD, SOUP, BEER, WINE, APPETIZER] },

      // Pedido em grupo, todo mundo na mesa
      { en:"For me,", pt:"Pra mim,",
        colII: [STEAK, PASTA, CHICKEN, SALAD, COFFEE] },
    ],
    examples: [
      {en:"I'll have the steak well-done",pt:"Vou querer o bife bem passado"},
      {en:"I'd like to order the pasta with extra cheese",pt:"Eu gostaria de pedir a massa com queijo extra"},
      {en:"Can I get a coffee to go please",pt:"Posso pedir um café pra viagem por favor"},
      {en:"Could I have a glass of wine please",pt:"Posso ter uma taça de vinho por favor"},
      {en:"I want the chicken with rice",pt:"Eu quero o frango com arroz"},
      {en:"I'll start with the salad to share",pt:"Vou começar com a salada pra dividir"},
      {en:"For me, the pasta with chicken",pt:"Pra mim, a massa com frango"},
      {en:"Can I get a sandwich toasted",pt:"Posso pedir um sanduíche tostado"},
      {en:"I'll have a beer cold please",pt:"Vou querer uma cerveja gelada por favor"},
    ],
    phrasals: [
      {term:"I'll have / I'd like to order",desc:"Os dois openers universais. 'I'll have' é casual e cabe em qualquer restaurante. 'I'd like to order' é formal e completo. Cada um abre um cardápio próprio na coluna II.",ex:[
        {en:"I'll have the steak well-done",pt:"Vou querer o bife bem passado"},
        {en:"I'd like to order the pasta with extra cheese",pt:"Eu gostaria de pedir a massa com queijo extra"}
      ]},
      {term:"Can I get / Could I have",desc:"'Can I get' é o jeito americano em cafés, bares e fast food — bem direto. 'Could I have' é britânico, mais educado. Note como a coluna II troca entre eles: 'Can I get' foca em itens rápidos (sanduíche, café, fries), enquanto 'Could I have' tende a pratos da casa.",ex:[
        {en:"Can I get a coffee to go?",pt:"Posso pedir um café pra viagem?"},
        {en:"Could I have a glass of wine please",pt:"Posso ter uma taça de vinho por favor"}
      ]},
      {term:"I'll start with",desc:"Pra abrir a refeição com entrada, salada, sopa ou drink — deixa claro que vem mais coisa. A coluna II só mostra itens de início (não tem prato principal aqui).",ex:[
        {en:"I'll start with the salad with dressing on the side",pt:"Vou começar com a salada com molho à parte"},
        {en:"I'll start with a glass of wine red",pt:"Vou começar com uma taça de vinho tinto"}
      ]},
      {term:"For me,",desc:"Forma simpática quando todo mundo está pedindo na mesa. Funciona como 'pra mim'. Sempre com vírgula antes do prato.",ex:[
        {en:"For me, the pasta with chicken",pt:"Pra mim, a massa com frango"},
        {en:"For me, the salad to share",pt:"Pra mim, a salada pra dividir"}
      ]},
      {term:"well-done / medium / rare",desc:"Pontos da carne. 'Rare' (mal-passada), 'medium' (ao-ponto), 'well-done' (bem-passada, com hífen). Aparece só quando o prato escolhido é steak — não faz sentido com café ou massa.",ex:[
        {en:"I'll have the steak well-done",pt:"Vou querer o bife bem passado"},
        {en:"Could I have the steak medium",pt:"Posso ter o bife ao ponto"}
      ]},
      {term:"to go / for here",desc:"Pra viagem ou pra comer no local. Aparece naturalmente em itens que dá pra levar — sanduíche, café, frango. Em vinho ou entrada compartilhada, o app não oferece.",ex:[
        {en:"Can I get a coffee to go",pt:"Posso pedir um café pra viagem"},
        {en:"I'll have a sandwich for here",pt:"Vou querer um sanduíche pra comer aqui"}
      ]},
      {term:"with extra / without / with no",desc:"Modificações específicas do prato. 'With extra' = com mais. 'Without' / 'with no' = sem. A coluna III só lista modificações que combinam com o item: 'with extra cheese' aparece em pasta e sandwich, 'without onions' em salad, etc.",ex:[
        {en:"I'd like to order the pasta with extra cheese",pt:"Eu gostaria de pedir a massa com queijo extra"},
        {en:"I want the salad without onions",pt:"Eu quero a salada sem cebola"}
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
  // PHONE — Pedir conexão / falar (single-frame)
  // Frame: [request opener] + [phone action + person] + [time/context]
  // Example: "Could I speak to the manager today"
  // ════════════════════════════════════════════
  "phone": {
    title: "phone",
    sub: "Ligação, call & recado",
    desc: "Pra navegar telefone e calls em inglês — abrir motivo, falar com alguém, marcar reunião, lidar com conexão ruim. Cada opener abre uma fase da chamada.",
    tree: [
      // Motivo da ligação
      { en:"I'm calling about", pt:"Estou ligando sobre", colII:[
        { en:"my appointment", pt:"meu agendamento", colIII:[
          {en:"for tomorrow",pt:"pra amanhã"},
          {en:"at 3 p.m.",pt:"das 3 da tarde"},
          {en:"I need to reschedule",pt:"preciso remarcar"},
          {en:"to confirm",pt:"pra confirmar"},
        ]},
        { en:"the order", pt:"o pedido", colIII:[
          {en:"I placed yesterday",pt:"que fiz ontem"},
          {en:"that hasn't arrived",pt:"que não chegou"},
          {en:"number 1234",pt:"número 1234"},
          {en:"to cancel it",pt:"pra cancelar"},
        ]},
        { en:"the invoice", pt:"a fatura", colIII:[
          {en:"I haven't received",pt:"que não recebi"},
          {en:"from last month",pt:"do mês passado"},
          {en:"that's incorrect",pt:"que tá incorreta"},
          {en:"to dispute it",pt:"pra contestar"},
        ]},
        { en:"the meeting", pt:"a reunião", colIII:[
          {en:"for tomorrow",pt:"pra amanhã"},
          {en:"to confirm the time",pt:"pra confirmar o horário"},
          {en:"to reschedule",pt:"pra remarcar"},
          {en:"with John",pt:"com o John"},
        ]},
      ]},

      // Falar com alguém
      { en:"Can I speak to", pt:"Posso falar com", colII:[
        { en:"the manager", pt:"o gerente", colIII:[
          {en:"please",pt:"por favor"},
          {en:"about my account",pt:"sobre minha conta"},
          {en:"right now",pt:"agora"},
          {en:"as soon as possible",pt:"o mais rápido possível"},
        ]},
        { en:"customer service", pt:"o atendimento", colIII:[
          {en:"please",pt:"por favor"},
          {en:"about my order",pt:"sobre meu pedido"},
          {en:"about a charge",pt:"sobre uma cobrança"},
          {en:"in English",pt:"em inglês"},
        ]},
        { en:"John", pt:"o John", colIII:[
          {en:"please",pt:"por favor"},
          {en:"from sales",pt:"de vendas"},
          {en:"if he's available",pt:"se ele estiver disponível"},
          {en:"about the project",pt:"sobre o projeto"},
        ]},
        { en:"someone from sales", pt:"alguém de vendas", colIII:[
          {en:"please",pt:"por favor"},
          {en:"about a quote",pt:"sobre uma cotação"},
          {en:"in English",pt:"em inglês"},
          {en:"as soon as possible",pt:"o mais rápido possível"},
        ]},
      ]},

      // Agendamento
      { en:"I'd like to schedule", pt:"Quero marcar", colII:[
        { en:"a call", pt:"uma call", colIII:[
          {en:"for tomorrow",pt:"pra amanhã"},
          {en:"at 3",pt:"às 3"},
          {en:"for 30 minutes",pt:"de 30 minutos"},
          {en:"this week",pt:"essa semana"},
        ]},
        { en:"a meeting", pt:"uma reunião", colIII:[
          {en:"for next week",pt:"pra semana que vem"},
          {en:"with the team",pt:"com o time"},
          {en:"for one hour",pt:"de uma hora"},
          {en:"in person",pt:"presencial"},
        ]},
        { en:"a follow-up", pt:"um follow-up", colIII:[
          {en:"for next week",pt:"pra semana que vem"},
          {en:"on this topic",pt:"sobre esse assunto"},
          {en:"for 15 minutes",pt:"de 15 minutos"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"a quick chat", pt:"uma conversa rápida", colIII:[
          {en:"today",pt:"hoje"},
          {en:"this afternoon",pt:"essa tarde"},
          {en:"for 10 minutes",pt:"de 10 minutos"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Pedido durante a chamada
      { en:"Can you", pt:"Pode", colII:[
        { en:"hold on a second", pt:"aguardar um segundo", colIII:[
          {en:"please",pt:"por favor"},
          {en:"I need to grab something",pt:"preciso pegar uma coisa"},
          {en:"I'll be right back",pt:"já volto"},
        ]},
        { en:"repeat that", pt:"repetir isso", colIII:[
          {en:"please",pt:"por favor"},
          {en:"I didn't catch it",pt:"não entendi"},
          {en:"slowly",pt:"devagar"},
          {en:"the last part",pt:"a última parte"},
        ]},
        { en:"call me back", pt:"me ligar de volta", colIII:[
          {en:"in five minutes",pt:"em cinco minutos"},
          {en:"this afternoon",pt:"hoje à tarde"},
          {en:"tomorrow morning",pt:"amanhã de manhã"},
          {en:"on this number",pt:"neste número"},
        ]},
        { en:"transfer me", pt:"me transferir", colIII:[
          {en:"to the manager",pt:"pro gerente"},
          {en:"to customer service",pt:"pro atendimento"},
          {en:"to someone in English",pt:"pra alguém que fale inglês"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Retorno
      { en:"I'll call back", pt:"Eu ligo de volta", colII:[
        { en:"in five minutes", pt:"em cinco minutos", colIII:[
          {en:"after this meeting",pt:"depois dessa reunião"},
          {en:"once I check",pt:"assim que eu checar"},
          {en:"is that okay?",pt:"tudo bem?"},
        ]},
        { en:"later today", pt:"mais tarde hoje", colIII:[
          {en:"after lunch",pt:"depois do almoço"},
          {en:"around 4",pt:"por volta das 4"},
          {en:"when I'm free",pt:"quando eu estiver livre"},
          {en:"is that okay?",pt:"tudo bem?"},
        ]},
        { en:"tomorrow", pt:"amanhã", colIII:[
          {en:"in the morning",pt:"de manhã"},
          {en:"once I have an answer",pt:"quando eu tiver resposta"},
          {en:"first thing",pt:"logo cedo"},
          {en:"is that okay?",pt:"tudo bem?"},
        ]},
        { en:"when I'm free", pt:"quando estiver livre", colIII:[
          {en:"after lunch",pt:"depois do almoço"},
          {en:"this afternoon",pt:"hoje à tarde"},
          {en:"by end of day",pt:"até o fim do dia"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Recado
      { en:"Could you take a message?", pt:"Pode anotar um recado?", colII:[
        { en:"I'll call back later", pt:"que ligo de volta depois", colIII:[
          {en:"please",pt:"por favor"},
          {en:"this afternoon",pt:"essa tarde"},
          {en:"around 4",pt:"por volta das 4"},
        ]},
        { en:"please tell them I called", pt:"avisa que liguei", colIII:[
          {en:"please",pt:"por favor"},
          {en:"my number is...",pt:"meu número é..."},
          {en:"I'll be available all day",pt:"vou ficar disponível o dia todo"},
        ]},
        { en:"it's urgent", pt:"é urgente", colIII:[
          {en:"please",pt:"por favor"},
          {en:"have them call me back",pt:"peçam pra me ligarem"},
          {en:"on this number",pt:"neste número"},
        ]},
        { en:"let them know I'll email", pt:"avisa que vou mandar e-mail", colIII:[
          {en:"in 10 minutes",pt:"em 10 minutos"},
          {en:"with the details",pt:"com os detalhes"},
          {en:"thank you",pt:"obrigado"},
        ]},
      ]},

      // Conexão ruim
      { en:"I think we have", pt:"Acho que temos", colII:[
        { en:"a bad connection", pt:"uma conexão ruim", colIII:[
          {en:"can you hear me?",pt:"você consegue me ouvir?"},
          {en:"let me try again",pt:"deixa eu tentar de novo"},
          {en:"I'll redial",pt:"vou ligar de novo"},
          {en:"please call me back",pt:"por favor me liga de volta"},
        ]},
        { en:"static on the line", pt:"interferência na linha", colIII:[
          {en:"can you hear me?",pt:"você consegue me ouvir?"},
          {en:"let me try again",pt:"deixa eu tentar de novo"},
          {en:"I'll switch phones",pt:"vou trocar de telefone"},
        ]},
        { en:"an echo", pt:"um eco", colIII:[
          {en:"can you check your mic?",pt:"pode checar seu mic?"},
          {en:"let me mute and unmute",pt:"deixa eu mutar e desmutar"},
          {en:"is it better now?",pt:"melhorou?"},
        ]},
        { en:"a dropped call", pt:"uma queda de chamada", colIII:[
          {en:"sorry about that",pt:"desculpa"},
          {en:"I just redialed",pt:"acabei de ligar de novo"},
          {en:"can you hear me now?",pt:"agora me ouve?"},
        ]},
      ]},
    ],
    examples: [
      {en:"I'm calling about my appointment for tomorrow",pt:"Estou ligando sobre meu agendamento de amanhã"},
      {en:"Can I speak to the manager please",pt:"Posso falar com o gerente por favor"},
      {en:"I'd like to schedule a call for tomorrow at 3",pt:"Quero marcar uma call pra amanhã às 3"},
      {en:"Can you transfer me to customer service",pt:"Pode me transferir pro atendimento"},
      {en:"I'll call back in five minutes after this meeting",pt:"Eu ligo em cinco minutos depois dessa reunião"},
      {en:"Could you take a message it's urgent",pt:"Pode anotar um recado é urgente"},
      {en:"I think we have a bad connection can you hear me",pt:"Acho que temos conexão ruim você me ouve"},
      {en:"I'm calling about the order I placed yesterday",pt:"Estou ligando sobre o pedido que fiz ontem"},
      {en:"Can you repeat that please",pt:"Pode repetir por favor"},
    ],
    phrasals: [
      {term:"I'm calling about",desc:"Frase universal pra abrir ligação. 'I'm calling ABOUT [tópico]' (com 'about'). Sempre seguido por substantivo: 'my appointment' / 'the order' / 'the invoice' / 'the meeting'.",ex:[
        {en:"I'm calling about my appointment for tomorrow",pt:"Estou ligando sobre meu agendamento de amanhã"},
        {en:"I'm calling about the order I placed yesterday",pt:"Estou ligando sobre o pedido que fiz ontem"}
      ]},
      {term:"Can I speak to",desc:"Pra pedir pra falar com alguém. SEMPRE 'speak TO' (não 'speak with'). 'Can I speak to the manager' / 'to John' / 'to customer service'. 'Please' fecha educadamente.",ex:[
        {en:"Can I speak to the manager please",pt:"Posso falar com o gerente por favor"},
        {en:"Can I speak to someone from sales",pt:"Posso falar com alguém de vendas"}
      ]},
      {term:"I'd like to schedule",desc:"Pra marcar reunião/call. 'Schedule' = agendar. Sempre 'A call' / 'A meeting' (com 'a'). Note 'follow-up' (com hífen) = encontro de retorno. Pra remarcar é 'reschedule'.",ex:[
        {en:"I'd like to schedule a call for tomorrow",pt:"Quero marcar uma call pra amanhã"},
        {en:"I'd like to schedule a follow-up for next week",pt:"Quero marcar um follow-up pra semana que vem"}
      ]},
      {term:"Can you hold on / repeat / call me back / transfer me",desc:"Pedidos durante a chamada. 'Hold on a second' (espera um segundo) — americano usa 'hold on', não 'wait'. 'Transfer me TO [pessoa]' = me transfere pra. 'Call me back' (separável: 'call me back later').",ex:[
        {en:"Can you hold on a second please",pt:"Pode aguardar um segundo por favor"},
        {en:"Can you transfer me to customer service",pt:"Pode me transferir pro atendimento"}
      ]},
      {term:"I'll call back",desc:"Pra prometer retorno. 'I'll call back IN five minutes' (em cinco minutos — com 'in'). 'I'll call back LATER' (mais tarde — sem preposição). Note: 'call back' (separável, mas comum sem objeto).",ex:[
        {en:"I'll call back in five minutes",pt:"Eu ligo de volta em cinco minutos"},
        {en:"I'll call back tomorrow first thing",pt:"Eu ligo de volta amanhã logo cedo"}
      ]},
      {term:"Could you take a message?",desc:"Pra deixar recado quando a pessoa não atende. 'Take a message' (anotar recado) é a expressão exata. Combine com mensagem direta: 'I'll call back later' / 'tell them I called' / 'it's urgent'.",ex:[
        {en:"Could you take a message please",pt:"Pode anotar um recado por favor"},
        {en:"Could you take a message it's urgent",pt:"Pode anotar um recado é urgente"}
      ]},
      {term:"I think we have a bad connection",desc:"Frase pra problemas técnicos na chamada. 'Bad connection' = conexão ruim. 'Static' = chiado/interferência. 'An echo' = eco. 'A dropped call' = chamada caiu. 'Can you hear me?' é a pergunta-chave.",ex:[
        {en:"I think we have a bad connection can you hear me",pt:"Acho que temos conexão ruim você me ouve"},
        {en:"I think we have an echo can you check your mic",pt:"Acho que tem eco pode checar seu mic"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // TRAVEL — Reservar/pedir em viagem (single-frame)
  // Frame: [request opener] + [travel action] + [timing/spec]
  // Example: "I'd like to book a flight for tonight"
  // ════════════════════════════════════════════
  "traveling": {
    title: "travel",
    sub: "Aeroporto, hotel & turismo",
    desc: "Pra navegar viagem em inglês — chegada, hotel, problema de voo, direção. Cada opener abre uma cena diferente.",
    tree: [
      // Chegada/check-in de hotel
      { en:"I have a reservation", pt:"Tenho reserva", colII:[
        { en:"under my name", pt:"no meu nome", colIII:[
          {en:"for tonight",pt:"pra hoje à noite"},
          {en:"for tomorrow",pt:"pra amanhã"},
          {en:"for two nights",pt:"pra duas noites"},
          {en:"for two people",pt:"pra duas pessoas"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"for tonight", pt:"pra hoje à noite", colIII:[
          {en:"I booked online",pt:"reservei online"},
          {en:"for one person",pt:"pra uma pessoa"},
          {en:"with breakfast",pt:"com café da manhã"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"for two nights", pt:"pra duas noites", colIII:[
          {en:"starting today",pt:"a partir de hoje"},
          {en:"with breakfast",pt:"com café da manhã"},
          {en:"for two people",pt:"pra duas pessoas"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"for next week", pt:"pra semana que vem", colIII:[
          {en:"Monday to Friday",pt:"de segunda a sexta"},
          {en:"for the conference",pt:"pro evento"},
          {en:"for two",pt:"pra duas pessoas"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Check-in (hotel ou voo)
      { en:"I'd like to check in", pt:"Quero fazer check-in", colII:[
        { en:"now", pt:"agora", colIII:[
          {en:"if my room is ready",pt:"se o quarto estiver pronto"},
          {en:"I just landed",pt:"acabei de pousar"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"early", pt:"antes do horário", colIII:[
          {en:"if possible",pt:"se possível"},
          {en:"I have an early meeting",pt:"tenho reunião cedo"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"for my flight", pt:"pro meu voo", colIII:[
          {en:"to São Paulo",pt:"pra São Paulo"},
          {en:"to New York",pt:"pra Nova York"},
          {en:"to Lisbon",pt:"pra Lisboa"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"online", pt:"online", colIII:[
          {en:"but it's not working",pt:"mas não tá funcionando"},
          {en:"from my phone",pt:"do meu celular"},
          {en:"for two people",pt:"pra duas pessoas"},
        ]},
      ]},

      // Pedidos de serviço
      { en:"Can I get", pt:"Posso pedir", colII:[
        { en:"a wake-up call", pt:"chamada pra acordar", colIII:[
          {en:"at 7",pt:"às 7"},
          {en:"for tomorrow morning",pt:"pra amanhã de manhã"},
          {en:"every day at 6",pt:"todo dia às 6"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"a late checkout", pt:"checkout tardio", colIII:[
          {en:"until 2",pt:"até as 2"},
          {en:"tomorrow",pt:"amanhã"},
          {en:"if possible",pt:"se possível"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"extra towels", pt:"toalhas extras", colIII:[
          {en:"for the room",pt:"pro quarto"},
          {en:"as soon as possible",pt:"o quanto antes"},
          {en:"two more",pt:"mais duas"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"a different room", pt:"outro quarto", colIII:[
          {en:"the other one is too noisy",pt:"o outro tá barulhento demais"},
          {en:"with a better view",pt:"com vista melhor"},
          {en:"on a higher floor",pt:"num andar mais alto"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"a taxi", pt:"um táxi", colIII:[
          {en:"to the airport",pt:"pro aeroporto"},
          {en:"right now",pt:"agora"},
          {en:"for 6 a.m.",pt:"pras 6 da manhã"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Navegação (perguntar onde fica)
      { en:"Where is", pt:"Onde fica", colII:[
        { en:"the bathroom", pt:"o banheiro", colIII:[
          {en:"from here",pt:"daqui"},
          {en:"on this floor",pt:"neste andar"},
          {en:"the closest one",pt:"o mais próximo"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"the gate", pt:"o portão", colIII:[
          {en:"for flight 304",pt:"do voo 304"},
          {en:"for the São Paulo flight",pt:"do voo pra São Paulo"},
          {en:"from here",pt:"daqui"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"the exit", pt:"a saída", colIII:[
          {en:"from here",pt:"daqui"},
          {en:"to the taxis",pt:"pros táxis"},
          {en:"to the metro",pt:"pro metrô"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"the train station", pt:"a estação de trem", colIII:[
          {en:"from here",pt:"daqui"},
          {en:"the closest one",pt:"a mais próxima"},
          {en:"on foot",pt:"a pé"},
          {en:"by metro",pt:"de metrô"},
        ]},
        { en:"my room", pt:"meu quarto", colIII:[
          {en:"the number is 504",pt:"é o 504"},
          {en:"on this floor",pt:"neste andar"},
          {en:"with this key card",pt:"com este cartão"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Propósito da viagem
      { en:"I'm here for", pt:"Estou aqui a/de", colII:[
        { en:"business", pt:"negócios", colIII:[
          {en:"for two days",pt:"por dois dias"},
          {en:"for a meeting",pt:"pra uma reunião"},
          {en:"for a conference",pt:"pra uma conferência"},
          {en:"with my team",pt:"com meu time"},
        ]},
        { en:"vacation", pt:"férias", colIII:[
          {en:"for two weeks",pt:"por duas semanas"},
          {en:"with my family",pt:"com minha família"},
          {en:"for the first time",pt:"pela primeira vez"},
          {en:"to relax",pt:"pra relaxar"},
        ]},
        { en:"a layover", pt:"uma escala", colIII:[
          {en:"for 6 hours",pt:"por 6 horas"},
          {en:"until midnight",pt:"até a meia-noite"},
          {en:"before my next flight",pt:"antes do próximo voo"},
          {en:"to São Paulo",pt:"pra São Paulo"},
        ]},
        { en:"family", pt:"família", colIII:[
          {en:"for the holidays",pt:"pras festas"},
          {en:"for a wedding",pt:"pra um casamento"},
          {en:"for a week",pt:"por uma semana"},
          {en:"visiting my parents",pt:"visitando meus pais"},
        ]},
      ]},

      // Problema de viagem
      { en:"I missed", pt:"Perdi", colII:[
        { en:"my flight", pt:"meu voo", colIII:[
          {en:"because of the traffic",pt:"por causa do trânsito"},
          {en:"by 10 minutes",pt:"por 10 minutos"},
          {en:"and I need to rebook",pt:"e preciso remarcar"},
          {en:"is there another one?",pt:"tem outro?"},
        ]},
        { en:"my connection", pt:"minha conexão", colIII:[
          {en:"in Lisbon",pt:"em Lisboa"},
          {en:"and I'm stranded",pt:"e estou preso aqui"},
          {en:"what are my options?",pt:"quais são as opções?"},
          {en:"by 5 minutes",pt:"por 5 minutos"},
        ]},
        { en:"the train", pt:"o trem", colIII:[
          {en:"by a minute",pt:"por um minuto"},
          {en:"when does the next one leave?",pt:"quando sai o próximo?"},
          {en:"and I'm late",pt:"e estou atrasado"},
        ]},
        { en:"the bus", pt:"o ônibus", colIII:[
          {en:"to the airport",pt:"pro aeroporto"},
          {en:"and I need a taxi",pt:"e preciso de um táxi"},
          {en:"by 2 minutes",pt:"por 2 minutos"},
        ]},
      ]},

      // Direção / como chegar
      { en:"How do I get to", pt:"Como vou pra", colII:[
        { en:"the city center", pt:"o centro", colIII:[
          {en:"from here",pt:"daqui"},
          {en:"by metro",pt:"de metrô"},
          {en:"by taxi",pt:"de táxi"},
          {en:"on foot",pt:"a pé"},
        ]},
        { en:"the airport", pt:"o aeroporto", colIII:[
          {en:"from this hotel",pt:"deste hotel"},
          {en:"by taxi",pt:"de táxi"},
          {en:"by train",pt:"de trem"},
          {en:"the cheapest way",pt:"do jeito mais barato"},
        ]},
        { en:"my hotel", pt:"meu hotel", colIII:[
          {en:"from here",pt:"daqui"},
          {en:"by taxi",pt:"de táxi"},
          {en:"on foot",pt:"a pé"},
          {en:"is it walkable?",pt:"dá pra ir andando?"},
        ]},
        { en:"the beach", pt:"a praia", colIII:[
          {en:"from here",pt:"daqui"},
          {en:"by bus",pt:"de ônibus"},
          {en:"the closest one",pt:"a mais próxima"},
          {en:"on foot",pt:"a pé"},
        ]},
      ]},
    ],
    examples: [
      {en:"I have a reservation under my name for tonight",pt:"Tenho reserva no meu nome pra hoje à noite"},
      {en:"I'd like to check in early please",pt:"Quero fazer check-in cedo por favor"},
      {en:"Can I get a late checkout until 2",pt:"Posso pedir checkout tardio até as 2"},
      {en:"Where is the gate for flight 304",pt:"Onde fica o portão do voo 304"},
      {en:"I'm here for business for two days",pt:"Estou aqui a negócios por dois dias"},
      {en:"I missed my connection in Lisbon",pt:"Perdi minha conexão em Lisboa"},
      {en:"How do I get to the city center by metro",pt:"Como vou pro centro de metrô"},
      {en:"Can I get a wake-up call at 7",pt:"Posso pedir chamada pra acordar às 7"},
      {en:"I'm here for a layover for 6 hours",pt:"Estou aqui de escala por 6 horas"},
    ],
    phrasals: [
      {term:"I have a reservation under my name",desc:"Frase-chave de chegada em hotel. 'Under my name' = 'no meu nome' (não 'on my name'). Sempre seguido por detalhe da reserva: 'for tonight', 'for two nights', etc.",ex:[
        {en:"I have a reservation under my name for tonight",pt:"Tenho reserva no meu nome pra hoje à noite"},
        {en:"I have a reservation for two nights with breakfast",pt:"Tenho reserva pra duas noites com café da manhã"}
      ]},
      {term:"I'd like to check in / check out",desc:"'Check in' (verbo, dois palavras) = chegar. 'Check-in' (substantivo, com hífen) = a chegada. Mesmo pra 'check out'. Funciona em hotel E em voo. 'Check in early' = antes do horário oficial.",ex:[
        {en:"I'd like to check in early please",pt:"Quero fazer check-in cedo por favor"},
        {en:"I'd like to check in for my flight to New York",pt:"Quero fazer check-in pro meu voo pra Nova York"}
      ]},
      {term:"Can I get",desc:"Pedido casual em hotel. Cabe pra serviço (wake-up call, late checkout), item (extra towels), troca (different room) e taxi. Sempre seguido por substantivo. 'Please' fecha educadamente.",ex:[
        {en:"Can I get a wake-up call at 7",pt:"Posso pedir chamada pra acordar às 7"},
        {en:"Can I get a different room please",pt:"Posso pedir outro quarto por favor"}
      ]},
      {term:"Where is",desc:"Pra perguntar localização. SEMPRE com 'the' antes do lugar. 'The bathroom', 'the gate', 'the exit'. Adicione 'from here' pra mostrar que quer direção a partir do ponto atual.",ex:[
        {en:"Where is the bathroom from here",pt:"Onde fica o banheiro daqui"},
        {en:"Where is the gate for flight 304",pt:"Onde fica o portão do voo 304"}
      ]},
      {term:"I'm here for",desc:"Frase-chave em imigração. 'I'm here for business' / 'vacation' / 'a layover' / 'family'. Note: 'business' e 'vacation' sem artigo; 'a layover' com artigo. 'A layover' = escala curta entre voos.",ex:[
        {en:"I'm here for vacation for two weeks",pt:"Estou aqui de férias por duas semanas"},
        {en:"I'm here for a layover for 6 hours",pt:"Estou aqui de escala por 6 horas"}
      ]},
      {term:"I missed",desc:"Pra perder transporte. 'Miss' = perder no sentido de não pegar a tempo. 'I missed my flight by 10 minutes' = perdi por 10 minutos. Combine com 'because of [motivo]' pra explicar.",ex:[
        {en:"I missed my flight because of the traffic",pt:"Perdi meu voo por causa do trânsito"},
        {en:"I missed my connection in Lisbon",pt:"Perdi minha conexão em Lisboa"}
      ]},
      {term:"How do I get to",desc:"Pra pedir direção. SEMPRE 'How do I GET TO [lugar]', não 'How I go'. Especifique o meio: 'by metro', 'by taxi', 'on foot' (a pé, não 'by foot').",ex:[
        {en:"How do I get to the airport by taxi",pt:"Como vou pro aeroporto de táxi"},
        {en:"How do I get to the city center on foot",pt:"Como vou pro centro a pé"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // RELATIONSHIPS — Falar do parceiro (single-frame)
  // Frame: [feeling/state verb] + [partner/person] + [intensifier]
  // Example: "I'm crazy about my husband every day"
  // ════════════════════════════════════════════
  "relationships": {
    title: "relationships",
    sub: "Namoro & parceiros",
    desc: "Frases pra falar do seu parceiro em inglês — sentimentos, paixão, dia-a-dia. Toque em qualquer item da coluna I e qualquer combinação forma uma frase real.",
    0: { replace:true, items:[
      {en:"I'm with",pt:"Estou com",s:TRI},
      {en:"I'm in love with",pt:"Estou apaixonado(a) por",s:TRI},
      {en:"I'm crazy about",pt:"Sou louco(a) por",s:TRI},
      {en:"I miss",pt:"Sinto falta de",s:TRI},
      {en:"I'm proud of",pt:"Tenho orgulho de",s:TRI},
      {en:"I really care about",pt:"Me importo muito com",s:TRI},
      {en:"I depend on",pt:"Conto com",s:TRI},
      {en:"I'm grateful for",pt:"Sou grato(a) por",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"my boyfriend",pt:"meu namorado",s:TRI},
      {en:"my girlfriend",pt:"minha namorada",s:TRI},
      {en:"my partner",pt:"meu(minha) parceiro(a)",s:TRI},
      {en:"my husband",pt:"meu marido",s:TRI},
      {en:"my wife",pt:"minha esposa",s:TRI},
      {en:"my best friend",pt:"meu(minha) melhor amigo(a)",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"for two years",pt:"há dois anos",s:TRI},
      {en:"lately",pt:"ultimamente",s:TRI},
      {en:"since college",pt:"desde a faculdade",s:TRI},
      {en:"honestly",pt:"sinceramente",s:TRI},
      {en:"every day",pt:"todo dia",s:TRI},
      {en:"more than ever",pt:"mais do que nunca",s:TRI},
      {en:"deeply",pt:"profundamente",s:TRI},
      {en:"in many ways",pt:"de várias formas",s:TRI},
      {en:"to be honest",pt:"pra ser sincero(a)",s:TRI},
    ]},
    examples: [
      {en:"I'm with my boyfriend for two years",pt:"Estou com meu namorado há dois anos"},
      {en:"I'm in love with my partner since college",pt:"Estou apaixonado pelo(a) meu(minha) parceiro(a) desde a faculdade"},
      {en:"I'm crazy about my wife every day",pt:"Sou louco pela minha esposa todo dia"},
      {en:"I miss my best friend lately",pt:"Sinto falta do meu melhor amigo ultimamente"},
      {en:"I'm proud of my husband honestly",pt:"Tenho orgulho do meu marido sinceramente"},
      {en:"I really care about my girlfriend deeply",pt:"Me importo muito com minha namorada profundamente"},
      {en:"I depend on my best friend in many ways",pt:"Conto com meu melhor amigo de várias formas"},
      {en:"I'm grateful for my partner more than ever",pt:"Sou grato pelo(a) meu(minha) parceiro(a) mais do que nunca"},
      {en:"I'm in love with my husband to be honest",pt:"Estou apaixonada pelo meu marido pra ser sincera"},
    ],
    phrasals: [
      {term:"I'm with / I'm in love with",desc:"'I'm with [pessoa]' = relação estabelecida (namoro, casamento, união). 'I'm in love with' = especificamente apaixonado(a) emocionalmente. Os dois sempre seguidos de pessoa.",ex:[
        {en:"I'm with my boyfriend for two years",pt:"Estou com meu namorado há dois anos"},
        {en:"I'm in love with my husband to be honest",pt:"Estou apaixonada pelo meu marido pra ser sincera"}
      ]},
      {term:"I'm crazy about",desc:"Forma intensa e informal pra dizer que é apaixonado. Mais forte que 'in love' e mais comum entre jovens. Sempre seguido de pessoa.",ex:[
        {en:"I'm crazy about my wife every day",pt:"Sou louco pela minha esposa todo dia"},
        {en:"I'm crazy about my partner more than ever",pt:"Sou louco pelo(a) meu(minha) parceiro(a) mais do que nunca"}
      ]},
      {term:"I miss",desc:"Pra falar de saudade. Sempre seguido direto da pessoa ('I miss her' / 'I miss my wife'). Não 'I miss OF', erro clássico do brasileiro.",ex:[
        {en:"I miss my best friend lately",pt:"Sinto falta do meu melhor amigo ultimamente"},
        {en:"I miss my girlfriend deeply",pt:"Sinto falta da minha namorada profundamente"}
      ]},
      {term:"I'm proud of",desc:"Pra expressar orgulho do parceiro. Sempre 'proud OF' (com 'of'). Funciona pra qualquer parente, parceiro, amigo. Soa carinhoso e maduro.",ex:[
        {en:"I'm proud of my husband honestly",pt:"Tenho orgulho do meu marido sinceramente"},
        {en:"I'm proud of my partner in many ways",pt:"Tenho orgulho do(a) meu(minha) parceiro(a) de várias formas"}
      ]},
      {term:"I really care about",desc:"Forma terna pra dizer que se importa. Menos intenso que 'in love with', mais profundo que 'like'. Sempre seguido de pessoa. Bom pra amizades também.",ex:[
        {en:"I really care about my girlfriend deeply",pt:"Me importo muito com minha namorada profundamente"},
        {en:"I really care about my best friend honestly",pt:"Me importo muito com meu melhor amigo sinceramente"}
      ]},
      {term:"I depend on / I'm grateful for",desc:"'Depend on' = contar com (apoio). 'Grateful for' = ser grato (sentimento). Os dois funcionam pra falar de quem te sustenta emocionalmente. Note as preposições: ON e FOR.",ex:[
        {en:"I depend on my best friend in many ways",pt:"Conto com meu melhor amigo de várias formas"},
        {en:"I'm grateful for my partner more than ever",pt:"Sou grato pelo(a) meu(minha) parceiro(a) mais do que nunca"}
      ]},
      {term:"for two years / since college",desc:"Marcadores de duração. 'For [tempo]' = quanto tempo passou ('for two years' = há dois anos). 'Since [marco]' = quando começou ('since college' = desde a faculdade). Mistura comum de erro do brasileiro.",ex:[
        {en:"I'm with my partner for two years",pt:"Estou com meu(minha) parceiro(a) há dois anos"},
        {en:"I'm in love with my husband since college",pt:"Estou apaixonada pelo meu marido desde a faculdade"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // FAMILY — Falar dos parentes (single-frame)
  // Frame: [feeling/relation verb] + [family member] + [intensifier]
  // Example: "I'm close to my mom in many ways"
  // ════════════════════════════════════════════
  "family": {
    title: "family",
    sub: "Apresentar & descrever",
    desc: "Frases pra falar dos seus familiares em inglês — proximidade, admiração, gratidão. Toque em qualquer item da coluna I e qualquer combinação forma uma frase real.",
    0: { replace:true, items:[
      {en:"I'm close to",pt:"Sou próximo(a) de",s:TRI},
      {en:"I'm proud of",pt:"Tenho orgulho de",s:TRI},
      {en:"I get along with",pt:"Me dou bem com",s:TRI},
      {en:"I look up to",pt:"Admiro",s:TRI},
      {en:"I admire",pt:"Admiro",s:TRI},
      {en:"I'm grateful for",pt:"Sou grato(a) por",s:TRI},
      {en:"I lean on",pt:"Conto com",s:TRI},
      {en:"I respect",pt:"Respeito",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"my mom",pt:"minha mãe",s:TRI},
      {en:"my dad",pt:"meu pai",s:TRI},
      {en:"my brother",pt:"meu irmão",s:TRI},
      {en:"my sister",pt:"minha irmã",s:TRI},
      {en:"my grandfather",pt:"meu avô",s:TRI},
      {en:"my best friend",pt:"meu(minha) melhor amigo(a)",s:TRI},
      {en:"my parents",pt:"meus pais",s:TRI},
      {en:"my kids",pt:"meus filhos",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"through everything",pt:"em qualquer situação",s:TRI},
      {en:"since childhood",pt:"desde a infância",s:TRI},
      {en:"these days",pt:"hoje em dia",s:TRI},
      {en:"no matter what",pt:"não importa o que",s:TRI},
      {en:"honestly",pt:"sinceramente",s:TRI},
      {en:"for everything",pt:"por tudo",s:TRI},
      {en:"in tough times",pt:"em momentos difíceis",s:TRI},
      {en:"in many ways",pt:"de várias formas",s:TRI},
      {en:"deeply",pt:"profundamente",s:TRI},
    ]},
    examples: [
      {en:"I'm close to my mom honestly",pt:"Sou próximo da minha mãe sinceramente"},
      {en:"I'm proud of my dad in many ways",pt:"Tenho orgulho do meu pai de várias formas"},
      {en:"I get along with my brother through everything",pt:"Me dou bem com meu irmão em qualquer situação"},
      {en:"I look up to my grandfather since childhood",pt:"Admiro meu avô desde a infância"},
      {en:"I admire my best friend deeply",pt:"Admiro meu melhor amigo profundamente"},
      {en:"I'm grateful for my parents for everything",pt:"Sou grato pelos meus pais por tudo"},
      {en:"I lean on my sister in tough times",pt:"Conto com minha irmã em momentos difíceis"},
      {en:"I respect my kids no matter what",pt:"Respeito meus filhos não importa o que"},
      {en:"I'm proud of my kids these days",pt:"Tenho orgulho dos meus filhos hoje em dia"},
    ],
    phrasals: [
      {term:"I'm close to / I'm proud of",desc:"As duas formas mais usadas pra descrever relação familiar. 'Close to' = laço emocional próximo. 'Proud of' = orgulho de quem alguém é ou do que conquistou. Sempre seguido de 'my + parente'.",ex:[
        {en:"I'm close to my mom honestly",pt:"Sou próximo da minha mãe sinceramente"},
        {en:"I'm proud of my dad in many ways",pt:"Tenho orgulho do meu pai de várias formas"}
      ]},
      {term:"I get along with",desc:"Relação tranquila, sem brigas. Diferente de 'close to' que é mais emocional. 'I get along with my brother' = a gente se dá bem (mas não necessariamente é íntimo). Forma negativa: 'I don't get along with'.",ex:[
        {en:"I get along with my brother through everything",pt:"Me dou bem com meu irmão em qualquer situação"},
        {en:"I get along with my sister these days",pt:"Me dou bem com minha irmã hoje em dia"}
      ]},
      {term:"I look up to / I admire",desc:"Pra falar de quem você admira. 'Look up to' tem a conexão de mentor/modelo (alguém mais velho ou mais experiente). 'Admire' é mais geral. Não confunda 'look up to' com 'look at' ou 'look after'.",ex:[
        {en:"I look up to my grandfather since childhood",pt:"Admiro meu avô desde a infância"},
        {en:"I admire my best friend deeply",pt:"Admiro meu melhor amigo profundamente"}
      ]},
      {term:"I'm grateful for",desc:"Pra expressar gratidão. Sempre seguido de 'FOR + objeto/pessoa'. 'I'm grateful TO my mom' (com 'to') também funciona, mas é menos comum. 'I'm grateful FOR my mom' soa mais natural.",ex:[
        {en:"I'm grateful for my parents for everything",pt:"Sou grato pelos meus pais por tudo"},
        {en:"I'm grateful for my kids every single day",pt:"Sou grato pelos meus filhos todos os dias"}
      ]},
      {term:"I lean on",desc:"Conto com (apoio emocional). 'Lean on' literalmente é 'apoiar-se em'. Pra família, significa que você confia naquela pessoa em momentos difíceis. Sempre seguido de pessoa.",ex:[
        {en:"I lean on my sister in tough times",pt:"Conto com minha irmã em momentos difíceis"},
        {en:"I lean on my best friend honestly",pt:"Conto com meu melhor amigo sinceramente"}
      ]},
      {term:"I respect",desc:"Respeito (pessoa, decisão, autoridade). Mais formal que 'admire'. Funciona com qualquer parente. 'I respect my dad' significa que você reconhece o valor dele e a posição dele.",ex:[
        {en:"I respect my dad no matter what",pt:"Respeito meu pai não importa o que"},
        {en:"I respect my kids in many ways",pt:"Respeito meus filhos de várias formas"}
      ]},
      {term:"in tough times / through everything",desc:"Fechadores que dão peso emocional à frase. 'In tough times' = nos momentos difíceis. 'Through everything' = em qualquer situação. Ambos transformam a frase de declaração em testemunho.",ex:[
        {en:"I lean on my best friend in tough times",pt:"Conto com meu melhor amigo em momentos difíceis"},
        {en:"I get along with my sister through everything",pt:"Me dou bem com minha irmã em qualquer situação"}
      ]},
    ]
  },

};

})();
