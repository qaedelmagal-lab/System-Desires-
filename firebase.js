import{initializeApp}from"https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import*as A from"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import*as F from"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
const cfg={apiKey:"AIzaSyAOv-QXLbn_40sqmivnbjH6PDrxNeOYd38",authDomain:"system-desires.firebaseapp.com",databaseURL:"https://system-desires-default-rtdb.firebaseio.com",projectId:"system-desires",storageBucket:"system-desires.firebasestorage.app",messagingSenderId:"868018180629",appId:"1:868018180629:web:5c5976732c1ee7dff1b41c"};
export const app=initializeApp(cfg),auth=A.getAuth(app),db=F.getFirestore(app);
export{A,F};
export const DRIVE_CLIENT_ID="";/* ضع هنا Client ID الخاص بـ Google Drive (انظر README) */
export const DRIVE_FOLDER="نظام تسجيل الرغبات - كلية الزراعة";
export const email=n=>n+"@desires.fayoum-agri.edu";
export const validNid=n=>/^\d{14}$/.test(n);
export const mask=n=>n?n.slice(0,3)+"********"+n.slice(-3):"";
export const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export const fa=s=>String(s||"").replace(/[أإآ]/g,"ا").replace(/ى/g,"ي").replace(/ة/g,"ه").replace(/\s+/g," ").trim();
export const DEFAULT_CATALOG={programs:[
{id:"plant",name:"الإنتاج النباتي",active:true,req:"اجتياز: أسس زراعة المحاصيل الحقلية - أسس حاصلات بستانية",courses:["انتاج محاصيل حقلية","أنتاج خضر وفاكهة","انتاج محاصيل تحت ظروف الاجهاد","اسس زراعة الفاكهة في الاراضي الجديدة","اسس تربية محاصيل حقلية وبستانية"]},
{id:"animal",name:"الإنتاج الحيواني",active:true,req:"اجتياز: أسس إنتاج حيواني ودواجن",courses:["أسس تغذية حيوان","تجهيزات مزارع الانتاج الحيواني","فسيولوجيا حيوان","تصميم وإنشاء مزارع الدواجن","رعاية حيوان"]},
{id:"soil",name:"الأراضي والمياه",active:true,req:"اجتياز: اسس علوم الأراضي - فيزياء وارصاد جويه",courses:["نشأة وتكوين الأراضي","المساحة الزراعية","إدارة الأراضي والمياه","معادن وغرويات التربة","تحليل التربة والمياه والنبات"]},
{id:"food",name:"علوم وتكنولوجيا الأغذية",active:true,req:"اجتياز: مقدمة في علوم الأغذية (80) - كيمياء حيوية (جيد على الأقل) - ميكروبيولوجيا عامة (جيد على الأقل)",courses:["أساسيات الصناعات الغذائية","اللبن السائل ومعاملاته","أساسيات تصنيع منتجات الألبان","تكنولوجيا المستخلصات الغذائية","ميكروبيولوجيا الأغذية والألبان ومكوناتها"]},
{id:"protect",name:"وقاية النبات",active:true,req:"اجتياز: حيوان زراعي - أسس وقاية النبات - نبات مورفولوجي",courses:["اسس امراض النبات","اسس مبيدات","أساسيات علم الحشرات","إدارة المتكاملة لمكافحة الافات","امراض الزاعات المحمية والعضوية"]},
{id:"econ",name:"العلوم الاقتصادية والاجتماعية الزراعية",active:true,req:"اجتياز: أقتصاد عام - مجتمع وتنمية ريفية",courses:["اقتصاد زراعي","تشريعات زراعية وإعلامية","أساسيات الارشاد الزراعي","إدارة وتنمية الموارد البشرية","مشروعات زراعية صغيرة"]},
{id:"biotech",name:"التكنولوجيا الحيوية",active:true,req:"اجتياز: كيمياء حيوية (جيد جدا على الأقل) - ميكروبيولوجيا عامة (جيد جدا على الأقل)",courses:["مقدمة في التكنولوجيا الحيوية","أخلاقيات التكنولوجيا الحيوية","تطبيقات في الكيمياء الحيوية","علم الخلية","بكتريا مرضية"]}],
electives:[
{name:"إقتصاديات البيئة الزراعية",blocked:["econ"]},{name:"إقتصاديات انتاج متسويق الانتاج الحيواني",blocked:["econ"]},{name:"مراقبة الجودة في مصانع الالبان",blocked:["food"]},{name:"تصميم وانشاء المزارع السمكية",blocked:["animal"]},{name:"مسببات امراض النبات",blocked:["protect"]},{name:"تقسيم النباتات الزهرية",blocked:[]},{name:"بيئة نباتية",blocked:[]},{name:"تربية نحل العسل وديدان الحرير",blocked:["protect"]},{name:"وراثة ميكروبية",blocked:["biotech"]},{name:"تكنولوجيا اكثار الحاصلات البستانية",blocked:["plant"]},{name:"ميكروبيولوجيا البيئة",blocked:["biotech"]},{name:"ميكنة زراعية",blocked:["soil"]},{name:"الزراعات العضوية للحاصلات البستانية",blocked:[]},{name:"انتاج محاصيل الحبوب والبقول",blocked:["plant"]}]};
export async function loadCatalog(){try{const s=await F.getDoc(F.doc(db,"config","catalog"));if(s.exists())return JSON.parse(s.data().json)}catch(e){}return DEFAULT_CATALOG}
export const cached=async(key,ttl,fn)=>{try{const c=JSON.parse(localStorage.getItem(key)||"null");if(c&&Date.now()-c.t<ttl)return c.v}catch(e){}const v=await fn();try{if(!(Array.isArray(v)&&!v.length))localStorage.setItem(key,JSON.stringify({t:Date.now(),v}))}catch(e){}return v};
export const loadBranding=async()=>{try{const s=await F.getDoc(F.doc(db,"public","branding"));return s.exists()?s.data():{}}catch(e){return{}}};
export function initTheme(){let t=null;try{t=localStorage.getItem("theme")}catch(e){}if(!t)t=matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}
export function toggleTheme(){const t=document.documentElement.dataset.theme=="dark"?"light":"dark";document.documentElement.dataset.theme=t;try{localStorage.setItem("theme",t)}catch(e){}}
initTheme();
export const css=`:root{--bg:#fff;--t:#111;--c:#fff;--b:#c9c9c9;--a:#111;--ac:#fff;--th:#f1f1f1;--okb:#e8f3ec;--okt:#14532d;--erb:#fdeaea;--ert:#7a1f1f;--wb:#fff4dc;--wt:#6b4a00}
:root[data-theme=dark]{--bg:#0f0f0f;--t:#f2f2f2;--c:#1a1a1a;--b:#3d3d3d;--a:#f2f2f2;--ac:#111;--th:#262626;--okb:#12301f;--okt:#9be2b5;--erb:#3a1818;--ert:#f5b5b5;--wb:#3a2c0a;--wt:#f3d58a}
*{box-sizing:border-box}body{margin:0;font-family:Tahoma,Arial,sans-serif;background:var(--bg);color:var(--t);direction:rtl}
header{background:var(--c);color:var(--t);padding:14px 56px;text-align:center;border-bottom:3px solid var(--a);position:relative}header h1{margin:0;font-size:1.1rem}header small{opacity:.8}
#th{position:absolute;left:10px;top:12px;width:auto;margin:0;padding:4px 10px;background:transparent;color:var(--t);border:1px solid var(--b)}
main{max-width:860px;margin:0 auto;padding:14px}.card{background:var(--c);border:1px solid var(--b);border-radius:8px;padding:14px;margin-bottom:12px}
label{display:block;font-weight:700;margin:8px 0 4px;font-size:.9rem}input,select,textarea,button{font:inherit;width:100%;padding:10px;border-radius:6px;border:1px solid var(--b);background:var(--c);color:var(--t)}
button{background:var(--a);color:var(--ac);border:1px solid var(--a);font-weight:700;cursor:pointer;margin-top:8px}button.alt{background:transparent;color:var(--a)}button.red{background:#b3261e;border-color:#b3261e;color:#fff}button:disabled{opacity:.45;cursor:not-allowed}
.row{display:grid;grid-template-columns:1fr 1fr;gap:10px}@media(max-width:600px){.row{grid-template-columns:1fr}}
.msg{padding:10px;border-radius:6px;margin:8px 0;font-size:.9rem}.err{background:var(--erb);color:var(--ert)}.ok{background:var(--okb);color:var(--okt)}.warn{background:var(--wb);color:var(--wt)}
.list{border:1px solid var(--b);border-radius:6px;max-height:200px;overflow:auto}.list div{padding:9px;border-bottom:1px solid var(--b);cursor:pointer}.list div:hover{background:var(--th)}
.w1{border-right:6px solid var(--t)}.w2{border-right:6px solid #1f5fe0}.w3{border-right:6px solid #d32f2f}
table{width:100%;border-collapse:collapse;font-size:.85rem}th,td{border:1px solid var(--b);padding:6px;text-align:right}th{background:var(--th)}.scroll{overflow-x:auto}
.tabs{display:flex;gap:6px;flex-wrap:wrap}.tabs button{width:auto;flex:1;margin:0}.hide{display:none!important}.badge{padding:2px 8px;border-radius:10px;font-size:.78rem;background:var(--th)}
.ft{text-align:center;padding:18px;font-size:.8rem;opacity:.7;direction:ltr}hr{border:0;border-top:1px solid var(--b);margin:14px 0}`;
