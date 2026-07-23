// ================================================================
// ESTADO
// ================================================================
const STORAGE_KEY   = 'spirit-azul-verde-v1';
const CURRENT_KEY   = 'spirit-azul-verde-current';
const DIST_KEY      = 'spirit-azul-verde-distribuidoras-v1';

function defaultState() {
  return {
    id: Date.now().toString(),
    cliente: {
      nome: '', cnpj: '', responsavel: '', endereco: '', cidade: '', cep: '',
      distribuidora: 'CELESC', distribuidoraId: 'celesc',
      uc: '', classe: 'A4', modalidadeAtual: 'VERDE',
      demandaContratadaPonta: 0, demandaContratadaForaPonta: 0, obs: '',
    },
    tarifas: {
      azul:  { demandaPonta: 38.06, demandaForaPonta: 18.09, tusdPonta: 0.14435, tusdForaPonta: 0.14435, tePonta: 0.48363, teForaPonta: 0.30123, ultrapassagem: 0 },
      verde: { demandaPonta: 0,     demandaForaPonta: 18.09, tusdPonta: 1.06941, tusdForaPonta: 0.14435, tePonta: 0.48363, teForaPonta: 0.30123, ultrapassagem: 0 },
    },
    consumo: Array.from({length: 12}, () => ({
      mes: '', demandaPonta: 0, demandaForaPonta: 0,
      ultrapassagemForaPonta: 0, consumoPonta: 0, consumoForaPonta: 0,
    })),
    tributos: { icmsPct: 17, pisCofinsPct: 1.98 },
  };
}

let state = defaultState();

function saveCurrent() {
  try { localStorage.setItem(CURRENT_KEY, JSON.stringify(state)); } catch(e) {}
}
function loadCurrent() {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      state = { ...defaultState(), ...s };
      ['cliente','tarifas','tributos'].forEach(k => {
        if (typeof defaultState()[k] === 'object' && !Array.isArray(defaultState()[k]))
          state[k] = { ...defaultState()[k], ...(s[k] || {}) };
      });
      if (s.tarifas) {
        state.tarifas.azul  = { ...defaultState().tarifas.azul,  ...(s.tarifas.azul  || {}) };
        state.tarifas.verde = { ...defaultState().tarifas.verde, ...(s.tarifas.verde || {}) };
      }
      if (s.consumo) state.consumo = s.consumo;
    }
  } catch(e) {}
}

// ================================================================
// DISTRIBUIDORAS
// ================================================================
let distribuidoras = [];

function defaultDistribuidoras() {
  return [
    { id: 'celesc', nome: 'CELESC', estado: 'SC',
      tarifas: {
        azul:  { demandaPonta: 38.06, demandaForaPonta: 18.09, tusdPonta: 0.14435, tusdForaPonta: 0.14435, tePonta: 0.48363, teForaPonta: 0.30123, ultrapassagem: 0 },
        verde: { demandaPonta: 0,     demandaForaPonta: 18.09, tusdPonta: 1.06941, tusdForaPonta: 0.14435, tePonta: 0.48363, teForaPonta: 0.30123, ultrapassagem: 0 },
      }},
    { id: 'copel', nome: 'COPEL', estado: 'PR',
      tarifas: {
        azul:  { demandaPonta: 0, demandaForaPonta: 0, tusdPonta: 0, tusdForaPonta: 0, tePonta: 0, teForaPonta: 0, ultrapassagem: 0 },
        verde: { demandaPonta: 0, demandaForaPonta: 0, tusdPonta: 0, tusdForaPonta: 0, tePonta: 0, teForaPonta: 0, ultrapassagem: 0 },
      }},
    { id: 'cemig', nome: 'CEMIG', estado: 'MG',
      tarifas: {
        azul:  { demandaPonta: 0, demandaForaPonta: 0, tusdPonta: 0, tusdForaPonta: 0, tePonta: 0, teForaPonta: 0, ultrapassagem: 0 },
        verde: { demandaPonta: 0, demandaForaPonta: 0, tusdPonta: 0, tusdForaPonta: 0, tePonta: 0, teForaPonta: 0, ultrapassagem: 0 },
      }},
    { id: 'cpfl', nome: 'CPFL Paulista', estado: 'SP',
      tarifas: {
        azul:  { demandaPonta: 0, demandaForaPonta: 0, tusdPonta: 0, tusdForaPonta: 0, tePonta: 0, teForaPonta: 0, ultrapassagem: 0 },
        verde: { demandaPonta: 0, demandaForaPonta: 0, tusdPonta: 0, tusdForaPonta: 0, tePonta: 0, teForaPonta: 0, ultrapassagem: 0 },
      }},
    { id: 'enel-sp', nome: 'ENEL SP', estado: 'SP',
      tarifas: {
        azul:  { demandaPonta: 0, demandaForaPonta: 0, tusdPonta: 0, tusdForaPonta: 0, tePonta: 0, teForaPonta: 0, ultrapassagem: 0 },
        verde: { demandaPonta: 0, demandaForaPonta: 0, tusdPonta: 0, tusdForaPonta: 0, tePonta: 0, teForaPonta: 0, ultrapassagem: 0 },
      }},
    { id: 'rge', nome: 'RGE', estado: 'RS',
      tarifas: {
        azul:  { demandaPonta: 0, demandaForaPonta: 0, tusdPonta: 0, tusdForaPonta: 0, tePonta: 0, teForaPonta: 0, ultrapassagem: 0 },
        verde: { demandaPonta: 0, demandaForaPonta: 0, tusdPonta: 0, tusdForaPonta: 0, tePonta: 0, teForaPonta: 0, ultrapassagem: 0 },
      }},
  ];
}

function loadDistribuidoras() {
  try {
    const raw = localStorage.getItem(DIST_KEY);
    if (raw) { distribuidoras = JSON.parse(raw); return; }
  } catch(e) {}
  distribuidoras = defaultDistribuidoras();
  saveDistribuidoras();
}
function saveDistribuidoras() {
  try { localStorage.setItem(DIST_KEY, JSON.stringify(distribuidoras)); } catch(e) {}
}

function renderDistribuidoraSelectors() {
  const current = state.cliente.distribuidoraId || '';
  ['distribuidoraSelect','distribuidoraSelectCliente'].forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    const placeholder = id === 'distribuidoraSelectCliente' ? '<option value="">— selecione —</option>' : '';
    sel.innerHTML = placeholder + distribuidoras.map(d =>
      `<option value="${d.id}" ${d.id === current ? 'selected':''}>${d.nome}${d.estado?' ('+d.estado+')':''}</option>`
    ).join('');
  });
  const d = distribuidoras.find(x => x.id === current);
  document.getElementById('distribuidoraNome').value = d ? d.nome : '';
  document.getElementById('distribuidoraEstado').value = d ? (d.estado||'') : '';
}

function applyDistribuidora(id) {
  const d = distribuidoras.find(x => x.id === id);
  if (!d) return;
  state.cliente.distribuidoraId = id;
  state.cliente.distribuidora   = d.nome;
  state.tarifas = JSON.parse(JSON.stringify(d.tarifas));
  saveCurrent(); bindAll(); renderDistribuidoraSelectors(); recalc();
}

function onDistribuidoraSelect(id) { if (id) applyDistribuidora(id); }

function saveDistribuidoraEdits() {
  const id = state.cliente.distribuidoraId;
  const nome = document.getElementById('distribuidoraNome').value.trim();
  const estado = document.getElementById('distribuidoraEstado').value.trim().toUpperCase();
  if (!nome) { alert('Informe o nome da distribuidora.'); return; }
  if (!id) { alert('Selecione uma distribuidora primeiro.'); return; }
  const d = distribuidoras.find(x => x.id === id);
  if (!d) return;
  d.nome = nome; d.estado = estado;
  d.tarifas = JSON.parse(JSON.stringify(state.tarifas));
  state.cliente.distribuidora = nome;
  saveDistribuidoras(); saveCurrent(); renderDistribuidoraSelectors();
  alert(`Distribuidora "${nome}" salva.`);
}

function addNewDistribuidora() {
  const nome = prompt('Nome da nova distribuidora:', '');
  if (!nome || !nome.trim()) return;
  const estado = (prompt('UF (estado, 2 letras):', '') || '').trim().toUpperCase().slice(0,2);
  const id = 'dist-' + Date.now();
  const emptyTarifas = () => ({ demandaPonta:0, demandaForaPonta:0, tusdPonta:0, tusdForaPonta:0, tePonta:0, teForaPonta:0, ultrapassagem:0 });
  const nova = { id, nome: nome.trim(), estado, tarifas: { azul: emptyTarifas(), verde: emptyTarifas() } };
  distribuidoras.push(nova);
  saveDistribuidoras();
  applyDistribuidora(id);
  alert(`"${nova.nome}" criada. Preencha as tarifas Azul e Verde e salve.`);
}

