export const TABLE_15: Record<number, number> = {
  1: 20, 2: 17, 3: 15, 4: 14, 5: 12, 6: 11, 7: 10, 8: 9,
  9: 7, 10: 6, 11: 5, 12: 4, 13: 3, 14: 2, 15: 1,
};

export const cursos = [
  { id: "prod", nome: "PRODUÇÃO", alunos: 424 },
  { id: "ambica", nome: "AMBICA", alunos: 346 },
  { id: "quimica", nome: "QUÍMICA", alunos: 623 },
  { id: "alergia", nome: "ALERGIA", alunos: 318 },
  { id: "automacao", nome: "AUTOMAÇÃO", alunos: 211 },
  { id: "a3fad", nome: "A3FAD", alunos: 1207 },
  { id: "civil", nome: "CIVIL", alunos: 877 },
  { id: "aapi", nome: "AAPI", alunos: 2553 },
  { id: "materiais", nome: "MATERIAIS", alunos: 134 },
  { id: "eletrica", nome: "ELÉTRICA", alunos: 408 },
  { id: "hidrica", nome: "HÍDRICA", alunos: 61 },
  { id: "minas", nome: "MINAS", alunos: 85 },
  { id: "mecanica", nome: "MECÂNICA", alunos: 655 },
  { id: "metal", nome: "METAL", alunos: 151 },
  { id: "aaca", nome: "AACA", alunos: 999 },
] as const;

export type CursoId = (typeof cursos)[number]["id"];

export const itens = [
  { id: "racao1", nome: "Ração 1 kg", pts: 3 },
  { id: "racao3", nome: "Ração 3 kg", pts: 9 },
  { id: "racao10", nome: "Ração 10 kg", pts: 23 },
  { id: "racao15", nome: "Ração 15 kg", pts: 28 },
  { id: "racao20", nome: "Ração 20+ kg", pts: 55 },
  { id: "sache", nome: "Sachê ração", pts: 1 },
  { id: "vermifugo10", nome: "Vermífugo até 10 kg", pts: 4 },
  { id: "vermifugo10p", nome: "Vermífugo acima 10 kg", pts: 6 },
  { id: "antipulga10", nome: "Antipulgas até 10 kg", pts: 20 },
  { id: "antipulga10p", nome: "Antipulgas acima 10 kg", pts: 25 },
] as const;

export type ItemId = (typeof itens)[number]["id"];

export const rawDinheiro: { id: CursoId; valor: number }[] = [
  { id: "ambica", valor: 600 },
  { id: "quimica", valor: 600 },
  { id: "automacao", valor: 85 },
  { id: "prod", valor: 3 },
];

export const rawFisica: { id: CursoId; doacoes: { item: ItemId; qtd: number }[] }[] = [
  { id: "prod", doacoes: [{ item: "racao20", qtd: 18 }, { item: "racao1", qtd: 1 }] },
  { id: "ambica", doacoes: [{ item: "racao20", qtd: 2 }, { item: "sache", qtd: 63 }] },
  { id: "quimica", doacoes: [{ item: "sache", qtd: 90 }, { item: "racao15", qtd: 1 }, { item: "racao10", qtd: 1 }] },
  { id: "alergia", doacoes: [{ item: "racao20", qtd: 1 }, { item: "racao1", qtd: 1 }] },
  { id: "automacao", doacoes: [{ item: "sache", qtd: 34 }] },
  { id: "a3fad", doacoes: [{ item: "sache", qtd: 75 }] },
];

export const rawSangue: { id: CursoId; doacoes: number }[] = [
  { id: "prod", doacoes: 65 },
  { id: "automacao", doacoes: 5 },
  { id: "ambica", doacoes: 6 },
  { id: "quimica", doacoes: 8 },
  { id: "a3fad", doacoes: 9 },
  { id: "civil", doacoes: 6 },
  { id: "alergia", doacoes: 2 },
];
