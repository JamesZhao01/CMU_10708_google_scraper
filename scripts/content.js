document.body.style.background = "blue";

const styleString = `
  .boom {
    border: 5px solid red;
    box-sizing: border-box;
  }
`;
const style = document.createElement("style");
style.textContent = styleString;
document.head.append(style);
console.log("Injected");

function callback(ev) {
  ev.preventDefault();
  console.log(ev.target.src);
  return false;
}

document.addEventListener("mouseover", (event) => {
  let target = event.target;
  if (target.tagName == "IMG") {
    target.classList.add("boom");
    target.addEventListener("contextmenu", callback, false);
  }
});

document.addEventListener("mouseout", (event) => {
  let target = event.target;
  if (target.tagName == "IMG" && target.classList.contains("boom")) {
    target.classList.remove("boom");
    // console.log("exit", target);
    target.removeEventListener("contextmenu", callback);
  }
});
