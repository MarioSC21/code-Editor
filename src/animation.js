import { $menuOption, $settigns, $save } from "./selector";
export const menuAnimation = () => {
  $settigns.addEventListener("click", (e) => {
    $menuOption.classList.toggle("animate");
    $settigns.classList.toggle("rotateRigth");
  });
};

export const buttonClick = () => {
  $save.addEventListener("click", (e) => {
    window.location.reload();
  });
};
