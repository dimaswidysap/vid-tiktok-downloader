const warning = () => {
  const conWarning = document.querySelector(".warning");
  const btnClose = document.querySelector(".btn-warning-close");

  conWarning.style.display = "flex";

  btnClose.addEventListener("click", () => {
    conWarning.style.display = "none";
  });

  // console.log("warning");
};

export default warning;
