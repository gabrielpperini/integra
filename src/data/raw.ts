export const TABLE_16: Record<number, number> = {
  1: 21, 2: 18, 3: 16, 4: 15, 5: 13, 6: 12, 7: 11, 8:10,
  9: 8, 10: 7, 11: 6, 12: 5, 13: 4, 14: 3, 15: 2, 16: 1
};

export const cursos = [
  { id: "prod", nome: "PRODUÇÃO", alunos: 447 },
  { id: "ambiental", nome: "AMBIENTAL", alunos: 187 },
  { id: "quimica", nome: "QUÍMICA", alunos: 641 },
  { id: "alimentos", nome: "ALIMENTOS", alunos: 176 },
  { id: "energia", nome: "ENERGIA", alunos: 179 },
  { id: "automacao", nome: "AUTOMAÇÃO", alunos: 220 },
  { id: "fisica", nome: "FÍSICA", alunos: 167 },
  { id: "a3fad", nome: "A3FAD", alunos: 1237 },
  { id: "civil", nome: "CIVIL", alunos: 939 },
  { id: "aapi", nome: "AAPI", alunos: 2553 },
  { id: "materiais", nome: "MATERIAIS", alunos: 141 },
  { id: "eletrica", nome: "ELÉTRICA", alunos: 455 },
  { id: "hidrica", nome: "HÍDRICA", alunos: 73 },
  { id: "minas", nome: "MINAS", alunos: 90 },
  { id: "mecanica", nome: "MECÂNICA", alunos: 697 },
  { id: "metal", nome: "METAL", alunos: 169 },
] as const;

export type CursoId = (typeof cursos)[number]["id"];

export const itens = [
  { id: "shampoo", nome: "Shampoo (ml)", pts: 0.1 },
  { id: "condicionador", nome: "Condicionador (ml)", pts: 0.1 },
  { id: "desodorante", nome: "Desodorante (ml)", pts: 0.1 },
  { id: "hidratante", nome: "Hidratante (ml)", pts: 0.1 },
  { id: "barbeador", nome: "Aparelho de barbear", pts: 10 },
  { id: "fraldaG", nome: "Fralda geriátrica G", pts: 12 },
  { id: "fraldaXG", nome: "Fralda geriátrica XG", pts: 12 },
] as const;

export type ItemId = (typeof itens)[number]["id"];

export const rawDinheiro: { id: CursoId; valor: number }[] = [
  { id: "ambiental", valor: 50 },
  { id: "alimentos", valor: 10 + 15 + 5 },
];

export const rawFisica: { id: CursoId; doacoes: { item: ItemId; qtd: number }[] }[] = [
  { id: "alimentos", doacoes: [{ item: "condicionador", qtd: 1000 }, { item: "barbeador", qtd: 240 }] },
  { id: "prod", doacoes: [{ item: "shampoo", qtd: 300 }, { item: "condicionador", qtd: 470 }, { item: "hidratante", qtd: 400 }, { item: "barbeador", qtd: 140 }, { item: "fraldaG", qtd: 960 }] },
  { id: "mecanica", doacoes: [{ item: "shampoo", qtd: 5025 }, { item: "condicionador", qtd: 1330 }, { item: "desodorante", qtd: 1700 }, { item: "hidratante", qtd: 4400 }, { item: "barbeador", qtd: 30 }, { item: "fraldaXG", qtd: 39 }] },
  { id: "quimica", doacoes: [{ item: "shampoo", qtd: 25200 }, { item: "barbeador", qtd: 330 }] },
];

export const rawSangue: { id: CursoId; doacoes: number }[] = [
  { id: "mecanica", doacoes: 9 },
  { id: "ambiental", doacoes: 3 },
  { id: "alimentos", doacoes: 7 },
  { id: "prod", doacoes: 13 },
];
