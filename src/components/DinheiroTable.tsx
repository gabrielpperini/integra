import { dinheiro } from "../data/computed";
import { cc, cl, medal, podiumBg } from "./shared";

export default function DinheiroTable() {
  return (
    <div>
      <div className="mb-3">
        <h2 className="m-0 text-base sm:text-lg text-amber-500">Arrecadação de Dinheiro</h2>
        <div className="text-xs sm:text-[13px] text-gray-500 mt-0.5">Métrica: R$ arrecadados ÷ nº de alunos · Peso 1</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className={`${cc} w-9`}>#</th>
              <th className={cl}>Curso</th>
              <th className={`${cc} text-gray-500`}>Alunos</th>
              <th className={`${cc} text-gray-500`}>Arrecadado</th>
              <th className={cc}>R$/aluno</th>
            </tr>
          </thead>
          <tbody>
            {dinheiro.map((row, i) => (
              <tr key={row.curso} className={`border-b border-gray-100 ${podiumBg(i, row.ratio === 0)}`}>
                <td className={`${cc} ${row.ratio === 0 ? "text-gray-300" : ""}`}>
                  {row.ratio === 0 ? "—" : medal[i] || `${i + 1}º`}
                </td>
                <td className={`${cl} ${row.ratio === 0 ? "text-gray-300" : i < 3 ? "font-bold" : ""}`}>{row.curso}</td>
                <td className={`${cc} text-gray-500`}>{row.alunos}</td>
                <td className={`${cc} ${row.valor === 0 ? "text-gray-300" : "text-gray-700"}`}>
                  {row.valor === 0 ? "—" : `R$ ${row.valor.toFixed(2)}`}
                </td>
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