function deleteDistribuidora() {
  const id = state.cliente.distribuidoraId;
  if (!id) return;
  const d = distribuidoras.find(x => x.id === id);
  if (!d) return;
  if (distribuidoras.length <= 1) { alert('Mantenha ao menos uma distribuidora.'); return; }
  if (!confirm(`Excluir "${d.nome}"?`)) return;
  distribuidoras = distribuidoras.filter(x => x.id !== id);
  saveDistribuidoras();
  applyDistribuidora(distribuidoras[0].id);
}

// ================================================================
// NAVEGAÇÃO
// ================================================================
function switchTab(tab) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById('section-' + tab).classList.add('active');
  document.querySelector(`.tab[data-tab="${tab}"]`).classList.add('active');
  if (tab === 'resultado') recalc();
}

// ================================================================
// DATA BINDING
// ================================================================
function getPath(obj, path) { return path.split('.').reduce((o,k) => o==null?undefined:o[k], obj); }
function setPath(obj, path, val) {
  const keys = path.split('.'); const last = keys.pop();
  const target = keys.reduce((o,k) => (o[k]=o[k]||{}), obj);
  target[last] = val;
}
function bindAll() {
  document.querySelectorAll('[data-bind]').forEach(el => {
    const v = getPath(state, el.dataset.bind);
    if (v !== undefined && v !== null) el.value = v;
  });
}
document.addEventListener('input', e => {
  const el = e.target;
  if (el.dataset.bind) {
    const v = el.type === 'number' ? (el.value === '' ? '' : parseFloat(el.value) || 0) : el.value;
    setPath(state, el.dataset.bind, v);
    saveCurrent(); recalc();
  }
  if (el.dataset.bindConsumo) {
    const [idx, field] = el.dataset.bindConsumo.split(':');
    state.consumo[parseInt(idx)][field] = el.type === 'number' ? (parseFloat(el.value)||0) : el.value;
    saveCurrent(); recalc();
  }
});

