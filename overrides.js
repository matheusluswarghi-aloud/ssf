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
