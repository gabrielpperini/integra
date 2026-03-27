import { finalWithPts } from "../data/computed";
import { cc, cl, medal, podiumBg } from "./shared";

export default function FinalTable() {
  return (
    <div>
      <div className="mb-3 px-3 py-2.5 bg-amber-50 rounded-lg text-xs sm:text-[13px] text-amber-800 border-l-4 border-amber-500">
        <strong>Metodologia:</strong> Pontos pela tabela Art. 37 (15 equipes). Pesos: Dinheiro ×1 · Física ×2 · Sangue ×3. Empate desempata por Sangue.
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className={`${cc} w-9`}>#</th>
              <th className={cl}>Curso</th>
              <th className={`${cc} text-amber-500`}>💰×1</th>
              <th className={`${cc} text-emerald-500`}>📦×2</th>
              <th className={`${cc} text-red-500`}>🩸×3</th>
              <th className={`${cc} font-bold`}>TOTAL</th>
              <th className={`${cc} text-indigo-600`}>Pts Gerais</th>
            </tr>
          </thead>
          <tbody>
            {finalWithPts.map((row, i) => (
              <tr key={row.curso} className={`border-b border-gray-100 ${podiumBg(i, row.total === 0)}`}>
                <td className={`${cc} text-base ${row.total === 0 ? "text-gray-300" : ""}`}>
                  {row.total === 0 ? "—" : medal[i] || `${i + 1}º`}
                </td>
                <td className={`${cl} ${row.total === 0 ? "text-gray-300" : i < 3 ? "font-bold" : ""}`}>{row.curso}</td>
                <td className={`${cc} ${row.rd === 0 ? "text-gray-300" : "text-amber-800"}`}>
                  {row.rd === 0 ? "—" : (row.rd * 1).toFixed(3)}
                </td>
                <td className={`${cc} ${row.rf === 0 ? "text-gray-300" : "text-emerald-800"}`}>
                  {row.rf === 0 ? "—" : (row.rf * 2).toFixed(3)}
                </td>
                <td className={`${cc} ${row.rs === 0 ? "text-gray-300" : "text-red-800"}`}>
                  {row.rs === 0 ? "—" : (row.rs * 3).toFixed(3)}
                </td>
                <td className={`${cc} font-bold text-[15px] ${row.total === 0 ? "text-gray-300" : ""}`}>
                  {row.total === 0 ? "—" : row.total.toFixed(3)}
                </td>
                <td className={`${cc} font-bold ${row.ptsGerais === 0 ? "text-gray-300" : "text-indigo-600"}`}>
                  {row.ptsGerais || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
