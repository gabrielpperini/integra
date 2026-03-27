import { useState } from "react";

const TABLE_15: Record<number, number> = {1:20,2:17,3:15,4:14,5:12,6:11,7:10,8:9,9:7,10:6,11:5,12:4,13:3,14:2,15:1};

const dinheiro = [
  {curso:"AMBICA",   ratio:1.734, alunos:346,  valor:600},
  {curso:"QUÍMICA",  ratio:0.963, alunos:623,  valor:600},
  {curso:"AUTOMAÇÃO",ratio:0.403, alunos:211,  valor:85},
  {curso:"PRODUÇÃO", ratio:0.007, alunos:424,  valor:3},
  {curso:"ALERGIA",  ratio:0,     alunos:318,  valor:0},
  {curso:"A3FAD",    ratio:0,     alunos:1207, valor:0},
  {curso:"CIVIL",    ratio:0,     alunos:877,  valor:0},
  {curso:"AAPI",     ratio:0,     alunos:2553, valor:0},
  {curso:"MATERIAIS",ratio:0,     alunos:134,  valor:0},
  {curso:"ELÉTRICA", ratio:0,     alunos:408,  valor:0},
  {curso:"HÍDRICA",  ratio:0,     alunos:61,   valor:0},
  {curso:"MINAS",    ratio:0,     alunos:85,   valor:0},
  {curso:"MECÂNICA", ratio:0,     alunos:655,  valor:0},
  {curso:"METAL",    ratio:0,     alunos:151,  valor:0},
  {curso:"AACA",     ratio:0,     alunos:999,  valor:0},
];

const fisica = [
  {curso:"PRODUÇÃO", ratio:2.34,alunos:424, pontos:993, itens:19,
    doacoes:[{item:"Ração 20+ kg",qtd:18,pts:990},{item:"Ração 1 kg",qtd:1,pts:3}]},
  {curso:"AMBICA",   ratio:0.50,alunos:346, pontos:173, itens:65,
    doacoes:[{item:"Ração 20+ kg",qtd:2,pts:110},{item:"Sachê ração",qtd:63,pts:63}]},
  {curso:"QUÍMICA",  ratio:0.23,alunos:623, pontos:141, itens:92,
    doacoes:[{item:"Sachê ração",qtd:90,pts:90},{item:"Ração 15 kg",qtd:1,pts:28},{item:"Ração 10 kg",qtd:1,pts:23}]},
  {curso:"ALERGIA",  ratio:0.18,alunos:318, pontos:58,  itens:2,
    doacoes:[{item:"Ração 20+ kg",qtd:1,pts:55},{item:"Ração 1 kg",qtd:1,pts:3}]},
  {curso:"AUTOMAÇÃO",ratio:0.16,alunos:211, pontos:34,  itens:34,
    doacoes:[{item:"Sachê ração",qtd:34,pts:34}]},
  {curso:"A3FAD",    ratio:0.06,alunos:1207,pontos:75,  itens:75,
    doacoes:[{item:"Sachê ração",qtd:75,pts:75}]},
  {curso:"CIVIL",    ratio:0,alunos:877, pontos:0,itens:0,doacoes:[]},
  {curso:"AAPI",     ratio:0,alunos:2553,pontos:0,itens:0,doacoes:[]},
  {curso:"MATERIAIS",ratio:0,alunos:134, pontos:0,itens:0,doacoes:[]},
  {curso:"ELÉTRICA", ratio:0,alunos:408, pontos:0,itens:0,doacoes:[]},
  {curso:"HÍDRICA",  ratio:0,alunos:61,  pontos:0,itens:0,doacoes:[]},
  {curso:"MINAS",    ratio:0,alunos:85,  pontos:0,itens:0,doacoes:[]},
  {curso:"MECÂNICA", ratio:0,alunos:655, pontos:0,itens:0,doacoes:[]},
  {curso:"METAL",    ratio:0,alunos:151, pontos:0,itens:0,doacoes:[]},
  {curso:"AACA",     ratio:0,alunos:999, pontos:0,itens:0,doacoes:[]},
];

