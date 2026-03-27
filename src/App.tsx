import { useState } from "react";
import FinalTable from "./components/FinalTable";
import DinheiroTable from "./components/DinheiroTable";
import FisicaTable from "./components/FisicaTable";
import SangueTable from "./components/SangueTable";
import ResumoItens from "./components/ResumoItens";

const tabs = ["🏆 Final", "💰 Dinheiro", "📦 Física", "🩸 Sangue", "📊 Resumo Itens"];

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <div className="font-sans max-w-[720px] mx-auto p-3 sm:p-4">
      <div className="bg-gradient-to-br from-header-from to-header-to rounded-lg sm:rounded-xl px-4 py-4 sm:px-6 sm:py-5 mb-5 text-white">
        <div className="text-[11px] tracking-[2px] text-gray-400 mb-1">RELATÓRIO OFICIAL</div>
        <h1 className="m-0 text-lg sm:text-xl">Integra Solidário 2026</h1>
        <div className="text-xs sm:text-[13px] text-header-accent mt-1">15 equipes · 3 provas · pontuação ponderada</div>
      </div>

      <div className="flex gap-1 sm:gap-1.5 mb-4 overflow-x-auto sm:flex-wrap">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => setTab(i)}
            className={`px-3 py-1.5 rounded-full border-none cursor-pointer text-xs sm:text-[13px] whitespace-nowrap ${
              tab === i ? "bg-indigo-600 text-white font-bold" : "bg-gray-100 text-gray-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 0 && <FinalTable />}
      {tab === 1 && <DinheiroTable />}
      {tab === 2 && <FisicaTable />}
      {tab === 3 && <SangueTable />}
      {tab === 4 && <ResumoItens />}
    </div>
  );
}
