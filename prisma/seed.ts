import { PrismaClient } from "../src/generated/prisma"
import { normalizeTitle } from "../src/utils/normalize"

const prisma = new PrismaClient();

async function main() {
  const books = [
    { title: "OS 7 HÁBITOS DAS PESSOAS ALTAMENTE EFICAZES", author: "Stephen R. Covey", category: "Inteligência Emocional" },
    { title: "INTELIGÊNCIA EMOCIONAL", author: "Daniel Goleman, PH.D.", category: "Inteligência Emocional" },
    { title: "COMUNICAÇÃO NÃO-VIOLENTA", author: "Marshall B. Rosenberg", category: "Inteligência Emocional" },
    { title: "ANTIFRÁGIL", author: "Nassim Nicholas Taleb", category: "Inteligência Emocional" },
    { title: "INTELIGÊNCIA EMOCIONAL 2.0", author: "Travis Bradberry & Jean Greaves", category: "Inteligência Emocional" },
    { title: "MINDSET: A NOVA PSICOLOGIA DO SUCESSO", author: "Carol S. Dweck, PH.D.", category: "Inteligência Emocional" },
    { title: "AGILIDADE EMOCIONAL", author: "Susan David, PH.D.", category: "Inteligência Emocional" },
    { title: "A CORAGEM DE SER IMPERFEITO", author: "Brené Brown", category: "Inteligência Emocional" },
    { title: "GESTÃO DA EMOÇÃO", author: "Augusto Cury", category: "Inteligência Emocional" },
    { title: "NEGOCIE, QUALQUER COISA COM QUALQUER PESSOA", author: "Eduardo Ferraz", category: "Comunicação" },
    { title: "PERSUASSÃO", author: "Maytê Carvalho", category: "Comunicação" },
    { title: "O QUE TODO CORPO FALA", author: "Joe Navarro e Marvin Karlins", category: "Comunicação" },
    { title: "NÃO EXISTE GESTÃO SEM COMUNICAÇÃO", author: "Daniel Costa", category: "Comunicação" },
    { title: "APENAS OUÇA", author: "Mark Goulston", category: "Comunicação" },
    { title: "MUDE OU MORRA!", author: "Brad Stulberg", category: "Comunicação" },
    { title: "STORYTELLING", author: "Carmine Gallo", category: "Comunicação" },
    { title: "COMO SE APRESENTAR BEM E ALCANÇAR O SUCESSO", author: "Dale Carnegie", category: "Comunicação" },
    { title: "A LINGUAGEM SECRETA DO CARISMA", author: "Vanessa Van Edwards", category: "Comunicação" },
    { title: "IMPLEMENTANDO A INOVAÇÃO", author: "Elsevier", category: "Criatividade e Inovação" },
    { title: "INCANSÁVEIS", author: "Maurício Benvenutti", category: "Criatividade e Inovação" },
    { title: "AUDAZ", author: "Maurício Benvenutti", category: "Criatividade e Inovação" },
    { title: "INOVE OU MORRA", author: "Luis Guimarães", category: "Criatividade e Inovação" },
    { title: "A BÍBLIA DA INOVAÇÃO", author: "Fernando Trías De Bes", category: "Criatividade e Inovação" },
    { title: "A STARTUP ENXUTA", author: "Eric Ries", category: "Criatividade e Inovação" },
    { title: "A ESTRATÉGIA DA INOVAÇÃO RADICAL", author: "Pedro Waengertner", category: "Criatividade e Inovação" },
    { title: "ESSENCIALISMO", author: "Greg Mckeown", category: "Liderança de Si Mesmo e Gestão" },
    { title: "O MONGE E O EXECUTIVO", author: "James C. Hunter", category: "Liderança de Si Mesmo e Gestão" },
    { title: "DESPERTE SEU GIGANTE INTERIOR", author: "Tony Robbins", category: "Liderança de Si Mesmo e Gestão" },
    { title: "A CORAGEM PARA LIDERAR", author: "Brené Brown", category: "Liderança de Si Mesmo e Gestão" },
    { title: "OS 5 DESAFIOS DAS EQUIPES", author: "Patrick Lencioni", category: "Liderança de Si Mesmo e Gestão" },
    { title: "FINANCIAL COOPERATIVISMO", author: "Ênio Meinen", category: "Cooperativismo" },
    { title: "O COOPERATIVISMO DE CRÉDITO", author: "Ênio Meinen - Márcio Port", category: "Cooperativismo" },
    { title: "COOPERATIVISMO FINANCEIRO", author: "Ênio Meinen", category: "Cooperativismo" },
    { title: "COOPERATIVISMO FINANCEIRO: 2° EDIÇÃO", author: "Ênio Meinen", category: "Cooperativismo" },
    { title: "COOPERATIVISMO FINANCEIRO NA DÉCADA DE 2020", author: "Ênio Meinen", category: "Cooperativismo" },
    { title: "COOPERATIVISMO FINANCEIRO: PERCURSO HISTÓRICO", author: "Ênio Meinen", category: "Cooperativismo" },
    { title: "GOVERNANÇA DE SOCIEDADES COOPERATIVAS", author: "MANOEL MESSIAS DA SILVA", category: "Cooperativismo" },
  ];

  const inserted = await Promise.all(
    books.map((book) =>
      prisma.book.upsert({
        where: { normalizedTitle: normalizeTitle(book.title) },
        update: {},
        create: {
          title: book.title,
          normalizedTitle: normalizeTitle(book.title),
          author: book.author,
          category: book.category,
        },
      })
    )
  );

  console.log(`✅ ${inserted.length} livros inseridos com sucesso!`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("Erro no seed: ", e);
    return prisma.$disconnect().then(() => process.exit(1));
  });
