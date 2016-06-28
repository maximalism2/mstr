export default function (html, reduxState = {}) {
  return `
    <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Master | mstr.ws</title><style>.error-box{display:inline-block;position:fixed;top:0;left:0;padding:.4rem 1.5rem .6rem;width:auto;background:rgba(255,255,255,.8);border:1px solid #ed6c63;border-bottom-right-radius:5px;color:#ed6c63}.main-title{margin-top:10vh;text-align:center;font-size:3rem;letter-spacing:.1rem;color:#1babbb}.sub-title.error{color:#ed6c63}.main-loader{width:150px;height:150px;margin:2vh auto}</style></head><body>
      <div id="root">
        ${html}
      </div>
      <script>
        window.__initialAppState__ = ${JSON.stringify(reduxState)};
      </script>
    <script>window.addEventListener("error",function(t){var e=document.createElement("div");e.className="error-box";e.textContent=t.message,document.body.appendChild(e);},!1);</script><link href="/components/font-awesome/css/font-awesome.min.css" rel="stylesheet" lazyload><link href="/styles/css/main.min.css" rel="stylesheet" lazyload><script src="/js/common.js" defer></script><script src="/js/app.js" defer><script src="/js/ga.js"></script></script></body></html>
  `;
}