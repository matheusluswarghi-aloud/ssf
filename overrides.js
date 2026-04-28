// Sistema de só-símbolos: cada item tem `s` (índice 0–6 → ◣ ♥ ● ▲ ◀ ★ ◆).
// Para formar frase: pegar item da coluna I + II + III + IV com o MESMO símbolo.
// Estrutura: { chapterId: { colIndex: { replace:true, items:[{en,pt,s},...] } } }

(function() {
  const TRI=0, HRT=1, DOT=2, UP=3, LFT=4, STAR=5, DIA=6;

window.SSF_OVERRIDES = {

  // ════════════════════════════════════════════
  // ENVIRONMENT — Meio ambiente
  // ◣ [Subj] was/were [destruction-verb] [cause-prep] [disaster]
  //   "It was wiped out by the flood"
  // ♥ [Subj] takes [duration] to [process-verb] [where/how]
  //   "It takes many years to break down in nature"
  // ● [Subj] [adverb] [recycle-verb] [object]
  //   "We always recycle plastic bags"
  // ▲ [Subj] have [used-up] [quantity] [resource]
  //   "We have run out of almost all the oil"
  // ◀ [Pollutant] [is/has spreading-verb] [direction-prep] [place]
  //   "The smoke is slowly spreading across the city"
  // ★ [Forest] [be-aux] [logging-verb] [time/agent]
  //   "The forest is being cut down every year"
  // ◆ [Authority] [modal] [protect-verb] [environmental-cause]
  //   "The government should protect the environment"
  // ════════════════════════════════════════════
  "environment": {
    desc: "Formando frases para falar sobre meio ambiente. Cada símbolo é um padrão de frase: escolha um item de cada coluna com o MESMO símbolo e qualquer combinação resulta numa frase correta.",
    0: { replace:true, items:[
      {en:"It was",pt:"Isso foi",s:TRI},
      {en:"They were",pt:"Eles foram",s:TRI},
      {en:"The crops were",pt:"As plantações foram",s:TRI},
      {en:"The village was",pt:"O vilarejo foi",s:TRI},

      {en:"It takes",pt:"Leva",s:HRT},
      {en:"It can take",pt:"Pode levar",s:HRT},
      {en:"Plastic takes",pt:"O plástico leva",s:HRT},
      {en:"Glass takes",pt:"O vidro leva",s:HRT},

      {en:"We",pt:"Nós",s:DOT},
      {en:"I",pt:"Eu",s:DOT},
      {en:"People",pt:"As pessoas",s:DOT},
      {en:"Most of us",pt:"A maioria de nós",s:DOT},

      {en:"We have",pt:"Nós",s:UP},
      {en:"We've",pt:"A gente",s:UP},
      {en:"Humans have",pt:"Os humanos",s:UP},
      {en:"Many countries have",pt:"Muitos países",s:UP},

      {en:"The smoke",pt:"A fumaça",s:LFT},
      {en:"The fog",pt:"A neblina",s:LFT},
      {en:"The pollution",pt:"A poluição",s:LFT},
      {en:"The smog",pt:"A poluição do ar",s:LFT},

      {en:"The forest",pt:"A floresta",s:STAR},
      {en:"The rainforest",pt:"A floresta tropical",s:STAR},
      {en:"The Amazon",pt:"A Amazônia",s:STAR},
      {en:"Our jungle",pt:"Nossa selva",s:STAR},

      {en:"The government",pt:"O governo",s:DIA},
      {en:"Our country",pt:"Nosso país",s:DIA},
      {en:"Companies",pt:"As empresas",s:DIA},
      {en:"Politicians",pt:"Os políticos",s:DIA},
    ]},
    1: { replace:true, items:[
      {en:"wiped out",pt:"varrido(a)(s)",s:TRI},
      {en:"destroyed",pt:"destruído(a)(s)",s:TRI},
      {en:"swept away",pt:"levado(a)(s)",s:TRI},
      {en:"damaged",pt:"danificado(a)(s)",s:TRI},

      {en:"a long time",pt:"um longo tempo",s:HRT},
      {en:"many years",pt:"muitos anos",s:HRT},
      {en:"decades",pt:"décadas",s:HRT},
      {en:"centuries",pt:"séculos",s:HRT},

      {en:"always",pt:"sempre",s:DOT},
      {en:"never",pt:"nunca",s:DOT},
      {en:"often",pt:"frequentemente",s:DOT},
      {en:"rarely",pt:"raramente",s:DOT},
      {en:"generally",pt:"geralmente",s:DOT},

      {en:"used up",pt:"acabado com",s:UP},
      {en:"run out of",pt:"ficado sem",s:UP},
      {en:"wasted",pt:"desperdiçado",s:UP},
      {en:"depleted",pt:"esgotado",s:UP},

      {en:"is slowly spreading",pt:"está se espalhando lentamente",s:LFT},
      {en:"is quickly spreading",pt:"está se espalhando rapidamente",s:LFT},
      {en:"has been spreading",pt:"vem se espalhando",s:LFT},
      {en:"is moving",pt:"está se movendo",s:LFT},

      {en:"is being",pt:"está sendo",s:STAR},
      {en:"has been",pt:"foi",s:STAR},
      {en:"was",pt:"foi",s:STAR},
      {en:"is getting",pt:"está sendo",s:STAR},

      {en:"should",pt:"deveria",s:DIA},
      {en:"must",pt:"deve",s:DIA},
      {en:"will",pt:"vai",s:DIA},
      {en:"can",pt:"pode",s:DIA},
    ]},
    2: { replace:true, items:[
      {en:"by",pt:"pelo(a)",s:TRI},
      {en:"due to",pt:"devido a",s:TRI},
      {en:"because of",pt:"por causa de",s:TRI},

      {en:"to break down",pt:"para se decompor",s:HRT},
      {en:"to decompose",pt:"para se decompor",s:HRT},
      {en:"to disappear",pt:"para desaparecer",s:HRT},
      {en:"to recover",pt:"para se recuperar",s:HRT},

      {en:"throw away",pt:"jogamos fora",s:DOT},
      {en:"recycle",pt:"reciclamos",s:DOT},
      {en:"reuse",pt:"reutilizamos",s:DOT},
      {en:"sort",pt:"separamos",s:DOT},

      {en:"all the",pt:"todo(a)(s) o(a)(s)",s:UP},
      {en:"almost all the",pt:"quase todo(a)(s) o(a)(s)",s:UP},
      {en:"half of the",pt:"metade do(a)(s)",s:UP},
      {en:"most of the",pt:"a maior parte do(a)(s)",s:UP},

      {en:"across",pt:"por",s:LFT},
      {en:"over",pt:"sobre",s:LFT},
      {en:"through",pt:"através de",s:LFT},
      {en:"into",pt:"em direção a",s:LFT},

      {en:"cut down",pt:"cortado(a)",s:STAR},
      {en:"burned",pt:"queimado(a)",s:STAR},
      {en:"cleared",pt:"desmatado(a)",s:STAR},
      {en:"destroyed",pt:"destruído(a)",s:STAR},

      {en:"protect",pt:"proteger",s:DIA},
      {en:"support",pt:"apoiar",s:DIA},
      {en:"fund",pt:"financiar",s:DIA},
      {en:"clean up",pt:"limpar",s:DIA},
    ]},
    3: { replace:true, items:[
      {en:"the flood",pt:"a enchente",s:TRI},
      {en:"the storm",pt:"a tempestade",s:TRI},
      {en:"the wildfire",pt:"o incêndio florestal",s:TRI},
      {en:"the heavy rain",pt:"a chuva forte",s:TRI},

      {en:"in nature",pt:"na natureza",s:HRT},
      {en:"in the soil",pt:"no solo",s:HRT},
      {en:"on its own",pt:"sozinho",s:HRT},
      {en:"completely",pt:"completamente",s:HRT},

      {en:"plastic bags",pt:"sacolas plásticas",s:DOT},
      {en:"cardboard",pt:"papelão",s:DOT},
      {en:"water bottles",pt:"garrafas d'água",s:DOT},
      {en:"old clothes",pt:"roupas velhas",s:DOT},

      {en:"oil",pt:"petróleo",s:UP},
      {en:"clean water",pt:"água limpa",s:UP},
      {en:"natural resources",pt:"recursos naturais",s:UP},
      {en:"fresh air",pt:"ar puro",s:UP},

      {en:"the city",pt:"a cidade",s:LFT},
      {en:"the streets",pt:"as ruas",s:LFT},
      {en:"the forest",pt:"a floresta",s:LFT},
      {en:"the ocean",pt:"o oceano",s:LFT},

      {en:"every year",pt:"todos os anos",s:STAR},
      {en:"illegally",pt:"ilegalmente",s:STAR},
      {en:"by farmers",pt:"por fazendeiros",s:STAR},
      {en:"by loggers",pt:"por madeireiros",s:STAR},

      {en:"the environment",pt:"o meio ambiente",s:DIA},
      {en:"endangered species",pt:"espécies ameaçadas",s:DIA},
      {en:"national parks",pt:"parques nacionais",s:DIA},
      {en:"clean energy",pt:"energia limpa",s:DIA},
    ]},
    examples: [
      {en:"It was wiped out by the flood",pt:"Foi varrido pela enchente"},
      {en:"The crops were destroyed because of the heavy rain",pt:"As plantações foram destruídas por causa da chuva forte"},
      {en:"It takes many years to break down in nature",pt:"Leva muitos anos para se decompor na natureza"},
      {en:"Plastic takes centuries to disappear in the soil",pt:"O plástico leva séculos para desaparecer no solo"},
      {en:"We always recycle plastic bags",pt:"Nós sempre reciclamos sacolas plásticas"},
      {en:"People rarely sort cardboard",pt:"As pessoas raramente separam papelão"},
      {en:"We have run out of almost all the oil",pt:"Nós ficamos sem quase todo o petróleo"},
      {en:"Humans have wasted most of the clean water",pt:"Os humanos desperdiçaram a maior parte da água limpa"},
      {en:"The smoke is slowly spreading across the city",pt:"A fumaça está se espalhando lentamente pela cidade"},
      {en:"The pollution is moving into the ocean",pt:"A poluição está se movendo em direção ao oceano"},
      {en:"The forest is being cut down every year",pt:"A floresta está sendo cortada todos os anos"},
      {en:"The Amazon has been burned illegally",pt:"A Amazônia foi queimada ilegalmente"},
      {en:"The government should protect the environment",pt:"O governo deveria proteger o meio ambiente"},
      {en:"Companies must fund clean energy",pt:"As empresas devem financiar energia limpa"},
    ],
    phrasals: [
      {term:"wiped out",desc:"Wipe é limpar/apagar. Com out, o sentido fica mais forte: destruir, varrer ou eliminar por completo. Muito usado pra descrever desastres naturais.",ex:[
        {en:"It was wiped out by the flood",pt:"Foi varrido pela enchente"},
        {en:"The village was wiped out by the storm",pt:"O vilarejo foi varrido pela tempestade"}
      ]},
      {term:"break down",desc:"Sentido literal: quebrar, descontrolar-se. No contexto ambiental: decompor, dividir-se em partes pequenas (matéria orgânica, plástico).",ex:[
        {en:"It takes many years to break down in nature",pt:"Leva muitos anos para se decompor na natureza"},
        {en:"Plastic takes centuries to break down completely",pt:"O plástico leva séculos para se decompor completamente"}
      ]},
      {term:"throw away",desc:"Descartar, jogar fora. No figurado, também significa desperdiçar (uma chance, uma oportunidade).",ex:[
        {en:"We always throw away cardboard",pt:"Nós sempre jogamos fora papelão"},
        {en:"People rarely throw away water bottles",pt:"As pessoas raramente jogam fora garrafas d'água"}
      ]},
      {term:"run out of",desc:"Run sozinho é correr. Com out of, vira ficar sem alguma coisa — sempre seguido daquilo que acabou (oil, water, time).",ex:[
        {en:"We have run out of fresh air",pt:"Nós ficamos sem ar puro"},
        {en:"Humans have run out of natural resources",pt:"Os humanos ficaram sem recursos naturais"}
      ]},
      {term:"used up",desc:"Use é usar. Com up, a ideia é consumir até acabar — gastar tudo, esgotar uma reserva.",ex:[
        {en:"We have used up all the oil",pt:"Nós acabamos com todo o petróleo"},
        {en:"We've used up half of the clean water",pt:"A gente acabou com metade da água limpa"}
      ]},
      {term:"spread out",desc:"Spread é espalhar. Com out, reforça a ideia de algo se distribuindo em uma área maior (fumaça, poluição, fogo).",ex:[
        {en:"The smoke is slowly spreading across the city",pt:"A fumaça está se espalhando lentamente pela cidade"},
        {en:"The pollution has been spreading into the ocean",pt:"A poluição vem se espalhando em direção ao oceano"}
      ]},
      {term:"cut down",desc:"Cut é cortar. Com down, a ideia é derrubar (uma árvore, uma floresta) ou reduzir (gastos, consumo).",ex:[
        {en:"The forest is being cut down every year",pt:"A floresta está sendo cortada todos os anos"},
        {en:"The rainforest was cut down by loggers",pt:"A floresta tropical foi cortada por madeireiros"}
      ]},
      {term:"clean up",desc:"Clean é limpar. Com up, vira limpar até deixar tudo em ordem — geralmente um trabalho mais sério/grande, como limpeza ambiental ou de bagunça.",ex:[
        {en:"The government must clean up the environment",pt:"O governo deve limpar o meio ambiente"},
        {en:"Companies should clean up the ocean",pt:"As empresas deveriam limpar o oceano"}
      ]},
    ]
  },

  // ════════════════════════════════════════════
  // PROBLEMS — Falando sobre dificuldades
  // ◣ [Subj] [need-modal] [discuss-verb] [topic] [time-adv]
  //   "We need to discuss this problem before deciding"
  // ♥ [Subj] have been [vb-ing] [topic] [duration]
  //   "I have been thinking about this problem for weeks"
  // ● [Subj] am/are [face-vb-ing] [quantity] [problem-noun]
  //   "I am running into many problems"
  // ▲ [Subj] [search-vb-ing] [solution-noun] [target]
  //   "We are looking for a solution to this issue"
  // ════════════════════════════════════════════
  "problems": {
    desc: "Formando frases para falar sobre problemas, decisões e dificuldades. Cada símbolo é um padrão de frase — escolha itens das 4 colunas com o mesmo símbolo.",
    0: { replace:true, items:[
      {en:"We need to",pt:"Nós precisamos",s:TRI},
      {en:"We should",pt:"A gente deveria",s:TRI},
      {en:"We have to",pt:"Nós temos que",s:TRI},
      {en:"I need to",pt:"Eu preciso",s:TRI},

      {en:"I have been",pt:"Eu venho",s:HRT},
      {en:"I've been",pt:"Eu venho",s:HRT},
      {en:"We have been",pt:"Nós viemos",s:HRT},
      {en:"We've been",pt:"A gente vem",s:HRT},

      {en:"I am",pt:"Eu estou",s:DOT},
      {en:"I'm",pt:"Eu",s:DOT},
      {en:"We are",pt:"Nós estamos",s:DOT},
      {en:"They are",pt:"Eles estão",s:DOT},

      {en:"We are",pt:"Nós estamos",s:UP},
      {en:"I am",pt:"Eu estou",s:UP},
      {en:"They are",pt:"Eles estão",s:UP},
    ]},
    1: { replace:true, items:[
      {en:"discuss",pt:"discutir",s:TRI},
      {en:"talk about",pt:"falar sobre",s:TRI},
      {en:"go over",pt:"revisar",s:TRI},
      {en:"think about",pt:"pensar sobre",s:TRI},
      {en:"address",pt:"abordar",s:TRI},

      {en:"thinking about",pt:"pensando sobre",s:HRT},
      {en:"working on",pt:"trabalhando em",s:HRT},
      {en:"dealing with",pt:"lidando com",s:HRT},
      {en:"struggling with",pt:"lutando com",s:HRT},
      {en:"wrestling with",pt:"quebrando a cabeça com",s:HRT},

      {en:"facing",pt:"enfrentando",s:DOT},
      {en:"running into",pt:"me deparando com",s:DOT},
      {en:"encountering",pt:"encontrando",s:DOT},
      {en:"dealing with",pt:"lidando com",s:DOT},
      {en:"coming across",pt:"esbarrando em",s:DOT},

      {en:"looking for",pt:"procurando por",s:UP},
      {en:"trying to find",pt:"tentando achar",s:UP},
      {en:"searching for",pt:"buscando",s:UP},
      {en:"hoping to find",pt:"esperando achar",s:UP},
    ]},
    2: { replace:true, items:[
      {en:"this issue",pt:"essa questão",s:TRI},
      {en:"this problem",pt:"esse problema",s:TRI},
      {en:"the situation",pt:"a situação",s:TRI},
      {en:"our plans",pt:"nossos planos",s:TRI},
      {en:"this decision",pt:"essa decisão",s:TRI},

      {en:"this problem",pt:"esse problema",s:HRT},
      {en:"this decision",pt:"essa decisão",s:HRT},
      {en:"a tough situation",pt:"uma situação difícil",s:HRT},
      {en:"these issues",pt:"essas questões",s:HRT},
      {en:"a hard choice",pt:"uma escolha difícil",s:HRT},

      {en:"a lot of",pt:"muitos(as)",s:DOT},
      {en:"many",pt:"muitos(as)",s:DOT},
      {en:"some",pt:"algumas",s:DOT},
      {en:"several",pt:"vários(as)",s:DOT},
      {en:"a few",pt:"alguns(as)",s:DOT},

      {en:"a solution to",pt:"uma solução para",s:UP},
      {en:"a fix for",pt:"uma resolução para",s:UP},
      {en:"an answer to",pt:"uma resposta para",s:UP},
      {en:"a way out of",pt:"uma saída para",s:UP},
    ]},
    3: { replace:true, items:[
      {en:"before deciding",pt:"antes de decidir",s:TRI},
      {en:"right now",pt:"agora mesmo",s:TRI},
      {en:"today",pt:"hoje",s:TRI},
      {en:"as soon as possible",pt:"o mais rápido possível",s:TRI},
      {en:"before moving on",pt:"antes de seguir em frente",s:TRI},

      {en:"for a long time",pt:"por um bom tempo",s:HRT},
      {en:"for weeks",pt:"há semanas",s:HRT},
      {en:"for days",pt:"há dias",s:HRT},
      {en:"lately",pt:"ultimamente",s:HRT},
      {en:"since last month",pt:"desde o mês passado",s:HRT},

      {en:"problems",pt:"problemas",s:DOT},
      {en:"difficulties",pt:"dificuldades",s:DOT},
      {en:"challenges",pt:"desafios",s:DOT},
      {en:"obstacles",pt:"obstáculos",s:DOT},
      {en:"setbacks",pt:"contratempos",s:DOT},

      {en:"this problem",pt:"esse problema",s:UP},
      {en:"the issue",pt:"a questão",s:UP},
      {en:"the situation",pt:"a situação",s:UP},
      {en:"the mess",pt:"a confusão",s:UP},
    ]},
    examples: [
      {en:"We need to discuss this problem before deciding",pt:"Nós precisamos discutir esse problema antes de decidir"},
      {en:"I need to go over our plans right now",pt:"Eu preciso revisar nossos planos agora mesmo"},
      {en:"We should address the situation as soon as possible",pt:"A gente deveria abordar a situação o mais rápido possível"},
      {en:"I have been thinking about this problem for weeks",pt:"Eu venho pensando sobre esse problema há semanas"},
      {en:"We've been struggling with a tough situation lately",pt:"A gente vem lutando com uma situação difícil ultimamente"},
      {en:"I'm running into many problems",pt:"Eu estou me deparando com muitos problemas"},
      {en:"They are facing several challenges",pt:"Eles estão enfrentando vários desafios"},
      {en:"We are looking for a solution to this problem",pt:"Nós estamos procurando uma solução para esse problema"},
      {en:"I am trying to find an answer to the situation",pt:"Eu estou tentando achar uma resposta para a situação"},
    ],
    phrasals: [
      {term:"talk over",desc:"Discutir um assunto detalhadamente, conversar a respeito de algo até chegar numa conclusão. Mais reflexivo do que talk about.",ex:[
        {en:"We need to talk over our plans before deciding",pt:"Precisamos discutir nossos planos antes de decidir"},
        {en:"Let's talk over the situation tonight",pt:"Vamos discutir a situação hoje à noite"}
      ]},
      {term:"go over",desc:"Revisar, repassar, examinar com atenção. Usado quando você quer checar os detalhes ou explicar algo passo a passo.",ex:[
        {en:"We should go over this issue today",pt:"A gente deveria revisar essa questão hoje"},
        {en:"I need to go over the details with you",pt:"Eu preciso revisar os detalhes com você"}
      ]},
      {term:"work on",desc:"Trabalhar em algo (um projeto, um problema, uma habilidade). Sugere esforço contínuo até resolver.",ex:[
        {en:"I have been working on this problem for weeks",pt:"Eu venho trabalhando nesse problema há semanas"},
        {en:"We've been working on a hard choice lately",pt:"A gente vem trabalhando numa escolha difícil ultimamente"}
      ]},
      {term:"deal with",desc:"Lidar com, enfrentar, gerenciar. Usado tanto pra problemas (deal with the issue) quanto pra pessoas (deal with clients).",ex:[
        {en:"We are dealing with many problems",pt:"Estamos lidando com muitos problemas"},
        {en:"I have been dealing with a tough situation",pt:"Venho lidando com uma situação difícil"}
      ]},
      {term:"struggle with",desc:"Lutar com, ter dificuldade com. Implica esforço contínuo sem solução fácil. Mais emocional que deal with.",ex:[
        {en:"I have been struggling with this decision",pt:"Eu venho lutando com essa decisão"},
        {en:"We've been struggling with these issues for days",pt:"A gente vem lutando com essas questões há dias"}
      ]},
      {term:"run into",desc:"Encontrar por acaso ou esbarrar com. Usado pra problemas inesperados (run into difficulties) ou pessoas (run into a friend).",ex:[
        {en:"I am running into a lot of obstacles",pt:"Eu estou me deparando com muitos obstáculos"},
        {en:"We are running into setbacks",pt:"Estamos esbarrando em contratempos"}
      ]},
      {term:"come across",desc:"Esbarrar em algo, deparar-se com. Mais sutil que run into — geralmente coisas que você descobre ao longo do caminho.",ex:[
        {en:"I'm coming across some challenges",pt:"Eu estou esbarrando em alguns desafios"},
        {en:"They are coming across several difficulties",pt:"Eles estão esbarrando em várias dificuldades"}
      ]},
      {term:"look for",desc:"Procurar ativamente, buscar. Diferente de find (que é encontrar) — look for é a ação de tentar achar.",ex:[
        {en:"We are looking for a solution to this problem",pt:"Estamos procurando uma solução para esse problema"},
        {en:"I am looking for a way out of the mess",pt:"Eu estou procurando uma saída para a confusão"}
      ]},
    ]
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
      {en:"all night",pt:"a noite toda",s:HRT},
      {en:"yesterday",pt:"ontem",s:HRT},
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
      {en:"ran up",pt:"acumulei",s:HRT},
      {en:"come into",pt:"ganhei",s:HRT},
      {en:"squirreled away",pt:"guardei",s:HRT},
      {en:"splashed out",pt:"torrei",s:HRT},
      {en:"saving up",pt:"economizando",s:DOT},
      {en:"putting aside",pt:"separando",s:DOT},
      {en:"to fork out",pt:"desembolsar",s:UP},
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
      {en:"last week",pt:"semana passada",s:HRT},
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
      {en:"yesterday",pt:"ontem",s:TRI},
      {en:"last week",pt:"semana passada",s:TRI},
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
  // WORKING
  // ◣ I have [vb] [obj] [tempo]
  // ♥ I am [vb-ing] [obj/colega] [contexto]
  // ● I [vb] [obj] [contexto]
  // ▲ I will [vb] [obj] [tempo]
  // ════════════════════════════════════════════
  "working": {
    0: { replace:true, items:[
      {en:"I have",pt:"Eu",s:TRI},
      {en:"I am",pt:"Eu estou",s:HRT},
      {en:"I",pt:"Eu",s:DOT},
      {en:"I will",pt:"Eu irei",s:UP},
    ]},
    1: { replace:true, items:[
      {en:"burned out",pt:"dei burnout",s:TRI},
      {en:"called off",pt:"cancelei",s:TRI},
      {en:"drew up",pt:"elaborei",s:TRI},
      {en:"took over",pt:"assumi",s:TRI},
      {en:"carried out",pt:"executei",s:TRI},
      {en:"filling in for",pt:"substituindo",s:HRT},
      {en:"taking on",pt:"contratando",s:HRT},
      {en:"working out",pt:"elaborando",s:HRT},
      {en:"slack off",pt:"vagueio",s:DOT},
      {en:"knuckle down",pt:"pego firme",s:DOT},
      {en:"knock off",pt:"sair do trabalho",s:UP},
    ]},
    2: { replace:true, items:[
      {en:"a report",pt:"um relatório",s:TRI},
      {en:"a contract",pt:"um contrato",s:TRI},
      {en:"a budget",pt:"um orçamento",s:TRI},
      {en:"the leadership",pt:"a liderança",s:TRI},
      {en:"the project",pt:"o projeto",s:TRI},
      {en:"the manager",pt:"o(a) gerente",s:HRT},
      {en:"a colleague",pt:"um(a) colega",s:HRT},
      {en:"new staff",pt:"novos empregados",s:HRT},
      {en:"a plan",pt:"um plano",s:HRT},
      {en:"on my work",pt:"no trabalho",s:DOT},
      {en:"at the office",pt:"no escritório",s:DOT},
      {en:"early",pt:"cedo",s:UP},
      {en:"early today",pt:"cedo hoje",s:UP},
    ]},
    3: { replace:true, items:[
      {en:"recently",pt:"recentemente",s:TRI},
      {en:"this week",pt:"essa semana",s:TRI},
      {en:"this year",pt:"esse ano",s:TRI},
      {en:"today",pt:"hoje",s:HRT},
      {en:"this month",pt:"esse mês",s:HRT},
      {en:"all the time",pt:"o tempo todo",s:DOT},
      {en:"every Friday",pt:"toda sexta",s:DOT},
      {en:"tomorrow",pt:"amanhã",s:UP},
      {en:"next Friday",pt:"sexta que vem",s:UP},
    ]},
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
      {en:"learn",pt:"aprender",s:UP},
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
      {en:"yesterday",pt:"ontem",s:HRT},
      {en:"recently",pt:"recentemente",s:HRT},
      {en:"last year",pt:"ano passado",s:HRT},
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
      {en:"yesterday",pt:"ontem",s:DOT},
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
      {en:"hang out",pt:"sair com",s:TRI},
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
      {en:"my friends",pt:"meus amigos",s:TRI},
      {en:"her",pt:"ela",s:HRT},
      {en:"him",pt:"ele",s:HRT},
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
      {en:"fishing for",pt:"pedindo indiretamente",s:TRI},
      {en:"rabbiting on about",pt:"tagarelando sobre",s:HRT},
      {en:"droning on about",pt:"falando monotonamente sobre",s:HRT},
      {en:"leeching off",pt:"sugando",s:DOT},
      {en:"parroting",pt:"papagaiando",s:DOT},
    ]},
    2: { replace:true, items:[
      {en:"with",pt:"com",s:TRI},
      {en:"compliments",pt:"elogios",s:TRI},
      {en:"answers",pt:"respostas",s:TRI},
      {en:"work",pt:"trabalho",s:HRT},
      {en:"life",pt:"a vida",s:HRT},
      {en:"problems",pt:"problemas",s:HRT},
      {en:"your parents",pt:"seus pais",s:DOT},
      {en:"your friends",pt:"seus amigos",s:DOT},
    ]},
    3: { replace:true, items:[
      {en:"my brother",pt:"meu irmão",s:TRI},
      {en:"my friends",pt:"meus amigos",s:TRI},
      {en:"all day",pt:"o dia todo",s:TRI},
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
      {en:"yesterday",pt:"ontem",s:TRI},
      {en:"last night",pt:"ontem à noite",s:TRI},
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
      {en:"put back",pt:"adiar",s:DOT},
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
      {en:"the meeting",pt:"a reunião",s:DOT},
      {en:"with the project",pt:"com o projeto",s:DOT},
    ]},
    3: { replace:true, items:[
      {en:"to grow",pt:"para crescer",s:TRI},
      {en:"to carry on",pt:"para continuar",s:TRI},
      {en:"yesterday",pt:"ontem",s:TRI},
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
      {en:"laid off",pt:"dispensou",s:HRT},
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
      {en:"some employees",pt:"alguns funcionários",s:HRT},
      {en:"all the staff",pt:"toda a equipe",s:HRT},
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
      {en:"a thousand",pt:"mil",s:UP},
      {en:"a fortune",pt:"uma fortuna",s:UP},
    ]},
    3: { replace:true, items:[
      {en:"yesterday",pt:"ontem",s:TRI},
      {en:"last week",pt:"semana passada",s:TRI},
      {en:"for hours",pt:"por horas",s:TRI},
      {en:"after work",pt:"depois do trabalho",s:HRT},
      {en:"online",pt:"online",s:HRT},
      {en:"this weekend",pt:"esse fim de semana",s:HRT},
      {en:"every time",pt:"toda vez",s:DOT},
      {en:"at the till",pt:"no caixa",s:DOT},
      {en:"reais",pt:"reais",s:UP},
      {en:"dollars",pt:"dólares",s:UP},
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
      {en:"put me through",pt:"me passar",s:HRT},
      {en:"pass on",pt:"passar adiante",s:HRT},
      {en:"hung up",pt:"desliguei",s:DOT},
      {en:"picked up",pt:"atendi",s:DOT},
      {en:"got through",pt:"falei com",s:DOT},
      {en:"can’t get through",pt:"não consigo falar",s:DOT},
      {en:"cut off",pt:"cortados",s:UP},
    ]},
    2: { replace:true, items:[
      {en:"in five minutes",pt:"em cinco minutos",s:TRI},
      {en:"later",pt:"mais tarde",s:TRI},
      {en:"a moment",pt:"um momento",s:HRT},
      {en:"to the manager",pt:"para o gerente",s:HRT},
      {en:"my message",pt:"minha mensagem",s:HRT},
      {en:"the phone",pt:"o telefone",s:DOT},
      {en:"to him",pt:"com ele",s:DOT},
      {en:"to her",pt:"com ela",s:DOT},
      {en:"in the middle of",pt:"no meio de",s:UP},
    ]},
    3: { replace:true, items:[
      {en:"when I get home",pt:"quando chegar em casa",s:TRI},
      {en:"after work",pt:"depois do trabalho",s:TRI},
      {en:"when I’m free",pt:"quando estiver livre",s:TRI},
      {en:"please?",pt:"por favor?",s:HRT},
      {en:"to her, please?",pt:"para ela, por favor?",s:HRT},
      {en:"after a few rings",pt:"após alguns toques",s:DOT},
      {en:"on the third ring",pt:"no terceiro toque",s:DOT},
      {en:"the conversation",pt:"a conversa",s:UP},
      {en:"the call",pt:"a ligação",s:UP},
    ]},
  },

  // ════════════════════════════════════════════
  // TRAVELING
  // ◣ I will [vb] [obj] [tempo]
  // ♥ I [vb] [obj] [contexto]
  // ● The plane [vb] [tempo]
  // ════════════════════════════════════════════
  "traveling": {
    0: { replace:true, items:[
      {en:"I will",pt:"Eu irei",s:TRI},
      {en:"I",pt:"Eu",s:HRT},
      {en:"The plane",pt:"O avião",s:DOT},
    ]},
    1: { replace:true, items:[
      {en:"set off for",pt:"partir para",s:TRI},
      {en:"book",pt:"reservar",s:TRI},
      {en:"check in at",pt:"fazer check-in em",s:TRI},
      {en:"check out of",pt:"fazer check-out de",s:TRI},
      {en:"got on",pt:"entrei no",s:HRT},
      {en:"got off",pt:"saí do",s:HRT},
      {en:"hurried up",pt:"me apressei",s:HRT},
      {en:"checked in",pt:"fiz check-in",s:HRT},
      {en:"takes off",pt:"decola",s:DOT},
      {en:"lands",pt:"pousa",s:DOT},
      {en:"arrives",pt:"chega",s:DOT},
    ]},
    2: { replace:true, items:[
      {en:"Paris",pt:"Paris",s:TRI},
      {en:"Tokyo",pt:"Tóquio",s:TRI},
      {en:"a flight",pt:"um voo",s:TRI},
      {en:"a hotel",pt:"um hotel",s:TRI},
      {en:"the airport",pt:"o aeroporto",s:TRI},
      {en:"the bus",pt:"no ônibus",s:HRT},
      {en:"the train",pt:"no trem",s:HRT},
      {en:"the plane",pt:"no avião",s:HRT},
      {en:"my luggage",pt:"minhas bagagens",s:HRT},
    ]},
    3: { replace:true, items:[
      {en:"tomorrow",pt:"amanhã",s:TRI},
      {en:"next month",pt:"mês que vem",s:TRI},
      {en:"in a few weeks",pt:"em algumas semanas",s:TRI},
      {en:"early",pt:"cedo",s:HRT},
      {en:"late",pt:"atrasado",s:HRT},
      {en:"on time",pt:"no horário",s:HRT},
      {en:"at 3:20 p.m.",pt:"às 15:20",s:DOT},
      {en:"in two hours",pt:"em duas horas",s:DOT},
    ]},
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
      {en:"last month",pt:"mês passado",s:DOT},
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
      {en:"last week",pt:"semana passada",s:DOT},
    ]},
  },

};

})();
