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
  #floater2 {
    position: fixed;
    top: 0px;
    right: 0px;
    background-color: gray;
    border: 1px solid magenta;
    z-index: 999999999999;
    padding: 5px 10px;
    display: block;
  }
  #cleanse {
    width: 48px;
    height: 48px;
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

const floater2 = document.createElement("div");
floater2.id = "floater2";
const cleanse = document.createElement("button");
const img = document.createElement("img");
img.src =
  "https://yt3.googleusercontent.com/yChbG__l6RhGYE4F-O57aZS-wP-Lv6oDrQJMN9vXDppJGB5AqAb8By7LvJfRTQaq22Ot77QChw=s900-c-k-c0x00ffffff-no-rj";
img.id = "cleanse";
cleanse.appendChild(img);
floater2.appendChild(cleanse);
document.body.appendChild(floater2);

document.img_urls = new Set();
document.ctr = 0;

function cleansefn(ev) {
  document.img_urls.clear();
  document.ctr = 0;
  floater.innerText = document.ctr;
}

cleanse.addEventListener("click", cleansefn);

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
      document.ctr -= 1;
      floater.innerText = document.ctr;
    }
    if (ev.target.classList.contains("bam")) {
      ev.target.classList.remove("bam");
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
