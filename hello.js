async function printStuff() {
  chrome.tabs.query(
    { currentWindow: true, active: true },
    async function (tabs) {
      var activeTab = tabs[0];
      const response = await chrome.tabs.sendMessage(activeTab.id, {
        text: "report_back",
      });
      document.querySelector("#stuff").innerHTML = "";
      console.log(response);
      if (response && response instanceof Array) {
        for (let q of response) {
          let obj = document.createElement("li");
          let text = q.length < 50 ? q : q.slice(0, 50) + "...";
          obj.innerText = text;
          document.querySelector("#stuff").appendChild(obj);
        }
        document.img_urls = response;
      }
    }
  );
}

function doCopy() {
  document.querySelector(
    "#log"
  ).innerText = `Copied ${document.img_urls.length} url(s).`;
  navigator.clipboard.writeText(JSON.stringify(document.img_urls));
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("#button").addEventListener("click", printStuff);
  document.querySelector("#copy").addEventListener("click", doCopy);
});
