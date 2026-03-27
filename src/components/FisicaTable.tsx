import { useState } from "react";
import { fisica } from "../data/computed";
import { cc, cl, medal, podiumBg } from "./shared";

export default function FisicaTable() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (curso: string) => setExpanded(prev => (prev === curso ? null : curso));

  const rows: React.ReactElement[] = [];
  fisica.forEach((row, i) => {
    const isExp = expanded === row.curso;
    rows.push(
      <tr
        key={row.curso}
        onClick={() => row.doacoes.length > 0 && toggle(row.curso)}
        className={`${isExp ? "" : "border-b border-gray-100"} ${podiumBg(i)} ${row.doacoes.length ? "cursor-pointer" : "cursor-default"}`}
      >
        <td className={cc}>{medal[i] || `${i + 1}º`}</td>
        <td className={`${cl} ${i < 3 ? "font-bold" : ""}`}>
          {row.doacoes.length > 0 ? (
            <span>
              {row.curso} <span className="text-[11px] text-gray-400">{isExp ? "▲" : "▼"}</span>
            </span>
          ) : (
            row.curso
          )}
        </td>
        <td className={`${cc} text-gray-500`}>{row.alunos}</td>
        <td className={`${cc} ${row.itens === 0 ? "text-gray-300" : "text-gray-700"}`}>{row.itens || "—"}</td>
        <td className={`${cc} ${row.pontos === 0 ? "text-gray-300" : "text-gray-700"}`}>{row.pontos || "—"}</td>
        <td className={`${cc} ${row.ratio === 0 ? "text-gray-300" : "text-gray-800"}`}>
          {row.ratio === 0 ? "—" : row.ratio.toFixed(3)}
        </td>
      </tr>
    );
    if (isExp && row.doacoes.length > 0) {
      rows.push(
        <tr key={row.curso + "_det"}>
          <td colSpan={6} className="px-2 pb-3 pl-10 border-b border-gray-100 bg-gray-50">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="text-gray-500">
                  <th className="px-2 py-1.5 text-left">Item</th>
                  <th className="px-2 py-1.5 text-center">Qtd</th>
                  <th className="px-2 py-1.5 text-center">Pts</th>
                  <th className="px-2 py-1.5 text-center">Pts/item</th>
                </tr>
              </thead>
              <tbody>
                {row.doacoes.map((dd, j) => (
                  <tr key={j} className="border-t border-gray-200">
                    <td className="px-2 py-1.5">{dd.item}</td>
                    <td className="px-2 py-1.5 text-center">{dd.qtd}</td>
                    <td className="px-2 py-1.5 text-center font-semibold">{dd.pts}</td>
                    <td className="px-2 py-1.5 text-center text-gray-500">{(dd.pts / dd.qtd).toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      );
    }
  });

  return (
    <div>
      <div className="mb-3">
        <h2 className="m-0 text-base sm:text-lg text-emerald-500">Doação Física</h2>
        <div className="text-xs sm:text-[13px] text-gray-500 mt-0.5">
          Métrica: pontos de itens ÷ nº de alunos · Peso 2 · clique para ver detalhes
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-xs sm:text-[13px]">
          <thead>
            <tr className="bg-gray-50">
              <th className={`${cc} w-9`}>#</th>
              <th className={cl}>Curso</th>
              <th className={`${cc} text-gray-500`}>Alunos</th>
              <th className={`${cc} text-gray-500`}>Itens</th>
              <th className={`${cc} text-gray-500`}>Pts itens</th>
              <th className={cc}>Pts/aluno</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}
