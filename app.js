const { useState, useRef, useEffect } = React;

const T = {
  en: {
    appName:"LegalTrack", appSub:"Legal Productivity System",
    tabs:["Dashboard","Cases","Time Log","Deadlines"],
    dashboard:"Dashboard", cases:"Cases", timeLog:"Time Log", deadlines:"Deadlines",
    activeMatt:"Active Matters", totalHrs:"Total Hours", unbilledVal:"Unbilled Value", overdueItems:"Overdue Items",
    upcomingDL:"Upcoming Deadlines", byArea:"Matters by Practice Area", overdueHdr:"⚠ Overdue Items",
    noDL:"No upcoming deadlines", noMatters:"No matters yet",
    newMatter:"+ New Matter", exportCSV:"⬇ Export CSV", addDeadline:"+ Add Deadline", logTime:"+ Log Time",
    save:"Save", cancel:"Cancel", delete:"Delete",
    matterName:"Matter Name", client:"Client", attorney:"Attorney / Paralegal", opened:"Opened",
    area:"Practice Area", status:"Status", notes:"Notes", searchPH:"Search matter or client...",
    allStatus:"All", date:"Date", task:"Task Description", hours:"Hours", rate:"Hourly Rate ($)",
    matter:"Matter", value:"Value", billed:"Billed", unbilled:"Unbilled",
    description:"Description", priority:"Priority", dueDate:"Due Date",
    saveMatter:"Save Matter", saveEntry:"Save Entry", saveDeadline:"Save Deadline",
    newMatterTitle:"New Matter", logTimeTitle:"Log Time Entry", addDLTitle:"Add Deadline",
    noMattersFound:"No matters found", noEntries:"No entries yet",
    done:"Done", today:"Today!", overdue:"d overdue", left:"d left",
    // Case Detail
    caseDetail:"Case Detail", back:"← Back to Cases", summary:"Summary / Extended Notes",
    summaryPH:"Write a detailed summary, strategy notes, background information...",
    documents:"Documents", uploadDoc:"Upload Document", noDocuments:"No documents uploaded yet.",
    uploadedOn:"Uploaded", fileSize:"Size", download:"Download", confirmDel:"Delete this document?",
    saveSummary:"Save Summary", summarySaved:"✓ Saved",
    currentDL:"Current", completedDL:"Completed",
    areas:["Litigation","Corporate","Family","Criminal","Real Estate","IP","Employment","Other"],
    statuses:["Active","Pending","Closed","On Hold"],
    priorities:["High","Medium","Low"],
  },
  es: {
    appName:"LegalTrack", appSub:"Sistema de Productividad Legal",
    tabs:["Panel","Casos","Registro de Tiempo","Plazos"],
    dashboard:"Panel", cases:"Casos", timeLog:"Registro de Tiempo", deadlines:"Plazos",
    activeMatt:"Casos Activos", totalHrs:"Horas Totales", unbilledVal:"Sin Facturar", overdueItems:"Vencidos",
    upcomingDL:"Próximos Plazos", byArea:"Casos por Área", overdueHdr:"⚠ Vencidos",
    noDL:"Sin plazos próximos", noMatters:"Sin casos aún",
    newMatter:"+ Nuevo Caso", exportCSV:"⬇ Exportar CSV", addDeadline:"+ Agregar Plazo", logTime:"+ Registrar Tiempo",
    save:"Guardar", cancel:"Cancelar", delete:"Eliminar",
    matterName:"Nombre del Caso", client:"Cliente", attorney:"Abogado / Paralegal", opened:"Abierto",
    area:"Área de Práctica", status:"Estado", notes:"Notas", searchPH:"Buscar caso o cliente...",
    allStatus:"Todos", date:"Fecha", task:"Descripción de Tarea", hours:"Horas", rate:"Tarifa por Hora ($)",
    matter:"Caso", value:"Valor", billed:"Facturado", unbilled:"Sin Facturar",
    description:"Descripción", priority:"Prioridad", dueDate:"Fecha Límite",
    saveMatter:"Guardar Caso", saveEntry:"Guardar Registro", saveDeadline:"Guardar Plazo",
    newMatterTitle:"Nuevo Caso", logTimeTitle:"Registrar Tiempo", addDLTitle:"Agregar Plazo",
    noMattersFound:"No se encontraron casos", noEntries:"Sin registros aún",
    done:"Listo", today:"¡Hoy!", overdue:"d vencido", left:"d restantes",
    caseDetail:"Detalle del Caso", back:"← Volver a Casos", summary:"Resumen / Notas Extendidas",
    summaryPH:"Escribe un resumen detallado, notas de estrategia, antecedentes...",
    documents:"Documentos", uploadDoc:"Subir Documento", noDocuments:"No hay documentos subidos aún.",
    uploadedOn:"Subido", fileSize:"Tamaño", download:"Descargar", confirmDel:"¿Eliminar este documento?",
    saveSummary:"Guardar Resumen", summarySaved:"✓ Guardado",
    currentDL:"Activos", completedDL:"Completados",
    areas:["Litigios","Corporativo","Familia","Penal","Bienes Raíces","PI","Laboral","Otro"],
    statuses:["Activo","Pendiente","Cerrado","En Espera"],
    priorities:["Alta","Media","Baja"],
  },
};

const BADGE_COLORS = {
  Active:"bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200", Activo:"bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Pending:"bg-amber-50 text-amber-700 ring-1 ring-amber-200", Pendiente:"bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Closed:"bg-stone-100 text-stone-500 ring-1 ring-stone-200", Cerrado:"bg-stone-100 text-stone-500 ring-1 ring-stone-200",
  "On Hold":"bg-orange-50 text-orange-600 ring-1 ring-orange-200", "En Espera":"bg-orange-50 text-orange-600 ring-1 ring-orange-200",
  High:"bg-rose-50 text-rose-700 ring-1 ring-rose-200", Alta:"bg-rose-50 text-rose-700 ring-1 ring-rose-200",
  Medium:"bg-amber-50 text-amber-700 ring-1 ring-amber-200", Media:"bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Low:"bg-sky-50 text-sky-600 ring-1 ring-sky-200", Baja:"bg-sky-50 text-sky-600 ring-1 ring-sky-200",
};

