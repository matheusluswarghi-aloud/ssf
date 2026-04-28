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
  // MONEY
  // ◣ I will [vb] [obj] [tempo/propósito]
  // ♥ I have [vb] [obj] [contexto]
  // ● I am [vb-ing] [obj] [propósito]
  // ▲ I had to [vb] [obj] for [propósito]
  // ◀ I’ve been [vb] [obj] [propósito]
  // ════════════════════════════════════════════
  "money": {
    0: { replace:true, items:[
      {en:"I will",pt:"Eu irei",s:TRI},
      {en:"I have",pt:"Eu",s:HRT},
      {en:"I am",pt:"Eu estou",s:DOT},
      {en:"I had to",pt:"Eu precisei",s:UP},
      {en:"I’ve been",pt:"Eu fui",s:LFT},
    ]},
    1: { replace:true, items:[
      {en:"pay off",pt:"pagar",s:TRI},
      {en:"put down",pt:"pagar (entrada)",s:TRI},
      {en:"run up",pt:"acumulei",s:HRT},
      {en:"come into",pt:"ganhei",s:HRT},
      {en:"squirreled away",pt:"guardei",s:HRT},
      {en:"splashed out",pt:"torrei",s:HRT},
      {en:"saving up",pt:"economizando",s:DOT},
      {en:"putting aside",pt:"separando",s:DOT},
      {en:"fork out",pt:"desembolsar",s:UP},
      {en:"ripped off",pt:"levei facada",s:LFT},
    ]},
    2: { replace:true, items:[
      {en:"my credit card",pt:"meu cartão",s:TRI},
      {en:"my debts",pt:"minhas contas",s:TRI},
      {en:"a thousand",pt:"mil",s:TRI},
      {en:"an enormous bill",pt:"uma conta enorme",s:HRT},
      {en:"a fortune",pt:"uma fortuna",s:HRT},
      {en:"an inheritance",pt:"uma herança",s:HRT},
      {en:"my savings",pt:"minhas economias",s:HRT},
      {en:"some money",pt:"um dinheiro",s:DOT},
      {en:"a thousand reais",pt:"mil reais",s:DOT},
      {en:"a fortune",pt:"uma fortuna",s:UP},
      {en:"a lot of money",pt:"muito dinheiro",s:UP},
      {en:"by",pt:"por/pelo(a)",s:LFT},
    ]},
    3: { replace:true, items:[
      {en:"first",pt:"primeiro",s:TRI},
      {en:"this month",pt:"esse mês",s:TRI},
      {en:"as a deposit",pt:"como entrada",s:TRI},
      {en:"recently",pt:"recentemente",s:HRT},
      {en:"this week",pt:"essa semana",s:HRT},
      {en:"on a car",pt:"em um carro",s:HRT},
      {en:"for the future",pt:"para o futuro",s:HRT},
      {en:"every month",pt:"todo mês",s:DOT},
      {en:"to buy a bike",pt:"para comprar uma bike",s:DOT},
      {en:"for a trip",pt:"para uma viagem",s:DOT},
      {en:"for the service",pt:"pelo serviço",s:UP},
      {en:"on a fine",pt:"em uma multa",s:UP},
      {en:"the agency",pt:"a agência",s:LFT},
      {en:"the store",pt:"a loja",s:LFT},
    ]},
  },

  // ════════════════════════════════════════════
  // HEALTH
  // ◣ I have [vb] [doença/sintoma] [contexto]
  // ♥ I am [vb-ing] [obj] [contexto]
  // ● I [vb] [obj] [tempo/propósito]
  // ▲ My [familiar] passed away [contexto]
  // ◀ I was [laid up] with [doença] [tempo]
  // ════════════════════════════════════════════
  "health": {
    0: { replace:true, items:[
      {en:"I have",pt:"Eu",s:TRI},
      {en:"I am",pt:"Eu estou",s:HRT},
      {en:"I",pt:"Eu",s:DOT},
      {en:"My",pt:"Meu/minha",s:UP},
      {en:"I was",pt:"Eu estava",s:LFT},
    ]},
    1: { replace:true, items:[
      {en:"broken out in",pt:"tive",s:TRI},
      {en:"come down with",pt:"fiquei com",s:TRI},
      {en:"thrown up",pt:"vomitei",s:TRI},
      {en:"got over",pt:"me recuperei de",s:TRI},
      {en:"fighting off",pt:"lutando contra",s:HRT},
      {en:"trying to shake off",pt:"tentando me livrar de",s:HRT},
      {en:"work out",pt:"me exercito",s:DOT},
      {en:"warm up",pt:"aqueço",s:DOT},
      {en:"passed out",pt:"desmaiei",s:DOT},
      {en:"come to",pt:"recobrei consciência",s:DOT},
      {en:"mum",pt:"mãe",s:UP},
      {en:"dad",pt:"pai",s:UP},
      {en:"grandfather",pt:"avô",s:UP},
      {en:"laid up",pt:"de cama",s:LFT},
    ]},
    2: { replace:true, items:[
      {en:"a rash",pt:"uma irritação",s:TRI},
      {en:"a cold",pt:"um resfriado",s:TRI},
      {en:"a flu",pt:"uma gripe",s:TRI},
      {en:"a hangover",pt:"uma ressaca",s:TRI},
      {en:"a virus",pt:"um vírus",s:HRT},
      {en:"this cold",pt:"esse resfriado",s:HRT},
      {en:"this tiredness",pt:"esse cansaço",s:HRT},
      {en:"with weights",pt:"com pesos",s:DOT},
      {en:"at the gym",pt:"na academia",s:DOT},
      {en:"before running",pt:"antes de correr",s:DOT},
      {en:"after the surgery",pt:"depois da cirurgia",s:DOT},
      {en:"passed away",pt:"faleceu",s:UP},
      {en:"with a flu",pt:"com uma gripe",s:LFT},
      {en:"with fever",pt:"com febre",s:LFT},
    ]},
    3: { replace:true, items:[
      {en:"lately",pt:"ultimamente",s:TRI},
      {en:"this week",pt:"essa semana",s:TRI},
      {en:"after the trip",pt:"depois da viagem",s:TRI},
      {en:"with herbs",pt:"com ervas",s:HRT},
      {en:"with medicine",pt:"com remédios",s:HRT},
      {en:"every day",pt:"todo dia",s:DOT},
      {en:"twice a week",pt:"duas vezes por semana",s:DOT},
      {en:"this morning",pt:"essa manhã",s:DOT},
      {en:"last year",pt:"ano passado",s:UP},
      {en:"recently",pt:"recentemente",s:UP},
      {en:"for a week",pt:"por uma semana",s:LFT},
      {en:"for days",pt:"por dias",s:LFT},
    ]},
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
  // EDUCATION
  // ◣ I am [vb-ing] [obj] [contexto]
  // ♥ I have [vb] [obj] [contexto]
  // ● I [vb] [obj] [contexto]
  // ▲ I will [vb] [obj] [contexto]
  // ════════════════════════════════════════════
  "education": {
    0: { replace:true, items:[
      {en:"I am",pt:"Eu estou",s:TRI},
      {en:"I have",pt:"Eu",s:HRT},
      {en:"I",pt:"Eu",s:DOT},
      {en:"I will",pt:"Eu irei",s:UP},
    ]},
    1: { replace:true, items:[
      {en:"trying to catch up with",pt:"tentando acompanhar",s:TRI},
      {en:"struggling to go over",pt:"lutando para revisar",s:TRI},
      {en:"reading up on",pt:"lendo sobre",s:TRI},
      {en:"copying out",pt:"copiando",s:TRI},
      {en:"taken up",pt:"comecei",s:HRT},
      {en:"handed in",pt:"entreguei",s:HRT},
      {en:"dropped out of",pt:"larguei",s:HRT},
      {en:"fallen behind in",pt:"fiquei pra trás em",s:HRT},
      {en:"hand out",pt:"distribuir",s:UP},
      {en:"teach",pt:"ensinar",s:UP},
      {en:"memorize",pt:"memorizar",s:DOT},
      {en:"recite",pt:"recitar",s:DOT},
    ]},
    2: { replace:true, items:[
      {en:"my essay",pt:"minha redação",s:TRI},
      {en:"this material",pt:"esse material",s:TRI},
      {en:"this subject",pt:"esse assunto",s:TRI},
      {en:"my homework",pt:"meu dever",s:HRT},
      {en:"a new hobby",pt:"um novo hobby",s:HRT},
      {en:"college",pt:"a faculdade",s:HRT},
      {en:"the leaflets",pt:"os folhetos",s:UP},
      {en:"the books",pt:"os livros",s:UP},
      {en:"a poem",pt:"um poema",s:DOT},
      {en:"the equation",pt:"a equação",s:DOT},
    ]},
    3: { replace:true, items:[
      {en:"before the test",pt:"antes da prova",s:TRI},
      {en:"for school",pt:"para a escola",s:TRI},
      {en:"this week",pt:"essa semana",s:TRI},
      {en:"lately",pt:"ultimamente",s:HRT},
      {en:"recently",pt:"recentemente",s:HRT},
      {en:"this year",pt:"esse ano",s:HRT},
      {en:"to the group",pt:"para o grupo",s:UP},
      {en:"to everybody",pt:"para todos",s:UP},
      {en:"in front of class",pt:"na frente da turma",s:DOT},
      {en:"by heart",pt:"de cor",s:DOT},
    ]},
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
  // AT HOME
  // ◣ I [vb] [obj] [contexto]
  // ♥ I have [vb] [obj] [contexto]
  // ● I am [vb-ing] [obj] [contexto]
  // ════════════════════════════════════════════
  "at-home": {
    0: { replace:true, items:[
      {en:"I",pt:"Eu",s:TRI},
      {en:"I have",pt:"Eu",s:HRT},
      {en:"I am",pt:"Eu estou",s:DOT},
    ]},
    1: { replace:true, items:[
      {en:"take out",pt:"levo para fora",s:TRI},
      {en:"throw away",pt:"jogo fora",s:TRI},
      {en:"put on",pt:"coloco pra tocar",s:TRI},
      {en:"tidied up",pt:"arrumei",s:HRT},
      {en:"mopped up",pt:"sequei",s:HRT},
      {en:"put away",pt:"guardei",s:HRT},
      {en:"put up",pt:"pendurei",s:HRT},
      {en:"turned on",pt:"liguei",s:HRT},
      {en:"turned off",pt:"desliguei",s:HRT},
      {en:"put out",pt:"apaguei",s:HRT},
      {en:"stocking up on",pt:"estocando",s:DOT},
      {en:"setting up",pt:"montando",s:DOT},
      {en:"putting the pot",pt:"pondo a panela",s:DOT},
    ]},
    2: { replace:true, items:[
      {en:"the trash",pt:"o lixo",s:TRI},
      {en:"old papers",pt:"papéis velhos",s:TRI},
      {en:"some music",pt:"uma música",s:TRI},
      {en:"the bedroom",pt:"o quarto",s:HRT},
      {en:"the living room",pt:"a sala",s:HRT},
      {en:"the kitchen",pt:"a cozinha",s:HRT},
      {en:"the picture",pt:"o quadro",s:HRT},
      {en:"the TV",pt:"a TV",s:HRT},
      {en:"the candle",pt:"a vela",s:HRT},
      {en:"food",pt:"comida",s:DOT},
      {en:"drinks",pt:"bebidas",s:DOT},
      {en:"the table",pt:"a mesa",s:DOT},
      {en:"on the stove",pt:"no fogão",s:DOT},
    ]},
    3: { replace:true, items:[
      {en:"every day",pt:"todo dia",s:TRI},
      {en:"every week",pt:"toda semana",s:TRI},
      {en:"to relax",pt:"para relaxar",s:TRI},
      {en:"this morning",pt:"essa manhã",s:HRT},
      {en:"on the wall",pt:"na parede",s:HRT},
      {en:"with a towel",pt:"com uma toalha",s:HRT},
      {en:"before bed",pt:"antes de dormir",s:HRT},
      {en:"for the party",pt:"para a festa",s:DOT},
      {en:"for the week",pt:"para a semana",s:DOT},
      {en:"now",pt:"agora",s:DOT},
    ]},
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
  // SHOPPING
  // ◣ I have [vb] [obj] [tempo]
  // ♥ I am going to [vb] [obj] [contexto]
  // ● I [vb] [obj] [contexto]
  // ▲ It set me back [valor]
  // ════════════════════════════════════════════
  "shopping": {
    0: { replace:true, items:[
      {en:"I have",pt:"Eu",s:TRI},
      {en:"I’m going to",pt:"Eu irei",s:HRT},
      {en:"I",pt:"Eu",s:DOT},
      {en:"It",pt:"Isso",s:UP},
    ]},
    1: { replace:true, items:[
      {en:"paid for",pt:"paguei",s:TRI},
      {en:"tried on",pt:"experimentei",s:TRI},
      {en:"queued up",pt:"esperei na fila",s:TRI},
      {en:"tried out",pt:"testei",s:TRI},
      {en:"pop into",pt:"dar uma passada em",s:HRT},
      {en:"shop around for",pt:"pesquisar por",s:HRT},
      {en:"bring down",pt:"abaixar",s:HRT},
      {en:"often pay",pt:"geralmente pago",s:DOT},
      {en:"rarely buy",pt:"raramente compro",s:DOT},
      {en:"set me back",pt:"me custou",s:UP},
    ]},
    2: { replace:true, items:[
      {en:"a shirt",pt:"uma camisa",s:TRI},
      {en:"a pair of pants",pt:"uma calça",s:TRI},
      {en:"a dress",pt:"um vestido",s:TRI},
      {en:"the service",pt:"o serviço",s:TRI},
      {en:"the store",pt:"a loja",s:HRT},
      {en:"the grocery",pt:"o mercado",s:HRT},
      {en:"the best deals",pt:"as melhores ofertas",s:HRT},
      {en:"the price",pt:"o preço",s:HRT},
      {en:"in cash",pt:"em dinheiro",s:DOT},
      {en:"by card",pt:"no cartão",s:DOT},
      {en:"a thousand reais",pt:"mil reais",s:UP},
      {en:"a fortune",pt:"uma fortuna",s:UP},
    ]},
    3: { replace:true, items:[
      {en:"lately",pt:"ultimamente",s:TRI},
      {en:"this week",pt:"essa semana",s:TRI},
      {en:"for hours",pt:"por horas",s:TRI},
      {en:"after work",pt:"depois do trabalho",s:HRT},
      {en:"online",pt:"online",s:HRT},
      {en:"this weekend",pt:"esse fim de semana",s:HRT},
      {en:"every time",pt:"toda vez",s:DOT},
      {en:"at the till",pt:"no caixa",s:DOT},
      {en:"in cash",pt:"em dinheiro",s:UP},
      {en:"on the spot",pt:"na hora",s:UP},
    ]},
  },

  // ════════════════════════════════════════════
  // COOKING 1
  // ◣ I am [vb-ing] [ingrediente] [propósito]
  // ════════════════════════════════════════════
  "cooking-1": {
    0: { replace:true, items:[
      {en:"I am",pt:"Eu estou",s:TRI},
    ]},
    1: { replace:true, items:[
      {en:"spreading some",pt:"passando",s:TRI},
      {en:"peeling",pt:"descascando",s:TRI},
      {en:"chopping",pt:"picando",s:TRI},
      {en:"slicing",pt:"fatiando",s:TRI},
      {en:"grating",pt:"ralando",s:TRI},
      {en:"mixing",pt:"misturando",s:TRI},
      {en:"whipping",pt:"batendo",s:TRI},
      {en:"tasting",pt:"provando",s:TRI},
      {en:"boiling",pt:"fervendo",s:TRI},
      {en:"steaming",pt:"cozinhando no vapor",s:TRI},
    ]},
    2: { replace:true, items:[
      {en:"jam",pt:"geleia",s:TRI},
      {en:"butter",pt:"manteiga",s:TRI},
      {en:"Nutella",pt:"Nutella",s:TRI},
      {en:"cream cheese",pt:"cream cheese",s:TRI},
      {en:"an onion",pt:"uma cebola",s:TRI},
      {en:"a banana",pt:"uma banana",s:TRI},
      {en:"a tomato",pt:"um tomate",s:TRI},
      {en:"the cheese",pt:"o queijo",s:TRI},
      {en:"the eggs",pt:"os ovos",s:TRI},
      {en:"the soup",pt:"a sopa",s:TRI},
      {en:"some carrots",pt:"algumas cenouras",s:TRI},
      {en:"the broccoli",pt:"o brócolis",s:TRI},
    ]},
    3: { replace:true, items:[
      {en:"on my toast",pt:"na minha torrada",s:TRI},
      {en:"on bread",pt:"no pão",s:TRI},
      {en:"for the omelet",pt:"para o omelete",s:TRI},
      {en:"for the cake",pt:"para o bolo",s:TRI},
      {en:"into small pieces",pt:"em pedaços pequenos",s:TRI},
      {en:"into cubes",pt:"em cubos",s:TRI},
      {en:"into slices",pt:"em fatias",s:TRI},
      {en:"in a blender",pt:"no liquidificador",s:TRI},
      {en:"with sugar",pt:"com açúcar",s:TRI},
      {en:"in the oven",pt:"no forno",s:TRI},
      {en:"on the stove",pt:"no fogão",s:TRI},
    ]},
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
  // PHONE
  // ◣ I will [vb] [pessoa/lugar] [tempo]
  // ♥ Could you [vb] [obj] [tempo]
  // ● I [vb] [obj] [contexto]
  // ▲ We were [vb] [contexto]
  // ════════════════════════════════════════════
  "phone": {
    0: { replace:true, items:[
      {en:"I will",pt:"Eu irei",s:TRI},
      {en:"Could you",pt:"Você poderia",s:HRT},
      {en:"I",pt:"Eu",s:DOT},
      {en:"We were",pt:"Nós fomos",s:UP},
    ]},
    1: { replace:true, items:[
      {en:"call you back",pt:"te ligar de volta",s:TRI},
      {en:"call you up",pt:"te ligar",s:TRI},
      {en:"hang on",pt:"esperar",s:HRT},
      {en:"hold on",pt:"aguardar",s:HRT},
      {en:"hung up",pt:"desliguei",s:DOT},
      {en:"cut off",pt:"cortados",s:UP},
    ]},
    2: { replace:true, items:[
      {en:"in five minutes",pt:"em cinco minutos",s:TRI},
      {en:"later",pt:"mais tarde",s:TRI},
      {en:"a moment",pt:"um momento",s:HRT},
      {en:"the phone",pt:"o telefone",s:DOT},
      {en:"on him",pt:"para ele",s:DOT},
      {en:"on her",pt:"para ela",s:DOT},
      {en:"in the middle of",pt:"no meio de",s:UP},
    ]},
    3: { replace:true, items:[
      {en:"when I get home",pt:"quando chegar em casa",s:TRI},
      {en:"after work",pt:"depois do trabalho",s:TRI},
      {en:"when I’m free",pt:"quando estiver livre",s:TRI},
      {en:"please?",pt:"por favor?",s:HRT},
      {en:"after a few rings",pt:"após alguns toques",s:DOT},
      {en:"on the third ring",pt:"no terceiro toque",s:DOT},
      {en:"the conversation",pt:"a conversa",s:UP},
      {en:"the call",pt:"a ligação",s:UP},
    ]},
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
  // RELATIONSHIPS
  // ◣ I [vb] [pessoa] [contexto]
  // ♥ I used to [vb] [pessoa] [contexto]
  // ● I have [vb] [pessoa] [contexto]
  // ════════════════════════════════════════════
  "relationships": {
    0: { replace:true, items:[
      {en:"I",pt:"Eu",s:TRI},
      {en:"I used to",pt:"Eu costumava",s:HRT},
      {en:"I have",pt:"Eu",s:DOT},
    ]},
    1: { replace:true, items:[
      {en:"fell for",pt:"me apaixonei por",s:TRI},
      {en:"got married with",pt:"me casei com",s:TRI},
      {en:"made up with",pt:"fiz as pazes com",s:TRI},
      {en:"split up with",pt:"terminei com",s:TRI},
      {en:"hang out with",pt:"sair com",s:HRT},
      {en:"flirt with",pt:"flertar com",s:HRT},
      {en:"fancy",pt:"sou caidinho por",s:HRT},
      {en:"fallen out with",pt:"fiquei de mal com",s:DOT},
      {en:"broken up with",pt:"terminei com",s:DOT},
    ]},
    2: { replace:true, items:[
      {en:"my crush",pt:"minha paixão",s:TRI},
      {en:"my husband",pt:"meu marido",s:TRI},
      {en:"my wife",pt:"minha esposa",s:TRI},
      {en:"my best friend",pt:"meu(minha) melhor amigo(a)",s:HRT},
      {en:"her",pt:"ela",s:HRT},
      {en:"him",pt:"ele",s:HRT},
      {en:"my girlfriend",pt:"minha namorada",s:DOT},
      {en:"my boyfriend",pt:"meu namorado",s:DOT},
    ]},
    3: { replace:true, items:[
      {en:"on the first date",pt:"no primeiro encontro",s:TRI},
      {en:"after a year",pt:"depois de um ano",s:TRI},
      {en:"last week",pt:"semana passada",s:TRI},
      {en:"every day",pt:"todo dia",s:HRT},
      {en:"a lot",pt:"bastante",s:HRT},
      {en:"on weekends",pt:"nos fins de semana",s:HRT},
      {en:"after a fight",pt:"depois de uma briga",s:DOT},
      {en:"recently",pt:"recentemente",s:DOT},
      {en:"this month",pt:"esse mês",s:DOT},
    ]},
  },

  // ════════════════════════════════════════════
  // FAMILY
  // ◣ I was [vb] [pessoa] [contexto]
  // ♥ I [vb] [familiar] [contexto]
  // ● I have [vb] [familiar] [contexto]
  // ════════════════════════════════════════════
  "family": {
    0: { replace:true, items:[
      {en:"I was",pt:"Eu fui",s:TRI},
      {en:"I",pt:"Eu",s:HRT},
      {en:"I have",pt:"Eu",s:DOT},
    ]},
    1: { replace:true, items:[
      {en:"brought up by",pt:"criado por",s:TRI},
      {en:"raised by",pt:"criado por",s:TRI},
      {en:"grew up with",pt:"cresci com",s:HRT},
      {en:"get along with",pt:"me dou bem com",s:HRT},
      {en:"don’t get along with",pt:"não me dou bem com",s:HRT},
      {en:"take after",pt:"puxei para",s:HRT},
      {en:"look up to",pt:"admiro",s:HRT},
      {en:"can’t put up with",pt:"não aguento",s:HRT},
      {en:"look after",pt:"cuido de",s:HRT},
      {en:"fallen out with",pt:"fiquei de mal com",s:DOT},
      {en:"got together with",pt:"me reuni com",s:DOT},
    ]},
    2: { replace:true, items:[
      {en:"my parents",pt:"meus pais",s:TRI},
      {en:"my grandparents",pt:"meus avós",s:TRI},
      {en:"my mom",pt:"minha mãe",s:TRI},
      {en:"my dad",pt:"meu pai",s:HRT},
      {en:"my sister",pt:"minha irmã",s:HRT},
      {en:"my brother",pt:"meu irmão",s:HRT},
      {en:"my aunt",pt:"minha tia",s:HRT},
      {en:"my uncle",pt:"meu tio",s:HRT},
      {en:"my stepfather",pt:"meu padrasto",s:HRT},
      {en:"my cousin",pt:"meu(minha) primo(a)",s:DOT},
      {en:"my niece",pt:"minha sobrinha",s:DOT},
      {en:"my family",pt:"minha família",s:DOT},
    ]},
    3: { replace:true, items:[
      {en:"in a small town",pt:"em uma cidade pequena",s:TRI},
      {en:"in a village",pt:"em uma vila",s:TRI},
      {en:"in a big city",pt:"em uma cidade grande",s:TRI},
      {en:"every day",pt:"todo dia",s:HRT},
      {en:"a lot",pt:"bastante",s:HRT},
      {en:"on weekends",pt:"nos fins de semana",s:HRT},
      {en:"at Christmas",pt:"no Natal",s:DOT},
      {en:"on holidays",pt:"em feriados",s:DOT},
      {en:"this week",pt:"essa semana",s:DOT},
    ]},
  },

};

})();
