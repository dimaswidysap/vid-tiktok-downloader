import { resetInput } from "./input.js";

const container = document.querySelector(".con-down-vid");

const btnBack = document.querySelector(".btn-back");

// console.log(btnBack);

btnBack.addEventListener("click", () => {
  container.style.display = "none";
  resetInput();
});

const shwoDownload = () => {
  container.style.display = "flex";
};

export default shwoDownload;
