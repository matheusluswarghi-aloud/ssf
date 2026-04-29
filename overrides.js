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
    sub: "Sintomas, consulta & remédio",
    desc: "Pra navegar saúde em inglês — descrever sintoma, marcar consulta, pegar receita, falar de alergia. Cada opener abre uma cena de saúde.",
    tree: [
      // Sintoma direto
      { en:"I have", pt:"Tenho", colII:[
        { en:"a headache", pt:"dor de cabeça", colIII:[
          {en:"since this morning",pt:"desde de manhã"},
          {en:"for two days",pt:"há dois dias"},
          {en:"on and off",pt:"que vai e vem"},
          {en:"really bad",pt:"bem forte"},
        ]},
        { en:"a fever", pt:"febre", colIII:[
          {en:"of 38 degrees",pt:"de 38 graus"},
          {en:"since last night",pt:"desde ontem à noite"},
          {en:"for two days",pt:"há dois dias"},
          {en:"on and off",pt:"que vai e vem"},
        ]},
        { en:"a cough", pt:"tosse", colIII:[
          {en:"that won't go away",pt:"que não passa"},
          {en:"mostly at night",pt:"mais à noite"},
          {en:"with phlegm",pt:"com catarro"},
          {en:"for a week",pt:"há uma semana"},
        ]},
        { en:"a sore throat", pt:"dor de garganta", colIII:[
          {en:"since yesterday",pt:"desde ontem"},
          {en:"really bad",pt:"bem forte"},
          {en:"when I swallow",pt:"quando engulo"},
          {en:"and it hurts to talk",pt:"e dói pra falar"},
        ]},
        { en:"a stomachache", pt:"dor de estômago", colIII:[
          {en:"after eating",pt:"depois de comer"},
          {en:"on and off",pt:"que vai e vem"},
          {en:"since this morning",pt:"desde de manhã"},
          {en:"with nausea",pt:"com náusea"},
        ]},
      ]},

      // Estado/sentimento
      { en:"I'm feeling", pt:"Estou me sentindo", colII:[
        { en:"dizzy", pt:"tonto(a)", colIII:[
          {en:"when I stand up",pt:"quando levanto"},
          {en:"all morning",pt:"a manhã toda"},
          {en:"and weak",pt:"e fraco"},
          {en:"out of nowhere",pt:"do nada"},
        ]},
        { en:"nauseous", pt:"enjoado(a)", colIII:[
          {en:"after eating",pt:"depois de comer"},
          {en:"all day",pt:"o dia todo"},
          {en:"on and off",pt:"que vai e vem"},
          {en:"and I might throw up",pt:"e acho que vou vomitar"},
        ]},
        { en:"weak", pt:"fraco(a)", colIII:[
          {en:"all day",pt:"o dia todo"},
          {en:"after the meds",pt:"depois do remédio"},
          {en:"and tired",pt:"e cansado"},
          {en:"lately",pt:"ultimamente"},
        ]},
        { en:"better", pt:"melhor", colIII:[
          {en:"today",pt:"hoje"},
          {en:"after the meds",pt:"depois do remédio"},
          {en:"than yesterday",pt:"do que ontem"},
          {en:"but not 100%",pt:"mas não 100%"},
        ]},
        { en:"worse", pt:"pior", colIII:[
          {en:"than yesterday",pt:"do que ontem"},
          {en:"after the meds",pt:"depois do remédio"},
          {en:"in the morning",pt:"de manhã"},
          {en:"every day",pt:"todo dia"},
        ]},
      ]},

      // Marcar consulta
      { en:"I'd like to make", pt:"Quero marcar", colII:[
        { en:"an appointment", pt:"uma consulta", colIII:[
          {en:"for tomorrow",pt:"pra amanhã"},
          {en:"next week",pt:"semana que vem"},
          {en:"as soon as possible",pt:"o quanto antes"},
          {en:"with Dr. Smith",pt:"com o Dr. Smith"},
        ]},
        { en:"a checkup", pt:"um check-up", colIII:[
          {en:"this month",pt:"esse mês"},
          {en:"for my annual exam",pt:"pro meu exame anual"},
          {en:"next week",pt:"semana que vem"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"a follow-up", pt:"um retorno", colIII:[
          {en:"in two weeks",pt:"em duas semanas"},
          {en:"after the test",pt:"depois do exame"},
          {en:"with Dr. Smith",pt:"com o Dr. Smith"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Chegada na clínica
      { en:"I'm here for", pt:"Estou aqui pra", colII:[
        { en:"my appointment", pt:"minha consulta", colIII:[
          {en:"with Dr. Smith",pt:"com o Dr. Smith"},
          {en:"at 3",pt:"das 3"},
          {en:"I scheduled yesterday",pt:"que marquei ontem"},
          {en:"for a checkup",pt:"pra um check-up"},
        ]},
        { en:"a checkup", pt:"um check-up", colIII:[
          {en:"with Dr. Smith",pt:"com o Dr. Smith"},
          {en:"my annual one",pt:"o anual"},
          {en:"at 10",pt:"das 10"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"blood work", pt:"exame de sangue", colIII:[
          {en:"that my doctor ordered",pt:"que meu médico pediu"},
          {en:"fasting",pt:"em jejum"},
          {en:"this morning",pt:"essa manhã"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"a follow-up", pt:"um retorno", colIII:[
          {en:"with Dr. Smith",pt:"com o Dr. Smith"},
          {en:"after my last visit",pt:"depois da última consulta"},
          {en:"at 2",pt:"das 2"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Receita / remédio
      { en:"I need a refill", pt:"Preciso renovar a receita", colII:[
        { en:"of my prescription", pt:"do meu remédio", colIII:[
          {en:"for 30 days",pt:"por 30 dias"},
          {en:"by Friday",pt:"até sexta"},
          {en:"at this pharmacy",pt:"nessa farmácia"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"for my blood pressure meds", pt:"do remédio de pressão", colIII:[
          {en:"for 30 days",pt:"por 30 dias"},
          {en:"the same dose",pt:"a mesma dose"},
          {en:"by tomorrow",pt:"até amanhã"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"for my inhaler", pt:"da bombinha", colIII:[
          {en:"by Friday",pt:"até sexta"},
          {en:"two units",pt:"duas unidades"},
          {en:"at this pharmacy",pt:"nessa farmácia"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Localização da dor
      { en:"It hurts when", pt:"Dói quando", colII:[
        { en:"I move", pt:"eu me mexo", colIII:[
          {en:"my arm",pt:"o braço"},
          {en:"my neck",pt:"o pescoço"},
          {en:"this way",pt:"pra esse lado"},
          {en:"a lot",pt:"muito"},
        ]},
        { en:"I breathe", pt:"eu respiro", colIII:[
          {en:"deeply",pt:"fundo"},
          {en:"in cold air",pt:"ar frio"},
          {en:"on my left side",pt:"do lado esquerdo"},
          {en:"a little",pt:"um pouco"},
        ]},
        { en:"I touch it", pt:"eu encosto", colIII:[
          {en:"here",pt:"aqui"},
          {en:"on this side",pt:"desse lado"},
          {en:"a little",pt:"um pouco"},
          {en:"a lot",pt:"muito"},
        ]},
        { en:"I walk", pt:"eu ando", colIII:[
          {en:"a lot",pt:"muito"},
          {en:"upstairs",pt:"escada acima"},
          {en:"on my right knee",pt:"no joelho direito"},
          {en:"after a while",pt:"depois de um tempo"},
        ]},
      ]},

      // Alergia
      { en:"I'm allergic to", pt:"Sou alérgico(a) a", colII:[
        { en:"peanuts", pt:"amendoim", colIII:[
          {en:"and my throat closes up",pt:"e minha garganta fecha"},
          {en:"and I get hives",pt:"e fico com urticária"},
          {en:"so I can't take that",pt:"então não posso tomar isso"},
          {en:"please warn the kitchen",pt:"avisem a cozinha"},
        ]},
        { en:"penicillin", pt:"penicilina", colIII:[
          {en:"so I can't take that",pt:"então não posso tomar isso"},
          {en:"and I get a rash",pt:"e fico com manchas"},
          {en:"please prescribe something else",pt:"prescreva outra coisa"},
          {en:"please note in my chart",pt:"anota no prontuário"},
        ]},
        { en:"shellfish", pt:"frutos do mar", colIII:[
          {en:"and my throat closes up",pt:"e minha garganta fecha"},
          {en:"so I can't eat that",pt:"então não posso comer isso"},
          {en:"please warn the kitchen",pt:"avisem a cozinha"},
          {en:"and I carry an EpiPen",pt:"e ando com adrenalina"},
        ]},
        { en:"dairy", pt:"laticínios", colIII:[
          {en:"so I can't have that",pt:"então não posso consumir"},
          {en:"and I get stomach pain",pt:"e tenho dor no estômago"},
          {en:"is there a substitute?",pt:"tem alguma alternativa?"},
          {en:"please warn the kitchen",pt:"avisem a cozinha"},
        ]},
      ]},
    ],
    examples: [
      {en:"I have a headache since this morning",pt:"Tenho dor de cabeça desde de manhã"},
      {en:"I'm feeling dizzy when I stand up",pt:"Estou me sentindo tonto quando levanto"},
      {en:"I'd like to make an appointment with Dr. Smith",pt:"Quero marcar uma consulta com o Dr. Smith"},
      {en:"I'm here for my appointment with Dr. Smith",pt:"Estou aqui pra minha consulta com o Dr. Smith"},
      {en:"I need a refill of my prescription for 30 days",pt:"Preciso renovar minha receita por 30 dias"},
      {en:"It hurts when I breathe deeply",pt:"Dói quando respiro fundo"},
      {en:"I'm allergic to penicillin so I can't take that",pt:"Sou alérgico a penicilina então não posso tomar"},
      {en:"I have a fever of 38 degrees",pt:"Tenho febre de 38 graus"},
      {en:"I'm feeling worse than yesterday",pt:"Estou me sentindo pior do que ontem"},
    ],
    phrasals: [
      {term:"I have / I'm feeling",desc:"'I have' descreve um sintoma físico ('a headache', 'a fever' — sempre com 'a/an'). 'I'm feeling' descreve um estado/sensação ('dizzy', 'nauseous' — sem artigo). NÃO confunda: 'I have dizzy' está errado; é 'I'm feeling dizzy'.",ex:[
        {en:"I have a headache since this morning",pt:"Tenho dor de cabeça desde de manhã"},
        {en:"I'm feeling dizzy when I stand up",pt:"Estou tonto quando levanto"}
      ]},
      {term:"I'd like to make an appointment",desc:"Frase exata pra marcar consulta. SEMPRE 'make AN appointment' (com 'an'). Combine com 'for [data]' / 'with Dr. [nome]' / 'as soon as possible'. 'Schedule' funciona como sinônimo formal.",ex:[
        {en:"I'd like to make an appointment for tomorrow",pt:"Quero marcar uma consulta pra amanhã"},
        {en:"I'd like to make an appointment with Dr. Smith",pt:"Quero marcar uma consulta com o Dr. Smith"}
      ]},
      {term:"I'm here for",desc:"Pra checar in na recepção da clínica. 'I'm here FOR my appointment' (com 'for'). Funciona pra qualquer compromisso médico: appointment, checkup, blood work, follow-up.",ex:[
        {en:"I'm here for my appointment at 3",pt:"Estou aqui pra minha consulta das 3"},
        {en:"I'm here for blood work fasting",pt:"Estou aqui pra exame de sangue em jejum"}
      ]},
      {term:"I need a refill",desc:"Pra renovar receita. 'Refill' = renovação. SEMPRE 'a refill OF my prescription' (com 'of'). 'For [duração]' = pra quantos dias. 'At this pharmacy' = nesta farmácia. Termos americanos comuns.",ex:[
        {en:"I need a refill of my prescription for 30 days",pt:"Preciso renovar minha receita por 30 dias"},
        {en:"I need a refill for my inhaler by Friday",pt:"Preciso renovar a bombinha até sexta"}
      ]},
      {term:"It hurts when",desc:"Frase-chave pra médico identificar dor. 'Hurts WHEN [ação]' = dói quando [ação]. Sempre presente simples no que vem depois: 'I move' / 'I breathe' / 'I touch it'. NÃO use gerúndio ('when moving' soa estranho aqui).",ex:[
        {en:"It hurts when I breathe deeply",pt:"Dói quando respiro fundo"},
        {en:"It hurts when I move my neck",pt:"Dói quando movo o pescoço"}
      ]},
      {term:"I'm allergic to",desc:"Pra declarar alergia. SEMPRE 'allergic TO' (com 'to'). Sem artigo no item: 'allergic to peanuts' / 'to penicillin' / 'to dairy'. Combine com a reação: 'and my throat closes up' / 'and I get hives'.",ex:[
        {en:"I'm allergic to peanuts and my throat closes up",pt:"Sou alérgico a amendoim e minha garganta fecha"},
        {en:"I'm allergic to penicillin so I can't take that",pt:"Sou alérgico a penicilina então não posso tomar"}
      ]},
      {term:"since / for / on and off",desc:"Marcadores de duração — críticos pra médico. 'Since [marco]' = desde quando começou ('since this morning'). 'For [tempo]' = quanto tempo dura ('for two days'). 'On and off' = vai e vem (intermitente).",ex:[
        {en:"I have a fever for two days",pt:"Tenho febre há dois dias"},
        {en:"I have a stomachache on and off",pt:"Tenho dor de estômago que vai e vem"}
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
    sub: "Projeto, vaga & reunião",
    desc: "Pra navegar trabalho em inglês — projeto atual, candidatura, folga, reunião, salário. Cada opener abre uma cena profissional.",
    tree: [
      // Tarefa atual
      { en:"I'm working on", pt:"Estou trabalhando em", colII:[
        { en:"a new project", pt:"um novo projeto", colIII:[
          {en:"for next Monday",pt:"pra segunda que vem"},
          {en:"with the team",pt:"com o time"},
          {en:"by myself",pt:"sozinho"},
          {en:"that I'll present soon",pt:"que vou apresentar logo"},
        ]},
        { en:"a presentation", pt:"uma apresentação", colIII:[
          {en:"for tomorrow",pt:"pra amanhã"},
          {en:"for the client",pt:"pro cliente"},
          {en:"for the all-hands",pt:"pra reunião geral"},
          {en:"and I need feedback",pt:"e preciso de feedback"},
        ]},
        { en:"the report", pt:"o relatório", colIII:[
          {en:"due Friday",pt:"que vence sexta"},
          {en:"for the manager",pt:"pro gerente"},
          {en:"on the Q3 numbers",pt:"sobre os números do Q3"},
          {en:"and I'm almost done",pt:"e estou quase pronto"},
        ]},
        { en:"fixing this bug", pt:"corrigir esse bug", colIII:[
          {en:"it's blocking the team",pt:"tá bloqueando o time"},
          {en:"and it's tricky",pt:"e tá difícil"},
          {en:"with another dev",pt:"com outro dev"},
          {en:"by end of day",pt:"até o fim do dia"},
        ]},
      ]},

      // Candidatura
      { en:"I'd like to apply for", pt:"Quero me candidatar a", colII:[
        { en:"this position", pt:"essa vaga", colIII:[
          {en:"that you posted",pt:"que vocês publicaram"},
          {en:"on LinkedIn",pt:"no LinkedIn"},
          {en:"by Friday",pt:"até sexta"},
          {en:"if it's still open",pt:"se ainda estiver aberta"},
        ]},
        { en:"a promotion", pt:"uma promoção", colIII:[
          {en:"to senior",pt:"a sênior"},
          {en:"in this team",pt:"nessa equipe"},
          {en:"this cycle",pt:"esse ciclo"},
          {en:"and I'd like to discuss",pt:"e queria conversar"},
        ]},
        { en:"the open role", pt:"a vaga aberta", colIII:[
          {en:"on your team",pt:"no seu time"},
          {en:"in marketing",pt:"em marketing"},
          {en:"that I saw posted",pt:"que vi anunciada"},
          {en:"if you have a referral",pt:"se você puder indicar"},
        ]},
        { en:"a remote job", pt:"um trabalho remoto", colIII:[
          {en:"with your company",pt:"na sua empresa"},
          {en:"that's posted",pt:"que tá publicada"},
          {en:"by next week",pt:"até semana que vem"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Folga
      { en:"Can I take", pt:"Posso tirar", colII:[
        { en:"tomorrow off", pt:"folga amanhã", colIII:[
          {en:"I'll work Monday instead",pt:"pego segunda no lugar"},
          {en:"please",pt:"por favor"},
          {en:"I have a personal thing",pt:"tenho um compromisso"},
          {en:"my tasks are caught up",pt:"minhas tarefas estão em dia"},
        ]},
        { en:"a vacation day", pt:"um dia de férias", colIII:[
          {en:"next Friday",pt:"sexta que vem"},
          {en:"in two weeks",pt:"em duas semanas"},
          {en:"please",pt:"por favor"},
          {en:"I have nothing critical",pt:"não tenho nada crítico"},
        ]},
        { en:"a sick day", pt:"um atestado", colIII:[
          {en:"today",pt:"hoje"},
          {en:"I'm not feeling well",pt:"não estou me sentindo bem"},
          {en:"and work from home tomorrow",pt:"e trabalhar de casa amanhã"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"a long lunch", pt:"um almoço prolongado", colIII:[
          {en:"on Tuesday",pt:"na terça"},
          {en:"for an appointment",pt:"pra uma consulta"},
          {en:"I'll be back by 2",pt:"volto às 2"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Agenda / reunião
      { en:"I have a meeting", pt:"Tenho uma reunião", colII:[
        { en:"at 3", pt:"às 3", colIII:[
          {en:"that I can't move",pt:"que não dá pra mexer"},
          {en:"with the client",pt:"com o cliente"},
          {en:"for one hour",pt:"de uma hora"},
          {en:"on the project",pt:"sobre o projeto"},
        ]},
        { en:"tomorrow", pt:"amanhã", colIII:[
          {en:"at 10",pt:"às 10"},
          {en:"with my manager",pt:"com meu gestor"},
          {en:"about my goals",pt:"sobre minhas metas"},
          {en:"that I need to prep for",pt:"que preciso preparar"},
        ]},
        { en:"with the client", pt:"com o cliente", colIII:[
          {en:"at 4",pt:"às 4"},
          {en:"to review the proposal",pt:"pra revisar a proposta"},
          {en:"in person",pt:"presencial"},
          {en:"I can't move",pt:"que não dá pra mexer"},
        ]},
        { en:"with my manager", pt:"com meu gestor", colIII:[
          {en:"at 11",pt:"às 11"},
          {en:"about my career",pt:"sobre minha carreira"},
          {en:"for my 1-on-1",pt:"pra nossa 1-on-1"},
          {en:"that I shouldn't miss",pt:"que não posso perder"},
        ]},
      ]},

      // Indisponibilidade
      { en:"I'm not available", pt:"Não estou disponível", colII:[
        { en:"this afternoon", pt:"essa tarde", colIII:[
          {en:"because I have a meeting",pt:"porque tenho reunião"},
          {en:"can we move it to tomorrow?",pt:"podemos passar pra amanhã?"},
          {en:"sorry",pt:"desculpa"},
        ]},
        { en:"on Friday", pt:"na sexta", colIII:[
          {en:"I'm taking the day off",pt:"vou tirar folga"},
          {en:"can we reschedule?",pt:"podemos remarcar?"},
          {en:"please find another time",pt:"escolha outro horário"},
        ]},
        { en:"next week", pt:"semana que vem", colIII:[
          {en:"I'll be on vacation",pt:"estarei de férias"},
          {en:"please",pt:"por favor"},
          {en:"can we do the week after?",pt:"podemos na seguinte?"},
        ]},
        { en:"for the rest of today", pt:"pelo resto de hoje", colIII:[
          {en:"back-to-back meetings",pt:"reuniões em cima"},
          {en:"can we talk tomorrow?",pt:"podemos falar amanhã?"},
          {en:"sorry",pt:"desculpa"},
        ]},
      ]},

      // Conversar com gestor
      { en:"I'd like to discuss", pt:"Quero conversar sobre", colII:[
        { en:"my salary", pt:"meu salário", colIII:[
          {en:"in our next 1-on-1",pt:"na nossa próxima 1-on-1"},
          {en:"when you have time",pt:"quando você tiver tempo"},
          {en:"privately",pt:"em particular"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"a raise", pt:"um aumento", colIII:[
          {en:"this cycle",pt:"esse ciclo"},
          {en:"based on my performance",pt:"com base na minha performance"},
          {en:"in our next 1-on-1",pt:"na nossa próxima 1-on-1"},
          {en:"privately",pt:"em particular"},
        ]},
        { en:"the project timeline", pt:"o prazo do projeto", colIII:[
          {en:"with the team",pt:"com o time"},
          {en:"in our next sync",pt:"no próximo sync"},
          {en:"because it's tight",pt:"porque está apertado"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"my responsibilities", pt:"minhas responsabilidades", colIII:[
          {en:"in our next 1-on-1",pt:"na nossa próxima 1-on-1"},
          {en:"and the scope",pt:"e o escopo"},
          {en:"when you have time",pt:"quando você tiver tempo"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Conclusão
      { en:"I just finished", pt:"Acabei de terminar", colII:[
        { en:"the report", pt:"o relatório", colIII:[
          {en:"and I'm sending it now",pt:"e estou mandando agora"},
          {en:"and I need feedback",pt:"e preciso de feedback"},
          {en:"for review",pt:"pra revisão"},
          {en:"please take a look",pt:"por favor dá uma olhada"},
        ]},
        { en:"the presentation", pt:"a apresentação", colIII:[
          {en:"and I'm ready to present",pt:"e estou pronto pra apresentar"},
          {en:"please review the slides",pt:"por favor revise os slides"},
          {en:"earlier than expected",pt:"antes do esperado"},
          {en:"and I'm free for next steps",pt:"e estou livre pra próximos passos"},
        ]},
        { en:"my tasks", pt:"minhas tarefas", colIII:[
          {en:"so I'm free",pt:"então estou livre"},
          {en:"earlier than expected",pt:"antes do esperado"},
          {en:"what's next?",pt:"qual o próximo?"},
          {en:"please assign more",pt:"por favor passe mais"},
        ]},
        { en:"the client call", pt:"a call com o cliente", colIII:[
          {en:"it went well",pt:"foi bem"},
          {en:"and they have feedback",pt:"e eles têm feedback"},
          {en:"want a quick recap?",pt:"quer um resumo rápido?"},
          {en:"so I'm sending notes",pt:"vou mandar a ata"},
        ]},
      ]},

      // Pontos fortes
      { en:"I excel", pt:"Sou bom(a)", colII:[
        { en:"at presenting", pt:"em apresentar", colIII:[
          {en:"in front of clients",pt:"pra clientes"},
          {en:"to large audiences",pt:"pra plateias grandes"},
          {en:"on technical topics",pt:"em temas técnicos"},
          {en:"under pressure",pt:"sob pressão"},
        ]},
        { en:"at this role", pt:"nesse cargo", colIII:[
          {en:"because I love the work",pt:"porque amo o trabalho"},
          {en:"based on the feedback",pt:"baseado no feedback"},
          {en:"and I'm ready for more",pt:"e estou pronto pra mais"},
          {en:"with this team",pt:"com esse time"},
        ]},
        { en:"under pressure", pt:"sob pressão", colIII:[
          {en:"when deadlines hit",pt:"quando o prazo aperta"},
          {en:"on tight timelines",pt:"em prazos apertados"},
          {en:"with the right team",pt:"com o time certo"},
          {en:"and I stay focused",pt:"e mantenho o foco"},
        ]},
        { en:"at my job", pt:"no que faço", colIII:[
          {en:"based on my reviews",pt:"baseado nas minhas avaliações"},
          {en:"in this team",pt:"nessa equipe"},
          {en:"because I love what I do",pt:"porque amo o que faço"},
          {en:"and I deliver consistently",pt:"e entrego consistentemente"},
        ]},
        { en:"with new tools", pt:"com ferramentas novas", colIII:[
          {en:"once I learn them",pt:"depois que aprendo"},
          {en:"in any tech stack",pt:"em qualquer stack"},
          {en:"and I learn fast",pt:"e aprendo rápido"},
          {en:"so onboarding is smooth",pt:"então o onboarding é tranquilo"},
        ]},
      ]},
    ],
    examples: [
      {en:"I'm working on a new project for next Monday",pt:"Estou trabalhando num projeto pra segunda que vem"},
      {en:"I'd like to apply for this position by Friday",pt:"Quero me candidatar a essa vaga até sexta"},
      {en:"Can I take tomorrow off please",pt:"Posso tirar folga amanhã por favor"},
      {en:"I have a meeting at 3 with the client",pt:"Tenho reunião às 3 com o cliente"},
      {en:"I'm not available this afternoon because I have a meeting",pt:"Não estou disponível essa tarde porque tenho reunião"},
      {en:"I'd like to discuss my salary in our next 1-on-1",pt:"Quero conversar sobre meu salário na nossa próxima 1-on-1"},
      {en:"I just finished the report and I need feedback",pt:"Acabei o relatório e preciso de feedback"},
      {en:"I excel at presenting in front of clients",pt:"Sou bom em apresentar pra clientes"},
      {en:"I excel under pressure when deadlines hit",pt:"Sou bom sob pressão quando o prazo aperta"},
    ],
    phrasals: [
      {term:"I'm working on",desc:"Pra status atual de tarefa. 'Working ON [item]' (com 'on'). Funciona pra projeto, apresentação, relatório, bug. Combine com prazo: 'for next Monday' / 'due Friday'.",ex:[
        {en:"I'm working on a new project for next Monday",pt:"Estou trabalhando num projeto pra segunda que vem"},
        {en:"I'm working on the report due Friday",pt:"Estou trabalhando no relatório que vence sexta"}
      ]},
      {term:"I'd like to apply for",desc:"Frase formal pra candidatura. SEMPRE 'apply FOR' (com 'for'). 'A position' / 'a promotion' / 'the open role' / 'a remote job'. Erro clássico: 'apply to' (errado pra vaga; 'apply to' é só pra escolas).",ex:[
        {en:"I'd like to apply for this position by Friday",pt:"Quero me candidatar a essa vaga até sexta"},
        {en:"I'd like to apply for a promotion this cycle",pt:"Quero me candidatar a uma promoção esse ciclo"}
      ]},
      {term:"Can I take [time] off",desc:"Pra pedir folga ao gestor. Estrutura clássica: 'take [tempo] OFF' (com 'off'). 'Tomorrow off' / 'a day off' / 'the morning off'. 'A sick day' = atestado. 'A vacation day' = dia de férias.",ex:[
        {en:"Can I take tomorrow off please",pt:"Posso tirar folga amanhã por favor"},
        {en:"Can I take a sick day today",pt:"Posso tirar atestado hoje"}
      ]},
      {term:"I'm not available / I have a meeting",desc:"Pra dizer que não pode falar/encontrar. 'Not available' = indisponível (sem 'not free'). 'I have a meeting AT [hora]' / 'WITH [pessoa]' / 'ABOUT [tópico]'. Sempre 'AT 3', não 'in 3'.",ex:[
        {en:"I'm not available this afternoon",pt:"Não estou disponível essa tarde"},
        {en:"I have a meeting at 3 with the client",pt:"Tenho reunião às 3 com o cliente"}
      ]},
      {term:"I'd like to discuss",desc:"Pra abrir conversa séria com gestor. 'Discuss' = discutir, conversar (não confunda com discussão acalorada). Sempre 'discuss [substantivo]' (sem 'about'). Erro clássico: 'discuss about my salary' (errado).",ex:[
        {en:"I'd like to discuss my salary in our next 1-on-1",pt:"Quero conversar sobre meu salário na nossa próxima 1-on-1"},
        {en:"I'd like to discuss a raise this cycle",pt:"Quero conversar sobre um aumento esse ciclo"}
      ]},
      {term:"I just finished",desc:"Pra reportar conclusão recente. 'Just finished' = acabei de terminar. SEMPRE 'finished + substantivo' (objeto direto, sem preposição). 'Finished the report' / 'finished my tasks' / 'finished the call'.",ex:[
        {en:"I just finished the report and I need feedback",pt:"Acabei o relatório e preciso de feedback"},
        {en:"I just finished my tasks so I'm free",pt:"Acabei minhas tarefas então estou livre"}
      ]},
      {term:"I excel",desc:"Pra falar de pontos fortes (entrevista, review). 'Excel AT [coisa]' = sou bom em. 'Excel UNDER [condição]' = me destaco sob (pressão, prazo). Não exagere — só use quando souber sustentar com exemplo.",ex:[
        {en:"I excel at presenting in front of clients",pt:"Sou bom em apresentar pra clientes"},
        {en:"I excel under pressure when deadlines hit",pt:"Sou bom sob pressão quando o prazo aperta"}
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
    sub: "Curso, aula & dúvida",
    desc: "Pra navegar estudos em inglês — matrícula, foco, inscrição, faltas, dúvidas. Cada opener abre uma cena de estudante.",
    tree: [
      // Matrícula
      { en:"I'm enrolled in", pt:"Estou matriculado em", colII:[
        { en:"an English course", pt:"um curso de inglês", colIII:[
          {en:"for two semesters",pt:"por dois semestres"},
          {en:"part-time",pt:"meio período"},
          {en:"online",pt:"online"},
          {en:"starting next month",pt:"a partir do próximo mês"},
        ]},
        { en:"a master's program", pt:"um mestrado", colIII:[
          {en:"at FGV",pt:"na FGV"},
          {en:"in business",pt:"em administração"},
          {en:"part-time",pt:"meio período"},
          {en:"that takes two years",pt:"que dura dois anos"},
        ]},
        { en:"online classes", pt:"aulas online", colIII:[
          {en:"on weekdays",pt:"em dias de semana"},
          {en:"in the evenings",pt:"à noite"},
          {en:"with live lectures",pt:"com aulas ao vivo"},
          {en:"and a final project",pt:"e um projeto final"},
        ]},
        { en:"a certificate", pt:"uma certificação", colIII:[
          {en:"in marketing",pt:"em marketing"},
          {en:"on Coursera",pt:"no Coursera"},
          {en:"that takes 6 months",pt:"de 6 meses"},
          {en:"for my career",pt:"pra minha carreira"},
        ]},
      ]},

      // Foco/área
      { en:"I'm studying", pt:"Estou estudando", colII:[
        { en:"English", pt:"inglês", colIII:[
          {en:"at home",pt:"em casa"},
          {en:"with a tutor",pt:"com tutor"},
          {en:"two hours a day",pt:"duas horas por dia"},
          {en:"to fluency",pt:"até a fluência"},
        ]},
        { en:"for the test", pt:"pra prova", colIII:[
          {en:"next week",pt:"semana que vem"},
          {en:"every night",pt:"toda noite"},
          {en:"with a study group",pt:"com um grupo de estudo"},
          {en:"all by myself",pt:"sozinho"},
        ]},
        { en:"abroad", pt:"no exterior", colIII:[
          {en:"in the US",pt:"nos EUA"},
          {en:"for one year",pt:"por um ano"},
          {en:"on a scholarship",pt:"com bolsa"},
          {en:"and loving it",pt:"e adorando"},
        ]},
        { en:"business", pt:"administração", colIII:[
          {en:"at the university",pt:"na faculdade"},
          {en:"online",pt:"online"},
          {en:"for two more years",pt:"por mais dois anos"},
          {en:"and working at the same time",pt:"e trabalhando junto"},
        ]},
      ]},

      // Inscrição
      { en:"I'd like to sign up for", pt:"Quero me inscrever em", colII:[
        { en:"a class", pt:"uma aula", colIII:[
          {en:"for next month",pt:"pra próximo mês"},
          {en:"online",pt:"online"},
          {en:"in person",pt:"presencial"},
          {en:"for beginners",pt:"pra iniciantes"},
        ]},
        { en:"a workshop", pt:"um workshop", colIII:[
          {en:"on writing",pt:"de escrita"},
          {en:"this Saturday",pt:"esse sábado"},
          {en:"for a weekend",pt:"de um fim de semana"},
          {en:"if there's space",pt:"se tiver vaga"},
        ]},
        { en:"the next term", pt:"o próximo módulo", colIII:[
          {en:"in advanced English",pt:"de inglês avançado"},
          {en:"starting in March",pt:"começando em março"},
          {en:"if it's still open",pt:"se ainda estiver aberto"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"a private tutor", pt:"um professor particular", colIII:[
          {en:"for one-on-one",pt:"pra aula individual"},
          {en:"twice a week",pt:"duas vezes por semana"},
          {en:"online",pt:"online"},
          {en:"for next month",pt:"pra próximo mês"},
        ]},
      ]},

      // Faltas / atraso
      { en:"I missed", pt:"Perdi", colII:[
        { en:"the class", pt:"a aula", colIII:[
          {en:"because I was sick",pt:"porque tava doente"},
          {en:"yesterday",pt:"ontem"},
          {en:"and I need to make it up",pt:"e preciso recuperar"},
          {en:"do you have notes?",pt:"você tem o material?"},
        ]},
        { en:"the deadline", pt:"o prazo", colIII:[
          {en:"by one day",pt:"por um dia"},
          {en:"can I get an extension?",pt:"posso pedir prorrogação?"},
          {en:"because of an emergency",pt:"por causa de uma emergência"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"the test", pt:"a prova", colIII:[
          {en:"because I was sick",pt:"porque tava doente"},
          {en:"and I have a doctor's note",pt:"e tenho atestado"},
          {en:"can I retake it?",pt:"posso refazer?"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"the email", pt:"o e-mail", colIII:[
          {en:"about the assignment",pt:"sobre a tarefa"},
          {en:"can you forward it?",pt:"pode encaminhar?"},
          {en:"with the deadline",pt:"com o prazo"},
          {en:"sorry",pt:"desculpa"},
        ]},
      ]},

      // Tarefa em andamento
      { en:"I have an assignment", pt:"Tenho uma tarefa", colII:[
        { en:"due tomorrow", pt:"pra amanhã", colIII:[
          {en:"on climate change",pt:"sobre mudança climática"},
          {en:"that I haven't started",pt:"que ainda não comecei"},
          {en:"5 pages long",pt:"de 5 páginas"},
          {en:"and I'm stressed",pt:"e estou estressado"},
        ]},
        { en:"due Friday", pt:"pra sexta", colIII:[
          {en:"for English class",pt:"da aula de inglês"},
          {en:"that I'm halfway through",pt:"que tô na metade"},
          {en:"and I need help",pt:"e preciso de ajuda"},
          {en:"can you review?",pt:"pode revisar?"},
        ]},
        { en:"I haven't started", pt:"que não comecei", colIII:[
          {en:"and the deadline is Friday",pt:"e o prazo é sexta"},
          {en:"on a topic I don't understand",pt:"sobre um tema que não entendo"},
          {en:"and I'm stuck",pt:"e tô travado"},
          {en:"any tips?",pt:"alguma dica?"},
        ]},
        { en:"I'm still working on", pt:"que ainda estou fazendo", colIII:[
          {en:"and need feedback",pt:"e preciso de feedback"},
          {en:"due tomorrow",pt:"pra amanhã"},
          {en:"that's almost done",pt:"que tá quase pronta"},
          {en:"can you take a look?",pt:"pode dar uma olhada?"},
        ]},
      ]},

      // Dúvida pro professor
      { en:"Can you explain", pt:"Pode explicar", colII:[
        { en:"this exercise", pt:"esse exercício", colIII:[
          {en:"again",pt:"de novo"},
          {en:"slowly",pt:"devagar"},
          {en:"step by step",pt:"passo a passo"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"what's on the test", pt:"o que cai na prova", colIII:[
          {en:"please",pt:"por favor"},
          {en:"in detail",pt:"em detalhe"},
          {en:"so I can study",pt:"pra eu poder estudar"},
        ]},
        { en:"what we did last class", pt:"o que fizemos na última aula", colIII:[
          {en:"because I missed it",pt:"porque eu perdi"},
          {en:"in summary",pt:"em resumo"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"the homework", pt:"a tarefa de casa", colIII:[
          {en:"again",pt:"de novo"},
          {en:"with an example",pt:"com um exemplo"},
          {en:"step by step",pt:"passo a passo"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Meta / esforço
      { en:"I'm trying to", pt:"Estou tentando", colII:[
        { en:"improve my English", pt:"melhorar meu inglês", colIII:[
          {en:"by the end of the year",pt:"até o fim do ano"},
          {en:"to fluency",pt:"até a fluência"},
          {en:"with daily practice",pt:"com prática diária"},
          {en:"on my own",pt:"sozinho"},
        ]},
        { en:"get my certificate", pt:"tirar meu certificado", colIII:[
          {en:"by next month",pt:"até o mês que vem"},
          {en:"in advanced English",pt:"de inglês avançado"},
          {en:"after the test",pt:"depois da prova"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"pass this test", pt:"passar nessa prova", colIII:[
          {en:"by studying every night",pt:"estudando toda noite"},
          {en:"with a study group",pt:"com um grupo de estudo"},
          {en:"on my first try",pt:"de primeira"},
          {en:"to move on",pt:"pra seguir adiante"},
        ]},
        { en:"understand this topic", pt:"entender esse tema", colIII:[
          {en:"on my own",pt:"sozinho"},
          {en:"with extra reading",pt:"com leitura extra"},
          {en:"by tomorrow",pt:"até amanhã"},
          {en:"any tips?",pt:"alguma dica?"},
        ]},
      ]},
    ],
    examples: [
      {en:"I'm enrolled in an English course for two semesters",pt:"Estou matriculado num curso de inglês por dois semestres"},
      {en:"I'm studying English with a tutor",pt:"Estou estudando inglês com tutor"},
      {en:"I'd like to sign up for a class for next month",pt:"Quero me inscrever numa aula pra próximo mês"},
      {en:"I missed the class because I was sick",pt:"Perdi a aula porque tava doente"},
      {en:"I have an assignment due tomorrow that I haven't started",pt:"Tenho tarefa pra amanhã que ainda não comecei"},
      {en:"Can you explain this exercise step by step",pt:"Pode explicar esse exercício passo a passo"},
      {en:"I'm trying to improve my English by the end of the year",pt:"Estou tentando melhorar meu inglês até o fim do ano"},
      {en:"I'm enrolled in a master's program at FGV",pt:"Estou matriculado num mestrado na FGV"},
      {en:"I missed the deadline by one day",pt:"Perdi o prazo por um dia"},
    ],
    phrasals: [
      {term:"I'm enrolled in",desc:"Forma formal pra matrícula. SEMPRE 'enrolled IN' (com 'in'). 'A class' / 'a course' / 'a program' (com artigo). Mais formal que 'I'm taking'. Comum em CV e formulários.",ex:[
        {en:"I'm enrolled in an English course",pt:"Estou matriculado num curso de inglês"},
        {en:"I'm enrolled in a master's program at FGV",pt:"Estou matriculado num mestrado na FGV"}
      ]},
      {term:"I'm studying",desc:"Pra falar do foco atual. 'Studying [matéria]' (sem artigo: 'studying English', 'studying business'). 'Studying FOR [prova]' = estudando pra (com 'for'). 'Studying ABROAD' = no exterior.",ex:[
        {en:"I'm studying English with a tutor",pt:"Estou estudando inglês com tutor"},
        {en:"I'm studying for the test next week",pt:"Estou estudando pra prova semana que vem"}
      ]},
      {term:"I'd like to sign up for",desc:"Pra inscrição. SEMPRE 'sign up FOR [coisa]' (com 'for'). 'A class' / 'a workshop' / 'a tutor' (com artigo). 'Sign up' é phrasal verb separável: 'sign me up'.",ex:[
        {en:"I'd like to sign up for a class",pt:"Quero me inscrever numa aula"},
        {en:"I'd like to sign up for a private tutor",pt:"Quero me inscrever com um professor particular"}
      ]},
      {term:"I missed",desc:"Pra falta. 'Missed THE class' / 'THE deadline' / 'THE test' (com 'the' — específico que perdi). Combine com motivo: 'because I was sick' / 'by one day' (por um dia).",ex:[
        {en:"I missed the class because I was sick",pt:"Perdi a aula porque tava doente"},
        {en:"I missed the deadline by one day",pt:"Perdi o prazo por um dia"}
      ]},
      {term:"I have an assignment",desc:"Frase exata pra tarefa de faculdade. 'Assignment' = tarefa, trabalho. 'DUE [data]' = vence em (sem 'on'). 'Due tomorrow' / 'due Friday'. Erro comum: 'due ON Friday' (errado, sem 'on').",ex:[
        {en:"I have an assignment due tomorrow",pt:"Tenho uma tarefa pra amanhã"},
        {en:"I have an assignment I haven't started",pt:"Tenho uma tarefa que não comecei"}
      ]},
      {term:"Can you explain",desc:"Pra pedir explicação. 'Can you explain [coisa]' (sem 'about'). Erro clássico do brasileiro: 'explain ABOUT' (errado). 'Step by step' / 'slowly' / 'with an example' especificam como.",ex:[
        {en:"Can you explain this exercise step by step",pt:"Pode explicar esse exercício passo a passo"},
        {en:"Can you explain what's on the test in detail",pt:"Pode explicar o que cai na prova em detalhe"}
      ]},
      {term:"I'm trying to",desc:"Pra falar de meta/esforço. 'Trying TO [verbo no infinitivo]'. 'Improve' / 'get my certificate' / 'pass this test' / 'understand'. Combine com prazo: 'by the end of the year' / 'by next month'.",ex:[
        {en:"I'm trying to improve my English by the end of the year",pt:"Estou tentando melhorar meu inglês até o fim do ano"},
        {en:"I'm trying to pass this test on my first try",pt:"Estou tentando passar nessa prova de primeira"}
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
    sub: "Aluguel, direção & problema",
    desc: "Pra resolver questões de carro em inglês — alugar, perguntar caminho, lidar com pane, manobra. Cada opener abre uma cena.",
    tree: [
      // Aluguel
      { en:"I'd like to rent", pt:"Quero alugar", colII:[
        { en:"a small car", pt:"um carro pequeno", colIII:[
          {en:"for the weekend",pt:"pro fim de semana"},
          {en:"for a week",pt:"por uma semana"},
          {en:"with insurance",pt:"com seguro"},
          {en:"automatic",pt:"automático"},
        ]},
        { en:"an SUV", pt:"um SUV", colIII:[
          {en:"for a road trip",pt:"pra uma viagem"},
          {en:"for a week",pt:"por uma semana"},
          {en:"with full coverage",pt:"com cobertura total"},
          {en:"for 5 people",pt:"pra 5 pessoas"},
        ]},
        { en:"an automatic", pt:"um automático", colIII:[
          {en:"for the day",pt:"pelo dia"},
          {en:"with insurance",pt:"com seguro"},
          {en:"with GPS included",pt:"com GPS incluso"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"something with GPS", pt:"algo com GPS", colIII:[
          {en:"for tourism",pt:"pra turismo"},
          {en:"with insurance",pt:"com seguro"},
          {en:"for 3 days",pt:"por 3 dias"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Pedir direção
      { en:"Can you tell me", pt:"Pode me dizer", colII:[
        { en:"how to get to", pt:"como chegar em", colIII:[
          {en:"the airport",pt:"o aeroporto"},
          {en:"downtown",pt:"o centro"},
          {en:"this address",pt:"esse endereço"},
          {en:"the highway",pt:"a rodovia"},
        ]},
        { en:"where the nearest gas station is", pt:"onde tem posto mais próximo", colIII:[
          {en:"from here",pt:"daqui"},
          {en:"on this route",pt:"nessa rota"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"how to get downtown", pt:"como chegar no centro", colIII:[
          {en:"from here",pt:"daqui"},
          {en:"avoiding traffic",pt:"sem trânsito"},
          {en:"the fastest way",pt:"do jeito mais rápido"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"if I'm on the right road", pt:"se estou no caminho certo", colIII:[
          {en:"to the airport",pt:"pro aeroporto"},
          {en:"for downtown",pt:"pro centro"},
          {en:"please",pt:"por favor"},
        ]},
      ]},

      // Desorientação
      { en:"I think I'm", pt:"Acho que estou", colII:[
        { en:"lost", pt:"perdido(a)", colIII:[
          {en:"can you help?",pt:"pode ajudar?"},
          {en:"I missed my exit",pt:"perdi a saída"},
          {en:"and my GPS isn't working",pt:"e meu GPS não tá funcionando"},
          {en:"I need to find the highway",pt:"preciso achar a rodovia"},
        ]},
        { en:"going the wrong way", pt:"indo no caminho errado", colIII:[
          {en:"can you point me?",pt:"pode me apontar?"},
          {en:"where do I turn around?",pt:"onde dou meia volta?"},
          {en:"my GPS says otherwise",pt:"meu GPS diz outra coisa"},
        ]},
        { en:"running late", pt:"atrasado(a)", colIII:[
          {en:"any shortcut?",pt:"algum atalho?"},
          {en:"to the airport",pt:"pro aeroporto"},
          {en:"because of traffic",pt:"por causa do trânsito"},
          {en:"can you help me get there fast?",pt:"pode me ajudar a chegar rápido?"},
        ]},
      ]},

      // Problema mecânico
      { en:"My car", pt:"Meu carro", colII:[
        { en:"broke down", pt:"quebrou", colIII:[
          {en:"on the highway",pt:"na estrada"},
          {en:"in the parking lot",pt:"no estacionamento"},
          {en:"and I need a tow",pt:"e preciso de guincho"},
          {en:"please send help",pt:"por favor mandem ajuda"},
        ]},
        { en:"won't start", pt:"não dá partida", colIII:[
          {en:"this morning",pt:"essa manhã"},
          {en:"I think the battery is dead",pt:"acho que a bateria foi"},
          {en:"can you send a jump start?",pt:"podem mandar pra dar partida?"},
          {en:"please send help",pt:"por favor mandem ajuda"},
        ]},
        { en:"has a flat tire", pt:"tá com pneu furado", colIII:[
          {en:"on the highway",pt:"na estrada"},
          {en:"and I don't have a spare",pt:"e não tenho estepe"},
          {en:"can you send a tow?",pt:"pode mandar guincho?"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"is making a weird noise", pt:"tá fazendo um barulho estranho", colIII:[
          {en:"since this morning",pt:"desde de manhã"},
          {en:"when I brake",pt:"quando freio"},
          {en:"under the hood",pt:"no motor"},
          {en:"can someone check it?",pt:"alguém pode dar uma olhada?"},
        ]},
      ]},

      // Manobra/ação
      { en:"I need to", pt:"Preciso", colII:[
        { en:"fill up", pt:"abastecer", colIII:[
          {en:"with regular",pt:"com gasolina comum"},
          {en:"with premium",pt:"com aditivada"},
          {en:"the tank",pt:"o tanque"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"park", pt:"estacionar", colIII:[
          {en:"for an hour",pt:"por uma hora"},
          {en:"nearby",pt:"perto"},
          {en:"is this spot okay?",pt:"esse lugar tá ok?"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"pull over", pt:"encostar", colIII:[
          {en:"on this side",pt:"desse lado"},
          {en:"for a minute",pt:"por um minuto"},
          {en:"is it okay here?",pt:"pode aqui?"},
          {en:"to check something",pt:"pra checar uma coisa"},
        ]},
        { en:"take a detour", pt:"fazer um desvio", colIII:[
          {en:"because of traffic",pt:"por causa do trânsito"},
          {en:"around this construction",pt:"pra desviar dessa obra"},
          {en:"the fastest way",pt:"do jeito mais rápido"},
          {en:"can you help?",pt:"pode ajudar?"},
        ]},
      ]},

      // Dúvida de regra
      { en:"Is it okay to", pt:"Pode", colII:[
        { en:"park here", pt:"estacionar aqui", colIII:[
          {en:"during rush hour",pt:"em horário de pico"},
          {en:"for an hour",pt:"por uma hora"},
          {en:"on this side",pt:"desse lado"},
          {en:"without a permit",pt:"sem ticket"},
        ]},
        { en:"turn left", pt:"virar à esquerda", colIII:[
          {en:"here",pt:"aqui"},
          {en:"on red",pt:"no vermelho"},
          {en:"during rush hour",pt:"em horário de pico"},
          {en:"on this street",pt:"nessa rua"},
        ]},
        { en:"make a U-turn", pt:"dar meia volta", colIII:[
          {en:"here",pt:"aqui"},
          {en:"at this intersection",pt:"nesse cruzamento"},
          {en:"if I missed my exit",pt:"se perdi a saída"},
          {en:"please confirm",pt:"por favor confirma"},
        ]},
        { en:"pass on this side", pt:"ultrapassar por aqui", colIII:[
          {en:"on the right",pt:"pela direita"},
          {en:"on the highway",pt:"na rodovia"},
          {en:"in this lane",pt:"nessa faixa"},
          {en:"or do I need to wait?",pt:"ou tenho que esperar?"},
        ]},
      ]},

      // Serviço de emergência/extra
      { en:"Can I get", pt:"Posso pedir", colII:[
        { en:"a tow", pt:"um guincho", colIII:[
          {en:"as soon as possible",pt:"o quanto antes"},
          {en:"to the nearest shop",pt:"pra oficina mais próxima"},
          {en:"my location is...",pt:"minha localização é..."},
          {en:"please",pt:"por favor"},
        ]},
        { en:"a jump start", pt:"pra dar partida", colIII:[
          {en:"my battery is dead",pt:"minha bateria foi"},
          {en:"as soon as possible",pt:"o quanto antes"},
          {en:"my location is...",pt:"minha localização é..."},
          {en:"please",pt:"por favor"},
        ]},
        { en:"directions", pt:"direção", colIII:[
          {en:"to the nearest gas station",pt:"pro posto mais próximo"},
          {en:"to the airport",pt:"pro aeroporto"},
          {en:"avoiding traffic",pt:"sem trânsito"},
          {en:"please",pt:"por favor"},
        ]},
        { en:"a parking permit", pt:"um ticket de estacionamento", colIII:[
          {en:"for one day",pt:"por um dia"},
          {en:"for this block",pt:"pra esse quarteirão"},
          {en:"how do I pay?",pt:"como eu pago?"},
          {en:"please",pt:"por favor"},
        ]},
      ]},
    ],
    examples: [
      {en:"I'd like to rent a small car for the weekend",pt:"Quero alugar um carro pequeno pro fim de semana"},
      {en:"Can you tell me how to get to the airport",pt:"Pode me dizer como chegar no aeroporto"},
      {en:"I think I'm lost can you help",pt:"Acho que estou perdido pode ajudar"},
      {en:"My car broke down on the highway",pt:"Meu carro quebrou na estrada"},
      {en:"I need to fill up with regular",pt:"Preciso abastecer com gasolina comum"},
      {en:"Is it okay to park here for an hour",pt:"Pode estacionar aqui por uma hora"},
      {en:"Can I get a tow as soon as possible",pt:"Posso pedir um guincho o quanto antes"},
      {en:"I'd like to rent an SUV with full coverage",pt:"Quero alugar um SUV com cobertura total"},
      {en:"My car has a flat tire on the highway",pt:"Meu carro tá com pneu furado na estrada"},
    ],
    phrasals: [
      {term:"I'd like to rent",desc:"Pra alugar carro. SEMPRE 'rent A car' / 'an SUV' (com artigo). Tipos: 'a small car' (compacto), 'an SUV', 'an automatic' (câmbio automático). Combine com 'with insurance' / 'with full coverage'.",ex:[
        {en:"I'd like to rent a small car for the weekend",pt:"Quero alugar um carro pequeno pro fim de semana"},
        {en:"I'd like to rent an automatic with insurance",pt:"Quero alugar um automático com seguro"}
      ]},
      {term:"Can you tell me how to get to",desc:"Frase clássica pra pedir direção. SEMPRE 'how to GET TO [destino]' (com 'get to'). 'Where the nearest [X] is' = onde fica o [X] mais próximo (note ordem: 'where IS' vira 'where IS' no fim).",ex:[
        {en:"Can you tell me how to get to the airport",pt:"Pode me dizer como chegar no aeroporto"},
        {en:"Can you tell me where the nearest gas station is",pt:"Pode me dizer onde tem posto mais próximo"}
      ]},
      {term:"I think I'm lost / running late",desc:"Pra emergência leve. 'I'm lost' = me perdi. 'I'm running late' = tô atrasado (note 'running' não 'getting'). 'I missed my exit' = perdi a saída. Combine com 'can you help?'.",ex:[
        {en:"I think I'm lost can you help",pt:"Acho que estou perdido pode ajudar"},
        {en:"I think I'm running late any shortcut",pt:"Acho que estou atrasado tem algum atalho"}
      ]},
      {term:"My car broke down / won't start",desc:"Pra problema mecânico. 'Broke down' (passado de break down) = quebrou. 'Won't start' = não dá partida. 'Has a flat tire' = pneu furado. 'Is making a weird noise' = barulho estranho.",ex:[
        {en:"My car broke down on the highway",pt:"Meu carro quebrou na estrada"},
        {en:"My car won't start the battery is dead",pt:"Meu carro não dá partida a bateria foi"}
      ]},
      {term:"I need to fill up / park / pull over",desc:"Manobras comuns. 'Fill up' = abastecer (separável: 'fill IT up'). 'Park' = estacionar. 'Pull over' = encostar (na beira). 'Take a detour' = fazer desvio.",ex:[
        {en:"I need to fill up with regular",pt:"Preciso abastecer com gasolina comum"},
        {en:"I need to pull over for a minute",pt:"Preciso encostar por um minuto"}
      ]},
      {term:"Is it okay to",desc:"Pra confirmar regra de trânsito. 'Is it okay TO [verbo no infinitivo]'. 'Park here' / 'turn left' / 'make a U-turn' / 'pass on this side'. Mais educado que 'Can I'. Ótimo em país estrangeiro.",ex:[
        {en:"Is it okay to park here for an hour",pt:"Pode estacionar aqui por uma hora"},
        {en:"Is it okay to make a U-turn here",pt:"Pode dar meia volta aqui"}
      ]},
      {term:"Can I get a tow / jump start",desc:"Pra emergência. 'A tow' = guincho. 'A jump start' = dar partida (com cabos). 'Directions' = direção (no plural). 'A parking permit' = ticket de estacionamento. Termos americanos comuns.",ex:[
        {en:"Can I get a tow as soon as possible",pt:"Posso pedir um guincho o quanto antes"},
        {en:"Can I get a jump start my battery is dead",pt:"Posso pedir pra dar partida a bateria foi"}
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
    title: "small talk",
    sub: "Rotina, casa & vibe do dia",
    desc: "Pra contar como tá o dia em inglês — chegada em casa, plano da noite, estado, costume, pendências. Cada opener abre um momento da rotina.",
    tree: [
      // Acabei de fazer
      { en:"I just got", pt:"Acabei de", colII:[
        { en:"home", pt:"chegar em casa", colIII:[
          {en:"and I'm exhausted",pt:"e estou exausto"},
          {en:"and I'm starving",pt:"e estou faminto"},
          {en:"and I need to sleep",pt:"e preciso dormir"},
          {en:"from work",pt:"do trabalho"},
        ]},
        { en:"off work", pt:"sair do trabalho", colIII:[
          {en:"and I'm done",pt:"e estou acabado"},
          {en:"want to grab a drink?",pt:"quer tomar algo?"},
          {en:"finally",pt:"finalmente"},
          {en:"early today",pt:"cedo hoje"},
        ]},
        { en:"out of the shower", pt:"sair do banho", colIII:[
          {en:"give me five minutes",pt:"me dá cinco minutos"},
          {en:"and I'm getting ready",pt:"e estou me arrumando"},
          {en:"and I feel better",pt:"e me sinto melhor"},
        ]},
        { en:"up", pt:"acordar", colIII:[
          {en:"and I need coffee",pt:"e preciso de café"},
          {en:"and I'm running late",pt:"e estou atrasado"},
          {en:"and I feel terrible",pt:"e me sinto péssimo"},
          {en:"it's already noon",pt:"e já é meio-dia"},
        ]},
      ]},

      // Vou ficar em casa
      { en:"I'm staying in", pt:"Vou ficar em casa", colII:[
        { en:"tonight", pt:"hoje à noite", colIII:[
          {en:"and ordering food",pt:"e pedindo comida"},
          {en:"and watching a movie",pt:"e vendo um filme"},
          {en:"to recharge",pt:"pra recarregar"},
          {en:"with my partner",pt:"com meu parceiro"},
        ]},
        { en:"this weekend", pt:"esse fim de semana", colIII:[
          {en:"to rest",pt:"pra descansar"},
          {en:"and doing nothing",pt:"e não fazendo nada"},
          {en:"and ordering food",pt:"e pedindo comida"},
          {en:"with the family",pt:"com a família"},
        ]},
        { en:"all day", pt:"o dia todo", colIII:[
          {en:"and working from home",pt:"e trabalhando de casa"},
          {en:"to recharge",pt:"pra recarregar"},
          {en:"and watching shows",pt:"e vendo séries"},
          {en:"because of the rain",pt:"por causa da chuva"},
        ]},
      ]},

      // Prestes a fazer
      { en:"I'm about to", pt:"Estou prestes a", colII:[
        { en:"leave", pt:"sair", colIII:[
          {en:"can I call you back?",pt:"posso te ligar depois?"},
          {en:"give me a sec",pt:"me dá um segundo"},
          {en:"see you in 20",pt:"te vejo em 20"},
          {en:"talk to you later",pt:"falo depois"},
        ]},
        { en:"sleep", pt:"dormir", colIII:[
          {en:"good night",pt:"boa noite"},
          {en:"talk tomorrow",pt:"a gente fala amanhã"},
          {en:"I'm exhausted",pt:"estou exausto"},
          {en:"finally",pt:"finalmente"},
        ]},
        { en:"eat", pt:"comer", colIII:[
          {en:"I'm starving",pt:"estou faminto"},
          {en:"can I call you back?",pt:"posso te ligar depois?"},
          {en:"join me",pt:"vem comigo"},
          {en:"give me a sec",pt:"me dá um segundo"},
        ]},
        { en:"shower", pt:"tomar banho", colIII:[
          {en:"give me 10 minutes",pt:"me dá 10 minutos"},
          {en:"can I call you after?",pt:"posso te ligar depois?"},
          {en:"and then head out",pt:"e depois saio"},
        ]},
        { en:"order food", pt:"pedir comida", colIII:[
          {en:"want anything?",pt:"quer alguma coisa?"},
          {en:"from the usual place",pt:"do lugar de sempre"},
          {en:"give me a sec",pt:"me dá um segundo"},
          {en:"I'm starving",pt:"estou faminto"},
        ]},
      ]},

      // Estado/sentimento
      { en:"I'm so", pt:"Estou tão", colII:[
        { en:"tired", pt:"cansado(a)", colIII:[
          {en:"I could pass out",pt:"que podia desmaiar"},
          {en:"right now",pt:"agora"},
          {en:"after today",pt:"depois de hoje"},
          {en:"I can't think",pt:"que nem consigo pensar"},
        ]},
        { en:"hungry", pt:"com fome", colIII:[
          {en:"I could eat anything",pt:"que comeria qualquer coisa"},
          {en:"right now",pt:"agora"},
          {en:"let's order food",pt:"vamos pedir comida"},
          {en:"I haven't eaten today",pt:"que não comi hoje"},
        ]},
        { en:"sleepy", pt:"com sono", colIII:[
          {en:"I need a nap",pt:"que preciso cochilar"},
          {en:"right now",pt:"agora"},
          {en:"I can barely keep my eyes open",pt:"que mal consigo manter os olhos abertos"},
          {en:"after lunch",pt:"depois do almoço"},
        ]},
        { en:"bored", pt:"entediado(a)", colIII:[
          {en:"want to do something?",pt:"quer fazer alguma coisa?"},
          {en:"right now",pt:"agora"},
          {en:"with this routine",pt:"com essa rotina"},
          {en:"let's grab a drink",pt:"vamos tomar algo"},
        ]},
        { en:"done with today", pt:"acabado(a) com hoje", colIII:[
          {en:"I just want to sleep",pt:"que só quero dormir"},
          {en:"can we talk tomorrow?",pt:"podemos falar amanhã?"},
          {en:"and going to bed",pt:"e vou dormir"},
        ]},
      ]},

      // Plano casual
      { en:"I'm gonna", pt:"Vou", colII:[
        { en:"chill", pt:"relaxar", colIII:[
          {en:"tonight",pt:"hoje à noite"},
          {en:"all day",pt:"o dia todo"},
          {en:"with a movie",pt:"com um filme"},
          {en:"and do nothing",pt:"e não fazer nada"},
        ]},
        { en:"cook something", pt:"cozinhar algo", colIII:[
          {en:"quick",pt:"rápido"},
          {en:"with leftovers",pt:"com sobras"},
          {en:"for dinner",pt:"pro jantar"},
          {en:"join me?",pt:"vem comigo?"},
        ]},
        { en:"take a nap", pt:"cochilar", colIII:[
          {en:"for 20 minutes",pt:"por 20 minutos"},
          {en:"real quick",pt:"rapidinho"},
          {en:"before dinner",pt:"antes do jantar"},
          {en:"I'm exhausted",pt:"estou exausto"},
        ]},
        { en:"watch a movie", pt:"assistir um filme", colIII:[
          {en:"and chill",pt:"e relaxar"},
          {en:"tonight",pt:"hoje à noite"},
          {en:"join me?",pt:"vem comigo?"},
          {en:"with popcorn",pt:"com pipoca"},
        ]},
        { en:"head out", pt:"sair", colIII:[
          {en:"in five minutes",pt:"em cinco minutos"},
          {en:"for a bit",pt:"por um tempo"},
          {en:"to get fresh air",pt:"pra tomar um ar"},
          {en:"want to come?",pt:"quer vir?"},
        ]},
      ]},

      // Costume / repetição
      { en:"I keep", pt:"Eu fico", colII:[
        { en:"forgetting things", pt:"esquecendo coisas", colIII:[
          {en:"lately",pt:"ultimamente"},
          {en:"and it's annoying",pt:"e é irritante"},
          {en:"every day",pt:"todo dia"},
          {en:"because I'm tired",pt:"porque estou cansado"},
        ]},
        { en:"missing the alarm", pt:"não escutando o alarme", colIII:[
          {en:"in the morning",pt:"de manhã"},
          {en:"and waking up late",pt:"e acordando tarde"},
          {en:"every day",pt:"todo dia"},
          {en:"and I'm running late",pt:"e estou atrasado"},
        ]},
        { en:"falling asleep", pt:"dormindo", colIII:[
          {en:"on the couch",pt:"no sofá"},
          {en:"during meetings",pt:"em reuniões"},
          {en:"in front of the TV",pt:"na frente da TV"},
          {en:"because I'm exhausted",pt:"porque estou exausto"},
        ]},
        { en:"putting it off", pt:"adiando isso", colIII:[
          {en:"because I don't want to",pt:"porque não quero"},
          {en:"and feeling guilty",pt:"e me sentindo culpado"},
          {en:"every day",pt:"todo dia"},
          {en:"but I'll do it tomorrow",pt:"mas faço amanhã"},
        ]},
      ]},

      // Pendência (ainda não)
      { en:"I haven't", pt:"Não", colII:[
        { en:"eaten", pt:"comi", colIII:[
          {en:"all day",pt:"o dia todo"},
          {en:"yet",pt:"ainda"},
          {en:"and I'm starving",pt:"e estou faminto"},
          {en:"since this morning",pt:"desde de manhã"},
        ]},
        { en:"slept", pt:"dormi", colIII:[
          {en:"well",pt:"bem"},
          {en:"in days",pt:"há dias"},
          {en:"enough lately",pt:"o suficiente ultimamente"},
          {en:"more than 4 hours",pt:"mais que 4 horas"},
        ]},
        { en:"showered", pt:"tomei banho", colIII:[
          {en:"yet",pt:"ainda"},
          {en:"all day",pt:"o dia todo"},
          {en:"give me 10 minutes",pt:"me dá 10 minutos"},
          {en:"because I just got home",pt:"porque acabei de chegar"},
        ]},
        { en:"called", pt:"liguei", colIII:[
          {en:"my parents in weeks",pt:"pros meus pais há semanas"},
          {en:"yet",pt:"ainda"},
          {en:"because I've been busy",pt:"porque tô ocupado"},
          {en:"I should",pt:"eu deveria"},
        ]},
        { en:"finished", pt:"terminei", colIII:[
          {en:"the work I had",pt:"o trabalho que eu tinha"},
          {en:"yet",pt:"ainda"},
          {en:"and I'm stressed",pt:"e estou estressado"},
          {en:"the dishes",pt:"a louça"},
        ]},
      ]},
    ],
    examples: [
      {en:"I just got home and I'm exhausted",pt:"Acabei de chegar em casa e estou exausto"},
      {en:"I'm staying in tonight and ordering food",pt:"Vou ficar em casa hoje à noite e pedindo comida"},
      {en:"I'm about to leave can I call you back",pt:"Estou prestes a sair posso te ligar depois"},
      {en:"I'm so tired I could pass out",pt:"Estou tão cansado que podia desmaiar"},
      {en:"I'm gonna take a nap real quick",pt:"Vou cochilar rapidinho"},
      {en:"I keep forgetting things lately",pt:"Eu fico esquecendo coisas ultimamente"},
      {en:"I haven't eaten all day",pt:"Não comi o dia todo"},
      {en:"I just got off work finally",pt:"Acabei de sair do trabalho finalmente"},
      {en:"I haven't called my parents in weeks",pt:"Não liguei pros meus pais há semanas"},
    ],
    phrasals: [
      {term:"I just got",desc:"Pra falar de algo recém-feito. 'Just got' + lugar/situação. 'Got home' (cheguei em casa) — note 'got' + 'home' sem preposição. 'Got off work' (saí do trabalho — phrasal verb). 'Got up' (acordei).",ex:[
        {en:"I just got home and I'm exhausted",pt:"Acabei de chegar em casa e estou exausto"},
        {en:"I just got off work finally",pt:"Acabei de sair do trabalho finalmente"}
      ]},
      {term:"I'm staying in",desc:"Pra dizer que vai ficar em casa. 'Staying IN' (com 'in') = ficar em casa. Oposto: 'going out' (sair). Combine com tempo ('tonight', 'this weekend', 'all day') e atividade ('and ordering food', 'and watching a movie').",ex:[
        {en:"I'm staying in tonight and ordering food",pt:"Vou ficar em casa hoje à noite e pedindo comida"},
        {en:"I'm staying in this weekend to rest",pt:"Vou ficar em casa esse fim de semana pra descansar"}
      ]},
      {term:"I'm about to",desc:"Pra ação iminente (em segundos/minutos). 'About TO + verbo no infinitivo'. SEMPRE com 'to'. Erro: 'I'm about leaving' (errado). Combine com follow-up: 'can I call you back?' / 'give me a sec'.",ex:[
        {en:"I'm about to leave can I call you back",pt:"Estou prestes a sair posso te ligar depois"},
        {en:"I'm about to sleep good night",pt:"Estou prestes a dormir boa noite"}
      ]},
      {term:"I'm so",desc:"Pra estado intenso. 'I'm SO [adjetivo]' enfatiza a intensidade. 'Tired' / 'hungry' / 'sleepy' / 'bored' / 'done with today'. Combine com consequência: 'I could pass out' / 'I haven't eaten today'.",ex:[
        {en:"I'm so tired I could pass out",pt:"Estou tão cansado que podia desmaiar"},
        {en:"I'm so hungry I could eat anything",pt:"Estou com tanta fome que comeria qualquer coisa"}
      ]},
      {term:"I'm gonna",desc:"Forma casual de 'I'm going to'. Use em fala/mensagem com amigos, NUNCA em contexto formal. 'Gonna chill' / 'gonna cook' / 'gonna take a nap' / 'gonna head out'. Sempre seguido de verbo no infinitivo.",ex:[
        {en:"I'm gonna take a nap real quick",pt:"Vou cochilar rapidinho"},
        {en:"I'm gonna head out for a bit",pt:"Vou sair por um tempo"}
      ]},
      {term:"I keep",desc:"Pra ação repetida (tipo um vício). 'I keep + gerúndio (-ing)'. 'Keep forgetting' / 'keep falling asleep' / 'keep putting it off'. Erro clássico: 'I keep TO forget' (errado, sempre gerúndio).",ex:[
        {en:"I keep forgetting things lately",pt:"Eu fico esquecendo coisas ultimamente"},
        {en:"I keep falling asleep on the couch",pt:"Eu fico dormindo no sofá"}
      ]},
      {term:"I haven't",desc:"Present perfect negativo — pra dizer que ainda não fez algo. 'I haven't + particípio passado'. 'Eaten' / 'slept' / 'showered' / 'called' / 'finished'. Combine com 'yet' (ainda) ou tempo ('all day', 'in weeks').",ex:[
        {en:"I haven't eaten all day",pt:"Não comi o dia todo"},
        {en:"I haven't called my parents in weeks",pt:"Não liguei pros meus pais há semanas"}
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
    sub: "Namoro, casamento & briga",
    desc: "Pra falar de relacionamento amoroso em inglês — status, paixão, briga, mudança de fase. Cada opener abre uma fase do relacionamento.",
    tree: [
      // Namorando
      { en:"I'm dating", pt:"Estou saindo com", colII:[
        { en:"someone new", pt:"alguém novo", colIII:[
          {en:"for a few months",pt:"há alguns meses"},
          {en:"casually",pt:"de boa"},
          {en:"and it's going well",pt:"e tá indo bem"},
          {en:"and we're seeing where it goes",pt:"e a gente tá vendo no que dá"},
        ]},
        { en:"a coworker", pt:"um(a) colega de trabalho", colIII:[
          {en:"discreetly",pt:"em segredo"},
          {en:"for a few months",pt:"há alguns meses"},
          {en:"and HR doesn't know",pt:"e o RH não sabe"},
          {en:"and it's getting serious",pt:"e tá ficando sério"},
        ]},
        { en:"my best friend", pt:"meu(minha) melhor amigo(a)", colIII:[
          {en:"and it's weird at first",pt:"e tá estranho no começo"},
          {en:"after years of friendship",pt:"depois de anos de amizade"},
          {en:"and it feels right",pt:"e parece certo"},
          {en:"now that we admitted it",pt:"agora que a gente admitiu"},
        ]},
        { en:"nobody right now", pt:"ninguém no momento", colIII:[
          {en:"and I'm enjoying it",pt:"e tô curtindo"},
          {en:"after the breakup",pt:"depois do término"},
          {en:"and focusing on me",pt:"e me focando em mim"},
          {en:"by choice",pt:"por escolha"},
        ]},
      ]},

      // Apaixonado
      { en:"I'm in love with", pt:"Estou apaixonado(a) por", colII:[
        { en:"my partner", pt:"meu(minha) parceiro(a)", colIII:[
          {en:"completely",pt:"completamente"},
          {en:"every single day",pt:"todo santo dia"},
          {en:"more than I thought possible",pt:"mais do que achei que era possível"},
          {en:"after all these years",pt:"depois de todos esses anos"},
        ]},
        { en:"my girlfriend", pt:"minha namorada", colIII:[
          {en:"and she knows it",pt:"e ela sabe"},
          {en:"completely",pt:"completamente"},
          {en:"more than ever",pt:"mais do que nunca"},
          {en:"for the first time",pt:"pela primeira vez"},
        ]},
        { en:"my boyfriend", pt:"meu namorado", colIII:[
          {en:"and he knows it",pt:"e ele sabe"},
          {en:"completely",pt:"completamente"},
          {en:"more than ever",pt:"mais do que nunca"},
          {en:"for real this time",pt:"pra valer dessa vez"},
        ]},
        { en:"someone I just met", pt:"alguém que acabei de conhecer", colIII:[
          {en:"and it's scary",pt:"e é assustador"},
          {en:"and excited",pt:"e empolgante"},
          {en:"already",pt:"já"},
          {en:"out of nowhere",pt:"do nada"},
        ]},
      ]},

      // Casado
      { en:"I'm married to", pt:"Sou casado(a) com", colII:[
        { en:"my husband", pt:"meu marido", colIII:[
          {en:"for 5 years",pt:"há 5 anos"},
          {en:"since college",pt:"desde a faculdade"},
          {en:"and we're happy",pt:"e a gente é feliz"},
          {en:"my high school sweetheart",pt:"meu amor da escola"},
        ]},
        { en:"my wife", pt:"minha esposa", colIII:[
          {en:"for 5 years",pt:"há 5 anos"},
          {en:"since college",pt:"desde a faculdade"},
          {en:"and we're happy",pt:"e a gente é feliz"},
          {en:"my high school sweetheart",pt:"minha namorada da escola"},
        ]},
        { en:"my best friend", pt:"meu(minha) melhor amigo(a)", colIII:[
          {en:"and we love each other deeply",pt:"e a gente se ama profundamente"},
          {en:"for 7 years",pt:"há 7 anos"},
          {en:"and that's the secret",pt:"e esse é o segredo"},
          {en:"since we were in our 20s",pt:"desde os 20 anos"},
        ]},
      ]},

      // Terminou
      { en:"I broke up with", pt:"Terminei com", colII:[
        { en:"my ex", pt:"meu(minha) ex", colIII:[
          {en:"last month",pt:"mês passado"},
          {en:"a year ago",pt:"um ano atrás"},
          {en:"for good",pt:"de vez"},
          {en:"and I'm finally free",pt:"e finalmente estou livre"},
        ]},
        { en:"my boyfriend", pt:"meu namorado", colIII:[
          {en:"last month",pt:"mês passado"},
          {en:"over text",pt:"por mensagem"},
          {en:"and it was mutual",pt:"e foi mútuo"},
          {en:"after a long fight",pt:"depois de uma briga longa"},
        ]},
        { en:"my girlfriend", pt:"minha namorada", colIII:[
          {en:"last week",pt:"semana passada"},
          {en:"and it's hard",pt:"e tá difícil"},
          {en:"after 3 years",pt:"depois de 3 anos"},
          {en:"and it was mutual",pt:"e foi mútuo"},
        ]},
        { en:"my partner", pt:"meu(minha) parceiro(a)", colIII:[
          {en:"last month",pt:"mês passado"},
          {en:"after long deliberation",pt:"depois de muito pensar"},
          {en:"and it was for the best",pt:"e foi pro melhor"},
          {en:"and we're still friends",pt:"e a gente ainda é amigo"},
        ]},
      ]},

      // Briga
      { en:"I had a fight with", pt:"Tive uma briga com", colII:[
        { en:"my partner", pt:"meu(minha) parceiro(a)", colIII:[
          {en:"last night",pt:"ontem à noite"},
          {en:"over money",pt:"por causa de dinheiro"},
          {en:"over nothing",pt:"por nada"},
          {en:"and we made up",pt:"e a gente fez as pazes"},
        ]},
        { en:"my husband", pt:"meu marido", colIII:[
          {en:"this morning",pt:"essa manhã"},
          {en:"about chores",pt:"sobre tarefas de casa"},
          {en:"and I'm still upset",pt:"e ainda estou chateada"},
          {en:"and we're not talking",pt:"e a gente não tá se falando"},
        ]},
        { en:"my girlfriend", pt:"minha namorada", colIII:[
          {en:"last night",pt:"ontem à noite"},
          {en:"over plans",pt:"por causa de planos"},
          {en:"and we made up this morning",pt:"e a gente fez as pazes hoje de manhã"},
          {en:"and now I'm cooling off",pt:"e agora tô esfriando a cabeça"},
        ]},
        { en:"my boyfriend", pt:"meu namorado", colIII:[
          {en:"last night",pt:"ontem à noite"},
          {en:"over jealousy",pt:"por ciúme"},
          {en:"and I need space",pt:"e preciso de espaço"},
          {en:"and we made up",pt:"e a gente fez as pazes"},
        ]},
      ]},

      // Mudança de fase
      { en:"I'm getting", pt:"Vou", colII:[
        { en:"married", pt:"me casar", colIII:[
          {en:"next month",pt:"mês que vem"},
          {en:"in the spring",pt:"na primavera"},
          {en:"this year",pt:"esse ano"},
          {en:"with my best friend",pt:"com minha melhor amiga"},
        ]},
        { en:"engaged", pt:"ficar noivo(a)", colIII:[
          {en:"this weekend",pt:"esse fim de semana"},
          {en:"on our anniversary",pt:"no nosso aniversário"},
          {en:"after 4 years together",pt:"depois de 4 anos juntos"},
          {en:"and I'm nervous",pt:"e estou nervoso"},
        ]},
        { en:"divorced", pt:"me divorciar", colIII:[
          {en:"after 10 years",pt:"depois de 10 anos"},
          {en:"and it's amicable",pt:"e tá amigável"},
          {en:"by the end of the year",pt:"até o fim do ano"},
          {en:"and starting fresh",pt:"e começando do zero"},
        ]},
        { en:"back together", pt:"voltar com meu(minha) ex", colIII:[
          {en:"with my ex",pt:"com meu(minha) ex"},
          {en:"after a year apart",pt:"depois de um ano separados"},
          {en:"and it feels right",pt:"e parece certo"},
          {en:"slowly",pt:"devagar"},
        ]},
      ]},

      // Paquera
      { en:"I have a crush on", pt:"Estou afim de", colII:[
        { en:"a coworker", pt:"um(a) colega de trabalho", colIII:[
          {en:"and I can't stop thinking about it",pt:"e não paro de pensar"},
          {en:"but I'm shy",pt:"mas tô tímido"},
          {en:"and we're texting",pt:"e a gente tá conversando"},
          {en:"and I don't know what to do",pt:"e não sei o que fazer"},
        ]},
        { en:"someone in class", pt:"alguém da aula", colIII:[
          {en:"and I can't focus",pt:"e não consigo me concentrar"},
          {en:"but I haven't talked to them",pt:"mas ainda não falei com a pessoa"},
          {en:"and we're texting",pt:"e a gente tá conversando"},
          {en:"and it's mutual I think",pt:"e acho que é mútuo"},
        ]},
        { en:"my neighbor", pt:"meu(minha) vizinho(a)", colIII:[
          {en:"and we're getting close",pt:"e a gente tá ficando próximo"},
          {en:"and I see them every day",pt:"e vejo a pessoa todo dia"},
          {en:"and I don't know what to do",pt:"e não sei o que fazer"},
          {en:"but I'm shy",pt:"mas sou tímido"},
        ]},
        { en:"someone unexpected", pt:"alguém inesperado(a)", colIII:[
          {en:"and it's weird",pt:"e tá estranho"},
          {en:"and I can't explain why",pt:"e não consigo explicar"},
          {en:"and we're texting",pt:"e a gente tá conversando"},
          {en:"and it's exciting",pt:"e tá empolgante"},
        ]},
      ]},
    ],
    examples: [
      {en:"I'm dating someone new for a few months",pt:"Estou saindo com alguém novo há alguns meses"},
      {en:"I'm in love with my partner completely",pt:"Estou apaixonado(a) pelo(a) meu(minha) parceiro(a) completamente"},
      {en:"I'm married to my husband for 5 years",pt:"Sou casada com meu marido há 5 anos"},
      {en:"I broke up with my ex last month",pt:"Terminei com meu(minha) ex mês passado"},
      {en:"I had a fight with my partner over nothing",pt:"Tive uma briga com meu(minha) parceiro(a) por nada"},
      {en:"I'm getting married next month",pt:"Vou me casar mês que vem"},
      {en:"I have a crush on a coworker and I'm shy",pt:"Estou afim de um(a) colega de trabalho e sou tímido"},
      {en:"I'm dating my best friend after years of friendship",pt:"Estou saindo com meu melhor amigo depois de anos de amizade"},
      {en:"I'm getting engaged this weekend",pt:"Vou ficar noivo esse fim de semana"},
    ],
    phrasals: [
      {term:"I'm dating",desc:"Pra namoro casual ou recente. 'Dating [pessoa]' direto, sem preposição. 'Dating someone new' (alguém novo). 'Dating casually' (sem compromisso). Diferente de 'I'm with' que implica relação estabelecida.",ex:[
        {en:"I'm dating someone new for a few months",pt:"Estou saindo com alguém novo há alguns meses"},
        {en:"I'm dating a coworker discreetly",pt:"Estou saindo com um(a) colega em segredo"}
      ]},
      {term:"I'm in love with",desc:"Pra paixão emocional. SEMPRE 'in love WITH' (com 'with'). 'My partner' / 'my girlfriend' / 'someone I just met'. Erro clássico: 'in love OF' (errado, sempre 'with').",ex:[
        {en:"I'm in love with my partner completely",pt:"Estou apaixonado(a) pelo(a) meu(minha) parceiro(a) completamente"},
        {en:"I'm in love with someone I just met",pt:"Estou apaixonado(a) por alguém que acabei de conhecer"}
      ]},
      {term:"I'm married to",desc:"Pra casamento oficial. SEMPRE 'married TO' (com 'to'). Erro clássico: 'married WITH' (errado, 'with' significa que vc casou junto com alguém, não casou com alguém). Tempo: 'for [duração]' / 'since [marco]'.",ex:[
        {en:"I'm married to my husband for 5 years",pt:"Sou casada com meu marido há 5 anos"},
        {en:"I'm married to my best friend",pt:"Sou casada com meu melhor amigo"}
      ]},
      {term:"I broke up with",desc:"Pra término. 'Break up WITH [pessoa]' (com 'with'). 'I broke up' (passado de 'break up'). Combine com tempo ('last month') ou modo ('over text', 'for good', 'mutual').",ex:[
        {en:"I broke up with my ex last month",pt:"Terminei com meu(minha) ex mês passado"},
        {en:"I broke up with my boyfriend over text",pt:"Terminei com meu namorado por mensagem"}
      ]},
      {term:"I had a fight with",desc:"Pra briga. 'Had a fight WITH [pessoa]' (com 'with'). Combine com tempo ('last night') ou motivo ('over money' = por causa de). 'And we made up' = e a gente fez as pazes.",ex:[
        {en:"I had a fight with my partner over money",pt:"Tive uma briga com meu(minha) parceiro(a) por causa de dinheiro"},
        {en:"I had a fight with my husband and we made up",pt:"Tive uma briga com meu marido e a gente fez as pazes"}
      ]},
      {term:"I'm getting",desc:"Pra mudança de fase iminente. 'Getting married' (casando) / 'getting engaged' (noivando) / 'getting divorced' (divorciando) / 'getting back together' (voltando). 'I'm getting' = está acontecendo / vai acontecer.",ex:[
        {en:"I'm getting married next month",pt:"Vou me casar mês que vem"},
        {en:"I'm getting back together with my ex",pt:"Vou voltar com meu(minha) ex"}
      ]},
      {term:"I have a crush on",desc:"Pra paquera (afim, sem compromisso). 'Crush ON [pessoa]' (com 'on'). Diferente de 'in love with' (paixão estabelecida). 'A crush' é leve, normalmente unilateral. Erro: 'crush IN' (errado).",ex:[
        {en:"I have a crush on a coworker",pt:"Estou afim de um(a) colega de trabalho"},
        {en:"I have a crush on someone in class",pt:"Estou afim de alguém da aula"}
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
    sub: "Família & convivência",
    desc: "Pra falar da família em inglês — afinidade, parecença, saudade, moradia, visita. Cada opener abre um aspecto diferente da relação.",
    tree: [
      // Próximo emocionalmente
      { en:"I'm close to", pt:"Sou próximo(a) de", colII:[
        { en:"my mom", pt:"minha mãe", colIII:[
          {en:"because we talk every day",pt:"porque a gente fala todo dia"},
          {en:"and we share everything",pt:"e a gente compartilha tudo"},
          {en:"she's my best friend",pt:"ela é minha melhor amiga"},
          {en:"since I was a kid",pt:"desde que eu era criança"},
        ]},
        { en:"my dad", pt:"meu pai", colIII:[
          {en:"and we talk weekly",pt:"e a gente fala toda semana"},
          {en:"because he raised me",pt:"porque ele me criou"},
          {en:"more than I expected",pt:"mais do que eu imaginava"},
          {en:"these days",pt:"hoje em dia"},
        ]},
        { en:"my brother", pt:"meu irmão", colIII:[
          {en:"we grew up together",pt:"a gente cresceu junto"},
          {en:"and we tell each other everything",pt:"e a gente conta tudo um pro outro"},
          {en:"despite the age gap",pt:"apesar da diferença de idade"},
          {en:"since we were kids",pt:"desde criança"},
        ]},
        { en:"my sister", pt:"minha irmã", colIII:[
          {en:"we share everything",pt:"a gente compartilha tudo"},
          {en:"she's my best friend",pt:"ela é minha melhor amiga"},
          {en:"despite living far",pt:"mesmo morando longe"},
          {en:"since we were little",pt:"desde pequenas"},
        ]},
        { en:"my grandma", pt:"minha avó", colIII:[
          {en:"because she raised me",pt:"porque ela me criou"},
          {en:"and I miss her",pt:"e sinto saudade"},
          {en:"more than anyone",pt:"mais do que ninguém"},
          {en:"since I was a kid",pt:"desde que eu era criança"},
        ]},
      ]},

      // Convivência (se dão bem)
      { en:"I get along with", pt:"Me dou bem com", colII:[
        { en:"my parents", pt:"meus pais", colIII:[
          {en:"really well",pt:"super bem"},
          {en:"most of the time",pt:"na maior parte do tempo"},
          {en:"now that I'm older",pt:"agora que sou mais velho"},
          {en:"surprisingly",pt:"surpreendentemente"},
        ]},
        { en:"my siblings", pt:"meus irmãos", colIII:[
          {en:"really well",pt:"super bem"},
          {en:"most of the time",pt:"na maior parte do tempo"},
          {en:"despite the fights",pt:"apesar das brigas"},
          {en:"more than I expected",pt:"mais do que eu imaginava"},
        ]},
        { en:"my cousins", pt:"meus primos", colIII:[
          {en:"like siblings",pt:"como se fossem irmãos"},
          {en:"on holidays",pt:"nas férias"},
          {en:"since we were kids",pt:"desde criança"},
          {en:"surprisingly well",pt:"surpreendentemente bem"},
        ]},
        { en:"my in-laws", pt:"meus sogros", colIII:[
          {en:"really well",pt:"super bem"},
          {en:"surprisingly",pt:"surpreendentemente"},
          {en:"when we agree on things",pt:"quando a gente concorda"},
          {en:"most of the time",pt:"na maior parte do tempo"},
        ]},
      ]},

      // Parecido com
      { en:"I take after", pt:"Puxei", colII:[
        { en:"my mom", pt:"minha mãe", colIII:[
          {en:"in personality",pt:"na personalidade"},
          {en:"in looks",pt:"na aparência"},
          {en:"in everything",pt:"em tudo"},
          {en:"when I'm stressed",pt:"quando estou estressado"},
        ]},
        { en:"my dad", pt:"meu pai", colIII:[
          {en:"in looks",pt:"na aparência"},
          {en:"in temperament",pt:"no temperamento"},
          {en:"more than I'd like",pt:"mais do que eu queria"},
          {en:"in many ways",pt:"de várias formas"},
        ]},
        { en:"my grandma", pt:"minha avó", colIII:[
          {en:"in personality",pt:"na personalidade"},
          {en:"in cooking",pt:"na cozinha"},
          {en:"more than my mom",pt:"mais que da minha mãe"},
          {en:"in many ways",pt:"de várias formas"},
        ]},
        { en:"my grandpa", pt:"meu avô", colIII:[
          {en:"in looks",pt:"na aparência"},
          {en:"in stubbornness",pt:"na teimosia"},
          {en:"in humor",pt:"no humor"},
          {en:"so my mom says",pt:"segundo minha mãe"},
        ]},
      ]},

      // Admiração
      { en:"I look up to", pt:"Admiro", colII:[
        { en:"my dad", pt:"meu pai", colIII:[
          {en:"because of his work",pt:"pelo trabalho dele"},
          {en:"for his patience",pt:"pela paciência dele"},
          {en:"for raising us",pt:"por ter nos criado"},
          {en:"in many ways",pt:"de várias formas"},
        ]},
        { en:"my mom", pt:"minha mãe", colIII:[
          {en:"for how she handles things",pt:"pelo jeito que ela lida com tudo"},
          {en:"for her strength",pt:"pela força dela"},
          {en:"deeply",pt:"profundamente"},
          {en:"in many ways",pt:"de várias formas"},
        ]},
        { en:"my older sister", pt:"minha irmã mais velha", colIII:[
          {en:"because she went first",pt:"porque ela foi na frente"},
          {en:"for her career",pt:"pela carreira dela"},
          {en:"and learn from her",pt:"e aprendo com ela"},
          {en:"in many ways",pt:"de várias formas"},
        ]},
        { en:"my brother", pt:"meu irmão", colIII:[
          {en:"for his patience",pt:"pela paciência"},
          {en:"because he's a good dad",pt:"porque ele é um bom pai"},
          {en:"in how he treats people",pt:"em como ele trata as pessoas"},
          {en:"deeply",pt:"profundamente"},
        ]},
      ]},

      // Saudade
      { en:"I miss", pt:"Sinto saudade de", colII:[
        { en:"my parents", pt:"meus pais", colIII:[
          {en:"since I moved out",pt:"desde que saí de casa"},
          {en:"a lot lately",pt:"muito ultimamente"},
          {en:"on holidays",pt:"nas festas"},
          {en:"every day",pt:"todo dia"},
        ]},
        { en:"my brother", pt:"meu irmão", colIII:[
          {en:"since he moved",pt:"desde que ele se mudou"},
          {en:"a lot lately",pt:"muito ultimamente"},
          {en:"and his energy",pt:"e da energia dele"},
          {en:"every weekend",pt:"todo fim de semana"},
        ]},
        { en:"my hometown", pt:"minha cidade natal", colIII:[
          {en:"since I moved",pt:"desde que mudei"},
          {en:"in the summer",pt:"no verão"},
          {en:"and the food",pt:"e a comida de lá"},
          {en:"every now and then",pt:"de vez em quando"},
        ]},
        { en:"my grandma", pt:"minha avó", colIII:[
          {en:"since she passed away",pt:"desde que ela faleceu"},
          {en:"every day",pt:"todo dia"},
          {en:"and her cooking",pt:"e da comida dela"},
          {en:"a lot",pt:"muito"},
        ]},
      ]},

      // Moradia
      { en:"I live with", pt:"Moro com", colII:[
        { en:"my parents", pt:"meus pais", colIII:[
          {en:"in São Paulo",pt:"em São Paulo"},
          {en:"for now",pt:"por enquanto"},
          {en:"and my brother",pt:"e meu irmão"},
          {en:"and it's actually nice",pt:"e tá sendo legal"},
        ]},
        { en:"my partner", pt:"meu(minha) parceiro(a)", colIII:[
          {en:"for two years",pt:"há dois anos"},
          {en:"in our apartment",pt:"no nosso apê"},
          {en:"and our dog",pt:"e nosso cachorro"},
          {en:"happily",pt:"felizes"},
        ]},
        { en:"my roommate", pt:"meu colega de apê", colIII:[
          {en:"since college",pt:"desde a faculdade"},
          {en:"in a small apartment",pt:"num apê pequeno"},
          {en:"and we get along",pt:"e a gente se dá bem"},
          {en:"for now",pt:"por enquanto"},
        ]},
        { en:"my dog", pt:"meu cachorro", colIII:[
          {en:"alone with him",pt:"sozinho com ele"},
          {en:"in my apartment",pt:"no meu apê"},
          {en:"and he's the best company",pt:"e ele é a melhor companhia"},
          {en:"for now",pt:"por enquanto"},
        ]},
      ]},

      // Visita
      { en:"I'm visiting", pt:"Vou visitar", colII:[
        { en:"my family", pt:"minha família", colIII:[
          {en:"next weekend",pt:"no fim de semana que vem"},
          {en:"for the holidays",pt:"pras festas"},
          {en:"for a week",pt:"por uma semana"},
          {en:"after a long time",pt:"depois de muito tempo"},
        ]},
        { en:"my cousin", pt:"meu(minha) primo(a)", colIII:[
          {en:"next weekend",pt:"no fim de semana que vem"},
          {en:"for her wedding",pt:"pro casamento dela"},
          {en:"after a year apart",pt:"depois de um ano sem se ver"},
          {en:"in Rio",pt:"no Rio"},
        ]},
        { en:"my grandparents", pt:"meus avós", colIII:[
          {en:"this Sunday",pt:"esse domingo"},
          {en:"every other week",pt:"a cada duas semanas"},
          {en:"for lunch",pt:"pra almoçar"},
          {en:"and helping out",pt:"e ajudando eles"},
        ]},
        { en:"my hometown", pt:"minha cidade natal", colIII:[
          {en:"next month",pt:"mês que vem"},
          {en:"for the holidays",pt:"pras festas"},
          {en:"for the first time in years",pt:"pela primeira vez em anos"},
          {en:"and seeing everyone",pt:"e vendo todo mundo"},
        ]},
      ]},
    ],
    examples: [
      {en:"I'm close to my mom because we talk every day",pt:"Sou próximo da minha mãe porque a gente fala todo dia"},
      {en:"I get along with my parents really well",pt:"Me dou bem com meus pais super bem"},
      {en:"I take after my dad in looks",pt:"Puxei meu pai na aparência"},
      {en:"I look up to my mom for her strength",pt:"Admiro minha mãe pela força dela"},
      {en:"I miss my parents since I moved out",pt:"Sinto saudade dos meus pais desde que saí de casa"},
      {en:"I live with my partner for two years",pt:"Moro com meu parceiro há dois anos"},
      {en:"I'm visiting my family next weekend",pt:"Vou visitar minha família no fim de semana que vem"},
      {en:"I miss my grandma since she passed away",pt:"Sinto saudade da minha avó desde que ela faleceu"},
      {en:"I get along with my in-laws surprisingly",pt:"Me dou bem com meus sogros surpreendentemente"},
    ],
    phrasals: [
      {term:"I'm close to",desc:"Pra relação afetiva próxima. 'Close TO [pessoa]' (com 'to'). Sempre 'MY [parente]' (com possessivo). Combine com motivo: 'because we talk every day' / 'we grew up together'.",ex:[
        {en:"I'm close to my mom because we talk every day",pt:"Sou próximo da minha mãe porque a gente fala todo dia"},
        {en:"I'm close to my brother since we were kids",pt:"Sou próximo do meu irmão desde criança"}
      ]},
      {term:"I get along with",desc:"Pra dizer que a relação é tranquila. 'Get along WITH [pessoa]' (com 'with'). Diferente de 'close to' (afetivo) — 'get along with' é convivência sem conflito.",ex:[
        {en:"I get along with my parents really well",pt:"Me dou bem com meus pais super bem"},
        {en:"I get along with my in-laws surprisingly",pt:"Me dou bem com meus sogros surpreendentemente"}
      ]},
      {term:"I take after",desc:"Pra parecença com parente. 'Take AFTER' (com 'after') = puxar a algum parente. 'In looks' (na aparência) / 'in personality' (na personalidade) / 'in temperament'. Quase sempre com pais ou avós.",ex:[
        {en:"I take after my dad in looks",pt:"Puxei meu pai na aparência"},
        {en:"I take after my mom in personality",pt:"Puxei minha mãe na personalidade"}
      ]},
      {term:"I look up to",desc:"Pra admiração com componente de modelo/mentor. 'Look UP TO' (com 'up to'). Comum com pais, avós, irmãos mais velhos. Diferente de 'admire' (mais geral, sem hierarquia).",ex:[
        {en:"I look up to my dad because of his work",pt:"Admiro meu pai pelo trabalho dele"},
        {en:"I look up to my older sister for her career",pt:"Admiro minha irmã mais velha pela carreira dela"}
      ]},
      {term:"I miss",desc:"Pra saudade. 'Miss [pessoa/lugar]' direto, sem preposição. SEMPRE com objeto: 'miss MY parents' / 'my hometown'. Combine com tempo: 'since I moved out' / 'every day' / 'on holidays'.",ex:[
        {en:"I miss my parents since I moved out",pt:"Sinto saudade dos meus pais desde que saí de casa"},
        {en:"I miss my hometown in the summer",pt:"Sinto saudade da minha cidade natal no verão"}
      ]},
      {term:"I live with",desc:"Pra moradia. 'Live WITH [pessoa]'. Combine com tempo ('for two years' / 'since college') ou lugar ('in São Paulo' / 'in our apartment'). 'Live alone' = morar sozinho (sem 'with').",ex:[
        {en:"I live with my partner for two years",pt:"Moro com meu parceiro há dois anos"},
        {en:"I live with my parents for now",pt:"Moro com meus pais por enquanto"}
      ]},
      {term:"I'm visiting",desc:"Pra visita planejada. 'I'm visiting [pessoa/lugar]' (presente contínuo com sentido de futuro). 'Next weekend' / 'for the holidays' / 'for a week'. Erro clássico: 'I'm going to visit' (correto, mas mais longo).",ex:[
        {en:"I'm visiting my family next weekend",pt:"Vou visitar minha família no fim de semana que vem"},
        {en:"I'm visiting my grandparents this Sunday",pt:"Vou visitar meus avós esse domingo"}
      ]},
    ]
  },

};

})();
