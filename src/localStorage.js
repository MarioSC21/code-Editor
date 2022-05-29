import { $fuenteSize, $minimap, $select, $theme } from "./selector";
import { COMMON_EDITOR_OPTIONS } from "./configuration";

export const LocalStorage = () => {
  const getLocalStorage = JSON.parse(localStorage.getItem("ajustes"));

  const storageSetings = {
    lineas: `${!getLocalStorage ? "off" : getLocalStorage.lineas}`,
    valorLine: `${!getLocalStorage ? +0 : +getLocalStorage.valorLine}`,
    minimap: `${!getLocalStorage ? false : getLocalStorage.minimap}`,
    valorMinimap: `${!getLocalStorage ? +0 : +getLocalStorage.valorMinimap}`,
    theme: `${!getLocalStorage ? "vs-dark" : getLocalStorage.theme}`,
    valorTheme: `${!getLocalStorage ? +0 : +getLocalStorage.valorTheme}`,
    fuenteSize: `${!getLocalStorage ? +20 : +getLocalStorage.fuenteSize}`,
  };

  $select.addEventListener("change", async (e) => {
    storageSetings.lineas = e.target.value;
    storageSetings.valorLine = +$select.options.selectedIndex;
    localStorage.setItem("ajustes", JSON.stringify(storageSetings));
  });

  $minimap.addEventListener("change", async (e) => {
    if (e.target.value === "true") {
      storageSetings.minimap = true;
    } else {
      storageSetings.minimap = false;
    }
    storageSetings.valorMinimap = +$minimap.options.selectedIndex;
    localStorage.setItem("ajustes", JSON.stringify(storageSetings));
  });

  $theme.addEventListener("change", async (e) => {
    storageSetings.theme = e.target.value;
    storageSetings.valorTheme = +$theme.options.selectedIndex;
    localStorage.setItem("ajustes", JSON.stringify(storageSetings));
    console.log(e.target.value);
  });

  $fuenteSize.addEventListener("change", async (e) => {
    storageSetings.fuenteSize = e.target.value;
    localStorage.setItem("ajustes", JSON.stringify(storageSetings));
  });

  $fuenteSize.value = COMMON_EDITOR_OPTIONS.fontSize;

  if (getLocalStorage) {
    $select.options.selectedIndex = getLocalStorage.valorLine;
    $minimap.options.selectedIndex = getLocalStorage.valorMinimap;
    $theme.options.selectedIndex = getLocalStorage.valorTheme;
    $fuenteSize.value = getLocalStorage.fuenteSize;
  }
};
