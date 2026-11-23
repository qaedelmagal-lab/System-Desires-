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
export const css=`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap');
:root{--g:#1b5e3a;--g2:#2e7d4f;--gold:#b8892b;--bg:#f3f6f4;--t:#1d2b24;--c:#fff;--b:#d6e0da}
@media(prefers-color-scheme:dark){:root{--bg:#121a16;--t:#e6eee9;--c:#1c2721;--b:#33443a}}
*{box-sizing:border-box}body{margin:0;font-family:Cairo,Tahoma,sans-serif;background:var(--bg);color:var(--t);direction:rtl}
header{background:var(--g);color:#fff;padding:14px 16px;text-align:center;border-bottom:4px solid var(--gold)}header h1{margin:0;font-size:1.1rem}header small{opacity:.85}
main{max-width:860px;margin:0 auto;padding:14px}.card{background:var(--c);border:1px solid var(--b);border-radius:12px;padding:14px;margin-bottom:12px}
label{display:block;font-weight:600;margin:8px 0 4px;font-size:.9rem}input,select,textarea,button{font:inherit;width:100%;padding:10px;border-radius:8px;border:1px solid var(--b);background:var(--c);color:var(--t)}
button{background:var(--g);color:#fff;border:0;font-weight:700;cursor:pointer;margin-top:8px}button.alt{background:var(--c);color:var(--g);border:1px solid var(--g)}button.red{background:#a32d2d}button:disabled{opacity:.5}
.row{display:grid;grid-template-columns:1fr 1fr;gap:10px}@media(max-width:600px){.row{grid-template-columns:1fr}}
.msg{padding:10px;border-radius:8px;margin:8px 0;font-size:.9rem}.err{background:#fcebeb;color:#791f1f}.ok{background:#e1f5ee;color:#085041}.warn{background:#faeeda;color:#633806}
.list{border:1px solid var(--b);border-radius:8px;max-height:200px;overflow:auto}.list div{padding:9px;border-bottom:1px solid var(--b);cursor:pointer}.list div:hover{background:var(--bg)}
.w1{border-right:6px solid #1b5e3a}.w2{border-right:6px solid #b8892b}.w3{border-right:6px solid #2a5fa8}
table{width:100%;border-collapse:collapse;font-size:.85rem}th,td{border:1px solid var(--b);padding:6px;text-align:right}th{background:var(--bg)}.scroll{overflow-x:auto}
.tabs{display:flex;gap:6px;flex-wrap:wrap}.tabs button{width:auto;flex:1;margin:0}.hide{display:none!important}.badge{padding:2px 8px;border-radius:10px;font-size:.78rem;background:var(--bg)}`;
