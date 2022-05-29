const d = JSON.parse(localStorage.getItem("ajustes"));

export const COMMON_EDITOR_OPTIONS = {
  automaticLayout: true,
  fontSize: `${!d ? +20 : d.fuenteSize}`,
  fixedOverflowWidgets: true,
  scrollBeyondLastLine: false,
  roundedSelection: false,
  padding: {
    top: 16,
  },
  lineNumbers: `${!d ? "off" : d.lineas}`,
  minimap: {
    enabled: `${!d ? false : d.minimap}`,
  },
  theme: `${!d ? "vs-dark" : d.theme}`,
};
