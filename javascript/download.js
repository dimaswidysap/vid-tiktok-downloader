import { resetInput } from "./input.js";
import { btnDownload } from "./script.js";

const container = document.querySelector(".con-down-vid");
const finalDownloadBtn = document.getElementById("downloadLink");
const btnBack = document.querySelector(".btn-back");

// console.log(btnBack);

btnBack.addEventListener("click", () => {
  container.style.display = "none";
  btnDownload.textContent = "Download";
  finalDownloadBtn.textContent = "Download";
  resetInput();
});

const shwoDownload = () => {
  container.style.display = "flex";
};

export default shwoDownload;