const sangue = [
  {curso:"PRODUÇÃO", ratio:15.57,doacoes:66,alunos:424},
  {curso:"AUTOMAÇÃO",ratio:2.37, doacoes:5, alunos:211},
  {curso:"AMBICA",   ratio:1.73, doacoes:6, alunos:346},
  {curso:"QUÍMICA",  ratio:1.28, doacoes:8, alunos:623},
  {curso:"A3FAD",    ratio:0.75, doacoes:9, alunos:1207},
  {curso:"CIVIL",    ratio:0.68, doacoes:6, alunos:877},
  {curso:"ALERGIA",  ratio:0.63, doacoes:2, alunos:318},
  {curso:"AAPI",     ratio:0,doacoes:0,alunos:2553},
  {curso:"MATERIAIS",ratio:0,doacoes:0,alunos:134},
  {curso:"ELÉTRICA", ratio:0,doacoes:0,alunos:408},
  {curso:"HÍDRICA",  ratio:0,doacoes:0,alunos:61},
  {curso:"MINAS",    ratio:0,doacoes:0,alunos:85},
  {curso:"MECÂNICA", ratio:0,doacoes:0,alunos:655},
  {curso:"METAL",    ratio:0,doacoes:0,alunos:151},
  {curso:"AACA",     ratio:0,doacoes:0,alunos:999},
];

const itemSummary = (() => {
  const map: Record<string, {qtd:number,pts:number,cursos:{curso:string,qtd:number,pts:number}[]}> = {};
  fisica.forEach(c => c.doacoes.forEach(d => {
    if (!map[d.item]) map[d.item] = {qtd:0,pts:0,cursos:[]};
    map[d.item].qtd += d.qtd;
    map[d.item].pts += d.pts;
    map[d.item].cursos.push({curso:c.curso,qtd:d.qtd,pts:d.pts});
  }));
  return Object.entries(map).sort((a,b)=>b[1].pts-a[1].pts).map(([item,v])=>({item,...v}));
})();

const totalItens = fisica.reduce((s,c)=>s+c.itens,0);
const totalPts   = fisica.reduce((s,c)=>s+c.pontos,0);

function assignPoints(list) {
  const ranked = list.filter(x => x.ratio > 0);
  const zeroed = list.filter(x => x.ratio === 0);
  return [
    ...ranked.map((item,i)=>({...item,pos:i+1,pts:TABLE_15[i+1]||1})),
    ...zeroed.map(item=>({...item,pos:0,pts:0})),
  ];
}

const d = assignPoints(dinheiro);
const f = assignPoints(fisica);
const s = assignPoints(sangue);

const allCursos = [...new Set([...d,...f,...s].map(x=>x.curso))];
function getPts(list,curso){ return list.find(x=>x.curso===curso)?.pts ?? 0; }
const ranking = allCursos.map(curso=>{
  const pd=getPts(d,curso), pf=getPts(f,curso), ps=getPts(s,curso);
  return {curso,pd,pf,ps,total:pd*1+pf*2+ps*3};
}).sort((a,b)=> b.total!==a.total ? b.total-a.total : (b.ps*3)-(a.ps*3));

const finalWithPts = ranking.map((row,i)=>({...row, ptsGerais: row.total===0 ? 0 : (TABLE_15[i+1]||1) }));

const medal = ["🥇","🥈","🥉"];
const tabs  = ["🏆 Final","💰 Dinheiro","📦 Física","🩸 Sangue","📊 Resumo Itens"];

const cc = "px-1.5 py-2 sm:px-2 sm:py-2.5 text-center";
const cl = "px-1.5 py-2 sm:px-2 sm:py-2.5 text-left";

function podiumBg(i: number, isZero = false): string {
  if (isZero) return "bg-white";
  return ["bg-row-gold", "bg-row-silver", "bg-row-bronze"][i] ?? "bg-white";
}

