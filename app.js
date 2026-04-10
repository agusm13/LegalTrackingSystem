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
    areas:["Litigios","Corporativo","Familia","Penal","Bienes Raíces","PI","Laboral","Otro"],
    statuses:["Activo","Pendiente","Cerrado","En Espera"],
    priorities:["Alta","Media","Baja"],
  },
  fr: {
    appName:"LegalTrack", appSub:"Système de Productivité Juridique",
    tabs:["Tableau de bord","Dossiers","Journal de temps","Échéances"],
    dashboard:"Tableau de bord", cases:"Dossiers", timeLog:"Journal de temps", deadlines:"Échéances",
    activeMatt:"Dossiers Actifs", totalHrs:"Heures Totales", unbilledVal:"Non Facturé", overdueItems:"En Retard",
    upcomingDL:"Prochaines Échéances", byArea:"Dossiers par Domaine", overdueHdr:"⚠ En Retard",
    noDL:"Aucune échéance à venir", noMatters:"Aucun dossier",
    newMatter:"+ Nouveau Dossier", exportCSV:"⬇ Exporter CSV", addDeadline:"+ Ajouter Échéance", logTime:"+ Saisir Temps",
    save:"Enregistrer", cancel:"Annuler", delete:"Supprimer",
    matterName:"Nom du Dossier", client:"Client", attorney:"Avocat / Parajuriste", opened:"Ouvert le",
    area:"Domaine", status:"Statut", notes:"Notes", searchPH:"Rechercher un dossier ou client...",
    allStatus:"Tous", date:"Date", task:"Description de la Tâche", hours:"Heures", rate:"Taux Horaire (€)",
    matter:"Dossier", value:"Valeur", billed:"Facturé", unbilled:"Non Facturé",
    description:"Description", priority:"Priorité", dueDate:"Date Limite",
    saveMatter:"Enregistrer Dossier", saveEntry:"Enregistrer Entrée", saveDeadline:"Enregistrer Échéance",
    newMatterTitle:"Nouveau Dossier", logTimeTitle:"Saisir Temps", addDLTitle:"Ajouter Échéance",
    noMattersFound:"Aucun dossier trouvé", noEntries:"Aucune entrée",
    done:"Terminé", today:"Aujourd'hui!", overdue:"j de retard", left:"j restants",
    caseDetail:"Détail du Dossier", back:"← Retour aux Dossiers", summary:"Résumé / Notes Étendues",
    summaryPH:"Rédigez un résumé détaillé, notes de stratégie, contexte...",
    documents:"Documents", uploadDoc:"Téléverser Document", noDocuments:"Aucun document téléversé.",
    uploadedOn:"Téléversé le", fileSize:"Taille", download:"Télécharger", confirmDel:"Supprimer ce document ?",
    saveSummary:"Enregistrer Résumé", summarySaved:"✓ Enregistré",
    areas:["Contentieux","Corporate","Famille","Pénal","Immobilier","PI","Social","Autre"],
    statuses:["Actif","En attente","Clôturé","En suspens"],
    priorities:["Haute","Moyenne","Basse"],
  }
};

const BADGE_COLORS = {
  Active:"bg-green-100 text-green-800", Activo:"bg-green-100 text-green-800", Actif:"bg-green-100 text-green-800",
  Pending:"bg-yellow-100 text-yellow-800", Pendiente:"bg-yellow-100 text-yellow-800", "En attente":"bg-yellow-100 text-yellow-800",
  Closed:"bg-gray-100 text-gray-700", Cerrado:"bg-gray-100 text-gray-700", "Clôturé":"bg-gray-100 text-gray-700",
  "On Hold":"bg-orange-100 text-orange-800", "En Espera":"bg-orange-100 text-orange-800", "En suspens":"bg-orange-100 text-orange-800",
  High:"bg-red-100 text-red-700", Alta:"bg-red-100 text-red-700", Haute:"bg-red-100 text-red-700",
  Medium:"bg-yellow-100 text-yellow-700", Media:"bg-yellow-100 text-yellow-700", Moyenne:"bg-yellow-100 text-yellow-700",
  Low:"bg-blue-100 text-blue-700", Baja:"bg-blue-100 text-blue-700", Basse:"bg-blue-100 text-blue-700",
};