const fmt = n => isNaN(n) ? "0" : Number(n).toLocaleString();

const statusBg = s => {
  const m = {
    Active:"bg-emerald-50 text-emerald-700", Activo:"bg-emerald-50 text-emerald-700",
    Pending:"bg-amber-50 text-amber-700", Pendiente:"bg-amber-50 text-amber-700",
    Closed:"bg-stone-100 text-stone-500", Cerrado:"bg-stone-100 text-stone-500",
    "On Hold":"bg-orange-50 text-orange-600", "En Espera":"bg-orange-50 text-orange-600",
  };
  return m[s] || "bg-stone-50 text-stone-500";
};
const fmtSize = b => b < 1024 ? b+"B" : b < 1048576 ? (b/1024).toFixed(1)+"KB" : (b/1048576).toFixed(1)+"MB";

const Badge = ({label}) => <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${BADGE_COLORS[label]||"bg-stone-100 text-stone-500 ring-1 ring-stone-200"}`}>{label}</span>;
const Inp = p => <input className="border border-stone-200 rounded-lg px-3 py-2 text-sm w-full bg-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-shadow" {...p}/>;
const Sel = ({children,...p}) => <select className="border border-stone-200 rounded-lg px-3 py-2 text-sm w-full bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-shadow cursor-pointer" {...p}>{children}</select>;
const Btn = ({children,onClick,variant="primary",small,disabled}) => {
  const sz = small?"px-2.5 py-1 text-xs":"px-4 py-2 text-sm";
  const v = variant==="primary"?"bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-900 disabled:opacity-40 shadow-sm"
          : variant==="danger" ?"bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 shadow-sm"
          : "bg-white text-stone-600 hover:bg-stone-50 active:bg-stone-100 border border-stone-200 shadow-sm";
  return <button disabled={disabled} className={`rounded-lg font-medium transition-all ${sz} ${v}`} onClick={onClick}>{children}</button>;
};
const Modal = ({title,onClose,children}) => (
  <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl shadow-stone-400/20 w-full max-w-lg p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        <button onClick={onClose} className="text-stone-300 hover:text-stone-500 text-2xl leading-none font-light transition-colors">&times;</button>
      </div>
      {children}
    </div>
  </div>
);

function downloadCSV(filename,rows,cols){
  const h=cols.join(",");
  const b=rows.map(r=>cols.map(c=>`"${(r[c]??"").toString().replace(/"/g,'""')}"`).join(",")).join("\n");
  const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([h+"\n"+b],{type:"text/csv"})); a.download=filename; a.click();
}

// ── CASE DETAIL VIEW ──
// summarizeNote is defined in aiService.js (mock)

