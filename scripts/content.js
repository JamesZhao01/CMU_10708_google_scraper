const styleString = `
  .boom {
    border: 5px solid red;
    box-sizing: border-box;
  }
  .bam {
    opacity: 0.5;
  }
`;
const style = document.createElement("style");
style.textContent = styleString;
document.head.append(style);
console.log("Injected");

document.img_urls = [];

function callback(ev) {
  ev.preventDefault();
  // console.log(ev.target.src);
  document.img_urls.push(ev.target.src);
  if (ev.target.classList.contains("boom")) {
    ev.target.classList.remove("boom");
  }
  ev.target.classList.add("bam");
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

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  console.log("Message", msg);
  if (msg.text === "report_back") {
    sendResponse(document.img_urls);
  }
});
