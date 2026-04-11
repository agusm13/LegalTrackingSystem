const { useState, useRef, useEffect } = React;

const T = {
  en: {
    appName:"LegalTrack", appSub:"Legal Productivity System",
    tabs:["Dashboard","Cases","Time Log","Deadlines","Calendar"],
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
    checklist:"Checklist", addTask:"+ Add Task", noTasks:"No tasks yet.", taskPH:"New task...",
    calendar:"Calendar", calFilterAll:"All Matters", calFilterPriority:"All Priorities",
    attachDocs:"Attach Documents", optionalDocs:"Optional — you can also add documents later.",
    deleted:"Deleted", restore:"Restore", confirmDeleteCase:"Are you sure you want to delete this matter?",
    confirmDeleteEntry:"Are you sure you want to delete this time entry?", confirmDeleteDL:"Are you sure you want to delete this deadline?",
    confirmDeleteTask:"Are you sure you want to delete this task?", noDeleted:"No deleted items.", deletedOn:"Deleted",
    details:"Details", detailsPH:"Add notes, context, or instructions for this deadline...", editDeadline:"Edit Deadline", saveChanges:"Save Changes",
    areas:["Litigation","Corporate","Family","Criminal","Real Estate","IP","Employment","Other"],
    statuses:["Active","Pending","Closed","On Hold"],
    priorities:["High","Medium","Low"],
  },
  es: {
    appName:"LegalTrack", appSub:"Sistema de Productividad Legal",
    tabs:["Panel","Casos","Registro de Tiempo","Plazos","Calendario"],
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
    checklist:"Lista de Tareas", addTask:"+ Agregar Tarea", noTasks:"Sin tareas aún.", taskPH:"Nueva tarea...",
    calendar:"Calendario", calFilterAll:"Todos los Casos", calFilterPriority:"Todas las Prioridades",
    attachDocs:"Adjuntar Documentos", optionalDocs:"Opcional — también puedes agregar documentos después.",
    deleted:"Eliminados", restore:"Restaurar", confirmDeleteCase:"¿Seguro que quieres eliminar este caso?",
    confirmDeleteEntry:"¿Seguro que quieres eliminar este registro?", confirmDeleteDL:"¿Seguro que quieres eliminar este plazo?",
    confirmDeleteTask:"¿Seguro que quieres eliminar esta tarea?", noDeleted:"Sin elementos eliminados.", deletedOn:"Eliminado",
    details:"Detalles", detailsPH:"Agrega notas, contexto o instrucciones para este plazo...", editDeadline:"Editar Plazo", saveChanges:"Guardar Cambios",
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
const Inp = p => <input className="border border-stone-200/80 rounded-lg px-3 py-2 text-sm w-full bg-white text-slate-800 placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-shadow shadow-btn" {...p}/>;
const Sel = ({children,...p}) => <select className="border border-stone-200/80 rounded-lg pr-8 pl-3 py-2 text-sm w-full bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-shadow shadow-btn cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23a8a29e%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.375rem_center] bg-no-repeat" {...p}>{children}</select>;

function MultiSelect({ options, selected, onChange, placeholder, style }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const toggle = val => {
    onChange(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val]);
  };
  const label = selected.length === 0 ? placeholder : selected.length === 1 ? selected[0] : `${selected.length} selected`;
  return (
    <div ref={ref} className="relative" style={style}>
      <button type="button" onClick={() => setOpen(!open)}
        className="border border-stone-200/80 rounded-lg pr-8 pl-3 py-2 text-sm w-full bg-white text-left truncate focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-shadow shadow-btn cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%23a8a29e%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.375rem_center] bg-no-repeat"
      >
        <span className={selected.length === 0 ? "text-stone-400" : "text-slate-700"}>{label}</span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-stone-200/60 rounded-lg shadow-dropdown max-h-48 overflow-y-auto">
          {selected.length > 0 && (
            <button type="button" onClick={() => onChange([])} className="w-full text-left px-3 py-1.5 text-xs text-stone-400 hover:bg-stone-50 border-b border-stone-100">Clear all</button>
          )}
          {options.map(opt => (
            <label key={opt} className="flex items-center gap-2 px-3 py-1.5 hover:bg-stone-50 cursor-pointer text-sm text-slate-700">
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} className="w-3.5 h-3.5 accent-slate-700"/>
              <span className="truncate">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

const Btn = ({children,onClick,variant="primary",small,disabled}) => {
  const sz = small?"px-2.5 py-1 text-xs":"px-4 py-2 text-sm";
  const v = variant==="primary"?"bg-slate-800 text-white hover:bg-slate-700 active:bg-slate-900 disabled:opacity-40 shadow-btn hover:shadow-btn-hover"
          : variant==="danger" ?"bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 shadow-btn hover:shadow-btn-hover"
          : "bg-white text-stone-600 hover:bg-stone-50 active:bg-stone-100 border border-stone-200 shadow-btn hover:shadow-btn-hover";
  return <button disabled={disabled} className={`rounded-lg font-medium transition-all ${sz} ${v}`} onClick={onClick}>{children}</button>;
};
const Modal = ({title,onClose,children}) => (
  <div className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-surface-lg w-full max-w-lg p-8 border border-stone-200/40">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
        <button onClick={onClose} className="text-stone-300 hover:text-stone-500 text-2xl leading-none font-light transition-colors">&times;</button>
      </div>
      {children}
    </div>
  </div>
);

function DeadlineDetailModal({ deadline, onClose, onSave, t }) {
  const [form, setForm] = useState({ ...deadline });
  const today = new Date().toISOString().slice(0,10);
  const dv = Math.ceil((new Date(form.date)-new Date(today))/86400000);
  const overdue = dv<0&&!form.done, soon = dv>=0&&dv<=7&&!form.done;

  const handleSave = () => {
    if (!form.description || !form.date) return;
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl shadow-stone-400/20 w-full max-w-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-800">📅 {t.editDeadline}</h2>
          <button onClick={onClose} className="text-stone-300 hover:text-stone-500 text-2xl leading-none font-light transition-colors">&times;</button>
        </div>

        {/* Status indicator */}
        <div className={`mb-5 px-4 py-2.5 rounded-xl text-sm font-medium ${form.done?"bg-stone-50 text-stone-500":overdue?"bg-rose-50 text-rose-600":soon?"bg-amber-50 text-amber-600":"bg-emerald-50 text-emerald-600"}`}>
          {form.done ? "✓ " + t.done : overdue ? "⚠ " + Math.abs(dv) + t.overdue : dv===0 ? "📌 " + t.today : "📅 " + dv + t.left}
          <span className="text-xs opacity-60 ml-2">— {form.matter}</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.description}</label>
            <Inp value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="e.g. File motion to compel"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.dueDate}</label>
              <Inp type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/>
            </div>
            <div>
              <label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.priority}</label>
              <Sel value={form.priority} onChange={e=>setForm(f=>({...f,priority:e.target.value}))}>{t.priorities.map(p=><option key={p}>{p}</option>)}</Sel>
            </div>
          </div>
          <div>
            <label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.details}</label>
            <textarea value={form.details||""} onChange={e=>setForm(f=>({...f,details:e.target.value}))}
              placeholder={t.detailsPH} rows={4}
              className="border border-stone-200 rounded-lg px-3 py-2 text-sm w-full bg-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-shadow"/>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={form.done} onChange={()=>setForm(f=>({...f,done:!f.done}))} className="w-4 h-4 accent-slate-700 cursor-pointer"/>
            <span className="text-sm text-slate-600">{t.done}</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Btn variant="secondary" onClick={onClose}>{t.cancel}</Btn>
          <Btn onClick={handleSave}>{t.saveChanges}</Btn>
        </div>
      </div>
    </div>
  );
}

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
  const [selectedDL, setSelectedDL] = useState(null);

  // Checklist
  const [checklist, setChecklist] = useState(c.checklist || []);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    const updated = [...checklist, { id: Date.now(), text: newTask.trim(), done: false }];
    setChecklist(updated);
    onUpdate({ ...c, checklist: updated });
    setNewTask("");
  };

  const toggleTask = id => {
    const updated = checklist.map(t => t.id === id ? { ...t, done: !t.done } : t);
    setChecklist(updated);
    onUpdate({ ...c, checklist: updated });
  };

  const deleteTask = id => {
    if (!window.confirm(t.confirmDeleteTask)) return;
    const updated = checklist.filter(t => t.id !== id);
    setChecklist(updated);
    onUpdate({ ...c, checklist: updated });
  };

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

      {/* Deadlines + Checklist side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Deadlines for this case */}
        <div className="bg-white border border-stone-200/60 rounded-2xl p-6">
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
                    <div key={d.id} onClick={()=>setSelectedDL(d)} className={`cursor-pointer flex items-center gap-3 p-3 rounded-xl border transition-colors hover:shadow-md ${d.done?"bg-stone-50 opacity-60 border-stone-100":overdue?"bg-rose-50/50 border-rose-200/50":soon?"bg-amber-50/50 border-amber-200/50":"bg-white border-stone-200/60"}`}>
                      <input type="checkbox" checked={d.done} onChange={e=>{e.stopPropagation();setDeadlines(p=>p.map(x=>x.id===d.id?{...x,done:!x.done}:x));}} className="w-4 h-4"/>
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-sm hover:underline ${d.done?"line-through text-stone-400":"text-slate-700"}`}>{d.description}</div>
                        {d.details && <div className="text-xs text-stone-400 mt-0.5 line-clamp-1 italic">{d.details}</div>}
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

        {/* Checklist */}
        <div className="bg-white border border-stone-200/60 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-stone-500 text-xs uppercase tracking-widest">☑ {t.checklist}</h3>
            <span className="text-xs text-stone-300 font-num">{checklist.filter(t=>t.done).length}/{checklist.length}</span>
          </div>
          {checklist.length === 0 && !newTask
            ? <div className="text-stone-300 text-sm italic py-4 text-center border-2 border-dashed border-stone-100 rounded-xl">{t.noTasks}</div>
            : <div className="space-y-1.5">
                {checklist.map(task => (
                  <div key={task.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-stone-50/50 transition-colors group">
                    <input type="checkbox" checked={task.done} onChange={()=>toggleTask(task.id)} className="w-4 h-4 accent-slate-700 cursor-pointer"/>
                    <span className={`flex-1 text-sm ${task.done?"line-through text-stone-400":"text-slate-700"}`}>{task.text}</span>
                    <button onClick={()=>deleteTask(task.id)} className="text-stone-200 hover:text-rose-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                  </div>
                ))}
              </div>
          }
          <div className="flex gap-2 mt-3">
            <Inp value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder={t.taskPH} onKeyDown={e=>e.key==="Enter"&&addTask()}/>
            <Btn small onClick={addTask}>{t.addTask}</Btn>
          </div>
        </div>
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
      {selectedDL && <DeadlineDetailModal deadline={selectedDL} onClose={()=>setSelectedDL(null)} onSave={updated=>setDeadlines(p=>p.map(x=>x.id===updated.id?updated:x))} t={t}/>}
    </div>
  );
}

// ── CASES TAB ──
function CasesTab({ cases, setCases, deadlines, setDeadlines, timeLogs, deletedCases, setDeletedCases, t }) {
  const [showForm, setShowForm] = useState(false);
  const [editingCase, setEditingCase] = useState(null); // null = new, object = editing
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCase, setSelectedCase] = useState(null);
  const [viewMode, setViewMode] = useState("active"); // "active" or "deleted"
  const empty = { matter:"", client:"", area:t.areas[0], attorney:"", status:t.statuses[0], opened:new Date().toISOString().slice(0,10), notes:"", summary:"", documents:[], checklist:[] };
  const [form, setForm] = useState(empty);
  const [pendingDocs, setPendingDocs] = useState([]);
  const modalFileRef = useRef();

  // sync selectedCase when cases update
  useEffect(() => {
    if (selectedCase) setSelectedCase(cases.find(c => c.id === selectedCase.id) || null);
  }, [cases]);

  const filtered = cases.filter(c =>
    (filterStatus === "all" || c.status === filterStatus) &&
    (c.matter.toLowerCase().includes(search.toLowerCase()) || c.client.toLowerCase().includes(search.toLowerCase()))
  );

  const openNew = () => { setEditingCase(null); setForm(empty); setPendingDocs([]); setShowForm(true); };
  const openEdit = (c) => { setEditingCase(c); setForm({...c}); setPendingDocs([]); setShowForm(true); };

  const handleModalFileUpload = e => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setPendingDocs(prev => [...prev, {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toLocaleDateString(),
          dataUrl: ev.target.result,
        }]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const save = () => {
    if (!form.matter || !form.client) return;
    if (editingCase) {
      // Update existing case, preserve summary and documents
      const existingDocs = editingCase.documents || [];
      setCases(p => p.map(c => c.id === editingCase.id ? { ...c, matter:form.matter, client:form.client, attorney:form.attorney, area:form.area, status:form.status, opened:form.opened, notes:form.notes, documents:[...existingDocs, ...pendingDocs] } : c));
    } else {
      setCases(p => [...p, { ...form, id: Date.now(), documents: pendingDocs }]);
    }
    setShowForm(false); setForm(empty); setEditingCase(null); setPendingDocs([]);
  };

  const quickStatus = (id, newStatus) => {
    setCases(p => p.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const softDeleteCase = (c) => {
    if (!window.confirm(t.confirmDeleteCase)) return;
    setCases(p => p.filter(x => x.id !== c.id));
    setDeletedCases(p => [...p, { ...c, deletedAt: new Date().toLocaleDateString() }]);
  };

  const restoreCase = (c) => {
    setDeletedCases(p => p.filter(x => x.id !== c.id));
    const { deletedAt, ...restored } = c;
    setCases(p => [...p, restored]);
  };

  const updateCase = updated => setCases(p => p.map(c => c.id === updated.id ? updated : c));

  if (selectedCase) return <CaseDetail c={selectedCase} onBack={() => setSelectedCase(null)} onUpdate={updateCase} deadlines={deadlines} setDeadlines={setDeadlines} timeLogs={timeLogs} cases={cases} t={t}/>;

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <div className="flex bg-stone-100/60 rounded-lg p-1 gap-0.5">
          <button onClick={()=>setViewMode("active")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode==="active"?"bg-white text-slate-800 shadow-sm":"text-stone-400 hover:text-stone-600"}`}>
            {t.cases}
          </button>
          <button onClick={()=>setViewMode("deleted")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode==="deleted"?"bg-white text-slate-800 shadow-sm":"text-stone-400 hover:text-stone-600"}`}>
            {t.deleted} {deletedCases.length > 0 && <span className="ml-1 text-xs font-num">({deletedCases.length})</span>}
          </button>
        </div>
        {viewMode==="active" && <>
        <Inp placeholder={t.searchPH} value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:240}}/>
        <Sel value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{maxWidth:160}}>
          <option value="all">{t.allStatus}</option>
          {t.statuses.map(s=><option key={s} value={s}>{s}</option>)}
        </Sel>
        <div className="ml-auto flex gap-2">
          <Btn variant="secondary" onClick={()=>downloadCSV("cases.csv",cases,["matter","client","area","attorney","status","opened","notes"])}>{t.exportCSV}</Btn>
          <Btn onClick={openNew}>{t.newMatter}</Btn>
        </div>
        </>}
      </div>

      {viewMode === "active" ? (<>
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
                    <Btn variant="danger" small onClick={()=>softDeleteCase(c)}>✕</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <Modal title={editingCase ? "Edit Matter" : t.newMatterTitle} onClose={()=>{setShowForm(false);setEditingCase(null);setPendingDocs([]);}}>
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
          {/* Document upload in modal */}
          <div className="mt-4 pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-stone-400 font-medium">{t.attachDocs}</label>
              <div>
                <input ref={modalFileRef} type="file" multiple className="hidden" onChange={handleModalFileUpload}/>
                <Btn variant="secondary" small onClick={()=>modalFileRef.current.click()}>📎 {t.uploadDoc}</Btn>
              </div>
            </div>
            <p className="text-[11px] text-stone-300 mb-2">{t.optionalDocs}</p>
            {pendingDocs.length > 0 && (
              <div className="space-y-1.5">
                {pendingDocs.map(doc => (
                  <div key={doc.id} className="flex items-center gap-2 text-sm bg-stone-50 rounded-lg px-3 py-2">
                    <span className="text-stone-400">📎</span>
                    <span className="flex-1 text-slate-600 truncate">{doc.name}</span>
                    <span className="text-xs text-stone-300">{fmtSize(doc.size)}</span>
                    <button onClick={()=>setPendingDocs(p=>p.filter(d=>d.id!==doc.id))} className="text-stone-300 hover:text-rose-400 text-sm">✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Btn variant="secondary" onClick={()=>{setShowForm(false);setEditingCase(null);setPendingDocs([]);}}>{t.cancel}</Btn>
            <Btn onClick={save}>{editingCase ? t.save : t.saveMatter}</Btn>
          </div>
        </Modal>
      )}
      </>) : (
        /* Deleted Cases View */
        <div>
          {deletedCases.length === 0
            ? <div className="text-stone-300 text-sm italic py-12 text-center border-2 border-dashed border-stone-100 rounded-xl">{t.noDeleted}</div>
            : <div className="space-y-2">
                {deletedCases.map(c => (
                  <div key={c.id} className="flex items-center gap-4 p-4 rounded-xl border border-stone-100 bg-stone-50/50">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-stone-500">{c.matter}</div>
                      <div className="text-xs text-stone-400">{c.client} · {c.area} · {t.deletedOn}: {c.deletedAt}</div>
                    </div>
                    <Badge label={c.status}/>
                    <Btn variant="secondary" small onClick={()=>restoreCase(c)}>{t.restore}</Btn>
                  </div>
                ))}
              </div>
          }
        </div>
      )}
    </div>
  );
}

// ── TIME LOG TAB ──
function TimeLogTab({ timeLogs, setTimeLogs, cases, deletedTimeLogs, setDeletedTimeLogs, t }) {
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [filterAttorney, setFilterAttorney] = useState("all");
  const [viewMode, setViewMode] = useState("active");
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

  const softDeleteEntry = (l) => {
    if (!window.confirm(t.confirmDeleteEntry)) return;
    setTimeLogs(p => p.filter(x => x.id !== l.id));
    setDeletedTimeLogs(p => [...p, { ...l, deletedAt: new Date().toLocaleDateString() }]);
  };

  const restoreEntry = (l) => {
    setDeletedTimeLogs(p => p.filter(x => x.id !== l.id));
    const { deletedAt, ...restored } = l;
    setTimeLogs(p => [...p, restored]);
  };

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
        <div className="flex bg-stone-100/60 rounded-lg p-1 gap-0.5">
          <button onClick={()=>setViewMode("active")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode==="active"?"bg-white text-slate-800 shadow-sm":"text-stone-400 hover:text-stone-600"}`}>
            {t.timeLog}
          </button>
          <button onClick={()=>setViewMode("deleted")} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode==="deleted"?"bg-white text-slate-800 shadow-sm":"text-stone-400 hover:text-stone-600"}`}>
            {t.deleted} {deletedTimeLogs.length > 0 && <span className="ml-1 text-xs font-num">({deletedTimeLogs.length})</span>}
          </button>
        </div>
        {viewMode==="active" && <>
        <Sel value={filterAttorney} onChange={e=>setFilterAttorney(e.target.value)} style={{maxWidth:220}}>
          <option value="all">{t.allStatus} {t.attorney}</option>
          {attorneys.map(a=><option key={a} value={a}>{a}</option>)}
        </Sel>
        <div className="ml-auto flex gap-2">
          <Btn variant="secondary" onClick={()=>downloadCSV("timelog.csv",filtered,["date","matter","attorney","task","hours","rate","billed"])}>{t.exportCSV}</Btn>
          <Btn onClick={openNew}>{t.logTime}</Btn>
        </div>
        </>}
      </div>

      {viewMode === "active" ? (<>
      <div className="overflow-x-auto">
        <table className="w-full text-sm table-fixed">
          <colgroup>
            <col style={{width:'100px'}}/>
            <col style={{width:'22%'}}/>
            <col style={{width:'12%'}}/>
            <col/>
            <col style={{width:'65px'}}/>
            <col style={{width:'85px'}}/>
            <col style={{width:'90px'}}/>
            <col style={{width:'95px'}}/>
            <col style={{width:'80px'}}/>
          </colgroup>
          <thead><tr className="text-left text-stone-400 border-b border-stone-100">
            {[t.date,t.matter,t.attorney,t.task,t.hours,t.rate,t.value,t.billed,""].map(h=>(
              <th key={h} className="px-4 py-3 font-medium text-xs uppercase tracking-wider">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.length===0&&<tr><td colSpan={9} className="text-center py-12 text-stone-300 italic">{timeLogs.length===0?"No time entries yet — log your first entry.":t.noEntries}</td></tr>}
            {filtered.map(l=>(
              <tr key={l.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                <td className="px-4 py-3.5 whitespace-nowrap text-stone-400 font-semibold font-num">{l.date}</td>
                <td className="px-4 py-3.5 text-slate-800 font-bold truncate">{l.matter}</td>
                <td className="px-4 py-3.5 text-stone-500 truncate">{l.attorney}</td>
                <td className="px-4 py-3.5 text-stone-600">{l.task}</td>
                <td className="px-4 py-3.5 text-stone-600 font-num num">{l.hours}</td>
                <td className="px-4 py-3.5 text-stone-400 font-num num whitespace-nowrap">${l.rate}/hr</td>
                <td className="px-4 py-3.5 font-semibold text-slate-700 font-num num whitespace-nowrap">${fmt(l.hours*l.rate)}</td>
                <td className="px-4 py-3.5">
                  <button onClick={()=>{
                    const action = l.billed ? `mark as ${t.unbilled.toLowerCase()}` : `mark as ${t.billed.toLowerCase()}`;
                    if (!window.confirm(`Are you sure you want to ${action} this entry?`)) return;
                    setTimeLogs(p=>p.map(x=>x.id===l.id?{...x,billed:!x.billed}:x));
                  }}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${l.billed?"bg-teal-50 text-teal-700 ring-1 ring-teal-200":"bg-amber-50 text-amber-700 ring-1 ring-amber-200"}`}>
                    {l.billed?"✓ "+t.billed:t.unbilled}
                  </button>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex gap-1">
                    <Btn variant="secondary" small onClick={()=>openEdit(l)}>✎</Btn>
                    <Btn variant="danger" small onClick={()=>softDeleteEntry(l)}>✕</Btn>
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
      </>) : (
        /* Deleted Time Entries View */
        <div>
          {deletedTimeLogs.length === 0
            ? <div className="text-stone-300 text-sm italic py-12 text-center border-2 border-dashed border-stone-100 rounded-xl">{t.noDeleted}</div>
            : <div className="space-y-2">
                {deletedTimeLogs.map(l => (
                  <div key={l.id} className="flex items-center gap-4 p-4 rounded-xl border border-stone-100 bg-stone-50/50">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-stone-500">{l.matter} — {l.task}</div>
                      <div className="text-xs text-stone-400">{l.date} · {l.hours}hrs · ${fmt(l.hours*l.rate)} · {t.deletedOn}: {l.deletedAt}</div>
                    </div>
                    <Btn variant="secondary" small onClick={()=>restoreEntry(l)}>{t.restore}</Btn>
                  </div>
                ))}
              </div>
          }
        </div>
      )}
    </div>
  );
}

