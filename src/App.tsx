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

function SimpleTable({data,title,subtitle,color}: {data: any[],title: string,subtitle: string,color: string}){
  return (
    <div>
      <div style={{marginBottom:12}}>
        <h2 style={{margin:0,fontSize:17,color}}>{title}</h2>
        <div style={{fontSize:13,color:"#666",marginTop:2}}>{subtitle}</div>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}>
        <thead>
          <tr style={{background:"#f8f9fa"}}>
            <th style={{padding:"10px 8px",textAlign:"center",width:40}}>#</th>
            <th style={{padding:"10px 8px",textAlign:"left"}}>Curso</th>
            <th style={{padding:"10px 8px",textAlign:"center",color:"#6b7280"}}>Alunos</th>
            <th style={{padding:"10px 8px",textAlign:"center",color:"#6b7280"}}>Arrecadado</th>
            <th style={{padding:"10px 8px",textAlign:"center"}}>R$/aluno</th>
            <th style={{padding:"10px 8px",textAlign:"center"}}>Pts tabela</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row,i)=>(
            <tr key={row.curso} style={{borderBottom:"1px solid #eee",background:i<3?["#fffdf0","#f0f4ff","#f5f5f5"][i]:"white"}}>
              <td style={{padding:"10px 8px",textAlign:"center"}}>{medal[i]||`${i+1}º`}</td>
              <td style={{padding:"10px 8px",fontWeight:i<3?700:400}}>{row.curso}</td>
              <td style={{padding:"10px 8px",textAlign:"center",color:"#6b7280"}}>{row.alunos}</td>
              <td style={{padding:"10px 8px",textAlign:"center",color:row.valor===0?"#ccc":"#374151"}}>
                {row.valor===0?"—":`R$ ${row.valor.toFixed(2)}`}
              </td>
              <td style={{padding:"10px 8px",textAlign:"center",color:row.ratio===0?"#ccc":"#333"}}>
                {row.ratio===0?"—":row.ratio.toFixed(3)}
              </td>
              <td style={{padding:"10px 8px",textAlign:"center",fontWeight:700,color:row.pts===0?"#ccc":color}}>{row.pts||"—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FisicaTable(){
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggle = (curso) => setExpanded(prev => prev===curso ? null : curso);

  const rows = [];
  f.forEach((row,i) => {
    const isExp = expanded === row.curso;
    const bgColor = i<3 ? ["#fffdf0","#f0f4ff","#f5f5f5"][i] : "white";
    rows.push(
      <tr key={row.curso}
        onClick={()=>row.doacoes.length>0&&toggle(row.curso)}
        style={{borderBottom:isExp?"none":"1px solid #eee",background:bgColor,cursor:row.doacoes.length?"pointer":"default"}}>
        <td style={{padding:"10px 8px",textAlign:"center"}}>{medal[i]||`${i+1}º`}</td>
        <td style={{padding:"10px 8px",fontWeight:i<3?700:400}}>
          {row.doacoes.length>0
            ? <span>{row.curso} <span style={{fontSize:11,color:"#9ca3af"}}>{isExp?"▲":"▼"}</span></span>
            : row.curso}
        </td>
        <td style={{padding:"10px 8px",textAlign:"center",color:"#6b7280"}}>{row.alunos}</td>
        <td style={{padding:"10px 8px",textAlign:"center",color:row.itens===0?"#ccc":"#374151"}}>{row.itens||"—"}</td>
        <td style={{padding:"10px 8px",textAlign:"center",color:row.pontos===0?"#ccc":"#374151"}}>{row.pontos||"—"}</td>
        <td style={{padding:"10px 8px",textAlign:"center",color:row.ratio===0?"#ccc":"#333"}}>{row.ratio===0?"—":row.ratio.toFixed(3)}</td>
        <td style={{padding:"10px 8px",textAlign:"center",fontWeight:700,color:row.pts===0?"#ccc":"#10b981"}}>{row.pts||"—"}</td>
      </tr>
    );
    if (isExp && row.doacoes.length>0) {
      rows.push(
        <tr key={row.curso+"_det"}>
          <td colSpan={7} style={{padding:"0 8px 12px 40px",borderBottom:"1px solid #eee",background:"#f9fafb"}}>
            <table style={{width:"100%",fontSize:12,borderCollapse:"collapse"}}>
              <thead>
                <tr style={{color:"#6b7280"}}>
                  <th style={{padding:"6px 8px",textAlign:"left"}}>Item</th>
                  <th style={{padding:"6px 8px",textAlign:"center"}}>Qtd</th>
                  <th style={{padding:"6px 8px",textAlign:"center"}}>Pts</th>
                  <th style={{padding:"6px 8px",textAlign:"center"}}>Pts/item</th>
                </tr>
              </thead>
              <tbody>
                {row.doacoes.map((dd,j)=>(
                  <tr key={j} style={{borderTop:"1px solid #e5e7eb"}}>
                    <td style={{padding:"6px 8px"}}>{dd.item}</td>
                    <td style={{padding:"6px 8px",textAlign:"center"}}>{dd.qtd}</td>
                    <td style={{padding:"6px 8px",textAlign:"center",fontWeight:600}}>{dd.pts}</td>
                    <td style={{padding:"6px 8px",textAlign:"center",color:"#6b7280"}}>{(dd.pts/dd.qtd).toFixed(1)}</td>
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
      <div style={{marginBottom:12}}>
        <h2 style={{margin:0,fontSize:17,color:"#10b981"}}>Doação Física</h2>
        <div style={{fontSize:13,color:"#666",marginTop:2}}>Métrica: pontos de itens ÷ nº de alunos · Peso 2 · clique para ver detalhes</div>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
        <thead>
          <tr style={{background:"#f8f9fa"}}>
            <th style={{padding:"10px 8px",textAlign:"center",width:36}}>#</th>
            <th style={{padding:"10px 8px",textAlign:"left"}}>Curso</th>
            <th style={{padding:"10px 8px",textAlign:"center",color:"#6b7280"}}>Alunos</th>
            <th style={{padding:"10px 8px",textAlign:"center",color:"#6b7280"}}>Itens</th>
            <th style={{padding:"10px 8px",textAlign:"center",color:"#6b7280"}}>Pts itens</th>
            <th style={{padding:"10px 8px",textAlign:"center"}}>Pts/aluno</th>
            <th style={{padding:"10px 8px",textAlign:"center",color:"#10b981"}}>Pts tabela</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default function App(){
  const [tab, setTab] = useState(0);

  return (
    <div style={{fontFamily:"sans-serif",maxWidth:720,margin:"0 auto",padding:16}}>
      <div style={{background:"linear-gradient(135deg,#1a1a2e,#16213e)",borderRadius:12,padding:"20px 24px",marginBottom:20,color:"white"}}>
        <div style={{fontSize:11,letterSpacing:2,color:"#aaa",marginBottom:4}}>RELATÓRIO OFICIAL</div>
        <h1 style={{margin:0,fontSize:22}}>Integra Solidário 2026</h1>
        <div style={{fontSize:13,color:"#88aaff",marginTop:4}}>15 equipes · 3 provas · pontuação ponderada</div>
      </div>

      <div style={{display:"flex",gap:6,marginBottom:16,flexWrap:"wrap"}}>
        {tabs.map((t,i)=>(
          <button key={i} onClick={()=>setTab(i)} style={{
            padding:"7px 13px",borderRadius:20,border:"none",cursor:"pointer",fontSize:13,
            background:tab===i?"#4f46e5":"#f0f0f0",color:tab===i?"white":"#333",
            fontWeight:tab===i?700:400
          }}>{t}</button>
        ))}
      </div>

      {tab===0&&(
        <div>
          <div style={{marginBottom:12,padding:"10px 14px",background:"#fffbeb",borderRadius:8,fontSize:13,color:"#92400e",borderLeft:"4px solid #f59e0b"}}>
            <strong>Metodologia:</strong> Pontos pela tabela Art. 37 (15 equipes). Pesos: Dinheiro ×1 · Física ×2 · Sangue ×3. Empate desempata por Sangue.
          </div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}>
            <thead>
              <tr style={{background:"#f8f9fa"}}>
                <th style={{padding:"10px 8px",textAlign:"center",width:40}}>#</th>
                <th style={{padding:"10px 8px",textAlign:"left"}}>Curso</th>
                <th style={{padding:"10px 8px",textAlign:"center",color:"#f59e0b"}}>💰×1</th>
                <th style={{padding:"10px 8px",textAlign:"center",color:"#10b981"}}>📦×2</th>
                <th style={{padding:"10px 8px",textAlign:"center",color:"#ef4444"}}>🩸×3</th>
                <th style={{padding:"10px 8px",textAlign:"center",fontWeight:700}}>TOTAL</th>
                <th style={{padding:"10px 8px",textAlign:"center",color:"#4f46e5"}}>Pts Gerais</th>
              </tr>
            </thead>
            <tbody>
              {finalWithPts.map((row,i)=>(
                <tr key={row.curso} style={{borderBottom:"1px solid #eee",background:row.total===0?"white":i<3?["#fffdf0","#f0f4ff","#f5f5f5"][i]:"white"}}>
                  <td style={{padding:"10px 8px",textAlign:"center",fontSize:16,color:row.total===0?"#ccc":undefined}}>{row.total===0?"—":medal[i]||`${i+1}º`}</td>
                  <td style={{padding:"10px 8px",fontWeight:row.total===0?400:i<3?700:400,color:row.total===0?"#ccc":undefined}}>{row.curso}</td>
                  <td style={{padding:"10px 8px",textAlign:"center",color:row.pd===0?"#ccc":"#92400e"}}>{row.pd||"—"}</td>
                  <td style={{padding:"10px 8px",textAlign:"center",color:row.pf===0?"#ccc":"#065f46"}}>{row.pf===0?"—":row.pf*2}</td>
                  <td style={{padding:"10px 8px",textAlign:"center",color:row.ps===0?"#ccc":"#991b1b"}}>{row.ps===0?"—":row.ps*3}</td>
                  <td style={{padding:"10px 8px",textAlign:"center",fontWeight:700,fontSize:15,color:row.total===0?"#ccc":undefined}}>{row.total||"—"}</td>
                  <td style={{padding:"10px 8px",textAlign:"center",fontWeight:700,color:row.ptsGerais===0?"#ccc":"#4f46e5"}}>{row.ptsGerais||"—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab===1&&<SimpleTable data={d} title="Arrecadação de Dinheiro" subtitle="Métrica: R$ arrecadados ÷ nº de alunos · Peso 1" color="#f59e0b"/>}
      {tab===2&&<FisicaTable/>}

      {tab===3&&(
        <div>
          <div style={{marginBottom:12}}>
            <h2 style={{margin:0,fontSize:17,color:"#ef4444"}}>Doação de Sangue</h2>
            <div style={{fontSize:13,color:"#666",marginTop:2}}>Métrica: nº doações ÷ nº de alunos · Peso 3</div>
            <div style={{marginTop:8,padding:"8px 12px",background:"#f0f9ff",borderRadius:6,fontSize:12,color:"#0369a1"}}>
              Aceitas doações até 60 dias antes (homens → a partir de 24/jan) e 90 dias (mulheres → a partir de 25/dez)
            </div>
          </div>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr style={{background:"#f8f9fa"}}>
                <th style={{padding:"10px 8px",textAlign:"center",width:36}}>#</th>
                <th style={{padding:"10px 8px",textAlign:"left"}}>Curso</th>
                <th style={{padding:"10px 8px",textAlign:"center",color:"#6b7280"}}>Alunos</th>
                <th style={{padding:"10px 8px",textAlign:"center",color:"#6b7280"}}>Doações</th>
                <th style={{padding:"10px 8px",textAlign:"center"}}>Ratio</th>
                <th style={{padding:"10px 8px",textAlign:"center",color:"#ef4444"}}>Pts tabela</th>
              </tr>
            </thead>
            <tbody>
              {s.map((row,i)=>(
                <tr key={row.curso} style={{borderBottom:"1px solid #eee",background:i<3?["#fffdf0","#f0f4ff","#f5f5f5"][i]:"white"}}>
                  <td style={{padding:"10px 8px",textAlign:"center"}}>{medal[i]||`${i+1}º`}</td>
                  <td style={{padding:"10px 8px",fontWeight:i<3?700:400}}>{row.curso}</td>
                  <td style={{padding:"10px 8px",textAlign:"center",color:"#6b7280"}}>{row.alunos}</td>
                  <td style={{padding:"10px 8px",textAlign:"center",color:row.doacoes===0?"#ccc":"#374151"}}>{row.doacoes||"—"}</td>
                  <td style={{padding:"10px 8px",textAlign:"center",color:row.ratio===0?"#ccc":"#333"}}>{row.ratio===0?"—":row.ratio.toFixed(3)}</td>
                  <td style={{padding:"10px 8px",textAlign:"center",fontWeight:700,color:row.pts===0?"#ccc":"#ef4444"}}>{row.pts||"—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab===4&&(
        <div>
          <div style={{marginBottom:16,display:"flex",gap:12,flexWrap:"wrap"}}>
            {[
              {label:"Total de itens",val:totalItens,color:"#10b981"},
              {label:"Total de pontos",val:totalPts,color:"#f59e0b"},
              {label:"Cursos participantes",val:fisica.filter(c=>c.itens>0).length,color:"#4f46e5"},
            ].map((st,i)=>(
              <div key={i} style={{flex:1,minWidth:140,background:"#f9fafb",borderRadius:10,padding:"14px 16px",borderTop:`3px solid ${st.color}`}}>
                <div style={{fontSize:11,color:"#6b7280",marginBottom:4}}>{st.label}</div>
                <div style={{fontSize:24,fontWeight:700,color:st.color}}>{st.val}</div>
              </div>
            ))}
          </div>
          <h3 style={{fontSize:15,marginBottom:8,color:"#374151"}}>Por tipo de item</h3>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr style={{background:"#f8f9fa"}}>
                <th style={{padding:"10px 8px",textAlign:"left"}}>Item</th>
                <th style={{padding:"10px 8px",textAlign:"center"}}>Qtd total</th>
                <th style={{padding:"10px 8px",textAlign:"center"}}>Pts total</th>
                <th style={{padding:"10px 8px",textAlign:"center"}}>Pts/unid</th>
                <th style={{padding:"10px 8px",textAlign:"left"}}>Quem doou</th>
              </tr>
            </thead>
            <tbody>
              {itemSummary.map((row,i)=>(
                <tr key={i} style={{borderBottom:"1px solid #eee"}}>
                  <td style={{padding:"10px 8px",fontWeight:600}}>{row.item}</td>
                  <td style={{padding:"10px 8px",textAlign:"center"}}>{row.qtd}</td>
                  <td style={{padding:"10px 8px",textAlign:"center",fontWeight:700,color:row.pts===0?"#ccc":"#10b981"}}>{row.pts||"—"}</td>
                  <td style={{padding:"10px 8px",textAlign:"center",color:"#6b7280"}}>{(row.pts/row.qtd).toFixed(1)}</td>
                  <td style={{padding:"10px 8px",fontSize:12,color:"#6b7280"}}>
                    {row.cursos.map(c=>`${c.curso} (${c.qtd})`).join(" · ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}