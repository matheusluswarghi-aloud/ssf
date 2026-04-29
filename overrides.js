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
    sub: "Banco & pagamentos",
    desc: "Frases pra qualquer transação financeira em inglês — pagar, sacar, depositar, transferir. Toque em qualquer item da coluna I e qualquer combinação forma uma frase real.",
    0: { replace:true, items:[
      {en:"I'd like to",pt:"Eu gostaria de",s:TRI},
      {en:"I want to",pt:"Eu quero",s:TRI},
      {en:"I need to",pt:"Eu preciso",s:TRI},
      {en:"Can I",pt:"Posso",s:TRI},
      {en:"Could I",pt:"Posso",s:TRI},
      {en:"Where can I",pt:"Onde posso",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"pay",pt:"pagar",s:TRI},
      {en:"withdraw",pt:"sacar",s:TRI},
      {en:"deposit",pt:"depositar",s:TRI},
      {en:"exchange",pt:"trocar",s:TRI},
      {en:"transfer",pt:"transferir",s:TRI},
      {en:"send",pt:"enviar",s:TRI},
      {en:"split",pt:"dividir",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"by credit card",pt:"no cartão",s:TRI},
      {en:"in cash",pt:"em dinheiro",s:TRI},
      {en:"with PayPal",pt:"com PayPal",s:TRI},
      {en:"a hundred dollars",pt:"cem dólares",s:TRI},
      {en:"online",pt:"online",s:TRI},
      {en:"today",pt:"hoje",s:TRI},
      {en:"to my bank",pt:"para meu banco",s:TRI},
      {en:"separately",pt:"separadamente",s:TRI},
      {en:"please",pt:"por favor",s:TRI},
    ]},
    examples: [
      {en:"I'd like to pay by credit card",pt:"Eu gostaria de pagar no cartão"},
      {en:"I want to withdraw a hundred dollars",pt:"Eu quero sacar cem dólares"},
      {en:"I need to deposit in cash today",pt:"Eu preciso depositar em dinheiro hoje"},
      {en:"Can I exchange online?",pt:"Posso trocar online?"},
      {en:"Could I transfer to my bank?",pt:"Posso transferir para meu banco?"},
      {en:"Where can I send with PayPal?",pt:"Onde posso enviar com PayPal?"},
      {en:"I'd like to split separately please",pt:"Eu gostaria de dividir separadamente por favor"},
      {en:"I want to pay in cash",pt:"Eu quero pagar em dinheiro"},
      {en:"I need to send a hundred dollars",pt:"Eu preciso enviar cem dólares"},
    ],
    phrasals: [
      {term:"I'd like to / I want to / I need to",desc:"As três formas mais comuns pra abrir transação financeira. 'I'd like to' é o mais educado e versátil — funciona em banco, lojas, hotéis. 'I want to' é direto. 'I need to' implica urgência.",ex:[
        {en:"I'd like to pay by credit card",pt:"Eu gostaria de pagar no cartão"},
        {en:"I need to deposit in cash today",pt:"Eu preciso depositar em dinheiro hoje"}
      ]},
      {term:"Pay BY card / pay IN cash",desc:"REGRA fundamental: 'pay BY [meio]' (cartão, débito, Pix) e 'pay IN [moeda]' (cash, dollars, reais). Erro clássico do brasileiro: 'pay with card' (errado). Sempre 'BY' pra meio, 'IN' pra moeda física.",ex:[
        {en:"I'd like to pay by credit card",pt:"Eu gostaria de pagar no cartão"},
        {en:"I want to pay in cash",pt:"Eu quero pagar em dinheiro"}
      ]},
      {term:"withdraw / deposit",desc:"Os dois verbos do banco. 'Withdraw' = sacar (tirar dinheiro). 'Deposit' = depositar (colocar dinheiro). Ambos funcionam com valor ('a hundred dollars') ou método ('in cash').",ex:[
        {en:"I want to withdraw a hundred dollars",pt:"Eu quero sacar cem dólares"},
        {en:"I need to deposit in cash today",pt:"Eu preciso depositar em dinheiro hoje"}
      ]},
      {term:"exchange / convert",desc:"Pra trocar moedas (câmbio). 'Exchange' é o padrão; 'convert' é mais técnico. SEMPRE seguido de 'X for Y' quando especifica: 'exchange dollars for euros'.",ex:[
        {en:"Can I exchange online?",pt:"Posso trocar online?"},
        {en:"I need to exchange a hundred dollars",pt:"Eu preciso trocar cem dólares"}
      ]},
      {term:"transfer / send",desc:"'Transfer' é mais formal (banco, transações oficiais). 'Send' é genérico (PayPal, Wise, qualquer pagamento). Pra dinheiro específico: 'transfer money TO [account/bank]'.",ex:[
        {en:"Could I transfer to my bank?",pt:"Posso transferir para meu banco?"},
        {en:"I need to send a hundred dollars",pt:"Eu preciso enviar cem dólares"}
      ]},
      {term:"split",desc:"Dividir conta. 'Split the bill' (com 'the bill') é completo. Em conversa rápida, só 'split' já implica que é a conta. 'Split separately' = cada um paga seu, em vez de dividir igualmente.",ex:[
        {en:"I'd like to split separately please",pt:"Eu gostaria de dividir separadamente por favor"},
        {en:"Can I split today?",pt:"Posso dividir hoje?"}
      ]},
      {term:"online / today / separately",desc:"Especificadores comuns. 'Online' = via internet. 'Today' = urgência temporal. 'Separately' = pra dividir conta. 'Please' = sempre fica bem no final pra educação.",ex:[
        {en:"Can I exchange online?",pt:"Posso trocar online?"},
        {en:"I need to deposit in cash today",pt:"Eu preciso depositar em dinheiro hoje"}
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
    sub: "Lojas & produtos",
    desc: "Frases pra procurar produtos em qualquer loja em inglês. Toque em qualquer item da coluna I e qualquer combinação forma uma frase real.",
    0: { replace:true, items:[
      {en:"I'm looking for",pt:"Estou procurando",s:TRI},
      {en:"Do you have",pt:"Vocês têm",s:TRI},
      {en:"I need",pt:"Preciso de",s:TRI},
      {en:"Where can I find",pt:"Onde encontro",s:TRI},
      {en:"I want",pt:"Eu quero",s:TRI},
      {en:"Could you show me",pt:"Pode me mostrar",s:TRI},
      {en:"I'd like",pt:"Eu gostaria de",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"a shirt",pt:"uma camisa",s:TRI},
      {en:"some jeans",pt:"uma calça jeans",s:TRI},
      {en:"sneakers",pt:"tênis",s:TRI},
      {en:"a dress",pt:"um vestido",s:TRI},
      {en:"a watch",pt:"um relógio",s:TRI},
      {en:"a backpack",pt:"uma mochila",s:TRI},
      {en:"a phone case",pt:"uma capa de celular",s:TRI},
      {en:"a gift",pt:"um presente",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"in size medium",pt:"tamanho médio",s:TRI},
      {en:"in black",pt:"em preto",s:TRI},
      {en:"on sale",pt:"em promoção",s:TRI},
      {en:"under fifty dollars",pt:"abaixo de cinquenta dólares",s:TRI},
      {en:"in stock",pt:"em estoque",s:TRI},
      {en:"with free shipping",pt:"com frete grátis",s:TRI},
      {en:"for a gift",pt:"de presente",s:TRI},
      {en:"in a different color",pt:"em outra cor",s:TRI},
    ]},
    examples: [
      {en:"I'm looking for a shirt in size medium",pt:"Estou procurando uma camisa tamanho médio"},
      {en:"Do you have sneakers on sale?",pt:"Vocês têm tênis em promoção?"},
      {en:"I need a watch under fifty dollars",pt:"Preciso de um relógio abaixo de cinquenta dólares"},
      {en:"Where can I find a backpack with free shipping?",pt:"Onde encontro uma mochila com frete grátis?"},
      {en:"I want some jeans in black",pt:"Eu quero uma calça jeans em preto"},
      {en:"Could you show me a dress in a different color?",pt:"Pode me mostrar um vestido em outra cor?"},
      {en:"I'd like a phone case in stock",pt:"Eu gostaria de uma capa de celular em estoque"},
      {en:"Do you have a gift for a gift?",pt:"Vocês têm um presente de presente?"},
      {en:"I'm looking for a dress for a gift",pt:"Estou procurando um vestido de presente"},
    ],
    phrasals: [
      {term:"I'm looking for / Do you have",desc:"As duas formas mais comuns pra começar busca em loja. 'I'm looking for' (estou procurando) implica que ainda decide; 'Do you have' é direto. Sempre seguido de 'a/an' + item.",ex:[
        {en:"I'm looking for a shirt in size medium",pt:"Estou procurando uma camisa tamanho médio"},
        {en:"Do you have sneakers on sale?",pt:"Vocês têm tênis em promoção?"}
      ]},
      {term:"I need / I want",desc:"'I need' soa mais necessário (mais educado em compras). 'I want' é direto e claro. Os dois aceitam 'a/an' + item.",ex:[
        {en:"I need a watch under fifty dollars",pt:"Preciso de um relógio abaixo de cinquenta dólares"},
        {en:"I want some jeans in black",pt:"Eu quero uma calça jeans em preto"}
      ]},
      {term:"Where can I find",desc:"Pra perguntar onde está localizado o produto na loja. Resposta provável: 'Aisle 3' (corredor 3) ou 'Second floor' (segundo andar).",ex:[
        {en:"Where can I find a backpack?",pt:"Onde encontro uma mochila?"},
        {en:"Where can I find sneakers in size medium?",pt:"Onde encontro tênis tamanho médio?"}
      ]},
      {term:"Could you show me / I'd like",desc:"'Could you show me' = pra pedir pra atendente trazer/mostrar item específico. 'I'd like' é o mais educado e versátil ('eu gostaria de'). Os dois funcionam em qualquer loja.",ex:[
        {en:"Could you show me a dress in a different color?",pt:"Pode me mostrar um vestido em outra cor?"},
        {en:"I'd like a phone case in stock",pt:"Eu gostaria de uma capa de celular em estoque"}
      ]},
      {term:"in size [tamanho]",desc:"Forma padrão pra especificar tamanho. 'In size medium/large/XL'. Note: SEM artigo ('in size A medium' está errado). Tamanhos: small/medium/large/extra-large/XL.",ex:[
        {en:"I'm looking for a shirt in size medium",pt:"Estou procurando uma camisa tamanho médio"},
        {en:"Do you have sneakers in size large?",pt:"Vocês têm tênis tamanho grande?"}
      ]},
      {term:"on sale / under [preço]",desc:"Pra falar de preço/promoção. 'On sale' = em promoção. 'Under fifty dollars' = abaixo de cinquenta dólares. 'In stock' = em estoque. 'With free shipping' = com frete grátis.",ex:[
        {en:"Do you have sneakers on sale?",pt:"Vocês têm tênis em promoção?"},
        {en:"I need a watch under fifty dollars",pt:"Preciso de um relógio abaixo de cinquenta dólares"}
      ]},
      {term:"in [color] / in a different color",desc:"Pra falar de cor. 'In black/blue/red'. 'In a different color' = em outra cor. SEMPRE preposição 'in' (não 'with' ou 'of'). Erro clássico do brasileiro: 'with black color' (errado).",ex:[
        {en:"I want some jeans in black",pt:"Eu quero uma calça jeans em preto"},
        {en:"Could you show me a dress in a different color?",pt:"Pode me mostrar um vestido em outra cor?"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // FOOD — Pedir num restaurante (single-frame)
  // Frame: [order opener] + [dish/drink] + [modifier]
  // Example: "I'd like to order the steak well-done"
  // ════════════════════════════════════════════
  "cooking-1": {
    title: "food",
    sub: "Restaurantes & pedidos",
    desc: "Frases pra pedir num restaurante em inglês — qualquer prato, qualquer modificação. Toque em qualquer item da coluna I e qualquer combinação forma uma frase real.",
    0: { replace:true, items:[
      {en:"I'd like to order",pt:"Eu gostaria de pedir",s:TRI},
      {en:"I'll have",pt:"Vou querer",s:TRI},
      {en:"Can I get",pt:"Posso pedir",s:TRI},
      {en:"Could I have",pt:"Posso ter",s:TRI},
      {en:"I want",pt:"Eu quero",s:TRI},
      {en:"I'll start with",pt:"Vou começar com",s:TRI},
      {en:"For me,",pt:"Pra mim,",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"the steak",pt:"o bife",s:TRI},
      {en:"the pasta",pt:"a massa",s:TRI},
      {en:"the salad",pt:"a salada",s:TRI},
      {en:"a coffee",pt:"um café",s:TRI},
      {en:"a beer",pt:"uma cerveja",s:TRI},
      {en:"a glass of wine",pt:"uma taça de vinho",s:TRI},
      {en:"the chicken",pt:"o frango",s:TRI},
      {en:"the soup",pt:"a sopa",s:TRI},
      {en:"a sandwich",pt:"um sanduíche",s:TRI},
      {en:"the special",pt:"o prato do dia",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"well-done",pt:"bem passado",s:TRI},
      {en:"medium",pt:"ao ponto",s:TRI},
      {en:"with extra cheese",pt:"com extra queijo",s:TRI},
      {en:"without onions",pt:"sem cebola",s:TRI},
      {en:"to go",pt:"pra viagem",s:TRI},
      {en:"on the side",pt:"à parte",s:TRI},
      {en:"please",pt:"por favor",s:TRI},
      {en:"to share",pt:"pra dividir",s:TRI},
      {en:"to start with",pt:"pra começar",s:TRI},
    ]},
    examples: [
      {en:"I'd like to order the steak well-done",pt:"Eu gostaria de pedir o bife bem passado"},
      {en:"I'll have the pasta with extra cheese",pt:"Vou querer a massa com extra queijo"},
      {en:"Can I get a coffee to go please?",pt:"Posso pedir um café pra viagem por favor?"},
      {en:"Could I have a beer please?",pt:"Posso ter uma cerveja por favor?"},
      {en:"I want the chicken without onions",pt:"Eu quero o frango sem cebola"},
      {en:"I'll start with the salad to share",pt:"Vou começar com a salada pra dividir"},
      {en:"For me, the soup on the side",pt:"Pra mim, a sopa à parte"},
      {en:"I'd like to order the special medium",pt:"Eu gostaria de pedir o prato do dia ao ponto"},
      {en:"Could I have a glass of wine to start with",pt:"Posso ter uma taça de vinho pra começar"},
    ],
    phrasals: [
      {term:"I'd like to order / I'll have",desc:"As duas formas mais usadas pra pedir num restaurante. 'I'd like to order' é formal/completa, ideal pra restaurantes mais elegantes. 'I'll have' é casual e funciona em qualquer contexto. Sempre seguido de 'the/a' + prato.",ex:[
        {en:"I'd like to order the steak well-done",pt:"Eu gostaria de pedir o bife bem passado"},
        {en:"I'll have the pasta with extra cheese",pt:"Vou querer a massa com extra queijo"}
      ]},
      {term:"Can I get / Could I have",desc:"Pedidos rápidos em cafés, bares, fast food. 'Can I get' é mais americano e direto; 'Could I have' é britânico, mais educado. Os dois funcionam.",ex:[
        {en:"Can I get a coffee to go?",pt:"Posso pedir um café pra viagem?"},
        {en:"Could I have a beer please?",pt:"Posso ter uma cerveja por favor?"}
      ]},
      {term:"I want / For me",desc:"Formas mais diretas. 'I want' é coloquial mas pode soar grosso sem 'please'. 'For me' é uma forma simpática quando todo mundo está pedindo na mesa, tipo 'pra mim'.",ex:[
        {en:"I want the chicken without onions",pt:"Eu quero o frango sem cebola"},
        {en:"For me, the soup on the side",pt:"Pra mim, a sopa à parte"}
      ]},
      {term:"I'll start with",desc:"Pra pedir uma entrada ou aperitivo. 'Start with' deixa claro que tem mais coisa vindo depois. Bom pra refeições com vários pratos.",ex:[
        {en:"I'll start with the salad to share",pt:"Vou começar com a salada pra dividir"},
        {en:"I'll start with a glass of wine please",pt:"Vou começar com uma taça de vinho por favor"}
      ]},
      {term:"well-done / medium",desc:"Como pedir o ponto da carne. 'Rare' (mal-passada), 'medium-rare' (mal-ao-ponto), 'medium' (ao-ponto), 'medium-well' (passado-ao-ponto), 'well-done' (bem-passada). Note: 'well-done' (com hífen) é o termo correto.",ex:[
        {en:"I'd like to order the steak well-done",pt:"Eu gostaria de pedir o bife bem passado"},
        {en:"I'll have the chicken medium",pt:"Vou querer o frango ao ponto"}
      ]},
      {term:"with extra / without",desc:"Modificações no prato. 'With extra [X]' = com mais. 'Without [X]' = sem. Sempre seguido de substantivo. 'With no [X]' também funciona pra negar (sinônimo de 'without').",ex:[
        {en:"I'll have the pasta with extra cheese",pt:"Vou querer a massa com extra queijo"},
        {en:"I want the chicken without onions",pt:"Eu quero o frango sem cebola"}
      ]},
      {term:"to go / on the side / to share",desc:"Especificações comuns. 'To go' = pra levar (take-away). 'On the side' = à parte (molho separado, por exemplo). 'To share' = pra dividir (entradas, sobremesas).",ex:[
        {en:"Can I get a coffee to go?",pt:"Posso pedir um café pra viagem?"},
        {en:"For me, the soup on the side",pt:"Pra mim, a sopa à parte"}
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
    sub: "Ligações & reuniões",
    desc: "Frases pra qualquer ligação ou call em inglês — pedir pra falar com alguém, deixar recado. Toque em qualquer item da coluna I e qualquer combinação forma uma frase real.",
    0: { replace:true, items:[
      {en:"Could I",pt:"Posso",s:TRI},
      {en:"Can I",pt:"Posso",s:TRI},
      {en:"I'd like to",pt:"Eu gostaria de",s:TRI},
      {en:"I need to",pt:"Eu preciso",s:TRI},
      {en:"Is it possible to",pt:"É possível",s:TRI},
      {en:"I'm trying to",pt:"Estou tentando",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"speak to the manager",pt:"falar com o gerente",s:TRI},
      {en:"call customer service",pt:"ligar pro atendimento",s:TRI},
      {en:"talk to someone in HR",pt:"falar com alguém do RH",s:TRI},
      {en:"leave a message",pt:"deixar uma mensagem",s:TRI},
      {en:"schedule a call",pt:"marcar uma call",s:TRI},
      {en:"get connected",pt:"ser conectado(a)",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"today",pt:"hoje",s:TRI},
      {en:"later",pt:"mais tarde",s:TRI},
      {en:"right now",pt:"agora",s:TRI},
      {en:"about the issue",pt:"sobre a questão",s:TRI},
      {en:"urgently",pt:"urgentemente",s:TRI},
      {en:"please",pt:"por favor",s:TRI},
      {en:"when possible",pt:"quando possível",s:TRI},
      {en:"before noon",pt:"antes do meio-dia",s:TRI},
    ]},
    examples: [
      {en:"Could I speak to the manager today?",pt:"Posso falar com o gerente hoje?"},
      {en:"Can I call customer service later?",pt:"Posso ligar pro atendimento mais tarde?"},
      {en:"I'd like to talk to someone in HR right now",pt:"Eu gostaria de falar com alguém do RH agora"},
      {en:"I need to leave a message about the issue",pt:"Eu preciso deixar uma mensagem sobre a questão"},
      {en:"Is it possible to schedule a call urgently?",pt:"É possível marcar uma call urgentemente?"},
      {en:"I'm trying to get connected please",pt:"Estou tentando ser conectado por favor"},
      {en:"Could I speak to the manager before noon?",pt:"Posso falar com o gerente antes do meio-dia?"},
      {en:"Can I leave a message when possible?",pt:"Posso deixar uma mensagem quando possível?"},
      {en:"I'd like to schedule a call today",pt:"Eu gostaria de marcar uma call hoje"},
    ],
    phrasals: [
      {term:"Could I / Can I / May I",desc:"Os três níveis de formalidade pra pedir conexão. 'Could I' é o padrão educado. 'Can I' é mais casual. 'May I' é máxima formalidade (raro em telefone, mais em e-mail).",ex:[
        {en:"Could I speak to the manager today?",pt:"Posso falar com o gerente hoje?"},
        {en:"Can I call customer service later?",pt:"Posso ligar pro atendimento mais tarde?"}
      ]},
      {term:"speak to / talk to",desc:"REGRA importante: SEMPRE 'speak TO [pessoa]' ou 'talk TO [pessoa]'. Erro clássico do brasileiro: 'speak with' (errado em American English padrão). 'Speak to' = mais formal; 'talk to' = mais casual.",ex:[
        {en:"Could I speak to the manager?",pt:"Posso falar com o gerente?"},
        {en:"I'd like to talk to someone in HR",pt:"Eu gostaria de falar com alguém do RH"}
      ]},
      {term:"call customer service",desc:"'Call' como verbo = ligar. 'Customer service' = atendimento ao cliente (sempre singular, incontável). NÃO usar 'phone' como verbo na maioria dos contextos profissionais — 'call' é mais natural.",ex:[
        {en:"Can I call customer service later?",pt:"Posso ligar pro atendimento mais tarde?"},
        {en:"I need to call customer service today",pt:"Eu preciso ligar pro atendimento hoje"}
      ]},
      {term:"leave a message",desc:"Frase exata pra recado. SEMPRE 'leave A message' (com 'a'). Funciona quando a pessoa não pode atender. Pode adicionar 'for [pessoa]' pra especificar destinatário ('leave a message for the manager').",ex:[
        {en:"I need to leave a message about the issue",pt:"Eu preciso deixar uma mensagem sobre a questão"},
        {en:"Can I leave a message when possible?",pt:"Posso deixar uma mensagem quando possível?"}
      ]},
      {term:"schedule a call",desc:"Pra marcar uma call/reunião. 'Schedule' (verbo) = agendar. SEMPRE 'a call' / 'a meeting' (com 'a'). Não confundir com 'reschedule' (remarcar). 'Set up a call' é sinônimo informal.",ex:[
        {en:"Is it possible to schedule a call urgently?",pt:"É possível marcar uma call urgentemente?"},
        {en:"I'd like to schedule a call today",pt:"Eu gostaria de marcar uma call hoje"}
      ]},
      {term:"get connected",desc:"Phrasal verb passivo pra 'ser conectado' (telefonista te transfere). 'Get connected TO [pessoa]' especifica quem. Sem objeto, é genérico. Comum em sistemas automatizados.",ex:[
        {en:"I'm trying to get connected please",pt:"Estou tentando ser conectado por favor"},
        {en:"Could I get connected to the manager?",pt:"Posso ser conectado ao gerente?"}
      ]},
      {term:"about the issue / urgently / before noon",desc:"Especificadores comuns. 'About the issue' = sobre a questão (motivo). 'Urgently' = urgente (prioridade). 'Before noon' = antes do meio-dia (deadline). 'When possible' = quando puder (flexível). Todos cabem no fim da frase.",ex:[
        {en:"I need to leave a message about the issue",pt:"Eu preciso deixar uma mensagem sobre a questão"},
        {en:"Could I speak to the manager before noon?",pt:"Posso falar com o gerente antes do meio-dia?"}
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
    sub: "Reservas & viagem",
    desc: "Frases pra reservar e gerenciar viagem em inglês — voo, hotel, tour. Toque em qualquer item da coluna I e qualquer combinação forma uma frase real.",
    0: { replace:true, items:[
      {en:"I'd like to",pt:"Eu gostaria de",s:TRI},
      {en:"I want to",pt:"Eu quero",s:TRI},
      {en:"I need to",pt:"Eu preciso",s:TRI},
      {en:"Could I",pt:"Posso",s:TRI},
      {en:"Can I",pt:"Posso",s:TRI},
      {en:"I'm trying to",pt:"Estou tentando",s:TRI},
      {en:"I just want to",pt:"Só quero",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"book a room",pt:"reservar um quarto",s:TRI},
      {en:"book a flight",pt:"reservar um voo",s:TRI},
      {en:"cancel my reservation",pt:"cancelar minha reserva",s:TRI},
      {en:"change my booking",pt:"mudar minha reserva",s:TRI},
      {en:"check in",pt:"fazer check-in",s:TRI},
      {en:"check out",pt:"fazer check-out",s:TRI},
      {en:"extend my stay",pt:"estender minha estadia",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"today",pt:"hoje",s:TRI},
      {en:"for tonight",pt:"pra hoje à noite",s:TRI},
      {en:"online",pt:"online",s:TRI},
      {en:"in advance",pt:"com antecedência",s:TRI},
      {en:"for two nights",pt:"por duas noites",s:TRI},
      {en:"before noon",pt:"antes do meio-dia",s:TRI},
      {en:"right now",pt:"agora",s:TRI},
      {en:"please",pt:"por favor",s:TRI},
    ]},
    examples: [
      {en:"I'd like to book a room for tonight",pt:"Eu gostaria de reservar um quarto pra hoje à noite"},
      {en:"I want to book a flight online",pt:"Eu quero reservar um voo online"},
      {en:"I need to cancel my reservation today",pt:"Eu preciso cancelar minha reserva hoje"},
      {en:"Could I change my booking in advance?",pt:"Posso mudar minha reserva com antecedência?"},
      {en:"Can I check in before noon?",pt:"Posso fazer check-in antes do meio-dia?"},
      {en:"I'm trying to check out right now",pt:"Estou tentando fazer check-out agora"},
      {en:"I just want to extend my stay for two nights",pt:"Só quero estender minha estadia por duas noites"},
      {en:"I'd like to book a flight please",pt:"Eu gostaria de reservar um voo por favor"},
      {en:"I need to extend my stay today",pt:"Eu preciso estender minha estadia hoje"},
    ],
    phrasals: [
      {term:"book a room / book a flight",desc:"'Book' é o verbo padrão pra reservar. SEMPRE 'book A room' (com 'a'). 'Book' funciona pra qualquer coisa: voo, quarto, mesa, tour. Diferente de 'reserve' que é mais formal e raro em conversa.",ex:[
        {en:"I'd like to book a room for tonight",pt:"Eu gostaria de reservar um quarto pra hoje à noite"},
        {en:"I want to book a flight online",pt:"Eu quero reservar um voo online"}
      ]},
      {term:"cancel my reservation",desc:"Pra cancelar. 'Reservation' é o substantivo (a reserva); 'booking' é sinônimo. SEMPRE 'cancel MY reservation' ou 'cancel THE booking' — nunca sem artigo. Bom adicionar 'today' ou 'in advance'.",ex:[
        {en:"I need to cancel my reservation today",pt:"Eu preciso cancelar minha reserva hoje"},
        {en:"Could I cancel my booking in advance?",pt:"Posso cancelar minha reserva com antecedência?"}
      ]},
      {term:"change my booking",desc:"Pra alterar reserva (data, horário, quarto). 'Change' é flexível. 'Modify' é mais formal/técnico. 'Reschedule' é específico pra mudar horário/data.",ex:[
        {en:"Could I change my booking in advance?",pt:"Posso mudar minha reserva com antecedência?"},
        {en:"I want to change my booking for tonight",pt:"Eu quero mudar minha reserva pra hoje à noite"}
      ]},
      {term:"check in / check out",desc:"Os dois verbos universais em hotéis/aeroportos. 'Check IN' = entrar (chegar). 'Check OUT' = sair (partir). Note: SEMPRE separados ('check in', não 'checkin'). Como substantivo: 'check-in' (com hífen).",ex:[
        {en:"Can I check in before noon?",pt:"Posso fazer check-in antes do meio-dia?"},
        {en:"I'm trying to check out right now",pt:"Estou tentando fazer check-out agora"}
      ]},
      {term:"extend my stay",desc:"Pra estender estadia em hotel. 'Stay' é o substantivo (a estadia). SEMPRE 'extend MY stay' (com possessivo). 'For [duração]' especifica quantos dias a mais.",ex:[
        {en:"I just want to extend my stay for two nights",pt:"Só quero estender minha estadia por duas noites"},
        {en:"I need to extend my stay today",pt:"Eu preciso estender minha estadia hoje"}
      ]},
      {term:"I'd like to / I want to / I need to",desc:"As três formas pra abrir pedido. 'I'd like to' é o mais educado (use em hotéis 5 estrelas). 'I want to' é direto, casual. 'I need to' implica urgência. Os três pedem verbo no infinitivo SEM 'to' extra.",ex:[
        {en:"I'd like to book a room for tonight",pt:"Eu gostaria de reservar um quarto pra hoje à noite"},
        {en:"I need to extend my stay today",pt:"Eu preciso estender minha estadia hoje"}
      ]},
      {term:"in advance / before noon / right now",desc:"Especificadores de tempo. 'In advance' = com antecedência (planejamento). 'Before noon' = antes do meio-dia (deadline específico). 'Right now' = agora (urgência). 'Today' = hoje. Todos cabem no fim da frase.",ex:[
        {en:"Could I change my booking in advance?",pt:"Posso mudar minha reserva com antecedência?"},
        {en:"Can I check in before noon?",pt:"Posso fazer check-in antes do meio-dia?"}
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
