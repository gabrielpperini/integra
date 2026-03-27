import { fisica, itemSummary, totalItens, totalPts } from "../data/computed";
import { cc, cl } from "./shared";

export default function ResumoItens() {
  return (
    <div>
      <div className="mb-4 flex flex-col sm:flex-row gap-3">
        {[
          { label: "Total de itens", val: totalItens, textClass: "text-emerald-500", borderClass: "border-emerald-500" },
          { label: "Total de pontos", val: totalPts, textClass: "text-amber-500", borderClass: "border-amber-500" },
          { label: "Cursos participantes", val: fisica.filter(c => c.itens > 0).length, textClass: "text-indigo-600", borderClass: "border-indigo-600" },
        ].map((st, i) => (
          <div key={i} className={`flex-1 min-w-[140px] bg-gray-50 rounded-lg px-4 py-3.5 border-t-[3px] ${st.borderClass}`}>
            <div className="text-[11px] text-gray-500 mb-1">{st.label}</div>
            <div className={`text-2xl font-bold ${st.textClass}`}>{st.val}</div>
          </div>
        ))}
      </div>
      <h3 className="text-sm sm:text-[15px] mb-2 text-gray-700">Por tipo de item</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-xs sm:text-[13px]">
          <thead>
            <tr className="bg-gray-50">
              <th className={cl}>Item</th>
              <th className={cc}>Qtd total</th>
              <th className={cc}>Pts total</th>
              <th className={cc}>Pts/unid</th>
              <th className={cl}>Quem doou</th>
            </tr>
          </thead>
          <tbody>
            {itemSummary.map((row, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className={`${cl} font-semibold`}>{row.item}</td>
                <td className={cc}>{row.qtd}</td>
                <td className={`${cc} font-bold text-emerald-500`}>{row.pts}</td>
                <td className={`${cc} text-gray-500`}>{(row.pts / row.qtd).toFixed(1)}</td>
                <td className={`${cl} text-xs text-gray-500`}>
                  {row.cursos.map(c => `${c.curso} (${c.qtd})`).join(" · ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