function SimpleTable({data,title,subtitle,colorClass}: {data: any[],title: string,subtitle: string,colorClass: string}){
  return (
    <div>
      <div className="mb-3">
        <h2 className={`m-0 text-base sm:text-lg ${colorClass}`}>{title}</h2>
        <div className="text-xs sm:text-[13px] text-gray-500 mt-0.5">{subtitle}</div>
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
              <th className={cc}>Pts tabela</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row,i)=>(
              <tr key={row.curso} className={`border-b border-gray-100 ${podiumBg(i)}`}>
                <td className={cc}>{medal[i]||`${i+1}º`}</td>
                <td className={`${cl} ${i<3?"font-bold":""}`}>{row.curso}</td>
                <td className={`${cc} text-gray-500`}>{row.alunos}</td>
                <td className={`${cc} ${row.valor===0?"text-gray-300":"text-gray-700"}`}>
                  {row.valor===0?"—":`R$ ${row.valor.toFixed(2)}`}
                </td>
                <td className={`${cc} ${row.ratio===0?"text-gray-300":"text-gray-800"}`}>
                  {row.ratio===0?"—":row.ratio.toFixed(3)}
                </td>
                <td className={`${cc} font-bold ${row.pts===0?"text-gray-300":colorClass}`}>{row.pts||"—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FisicaTable(){
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (curso) => setExpanded(prev => prev===curso ? null : curso);

  const rows = [];
  f.forEach((row,i) => {
    const isExp = expanded === row.curso;
    rows.push(
      <tr key={row.curso}
        onClick={()=>row.doacoes.length>0&&toggle(row.curso)}
        className={`${isExp?"":"border-b border-gray-100"} ${podiumBg(i)} ${row.doacoes.length?"cursor-pointer":"cursor-default"}`}>
        <td className={cc}>{medal[i]||`${i+1}º`}</td>
        <td className={`${cl} ${i<3?"font-bold":""}`}>
          {row.doacoes.length>0
            ? <span>{row.curso} <span className="text-[11px] text-gray-400">{isExp?"▲":"▼"}</span></span>
            : row.curso}
        </td>
        <td className={`${cc} text-gray-500`}>{row.alunos}</td>
        <td className={`${cc} ${row.itens===0?"text-gray-300":"text-gray-700"}`}>{row.itens||"—"}</td>
        <td className={`${cc} ${row.pontos===0?"text-gray-300":"text-gray-700"}`}>{row.pontos||"—"}</td>
        <td className={`${cc} ${row.ratio===0?"text-gray-300":"text-gray-800"}`}>{row.ratio===0?"—":row.ratio.toFixed(3)}</td>
        <td className={`${cc} font-bold ${row.pts===0?"text-gray-300":"text-emerald-500"}`}>{row.pts||"—"}</td>
      </tr>
    );
    if (isExp && row.doacoes.length>0) {
      rows.push(
        <tr key={row.curso+"_det"}>
          <td colSpan={7} className="px-2 pb-3 pl-10 border-b border-gray-100 bg-gray-50">
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
                {row.doacoes.map((dd,j)=>(
                  <tr key={j} className="border-t border-gray-200">
                    <td className="px-2 py-1.5">{dd.item}</td>
                    <td className="px-2 py-1.5 text-center">{dd.qtd}</td>
                    <td className="px-2 py-1.5 text-center font-semibold">{dd.pts}</td>
                    <td className="px-2 py-1.5 text-center text-gray-500">{(dd.pts/dd.qtd).toFixed(1)}</td>
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
        <div className="text-xs sm:text-[13px] text-gray-500 mt-0.5">Métrica: pontos de itens ÷ nº de alunos · Peso 2 · clique para ver detalhes</div>
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
              <th className={`${cc} text-emerald-500`}>Pts tabela</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}

export default function App(){
  const [tab, setTab] = useState(0);

  return (
    <div className="font-sans max-w-[720px] mx-auto p-3 sm:p-4">
      <div className="bg-gradient-to-br from-header-from to-header-to rounded-lg sm:rounded-xl px-4 py-4 sm:px-6 sm:py-5 mb-5 text-white">
        <div className="text-[11px] tracking-[2px] text-gray-400 mb-1">RELATÓRIO OFICIAL</div>
        <h1 className="m-0 text-lg sm:text-xl">Integra Solidário 2026</h1>
        <div className="text-xs sm:text-[13px] text-header-accent mt-1">15 equipes · 3 provas · pontuação ponderada</div>
      </div>

      <div className="flex gap-1 sm:gap-1.5 mb-4 overflow-x-auto sm:flex-wrap">
        {tabs.map((t,i)=>(
          <button key={i} onClick={()=>setTab(i)} className={`px-3 py-1.5 rounded-full border-none cursor-pointer text-xs sm:text-[13px] whitespace-nowrap ${
            tab===i ? "bg-indigo-600 text-white font-bold" : "bg-gray-100 text-gray-700"
          }`}>{t}</button>
        ))}
      </div>

      {tab===0&&(
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
                {finalWithPts.map((row,i)=>(
                  <tr key={row.curso} className={`border-b border-gray-100 ${podiumBg(i, row.total===0)}`}>
                    <td className={`${cc} text-base ${row.total===0?"text-gray-300":""}`}>{row.total===0?"—":medal[i]||`${i+1}º`}</td>
                    <td className={`${cl} ${row.total===0?"text-gray-300":i<3?"font-bold":""}`}>{row.curso}</td>
                    <td className={`${cc} ${row.pd===0?"text-gray-300":"text-amber-800"}`}>{row.pd||"—"}</td>
                    <td className={`${cc} ${row.pf===0?"text-gray-300":"text-emerald-800"}`}>{row.pf===0?"—":row.pf*2}</td>
                    <td className={`${cc} ${row.ps===0?"text-gray-300":"text-red-800"}`}>{row.ps===0?"—":row.ps*3}</td>
                    <td className={`${cc} font-bold text-[15px] ${row.total===0?"text-gray-300":""}`}>{row.total||"—"}</td>
                    <td className={`${cc} font-bold ${row.ptsGerais===0?"text-gray-300":"text-indigo-600"}`}>{row.ptsGerais||"—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab===1&&<SimpleTable data={d} title="Arrecadação de Dinheiro" subtitle="Métrica: R$ arrecadados ÷ nº de alunos · Peso 1" colorClass="text-amber-500"/>}
      {tab===2&&<FisicaTable/>}

      {tab===3&&(
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
                  <th className={`${cc} text-red-500`}>Pts tabela</th>
                </tr>
              </thead>
              <tbody>
                {s.map((row,i)=>(
                  <tr key={row.curso} className={`border-b border-gray-100 ${podiumBg(i)}`}>
                    <td className={cc}>{medal[i]||`${i+1}º`}</td>
                    <td className={`${cl} ${i<3?"font-bold":""}`}>{row.curso}</td>
                    <td className={`${cc} text-gray-500`}>{row.alunos}</td>
                    <td className={`${cc} ${row.doacoes===0?"text-gray-300":"text-gray-700"}`}>{row.doacoes||"—"}</td>
                    <td className={`${cc} ${row.ratio===0?"text-gray-300":"text-gray-800"}`}>{row.ratio===0?"—":row.ratio.toFixed(3)}</td>
                    <td className={`${cc} font-bold ${row.pts===0?"text-gray-300":"text-red-500"}`}>{row.pts||"—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab===4&&(
        <div>
          <div className="mb-4 flex flex-col sm:flex-row gap-3">
            {[
              {label:"Total de itens",val:totalItens,textClass:"text-emerald-500",borderClass:"border-emerald-500"},
              {label:"Total de pontos",val:totalPts,textClass:"text-amber-500",borderClass:"border-amber-500"},
              {label:"Cursos participantes",val:fisica.filter(c=>c.itens>0).length,textClass:"text-indigo-600",borderClass:"border-indigo-600"},
            ].map((st,i)=>(
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
                {itemSummary.map((row,i)=>(
                  <tr key={i} className="border-b border-gray-100">
                    <td className={`${cl} font-semibold`}>{row.item}</td>
                    <td className={cc}>{row.qtd}</td>
                    <td className={`${cc} font-bold text-emerald-500`}>{row.pts}</td>
                    <td className={`${cc} text-gray-500`}>{(row.pts/row.qtd).toFixed(1)}</td>
                    <td className={`${cl} text-xs text-gray-500`}>
                      {row.cursos.map(c=>`${c.curso} (${c.qtd})`).join(" · ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