// ================================================================
// TABELA DE CONSUMO
// ================================================================
function renderConsumoTable() {
  const tbody = document.getElementById('consumoBody');
  tbody.innerHTML = '';
  state.consumo.forEach((row, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" data-bind-consumo="${idx}:mes" value="${row.mes||''}" placeholder="mm/aaaa" style="text-align:left;width:100%;border:1px solid transparent;padding:4px 6px;border-radius:4px;background:transparent;font-family:inherit;font-size:13px;" onfocus="this.style.borderColor='var(--accent)';this.style.background='white';" onblur="this.style.borderColor='transparent';this.style.background='transparent'"></td>
      <td><input type="number" step="any" data-bind-consumo="${idx}:demandaPonta" value="${row.demandaPonta||''}"></td>
      <td><input type="number" step="any" data-bind-consumo="${idx}:demandaForaPonta" value="${row.demandaForaPonta||''}"></td>
      <td><input type="number" step="any" data-bind-consumo="${idx}:consumoPonta" value="${row.consumoPonta||''}"></td>
      <td><input type="number" step="any" data-bind-consumo="${idx}:consumoForaPonta" value="${row.consumoForaPonta||''}"></td>
      <td class="no-print" style="text-align:center;">
        <button type="button" onclick="deleteConsumoRow(${idx})"
          style="background:transparent;border:none;cursor:pointer;color:var(--danger);font-size:16px;padding:4px 6px;border-radius:4px;"
          onmouseover="this.style.background='#fbe6e6'" onmouseout="this.style.background='transparent'">🗑</button>
      </td>`;
    tbody.appendChild(tr);
  });
  updateConsumoAverages();
}

function deleteConsumoRow(idx) {
  state.consumo.splice(idx, 1);
  state.consumo.push({ mes:'', demandaPonta:0, demandaForaPonta:0, ultrapassagemForaPonta:0, consumoPonta:0, consumoForaPonta:0 });
  saveCurrent(); renderConsumoTable(); recalc();
}

function computeAverages() {
  const valid = state.consumo.filter(r =>
    (r.demandaPonta||0)>0 || (r.demandaForaPonta||0)>0 || (r.consumoPonta||0)>0 || (r.consumoForaPonta||0)>0
  );
  const N = valid.length || 1;
  const sum = k => valid.reduce((s,r) => s+(parseFloat(r[k])||0), 0);
  return {
    N,
    demandaPonta:           sum('demandaPonta') / N,
    demandaForaPonta:       sum('demandaForaPonta') / N,
    ultrapassagemForaPonta: sum('ultrapassagemForaPonta') / N,
    consumoPonta:           sum('consumoPonta') / N,
    consumoForaPonta:       sum('consumoForaPonta') / N,
  };
}

function updateConsumoAverages() {
  const avg = computeAverages();
  document.getElementById('avg-dp').textContent  = fmt(avg.demandaPonta, 1);
  document.getElementById('avg-dfp').textContent = fmt(avg.demandaForaPonta, 1);
  // avg-ufp removido da UI
  document.getElementById('avg-cp').textContent  = fmt(avg.consumoPonta, 0);
  document.getElementById('avg-cfp').textContent = fmt(avg.consumoForaPonta, 0);
}

// ================================================================
// CSV
// ================================================================
function exportarCSVConsumo() {
  const mesesPreenchidos = state.consumo.filter(r => r.mes || r.consumoForaPonta || r.consumoPonta);
  if (!mesesPreenchidos.length) { alert('Nenhum dado de consumo para exportar.'); return; }

  // Monta no formato histórico (linhas = grandezas, colunas = meses) — compatível com reimportação
  const meses = state.consumo.filter(r => r.mes).slice(0, 12);
  if (!meses.length) { alert('Nenhum mês com referência para exportar.'); return; }

  const br = v => String(v||0).replace('.', ',');
  const sep = ';';
  const header = ['Grandeza', ...meses.map(r => r.mes)].join(sep);

  const rows = [
    ['Consumo Fora Ponta (kWh)', ...meses.map(r => br(r.consumoForaPonta))].join(sep),
    ['Consumo Ponta (kWh)',      ...meses.map(r => br(r.consumoPonta))].join(sep),
    ['Demanda Fora Ponta (kW)',  ...meses.map(r => br(r.demandaForaPonta))].join(sep),
    ['Demanda Ponta (kW)',       ...meses.map(r => br(r.demandaPonta))].join(sep),
  ];

  const csv = [header, ...rows].join('\r\n');
  const nome = (state.cliente.nome || 'consumo').replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20);
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
  a.download = `historico_${nome}.csv`;
  a.click();
}

function downloadCSVTemplate() {
  const csv = 'mes,demanda_ponta,demanda_fora_ponta,ultrapassagem_fora_ponta,consumo_ponta,consumo_fora_ponta\n'
    + Array.from({length:12},(_,i)=>{
        const d = new Date(); d.setMonth(d.getMonth()-(11-i));
        return `${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()},0,0,0,0,0`;
      }).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download = 'modelo-consumo.csv'; a.click();
}

function importCSV(event) {
  const file = event.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const text = e.target.result;
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) { alert('CSV vazio ou inválido.'); return; }
    const sep = lines[0].includes(';') ? ';' : ',';

    // Converte número brasileiro "1.234,56" → float
    const brNum = s => parseFloat(String(s||'0').replace(/\./g,'').replace(',','.')) || 0;

    // Converte rótulo de mês histórico (MAR/26, FEV/26...) → MM/AAAA
    const mesMap = {JAN:'01',FEV:'02',MAR:'03',ABR:'04',MAI:'05',JUN:'06',
                    JUL:'07',AGO:'08',SET:'09',OUT:'10',NOV:'11',DEZ:'12'};
    const normMes = lbl => {
      // "Total Apurado (04/2026)" → "04/2026"
      const mm = lbl.match(/(\d{2}\/\d{4})/); if (mm) return mm[1];
      // "MAR/26" → "03/2026"
      const ab = lbl.match(/\b(JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)\/(\d{2})\b/i);
      if (ab) return `${mesMap[ab[1].toUpperCase()]}/${2000+parseInt(ab[2])}`;
      return lbl.trim();
    };

    const firstCell = lines[0].split(sep)[0].trim().toLowerCase();
    const isHistoricoFormat = firstCell.includes('grandeza');

    if (isHistoricoFormat) {
      // ── FORMATO HISTÓRICO (fatura): linhas = grandezas, colunas = meses ──────
      const hdr = lines[0].split(sep).map(h => h.trim());
      // Colunas de meses: índice 1=Leitura Anterior, 2=Leitura Atual, 3+=meses
      const mesCols = hdr.slice(1).map(normMes); // ["03/2026","02/2026",...]

      // Indexa cada linha por grandeza
      const rows = {};
      lines.slice(1).forEach(l => {
        const cols = l.split(sep);
        const nome = cols[0].toLowerCase();
        rows[nome] = cols.slice(1).map(brNum);
      });

      // Localiza linhas das 4 grandezas relevantes
      const findRow = (...keys) => {
        for (const k of Object.keys(rows)) {
          if (keys.some(kw => k.includes(kw))) return rows[k];
        }
        return [];
      };
      const cfpR = findRow('consumo fora ponta');
      const cpR  = findRow('consumo ponta');
      const dfpR = findRow('demanda fora ponta');
      const dpR  = findRow('demanda ponta');

      if (!cfpR.length && !cpR.length) {
        alert('Formato histórico detectado mas nenhuma linha de grandeza encontrada.\nVerifique se o CSV tem "Consumo Fora Ponta", "Consumo Ponta", "Demanda Fora Ponta", "Demanda Ponta".');
        return;
      }

      const newC = mesCols.slice(0, 12).map((mes, i) => ({
        mes,
        demandaPonta:           dpR[i]  || 0,
        demandaForaPonta:       dfpR[i] || 0,
        ultrapassagemForaPonta: 0,
        consumoPonta:           cpR[i]  || 0,
        consumoForaPonta:       cfpR[i] || 0,
      }));
      while (newC.length < 12) newC.push({mes:'',demandaPonta:0,demandaForaPonta:0,ultrapassagemForaPonta:0,consumoPonta:0,consumoForaPonta:0});
      state.consumo = newC;
      renderConsumoTable(); saveCurrent(); recalc();
      alert(`✓ ${mesCols.slice(0,12).length} meses importados do histórico da fatura!\nVerifique os dados na aba Consumo Histórico.`);

    } else {
      // ── FORMATO PADRÃO (modelo): linhas = meses, colunas = grandezas ──────────
      const hdr = lines[0].split(sep).map(h => h.trim().toLowerCase());
      const idx = name => hdr.findIndex(h => h.includes(name));
      const i_mes=idx('mes'), i_dp=idx('demanda_ponta'), i_dfp=idx('demanda_fora_ponta'),
            i_ufp=idx('ultrapassagem'), i_cp=idx('consumo_ponta'), i_cfp=idx('consumo_fora_ponta');
      if (i_dp<0||i_dfp<0||i_cp<0||i_cfp<0) {
        alert('CSV sem colunas reconhecidas.\nUse o botão "Modelo CSV" para ver o formato esperado,\nou exporte o histórico diretamente da fatura.');
        return;
      }
      const newC = [];
      for (let j=1; j<lines.length && newC.length<12; j++) {
        const cols = lines[j].split(sep);
        const num = i => i>=0 ? brNum(cols[i]) : 0;
        newC.push({ mes:cols[i_mes]||'', demandaPonta:num(i_dp), demandaForaPonta:num(i_dfp),
                    ultrapassagemForaPonta:num(i_ufp), consumoPonta:num(i_cp), consumoForaPonta:num(i_cfp) });
      }
      while (newC.length<12) newC.push({mes:'',demandaPonta:0,demandaForaPonta:0,ultrapassagemForaPonta:0,consumoPonta:0,consumoForaPonta:0});
      state.consumo = newC;
      renderConsumoTable(); saveCurrent(); recalc();
      alert('CSV importado! Verifique os dados na tabela.');
    }
  };
  reader.readAsText(file, 'UTF-8');
  event.target.value = '';
}

// ================================================================
// CÁLCULO PRINCIPAL — Azul vs Verde
// ================================================================
function fmt(v, dec=2) {
  if (v==null||isNaN(v)) return '—';
  return v.toLocaleString('pt-BR',{minimumFractionDigits:dec,maximumFractionDigits:dec});
}
function fmtBRL(v, dec=2) { return v==null||isNaN(v) ? '—' : 'R$ '+fmt(v,dec); }

// Gross-up de uma tarifa base → retorna { base, pis, icms, total }
function grossUp(tarifa, icms, pis, isentaICMS=false) {
  if (!tarifa || tarifa <= 0) return { base:0, pis:0, icms:0, total:0 };
  const pisV  = tarifa / (1 - pis) * pis;
  const icmsV = isentaICMS ? 0 : (tarifa / (1-pis)) / (1-icms) * icms;
  return { base:tarifa, pis:pisV, icms:icmsV, total: tarifa+pisV+icmsV };
}

// Calcula custo de uma modalidade para um conjunto de volumes
function calcModalidade(mod, volumes, icms, pis) {
  const tr = state.tarifas[mod.toLowerCase()];
  const { Dp, DpIsenta, Dfp, DfpIsenta, Cp, Cfp, Ufp } = volumes;

  const linhas = [
    { nome:'Demanda Ponta',           vol:Dp,       tarifa:tr.demandaPonta,    isenta:false },
    { nome:'Dem. Ponta (isenta)',      vol:DpIsenta, tarifa:tr.demandaPonta,    isenta:true  },
    { nome:'Demanda F. Ponta',         vol:Dfp,      tarifa:tr.demandaForaPonta,isenta:false },
    { nome:'Dem. F.Ponta (isenta)',    vol:DfpIsenta,tarifa:tr.demandaForaPonta,isenta:true  },
    { nome:'TUSD Ponta',               vol:Cp,       tarifa:tr.tusdPonta,       isenta:false },
    { nome:'TUSD Fora Ponta',          vol:Cfp,      tarifa:tr.tusdForaPonta,   isenta:false },
    { nome:'TE Ponta',                 vol:Cp,       tarifa:tr.tePonta,         isenta:false },
    { nome:'TE Fora Ponta',            vol:Cfp,      tarifa:tr.teForaPonta,     isenta:false },
    { nome:'Ultrapassagem F.Ponta',    vol:Ufp,      tarifa:tr.ultrapassagem,   isenta:false },
  ];
  let total = 0;
  const linhasCalc = linhas.map(l => {
    const g = grossUp(l.tarifa, icms, pis, l.isenta);
    const valor = g.total * l.vol;
    total += valor;
    return { ...l, ...g, valor };
  });
  return { linhas:linhasCalc, total };
}

// Extrai volumes de uma linha de consumo
function volumesDaLinha(row) {
  const dContrP  = parseFloat(state.cliente.demandaContratadaPonta)      || 0;
  const dContrFP = parseFloat(state.cliente.demandaContratadaForaPonta)  || 0;
  const Dp  = parseFloat(row.demandaPonta)           || 0;
  const Dfp = parseFloat(row.demandaForaPonta)        || 0;
  const Cp  = parseFloat(row.consumoPonta)            || 0;
  const Cfp = parseFloat(row.consumoForaPonta)        || 0;
  const Ufp = parseFloat(row.ultrapassagemForaPonta)  || 0;
  return {
    Dp, Dfp, Cp, Cfp, Ufp,
    DpIsenta:  Math.max(0, dContrP  - Dp),
    DfpIsenta: Math.max(0, dContrFP - Dfp),
    temDados: Dp>0||Dfp>0||Cp>0||Cfp>0,
  };
}

function compute() {
  const avg  = computeAverages();
  const icms = (state.tributos.icmsPct      || 0) / 100;
  const pis  = (state.tributos.pisCofinsPct || 0) / 100;

  // ── CÁLCULO MENSAL ──
  const meses = state.consumo.map((row, idx) => {
    const vol = volumesDaLinha(row);
    if (!vol.temDados) return null;
    const azul  = calcModalidade('AZUL',  vol, icms, pis);
    const verde = calcModalidade('VERDE', vol, icms, pis);
    const melhor = azul.total <= verde.total ? 'AZUL' : 'VERDE';
    return { idx, mes: row.mes || `Mês ${idx+1}`, vol, azul, verde, melhor };
  }).filter(Boolean);

  // ── CÁLCULO COM MÉDIAS (para detalhamento breakdown) ──
  const avgVol = {
    Dp:  avg.demandaPonta,
    Dfp: avg.demandaForaPonta,
    Cp:  avg.consumoPonta,
    Cfp: avg.consumoForaPonta,
    Ufp: avg.ultrapassagemForaPonta,
    DpIsenta:  Math.max(0,(parseFloat(state.cliente.demandaContratadaPonta)||0)-avg.demandaPonta),
    DfpIsenta: Math.max(0,(parseFloat(state.cliente.demandaContratadaForaPonta)||0)-avg.demandaForaPonta),
    temDados: true,
  };
  const azulMedia  = calcModalidade('AZUL',  avgVol, icms, pis);
  const verdeMedia = calcModalidade('VERDE', avgVol, icms, pis);

  // ── TOTAIS ANUAIS ──
  const totalAzul  = meses.reduce((s,m) => s + m.azul.total,  0);
  const totalVerde = meses.reduce((s,m) => s + m.verde.total, 0);
  const mesesAzul  = meses.filter(m => m.melhor === 'AZUL').length;
  const mesesVerde = meses.filter(m => m.melhor === 'VERDE').length;
  const melhorGeral = totalAzul <= totalVerde ? 'AZUL' : 'VERDE';
  const diff = Math.abs(totalVerde - totalAzul);

  return {
    avg, meses, N: avg.N,
    azulMedia, verdeMedia,
    totalAzul, totalVerde,
    mesesAzul, mesesVerde,
    melhorGeral, diff,
    modalidadeAtual: state.cliente.modalidadeAtual,
  };
}

// ================================================================
// RENDER RESULTADO
// ================================================================
function recalc() {
  updateConsumoAverages();
  const el = document.getElementById('resultadoContent');
  if (!el) return;

  let r;
  try { r = compute(); } catch(e) {
    el.innerHTML = `<div class="warn-banner">⚠ Erro no cálculo: ${e.message}</div>`;
    return;
  }

  const { meses, totalAzul, totalVerde, mesesAzul, mesesVerde,
          melhorGeral, diff, modalidadeAtual, azulMedia, verdeMedia, N } = r;

  if (meses.length === 0) {
    el.innerHTML = `<div class="info-banner">Preencha o consumo histórico (aba 3) para ver o resultado.</div>`;
    return;
  }

  const jaCorreta = modalidadeAtual === melhorGeral;
  const diffAnual = diff; // diff já é sobre totais anuais

  const nMeses = meses.length;
  const mediaAzul  = totalAzul  / nMeses;
  const mediaVerde = totalVerde / nMeses;
  const mediaDiff  = diff / nMeses;

  // ── BANNER RECOMENDAÇÃO ──
  const alertaBanner = jaCorreta
    ? `<div class="info-banner" style="border-left-color:var(--success);background:#e8f5e4;">
        ✅ <strong>O cliente já está na modalidade mais vantajosa (${melhorGeral}).</strong>
        Economia média de <strong>${fmtBRL(mediaDiff)}/mês</strong> em relação à outra modalidade (${nMeses} meses analisados).
       </div>`
    : `<div class="same-modality-banner">
        ⚡ <strong>Recomendação:</strong> trocar de <strong>${modalidadeAtual}</strong> para <strong>${melhorGeral}</strong>
        — economia estimada de <strong>${fmtBRL(mediaDiff)}/mês</strong>
        (<strong>${fmtBRL(diff)}</strong> nos ${nMeses} meses analisados).
       </div>`;

  // ── CARDS RESUMO ──
  const cardWinnerAzul  = melhorGeral==='AZUL';
  const cardWinnerVerde = melhorGeral==='VERDE';

  // ── TABELA MENSAL ──
  const linhasMensais = meses.map(m => {
    const isAzulWin  = m.melhor === 'AZUL';
    const isVerdeWin = m.melhor === 'VERDE';
    const delta = m.verde.total - m.azul.total; // positivo = Verde mais caro = Azul melhor
    return `<tr>
      <td class="col-mes">${m.mes}</td>
      <td>${fmt(m.vol.Dp,1)}</td>
      <td>${fmt(m.vol.DpIsenta,1)}</td>
      <td>${fmt(m.vol.Dfp,1)}</td>
      <td>${fmt(m.vol.DfpIsenta,1)}</td>
      <td>${fmt(m.vol.Ufp,1)}</td>
      <td>${fmt(m.vol.Cp,0)}</td>
      <td>${fmt(m.vol.Cfp,0)}</td>
      <td class="${isAzulWin?'winner-azul':''}" style="background:${isAzulWin?'#dde6f0':''}">${fmt(m.azul.total,2)}</td>
      <td class="${isVerdeWin?'winner-verde':''}" style="background:${isVerdeWin?'#e2efde':''}">${fmt(m.verde.total,2)}</td>
      <td style="text-align:center; color:${delta>0?'#4a9968':'#c84545'}; font-size:11px;">
        ${delta>=0?'▼':'▲'} ${fmt(Math.abs(delta),2)}
      </td>
      <td style="text-align:center;">
        <span class="${isAzulWin?'pill-azul':'pill-verde'}">${m.melhor}</span>
      </td>
    </tr>`;
  }).join('');

  // Linha de totais
  const linhaTotais = `<tr class="total-row">
    <td class="col-mes" style="color:white;">TOTAL ${meses.length} MESES</td>
    <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
    <td class="${melhorGeral==='AZUL'?'winner-azul':''}">${fmt(totalAzul,2)}</td>
    <td class="${melhorGeral==='VERDE'?'winner-verde':''}">${fmt(totalVerde,2)}</td>
    <td style="text-align:center; color:#9ec99a; font-size:11px;">${fmt(Math.abs(totalVerde-totalAzul),2)}</td>
    <td style="text-align:center;"><span class="${melhorGeral==='AZUL'?'pill-azul':'pill-verde'}" style="background:${melhorGeral==='AZUL'?'#dde6f0':'#e2efde'}">${melhorGeral}</span></td>
  </tr>`;

  // ── BREAKDOWN MÉDIO (detalhamento linha por linha com médias) ──
  const linhaDetalhe = (linhas, modLabel) => linhas.map(l => {
    const hasVal = l.vol > 0 && l.base > 0;
    return `<tr style="${!hasVal?'opacity:0.4;':''}">
      <td>${l.nome}</td>
      <td class="num">${hasVal?fmt(l.vol,2):'—'}</td>
      <td class="num">${hasVal?fmt(l.base,5):'—'}</td>
      <td class="num">${hasVal?fmt(l.pis,5):'—'}</td>
      <td class="num">${hasVal?fmt(l.icms,5):'—'}</td>
      <td class="num">${hasVal?fmt(l.total,5):'—'}</td>
      <td class="num"><strong>${hasVal?fmtBRL(l.valor):'—'}</strong></td>
    </tr>`;
  }).join('');

  el.innerHTML = `
    ${alertaBanner}

    <!-- RESUMO -->
    <div class="summary-grid">
      <div class="kpi primary">
        <div class="label">Meses analisados</div>
        <div class="value">${meses.length}</div>
        <div class="sub">com dados válidos</div>
      </div>
      <div class="kpi ${cardWinnerAzul?'success':'primary'}">
        <div class="label">Média/mês — AZUL</div>
        <div class="value" style="font-size:16px;">${fmtBRL(mediaAzul,0)}</div>
        <div class="sub">${cardWinnerAzul?'✅ mais barata':''} · ${mesesAzul} mes${mesesAzul!==1?'es':''} mais barato</div>
      </div>
      <div class="kpi ${cardWinnerVerde?'success':'primary'}">
        <div class="label">Média/mês — VERDE</div>
        <div class="value" style="font-size:16px;">${fmtBRL(mediaVerde,0)}</div>
        <div class="sub">${cardWinnerVerde?'✅ mais barata':''} · ${mesesVerde} mes${mesesVerde!==1?'es':''} mais barato</div>
      </div>
      <div class="kpi" style="border-top:3px solid var(--success); background:${jaCorreta?'#e8f5e4':'#fff5d4'};">
        <div class="label">Economia média/mês</div>
        <div class="value" style="font-size:16px; color:var(--success);">${fmtBRL(mediaDiff,0)}</div>
        <div class="sub">${melhorGeral} mais barata · total ${fmtBRL(diff,0)}</div>
      </div>
    </div>

    <!-- CARDS COMPARATIVOS -->
    <div class="grid grid-2" style="margin-bottom:16px;">
      <div class="result-${cardWinnerAzul?'winner':'loser'}">
        ${cardWinnerAzul?'<span class="result-badge badge-winner">✅ Melhor opção</span>':''}
        ${modalidadeAtual==='AZUL'?'<span class="result-badge badge-current" style="margin-left:6px;">Atual</span>':''}
        <div class="modality-name" style="color:${cardWinnerAzul?'var(--primary)':'var(--text-muted)'}">AZUL</div>
        <div class="modality-cost">${fmtBRL(mediaAzul,0)}<span style="font-size:13px;font-weight:400;">/mês</span></div>
        <div class="modality-cost-sub">${mesesAzul} mes${mesesAzul!==1?'es':''} mais barata · total ${fmtBRL(totalAzul,0)}</div>
      </div>
      <div class="result-${cardWinnerVerde?'winner':'loser'}">
        ${cardWinnerVerde?'<span class="result-badge badge-winner">✅ Melhor opção</span>':''}
        ${modalidadeAtual==='VERDE'?'<span class="result-badge badge-current" style="margin-left:6px;">Atual</span>':''}
        <div class="modality-name" style="color:${cardWinnerVerde?'var(--success)':'var(--text-muted)'}">VERDE</div>
        <div class="modality-cost">${fmtBRL(mediaVerde,0)}<span style="font-size:13px;font-weight:400;">/mês</span></div>
        <div class="modality-cost-sub">${mesesVerde} mes${mesesVerde!==1?'es':''} mais barata · total ${fmtBRL(totalVerde,0)}</div>
      </div>
    </div>

    <!-- TABELA MENSAL -->
    <div class="card">
      <div class="card-title">
        Comparativo Mensal — Azul × Verde
        <span class="card-subtitle">Custo calculado individualmente para cada mês · valores em R$</span>
      </div>
      <div style="overflow-x:auto;">
        <table class="monthly-table">
          <thead>
            <tr>
              <th class="group-mes" rowspan="2" style="text-align:left; min-width:80px;">Mês</th>
              <th class="group-mes" colspan="7" style="border-bottom:1px solid rgba(255,255,255,0.2);">Volumes Medidos</th>
              <th class="group-azul" colspan="2" style="border-bottom:1px solid rgba(255,255,255,0.2);">Simulação (R$)</th>
              <th class="group-mes" rowspan="2">Diferença (R$)</th>
              <th class="group-mes" rowspan="2">Melhor</th>
            </tr>
            <tr>
              <th class="group-mes">Dem. P (kW)</th>
              <th class="group-mes">D.P. Isenta</th>
              <th class="group-mes">Dem. FP (kW)</th>
              <th class="group-mes">D.FP Isenta</th>
              <th class="group-mes">Ultrap. (kW)</th>
              <th class="group-mes">Cons. P (kWh)</th>
              <th class="group-mes">Cons. FP (kWh)</th>
              <th class="group-azul">AZUL</th>
              <th class="group-verde" style="background:#4a7e44;">VERDE</th>
            </tr>
          </thead>
          <tbody>${linhasMensais}</tbody>
          <tfoot>${linhaTotais}</tfoot>
        </table>
      </div>
    </div>

    <!-- DETALHAMENTO POR LINHA (médias) -->
    <div class="card">
      <div class="card-title">
        Memorial de Cálculo — Base: médias dos ${N} mes${N!==1?'es':''}
        <span class="card-subtitle">ICMS ${fmt(state.tributos.icmsPct,2)}% · PIS/COFINS ${fmt(state.tributos.pisCofinsPct,2)}% · Gross-up aplicado</span>
      </div>

      <details>
        <summary style="cursor:pointer;font-weight:600;color:var(--primary);font-size:13px;padding:6px 0;">
          <span class="tag-azul">AZUL</span> — Detalhamento por componente (valores médios mensais)
        </summary>
        <div style="overflow-x:auto;margin-top:10px;">
          <table class="breakdown-table">
            <thead><tr>
              <th>Componente</th><th class="num">Volume</th>
              <th class="num">Tarifa Base</th><th class="num">PIS</th>
              <th class="num">ICMS</th><th class="num">c/ Impostos</th>
              <th class="num">R$/mês (médio)</th>
            </tr></thead>
            <tbody>${linhaDetalhe(azulMedia.linhas)}</tbody>
            <tfoot><tr class="total-row">
              <td colspan="6"><strong>TOTAL AZUL (médio/mês)</strong></td>
              <td class="num ${melhorGeral==='AZUL'?'winner-col':''}"><strong>${fmtBRL(azulMedia.total)}</strong></td>
            </tr></tfoot>
          </table>
        </div>
      </details>

      <details style="margin-top:10px;">
        <summary style="cursor:pointer;font-weight:600;color:var(--success);font-size:13px;padding:6px 0;">
          <span class="tag-verde">VERDE</span> — Detalhamento por componente (valores médios mensais)
        </summary>
        <div style="overflow-x:auto;margin-top:10px;">
          <table class="breakdown-table">
            <thead><tr>
              <th>Componente</th><th class="num">Volume</th>
              <th class="num">Tarifa Base</th><th class="num">PIS</th>
              <th class="num">ICMS</th><th class="num">c/ Impostos</th>
              <th class="num">R$/mês (médio)</th>
            </tr></thead>
            <tbody>${linhaDetalhe(verdeMedia.linhas)}</tbody>
            <tfoot><tr class="total-row">
              <td colspan="6"><strong>TOTAL VERDE (médio/mês)</strong></td>
              <td class="num ${melhorGeral==='VERDE'?'winner-col':''}"><strong>${fmtBRL(verdeMedia.total)}</strong></td>
            </tr></tfoot>
          </table>
        </div>
      </details>
    </div>

    <div style="text-align:center; padding:10px 0; font-size:11px; color:var(--text-muted);">
      Gerado em ${new Date().toLocaleString('pt-BR')} ·
      <strong>${state.cliente.nome||'—'}</strong> · UC ${state.cliente.uc||'—'} · ${state.cliente.distribuidora||'—'}
    </div>
  `;

  // Atualiza área de impressão
  renderPrintArea(r);
}

function renderPrintArea(r) {
  const pa = document.getElementById('print-area');
  if (!pa) return;

  const { meses, totalAzul, totalVerde, mesesAzul, mesesVerde,
          melhorGeral, diff, modalidadeAtual } = r;

  const c = state.cliente;
  const jaCorreta = modalidadeAtual === melhorGeral;
  const diffMes   = meses.length ? diff / meses.length : 0;
  const isAzulWin = melhorGeral === 'AZUL';

  // Logo: pega o src da imagem já carregada no header
  const logoEl  = document.querySelector('.brand-logo');
  const logoSrc = logoEl ? logoEl.src : '';

  // Data/hora formatada
  const agora = new Date();
  const dataStr = agora.toLocaleDateString('pt-BR');
  const horaStr = agora.toLocaleTimeString('pt-BR', { hour:'2-digit', minute:'2-digit' });

  // ── 1. Cabeçalho ──
  const header = `
    <div class="pi-header">
      <div class="pi-header-left">
        ${logoSrc ? `<img class="pi-header-logo" src="${logoSrc}" alt="Spirit Energia">` : ''}
        <div class="pi-header-brand">
          <div class="pi-header-brand-name">Grupo Spirit · Energia</div>
          <div class="pi-header-title">Comparativo de Modalidade Tarifária</div>
          <div class="pi-header-sub">Horo-Sazonal Azul × Verde — Qual é a melhor opção?</div>
        </div>
      </div>
      <div class="pi-header-right">
        <div>${dataStr}</div>
        <div>${horaStr}</div>
        <div style="margin-top:4px; font-size:9px;">ICMS ${fmt(state.tributos.icmsPct,2)}% · PIS/COFINS ${fmt(state.tributos.pisCofinsPct,2)}%</div>
      </div>
    </div>`;

  // ── 2. Dados do cliente ──
  const clienteGrid = `
    <div class="pi-client-section">
      <div class="pi-client-grid">
        <div class="pi-client-item"><label>Cliente</label><span>${c.nome||'—'}</span></div>
        <div class="pi-client-item"><label>CNPJ / CPF</label><span>${c.cnpj||'—'}</span></div>
        <div class="pi-client-item"><label>UC / Instalação</label><span>${c.uc||'—'}</span></div>
        <div class="pi-client-item"><label>Distribuidora</label><span>${c.distribuidora||'—'}</span></div>
        <div class="pi-client-item"><label>Endereço</label><span>${c.endereco||'—'}${c.cidade?' — '+c.cidade:''}</span></div>
        <div class="pi-client-item"><label>Classe / Tensão</label><span>${c.classe||'—'}</span></div>
        <div class="pi-client-item"><label>Modalidade Atual</label><span>${c.modalidadeAtual||'—'}</span></div>
        <div class="pi-client-item"><label>Demanda Contratada</label><span>Ponta: ${fmt(parseFloat(c.demandaContratadaPonta)||0,0)} kW · F. Ponta: ${fmt(parseFloat(c.demandaContratadaForaPonta)||0,0)} kW</span></div>
      </div>
    </div>`;

  // ── 3. Dashboard ──
  const recClass = isAzulWin ? 'rec-azul' : 'rec-verde';
  const dash = `
    <div class="pi-dash">
      <div class="pi-rec ${recClass}">
        <div class="rec-badge">${melhorGeral}</div>
        <div class="rec-txt">
          <strong>${jaCorreta ? 'Modalidade atual já é a mais econômica ✓' : 'Recomendação: migrar para ' + melhorGeral}</strong>
          Economia estimada: <strong>R$ ${fmt(diffMes,2)}/mês</strong><br>
          Total nos ${meses.length} meses analisados: <strong>R$ ${fmt(diff,2)}</strong>
        </div>
      </div>
      <div class="pi-kpi ${isAzulWin?'winner':'loser'}">
        <label>Total Horo-Sazonal AZUL</label>
        <div class="val">${fmtBRL(totalAzul,0)}</div>
        <div class="sub">${mesesAzul} mes${mesesAzul!==1?'es':' mais barato'} mais baratos</div>
      </div>
      <div class="pi-kpi ${!isAzulWin?'winner':'loser'}">
        <label>Total Horo-Sazonal VERDE</label>
        <div class="val">${fmtBRL(totalVerde,0)}</div>
        <div class="sub">${mesesVerde} mes${mesesVerde!==1?'es':' mais barato'} mais baratos</div>
      </div>
    </div>`;

  // ── 4. Tabela mensal ──
  const linhasMensais = meses.map(m => {
    const ia = m.melhor==='AZUL', iv = m.melhor==='VERDE';
    const delta = m.verde.total - m.azul.total; // positivo = Azul mais barato
    return `<tr>
      <td class="mes-col">${m.mes}</td>
      <td>${fmt(m.vol.Dp,1)}</td>
      <td>${fmt(m.vol.DpIsenta,1)}</td>
      <td>${fmt(m.vol.Dfp,1)}</td>
      <td>${fmt(m.vol.DfpIsenta,1)}</td>
      <td>${fmt(m.vol.Ufp,1)}</td>
      <td>${fmt(m.vol.Cp,0)}</td>
      <td>${fmt(m.vol.Cfp,0)}</td>
      <td class="${ia?'win-azul':''}">${fmt(m.azul.total,2)}</td>
      <td class="${iv?'win-verde':''}">${fmt(m.verde.total,2)}</td>
      <td style="color:${delta>0?'#4a7e44':'#1e3e6e'}; font-weight:600;">${delta>=0?'▼':'▲'} ${fmt(Math.abs(delta),2)}</td>
      <td style="text-align:center;"><span class="pill ${ia?'pill-a':'pill-v'}">${m.melhor}</span></td>
    </tr>`;
  }).join('');

  const tabelaMensal = `
    <div class="pi-table-title">Comparativo Mensal — Azul × Verde &nbsp;·&nbsp; valores em R$</div>
    <table class="pi-table">
      <thead>
        <tr>
          <th class="h-gray" rowspan="2" style="text-align:left;">Mês</th>
          <th class="h-gray" colspan="7">Volumes Medidos</th>
          <th class="h-azul" colspan="2">Simulação (R$)</th>
          <th class="h-gray" rowspan="2">Diferença</th>
          <th class="h-gray" rowspan="2">Melhor</th>
        </tr>
        <tr>
          <th class="h-gray">D.Ponta (kW)</th>
          <th class="h-gray">D.P. Isenta</th>
          <th class="h-gray">D.F.Ponta (kW)</th>
          <th class="h-gray">D.FP. Isenta</th>
          <th class="h-gray">Ultrapass.</th>
          <th class="h-gray">C.Ponta (kWh)</th>
          <th class="h-gray">C.F.Ponta (kWh)</th>
          <th class="h-azul">AZUL</th>
          <th class="h-verde">VERDE</th>
        </tr>
      </thead>
      <tbody>${linhasMensais}</tbody>
      <tfoot>
        <tr class="total-row">
          <td class="mes-col">TOTAL</td>
          <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
          <td>${fmt(totalAzul,2)}</td>
          <td>${fmt(totalVerde,2)}</td>
          <td>${fmt(Math.abs(totalVerde-totalAzul),2)}</td>
          <td style="text-align:center;"><span class="pill ${isAzulWin?'pill-a':'pill-v'}">${melhorGeral}</span></td>
        </tr>
      </tfoot>
    </table>`;

  pa.innerHTML = `
    ${header}
    ${clienteGrid}
    ${dash}
    ${tabelaMensal}
    <div class="pi-footer">
      <span>Spirit Geração e Comercialização de Energia LTDA</span>
      <span>Comparativo interno — não substitui análise técnica regulatória</span>
    </div>
  `;
}

// ================================================================
// IMPORTAÇÃO DE FATURA PDF
// ================================================================
let faturaExtracted = null;

async function handleFaturaUpload(event) {
  const file = event.target.files[0]; if (!file) return;
  const modal = document.getElementById('faturaLoadingModal');
  const stepEl = document.getElementById('faturaLoadingStep');
  modal.style.display = 'flex';

  try {
    stepEl.textContent = 'Carregando PDF…';
    if (typeof pdfjsLib === 'undefined') { alert('Biblioteca PDF não carregada.'); modal.style.display='none'; return; }
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    stepEl.textContent = `Extraindo texto (${pdf.numPages} páginas)…`;

    for (let i = 1; i <= Math.min(pdf.numPages, 6); i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      console.log("TEXTO EXTRAIDO:", content.items.map(i => i.str).join(" "));
      // Agrupa itens por posição Y (±4px) para reconstruir linhas do PDF
      // Isso preserva a estrutura de tabelas como o HISTÓRICO DE CONSUMO
      const buckets = {};
      content.items.forEach(item => {
        const y = Math.round(item.transform[5] / 4) * 4;
        if (!buckets[y]) buckets[y] = [];
        buckets[y].push({ x: item.transform[4], str: item.str });
      });
      const pageLines = Object.entries(buckets)
        .sort(([ya], [yb]) => parseFloat(yb) - parseFloat(ya)) // y decrescente = top-to-bottom
        .map(([, items]) => items.sort((a, b) => a.x - b.x).map(i => i.str).join(' '));
      fullText += pageLines.join('\n') + '\n';
    }

    stepEl.textContent = 'Analisando dados…';
    faturaExtracted = parseFatura(fullText);
    modal.style.display = 'none';

    // Se extraiu histórico completo (≥6 meses) → aplica automaticamente
    if (faturaExtracted.historico && faturaExtracted.historico.length >= 6) {
      faturaExtractedMonths = faturaExtracted.historico;
      applyFaturaAutomatic(faturaExtracted);
    } else {
      // Dados incompletos → mostra modal para revisão manual
      showFaturaReviewModal(faturaExtracted, fullText);
    }
  } catch(e) {
    modal.style.display = 'none';
    alert('Erro ao processar o PDF: ' + e.message);
  }
  event.target.value = '';
}

// Aplica dados da fatura sem passar pelo modal (quando extração é bem-sucedida)
function applyFaturaAutomatic(data) {
  // Dados cadastrais: só preenche campos vazios
  if (data.nome  && !state.cliente.nome)  state.cliente.nome  = data.nome;
  if (data.cnpj  && !state.cliente.cnpj)  state.cliente.cnpj  = data.cnpj;
  if (data.uc    && !state.cliente.uc)    state.cliente.uc    = data.uc;
  if (data.classe && !state.cliente.classe)          state.cliente.classe          = data.classe;
  if (data.modalidade && !state.cliente.modalidadeAtual) state.cliente.modalidadeAtual = data.modalidade;
  if (data.demandaContratada && !state.cliente.demandaContratadaForaPonta) {
    state.cliente.demandaContratadaForaPonta = data.demandaContratada;
    state.cliente.demandaContratadaPonta     = data.demandaContratada;
  }

  // Histórico de consumo: preenche os 12 slots
  const novos = faturaExtractedMonths.slice(0, 12);
  while (novos.length < 12) novos.push({mes:'',demandaPonta:0,demandaForaPonta:0,ultrapassagemForaPonta:0,consumoPonta:0,consumoForaPonta:0});
  state.consumo = novos;

  saveCurrent(); bindAll(); renderConsumoTable(); recalc();
  switchTab('consumo'); // vai direto para a aba de consumo

  const n = faturaExtractedMonths.length;
  setTimeout(() => alert(
    `✓ Fatura importada com sucesso!\n\n` +
    `• ${n} meses preenchidos em "Consumo Histórico"\n` +
    `• Dados cadastrais aplicados (campos em branco)\n\n` +
    `Verifique os dados e ajuste se necessário.`
  ), 150);
}

// ────────────────────────────────────────────────────────────────────────────
// PARSER DE FATURA — suporte a histórico de 12 meses (padrão CELESC)
// ────────────────────────────────────────────────────────────────────────────

  let faturaExtractedMonths = [];

  function parseFatura(text) {
    const extract = (patterns, transform) => {
      for (const p of patterns) {
        const m = text.match(p);
        if (m) return transform ? transform(m[1]||m[0]) : (m[1]||m[0]).trim();
      }
      return '';
    };
    const num = s => parseFloat(String(s).replace(/\./g,'').replace(',','.')) || 0;

    const nomeRaw = extract([
      /raz[aã]o\s*social[:\s]+([^\n]+)/i,
      /nome\s*(?:do\s*cliente)?[:\s]+([A-Z][^\n]+)/i,
      /cliente[:\s]+([A-Z][^\n]+)/i,
      /^([A-Z][A-Z &\.\-]{4,}?)\s{2,}/m,
    ]);
    const nome = nomeRaw
      .replace(/\s+\d{2}[\.\s]\d{3}[\.\s]\d{3}.*$/, '')
      .replace(/\s{2,}.*$/, '')
      .trim();

    const cnpj = extract([/(\d{2}\.?\d{3}\.?\d{3}[\/\s]?\d{4}-?\d{2})/]);
    const uc   = extract([
      /(?:unidade\s*consumidora|n[uú]mero\s*de\s*instala[cç][aã]o)[:\s#]*(\d{6,12})/i,
      /\buc\s*[:\-]?\s*(\d{6,12})/i,
    ]);
    const modalidade = /\bverde\b/i.test(text) ? 'VERDE' : /\bazul\b/i.test(text) ? 'AZUL' : '';
    const classe = extract([/\b(A[1-4]a?)\b/]);
    const mesRef = extract([
      /(?:refer[eê]ncia|per[ií]odo)[:\s]*(\d{2}[\/\-]\d{4})/i,
      /(\d{2}[\/\-]\d{4})/,
    ]);

    const hist = parseCelescHistorico(text, mesRef);
    faturaExtractedMonths = hist.meses;

    return {
      nome, cnpj, uc, modalidade, classe, mesRef,
      demandaPonta:      hist.dpAtual,
      demandaForaPonta:  hist.dfpAtual,
      consumoPonta:      hist.cpAtual,
      consumoForaPonta:  hist.cfpAtual,
      demandaContratada: hist.demandaContratada,
      historico:         hist.meses,
    };
  }

  function parseCelescHistorico(text, mesRef) {
    const num = s => parseFloat(String(s||'0').replace(/\./g,'').replace(',','.')) || 0;
    const extractNums = s => [...String(s||'').matchAll(/\d{1,3}(?:\.\d{3})*(?:,\d+)?/g)].map(m => num(m[0]));
    const mesMap = {JAN:'01',FEV:'02',MAR:'03',ABR:'04',MAI:'05',JUN:'06',JUL:'07',AGO:'08',SET:'09',OUT:'10',NOV:'11',DEZ:'12'};

    const dcMatch = text.match(/Demanda\s+(\d[\d.,]*)\s*KW/i);
    const demandaContratada = dcMatch ? num(dcMatch[1]) : 0;

    const histIdx = text.search(/HIST[OÓ]RICO\s+DE\s+CONSUMO/i);
    const histText = histIdx >= 0 ? text.slice(histIdx) : '';

    const cfpFallback = num((text.match(/Consumo\s+Fora\s+Ponta\s+TUSD[^\d]*([\d.,]+)/i)||[])[1]||'0');
    const cpFallback  = num((text.match(/Consumo\s+Ponta\s+TUSD[^\d]*([\d.,]+)/i)||[])[1]||'0');

    if (!histText) {
      const ms = mesRef ? [{mes:mesRef,consumoForaPonta:cfpFallback,consumoPonta:cpFallback,demandaForaPonta:0,demandaPonta:0,ultrapassagemForaPonta:0}] : [];
      return {meses:ms,cfpAtual:cfpFallback,cpAtual:cpFallback,dfpAtual:0,dpAtual:0,demandaContratada};
    }

    const monthRE = /\b(JAN|FEV|MAR|ABR|MAI|JUN|JUL|AGO|SET|OUT|NOV|DEZ)\/(\d{2})\b/g;
    const mLabels = [...histText.matchAll(monthRE)].slice(0,12).map(m => `${mesMap[m[1]]}/${2000+parseInt(m[2])}`);

    const histLines = histText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const findInline = (...kws) => histLines.find(l => {
      const lc = l.toLowerCase();
      return kws.every(k => lc.includes(k)) && extractNums(l).length >= 8;
    }) || null;

    const cfpLine = findInline('consumo','fora','ponta');
    const cpLine  = histLines.find(l => {
      const lc = l.toLowerCase();
      return lc.includes('consumo') && lc.includes('ponta') && !lc.includes('fora') && extractNums(l).length >= 8;
    }) || null;
    const dfpLine = findInline('demanda','fora','ponta');
    const dpLine  = histLines.find(l => {
      const lc = l.toLowerCase();
      return lc.includes('demanda') && lc.includes('ponta') && !lc.includes('fora')
          && !lc.includes('reativa') && !lc.includes('excedente') && extractNums(l).length >= 8;
    }) || null;

    const isInline = !!(cfpLine && cpLine);
    let cfpAtual, cpAtual, dfpAtual, dpAtual;
    const meses = [];

    if (isInline) {
      const vals = line => line ? extractNums(line).slice(2) : [];
      const cfpV=vals(cfpLine), cpV=vals(cpLine), dfpV=vals(dfpLine), dpV=vals(dpLine);
      cfpAtual = cfpV[0]||cfpFallback;
      cpAtual  = cpV[0]||cpFallback;
      dfpAtual = dfpV[0]||0;
      dpAtual  = dpV[0]||0;
      if (mesRef) meses.push({mes:mesRef,consumoForaPonta:cfpAtual,consumoPonta:cpAtual,demandaForaPonta:dfpAtual,demandaPonta:dpAtual,ultrapassagemForaPonta:0});
      for (let i=0; i<mLabels.length; i++) {
        meses.push({mes:mLabels[i],consumoForaPonta:cfpV[i+1]||0,consumoPonta:cpV[i+1]||0,demandaForaPonta:dfpV[i+1]||0,demandaPonta:dpV[i+1]||0,ultrapassagemForaPonta:0});
      }
    } else {
      const thirdAfter = anchor => {
        const idx = histText.search(new RegExp(anchor,'i'));
        if (idx<0) return 0;
        return extractNums(histText.slice(idx, idx+300))[2]||0;
      };
      cfpAtual = cfpFallback || thirdAfter('Consumo Fora Ponta');
      cpAtual  = cpFallback  || thirdAfter('Consumo Ponta');
      dfpAtual = thirdAfter('Demanda Fora Ponta');
      dpAtual  = thirdAfter('Demanda Ponta');
      const lastExc = histText.lastIndexOf('Excedente');
      const afterExc = lastExc>=0 ? histText.slice(lastExc) : '';
      const histNums = extractNums(afterExc).slice(3);
      const N = mLabels.length;
      if (mesRef) meses.push({mes:mesRef,consumoForaPonta:cfpAtual,consumoPonta:cpAtual,demandaForaPonta:dfpAtual,demandaPonta:dpAtual,ultrapassagemForaPonta:0});
      if (histNums.length >= N*4) {
        for (let i=0; i<N; i++) {
          const cfp=histNums[i], cp=histNums[N+i], dfp=histNums[N*2+i], dp=histNums[N*3+i];
          if (cfp>0||cp>0) meses.push({mes:mLabels[i],consumoForaPonta:cfp||0,consumoPonta:cp||0,demandaForaPonta:dfp||0,demandaPonta:dp||0,ultrapassagemForaPonta:0});
        }
      }
    }

    return {meses:meses.slice(0,13), cfpAtual, cpAtual, dfpAtual, dpAtual, demandaContratada};
  }

  function showFaturaReviewModal(data, rawText) {
    const cadFields = document.getElementById('faturaCadastralFields');
    const jaTemCliente = !!state.cliente.nome;
    const avisoCliente = jaTemCliente
      ? `<div style="grid-column:1/-1;padding:6px 10px;background:#fff8e1;border:1px solid #f0c040;border-radius:6px;font-size:12px;color:#7a5c00;">⚠️ <strong>Dados do cliente já preenchidos</strong> — não serão sobrescritos.</div>`
      : '';
    cadFields.innerHTML = `${avisoCliente}
      <div class="field"><label>Nome / Razão Social</label><input type="text" id="rv-nome" value="${(data.nome||'').replace(/"/g,'&quot;')}" ${jaTemCliente?'disabled style="opacity:0.5"':''}></div>
      <div class="field"><label>CNPJ</label><input type="text" id="rv-cnpj" value="${(data.cnpj||'').replace(/"/g,'&quot;')}" ${jaTemCliente?'disabled style="opacity:0.5"':''}></div>
      <div class="field"><label>UC</label><input type="text" id="rv-uc" value="${(data.uc||'').replace(/"/g,'&quot;')}"></div>
      <div class="field"><label>Classe</label><select id="rv-classe">${['A4','A3a','A3','A2','A1'].map(c=>`<option value="${c}" ${c===data.classe?'selected':''}>${c}</option>`).join('')}</select></div>
      <div class="field"><label>Modalidade</label><select id="rv-modalidade"><option value="VERDE" ${data.modalidade==='VERDE'?'selected':''}>VERDE</option><option value="AZUL" ${data.modalidade==='AZUL'?'selected':''}>AZUL</option></select></div>`;

    document.getElementById('faturaDemandaFields').innerHTML = `
      <div class="field"><label>Dem. Contratada Ponta (kW)</label><input type="number" step="any" id="rv-dp-c" value="${data.demandaContratada||data.demandaPonta||''}"></div>
      <div class="field"><label>Dem. Contratada F.Ponta (kW)</label><input type="number" step="any" id="rv-dfp-c" value="${data.demandaContratada||data.demandaForaPonta||''}"></div>`;

    const tbody = document.getElementById('faturaConsumoRows');
    const meses = data.historico || [];

    if (meses.length > 1) {
      tbody.innerHTML = meses.map((m,i) =>
        `<tr style="background:${i===0?'#edf6ea':''}">
          <td style="text-align:center;font-weight:${i===0?700:400};">${m.mes}${i===0?' ★':''}</td>
          <td style="text-align:right;">${m.demandaPonta||0}</td>
          <td style="text-align:right;">${m.demandaForaPonta||0}</td>
          <td style="text-align:right;">0</td>
          <td style="text-align:right;">${m.consumoPonta||0}</td>
          <td style="text-align:right;">${m.consumoForaPonta||0}</td>
        </tr>`
      ).join('');
      document.getElementById('faturaConsumoTitle').innerHTML =
        `<strong style="color:var(--success);">✓ ${meses.length} meses extraídos</strong> — ★ = mês da fatura`;
    } else {
      const m = meses[0] || {};
      tbody.innerHTML = `<tr>
        <td><input type="text" id="rv-mes" value="${(m.mes||data.mesRef||'').replace(/"/g,'&quot;')}" style="width:100%;font-size:13px;padding:4px;border:1px solid var(--border);border-radius:4px;"></td>
        <td><input type="number" step="any" id="rv-cdp" value="${m.demandaPonta||data.demandaPonta||''}" style="width:80px;text-align:right;font-size:13px;padding:4px;border:1px solid var(--border);border-radius:4px;"></td>
        <td><input type="number" step="any" id="rv-cdfp" value="${m.demandaForaPonta||data.demandaForaPonta||''}" style="width:80px;text-align:right;font-size:13px;padding:4px;border:1px solid var(--border);border-radius:4px;"></td>
        <td><input type="number" step="any" id="rv-cufp" value="0" style="width:80px;text-align:right;font-size:13px;padding:4px;border:1px solid var(--border);border-radius:4px;"></td>
        <td><input type="number" step="any" id="rv-cp" value="${m.consumoPonta||data.consumoPonta||''}" style="width:90px;text-align:right;font-size:13px;padding:4px;border:1px solid var(--border);border-radius:4px;"></td>
        <td><input type="number" step="any" id="rv-cfp" value="${m.consumoForaPonta||data.consumoForaPonta||''}" style="width:90px;text-align:right;font-size:13px;padding:4px;border:1px solid var(--border);border-radius:4px;"></td>
      </tr>`;
      document.getElementById('faturaConsumoTitle').innerHTML = 'Consumo do Mês Extraído';
    }

    document.getElementById('faturaRawText').textContent = rawText.slice(0,3000);
    document.getElementById('faturaReviewModal').style.display = 'flex';
  }

  function closeFaturaReviewModal() {
    document.getElementById('faturaReviewModal').style.display = 'none';
  }

  // ================================================================
  // SIMULAÇÕES SALVAS
  // ================================================================
  function getAllSimulations() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e) { return []; }
  }
  function saveAllSimulations(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch(e) {}
  }

  function saveSimulationToList() {
    const nome = state.cliente.nome || 'Simulação';
    const uc   = state.cliente.uc   || '';
    const label = prompt('Nome para salvar esta simulação:', nome + (uc ? ' – UC ' + uc : ''));
    if (label === null) return;
    const list = getAllSimulations();
    const id = Date.now().toString();
    list.push({ id, label: label.trim() || nome, data: JSON.parse(JSON.stringify(state)), savedAt: new Date().toISOString() });
    saveAllSimulations(list);
    alert('✓ Simulação "' + (label.trim() || nome) + '" salva!');
  }

  function newSimulation() {
    if (!confirm('Criar nova simulação? Os dados atuais não salvos serão perdidos.')) return;
    state = defaultState();
    saveCurrent();
    bindAll();
    renderConsumoTable();
    recalc();
    switchTab('cliente');
  }

  function showSimulationsList() {
    const list = getAllSimulations();
    const ul = document.getElementById('simulationsList');
    if (!list.length) {
      ul.innerHTML = '<li style="color:var(--text-muted);text-align:center;padding:20px;">Nenhuma simulação salva ainda.<br>Use 💾 Salvar para guardar a simulação atual.</li>';
    } else {
      ul.innerHTML = list.slice().reverse().map(sim => {
        const dt = new Date(sim.savedAt).toLocaleDateString('pt-BR', {day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});
        return `<li style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border:1px solid var(--border);border-radius:8px;gap:8px;">
          <div style="flex:1;min-width:0;">
            <strong style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${sim.label}</strong>
            <span style="font-size:12px;color:var(--text-muted);">${dt}</span>
          </div>
          <div style="display:flex;gap:6px;flex-shrink:0;">
            <button class="btn btn-sm" onclick="loadSimulation('${sim.id}')">📂 Abrir</button>
            <button class="btn btn-sm btn-secondary" onclick="deleteSimulation('${sim.id}')" style="color:#c0392b;">🗑</button>
          </div>
        </li>`;
      }).join('');
    }
    document.getElementById('simulationsModal').style.display = 'flex';
  }

  function closeSimulationsModal() {
    document.getElementById('simulationsModal').style.display = 'none';
  }

  function loadSimulation(id) {
    const list = getAllSimulations();
    const sim = list.find(s => s.id === id);
    if (!sim) return;
    state = { ...defaultState(), ...sim.data };
    ['cliente','tarifas','tributos'].forEach(k => {
      if (typeof defaultState()[k]==='object' && !Array.isArray(defaultState()[k]))
        state[k] = { ...defaultState()[k], ...(sim.data[k]||{}) };
    });
    if (sim.data.tarifas) {
      state.tarifas.azul  = { ...defaultState().tarifas.azul,  ...(sim.data.tarifas.azul ||{}) };
      state.tarifas.verde = { ...defaultState().tarifas.verde, ...(sim.data.tarifas.verde||{}) };
    }
    if (sim.data.consumo) state.consumo = sim.data.consumo;
    saveCurrent(); bindAll(); renderConsumoTable(); recalc();
    closeSimulationsModal();
    switchTab('cliente');
    setTimeout(() => alert('✓ Simulação "' + sim.label + '" carregada!'), 150);
  }

  function deleteSimulation(id) {
    const list = getAllSimulations();
    const sim  = list.find(s => s.id === id);
    if (!sim) return;
    if (!confirm('Excluir "' + sim.label + '"?')) return;
    saveAllSimulations(list.filter(s => s.id !== id));
    showSimulationsList();
  }

    // ================================================================
  // INICIALIZAÇÃO
  // ================================================================
  document.addEventListener('DOMContentLoaded', () => {
    loadDistribuidoras();
    loadCurrent();
    renderDistribuidoraSelectors();
    bindAll();
    renderConsumoTable();
    recalc();
    switchTab('cliente');
  });

  function applyFaturaExtraction() {
    const g = id => document.getElementById(id);
    const val = id => { const el=g(id); return el ? el.value : ''; };
    const fval = id => { const el=g(id); return el ? parseFloat(el.value)||0 : 0; };

    if (val('rv-nome') && !state.cliente.nome)  state.cliente.nome  = val('rv-nome');
    if (val('rv-cnpj') && !state.cliente.cnpj)  state.cliente.cnpj  = val('rv-cnpj');
    if (val('rv-uc')   && !state.cliente.uc)    state.cliente.uc    = val('rv-uc');
    if (g('rv-classe') && !state.cliente.classe) state.cliente.classe = g('rv-classe').value;
    if (g('rv-modalidade') && !state.cliente.modalidadeAtual) state.cliente.modalidadeAtual = g('rv-modalidade').value;
    if (fval('rv-dp-c')  && !state.cliente.demandaContratadaPonta)    state.cliente.demandaContratadaPonta    = fval('rv-dp-c');
    if (fval('rv-dfp-c') && !state.cliente.demandaContratadaForaPonta) state.cliente.demandaContratadaForaPonta = fval('rv-dfp-c');

    if (faturaExtractedMonths.length > 1) {
      const novos = faturaExtractedMonths.slice(0,12);
      while (novos.length < 12) novos.push({mes:'',demandaPonta:0,demandaForaPonta:0,ultrapassagemForaPonta:0,consumoPonta:0,consumoForaPonta:0});
      state.consumo = novos;
    } else {
      const newRow = {
        mes: val('rv-mes') || (faturaExtractedMonths[0]||{}).mes || '',
        demandaPonta:          fval('rv-cdp')  || (faturaExtractedMonths[0]||{}).demandaPonta  || 0,
        demandaForaPonta:      fval('rv-cdfp') || (faturaExtractedMonths[0]||{}).demandaForaPonta || 0,
        ultrapassagemForaPonta:fval('rv-cufp') || 0,
        consumoPonta:          fval('rv-cp')   || (faturaExtractedMonths[0]||{}).consumoPonta   || 0,
        consumoForaPonta:      fval('rv-cfp')  || (faturaExtractedMonths[0]||{}).consumoForaPonta|| 0,
      };
      const emptyIdx = state.consumo.findIndex(r => !r.mes && !r.demandaPonta && !r.consumoPonta);
      if (emptyIdx >= 0) state.consumo[emptyIdx] = newRow;
      else { state.consumo.shift(); state.consumo.push(newRow); }
    }

    saveCurrent(); bindAll(); renderConsumoTable(); recalc();
    closeFaturaReviewModal();
    const n = faturaExtractedMonths.length;
    setTimeout(() => alert(n > 1
      ? `✓ ${n} meses importados com sucesso!`
      : 'Dados aplicados! Verifique as abas.'), 150);
  }

  // ================================================================
  // INICIALIZAÇÃO
  // ================================================================
  document.addEventListener('DOMContentLoaded', () => {
    loadDistribuidoras();
    loadCurrent();
    renderDistribuidoraSelectors();
    bindAll();
    renderConsumoTable();
    recalc();
    switchTab('cliente');
  });