// ── DEADLINES TAB ──
function DeadlinesTab({ deadlines, setDeadlines, cases, deletedDeadlines, setDeletedDeadlines, t }) {
  const [showForm, setShowForm] = useState(false);
  const [dlView, setDlView] = useState("current"); // "current", "completed", or "deleted"
  const [selectedDL, setSelectedDL] = useState(null);
  const empty = { matter:"", description:"", date:"", priority:t.priorities[0], done:false };
  const [form, setForm] = useState(empty);
  const today = new Date().toISOString().slice(0,10);
  const diff = d => Math.ceil((new Date(d)-new Date(today))/86400000);
  const save = () => {
    if (!form.matter||!form.date||!form.description) return;
    setDeadlines(p=>[...p,{...form,id:Date.now()}]);
    setShowForm(false); setForm(empty);
  };

  const softDeleteDL = (d) => {
    if (!window.confirm(t.confirmDeleteDL)) return;
    setDeadlines(p => p.filter(x => x.id !== d.id));
    setDeletedDeadlines(p => [...p, { ...d, deletedAt: new Date().toLocaleDateString() }]);
  };

  const restoreDL = (d) => {
    setDeletedDeadlines(p => p.filter(x => x.id !== d.id));
    const { deletedAt, ...restored } = d;
    setDeadlines(p => [...p, restored]);
  };

  const currentDL = deadlines.filter(d => !d.done);
  const doneDL = deadlines.filter(d => d.done);

  const saveDLEdit = (updated) => {
    setDeadlines(p => p.map(x => x.id === updated.id ? updated : x));
  };

  const renderItem = d => {
    const dv=diff(d.date), overdue=dv<0&&!d.done, soon=dv>=0&&dv<=7&&!d.done;
    const statusLabel = d.done ? t.done : overdue ? Math.abs(dv)+t.overdue : dv===0 ? t.today : dv+t.left;
    return (
      <div key={d.id} onClick={()=>setSelectedDL(d)} className={`cursor-pointer flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl border transition-colors hover:shadow-md ${d.done?"bg-stone-50 border-stone-100":overdue?"bg-rose-50/50 border-rose-200/50":soon?"bg-amber-50/50 border-amber-200/50":"bg-white border-stone-200/60"}`}>
        <input type="checkbox" checked={d.done} onChange={e=>{e.stopPropagation();setDeadlines(p=>p.map(x=>x.id===d.id?{...x,done:!x.done}:x));}} className="w-4 h-4 accent-slate-700 cursor-pointer shrink-0"/>
        <div className="flex-1 min-w-0">
          <div className={`font-medium text-sm hover:underline ${d.done?"line-through text-stone-400":"text-slate-700"}`}>{d.description}</div>
          <div className="text-xs text-stone-400 mt-0.5">{d.matter}</div>
          {d.details && <div className="text-xs text-stone-400 mt-1 line-clamp-1 italic">{d.details}</div>}
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
        <Btn variant="danger" small onClick={e=>{e.stopPropagation();softDeleteDL(d);}}>✕</Btn>
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
          <button onClick={()=>setDlView("deleted")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${dlView==="deleted"?"bg-white text-slate-800 shadow-sm":"text-stone-400 hover:text-stone-600"}`}>
            {t.deleted} {deletedDeadlines.length > 0 && <span className="font-num ml-1 text-xs">({deletedDeadlines.length})</span>}
          </button>
        </div>
        {dlView!=="deleted" && <div className="ml-auto flex gap-2">
          <Btn variant="secondary" onClick={()=>downloadCSV("deadlines.csv",deadlines,["matter","description","date","priority","done"])}>{t.exportCSV}</Btn>
          <Btn onClick={()=>setShowForm(true)}>{t.addDeadline}</Btn>
        </div>}
      </div>

      {dlView === "deleted" ? (
        <div>
          {deletedDeadlines.length === 0
            ? <div className="text-stone-300 text-sm italic py-12 text-center border-2 border-dashed border-stone-100 rounded-xl">{t.noDeleted}</div>
            : <div className="space-y-2">
                {deletedDeadlines.map(d => (
                  <div key={d.id} className="flex items-center gap-4 p-4 rounded-xl border border-stone-100 bg-stone-50/50">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-stone-500">{d.description}</div>
                      <div className="text-xs text-stone-400">{d.matter} · {d.date} · {t.deletedOn}: {d.deletedAt}</div>
                    </div>
                    <Badge label={d.priority}/>
                    <Btn variant="secondary" small onClick={()=>restoreDL(d)}>{t.restore}</Btn>
                  </div>
                ))}
              </div>
          }
        </div>
      ) : sorted.length === 0
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
      {selectedDL && <DeadlineDetailModal deadline={selectedDL} onClose={()=>setSelectedDL(null)} onSave={saveDLEdit} t={t}/>}
    </div>
  );
}
function DashboardTab({ cases, timeLogs, deadlines, setDeadlines, t }) {
  const [selectedDL, setSelectedDL] = useState(null);
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
          [t.activeMatt, active,   "text-slate-800", "bg-white border-stone-200/40"],
          [t.totalHrs,   totalHrs.toFixed(1), "text-slate-800", "bg-white border-stone-200/40"],
          [t.unbilledVal, "$"+fmt(unbilled), "text-slate-800", "bg-white border-stone-200/40"],
          [t.overdueItems, overdue.length, overdue.length>0?"text-rose-600":"text-slate-800", overdue.length>0?"bg-rose-50/60 border-rose-200/40":"bg-white border-stone-200/40"],
        ].map(([label,val,tc,bg])=>(
          <div key={label} className={`${bg} border rounded-2xl p-6 text-center card-hover shadow-surface`}>
            <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-widest mb-3">{label}</div>
            <div className={`text-4xl font-bold font-num stat-value ${tc}`}>{val}</div>
          </div>
        ))}
      </div>

      {/* ── Deadlines + Sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Upcoming Deadlines (takes 3/5 width) */}
        <div className="lg:col-span-3 bg-white border border-stone-200/40 rounded-2xl shadow-surface overflow-hidden">
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
                  <div key={d.id} onClick={()=>setSelectedDL(d)} className={`cursor-pointer dl-indicator ${dlClass(d.priority)} flex items-center gap-4 py-3 px-4 rounded-xl bg-stone-50/40 hover:bg-stone-100/60 hover:shadow-sm transition-all`}>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-slate-700 hover:underline">{d.description}</div>
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
          <div className="bg-white border border-stone-200/40 rounded-2xl p-6 shadow-surface card-hover flex-1">
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
            <div className="bg-rose-50/50 border border-rose-200/40 rounded-2xl p-6 shadow-surface card-hover">
              <h3 className="font-semibold text-rose-600 mb-4 text-xs uppercase tracking-widest">{t.overdueHdr}</h3>
              <div className="space-y-2.5">
                {overdue.map(d=>(
                  <div key={d.id} onClick={()=>setSelectedDL(d)} className="cursor-pointer flex justify-between items-center text-sm bg-white/60 rounded-lg px-3 py-2.5 hover:bg-white/80 hover:shadow-sm transition-all">
                    <div>
                      <span className="font-semibold text-rose-800 hover:underline">{d.description}</span>
                      <span className="text-rose-400 ml-2 text-xs">— {d.matter}</span>
                    </div>
                    <span className="text-rose-500 font-bold text-xs whitespace-nowrap">{d.date}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50/40 border border-emerald-200/40 rounded-2xl p-6 flex flex-col items-center justify-center shadow-surface card-hover">
              <div className="text-3xl mb-2">✓</div>
              <div className="text-sm font-medium text-emerald-700">All caught up</div>
              <div className="text-xs text-emerald-500 mt-1">No overdue items</div>
            </div>
          )}
        </div>
      </div>
      {selectedDL && <DeadlineDetailModal deadline={selectedDL} onClose={()=>setSelectedDL(null)} onSave={updated=>setDeadlines(p=>p.map(x=>x.id===updated.id?updated:x))} t={t}/>}
    </div>
  );
}
function CalendarTab({ deadlines, setDeadlines, cases, t }) {
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);
  const [selectedDL, setSelectedDL] = useState(null);
  const [calMode, setCalMode] = useState("month"); // "month" or "week"
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  // weekStart = Sunday of the current week
  const getWeekStart = d => { const s = new Date(d); s.setDate(s.getDate() - s.getDay()); return s; };
  const [weekStart, setWeekStart] = useState(() => getWeekStart(today));
  const [filterMatter, setFilterMatter] = useState([]);
  const [filterPriority, setFilterPriority] = useState([]);
  const [filterArea, setFilterArea] = useState([]);
  // Add deadline form
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ matter:"", description:"", date:"", priority:t.priorities[0], done:false });

  // Mini-calendar sidebar state
  const [sideMonth, setSideMonth] = useState(weekStart.getMonth());
  const [sideYear, setSideYear] = useState(weekStart.getFullYear());

  // Navigation
  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };
  const prevWeek = () => setWeekStart(s => { const d = new Date(s); d.setDate(d.getDate() - 7); return d; });
  const nextWeek = () => setWeekStart(s => { const d = new Date(s); d.setDate(d.getDate() + 7); return d; });
  const goToday = () => {
    setViewMonth(today.getMonth()); setViewYear(today.getFullYear());
    setWeekStart(getWeekStart(today));
    setSideMonth(today.getMonth()); setSideYear(today.getFullYear());
  };

  useEffect(() => { setSideMonth(weekStart.getMonth()); setSideYear(weekStart.getFullYear()); }, [weekStart]);

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const dayNamesShort = ["S","M","T","W","T","F","S"];

  // Filter deadlines
  const filtered = deadlines.filter(d => {
    if (filterMatter.length > 0 && !filterMatter.includes(d.matter)) return false;
    if (filterPriority.length > 0 && !filterPriority.includes(d.priority)) return false;
    if (filterArea.length > 0) {
      const caseObj = cases.find(c => c.matter === d.matter);
      if (!caseObj || !filterArea.includes(caseObj.area)) return false;
    }
    return true;
  });

  const getDeadlinesForDate = dateStr => filtered.filter(d => d.date === dateStr);

  // Priority helpers
  const priorityDot = p => {
    if (p==="High"||p==="Alta") return "bg-rose-400";
    if (p==="Medium"||p==="Media") return "bg-amber-400";
    return "bg-sky-400";
  };
  const priorityBorder = p => {
    if (p==="High"||p==="Alta") return "border-l-rose-400";
    if (p==="Medium"||p==="Media") return "border-l-amber-400";
    return "border-l-sky-300";
  };
  const priorityLabel = p => {
    if (p==="High"||p==="Alta") return {text:p, cls:"text-rose-600 bg-rose-50"};
    if (p==="Medium"||p==="Media") return {text:p, cls:"text-amber-600 bg-amber-50"};
    return {text:p, cls:"text-sky-600 bg-sky-50"};
  };

  // Month grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const weeks = [];
  let week = new Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) { while (week.length < 7) week.push(null); weeks.push(week); }

  // Week dates array (7 days starting from weekStart)
  const weekDates = Array.from({length:7}, (_,i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const fmtDate = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;

  // Week header label
  const weekLabel = (() => {
    const s = weekDates[0], e = weekDates[6];
    if (s.getMonth() === e.getMonth()) return `${monthNames[s.getMonth()]} ${s.getDate()}–${e.getDate()}, ${s.getFullYear()}`;
    if (s.getFullYear() === e.getFullYear()) return `${monthNames[s.getMonth()].slice(0,3)} ${s.getDate()} – ${monthNames[e.getMonth()].slice(0,3)} ${e.getDate()}, ${s.getFullYear()}`;
    return `${monthNames[s.getMonth()].slice(0,3)} ${s.getDate()}, ${s.getFullYear()} – ${monthNames[e.getMonth()].slice(0,3)} ${e.getDate()}, ${e.getFullYear()}`;
  })();

  const matters = [...new Set(deadlines.map(d=>d.matter))].sort();
  const areas = [...new Set(cases.map(c=>c.area))].sort();

  // ── Mini calendar for sidebar ──
  const sideFirstDay = new Date(sideYear, sideMonth, 1).getDay();
  const sideDaysInMonth = new Date(sideYear, sideMonth + 1, 0).getDate();
  const sideWeeks = [];
  let sw = new Array(sideFirstDay).fill(null);
  for (let d = 1; d <= sideDaysInMonth; d++) { sw.push(d); if (sw.length === 7) { sideWeeks.push(sw); sw = []; } }
  if (sw.length > 0) { while (sw.length < 7) sw.push(null); sideWeeks.push(sw); }

  const navigateToDay = day => { if (!day) return; setWeekStart(getWeekStart(new Date(sideYear, sideMonth, day))); };
  const isInCurrentWeek = day => {
    if (!day) return false;
    const ds = `${sideYear}-${String(sideMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    return ds >= fmtDate(weekDates[0]) && ds <= fmtDate(weekDates[6]);
  };
  const sidebarDateCount = day => {
    if (!day) return 0;
    return filtered.filter(d => d.date === `${sideYear}-${String(sideMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`).length;
  };

  // Click empty date
  const handleEmptyDateClick = dateStr => {
    setAddForm({ matter:"", description:"", date:dateStr, priority:t.priorities[0], done:false });
    setShowAddForm(true);
  };
  const saveNewDL = () => {
    if (!addForm.matter || !addForm.description || !addForm.date) return;
    setDeadlines(p => [...p, { ...addForm, id: Date.now() }]);
    setShowAddForm(false);
  };

  // Render a single deadline item (shared between month and week)
  const renderDLItem = (d, compact) => {
    const isOverdue = d.date < todayStr && !d.done;
    if (compact) {
      return (
        <div key={d.id} onClick={e=>{e.stopPropagation();setSelectedDL(d);}}
          className={`cursor-pointer text-[10px] leading-tight px-1.5 py-0.5 rounded truncate border-l-2 transition-all hover:ring-1 hover:ring-slate-300 ${priorityBorder(d.priority)} ${d.done?"line-through text-stone-300 bg-stone-50":isOverdue?"text-rose-700 bg-rose-50/60":"text-slate-600 bg-stone-50/80"}`}
          title={`${d.description} — ${d.matter}`}>
          <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${priorityDot(d.priority)}`}></span>
          {isOverdue && !d.done && <span className="mr-0.5">!</span>}
          {d.description}
        </div>
      );
    }
    // Expanded (week view) — improved cards
    const pl = priorityLabel(d.priority);
    return (
      <div key={d.id} onClick={e=>{e.stopPropagation();setSelectedDL(d);}}
        className={`cal-deadline-card cursor-pointer rounded-lg border-l-[3px] transition-all hover:shadow-md ${priorityBorder(d.priority)} ${d.done?"opacity-60 bg-stone-50 border border-stone-100":isOverdue?"bg-rose-50/40 border border-rose-100":"bg-white border border-stone-100 hover:border-stone-200"}`}>
        <div className="px-3 py-2.5">
          <div className={`text-[13px] leading-snug font-semibold mb-1 ${d.done?"line-through text-stone-400":isOverdue?"text-rose-800":"text-slate-800"}`}>{d.description}</div>
          <div className={`text-[11px] leading-relaxed mb-2 ${d.done?"text-stone-300":"text-stone-400"}`}>{d.matter}</div>
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${pl.cls}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${priorityDot(d.priority)}`}></span>
              {pl.text}
            </span>
            {isOverdue && <span className="text-[10px] font-semibold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-full">Overdue</span>}
            {d.done && <span className="text-[10px] font-medium text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded-full">✓ Done</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Header row */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {/* Mode toggle */}
        <div className="flex bg-stone-100/60 rounded-lg p-0.5 gap-0.5">
          <button onClick={()=>setCalMode("month")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${calMode==="month"?"bg-white text-slate-800 shadow-sm":"text-stone-500 hover:text-stone-700"}`}>Month</button>
          <button onClick={()=>setCalMode("week")} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${calMode==="week"?"bg-white text-slate-800 shadow-sm":"text-stone-500 hover:text-stone-700"}`}>Week</button>
        </div>

        {/* Nav */}
        <div className="flex items-center gap-2">
          <button onClick={calMode==="month"?prevMonth:prevWeek} className="w-7 h-7 rounded-lg border border-stone-200 text-stone-400 hover:text-stone-600 hover:bg-stone-50 flex items-center justify-center transition-colors text-sm">‹</button>
          <h3 className="text-base font-semibold text-slate-800 min-w-[200px] text-center font-num">
            {calMode === "month" ? `${monthNames[viewMonth]} ${viewYear}` : weekLabel}
          </h3>
          <button onClick={calMode==="month"?nextMonth:nextWeek} className="w-7 h-7 rounded-lg border border-stone-200 text-stone-400 hover:text-stone-600 hover:bg-stone-50 flex items-center justify-center transition-colors text-sm">›</button>
          <Btn variant="secondary" small onClick={goToday}>{t.today.replace("!","")}</Btn>
        </div>

        {/* Filters — month view only (week view uses sidebar) */}
        {calMode === "month" && (
          <div className="ml-auto flex flex-wrap gap-2">
            <MultiSelect options={areas} selected={filterArea} onChange={setFilterArea} placeholder={t.area} style={{minWidth:140}}/>
            <MultiSelect options={matters} selected={filterMatter} onChange={setFilterMatter} placeholder={t.calFilterAll} style={{minWidth:170}}/>
            <MultiSelect options={t.priorities} selected={filterPriority} onChange={setFilterPriority} placeholder={t.calFilterPriority} style={{minWidth:130}}/>
          </div>
        )}
      </div>

      {/* ── MONTH VIEW ── */}
      {calMode === "month" && (
        <div className="border border-stone-200/40 rounded-2xl overflow-hidden shadow-surface">
          <div className="grid grid-cols-7 bg-stone-50 border-b border-stone-200/40">
            {dayNames.map(d => (
              <div key={d} className="text-center text-[10px] font-semibold text-stone-400 uppercase tracking-wider py-2.5">{d}</div>
            ))}
          </div>
          {weeks.map((wk, wi) => (
            <div key={wi} className="grid grid-cols-7 border-b border-stone-100 last:border-b-0">
              {wk.map((day, di) => {
                const dateStr = day ? `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}` : "";
                const dayDL = day ? getDeadlinesForDate(dateStr) : [];
                const isToday = dateStr === todayStr;
                const isPast = dateStr && dateStr < todayStr;
                return (
                  <div key={di}
                    onClick={()=>day && dayDL.length===0 && handleEmptyDateClick(dateStr)}
                    className={`min-h-[88px] p-1.5 border-r border-stone-100 last:border-r-0 transition-colors ${!day?"bg-stone-50/30":isToday?"bg-amber-50/40 ring-1 ring-inset ring-amber-200/60":dayDL.length===0&&day?"cursor-pointer hover:bg-stone-50/60":""}`}>
                    {day && (
                      <>
                        <div className={`text-[11px] font-medium mb-1 text-right px-0.5 ${isToday?"text-amber-600 font-bold":isPast?"text-stone-300":"text-stone-500"}`}>
                          <span className={`font-num ${isToday?"bg-amber-500 text-white rounded-full w-5 h-5 inline-flex items-center justify-center text-[10px]":""}`}>{day}</span>
                        </div>
                        <div className="space-y-0.5">
                          {dayDL.slice(0,3).map(d => renderDLItem(d, true))}
                          {dayDL.length > 3 && <div className="text-[10px] text-stone-400 px-1.5">+{dayDL.length - 3} more</div>}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {/* ── WEEK VIEW with sidebar ── */}
      {calMode === "week" && (
        <div className="flex gap-5">
          {/* ── Left sidebar ── */}
          <div className="w-56 shrink-0 space-y-4">
            {/* Mini calendar */}
            <div className="bg-white border border-stone-200/40 rounded-xl p-3 shadow-surface">
              <div className="flex items-center justify-between mb-2">
                <button onClick={()=>{ if(sideMonth===0){setSideMonth(11);setSideYear(y=>y-1)}else setSideMonth(m=>m-1);}} className="w-5 h-5 rounded text-stone-400 hover:text-stone-600 flex items-center justify-center text-xs transition-colors">‹</button>
                <span className="text-xs font-semibold text-slate-700">{monthNames[sideMonth].slice(0,3)} {sideYear}</span>
                <button onClick={()=>{ if(sideMonth===11){setSideMonth(0);setSideYear(y=>y+1)}else setSideMonth(m=>m+1);}} className="w-5 h-5 rounded text-stone-400 hover:text-stone-600 flex items-center justify-center text-xs transition-colors">›</button>
              </div>
              <div className="grid grid-cols-7 mb-1">
                {dayNamesShort.map((d,i) => (
                  <div key={i} className="text-center text-[9px] font-medium text-stone-300 py-0.5">{d}</div>
                ))}
              </div>
              {sideWeeks.map((wk, wi) => (
                <div key={wi} className="grid grid-cols-7">
                  {wk.map((day, di) => {
                    const ds = day ? `${sideYear}-${String(sideMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}` : "";
                    const isTodaySide = ds === todayStr;
                    const inWeek = isInCurrentWeek(day);
                    const count = sidebarDateCount(day);
                    return (
                      <button key={di} onClick={()=>navigateToDay(day)} disabled={!day}
                        className={`relative w-full aspect-square flex items-center justify-center text-[10px] font-num rounded-md transition-colors
                          ${!day?"":"cursor-pointer hover:bg-stone-100/60"}
                          ${inWeek && !isTodaySide?"bg-stone-100/80 font-semibold text-slate-700":""}
                          ${isTodaySide?"bg-amber-500 text-white font-bold rounded-full":""}
                          ${!inWeek && !isTodaySide && day?"text-slate-500":""}
                        `}>
                        {day}
                        {count > 0 && !isTodaySide && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-400"></span>}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="space-y-2.5">
              <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider px-0.5">Filters</div>
              <MultiSelect options={areas} selected={filterArea} onChange={setFilterArea} placeholder={t.area} style={{minWidth:"100%"}}/>
              <MultiSelect options={matters} selected={filterMatter} onChange={setFilterMatter} placeholder={t.calFilterAll} style={{minWidth:"100%"}}/>
              <MultiSelect options={t.priorities} selected={filterPriority} onChange={setFilterPriority} placeholder={t.calFilterPriority} style={{minWidth:"100%"}}/>
            </div>

            {/* Week summary */}
            <div className="bg-white border border-stone-200/40 rounded-xl p-3 shadow-surface">
              <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-2.5">This Week</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center"><span className="text-slate-500">Total</span><span className="font-semibold font-num text-slate-700">{weekDates.reduce((s,d)=>s+getDeadlinesForDate(fmtDate(d)).length,0)}</span></div>
                <div className="flex justify-between items-center"><span className="text-rose-400">Overdue</span><span className="font-semibold font-num text-rose-500">{weekDates.reduce((s,d)=>s+getDeadlinesForDate(fmtDate(d)).filter(dl=>dl.date<todayStr&&!dl.done).length,0)}</span></div>
                <div className="flex justify-between items-center"><span className="text-emerald-400">Done</span><span className="font-semibold font-num text-emerald-500">{weekDates.reduce((s,d)=>s+getDeadlinesForDate(fmtDate(d)).filter(dl=>dl.done).length,0)}</span></div>
              </div>
            </div>
          </div>

          {/* ── Week grid (main area) ── */}
          <div className="flex-1 min-w-0">
            <div className="cal-week-grid border border-stone-200/40 rounded-2xl overflow-hidden">
              {/* Day headers */}
              <div className="grid grid-cols-7 bg-stone-50/80 border-b border-stone-200/60">
                {weekDates.map((d, i) => {
                  const ds = fmtDate(d);
                  const isToday = ds === todayStr;
                  const dayCount = getDeadlinesForDate(ds).length;
                  return (
                    <div key={i} className={`text-center py-3.5 border-r border-stone-100 last:border-r-0 ${isToday?"bg-amber-50/60":""}`}>
                      <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider">{dayNames[d.getDay()]}</div>
                      <div className={`text-lg font-num mt-0.5 leading-none ${isToday?"font-bold":"text-slate-600 font-medium"}`}>
                        <span className={isToday?"bg-amber-500 text-white rounded-full w-8 h-8 inline-flex items-center justify-center":""}>{d.getDate()}</span>
                      </div>
                      {dayCount > 0 && <div className="text-[10px] text-stone-300 font-num mt-1">{dayCount} item{dayCount!==1?"s":""}</div>}
                    </div>
                  );
                })}
              </div>
              {/* Day columns */}
              <div className="grid grid-cols-7 cal-day-columns">
                {weekDates.map((d, i) => {
                  const ds = fmtDate(d);
                  const dayDL = getDeadlinesForDate(ds);
                  const isToday = ds === todayStr;
                  return (
                    <div key={i}
                      onClick={()=>dayDL.length===0 && handleEmptyDateClick(ds)}
                      className={`cal-day-column min-h-[380px] p-2.5 border-r border-stone-100 last:border-r-0 transition-colors ${isToday?"cal-today-col":""} ${dayDL.length===0?"cursor-pointer hover:bg-stone-50/60":""}`}>
                      <div className="space-y-2.5">
                        {dayDL.map(dl => renderDLItem(dl, false))}
                      </div>
                      {dayDL.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-24 text-stone-200 cal-empty-hint">
                          <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/></svg>
                          <span className="text-[10px]">Click to add</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-stone-400">
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-400"></span> {t.priorities[0]}</div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400"></span> {t.priorities[1]}</div>
        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-400"></span> {t.priorities[2]}</div>
        <span className="mx-1 text-stone-200">|</span>
        <div className="flex items-center gap-1.5"><span className="text-rose-500 font-semibold">!</span> Overdue</div>
      </div>

      {/* Deadline detail modal */}
      {selectedDL && <DeadlineDetailModal deadline={selectedDL} onClose={()=>setSelectedDL(null)} onSave={updated=>setDeadlines(p=>p.map(x=>x.id===updated.id?updated:x))} t={t}/>}

      {/* Add deadline modal (click empty date) */}
      {showAddForm && (
        <Modal title={t.addDLTitle || t.addDeadline} onClose={()=>setShowAddForm(false)}>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.matter}</label>
              <Sel value={addForm.matter} onChange={e=>setAddForm(f=>({...f,matter:e.target.value}))}>
                <option value="">Select...</option>{cases.map(c=><option key={c.id}>{c.matter}</option>)}
              </Sel>
            </div>
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.dueDate}</label>
              <Inp type="date" value={addForm.date} onChange={e=>setAddForm(f=>({...f,date:e.target.value}))}/>
            </div>
            <div className="col-span-2"><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.description}</label>
              <Inp value={addForm.description} onChange={e=>setAddForm(f=>({...f,description:e.target.value}))} placeholder="e.g. File motion to compel"/>
            </div>
            <div><label className="text-xs text-stone-400 mb-1.5 block font-medium">{t.priority}</label>
              <Sel value={addForm.priority} onChange={e=>setAddForm(f=>({...f,priority:e.target.value}))}>{t.priorities.map(p=><option key={p}>{p}</option>)}</Sel>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Btn variant="secondary" onClick={()=>setShowAddForm(false)}>{t.cancel}</Btn>
            <Btn onClick={saveNewDL}>{t.saveDeadline}</Btn>
          </div>
        </Modal>
      )}
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
    // ── Original 10 ──
    {id:1,matter:"Smith v. Jones — Wrongful Termination & Retaliation Claims (Consolidated)",client:"John Smith",area:"Employment",attorney:"A. Rivera",status:"Active",opened:"2025-09-12",notes:"Discovery phase. Multiple depositions scheduled. Class cert pending.",summary:"Key witness deposition scheduled for May. Opposing counsel requested 3rd extension.",documents:[],checklist:[{id:101,text:"Review interrogatory responses",done:true},{id:102,text:"Prepare exhibit binder for deposition",done:false},{id:103,text:"Draft motion in limine",done:false}]},
    {id:2,matter:"Acme Acquisition",client:"Acme Corp",area:"Corporate",attorney:"B. Chen",status:"Active",opened:"2026-02-01",notes:"Due diligence ongoing",summary:"",documents:[],checklist:[]},
    {id:3,matter:"Garcia Family Trust",client:"Maria Garcia",area:"Family",attorney:"L. Patel",status:"Pending",opened:"2026-01-20",notes:"Awaiting court date",summary:"Trust involves 3 properties across 2 states. Beneficiary dispute ongoing.",documents:[],checklist:[{id:301,text:"Compile property appraisals",done:true},{id:302,text:"Contact beneficiaries for mediation",done:false}]},
    {id:4,matter:"State of California v. Brightfield Industries Inc. et al.",client:"Brightfield Industries",area:"Criminal",attorney:"A. Rivera",status:"Closed",opened:"2025-06-01",notes:"Plea deal reached. Case resolved.",summary:"Defendant agreed to $2.4M fine and compliance monitoring.",documents:[],checklist:[{id:401,text:"File final compliance report",done:true}]},
    {id:5,matter:"Xu IP Dispute",client:"Dr. Wei Xu",area:"IP",attorney:"B. Chen",status:"On Hold",opened:"2026-03-05",notes:"Patent review in progress",summary:"",documents:[],checklist:[]},
    {id:6,matter:"Riverside Commons Development LLC — Zoning Variance & Land Use Permits",client:"Riverside Commons Dev LLC",area:"Real Estate",attorney:"M. Torres",status:"Active",opened:"2025-11-18",notes:"Zoning hearing rescheduled twice. Environmental review pending.",summary:"Complex multi-parcel development. 47 residential units + commercial space. Need variance for height limit.",documents:[],checklist:[{id:601,text:"File variance application",done:true},{id:602,text:"Submit environmental impact study",done:false},{id:603,text:"Draft neighbor notification letters",done:true},{id:604,text:"Prepare presentation for planning board",done:false},{id:605,text:"Review updated site plans",done:false}]},
    {id:7,matter:"Novak v. Centurion Health",client:"Peter Novak",area:"Litigation",attorney:"L. Patel",status:"Active",opened:"2026-03-28",notes:"Initial intake complete. Need to file complaint.",summary:"",documents:[],checklist:[]},
    {id:8,matter:"TechVault Series B",client:"TechVault Inc.",area:"Corporate",attorney:"B. Chen",status:"Pending",opened:"2026-04-01",notes:"Term sheet under review by board",summary:"",documents:[],checklist:[{id:801,text:"Review term sheet redlines",done:false}]},
    {id:9,matter:"DOL Audit — Harper & Co",client:"Harper & Co",area:"Employment",attorney:"M. Torres",status:"Active",opened:"2025-12-10",notes:"Responding to Department of Labor wage audit",summary:"Covers 2023-2025 payroll records. 340 employees affected.",documents:[],checklist:[{id:901,text:"Gather payroll records 2023",done:true},{id:902,text:"Gather payroll records 2024",done:true},{id:903,text:"Gather payroll records 2025",done:false},{id:904,text:"Draft response letter",done:false}]},
    {id:10,matter:"Lee Divorce",client:"Sarah Lee",area:"Family",attorney:"L. Patel",status:"Closed",opened:"2025-03-15",notes:"Final decree entered",summary:"",documents:[],checklist:[]},
    // ── Cases 11-20 ──
    {id:11,matter:"Martinez v. City of San Diego — Civil Rights Violation",client:"Carlos Martinez",area:"Litigation",attorney:"A. Rivera",status:"Active",opened:"2026-01-05",notes:"Section 1983 claim. Body cam footage obtained.",summary:"Excessive force incident during traffic stop. 3 officers named.",documents:[],checklist:[{id:1101,text:"File amended complaint",done:true},{id:1102,text:"Submit FOIA request for training records",done:false}]},
    {id:12,matter:"Pinnacle Holdings — Commercial Lease Dispute",client:"Pinnacle Holdings LLC",area:"Real Estate",attorney:"M. Torres",status:"Active",opened:"2025-10-22",notes:"Tenant breach of lease. Eviction proceedings initiated.",summary:"",documents:[],checklist:[{id:1201,text:"Send cure notice",done:true},{id:1202,text:"Prepare unlawful detainer filing",done:false}]},
    {id:13,matter:"Wang Patent Portfolio Licensing",client:"Mei-Ling Wang",area:"IP",attorney:"B. Chen",status:"Active",opened:"2026-02-14",notes:"Licensing negotiation with 3 tech companies",summary:"Portfolio of 12 patents covering ML inference optimization.",documents:[],checklist:[{id:1301,text:"Prepare claim charts for each licensee",done:false},{id:1302,text:"Draft license template",done:true}]},
    {id:14,matter:"Thompson Child Custody Modification",client:"David Thompson",area:"Family",attorney:"L. Patel",status:"Active",opened:"2026-03-01",notes:"Father seeking primary custody. Mother relocated out of state.",summary:"",documents:[],checklist:[{id:1401,text:"File modification petition",done:true},{id:1402,text:"Schedule GAL interview",done:false}]},
    {id:15,matter:"Greenfield Energy Corp — SEC Investigation",client:"Greenfield Energy Corp",area:"Corporate",attorney:"A. Rivera",status:"Active",opened:"2025-08-20",notes:"SEC inquiry regarding financial disclosures. Cooperating fully.",summary:"Subpoena covers Q1-Q4 2024. Focus on revenue recognition practices.",documents:[],checklist:[{id:1501,text:"Collect board minutes 2024",done:true},{id:1502,text:"Review email custodians",done:true},{id:1503,text:"Prepare privilege log",done:false}]},
    {id:16,matter:"Orozco DUI Defense",client:"Ana Orozco",area:"Criminal",attorney:"L. Patel",status:"Pending",opened:"2026-03-18",notes:"Arraignment scheduled. BAC 0.11. First offense.",summary:"",documents:[],checklist:[{id:1601,text:"Obtain police report",done:true},{id:1602,text:"Review dashcam footage",done:false}]},
    {id:17,matter:"CloudNine SaaS — Series A Financing",client:"CloudNine Software Inc.",area:"Corporate",attorney:"B. Chen",status:"Active",opened:"2026-01-15",notes:"Lead investor: Sequoia. $18M round.",summary:"Due diligence complete. Negotiating board seats and anti-dilution provisions.",documents:[],checklist:[{id:1701,text:"Finalize stock purchase agreement",done:false},{id:1702,text:"Draft investor rights agreement",done:false},{id:1703,text:"Review cap table",done:true}]},
    {id:18,matter:"Baker v. Statewide Insurance Co. — Bad Faith Claim",client:"Robert Baker",area:"Litigation",attorney:"A. Rivera",status:"Active",opened:"2025-11-03",notes:"Insurance denied $480K fire damage claim. Suing for bad faith.",summary:"Home destroyed in October wildfire. Insurer alleges policy exclusion.",documents:[],checklist:[{id:1801,text:"Depose claims adjuster",done:false},{id:1802,text:"Obtain independent damage assessment",done:true}]},
    {id:19,matter:"Kenji Tanaka — Trademark Infringement",client:"Kenji Tanaka",area:"IP",attorney:"B. Chen",status:"Pending",opened:"2026-02-28",notes:"Competitor using confusingly similar mark for restaurant chain.",summary:"",documents:[],checklist:[{id:1901,text:"File TTAB opposition",done:false}]},
    {id:20,matter:"Delgado Estate Administration",client:"Rosa Delgado",area:"Family",attorney:"L. Patel",status:"Active",opened:"2025-12-05",notes:"Probate filed. Contesting creditor claims.",summary:"Estate valued at ~$1.2M. 4 beneficiaries. 2 disputed creditor claims.",documents:[],checklist:[{id:2001,text:"File inventory and appraisement",done:true},{id:2002,text:"Challenge medical debt claim",done:false},{id:2003,text:"Notify beneficiaries of hearing",done:false}]},
    // ── Cases 21-30 ──
    {id:21,matter:"Preston Commercial REIT — 1031 Exchange",client:"Preston Commercial Partners",area:"Real Estate",attorney:"M. Torres",status:"Active",opened:"2026-01-28",notes:"45-day identification period ends Apr 18.",summary:"Selling office complex in Phoenix. Identifying 3 replacement properties in Austin.",documents:[],checklist:[{id:2101,text:"Identify replacement properties",done:false},{id:2102,text:"Engage qualified intermediary",done:true}]},
    {id:22,matter:"People v. DeSantis — Embezzlement",client:"Marco DeSantis",area:"Criminal",attorney:"A. Rivera",status:"Active",opened:"2025-10-30",notes:"$2.1M alleged embezzlement from employer. Prelim hearing scheduled.",summary:"Client was CFO. Prosecution relies on forensic accounting report.",documents:[],checklist:[{id:2201,text:"Retain forensic accountant",done:true},{id:2202,text:"Review bank records",done:true},{id:2203,text:"Prepare preliminary hearing brief",done:false}]},
    {id:23,matter:"NovaMed Pharma — FDA Compliance Review",client:"NovaMed Pharmaceuticals",area:"Corporate",attorney:"B. Chen",status:"Active",opened:"2026-02-10",notes:"Voluntary compliance audit before Phase III trial submission.",summary:"Reviewing cGMP compliance for 2 manufacturing facilities.",documents:[],checklist:[{id:2301,text:"Audit Facility A documentation",done:true},{id:2302,text:"Audit Facility B documentation",done:false},{id:2303,text:"Prepare FDA pre-submission package",done:false}]},
    {id:24,matter:"Foster v. Foster — High-Asset Divorce",client:"Karen Foster",area:"Family",attorney:"L. Patel",status:"Active",opened:"2025-09-01",notes:"Community property ~$8M. Forensic CPA engaged.",summary:"Husband owns 3 businesses. Discovery of hidden offshore accounts suspected.",documents:[],checklist:[{id:2401,text:"Subpoena offshore bank records",done:false},{id:2402,text:"Depose husband's business partner",done:false},{id:2403,text:"Engage business valuator",done:true}]},
    {id:25,matter:"Atlas Construction Wage & Hour Class Action",client:"Atlas Construction LLC",area:"Employment",attorney:"M. Torres",status:"Active",opened:"2025-07-15",notes:"780 class members. Meal/rest break violations.",summary:"Settlement conference set for May. Mediator: Judge (Ret.) Wilson.",documents:[],checklist:[{id:2501,text:"Compile timekeeping records",done:true},{id:2502,text:"Draft mediation brief",done:false},{id:2503,text:"Calculate class damages model",done:false}]},
    {id:26,matter:"Patel v. GlobeTech — Discrimination & Retaliation",client:"Priya Patel",area:"Employment",attorney:"A. Rivera",status:"Pending",opened:"2026-03-12",notes:"EEOC right-to-sue letter received. 90-day filing deadline.",summary:"",documents:[],checklist:[{id:2601,text:"Draft federal complaint",done:false},{id:2602,text:"Preserve electronic evidence",done:true}]},
    {id:27,matter:"Henshaw Property — Boundary Dispute",client:"William Henshaw",area:"Real Estate",attorney:"M. Torres",status:"On Hold",opened:"2026-01-10",notes:"Awaiting surveyor report. Neighbor retained counsel.",summary:"",documents:[],checklist:[{id:2701,text:"Commission new boundary survey",done:true}]},
    {id:28,matter:"ByteForge Acqui-hire by Datastream Corp",client:"ByteForge Technologies",area:"Corporate",attorney:"B. Chen",status:"Active",opened:"2026-03-20",notes:"12-person team acqui-hire. $4.5M deal.",summary:"Key employees require retention packages. IP assignment clean-up needed.",documents:[],checklist:[{id:2801,text:"Review IP assignment agreements",done:false},{id:2802,text:"Draft retention bonus agreements",done:false}]},
    {id:29,matter:"Davis v. Metro Transit Authority — Slip & Fall",client:"Linda Davis",area:"Litigation",attorney:"L. Patel",status:"Active",opened:"2026-02-20",notes:"Plaintiff suffered fractured hip at downtown station.",summary:"Surveillance footage shows wet floor, no warning signs. Medical bills $87K.",documents:[],checklist:[{id:2901,text:"Obtain complete medical records",done:true},{id:2902,text:"File demand letter",done:false}]},
    {id:30,matter:"Kim Trademark Registration — BOBA BLISS",client:"Jenny Kim",area:"IP",attorney:"B. Chen",status:"Pending",opened:"2026-03-25",notes:"Restaurant chain trademark. Office action received.",summary:"",documents:[],checklist:[{id:3001,text:"Respond to office action",done:false}]},
    // ── Cases 31-40 ──
    {id:31,matter:"Ortega Workers' Comp Appeal",client:"Miguel Ortega",area:"Employment",attorney:"M. Torres",status:"Active",opened:"2026-02-05",notes:"Denied claim for on-the-job back injury. Appealing to WCAB.",summary:"Employer disputes that injury occurred at work. Co-worker witness available.",documents:[],checklist:[{id:3101,text:"Obtain IME report",done:true},{id:3102,text:"Prepare appeal brief",done:false}]},
    {id:32,matter:"Sterling Hotel Group — Franchise Agreement Review",client:"Sterling Hotel Group",area:"Corporate",attorney:"B. Chen",status:"Active",opened:"2026-01-22",notes:"Reviewing terms for 5 new franchise locations in Texas.",summary:"Franchisee disclosure document needs updates for TX state requirements.",documents:[],checklist:[{id:3201,text:"Review FDD for TX compliance",done:false},{id:3202,text:"Negotiate territory exclusivity clause",done:false}]},
    {id:33,matter:"Rodriguez v. ABC Staffing — Misclassification",client:"Elena Rodriguez",area:"Employment",attorney:"A. Rivera",status:"Active",opened:"2025-11-28",notes:"Independent contractor misclassification claim under AB5.",summary:"Client worked 40+ hrs/week for 2 years classified as 1099.",documents:[],checklist:[{id:3301,text:"Gather pay stubs and invoices",done:true},{id:3302,text:"Calculate back wages owed",done:false}]},
    {id:34,matter:"Clearwater HOA — Governing Documents Amendment",client:"Clearwater HOA",area:"Real Estate",attorney:"M. Torres",status:"Pending",opened:"2026-03-10",notes:"Amending CC&Rs for solar panel installations. Need 67% homeowner vote.",summary:"",documents:[],checklist:[{id:3401,text:"Draft amended CC&Rs",done:true},{id:3402,text:"Prepare ballot package for homeowners",done:false}]},
    {id:35,matter:"People v. Nguyen — Drug Possession",client:"Tuan Nguyen",area:"Criminal",attorney:"L. Patel",status:"Active",opened:"2026-02-18",notes:"Prop 36 diversion eligibility assessment.",summary:"First-time offense. Client enrolled in treatment program.",documents:[],checklist:[{id:3501,text:"Obtain treatment program enrollment letter",done:true},{id:3502,text:"File diversion motion",done:false}]},
    {id:36,matter:"Sato v. NexGen Robotics — Product Liability",client:"Hiroshi Sato",area:"Litigation",attorney:"A. Rivera",status:"Active",opened:"2025-12-20",notes:"Industrial robot malfunction caused severe hand injury.",summary:"OSHA investigation report obtained. Manufacturer aware of defect per internal emails.",documents:[],checklist:[{id:3601,text:"Retain biomechanical expert",done:true},{id:3602,text:"Depose product design engineer",done:false},{id:3603,text:"File motion to compel internal docs",done:false}]},
    {id:37,matter:"Apex Ventures — Fund Formation",client:"Apex Ventures LLC",area:"Corporate",attorney:"B. Chen",status:"Active",opened:"2026-03-15",notes:"$50M venture fund. 12 LPs committed.",summary:"Partnership agreement in final draft. Side letters with 3 anchor LPs.",documents:[],checklist:[{id:3701,text:"Finalize LPA",done:false},{id:3702,text:"Draft side letters",done:false},{id:3703,text:"File Form D with SEC",done:false}]},
    {id:38,matter:"Yamamoto Copyright Infringement — Photography",client:"Keiko Yamamoto",area:"IP",attorney:"B. Chen",status:"Active",opened:"2026-02-25",notes:"Commercial website using 14 copyrighted photos without license.",summary:"DMCA takedown sent. Defendant continued use. Statutory damages sought.",documents:[],checklist:[{id:3801,text:"Register copyrights",done:true},{id:3802,text:"File federal complaint",done:false}]},
    {id:39,matter:"Brennan v. Brennan — Custody Mediation",client:"Sean Brennan",area:"Family",attorney:"L. Patel",status:"On Hold",opened:"2026-01-30",notes:"Court-ordered mediation. Both parties agreeable.",summary:"",documents:[],checklist:[{id:3901,text:"Prepare parenting plan proposal",done:true}]},
    {id:40,matter:"Pacific Lumber Co. — Environmental Compliance",client:"Pacific Lumber Co.",area:"Real Estate",attorney:"M. Torres",status:"Active",opened:"2025-10-05",notes:"EPA notice of violation. Timber runoff into protected creek.",summary:"Remediation plan due in 60 days. Potential fine up to $500K.",documents:[],checklist:[{id:4001,text:"Engage environmental consultant",done:true},{id:4002,text:"Draft remediation plan",done:false},{id:4003,text:"Negotiate fine reduction with EPA",done:false}]},
    // ── Cases 41-45 ──
    {id:41,matter:"Chen v. Golden State University — Title IX",client:"Amy Chen",area:"Litigation",attorney:"A. Rivera",status:"Active",opened:"2026-03-05",notes:"Title IX complaint. University failed to investigate harassment.",summary:"3 prior complaints filed by other students against same professor.",documents:[],checklist:[{id:4101,text:"Obtain prior complaint records via subpoena",done:false},{id:4102,text:"Interview corroborating witnesses",done:true}]},
    {id:42,matter:"Vanguard Real Estate Fund II — Joint Venture",client:"Vanguard Capital Partners",area:"Corporate",attorney:"B. Chen",status:"Pending",opened:"2026-04-02",notes:"JV with Korean developer for mixed-use project.",summary:"$120M project. Complex profit waterfall structure.",documents:[],checklist:[{id:4201,text:"Draft JV operating agreement",done:false},{id:4202,text:"Review zoning entitlements",done:false}]},
    {id:43,matter:"Torres FLSA Collective Action — Restaurant Workers",client:"Various Plaintiffs",area:"Employment",attorney:"M. Torres",status:"Active",opened:"2025-08-10",notes:"Tip-credit violations at 8 restaurant locations. 120+ opt-in plaintiffs.",summary:"Conditional certification granted. Discovery phase.",documents:[],checklist:[{id:4301,text:"Send opt-in notice to class",done:true},{id:4302,text:"Compile tip records by location",done:false},{id:4303,text:"Depose regional managers",done:false}]},
    {id:44,matter:"People v. Harris — Assault & Battery",client:"James Harris",area:"Criminal",attorney:"A. Rivera",status:"Active",opened:"2026-01-25",notes:"Bar altercation. Self-defense claim. Trial date set.",summary:"Security footage supports self-defense theory. 2 witnesses for defense.",documents:[],checklist:[{id:4401,text:"Subpoena security footage",done:true},{id:4402,text:"Prepare witness statements",done:false},{id:4403,text:"File self-defense jury instructions",done:false}]},
    {id:45,matter:"Meadowbrook Senior Living — Licensing Dispute",client:"Meadowbrook Senior Living Inc.",area:"Real Estate",attorney:"M. Torres",status:"Pending",opened:"2026-03-22",notes:"State licensing board threatening revocation. Compliance plan needed.",summary:"3 citations in 12 months. Most recent: staffing ratio violation.",documents:[],checklist:[{id:4501,text:"Prepare corrective action plan",done:false},{id:4502,text:"Hire compliance consultant",done:true}]},
  ];
  const INIT_LOGS = [
    // ── Original entries (cases 1-10) ──
    {id:1,date:"2026-04-08",matter:"Smith v. Jones — Wrongful Termination & Retaliation Claims (Consolidated)",attorney:"A. Rivera",task:"Deposition prep — review 342 pages of personnel files",hours:4.5,rate:350,billed:false},
    {id:2,date:"2026-04-07",matter:"Smith v. Jones — Wrongful Termination & Retaliation Claims (Consolidated)",attorney:"A. Rivera",task:"Draft motion to compel",hours:3.0,rate:350,billed:false},
    {id:3,date:"2026-04-02",matter:"Smith v. Jones — Wrongful Termination & Retaliation Claims (Consolidated)",attorney:"A. Rivera",task:"Client call — case strategy update",hours:0.5,rate:350,billed:true},
    {id:4,date:"2026-03-28",matter:"Smith v. Jones — Wrongful Termination & Retaliation Claims (Consolidated)",attorney:"A. Rivera",task:"Review opposing expert report",hours:2.75,rate:350,billed:true},
    {id:5,date:"2026-04-09",matter:"Acme Acquisition",attorney:"B. Chen",task:"Contract review — asset purchase agreement",hours:3.0,rate:400,billed:true},
    {id:6,date:"2026-04-05",matter:"Acme Acquisition",attorney:"B. Chen",task:"Due diligence checklist coordination",hours:1.5,rate:400,billed:false},
    {id:7,date:"2026-04-06",matter:"Garcia Family Trust",attorney:"L. Patel",task:"Draft trust amendment",hours:2.0,rate:300,billed:false},
    {id:8,date:"2026-04-01",matter:"Garcia Family Trust",attorney:"L. Patel",task:"Beneficiary interview",hours:1.25,rate:300,billed:true},
    {id:9,date:"2026-04-10",matter:"Riverside Commons Development LLC — Zoning Variance & Land Use Permits",attorney:"M. Torres",task:"Zoning variance application drafting",hours:5.0,rate:375,billed:false},
    {id:10,date:"2026-04-08",matter:"Riverside Commons Development LLC — Zoning Variance & Land Use Permits",attorney:"M. Torres",task:"Site visit with surveyor",hours:3.0,rate:375,billed:false},
    {id:11,date:"2026-04-03",matter:"Riverside Commons Development LLC — Zoning Variance & Land Use Permits",attorney:"M. Torres",task:"Environmental consultant meeting",hours:1.5,rate:375,billed:true},
    {id:12,date:"2026-03-20",matter:"Riverside Commons Development LLC — Zoning Variance & Land Use Permits",attorney:"M. Torres",task:"Title search review",hours:2.0,rate:375,billed:true},
    {id:13,date:"2026-04-09",matter:"TechVault Series B",attorney:"B. Chen",task:"Term sheet review",hours:1.0,rate:400,billed:false},
    {id:14,date:"2026-04-07",matter:"DOL Audit — Harper & Co",attorney:"M. Torres",task:"Payroll records compilation",hours:6.0,rate:375,billed:false},
    {id:15,date:"2026-04-04",matter:"DOL Audit — Harper & Co",attorney:"M. Torres",task:"Draft response to DOL inquiry",hours:3.5,rate:375,billed:false},
    {id:16,date:"2025-11-15",matter:"State of California v. Brightfield Industries Inc. et al.",attorney:"A. Rivera",task:"Sentencing memo preparation",hours:4.0,rate:350,billed:true},
    {id:17,date:"2026-03-10",matter:"Xu IP Dispute",attorney:"B. Chen",task:"Prior art search review",hours:1.5,rate:400,billed:false},
    {id:18,date:"2026-04-02",matter:"Novak v. Centurion Health",attorney:"L. Patel",task:"Initial client intake and fact gathering",hours:1.0,rate:300,billed:false},
    // ── New entries (cases 11-45) ──
    {id:19,date:"2026-04-09",matter:"Martinez v. City of San Diego — Civil Rights Violation",attorney:"A. Rivera",task:"Review body cam footage compilation",hours:3.5,rate:350,billed:false},
    {id:20,date:"2026-03-25",matter:"Martinez v. City of San Diego — Civil Rights Violation",attorney:"A. Rivera",task:"Draft amended complaint",hours:2.5,rate:350,billed:true},
    {id:21,date:"2026-04-07",matter:"Pinnacle Holdings — Commercial Lease Dispute",attorney:"M. Torres",task:"Prepare unlawful detainer motion",hours:2.0,rate:375,billed:false},
    {id:22,date:"2026-03-15",matter:"Pinnacle Holdings — Commercial Lease Dispute",attorney:"M. Torres",task:"Send cure or quit notice",hours:0.75,rate:375,billed:true},
    {id:23,date:"2026-04-10",matter:"Wang Patent Portfolio Licensing",attorney:"B. Chen",task:"Prepare claim charts — licensee A",hours:4.0,rate:400,billed:false},
    {id:24,date:"2026-03-28",matter:"Wang Patent Portfolio Licensing",attorney:"B. Chen",task:"Prior art landscape analysis",hours:3.0,rate:400,billed:true},
    {id:25,date:"2026-04-06",matter:"Thompson Child Custody Modification",attorney:"L. Patel",task:"Draft modification petition",hours:2.5,rate:300,billed:false},
    {id:26,date:"2026-04-01",matter:"Thompson Child Custody Modification",attorney:"L. Patel",task:"Client interview — custody concerns",hours:1.0,rate:300,billed:true},
    {id:27,date:"2026-04-08",matter:"Greenfield Energy Corp — SEC Investigation",attorney:"A. Rivera",task:"Review privilege log entries",hours:5.0,rate:350,billed:false},
    {id:28,date:"2026-03-20",matter:"Greenfield Energy Corp — SEC Investigation",attorney:"A. Rivera",task:"Document collection from email custodians",hours:4.0,rate:350,billed:true},
    {id:29,date:"2026-04-03",matter:"Orozco DUI Defense",attorney:"L. Patel",task:"Review police report and dashcam",hours:1.5,rate:300,billed:false},
    {id:30,date:"2026-04-10",matter:"CloudNine SaaS — Series A Financing",attorney:"B. Chen",task:"Negotiate anti-dilution provisions",hours:3.0,rate:400,billed:false},
    {id:31,date:"2026-03-30",matter:"CloudNine SaaS — Series A Financing",attorney:"B. Chen",task:"Cap table review and modeling",hours:2.0,rate:400,billed:true},
    {id:32,date:"2026-04-05",matter:"Baker v. Statewide Insurance Co. — Bad Faith Claim",attorney:"A. Rivera",task:"Prepare demand letter — policy analysis",hours:3.5,rate:350,billed:false},
    {id:33,date:"2026-03-18",matter:"Baker v. Statewide Insurance Co. — Bad Faith Claim",attorney:"A. Rivera",task:"Review fire investigation report",hours:2.0,rate:350,billed:true},
    {id:34,date:"2026-04-01",matter:"Kenji Tanaka — Trademark Infringement",attorney:"B. Chen",task:"Research TTAB opposition procedure",hours:1.5,rate:400,billed:false},
    {id:35,date:"2026-04-09",matter:"Delgado Estate Administration",attorney:"L. Patel",task:"Challenge medical debt — draft objection",hours:2.0,rate:300,billed:false},
    {id:36,date:"2026-03-22",matter:"Delgado Estate Administration",attorney:"L. Patel",task:"Inventory and appraisement filing",hours:3.0,rate:300,billed:true},
    {id:37,date:"2026-04-06",matter:"Preston Commercial REIT — 1031 Exchange",attorney:"M. Torres",task:"Review replacement property due diligence",hours:2.5,rate:375,billed:false},
    {id:38,date:"2026-03-28",matter:"Preston Commercial REIT — 1031 Exchange",attorney:"M. Torres",task:"Engage qualified intermediary",hours:1.0,rate:375,billed:true},
    {id:39,date:"2026-04-08",matter:"People v. DeSantis — Embezzlement",attorney:"A. Rivera",task:"Review forensic accounting findings",hours:4.0,rate:350,billed:false},
    {id:40,date:"2026-03-25",matter:"People v. DeSantis — Embezzlement",attorney:"A. Rivera",task:"Bank records analysis",hours:3.5,rate:350,billed:true},
    {id:41,date:"2026-04-10",matter:"NovaMed Pharma — FDA Compliance Review",attorney:"B. Chen",task:"Audit Facility B documentation",hours:5.0,rate:400,billed:false},
    {id:42,date:"2026-03-15",matter:"NovaMed Pharma — FDA Compliance Review",attorney:"B. Chen",task:"Audit Facility A — on-site review",hours:6.0,rate:400,billed:true},
    {id:43,date:"2026-04-07",matter:"Foster v. Foster — High-Asset Divorce",attorney:"L. Patel",task:"Analyze business valuation report",hours:3.0,rate:300,billed:false},
    {id:44,date:"2026-03-20",matter:"Foster v. Foster — High-Asset Divorce",attorney:"L. Patel",task:"Prepare forensic CPA engagement letter",hours:1.0,rate:300,billed:true},
    {id:45,date:"2026-04-09",matter:"Atlas Construction Wage & Hour Class Action",attorney:"M. Torres",task:"Compile timekeeping records by location",hours:4.5,rate:375,billed:false},
    {id:46,date:"2026-03-10",matter:"Atlas Construction Wage & Hour Class Action",attorney:"M. Torres",task:"Class certification brief drafting",hours:5.0,rate:375,billed:true},
    {id:47,date:"2026-04-04",matter:"Patel v. GlobeTech — Discrimination & Retaliation",attorney:"A. Rivera",task:"Draft federal complaint",hours:3.0,rate:350,billed:false},
    {id:48,date:"2026-04-08",matter:"ByteForge Acqui-hire by Datastream Corp",attorney:"B. Chen",task:"Review IP assignment chain of title",hours:2.5,rate:400,billed:false},
    {id:49,date:"2026-03-25",matter:"ByteForge Acqui-hire by Datastream Corp",attorney:"B. Chen",task:"Draft retention bonus term sheets",hours:2.0,rate:400,billed:false},
    {id:50,date:"2026-04-06",matter:"Davis v. Metro Transit Authority — Slip & Fall",attorney:"L. Patel",task:"Review surveillance footage",hours:1.5,rate:300,billed:false},
    {id:51,date:"2026-03-30",matter:"Davis v. Metro Transit Authority — Slip & Fall",attorney:"L. Patel",task:"Collect medical records",hours:2.0,rate:300,billed:true},
    {id:52,date:"2026-04-02",matter:"Kim Trademark Registration — BOBA BLISS",attorney:"B. Chen",task:"Prepare office action response",hours:1.5,rate:400,billed:false},
    {id:53,date:"2026-04-07",matter:"Ortega Workers' Comp Appeal",attorney:"M. Torres",task:"Draft appeal brief",hours:3.0,rate:375,billed:false},
    {id:54,date:"2026-04-10",matter:"Sterling Hotel Group — Franchise Agreement Review",attorney:"B. Chen",task:"FDD compliance review for Texas",hours:3.5,rate:400,billed:false},
    {id:55,date:"2026-04-05",matter:"Rodriguez v. ABC Staffing — Misclassification",attorney:"A. Rivera",task:"Analyze contractor agreements",hours:2.5,rate:350,billed:false},
    {id:56,date:"2026-03-18",matter:"Rodriguez v. ABC Staffing — Misclassification",attorney:"A. Rivera",task:"Client interview — work conditions",hours:1.0,rate:350,billed:true},
    {id:57,date:"2026-04-03",matter:"People v. Nguyen — Drug Possession",attorney:"L. Patel",task:"Prepare diversion motion",hours:2.0,rate:300,billed:false},
    {id:58,date:"2026-04-09",matter:"Sato v. NexGen Robotics — Product Liability",attorney:"A. Rivera",task:"Review OSHA investigation findings",hours:3.0,rate:350,billed:false},
    {id:59,date:"2026-03-22",matter:"Sato v. NexGen Robotics — Product Liability",attorney:"A. Rivera",task:"Retain biomechanical expert",hours:1.5,rate:350,billed:true},
    {id:60,date:"2026-04-10",matter:"Apex Ventures — Fund Formation",attorney:"B. Chen",task:"Draft LPA waterfall provisions",hours:4.0,rate:400,billed:false},
    {id:61,date:"2026-04-01",matter:"Apex Ventures — Fund Formation",attorney:"B. Chen",task:"LP due diligence questionnaire review",hours:2.0,rate:400,billed:true},
    {id:62,date:"2026-04-08",matter:"Yamamoto Copyright Infringement — Photography",attorney:"B. Chen",task:"Register copyrights with Copyright Office",hours:2.0,rate:400,billed:false},
    {id:63,date:"2026-04-06",matter:"Pacific Lumber Co. — Environmental Compliance",attorney:"M. Torres",task:"Draft remediation plan",hours:4.0,rate:375,billed:false},
    {id:64,date:"2026-03-15",matter:"Pacific Lumber Co. — Environmental Compliance",attorney:"M. Torres",task:"EPA notice review and response strategy",hours:2.5,rate:375,billed:true},
    {id:65,date:"2026-04-07",matter:"Chen v. Golden State University — Title IX",attorney:"A. Rivera",task:"Interview corroborating witnesses",hours:2.5,rate:350,billed:false},
    {id:66,date:"2026-04-10",matter:"Vanguard Real Estate Fund II — Joint Venture",attorney:"B. Chen",task:"Draft JV operating agreement",hours:5.0,rate:400,billed:false},
    {id:67,date:"2026-04-05",matter:"Torres FLSA Collective Action — Restaurant Workers",attorney:"M. Torres",task:"Review tip records — locations 1-4",hours:4.0,rate:375,billed:false},
    {id:68,date:"2026-03-28",matter:"Torres FLSA Collective Action — Restaurant Workers",attorney:"M. Torres",task:"Opt-in notice distribution",hours:1.5,rate:375,billed:true},
    {id:69,date:"2026-04-09",matter:"People v. Harris — Assault & Battery",attorney:"A. Rivera",task:"Review security footage — self-defense analysis",hours:2.0,rate:350,billed:false},
    {id:70,date:"2026-04-03",matter:"People v. Harris — Assault & Battery",attorney:"A. Rivera",task:"Prepare witness interview summaries",hours:1.5,rate:350,billed:false},
    {id:71,date:"2026-04-08",matter:"Meadowbrook Senior Living — Licensing Dispute",attorney:"M. Torres",task:"Draft corrective action plan",hours:3.0,rate:375,billed:false},
    {id:72,date:"2026-03-30",matter:"Meadowbrook Senior Living — Licensing Dispute",attorney:"M. Torres",task:"Review citation records",hours:2.0,rate:375,billed:true},
  ];
  const INIT_DL = [
    // ── Original 20 (cases 1-10) ──
    {id:1,matter:"Smith v. Jones — Wrongful Termination & Retaliation Claims (Consolidated)",description:"Discovery cutoff",date:"2026-04-25",priority:"High",done:false},
    {id:2,matter:"Smith v. Jones — Wrongful Termination & Retaliation Claims (Consolidated)",description:"File motion to compel",date:"2026-04-05",priority:"High",done:false},
    {id:3,matter:"Smith v. Jones — Wrongful Termination & Retaliation Claims (Consolidated)",description:"Expert witness disclosure",date:"2026-05-15",priority:"Medium",done:false},
    {id:4,matter:"Smith v. Jones — Wrongful Termination & Retaliation Claims (Consolidated)",description:"Initial disclosures",date:"2026-02-15",priority:"High",done:true},
    {id:5,matter:"Smith v. Jones — Wrongful Termination & Retaliation Claims (Consolidated)",description:"Serve subpoena on third-party HR vendor",date:"2026-04-12",priority:"Medium",done:false},
    {id:6,matter:"Acme Acquisition",description:"LOI signing deadline",date:"2026-04-18",priority:"High",done:false},
    {id:7,matter:"Acme Acquisition",description:"Board approval vote",date:"2026-04-30",priority:"Medium",done:false},
    {id:8,matter:"Garcia Family Trust",description:"Mediation session",date:"2026-04-22",priority:"Medium",done:false},
    {id:9,matter:"Garcia Family Trust",description:"Submit property valuations to court",date:"2026-03-30",priority:"High",done:true},
    {id:10,matter:"Riverside Commons Development LLC — Zoning Variance & Land Use Permits",description:"Zoning hearing",date:"2026-04-28",priority:"High",done:false},
    {id:11,matter:"Riverside Commons Development LLC — Zoning Variance & Land Use Permits",description:"File environmental impact report",date:"2026-04-15",priority:"High",done:false},
    {id:12,matter:"Riverside Commons Development LLC — Zoning Variance & Land Use Permits",description:"Neighbor notification deadline",date:"2026-04-11",priority:"Medium",done:false},
    {id:13,matter:"Riverside Commons Development LLC — Zoning Variance & Land Use Permits",description:"Submit revised site plans",date:"2026-05-01",priority:"Low",done:false},
    {id:14,matter:"Riverside Commons Development LLC — Zoning Variance & Land Use Permits",description:"Initial permit application",date:"2026-01-15",priority:"High",done:true},
    {id:15,matter:"Riverside Commons Development LLC — Zoning Variance & Land Use Permits",description:"Geotechnical survey submission",date:"2026-03-01",priority:"Medium",done:true},
    {id:16,matter:"Xu IP Dispute",description:"Patent office response deadline",date:"2026-04-08",priority:"High",done:false},
    {id:17,matter:"TechVault Series B",description:"Term sheet expiration",date:"2026-04-20",priority:"High",done:false},
    {id:18,matter:"DOL Audit — Harper & Co",description:"Submit payroll records to DOL",date:"2026-04-03",priority:"High",done:false},
    {id:19,matter:"DOL Audit — Harper & Co",description:"Response letter filing deadline",date:"2026-04-30",priority:"Medium",done:false},
    {id:20,matter:"Lee Divorce",description:"Final decree filing",date:"2025-12-01",priority:"Low",done:true},
    // ── New deadlines (cases 11-45) ──
    {id:21,matter:"Martinez v. City of San Diego — Civil Rights Violation",description:"File amended complaint",date:"2026-04-14",priority:"High",done:false},
    {id:22,matter:"Martinez v. City of San Diego — Civil Rights Violation",description:"FOIA response deadline",date:"2026-05-05",priority:"Medium",done:false},
    {id:23,matter:"Pinnacle Holdings — Commercial Lease Dispute",description:"Unlawful detainer hearing",date:"2026-04-23",priority:"High",done:false},
    {id:24,matter:"Pinnacle Holdings — Commercial Lease Dispute",description:"Cure period expiration",date:"2026-04-02",priority:"High",done:true},
    {id:25,matter:"Wang Patent Portfolio Licensing",description:"Send licensing offer to Company B",date:"2026-04-17",priority:"Medium",done:false},
    {id:26,matter:"Wang Patent Portfolio Licensing",description:"Claim chart completion — all licensees",date:"2026-04-29",priority:"High",done:false},
    {id:27,matter:"Thompson Child Custody Modification",description:"GAL interview date",date:"2026-04-24",priority:"High",done:false},
    {id:28,matter:"Thompson Child Custody Modification",description:"File modification petition",date:"2026-04-08",priority:"High",done:true},
    {id:29,matter:"Greenfield Energy Corp — SEC Investigation",description:"Privilege log submission to SEC",date:"2026-04-21",priority:"High",done:false},
    {id:30,matter:"Greenfield Energy Corp — SEC Investigation",description:"Document production deadline",date:"2026-04-07",priority:"High",done:false},
    {id:31,matter:"Orozco DUI Defense",description:"Arraignment hearing",date:"2026-04-16",priority:"High",done:false},
    {id:32,matter:"CloudNine SaaS — Series A Financing",description:"SPA execution deadline",date:"2026-04-22",priority:"High",done:false},
    {id:33,matter:"CloudNine SaaS — Series A Financing",description:"Board consent resolution",date:"2026-04-14",priority:"Medium",done:false},
    {id:34,matter:"Baker v. Statewide Insurance Co. — Bad Faith Claim",description:"Demand letter to insurer",date:"2026-04-13",priority:"High",done:false},
    {id:35,matter:"Baker v. Statewide Insurance Co. — Bad Faith Claim",description:"Expert disclosure deadline",date:"2026-05-10",priority:"Medium",done:false},
    {id:36,matter:"Kenji Tanaka — Trademark Infringement",description:"TTAB opposition filing",date:"2026-04-19",priority:"High",done:false},
    {id:37,matter:"Delgado Estate Administration",description:"Creditor claims hearing",date:"2026-04-26",priority:"High",done:false},
    {id:38,matter:"Delgado Estate Administration",description:"Beneficiary notification deadline",date:"2026-04-10",priority:"Medium",done:false},
    {id:39,matter:"Preston Commercial REIT — 1031 Exchange",description:"45-day property identification deadline",date:"2026-04-18",priority:"High",done:false},
    {id:40,matter:"Preston Commercial REIT — 1031 Exchange",description:"180-day exchange closing deadline",date:"2026-07-24",priority:"Medium",done:false},
    {id:41,matter:"People v. DeSantis — Embezzlement",description:"Preliminary hearing",date:"2026-04-27",priority:"High",done:false},
    {id:42,matter:"People v. DeSantis — Embezzlement",description:"Defense expert report due",date:"2026-04-20",priority:"High",done:false},
    {id:43,matter:"NovaMed Pharma — FDA Compliance Review",description:"Pre-submission meeting with FDA",date:"2026-05-08",priority:"High",done:false},
    {id:44,matter:"NovaMed Pharma — FDA Compliance Review",description:"Facility B audit completion",date:"2026-04-15",priority:"Medium",done:false},
    {id:45,matter:"Foster v. Foster — High-Asset Divorce",description:"Business valuation reports due",date:"2026-04-23",priority:"High",done:false},
    {id:46,matter:"Foster v. Foster — High-Asset Divorce",description:"Deposition of husband's partner",date:"2026-05-02",priority:"Medium",done:false},
    {id:47,matter:"Atlas Construction Wage & Hour Class Action",description:"Mediation / settlement conference",date:"2026-05-06",priority:"High",done:false},
    {id:48,matter:"Atlas Construction Wage & Hour Class Action",description:"Damages calculation due",date:"2026-04-16",priority:"High",done:false},
    {id:49,matter:"Patel v. GlobeTech — Discrimination & Retaliation",description:"90-day filing deadline (complaint)",date:"2026-04-11",priority:"High",done:false},
    {id:50,matter:"ByteForge Acqui-hire by Datastream Corp",description:"IP assignment clean-up",date:"2026-04-17",priority:"High",done:false},
    {id:51,matter:"ByteForge Acqui-hire by Datastream Corp",description:"Closing target date",date:"2026-04-30",priority:"Medium",done:false},
    {id:52,matter:"Davis v. Metro Transit Authority — Slip & Fall",description:"File demand letter",date:"2026-04-14",priority:"Medium",done:false},
    {id:53,matter:"Davis v. Metro Transit Authority — Slip & Fall",description:"Statute of limitations",date:"2027-02-20",priority:"Low",done:false},
    {id:54,matter:"Kim Trademark Registration — BOBA BLISS",description:"Office action response deadline",date:"2026-04-25",priority:"High",done:false},
    {id:55,matter:"Ortega Workers' Comp Appeal",description:"WCAB appeal hearing",date:"2026-04-29",priority:"High",done:false},
    {id:56,matter:"Ortega Workers' Comp Appeal",description:"IME report submission",date:"2026-04-09",priority:"High",done:true},
    {id:57,matter:"Sterling Hotel Group — Franchise Agreement Review",description:"FDD filing deadline — Texas",date:"2026-04-22",priority:"High",done:false},
    {id:58,matter:"Rodriguez v. ABC Staffing — Misclassification",description:"File wage claim with DLSE",date:"2026-04-15",priority:"High",done:false},
    {id:59,matter:"Rodriguez v. ABC Staffing — Misclassification",description:"Back wages calculation deadline",date:"2026-04-06",priority:"Medium",done:false},
    {id:60,matter:"Clearwater HOA — Governing Documents Amendment",description:"Homeowner vote deadline",date:"2026-05-15",priority:"Medium",done:false},
    {id:61,matter:"People v. Nguyen — Drug Possession",description:"Diversion motion hearing",date:"2026-04-21",priority:"High",done:false},
    {id:62,matter:"Sato v. NexGen Robotics — Product Liability",description:"Expert disclosure deadline",date:"2026-04-28",priority:"High",done:false},
    {id:63,matter:"Sato v. NexGen Robotics — Product Liability",description:"Motion to compel internal docs",date:"2026-04-13",priority:"High",done:false},
    {id:64,matter:"Apex Ventures — Fund Formation",description:"LPA execution by anchor LPs",date:"2026-04-24",priority:"High",done:false},
    {id:65,matter:"Apex Ventures — Fund Formation",description:"Form D filing with SEC",date:"2026-05-01",priority:"Medium",done:false},
    {id:66,matter:"Yamamoto Copyright Infringement — Photography",description:"File federal complaint",date:"2026-04-18",priority:"High",done:false},
    {id:67,matter:"Yamamoto Copyright Infringement — Photography",description:"Copyright registration approval",date:"2026-04-10",priority:"Medium",done:true},
    {id:68,matter:"Brennan v. Brennan — Custody Mediation",description:"Court-ordered mediation session",date:"2026-05-12",priority:"Medium",done:false},
    {id:69,matter:"Pacific Lumber Co. — Environmental Compliance",description:"Remediation plan due to EPA",date:"2026-04-20",priority:"High",done:false},
    {id:70,matter:"Pacific Lumber Co. — Environmental Compliance",description:"Fine negotiation meeting",date:"2026-05-05",priority:"Medium",done:false},
    {id:71,matter:"Chen v. Golden State University — Title IX",description:"Subpoena for prior complaints",date:"2026-04-16",priority:"High",done:false},
    {id:72,matter:"Chen v. Golden State University — Title IX",description:"File administrative complaint",date:"2026-04-09",priority:"High",done:false},
    {id:73,matter:"Vanguard Real Estate Fund II — Joint Venture",description:"JV agreement execution",date:"2026-04-28",priority:"High",done:false},
    {id:74,matter:"Torres FLSA Collective Action — Restaurant Workers",description:"Depose regional managers",date:"2026-04-23",priority:"Medium",done:false},
    {id:75,matter:"Torres FLSA Collective Action — Restaurant Workers",description:"Discovery cutoff",date:"2026-05-20",priority:"High",done:false},
    {id:76,matter:"People v. Harris — Assault & Battery",description:"Trial date",date:"2026-05-04",priority:"High",done:false},
    {id:77,matter:"People v. Harris — Assault & Battery",description:"File defense jury instructions",date:"2026-04-27",priority:"High",done:false},
    {id:78,matter:"Meadowbrook Senior Living — Licensing Dispute",description:"Corrective action plan due",date:"2026-04-19",priority:"High",done:false},
    {id:79,matter:"Meadowbrook Senior Living — Licensing Dispute",description:"Licensing board hearing",date:"2026-05-10",priority:"High",done:false},
  ];

  const [cases,     setCasesRaw]    = useState(()=>load("lt_cases",    INIT_CASES));
  const [timeLogs,  setTimeLogsRaw] = useState(()=>load("lt_timeLogs", INIT_LOGS));
  const [deadlines, setDeadlinesRaw]= useState(()=>load("lt_deadlines",INIT_DL));

  const [deletedCases,    setDeletedCasesRaw]    = useState(()=>load("lt_delCases",    []));
  const [deletedTimeLogs, setDeletedTimeLogsRaw] = useState(()=>load("lt_delTimeLogs", []));
  const [deletedDeadlines,setDeletedDeadlinesRaw]= useState(()=>load("lt_delDeadlines",[]));

  const persist = (key, setter, current) => v => {
    setter(v);
    const val = typeof v==="function" ? v(current) : v;
    localStorage.setItem(key, JSON.stringify(val));
  };
  const setCases     = persist("lt_cases",     setCasesRaw,     cases);
  const setTimeLogs  = persist("lt_timeLogs",  setTimeLogsRaw,  timeLogs);
  const setDeadlines = persist("lt_deadlines", setDeadlinesRaw, deadlines);
  const setDeletedCases     = persist("lt_delCases",     setDeletedCasesRaw,     deletedCases);
  const setDeletedTimeLogs  = persist("lt_delTimeLogs",  setDeletedTimeLogsRaw,  deletedTimeLogs);
  const setDeletedDeadlines = persist("lt_delDeadlines", setDeletedDeadlinesRaw, deletedDeadlines);

  const LANGS = [
    { code:"en", flag:"🇺🇸", label:"EN" },
    { code:"es", flag:"🇪🇸", label:"ES" },
  ];

  const switchLang = (code) => {
    setLang(code); localStorage.setItem("lt_lang", code);
  };

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="bg-white border-b border-stone-200/60 px-4 sm:px-8 py-4 flex items-center gap-3 sm:gap-5 shadow-surface">
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
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 py-6 sm:py-8">
        <div className="flex gap-1 mb-8 bg-stone-200/50 rounded-xl p-1 w-fit flex-wrap shadow-inner">
          {t.tabs.map((label,i)=>(
            <button key={i} onClick={()=>setTab(i)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab===i?"bg-white text-slate-800 shadow-btn":"text-stone-500 hover:text-slate-700 hover:bg-white/40"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-stone-200/40 p-4 sm:p-8 shadow-surface-md">
          {tab===0 && <DashboardTab cases={cases} timeLogs={timeLogs} deadlines={deadlines} setDeadlines={setDeadlines} t={t}/>}
          {tab===1 && <CasesTab cases={cases} setCases={setCases} deadlines={deadlines} setDeadlines={setDeadlines} timeLogs={timeLogs} deletedCases={deletedCases} setDeletedCases={setDeletedCases} t={t}/>}
          {tab===2 && <TimeLogTab timeLogs={timeLogs} setTimeLogs={setTimeLogs} cases={cases} deletedTimeLogs={deletedTimeLogs} setDeletedTimeLogs={setDeletedTimeLogs} t={t}/>}
          {tab===3 && <DeadlinesTab deadlines={deadlines} setDeadlines={setDeadlines} cases={cases} deletedDeadlines={deletedDeadlines} setDeletedDeadlines={setDeletedDeadlines} t={t}/>}
          {tab===4 && <CalendarTab deadlines={deadlines} setDeadlines={setDeadlines} cases={cases} t={t}/>}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
