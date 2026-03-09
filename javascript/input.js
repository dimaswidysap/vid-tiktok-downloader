const url = document.getElementById("videoUrl");
const btnClear = document.querySelector(".btn-clear-input");
// console.log(btnClear);

btnClear.addEventListener("click", () => {
  url.value = "";
  //   console.log("asu");
});

export const resetInput = () => {
  url.value = "";
};
