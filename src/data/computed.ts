import { TABLE_15, cursos, itens, rawDinheiro, rawFisica, rawSangue } from "./raw";

function getItemPts(itemId: string) {
  return itens.find(i => i.id === itemId)?.pts ?? 0;
}

export const dinheiro = cursos
  .map(c => {
    const entry = rawDinheiro.find(d => d.id === c.id);
    const valor = entry?.valor ?? 0;
    return { curso: c.nome, alunos: c.alunos, valor, ratio: valor / c.alunos };
  })
  .sort((a, b) => b.ratio - a.ratio);

export const fisica = cursos
  .map(c => {
    const entry = rawFisica.find(f => f.id === c.id);
    const rawDoacoes = entry?.doacoes ?? [];
    const doacoes = rawDoacoes.map(d => ({ item: itens.find(i => i.id === d.item)?.nome ?? d.item, qtd: d.qtd, pts: getItemPts(d.item) * d.qtd }));
    const totalItensCount = doacoes.reduce((s, d) => s + d.qtd, 0);
    const pontos = doacoes.reduce((s, d) => s + d.pts, 0);
    return { curso: c.nome, alunos: c.alunos, doacoes, itens: totalItensCount, pontos, ratio: pontos / c.alunos };
  })
  .sort((a, b) => b.ratio - a.ratio);

export const sangue = cursos
  .map(c => {
    const entry = rawSangue.find(s => s.id === c.id);
    const doacoes = entry?.doacoes ?? 0;
    return { curso: c.nome, alunos: c.alunos, doacoes, ratio: doacoes / c.alunos };
  })
  .sort((a, b) => b.ratio - a.ratio);

export const itemSummary = (() => {
  const map: Record<string, { qtd: number; pts: number; cursos: { curso: string; qtd: number; pts: number }[] }> = {};
  fisica.forEach(c =>
    c.doacoes.forEach(d => {
      if (!map[d.item]) map[d.item] = { qtd: 0, pts: 0, cursos: [] };
      map[d.item].qtd += d.qtd;
      map[d.item].pts += d.pts;
      map[d.item].cursos.push({ curso: c.curso, qtd: d.qtd, pts: d.pts });
    })
  );
  return Object.entries(map)
    .sort((a, b) => b[1].pts - a[1].pts)
    .map(([item, v]) => ({ item, ...v }));
})();

export const totalItens = fisica.reduce((s, c) => s + c.itens, 0);
export const totalPts = fisica.reduce((s, c) => s + c.pontos, 0);

function getRatio(list: { curso: string; ratio: number }[], curso: string) {
  return list.find(x => x.curso === curso)?.ratio ?? 0;
}

const ranking = cursos
  .map(c => {
    const rd = getRatio(dinheiro, c.nome);
    const rf = getRatio(fisica, c.nome);
    const rs = getRatio(sangue, c.nome);
    return { curso: c.nome, rd, rf, rs, total: rd * 1 + rf * 2 + rs * 3 };
  })
  .sort((a, b) => (b.total !== a.total ? b.total - a.total : b.rs * 3 - a.rs * 3));

export const finalWithPts = ranking.map((row, i) => ({
  ...row,
  ptsGerais: row.total === 0 ? 0 : TABLE_15[i + 1] || 1,
}));