const fmt = n => isNaN(n) ? "0" : Number(n).toLocaleString();
const fmtSize = b => b < 1024 ? b+"B" : b < 1048576 ? (b/1024).toFixed(1)+"KB" : (b/1048576).toFixed(1)+"MB";

const Badge = ({label}) => <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${BADGE_COLORS[label]||"bg-gray-100 text-gray-600"}`}>{label}</span>;
const Inp = p => <input className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-400" {...p}/>;
const Sel = ({children,...p}) => <select className="border border-gray-300 rounded px-2 py-1 text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-400" {...p}>{children}</select>;
const Btn = ({children,onClick,variant="primary",small,disabled}) => {
  const sz = small?"px-2 py-1 text-xs":"px-3 py-1.5 text-sm";
  const v = variant==="primary"?"bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          : variant==="danger" ?"bg-red-500 text-white hover:bg-red-600"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300";
  return <button disabled={disabled} className={`rounded font-medium transition-colors ${sz} ${v}`} onClick={onClick}>{children}</button>;
};
const Modal = ({title,onClose,children}) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">&times;</button>
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
function CaseDetail({ c, onBack, onUpdate, t }) {
  const [summary, setSummary] = useState(c.summary || "");
  const [savedMsg, setSavedMsg] = useState(false);
  const [docs, setDocs] = useState(c.documents || []);
  const fileRef = useRef();

  const saveSummary = () => {
    onUpdate({ ...c, summary });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

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
      <button onClick={onBack} className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 flex items-center gap-1">{t.back}</button>

      {/* Header */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">
        <div className="flex flex-wrap gap-3 items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-800">{c.matter}</h2>
            <p className="text-sm text-gray-600 mt-1">{c.client} · {c.area} · {c.attorney}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Badge label={c.status}/>
            <span className="text-xs text-gray-400">{t.opened}: {c.opened}</span>
          </div>
        </div>
        {c.notes && <p className="text-sm text-gray-500 mt-2 italic">"{c.notes}"</p>}
      </div>

      {/* Summary */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-5">
        <h3 className="font-bold text-gray-700 mb-2 text-sm uppercase tracking-wide">📋 {t.summary}</h3>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
          rows={6}
          placeholder={t.summaryPH}
          value={summary}
          onChange={e => setSummary(e.target.value)}
        />
        <div className="flex justify-end items-center gap-3 mt-2">
          {savedMsg && <span className="text-green-600 text-sm font-medium">{t.summarySaved}</span>}
          <Btn onClick={saveSummary}>{t.saveSummary}</Btn>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-700 text-sm uppercase tracking-wide">📁 {t.documents}</h3>
          <div>
            <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFileUpload} />
            <Btn onClick={() => fileRef.current.click()}>{t.uploadDoc}</Btn>
          </div>
        </div>

        {docs.length === 0
          ? <div className="text-gray-400 text-sm py-6 text-center border-2 border-dashed border-gray-200 rounded-lg">{t.noDocuments}</div>
          : <div className="space-y-2">
              {docs.map(doc => (
                <div key={doc.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <span className="text-2xl">{fileIcon(doc.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-800 truncate">{doc.name}</div>
                    <div className="text-xs text-gray-400">{t.uploadedOn}: {doc.uploadedAt} · {t.fileSize}: {fmtSize(doc.size)}</div>
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
function CasesTab({ cases, setCases, t }) {
  const [showForm, setShowForm] = useState(false);
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

  const save = () => {
    if (!form.matter || !form.client) return;
    setCases(p => [...p, { ...form, id: Date.now() }]);
    setShowForm(false); setForm(empty);
  };

  const updateCase = updated => setCases(p => p.map(c => c.id === updated.id ? updated : c));

  if (selectedCase) return <CaseDetail c={selectedCase} onBack={() => setSelectedCase(null)} onUpdate={updateCase} t={t}/>;

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <Inp placeholder={t.searchPH} value={search} onChange={e=>setSearch(e.target.value)} style={{maxWidth:220}}/>
        <Sel value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} style={{maxWidth:150}}>
          <option value="all">{t.allStatus}</option>
          {t.statuses.map(s=><option key={s} value={s}>{s}</option>)}
        </Sel>
        <div className="ml-auto flex gap-2">
          <Btn variant="secondary" onClick={()=>downloadCSV("cases.csv",cases,["matter","client","area","attorney","status","opened","notes"])}>{t.exportCSV}</Btn>
          <Btn onClick={()=>setShowForm(true)}>{t.newMatter}</Btn>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-left text-gray-600 border-b">
            {[t.matterName,t.client,t.area,t.attorney,t.status,t.opened,t.notes,""].map(h=>(
              <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.length===0 && <tr><td colSpan={8} className="text-center py-8 text-gray-400">{t.noMattersFound}</td></tr>}
            {filtered.map(c=>(
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">
                  <button onClick={()=>setSelectedCase(c)} className="font-medium text-blue-700 hover:underline text-left">{c.matter}</button>
                  {c.documents?.length>0 && <span className="ml-2 text-xs bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded-full">📎 {c.documents.length}</span>}
                </td>
                <td className="px-3 py-2">{c.client}</td>
                <td className="px-3 py-2">{c.area}</td>
                <td className="px-3 py-2">{c.attorney}</td>
                <td className="px-3 py-2"><Badge label={c.status}/></td>
                <td className="px-3 py-2 whitespace-nowrap">{c.opened}</td>
                <td className="px-3 py-2 text-gray-500 max-w-xs truncate">{c.notes}</td>
                <td className="px-3 py-2"><Btn variant="danger" small onClick={()=>setCases(p=>p.filter(x=>x.id!==c.id))}>✕</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <Modal title={t.newMatterTitle} onClose={()=>setShowForm(false)}>
          <div className="grid grid-cols-2 gap-3">
            {[[t.matterName,"matter"],[t.client,"client"],[t.attorney,"attorney"],[t.opened,"opened","date"]].map(([label,key,type])=>(
              <div key={key}><label className="text-xs text-gray-500 mb-1 block">{label}</label><Inp type={type||"text"} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))}/></div>
            ))}
            <div><label className="text-xs text-gray-500 mb-1 block">{t.area}</label>
              <Sel value={form.area} onChange={e=>setForm(f=>({...f,area:e.target.value}))}>{t.areas.map(a=><option key={a}>{a}</option>)}</Sel>
            </div>
            <div><label className="text-xs text-gray-500 mb-1 block">{t.status}</label>
              <Sel value={form.status} onChange={e=>setForm(f=>({...f,status:e.target.value}))}>{t.statuses.map(s=><option key={s}>{s}</option>)}</Sel>
            </div>
            <div className="col-span-2"><label className="text-xs text-gray-500 mb-1 block">{t.notes}</label><Inp value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))}/></div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Btn variant="secondary" onClick={()=>setShowForm(false)}>{t.cancel}</Btn>
            <Btn onClick={save}>{t.saveMatter}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── TIME LOG TAB ──
function TimeLogTab({ timeLogs, setTimeLogs, cases, t }) {
  const [showForm, setShowForm] = useState(false);
  const [filterAttorney, setFilterAttorney] = useState("all");
  const empty = { date:new Date().toISOString().slice(0,10), matter:"", attorney:"", task:"", hours:"", rate:"", billed:false };
  const [form, setForm] = useState(empty);

  const attorneys = [...new Set(timeLogs.map(l=>l.attorney).filter(Boolean))].sort();
  const filtered = filterAttorney === "all" ? timeLogs : timeLogs.filter(l=>l.attorney===filterAttorney);

  const totalHours = filtered.reduce((s,l)=>s+l.hours,0);
  const totalValue = filtered.reduce((s,l)=>s+l.hours*l.rate,0);
  const unbilled   = filtered.filter(l=>!l.billed).reduce((s,l)=>s+l.hours*l.rate,0);
  const save = () => {
    if (!form.matter||!form.hours) return;
    setTimeLogs(p=>[...p,{...form,id:Date.now(),hours:parseFloat(form.hours),rate:parseFloat(form.rate)||0}]);
    setShowForm(false); setForm(empty);
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[[t.totalHrs,totalHours.toFixed(1)+" hrs"],[t.unbilledVal,"$"+fmt(totalValue)],["Unbilled","$"+fmt(unbilled)]].map(([label,val])=>(
          <div key={label} className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-xs text-blue-500 font-semibold uppercase">{label}</div>
            <div className="text-xl font-bold text-blue-800 mt-1">{val}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-3 items-center">
        <Sel value={filterAttorney} onChange={e=>setFilterAttorney(e.target.value)} style={{maxWidth:200}}>
          <option value="all">{t.allStatus} {t.attorney}</option>
          {attorneys.map(a=><option key={a} value={a}>{a}</option>)}
        </Sel>
        <div className="ml-auto flex gap-2">
          <Btn variant="secondary" onClick={()=>downloadCSV("timelog.csv",filtered,["date","matter","attorney","task","hours","rate","billed"])}>{t.exportCSV}</Btn>
          <Btn onClick={()=>setShowForm(true)}>{t.logTime}</Btn>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-left text-gray-600 border-b">
            {[t.date,t.matter,t.attorney,t.task,t.hours,t.rate,t.value,t.billed,""].map(h=>(
              <th key={h} className="px-3 py-2 font-semibold whitespace-nowrap">{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {filtered.length===0&&<tr><td colSpan={9} className="text-center py-8 text-gray-400">{t.noEntries}</td></tr>}
            {filtered.map(l=>(
              <tr key={l.id} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2 whitespace-nowrap">{l.date}</td>
                <td className="px-3 py-2 text-blue-700 font-medium">{l.matter}</td>
                <td className="px-3 py-2">{l.attorney}</td>
                <td className="px-3 py-2">{l.task}</td>
                <td className="px-3 py-2">{l.hours}</td>
                <td className="px-3 py-2">${l.rate}/hr</td>
                <td className="px-3 py-2 font-medium">${fmt(l.hours*l.rate)}</td>
                <td className="px-3 py-2">
                  <button onClick={()=>setTimeLogs(p=>p.map(x=>x.id===l.id?{...x,billed:!x.billed}:x))}
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${l.billed?"bg-green-100 text-green-700":"bg-gray-100 text-gray-500"}`}>
                    {l.billed?"✓ "+t.billed:t.unbilled}
                  </button>
                </td>
                <td className="px-3 py-2"><Btn variant="danger" small onClick={()=>setTimeLogs(p=>p.filter(x=>x.id!==l.id))}>✕</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm&&(
        <Modal title={t.logTimeTitle} onClose={()=>setShowForm(false)}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-gray-500 mb-1 block">{t.date}</label><Inp type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div>
            <div><label className="text-xs text-gray-500 mb-1 block">{t.matter}</label>
              <Sel value={form.matter} onChange={e=>setForm(f=>({...f,matter:e.target.value}))}>
                <option value="">Select...</option>{cases.map(c=><option key={c.id}>{c.matter}</option>)}
              </Sel>
            </div>
            <div><label className="text-xs text-gray-500 mb-1 block">{t.attorney}</label><Inp value={form.attorney} onChange={e=>setForm(f=>({...f,attorney:e.target.value}))}/></div>
            <div><label className="text-xs text-gray-500 mb-1 block">{t.task}</label><Inp value={form.task} onChange={e=>setForm(f=>({...f,task:e.target.value}))}/></div>
            <div><label className="text-xs text-gray-500 mb-1 block">{t.hours}</label><Inp type="number" step="0.25" value={form.hours} onChange={e=>setForm(f=>({...f,hours:e.target.value}))}/></div>
            <div><label className="text-xs text-gray-500 mb-1 block">{t.rate}</label><Inp type="number" value={form.rate} onChange={e=>setForm(f=>({...f,rate:e.target.value}))}/></div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Btn variant="secondary" onClick={()=>setShowForm(false)}>{t.cancel}</Btn>
            <Btn onClick={save}>{t.saveEntry}</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── DEADLINES TAB ──
function DeadlinesTab({ deadlines, setDeadlines, cases, t }) {
  const [showForm, setShowForm] = useState(false);
  const empty = { matter:"", description:"", date:"", priority:t.priorities[0], done:false };
  const [form, setForm] = useState(empty);
  const today = new Date().toISOString().slice(0,10);
  const diff = d => Math.ceil((new Date(d)-new Date(today))/86400000);
  const save = () => {
    if (!form.matter||!form.date||!form.description) return;
    setDeadlines(p=>[...p,{...form,id:Date.now()}]);
    setShowForm(false); setForm(empty);
  };
  return (
    <div>
      <div className="flex justify-end gap-2 mb-3">
        <Btn variant="secondary" onClick={()=>downloadCSV("deadlines.csv",deadlines,["matter","description","date","priority","done"])}>{t.exportCSV}</Btn>
        <Btn onClick={()=>setShowForm(true)}>{t.addDeadline}</Btn>
      </div>
      <div className="space-y-2">
        {[...deadlines].sort((a,b)=>a.date.localeCompare(b.date)).map(d=>{
          const dv=diff(d.date), overdue=dv<0&&!d.done, soon=dv>=0&&dv<=7&&!d.done;
          return (
            <div key={d.id} className={`flex items-center gap-3 p-3 rounded-lg border ${d.done?"bg-gray-50 opacity-60":overdue?"bg-red-50 border-red-200":soon?"bg-yellow-50 border-yellow-200":"bg-white border-gray-200"}`}>
              <input type="checkbox" checked={d.done} onChange={()=>setDeadlines(p=>p.map(x=>x.id===d.id?{...x,done:!x.done}:x))} className="w-4 h-4 accent-blue-600 cursor-pointer"/>
              <div className="flex-1 min-w-0">
                <div className={`font-medium text-sm ${d.done?"line-through text-gray-400":"text-gray-800"}`}>{d.description}</div>
                <div className="text-xs text-gray-500 mt-0.5">{d.matter}</div>
              </div>
              <Badge label={d.priority}/>
              <div className="text-right min-w-fit">
                <div className="text-sm font-semibold text-gray-700">{d.date}</div>
                <div className={`text-xs ${overdue?"text-red-600 font-bold":soon?"text-yellow-700 font-semibold":"text-gray-400"}`}>
                  {d.done?t.done:overdue?Math.abs(dv)+t.overdue:dv===0?t.today:dv+t.left}
                </div>
              </div>
              <Btn variant="danger" small onClick={()=>setDeadlines(p=>p.filter(x=>x.id!==d.id))}>✕</Btn>
            </div>
          );
        })}
      </div>
      {showForm&&(
        <Modal title={t.addDLTitle} onClose={()=>setShowForm(false)}>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="text-xs text-gray-500 mb-1 block">{t.matter}</label>
              <Sel value={form.matter} onChange={e=>setForm(f=>({...f,matter:e.target.value}))}>
                <option value="">Select...</option>{cases.map(c=><option key={c.id}>{c.matter}</option>)}
              </Sel>
            </div>
            <div><label className="text-xs text-gray-500 mb-1 block">{t.dueDate}</label><Inp type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div>
            <div className="col-span-2"><label className="text-xs text-gray-500 mb-1 block">{t.description}</label><Inp value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} placeholder="e.g. File motion to compel"/></div>
            <div><label className="text-xs text-gray-500 mb-1 block">{t.priority}</label>
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
  const upcoming = deadlines.filter(d=>!d.done&&d.date>=today).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5);
  const byArea   = cases.reduce((acc,c)=>({...acc,[c.area]:(acc[c.area]||0)+1}),{});
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[[t.activeMatt,active,"text-blue-700","bg-blue-50"],[t.totalHrs,totalHrs.toFixed(1),"text-purple-700","bg-purple-50"],[t.unbilledVal,"$"+fmt(unbilled),"text-green-700","bg-green-50"],[t.overdueItems,overdue.length,"text-red-700","bg-red-50"]].map(([label,val,tc,bg])=>(
          <div key={label} className={`${bg} rounded-xl p-4 text-center`}>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">{label}</div>
            <div className={`text-2xl font-bold ${tc}`}>{val}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">{t.upcomingDL}</h3>
          {upcoming.length===0&&<div className="text-gray-400 text-sm">{t.noDL}</div>}
          <div className="space-y-2">
            {upcoming.map(d=>{
              const dv=Math.ceil((new Date(d.date)-new Date(today))/86400000);
              return (
                <div key={d.id} className="flex justify-between items-center text-sm border-b pb-1 last:border-0">
                  <div><span className="font-medium text-gray-800">{d.description}</span><span className="text-gray-400 ml-1 text-xs">— {d.matter}</span></div>
                  <div className="flex items-center gap-2"><Badge label={d.priority}/><span className={`text-xs font-semibold ${dv<=3?"text-red-600":dv<=7?"text-yellow-600":"text-gray-500"}`}>{dv}d</span></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">{t.byArea}</h3>
          {Object.keys(byArea).length===0&&<div className="text-gray-400 text-sm">{t.noMatters}</div>}
          <div className="space-y-2">
            {Object.entries(byArea).sort((a,b)=>b[1]-a[1]).map(([area,count])=>(
              <div key={area} className="flex items-center gap-2">
                <div className="text-sm text-gray-700 w-28 shrink-0">{area}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{width:`${(count/cases.length)*100}%`}}/></div>
                <div className="text-xs font-bold text-gray-500 w-4">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {overdue.length>0&&(
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <h3 className="font-bold text-red-700 mb-2 text-sm uppercase tracking-wide">{t.overdueHdr}</h3>
          <div className="space-y-1">
            {overdue.map(d=>(
              <div key={d.id} className="flex justify-between text-sm">
                <span className="text-red-800 font-medium">{d.description} <span className="text-red-400 font-normal">— {d.matter}</span></span>
                <span className="text-red-600 font-bold">{d.date}</span>
              </div>
            ))}
          </div>
        </div>
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
    { code:"fr", flag:"🇫🇷", label:"FR" },
  ];

  const switchLang = (code) => {
    setLang(code); localStorage.setItem("lt_lang", code);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm">
        <div className="text-blue-700 font-bold text-lg">⚖ {t.appName}</div>
        <div className="text-gray-300 text-lg">|</div>
        <div className="text-gray-500 text-sm hidden sm:block">{t.appSub}</div>
        <div className="ml-auto">
          <select value={lang} onChange={e=>switchLang(e.target.value)}
            className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer">
            {LANGS.map(l=><option key={l.code} value={l.code}>{l.flag} {l.label}</option>)}
          </select>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex gap-1 mb-5 bg-gray-100 rounded-lg p-1 w-fit flex-wrap">
          {t.tabs.map((label,i)=>(
            <button key={i} onClick={()=>setTab(i)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${tab===i?"bg-white text-blue-700 shadow-sm":"text-gray-500 hover:text-gray-700"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          {tab===0 && <DashboardTab cases={cases} timeLogs={timeLogs} deadlines={deadlines} t={t}/>}
          {tab===1 && <CasesTab cases={cases} setCases={setCases} t={t}/>}
          {tab===2 && <TimeLogTab timeLogs={timeLogs} setTimeLogs={setTimeLogs} cases={cases} t={t}/>}
          {tab===3 && <DeadlinesTab deadlines={deadlines} setDeadlines={setDeadlines} cases={cases} t={t}/>}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
