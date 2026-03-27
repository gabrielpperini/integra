import { sangue } from "../data/computed";
import { cc, cl, medal, podiumBg } from "./shared";

export default function SangueTable() {
  return (
    <div>
      <div className="mb-3">
        <h2 className="m-0 text-base sm:text-lg text-red-500">Doação de Sangue</h2>
        <div className="text-xs sm:text-[13px] text-gray-500 mt-0.5">Métrica: nº doações ÷ nº de alunos · Peso 3</div>
        <div className="mt-2 px-3 py-2 bg-sky-50 rounded-md text-[11px] sm:text-xs text-sky-700">
          Aceitas doações até 60 dias antes (homens → a partir de 24/jan) e 90 dias (mulheres → a partir de 25/dez)
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-xs sm:text-[13px]">
          <thead>
            <tr className="bg-gray-50">
              <th className={`${cc} w-9`}>#</th>
              <th className={cl}>Curso</th>
              <th className={`${cc} text-gray-500`}>Alunos</th>
              <th className={`${cc} text-gray-500`}>Doações</th>
              <th className={cc}>Ratio</th>
            </tr>
          </thead>
          <tbody>
            {sangue.map((row, i) => (
              <tr key={row.curso} className={`border-b border-gray-100 ${podiumBg(i)}`}>
                <td className={cc}>{medal[i] || `${i + 1}º`}</td>
                <td className={`${cl} ${i < 3 ? "font-bold" : ""}`}>{row.curso}</td>
                <td className={`${cc} text-gray-500`}>{row.alunos}</td>
                <td className={`${cc} ${row.doacoes === 0 ? "text-gray-300" : "text-gray-700"}`}>{row.doacoes || "—"}</td>
                <td className={`${cc} ${row.ratio === 0 ? "text-gray-300" : "text-gray-800"}`}>
                  {row.ratio === 0 ? "—" : row.ratio.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
