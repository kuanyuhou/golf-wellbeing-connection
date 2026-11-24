// 產生網站頁面：把 content/*.html 的內文套上共用的頁首、導覽列和頁尾。
// 用法：node build.mjs
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "高爾夫・身心健康與人際互動";
const TAGLINE = "打一場球，照顧身體、安頓心情、連結彼此";
const BASE = "https://kuanyuhou.github.io/golf-wellbeing-connection/";
const OG_IMAGE = `${BASE}og-image.png`; // 原始設計在 og/og.html，1200×630

// nav: 導覽列文字；star: 重點頁（身心健康、人際互動）
const pages = [
  { file: "index", nav: "首頁", title: SITE, desc: "從高爾夫談身心健康與人際互動，並整理入門、品格、心理訓練、禮儀、規則、裝備與 2026 年賽事資訊。" },
  { file: "wellbeing", nav: "★ 身心健康", star: true, title: "高爾夫與身心健康", desc: "高爾夫對身體與心理的好處、受傷與熱傷害預防、防曬與眼睛保護、不同族群的注意事項與每週身心健康計畫。" },
  { file: "social", nav: "★ 人際互動", star: true, title: "高爾夫與人際互動", desc: "高爾夫為什麼是很好的社交運動，以及和球友、桿弟、家人、長輩、新手與球隊互動的方法和溝通技巧。" },
  { file: "character", nav: "品格培養", title: "高爾夫培養品格", desc: "誠實、正直、尊重、責任感、自律、耐心與運動家精神，附國際與台灣選手的品格故事。" },
  { file: "mental", nav: "心理訓練", title: "高爾夫心理訓練", desc: "擊球前例行程序、呼吸法、意象訓練、自我對話、壓力管理與每週心理訓練計畫。" },
  { file: "fitness", nav: "熱身與體能", title: "熱身、營養與體能訓練", desc: "下場前的熱身、飲食補水、營養補充品，以及準備期的柔軟度、肌力與爆發力訓練。" },
  { file: "health", nav: "防曬與眼睛", title: "身心益處、防曬與眼睛保護", desc: "高爾夫對身體、心理與社交的好處，以及防曬和眼睛保護的完整建議。" },
  { file: "intro", nav: "高爾夫入門", title: "高爾夫入門與規則", desc: "高爾夫是什麼、基本規則、常見罰則，以及 14 支球桿上限的由來。" },
  { file: "etiquette", nav: "服裝與禮儀", title: "服裝、帽子與時間禮儀", desc: "高爾夫服裝禮儀、帽子選擇，以及準時與打球速度的時間禮儀。" },
  { file: "formats", nav: "賽制與差點", title: "比桿賽、比洞賽與差點", desc: "比桿賽與比洞賽的規則、團體賽形式，以及世界差點系統和新新貝利亞制。" },
  { file: "equipment", nav: "球桿與球", title: "球桿與高爾夫球", desc: "木桿、混血桿、鐵桿、挖起桿、推桿、桿身與握把，以及高爾夫球的規格與選擇。" },
  { file: "tours", nav: "2026 職業賽事", title: "2026 年職業賽事", desc: "2026 年 TPGA、TLPGA、LPGA、PGA Tour、DP World Tour 與亞洲巡迴賽的賽程與重點。" },
  { file: "courses", nav: "各國球場數量", title: "各國高爾夫球場數量", desc: "台灣與 10 個國家的高爾夫球場數量比較。" },
  { file: "turf", nav: "草種與南部球場", title: "球場草種與南部球場", desc: "冷季草與暖季草、各區域常見草種，以及台灣南部各球場的果嶺草種整理。" },
];

function nav(current) {
  return pages
    .map((p) => {
      const cls = p.star ? ' class="star"' : "";
      const cur = p.file === current ? ' aria-current="page"' : "";
      return `    <a href="${p.file}.html"${cls}${cur}>${p.nav}</a>`;
    })
    .join("\n");
}

for (const p of pages) {
  const body = readFileSync(`content/${p.file}.html`, "utf8").trim();
  const title = p.file === "index" ? SITE : `${p.title}｜${SITE}`;
  const url = p.file === "index" ? BASE : `${BASE}${p.file}.html`;
  const html = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${p.desc}">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE}">
<meta property="og:locale" content="zh_TW">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${p.desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${OG_IMAGE}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${SITE}：${TAGLINE}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${p.desc}">
<meta name="twitter:image" content="${OG_IMAGE}">
<link rel="stylesheet" href="style.css">
</head>
<body>
<header class="site"><div class="inner">
  <a class="brand" href="index.html">${SITE}</a>
  <p>${TAGLINE}</p>
  <nav class="site">
${nav(p.file)}
  </nav>
</div></header>
<main>
${body}
</main>
<footer><div class="inner">
  <p>本站內容整理於 2026 年 11 月，屬於一般資訊，不能取代醫師、心理師、教練或其他專業人員的個別建議。</p>
  <p>賽程、球場與草種資料可能變動，請以各主辦單位與球場的最新公告為準。</p>
</div></footer>
</body>
</html>
`;
  writeFileSync(`${p.file}.html`, html);
  console.log(`built ${p.file}.html`);
}
