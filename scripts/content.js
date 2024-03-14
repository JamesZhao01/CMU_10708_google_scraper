const styleString = `
  .boom {
    border: 5px solid red;
    box-sizing: border-box;
  }
  .bam {
    opacity: 0.5;
  }
  #floater {
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: gray;
    border: 1px solid magenta;
    z-index: 999999999999;
    padding: 5px 10px;
    display: block;
  }
`;

const style = document.createElement("style");
style.textContent = styleString;
document.head.append(style);

const floater = document.createElement("div");
floater.id = "floater";
floater.innerText = "0";
document.body.appendChild(floater);

document.img_urls = new Set();
document.ctr = 0;

function callback(ev) {
  ev.preventDefault();
  // console.log(ev.target.src);
  if (!ev.target.classList.contains("bam")) {
    document.img_urls.add(ev.target.src);
    if (ev.target.classList.contains("boom")) {
      ev.target.classList.remove("boom");
    }
    ev.target.classList.add("bam");
    document.ctr += 1;
    floater.innerText = document.ctr;
  } else {
    if (document.img_urls.has(ev.target.src)) {
      document.img_urls.delete(ev.target.src);
      ev.target.classList.remove("bam");
      document.ctr -= 1;
      floater.innerText = document.ctr;
    }
  }
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
  if (msg.text === "report_back") {
    sendResponse(Array.from(document.img_urls));
  }
});
