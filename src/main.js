import "../style.css";
import Split from "split-grid";
import { encode, decode } from "js-base64";
import * as monaco from "monaco-editor";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import JsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { COMMON_EDITOR_OPTIONS } from "./configuration";
import { disposeHTML, disposeCSS, disposeJS } from "./emmet";
import {
  $js,
  $css,
  $html,
  getElemento,
  $btnDocument,
  $copy,
  $avisoCopy,
} from "./selector";
import { menuAnimation, buttonClick } from "./animation";
import { LocalStorage } from "./localStorage";

menuAnimation();
buttonClick();
LocalStorage();

window.MonacoEnvironment = {
  getWorker(_, label) {
    if (label == "html") return new HtmlWorker();
    if (label == "javascript") return new JsWorker();
    if (label == "css") return new CssWorker();
  },
};
Split({
  columnGutters: [
    {
      track: 1,
      element: document.querySelector(".gutter-col-1"),
    },
  ],
  rowGutters: [
    {
      track: 1,
      element: document.querySelector(".gutter-row-1"),
    },
  ],
});

function disabledButon() {
  if (htmlget === "" && cssget === "" && jsget === "") {
    $btnDocument.disabled = true;
    $btnDocument.style.opacity = "0.3";
  } else {
    $btnDocument.disabled = false;
    $btnDocument.style.opacity = "1";
  }
}

const { pathname } = window.location;

const [rawhtml, rawcss, rawjs] = pathname
  .slice(1)
  .replace("%7D", "")
  .split("%7C");

const html = `${rawhtml ? decode(rawhtml) : ""}`;
const css = `${rawcss ? decode(rawcss) : ""}`;
const js = `${rawjs ? decode(rawjs) : ""}`;

const htmlEditor = monaco.editor.create($html, {
  value: html,
  language: "html",
  editorDidMount: { disposeHTML },
  ...COMMON_EDITOR_OPTIONS,
});
const cssEditor = monaco.editor.create($css, {
  value: css,
  language: "css",
  editorDidMount: { disposeCSS },
  ...COMMON_EDITOR_OPTIONS,
});
const jsEditor = monaco.editor.create($js, {
  value: js,
  language: "javascript",
  editorDidMount: { disposeJS },
  ...COMMON_EDITOR_OPTIONS,
});
htmlEditor.onDidChangeModelContent(update);
cssEditor.onDidChangeModelContent(update);
jsEditor.onDidChangeModelContent(update);

const html2 = createHtml({ html, css, js });
getElemento("iframe").setAttribute("srcdoc", html2);

//?varaibles globales para obtner el vvalor del get del monaco en tiempo real
let htmlget = htmlEditor.getValue();
let cssget = cssEditor.getValue();
let jsget = jsEditor.getValue();

disabledButon();

function update() {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  htmlget = html;
  cssget = css;
  jsget = js;

  disabledButon();
  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}}`;
  window.history.replaceState(null, null, `/${hashedCode}`);

  const html2 = createHtml({ html, js, css });
  getElemento("iframe").setAttribute("srcdoc", html2);
}

//?evento para copiar al portapeles
const clicks = Array.from($copy);
const avisos = Array.from($avisoCopy);
clicks.map((cli, index) => {
  cli.addEventListener("click", (e) => {
    console.log(htmlget);
    index === 0 && navigator.clipboard.writeText(htmlget);
    index === 1 && navigator.clipboard.writeText(jsget);
    index === 2 && navigator.clipboard.writeText(cssget);
    avisos[index].classList.toggle("animation-aviso");
    setTimeout(() => {
      avisos[index].classList.toggle("animation-aviso");
    }, "1200");
  });
});

//? funcion para descargar losa rchivos
function download(filename, text) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

//?evento para descargar
$btnDocument.addEventListener("click", () => {
  const textHtml = htmlget;
  const filenameHtml = "index.html";

  const textCss = cssget;
  const filenameCss = "style.css";

  const textJs = jsget;
  const filenameJs = "index.js";

  download(filenameHtml, textHtml);
  download(filenameCss, textCss);
  download(filenameJs, textJs);
});

//?funcion para el render del html
function createHtml({ html, js, css }) {
  const htmlRender = ` <!DOCTYPE html>
    <html lang="en">
      <head>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          ${js}
        </script>
      </body>
    </html>  `;
  return htmlRender;
}
