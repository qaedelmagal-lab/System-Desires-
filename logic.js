export const fa=s=>String(s??"").replace(/[\u064B-\u065F\u0640]/g,"").replace(/[أإآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/\s+/g," ").trim();
const en=s=>String(s??"").replace(/[٠-٩]/g,d=>"٠١٢٣٤٥٦٧٨٩".indexOf(d)).trim();
const nr=r=>r.map(c=>String(c??"").replace(/\s+/g," ").trim());
const cleanAdv=a=>a.replace(/^(أ\.?\s*د|د|دكتور|الدكتور)\s*\.?\s*\/\s*/,"").trim();
function cols(h){return{id:h.findIndex(x=>["الكود","كود","م","الكود التسلسلي"].includes(x)),name:h.findIndex(x=>(x.includes("اسم")||x.includes("الطالب"))&&!x.includes("مرشد")),adv:h.findIndex(x=>x.includes("مرشد"))}}
export function parseStudents(rows){rows=rows.filter(r=>r.some(c=>String(c).trim()));if(!rows.length)throw Error("الملف فارغ");const c=cols(nr(rows[0]));if(c.name<0)throw Error("لم أجد عمود الاسم. يجب أن يكون عنوانه: الاسم");const out=[];for(const r0 of rows.slice(1)){const r=nr(r0),name=r[c.name];if(!name)continue;const id=c.id>=0?parseInt(en(r[c.id])):0;out.push({name,id:id>0?id:0})}if(!out.length)throw Error("لا توجد أسماء في الملف");return out}
export function mergeStudents(old,rows,remove,isReg){const byId=new Map(old.map(s=>[s.id,s])),byName=new Map();for(const s of old){const k=fa(s.name);if(!byName.has(k))byName.set(k,[]);byName.get(k).push(s)}
const used=new Set(),res=new Map(),conf=[];let max=Math.max(0,...old.map(s=>s.id),...rows.map(r=>r.id)),add=0,upd=0,removed=0,kept=0;
for(const r of rows){let s;if(r.id){if(res.has(r.id)){conf.push(`الكود ${r.id} مكرر في الملف (${r.name})`);continue}const o=byId.get(r.id);if(o){if(fa(o.name)!==fa(r.name)&&isReg(o.id)){conf.push(`الكود ${o.id} مسجل بحساب باسم مختلف (${o.name}) – لم يتغير`);used.add(o.id);res.set(o.id,o);continue}s={...o,name:r.name};if(o.name!==r.name)upd++;used.add(o.id)}else{s={id:r.id,name:r.name,advisor:"غير موجود"};add++}}
else{const o=(byName.get(fa(r.name))||[]).find(x=>!used.has(x.id));if(o){s={...o,name:r.name};used.add(o.id)}else{s={id:++max,name:r.name,advisor:"غير موجود"};add++}}res.set(s.id,s)}
for(const o of old)if(!res.has(o.id)){if(remove&&!isReg(o.id))removed++;else{if(remove)kept++;res.set(o.id,o)}}
return{list:[...res.values()].sort((a,b)=>a.id-b.id),add,upd,removed,kept,conf}}
export function parseAdvisors(rows,roster){rows=rows.filter(r=>r.some(c=>String(c).trim()));if(!rows.length)throw Error("الملف فارغ");const c=cols(nr(rows[0]));if(c.adv<0)throw Error("لم أجد عمود المرشد. يجب أن يكون عنوانه: المرشد");if(c.name<0&&c.id<0)throw Error("لم أجد عمود اسم الطالب أو الكود");
const byId=new Map(),byName=new Map(),advs=new Set();
for(const r0 of rows.slice(1)){const r=nr(r0),a=cleanAdv(r[c.adv]);if(!a)continue;advs.add(a);const id=c.id>=0?parseInt(en(r[c.id])):0;if(id>0)byId.set(id,a);if(c.name>=0&&r[c.name])byName.set(fa(r[c.name]),a)}
let matched=0;const names=[...byName.keys()].filter(k=>k.length>12);
const list=roster.map(s=>{let a=byId.get(s.id)||byName.get(fa(s.name));if(!a){const k=fa(s.name),m=names.find(n=>k.startsWith(n)||n.startsWith(k));if(m)a=byName.get(m)}if(!a){const t=fa(s.name).split(" "),c=[...byName.keys()].filter(n=>{const u=n.split(" ");if(u.length<3||u[0]!==t[0]||u[u.length-1]!==t[t.length-1])return false;let j=0;for(const w of t)if(w===u[j])j++;return j===u.length});if(c.length===1)a=byName.get(c[0])}if(a)matched++;return{...s,advisor:a||"غير موجود"}});
return{list,advisors:[...advs],matched,unmatched:roster.length-matched}}
const NO=v=>["لا","no","0","false","موقوف","غير مفعل"].includes(String(v).trim().toLowerCase());
const strip=t=>t.replace(/^اجتياز:\s*/,"");
export function parseCatalog(sheets,old){if(sheets.length<3)throw Error("الملف يجب أن يحتوي 3 أوراق: البرامج، مقررات البرامج، المقررات الاختيارية");const err=[],oldBy=new Map((old?.programs||[]).map(p=>[fa(p.name),p.id]));const body=r=>r.slice(1).map(nr).filter(x=>x[0]);
const programs=body(sheets[0]).map((r,i)=>({id:oldBy.get(fa(r[0]))||"p"+Date.now().toString(36)+i,name:r[0],active:!NO(r[2]||"نعم"),req:r[1]?(r[1].startsWith("اجتياز")?r[1]:"اجتياز: "+r[1]):"",courses:[]}));
if(!programs.length)throw Error("ورقة البرامج فارغة");const pm=new Map(programs.map(p=>[fa(p.name),p]));
for(const r of body(sheets[1])){const p=pm.get(fa(r[0]));if(!p){err.push(`برنامج غير معروف في ورقة المقررات: ${r[0]}`);continue}if(r[1]&&!p.courses.includes(r[1]))p.courses.push(r[1])}
for(const p of programs)if(p.courses.length<2)err.push(`البرنامج "${p.name}" يحتاج مقررين على الأقل`);
const electives=body(sheets[2]).map(r=>{const blocked=[];for(const n of String(r[1]||"").split(/[،,;\n]/).map(x=>x.trim()).filter(x=>x&&x!="--")){const p=pm.get(fa(n));if(p)blocked.push(p.id);else err.push(`برنامج غير معروف في الممنوعات (${r[0]}): ${n}`)}return{name:r[0],blocked}});
if(err.length)throw Error(err.join("\n"));return{programs,electives}}
export function catalogRows(cat){const nm=id=>cat.programs.find(p=>p.id==id)?.name||id;return{"البرامج":[["البرنامج","شروط الالتحاق (المقررات المؤهلة)","مفعّل (نعم/لا)"],...cat.programs.map(p=>[p.name,strip(p.req),p.active?"نعم":"لا"])],"مقررات البرامج":[["البرنامج","المقرر"],...cat.programs.flatMap(p=>p.courses.map(c=>[p.name,c]))],"المقررات الاختيارية":[["المقرر","البرامج الممنوعة (مفصولة بـ ،)"],...cat.electives.map(e=>[e.name,e.blocked.map(nm).join("، ")||"--"])]}}
