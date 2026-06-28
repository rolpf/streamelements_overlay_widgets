let count = 638;
let countDiv = document.getElementById("count-div");
let lastCommandTimeStamp = 0;
let currentTime = 0;
document.getElementById("count-div").innerHTML = count.toString();

// Imo faut faire une variable pour stocker un timestamp, et si y'a moins de 5 secondes entre le timestamp stocké et l'heure actuelle tu rejette, sinon tu exécute ta commande et met a jour le timestamp stocké

function getCurrentTime() {
  return (currentTime = Date.now());
}

window.addEventListener("onWidgetLoad", function (obj) {
  window.addEventListener("onEventReceived", function (obj) {
    if (obj.detail.listener === "message") {
      const data = obj.detail.event.data;

      const chat_message = data.text.toLowerCase();
      const chat_roles = data.badges;

      chat_roles.forEach((chat_role) => {
        if (chat_role.type === "broadcaster" || chat_role === "moderator") {
          if (chat_message === "!resetdeathcount") {
            count = 0;
            document.getElementById("count-div").innerHTML = count.toString();
          } else if (chat_message === "!setdeathcount") {
          }
        }
      });

      if (chat_message === "!mort") {
        let ms = getCurrentTime() - lastCommandTimeStamp;
        console.log(ms + "ms");
        if (ms > 2000) {
          lastCommandTimeStamp = Date.now();
          count += 1;
          document.getElementById("count-div").innerHTML = count.toString();
        }
      }
    }
  });
});
