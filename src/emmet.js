import * as monaco from "monaco-editor";
import { emmetHTML, emmetCSS, emmetJSX } from "emmet-monaco-es";

export const disposeHTML = emmetHTML(monaco, ["html", "php"]);
export const disposeCSS = emmetCSS(monaco, ["css", "scss"]);
export const disposeJS = emmetJSX(monaco, ["javascript"]);
