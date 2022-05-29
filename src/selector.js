export const getElemento = (selector) => document.querySelector(selector);
const getElementos = (selector) => document.querySelectorAll(selector);

export const $js = getElemento("#js");
export const $css = getElemento("#css");
export const $html = getElemento("#html");
export const $settigns = getElemento("#ajustes");
export const $btnDocument = getElemento("#btnDocument");
export const $select = getElemento("#linenumbers");
export const $minimap = getElemento("#minimap");
export const $theme = getElemento("#theme");
export const $fuenteSize = getElemento("#fuente");
export const $save = getElemento("#save");
export const $menuOption = getElemento("#menu-option");
export const $copy = getElementos("#copy");
export const $avisoCopy = getElementos("#avisoCopy");