function generateCasePDF(c, caseDeadlines, docs, t) {
  const esc = s => (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const today = new Date().toLocaleDateString();

  const deadlineRows = caseDeadlines.length > 0
    ? caseDeadlines.sort((a,b)=>a.date.localeCompare(b.date)).map(d =>
        `<tr>
          <td>${esc(d.description)}</td>
          <td>${d.date}</td>
          <td>${esc(d.priority)}</td>
          <td>${d.done ? "✓ Done" : "Pending"}</td>
        </tr>`
      ).join("")
    : `<tr><td colspan="4" style="text-align:center;color:#999;font-style:italic;">No deadlines</td></tr>`;

  const docRows = docs.length > 0
    ? docs.map(d =>
        `<tr><td>${esc(d.name)}</td><td>${d.uploadedAt || "—"}</td></tr>`
      ).join("")
    : `<tr><td colspan="2" style="text-align:center;color:#999;font-style:italic;">No documents</td></tr>`;

  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/>
<title>Case Summary — ${esc(c.matter)}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #1b1815; line-height: 1.6; padding: 40px 50px; max-width: 800px; margin: 0 auto; }
  .header { border-bottom: 2px solid #302b26; padding-bottom: 16px; margin-bottom: 24px; }
  .header h1 { font-size: 22px; margin-bottom: 4px; }
  .header .sub { font-size: 12px; color: #685f54; letter-spacing: 0.08em; text-transform: uppercase; }
  .meta { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; margin-bottom: 28px; font-size: 14px; }
  .meta .label { color: #837a6e; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; }
  .meta .value { font-weight: 600; }
  h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; color: #685f54; margin: 28px 0 10px; border-bottom: 1px solid #e4ded5; padding-bottom: 6px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 8px; }
  th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #837a6e; padding: 6px 8px; border-bottom: 1px solid #d0c8bc; }
  td { padding: 6px 8px; border-bottom: 1px solid #f0ece5; }
  .notes { font-size: 14px; white-space: pre-wrap; background: #faf8f4; border: 1px solid #e4ded5; border-radius: 4px; padding: 12px 16px; margin-top: 4px; }
  .footer { margin-top: 36px; font-size: 11px; color: #a49b8f; text-align: center; border-top: 1px solid #e4ded5; padding-top: 12px; }
  @media print { body { padding: 20px 24px; } }
</style>
</head><body>
  <div class="header">
    <h1>${esc(c.matter)}</h1>
    <div class="sub">Case Summary Report · Generated ${today}</div>
  </div>

  <div class="meta">
    <div><div class="label">Client</div><div class="value">${esc(c.client)}</div></div>
    <div><div class="label">Attorney / Paralegal</div><div class="value">${esc(c.attorney)}</div></div>
    <div><div class="label">Practice Area</div><div class="value">${esc(c.area)}</div></div>
    <div><div class="label">Status</div><div class="value">${esc(c.status)}</div></div>
    <div><div class="label">Opened</div><div class="value">${c.opened || "—"}</div></div>
  </div>

  ${c.notes ? `<h2>Notes</h2><div class="notes">${esc(c.notes)}</div>` : ""}
  ${c.summary ? `<h2>Summary</h2><div class="notes">${esc(c.summary)}</div>` : ""}

  <h2>Deadlines (${caseDeadlines.length})</h2>
  <table>
    <thead><tr><th>Description</th><th>Due Date</th><th>Priority</th><th>Status</th></tr></thead>
    <tbody>${deadlineRows}</tbody>
  </table>

  <h2>Documents (${docs.length})</h2>
  <table>
    <thead><tr><th>File Name</th><th>Uploaded</th></tr></thead>
    <tbody>${docRows}</tbody>
  </table>

  <div class="footer">LegalTrack · ${esc(c.matter)} · ${today}</div>
</body></html>`;

  const w = window.open("", "_blank");
  if (!w) { alert("Please allow pop-ups to generate the PDF report."); return; }
  w.document.write(html);
  w.document.close();
  // small delay to let fonts/styles render before print dialog
  setTimeout(() => w.print(), 300);
}

function CaseDetail({ c, onBack, onUpdate, deadlines, setDeadlines, timeLogs, cases, t }) {
  const today = new Date().toISOString().slice(0,10);
  const caseDeadlines = (deadlines || []).filter(d => d.matter === c.matter);
  const overdueDeadlines = caseDeadlines.filter(d => !d.done && d.date < today);

  // Simplified insights: only actionable alerts
  const insights = [
    ...overdueDeadlines.map(d => `⚠ Overdue: "${d.description}" was due ${d.date}`),
    caseDeadlines.length === 0 && "No deadlines set — consider adding key dates.",
  ].filter(Boolean);

  const [summary, setSummary] = useState(c.summary || "");
  const [savedMsg, setSavedMsg] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  // Deadline form inside case detail
  const dlEmpty = { matter:c.matter, description:"", date:"", priority:t.priorities[0], done:false };
  const [showDlForm, setShowDlForm] = useState(false);
  const [dlForm, setDlForm] = useState(dlEmpty);

  const handleAiSummarize = async () => {
    if (!summary.trim()) return;
    setAiLoading(true); setAiError("");
    try {
      const result = await summarizeNote(summary);
      setAiSummary(result);
    } catch (err) {
      setAiError(err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const [docs, setDocs] = useState(c.documents || []);
  const fileRef = useRef();

  const saveSummary = () => {
    onUpdate({ ...c, summary });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const saveDl = () => {
    if (!dlForm.description || !dlForm.date) return;
    setDeadlines(p => [...p, { ...dlForm, id: Date.now() }]);
    setShowDlForm(false); setDlForm(dlEmpty);
  };

  const diff = d => Math.ceil((new Date(d)-new Date(today))/86400000);

  const handleFileUpload = e => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const doc = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toLocaleDateString(),
          dataUrl: ev.target.result,
        };
        setDocs(prev => {
          const updated = [...prev, doc];
          onUpdate({ ...c, summary, documents: updated });
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const delDoc = id => {
    if (!window.confirm(t.confirmDel)) return;
    setDocs(prev => {
      const updated = prev.filter(d => d.id !== id);
      onUpdate({ ...c, summary, documents: updated });
      return updated;
    });
  };

  const downloadDoc = doc => {
    const a = document.createElement("a");
    a.href = doc.dataUrl;
    a.download = doc.name;
    a.click();
  };

  const fileIcon = type => {
    if (type.includes("pdf")) return "📄";
    if (type.includes("image")) return "🖼️";
    if (type.includes("word") || type.includes("document")) return "📝";
    if (type.includes("sheet") || type.includes("excel")) return "📊";
    return "📎";
  };

  return (
    <div>
      <button onClick={onBack} className="text-slate-500 hover:text-slate-700 text-sm font-medium mb-5 flex items-center gap-1.5 transition-colors">{t.back}</button>

      {/* Header */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-8">
        <div className="flex flex-wrap gap-3 items-start justify-between">
          <div>
            <h2 className="text-xl font-bold font-serif text-slate-800">{c.matter}</h2>
            <p className="text-sm text-stone-400 mt-1.5">{c.client} · {c.area} · {c.attorney}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Btn variant="secondary" small onClick={() => generateCasePDF(c, caseDeadlines, docs, t)}>📄 PDF Report</Btn>
            <Badge label={c.status}/>
            <span className="text-xs text-stone-300">{t.opened}: {c.opened}</span>
          </div>
        </div>
        {c.notes && <p className="text-sm text-stone-400 mt-3 italic">"{c.notes}"</p>}
      </div>

      {/* Case Insights — only overdue + no-deadlines */}
      {insights.length > 0 && (
        <div className="bg-amber-50/50 border border-amber-200/50 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-amber-600 mb-3 text-xs uppercase tracking-widest">⚠ Case Insights</h3>
          <ul className="space-y-1.5">
            {insights.map((msg, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-amber-700">
                <span className="text-amber-300">•</span>{msg}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Deadlines for this case */}
      <div className="bg-white border border-stone-200/60 rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-stone-500 text-xs uppercase tracking-widest">📅 {t.deadlines}</h3>
          <Btn small onClick={() => setShowDlForm(true)}>{t.addDeadline}</Btn>
        </div>
        {caseDeadlines.length === 0
          ? <div className="text-stone-300 text-sm italic py-6 text-center border-2 border-dashed border-stone-100 rounded-xl">No deadlines yet — add your first deadline for this case.</div>
          : <div className="space-y-2">
              {[...caseDeadlines].sort((a,b)=>a.date.localeCompare(b.date)).map(d => {
                const dv = diff(d.date), overdue = dv<0&&!d.done, soon = dv>=0&&dv<=7&&!d.done;
                return (
                  <div key={d.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${d.done?"bg-stone-50 opacity-60 border-stone-100":overdue?"bg-rose-50/50 border-rose-200/50":soon?"bg-amber-50/50 border-amber-200/50":"bg-white border-stone-200/60"}`}>
                    <input type="checkbox" checked={d.done} onChange={()=>setDeadlines(p=>p.map(x=>x.id===d.id?{...x,done:!x.done}:x))} className="w-4 h-4"/>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm ${d.done?"line-through text-stone-400":"text-slate-700"}`}>{d.description}</div>
                    </div>
                    <Badge label={d.priority}/>
                    <div className="text-right min-w-fit">
                      <div className="text-sm text-slate-600">{d.date}</div>
                      <div className={`text-xs ${overdue?"text-rose-500 font-bold":soon?"text-amber-500 font-semibold":"text-stone-400"}`}>
                        {d.done?t.done:overdue?Math.abs(dv)+t.overdue:dv===0?t.today:dv+t.left}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
        }
        {showDlForm && (
          <div className="mt-4 p-4 border border-stone-100 rounded-xl bg-stone-50/50">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2"><label className="text-xs text-stone-400 mb-1 block font-medium">{t.description}</label><Inp value={dlForm.description} onChange={e=>setDlForm(f=>({...f,description:e.target.value}))} placeholder="e.g. File motion to compel"/></div>
              <div><label className="text-xs text-stone-400 mb-1 block font-medium">{t.dueDate}</label><Inp type="date" value={dlForm.date} onChange={e=>setDlForm(f=>({...f,date:e.target.value}))}/></div>
              <div><label className="text-xs text-stone-400 mb-1 block font-medium">{t.priority}</label>
                <Sel value={dlForm.priority} onChange={e=>setDlForm(f=>({...f,priority:e.target.value}))}>{t.priorities.map(p=><option key={p}>{p}</option>)}</Sel>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-3">
              <Btn variant="secondary" small onClick={()=>setShowDlForm(false)}>{t.cancel}</Btn>
              <Btn small onClick={saveDl}>{t.saveDeadline}</Btn>
            </div>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-white border border-stone-200/60 rounded-2xl p-6 mb-8">
        <h3 className="font-semibold text-stone-500 mb-4 text-xs uppercase tracking-widest">📋 {t.summary}</h3>
        <textarea
          className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 resize-none bg-stone-50/50 placeholder-stone-300 transition-shadow"
          rows={6}
          placeholder={t.summaryPH}
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <div className="flex flex-wrap gap-2 mt-3">
          <Btn variant="secondary" small onClick={handleAiSummarize} disabled={aiLoading}>
            {aiLoading ? "⏳ Summarizing..." : "✨ Summarize"}
          </Btn>
          <div className="ml-auto flex items-center gap-3">
            {savedMsg && <span className="text-green-600 text-sm font-medium">{t.summarySaved}</span>}
            <Btn onClick={saveSummary}>{t.saveSummary}</Btn>
          </div>
        </div>

        {aiSummary && (
          <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-700">
            <span className="font-semibold text-xs uppercase tracking-widest text-slate-400 block mb-1.5">✨ AI Summary</span>
            {aiSummary}
          </div>
        )}
        {aiError && (
          <div className="mt-4 p-4 bg-rose-50/50 border border-rose-200/50 rounded-xl text-sm text-rose-600">
            ⚠ AI error: {aiError}
          </div>
        )}
      </div>

      {/* Documents */}
      <div className="bg-white border border-stone-200/60 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-stone-500 text-xs uppercase tracking-widest">📁 {t.documents}</h3>
          <div>
            <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFileUpload} />
            <Btn onClick={() => fileRef.current.click()}>{t.uploadDoc}</Btn>
          </div>
        </div>

        {docs.length === 0
          ? <div className="text-stone-300 text-sm italic py-8 text-center border-2 border-dashed border-stone-100 rounded-xl">{t.noDocuments}</div>
          : <div className="space-y-2">
              {docs.map(doc => (
                <div key={doc.id} className="flex items-center gap-3 p-3.5 border border-stone-100 rounded-xl hover:bg-stone-50/50 transition-colors">
                  <span className="text-2xl">{fileIcon(doc.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-700 truncate">{doc.name}</div>
                    <div className="text-xs text-stone-400">{t.uploadedOn}: {doc.uploadedAt} · {t.fileSize}: {fmtSize(doc.size)}</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Btn small variant="secondary" onClick={() => downloadDoc(doc)}>{t.download}</Btn>
                    <Btn small variant="danger" onClick={() => delDoc(doc.id)}>✕</Btn>
                  </div>
                </div>
              ))}
            </div>
        }
      </div>
    </div>
  );
}

// ── CASES TAB ──
function CasesTab({ cases, setCases, deadlines, setDeadlines, timeLogs, t }) {
  const [showForm, setShowForm] = useState(false);
  const [editingCase, setEditingCase] = useState(null); // null = new, object = editing
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCase, setSelectedCase] = useState(null);
  const empty = { matter:"", client:"", area:t.areas[0], attorney:"", status:t.statuses[0], opened:new Date().toISOString().slice(0,10), notes:"", summary:"", documents:[] };
  const [form, setForm] = useState(empty);

  // sync selectedCase when cases update
  useEffect(() => {
    if (selectedCase) setSelectedCase(cases.find(c => c.id === selectedCase.id) || null);
  }, [cases]);

  const filtered = cases.filter(c =>
    (filterStatus === "all" || c.status === filterStatus) &&
    (c.matter.toLowerCase().includes(search.toLowerCase()) || c.client.toLowerCase().includes(search.toLowerCase()))
  );

  const openNew = () => { setEditingCase(null); setForm(empty); setShowForm(true); };
  const openEdit = (c) => { setEditingCase(c); setForm({...c}); setShowForm(true); };

  const save = () => {
    if (!form.matter || !form.client) return;
    if (editingCase) {
      // Update existing case, preserve summary and documents
      setCases(p => p.map(c => c.id === editingCase.id ? { ...c, matter:form.matter, client:form.client, attorney:form.attorney, area:form.area, status:form.status, opened:form.opened, notes:form.notes } : c));
    } else {
      setCases(p => [...p, { ...form, id: Date.now() }]);
    }
    setShowForm(false); setForm(empty); setEditingCase(null);
  };

  const quickStatus = (id, newStatus) => {
    setCases(p => p.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const updateCase = updated => setCases(p => p.map(c => c.id === updated.id ? updated : c));

  if (selectedCase) return <CaseDetail c={selectedCase} onBack={() => setSelectedCase(null)} onUpdate={updateCase} deadlines={deadlines} setDeadlines={setDeadlines} timeLogs={timeLogs} cases={cases} t={t}/>;

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <Inp placeholder={t.searchPH} value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:240}}/>
        <Sel value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{maxWidth:160}}>
          <option value="all">{t.allStatus}</option>
          {t.statuses.map(s=><option key={s} value={s}>{s}</option>)}
        </Sel>
        <div className="ml-auto flex gap-2">
          <Btn variant="secondary" onClick={()=>downloadCSV("cases.csv",cases,["matter","client","area","attorney","status","opened","notes"])}>{t.exportCSV}</Btn>
          <Btn onClick={openNew}>{t.newMatter}</Btn>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-stone-400 border-b border-stone-100">
            {[t.matterName,t.client,t.area,t.attorney,t.status,t.opened,""].map(h=>(
              <th key={h} className="px-3 py-3 font-medium text-xs uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.length===0 && <tr><td colSpan={7} className="text-center py-12 text-stone-300 italic">{cases.length===0?"No matters yet — create your first case to get started.":t.noMattersFound}</td></tr>}
            {filtered.map(c=>(
              <tr key={c.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                <td className="px-3 py-3">
                  <button onClick={()=>setSelectedCase(c)} className="font-medium text-slate-700 hover:text-slate-900 hover:underline underline-offset-2 text-left">{c.matter}</button>
                  {c.documents?.length>0 && <span className="ml-2 text-xs bg-stone-100 text-stone-400 px-1.5 py-0.5 rounded-full">📎 {c.documents.length}</span>}
                </td>
                <td className="px-3 py-3 text-stone-600">{c.client}</td>
                <td className="px-3 py-3 text-stone-500">{c.area}</td>
                <td className="px-3 py-3 text-stone-500">{c.attorney}</td>
                <td className="px-3 py-3">
                  <select value={c.status} onChange={e=>quickStatus(c.id, e.target.value)}
                    className={`text-xs font-medium rounded-full px-2.5 py-0.5 border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-300 ${statusBg(c.status)}`}>
                    {t.statuses.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-3 py-3 whitespace-nowrap text-stone-400 font-num">{c.opened}</td>
                <td className="px-3 py-3">
                  <div className="flex gap-1">
                    <Btn variant="secondary" small onClick={()=>openEdit(c)}>✎</Btn>
                    <Btn variant="danger" small onClick={()=>setCases(p=>p.filter(x=>x.id!==c.id))}>✕</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <Modal title={editingCase ? "Edit Matter" : t.newMatterTitle} onClose={()=>{setShowForm(false);setEditingCase(null);}}>
          <div className="grid grid-cols-2 gap-4">
            {[[t.matterName,"matter"],[t.client,"client"],[t.attorney,"attorney"],[t.opened,"opened","date"]].map(([label,key,type])=>(
              <div key={key}><label className="text-xs text-stone-400 mb-1.5 block font-medium">{label}</label><Inp type={type||"text"} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}/></div>
            ))}
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.area}</label>
              <Sel value={form.area} onChange={e=>setForm(f=>({...f,area:e.target.value}))}>{t.areas.map(a=><option key={a}>{a}</option>)}</Sel>
            </div>
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.status}</label>
              <Sel value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{t.statuses.map(s=><option key={s}>{s}</option>)}</Sel>
            </div>
            <div className="col-span-2"><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.notes}</label><Inp value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/></div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Btn variant="secondary" onClick={()=>{setShowForm(false);setEditingCase(null);}}>{t.cancel}</Btn>
            <Btn onClick={save}>{editingCase ? t.save : t.saveMatter}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── TIME LOG TAB ──
function TimeLogTab({ timeLogs, setTimeLogs, cases, t }) {
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null); // null = new, object = editing
  const [filterAttorney, setFilterAttorney] = useState("all");
  const empty = { date:new Date().toISOString().slice(0,10), matter:"", attorney:"", task:"", hours:"", rate:"", billed:false };
  const [form, setForm] = useState(empty);

  const attorneys = [...new Set(timeLogs.map(l=>l.attorney).filter(Boolean))].sort();
  const filtered = filterAttorney === "all" ? timeLogs : timeLogs.filter(l=>l.attorney===filterAttorney);

  const totalHours = filtered.reduce((s,l)=>s+l.hours,0);
  const totalValue = filtered.reduce((s,l)=>s+l.hours*l.rate,0);
  const unbilled   = filtered.filter(l=>!l.billed).reduce((s,l)=>s+l.hours*l.rate,0);

  const openNew = () => { setEditingEntry(null); setForm(empty); setShowForm(true); };
  const openEdit = (l) => { setEditingEntry(l); setForm({...l, hours:String(l.hours), rate:String(l.rate)}); setShowForm(true); };

  const save = () => {
    if (!form.matter||!form.hours) return;
    if (editingEntry) {
      setTimeLogs(p=>p.map(x=>x.id===editingEntry.id ? {...x, date:form.date, matter:form.matter, attorney:form.attorney, task:form.task, hours:parseFloat(form.hours), rate:parseFloat(form.rate)||0, billed:form.billed} : x));
    } else {
      setTimeLogs(p=>[...p,{...form,id:Date.now(),hours:parseFloat(form.hours),rate:parseFloat(form.rate)||0}]);
    }
    setShowForm(false); setForm(empty); setEditingEntry(null);
  };
  const closeForm = () => { setShowForm(false); setEditingEntry(null); };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {[[t.totalHrs,totalHours.toFixed(1)+" hrs"],[t.unbilledVal,"$"+fmt(totalValue)],["Unbilled","$"+fmt(unbilled)]].map(([label,val])=>(
          <div key={label} className="bg-stone-50 border border-stone-100 rounded-2xl p-5 text-center">
            <div className="text-xs text-stone-400 font-medium uppercase tracking-wider mb-2">{label}</div>
            <div className="text-2xl font-bold font-num text-slate-800">{val}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 mb-4 items-center">
        <Sel value={filterAttorney} onChange={e=>setFilterAttorney(e.target.value)} style={{maxWidth:220}}>
          <option value="all">{t.allStatus} {t.attorney}</option>
          {attorneys.map(a=><option key={a} value={a}>{a}</option>)}
        </Sel>
        <div className="ml-auto flex gap-2">
          <Btn variant="secondary" onClick={()=>downloadCSV("timelog.csv",filtered,["date","matter","attorney","task","hours","rate","billed"])}>{t.exportCSV}</Btn>
          <Btn onClick={openNew}>{t.logTime}</Btn>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-left text-stone-400 border-b border-stone-100">
            {[t.date,t.matter,t.attorney,t.task,t.hours,t.rate,t.value,t.billed,""].map(h=>(
              <th key={h} className="px-3 py-3 font-medium text-xs uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.length===0&&<tr><td colSpan={9} className="text-center py-12 text-stone-300 italic">{timeLogs.length===0?"No time entries yet — log your first entry.":t.noEntries}</td></tr>}
            {filtered.map(l=>(
              <tr key={l.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                <td className="px-3 py-3 whitespace-nowrap text-stone-500 font-num">{l.date}</td>
                <td className="px-3 py-3 text-slate-700 font-medium">{l.matter}</td>
                <td className="px-3 py-3 text-stone-500">{l.attorney}</td>
                <td className="px-3 py-3 text-stone-600 min-w-0">{l.task}</td>
                <td className="px-3 py-3 text-stone-600 font-num num">{l.hours}</td>
                <td className="px-3 py-3 text-stone-400 font-num num whitespace-nowrap">${l.rate}/hr</td>
                <td className="px-3 py-3 font-semibold text-slate-700 font-num num whitespace-nowrap">${fmt(l.hours*l.rate)}</td>
                <td className="px-3 py-3">
                  <button onClick={()=>{
                    const action = l.billed ? `mark as ${t.unbilled.toLowerCase()}` : `mark as ${t.billed.toLowerCase()}`;
                    if (!window.confirm(`Are you sure you want to ${action} this entry?`)) return;
                    setTimeLogs(p=>p.map(x=>x.id===l.id?{...x,billed:!x.billed}:x));
                  }}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${l.billed?"bg-teal-50 text-teal-700 ring-1 ring-teal-200":"bg-amber-50 text-amber-700 ring-1 ring-amber-200"}`}>
                    {l.billed?"✓ "+t.billed:t.unbilled}
                  </button>
                </td>
                <td className="px-3 py-3">
                  <div className="flex gap-1">
                    <Btn variant="secondary" small onClick={()=>openEdit(l)}>✎</Btn>
                    <Btn variant="danger" small onClick={()=>setTimeLogs(p=>p.filter(x=>x.id!==l.id))}>✕</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm&&(
        <Modal title={editingEntry ? "Edit Time Entry" : t.logTimeTitle} onClose={closeForm}>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.date}</label><Inp type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div>
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.matter}</label>
              <Sel value={form.matter} onChange={e=>setForm(f=>({...f,matter:e.target.value}))}>
                <option value="">Select...</option>{cases.map(c=><option key={c.id}>{c.matter}</option>)}
              </Sel>
            </div>
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.attorney}</label><Inp value={form.attorney} onChange={e=>setForm(f=>({...f,attorney:e.target.value}))}/></div>
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.task}</label><Inp value={form.task} onChange={e=>setForm(f=>({...f,task:e.target.value}))}/></div>
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.hours}</label><Inp type="number" step="0.25" value={form.hours} onChange={e=>setForm(f=>({...f,hours:e.target.value}))}/></div>
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.rate}</label><Inp type="number" value={form.rate} onChange={e=>setForm(f=>({...f,rate:e.target.value}))}/></div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Btn variant="secondary" onClick={closeForm}>{t.cancel}</Btn>
            <Btn onClick={save}>{editingEntry ? t.save : t.saveEntry}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── DEADLINES TAB ──
function DeadlinesTab({ deadlines, setDeadlines, cases, t }) {
  const [showForm, setShowForm] = useState(false);
  const [dlView, setDlView] = useState("current"); // "current" or "completed"
  const empty = { matter:"", description:"", date:"", priority:t.priorities[0], done:false };
  const [form, setForm] = useState(empty);
  const today = new Date().toISOString().slice(0,10);
  const diff = d => Math.ceil((new Date(d)-new Date(today))/86400000);
  const save = () => {
    if (!form.matter||!form.date||!form.description) return;
    setDeadlines(p=>[...p,{...form,id:Date.now()}]);
    setShowForm(false); setForm(empty);
  };

  const currentDL = deadlines.filter(d => !d.done);
  const doneDL = deadlines.filter(d => d.done);

  const renderItem = d => {
    const dv=diff(d.date), overdue=dv<0&&!d.done, soon=dv>=0&&dv<=7&&!d.done;
    const statusLabel = d.done ? t.done : overdue ? Math.abs(dv)+t.overdue : dv===0 ? t.today : dv+t.left;
    return (
      <div key={d.id} className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border transition-colors ${d.done?"bg-stone-50 border-stone-100":overdue?"bg-rose-50/50 border-rose-200/50":soon?"bg-amber-50/50 border-amber-200/50":"bg-white border-stone-200/60"}`}>
        <input type="checkbox" checked={d.done} onChange={()=>setDeadlines(p=>p.map(x=>x.id===d.id?{...x,done:!x.done}:x))} className="w-4 h-4 accent-slate-700 cursor-pointer shrink-0"/>
        <div className="flex-1 min-w-0">
          <div className={`font-medium text-sm ${d.done?"line-through text-stone-400":"text-slate-700"}`}>{d.description}</div>
          <div className="text-xs text-stone-400 mt-0.5">{d.matter}</div>
        </div>
        <Badge label={d.priority}/>
        <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0.5 ml-0 sm:ml-4 min-w-[120px]">
          <div className="text-[10px] text-stone-400 uppercase tracking-wider font-medium">{t.dueDate}</div>
          <div className="text-sm font-semibold font-num text-slate-600">{d.date}</div>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0.5 min-w-[80px]">
          <div className="text-[10px] text-stone-400 uppercase tracking-wider font-medium">{t.status}</div>
          <div className={`text-xs font-semibold font-num ${overdue?"text-rose-500":soon?"text-amber-500":d.done?"text-stone-400":"text-stone-400"}`}>
            {statusLabel}
          </div>
        </div>
        <Btn variant="danger" small onClick={()=>setDeadlines(p=>p.filter(x=>x.id!==d.id))}>✕</Btn>
      </div>
    );
  };

  const activeList = dlView === "current" ? currentDL : doneDL;
  const sorted = dlView === "current"
    ? [...activeList].sort((a,b)=>a.date.localeCompare(b.date))
    : [...activeList].sort((a,b)=>b.date.localeCompare(a.date));

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Toggle tabs */}
        <div className="flex bg-stone-100/60 rounded-lg p-1 gap-0.5">
          <button onClick={()=>setDlView("current")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${dlView==="current"?"bg-white text-slate-800 shadow-sm":"text-stone-400 hover:text-stone-600"}`}>
            {t.currentDL} <span className="font-num ml-1 text-xs">({currentDL.length})</span>
          </button>
          <button onClick={()=>setDlView("completed")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${dlView==="completed"?"bg-white text-slate-800 shadow-sm":"text-stone-400 hover:text-stone-600"}`}>
            {t.completedDL} <span className="font-num ml-1 text-xs">({doneDL.length})</span>
          </button>
        </div>
        <div className="ml-auto flex gap-2">
          <Btn variant="secondary" onClick={()=>downloadCSV("deadlines.csv",deadlines,["matter","description","date","priority","done"])}>{t.exportCSV}</Btn>
          <Btn onClick={()=>setShowForm(true)}>{t.addDeadline}</Btn>
        </div>
      </div>

      {sorted.length === 0
        ? <div className="text-stone-300 text-sm italic py-12 text-center border-2 border-dashed border-stone-100 rounded-xl">
            {dlView === "current" ? "No active deadlines — add your first deadline to stay on track." : "No completed deadlines yet."}
          </div>
        : <div className="space-y-2.5">{sorted.map(renderItem)}</div>
      }
      {showForm&&(
        <Modal title={t.addDLTitle} onClose={()=>setShowForm(false)}>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.matter}</label>
              <Sel value={form.matter} onChange={e=>setForm(f=>({...f,matter:e.target.value}))}>
                <option value="">Select...</option>{cases.map(c=><option key={c.id}>{c.matter}</option>)}
              </Sel>
            </div>
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.dueDate}</label><Inp type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div>
            <div className="col-span-2"><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.description}</label><Inp value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="e.g. File motion to compel"/></div>
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.priority}</label>
              <Sel value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}>{t.priorities.map(p=><option key={p}>{p}</option>)}</Sel>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Btn variant="secondary" onClick={()=>setShowForm(false)}>{t.cancel}</Btn>
            <Btn onClick={save}>{t.saveDeadline}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── DASHBOARD ──
function DashboardTab({ cases, timeLogs, deadlines, t }) {
  const today = new Date().toISOString().slice(0,10);
  const active   = cases.filter(c=>c.status===t.statuses[0]).length;
  const totalHrs = timeLogs.reduce((s,l)=>s+l.hours,0);
  const unbilled = timeLogs.filter(l=>!l.billed).reduce((s,l)=>s+l.hours*l.rate,0);
  const overdue  = deadlines.filter(d=>!d.done&&d.date<today);
  const upcoming = deadlines.filter(d=>!d.done&&d.date>=today).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,6);
  const byArea   = cases.reduce((acc,c)=>({...acc,[c.area]:(acc[c.area]||0)+1}),{});
  const dlClass = p => p==="High"||p==="Alta"||p==="Haute"?"dl-high":p==="Medium"||p==="Media"||p==="Moyenne"?"dl-medium":p==="Low"||p==="Baja"||p==="Basse"?"dl-low":"dl-default";

  return (
    <div className="space-y-10">
      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        {[
          [t.activeMatt, active,   "text-slate-800", "bg-white border-stone-200/60"],
          [t.totalHrs,   totalHrs.toFixed(1), "text-slate-800", "bg-white border-stone-200/60"],
          [t.unbilledVal, "$"+fmt(unbilled), "text-slate-800", "bg-white border-stone-200/60"],
          [t.overdueItems, overdue.length, overdue.length>0?"text-rose-600":"text-slate-800", overdue.length>0?"bg-rose-50/80 border-rose-200/60":"bg-white border-stone-200/60"],
        ].map(([label,val,tc,bg])=>(
          <div key={label} className={`${bg} border rounded-2xl p-6 text-center card-hover`}>
            <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-3">{label}</div>
            <div className={`text-4xl font-bold font-num stat-value ${tc}`}>{val}</div>
          </div>
        ))}
      </div>

      {/* ── Deadlines + Sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Upcoming Deadlines (takes 3/5 width) */}
        <div className="lg:col-span-3 bg-white border border-stone-200/60 rounded-2xl shadow-sm shadow-stone-200/30 overflow-hidden">
          <div className="px-6 pt-6 pb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">{t.upcomingDL}</h3>
              <p className="text-xs text-stone-400 mt-0.5"><span className="font-num">{upcoming.length}</span> upcoming · <span className="font-num">{overdue.length}</span> overdue</p>
            </div>
          </div>
          <div className="px-6 pb-6">
            {upcoming.length===0 && <div className="text-stone-300 text-sm italic py-6 text-center">{t.noDL}</div>}
            <div className="space-y-2">
              {upcoming.map(d=>{
                const dv=Math.ceil((new Date(d.date)-new Date(today))/86400000);
                return (
                  <div key={d.id} className={`dl-indicator ${dlClass(d.priority)} flex items-center gap-4 py-3 px-4 rounded-xl bg-stone-50/40 hover:bg-stone-50`}>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-slate-700">{d.description}</div>
                      <div className="text-xs text-stone-400 mt-0.5">{d.matter}</div>
                    </div>
                    <Badge label={d.priority}/>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium font-num text-slate-600">{d.date}</div>
                      <div className={`text-xs font-semibold font-num ${dv<=3?"text-rose-500":dv<=7?"text-amber-500":"text-stone-400"}`}>
                        {dv===0?t.today:dv+"d "+t.left.replace("d ","")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: By Area + Overdue/All caught up (takes 2/5 width) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white border border-stone-200/60 rounded-2xl p-6 shadow-sm shadow-stone-200/30 card-hover flex-1">
            <h3 className="font-semibold text-stone-500 mb-5 text-xs uppercase tracking-widest">{t.byArea}</h3>
            {Object.keys(byArea).length===0&&<div className="text-stone-300 text-sm italic py-4 text-center">{t.noMatters}</div>}
            <div className="space-y-3.5">
              {Object.entries(byArea).sort((a,b)=>b[1]-a[1]).map(([area,count])=>(
                <div key={area} className="flex items-center gap-3">
                  <div className="text-sm text-slate-600 w-28 shrink-0">{area}</div>
                  <div className="flex-1 bg-stone-100 rounded-full h-2"><div className="bg-slate-500 h-2 rounded-full transition-all" style={{width:`${(count/cases.length)*100}%`}}/></div>
                  <div className="text-xs font-bold text-stone-500 w-5 text-right">{count}</div>
                </div>
              ))}
            </div>
          </div>

          {overdue.length>0 ? (
            <div className="bg-rose-50/70 border border-rose-200/60 rounded-2xl p-6 card-hover">
              <h3 className="font-semibold text-rose-600 mb-4 text-xs uppercase tracking-widest">{t.overdueHdr}</h3>
              <div className="space-y-2.5">
                {overdue.map(d=>(
                  <div key={d.id} className="flex justify-between items-center text-sm bg-white/60 rounded-lg px-3 py-2.5">
                    <div>
                      <span className="font-semibold text-rose-800">{d.description}</span>
                      <span className="text-rose-400 ml-2 text-xs">— {d.matter}</span>
                    </div>
                    <span className="text-rose-500 font-bold text-xs whitespace-nowrap">{d.date}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50/50 border border-emerald-200/40 rounded-2xl p-6 flex flex-col items-center justify-center card-hover">
              <div className="text-3xl mb-2">✓</div>
              <div className="text-sm font-medium text-emerald-700">All caught up</div>
              <div className="text-xs text-emerald-500 mt-1">No overdue items</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──
function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lt_lang") || "en");
  const t = T[lang];
  const [tab, setTab] = useState(0);

  const load = (key, fb) => { try { const v=localStorage.getItem(key); return v?JSON.parse(v):fb; } catch { return fb; } };
  const INIT_CASES = [
    {id:1,matter:"Smith v. Jones",client:"John Smith",area:"Litigation",attorney:"A. Rivera",status:"Active",opened:"2026-01-15",notes:"Discovery phase",summary:"",documents:[]},
    {id:2,matter:"Acme Corp Acquisition",client:"Acme Corp",area:"Corporate",attorney:"B. Chen",status:"Active",opened:"2026-02-01",notes:"Due diligence ongoing",summary:"",documents:[]},
  ];
  const INIT_LOGS = [
    {id:1,date:"2026-04-08",matter:"Smith v. Jones",attorney:"A. Rivera",task:"Deposition prep",hours:2.5,rate:350,billed:false},
    {id:2,date:"2026-04-09",matter:"Acme Corp Acquisition",attorney:"B. Chen",task:"Contract review",hours:3.0,rate:400,billed:true},
  ];
  const INIT_DL = [
    {id:1,matter:"Smith v. Jones",description:"Discovery cutoff",date:"2026-04-25",priority:"High",done:false},
    {id:2,matter:"Acme Corp Acquisition",description:"LOI signing deadline",date:"2026-04-18",priority:"High",done:false},
    {id:3,matter:"Smith v. Jones",description:"File motion to compel",date:"2026-05-10",priority:"Medium",done:false},
  ];

  const [cases,     setCasesRaw]    = useState(()=>load("lt_cases",    INIT_CASES));
  const [timeLogs,  setTimeLogsRaw] = useState(()=>load("lt_timeLogs", INIT_LOGS));
  const [deadlines, setDeadlinesRaw]= useState(()=>load("lt_deadlines",INIT_DL));

  const persist = (key, setter) => v => {
    setter(v);
    const val = typeof v==="function" ? v(key==="lt_cases"?cases:key==="lt_timeLogs"?timeLogs:deadlines) : v;
    localStorage.setItem(key, JSON.stringify(val));
  };
  const setCases     = persist("lt_cases",     setCasesRaw);
  const setTimeLogs  = persist("lt_timeLogs",  setTimeLogsRaw);
  const setDeadlines = persist("lt_deadlines", setDeadlinesRaw);

  const LANGS = [
    { code:"en", flag:"🇺🇸", label:"EN" },
    { code:"es", flag:"🇪🇸", label:"ES" },
  ];

  const switchLang = (code) => {
    setLang(code); localStorage.setItem("lt_lang", code);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200/60 px-4 sm:px-8 py-4 flex items-center gap-3 sm:gap-5">
        <div className="font-serif text-slate-800 text-lg sm:text-xl tracking-tight shrink-0">⚖ {t.appName}</div>
        <div className="w-px h-6 bg-stone-200/80 hidden sm:block"></div>
        <div className="text-stone-400 text-xs font-medium uppercase tracking-widest hidden md:block">{t.appSub}</div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <Btn small onClick={()=>setTab(1)}>{t.newMatter}</Btn>
          <select value={lang} onChange={e=>switchLang(e.target.value)}
            className="border border-stone-200 rounded-lg px-2.5 py-1.5 text-sm font-medium text-stone-500 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-slate-300 cursor-pointer transition-shadow">
            {LANGS.map(l=><option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
          </select>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        <div className="flex gap-1 mb-8 bg-stone-100/60 rounded-xl p-1.5 w-fit flex-wrap">
          {t.tabs.map((label,i)=>(
            <button key={i} onClick={()=>setTab(i)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${tab===i?"bg-white text-slate-800 shadow-sm shadow-stone-200/60":"text-stone-400 hover:text-stone-600"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-stone-200/60 p-4 sm:p-8 shadow-sm shadow-stone-200/40">
          {tab===0 && <DashboardTab cases={cases} timeLogs={timeLogs} deadlines={deadlines} t={t}/>}
          {tab===1 && <CasesTab cases={cases} setCases={setCases} deadlines={deadlines} setDeadlines={setDeadlines} timeLogs={timeLogs} t={t}/>}
          {tab===2 && <TimeLogTab timeLogs={timeLogs} setTimeLogs={setTimeLogs} cases={cases} t={t}/>}
          {tab===3 && <DeadlinesTab deadlines={deadlines} setDeadlines={setDeadlines} cases={cases} t={t}/>}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
