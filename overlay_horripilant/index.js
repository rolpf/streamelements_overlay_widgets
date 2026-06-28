let twitchSubscribersCount = 0;
let twitchSubscribersGoal = 0;
let twitchFollowersCount = 0;
let twitchSubscriberLatest = "";
let twitchFollowerLatest = "";
let currentStreamSubsCount = 0;
let currentStreamFollowersCount = 0;
let percentageExp = 0;
let userLevel = 1;
let userExp = 0;
let wantedExp = 15;
let gainedExp = 2;

let fillerXpBar = document.getElementById("filler-xp-bar");
let levelDiv = document.getElementById("level");
let userExpDiv = document.getElementById("user-exp");
let wantedExpDiv = document.getElementById("wanted-exp");

levelDiv.innerHTML = userLevel.toString();
userExpDiv.innerHTML = userExp.toString();
wantedExpDiv.innerHTML = wantedExp.toString();

function getCurrentDate() {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let currentDate = new Date().toLocaleDateString("fr-FR", options);
  let currentTime = new Date().toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  let dateTime = currentDate + " " + currentTime;
  document.getElementById("current-time").innerHTML = dateTime;
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Percentage = (partialValue, totalValue) => {
  percentageExp = Math.round((100 * partialValue) / totalValue);
  if (percentageExp >= 100) {
    userLevel += 1;
    userExp = 0;
    percentageExp = 0;
    if (userLevel % 15 === 0) {
      wantedExp += 1;
    }
  }
  userExpDiv.innerHTML = userExp.toString();
  fillerXpBar.style.width = percentageExp + "%";
  levelDiv.innerHTML = userLevel.toString();
  userExpDiv.innerHTML = userExp.toString();
  wantedExpDiv.innerHTML = wantedExp.toString();
  return percentageExp;
};

function displayNotification() {}

const eventNotification = async (event, name) => {
  //console.log("function event notif")
  let notifDiv = document.getElementById("notification-div");
  let notification = document.createElement("notification");
  notification.classList.add(
    "invisible",
    "absolute",
    "flex",
    "inline-block",
    "bg-black",
    "p-2",
    "w-120",
    "border-2",
    "border-white",
    "{{fontSize}}",
    "font-bold",
    "text-white",
    "animate__animated",
  );
  switch (event) {
    case "follower":
      notifDiv.appendChild(notification);
      notification.innerHTML = `${name} vient de suivre la chaîne, merci !`;
      notification.classList.remove("invisible");
      notification.classList.add("animate__zoomInDown");
      await delay(5000);
      notification.classList.remove("animate__zoomInDown");
      notification.classList.add("animate__fadeOut");
      notification.addEventListener("animationend", () => {
        notification.classList.remove("animate__fadeOut");
        notification.classList.add("invisible");
      });
      break;
    case "subscriber":
      notifDiv.appendChild(notification);
      notification.innerHTML = `${name} vient de s'abonner à la chaîne, merci !`;
      notification.classList.remove("invisible");
      notification.classList.add("animate__zoomInDown");
      await delay(5000);
      notification.classList.remove("animate__zoomInDown");
      notification.classList.add("animate__fadeOut");
      notification.addEventListener("animationend", () => {
        notification.classList.remove("animate__fadeOut");
        notification.classList.add("invisible");
      });
      break;
    case "raid":
      notifDiv.appendChild(notification);
      notification.innerHTML = `${name} vient de raid la chaîne avec des viewers, merci !`;
      notification.classList.remove("invisible");
      notification.classList.add("animate__zoomInDown");
      await delay(5000);
      notification.classList.remove("animate__zoomInDown");
      notification.classList.add("animate__fadeOut");
      notification.addEventListener("animationend", () => {
        notification.classList.remove("animate__fadeOut");
        notification.classList.add("invisible");
      });
      break;
  }
};

window.addEventListener("onWidgetLoad", function (obj) {
  const data = obj.detail.session.data;
  twitchFollowersCount = data["follower-total"]["count"];
  document.getElementById("twitch-follower-count").innerHTML =
    "(" + twitchFollowersCount + ")";
  twitchFollowerLatest = data["follower-latest"]["name"];
  document.getElementById("twitch-follower-latest").innerHTML =
    twitchFollowerLatest;
  twitchSubscribersCount = data["subscriber-total"]["count"];
  document.getElementById("twitch-subscriber-count").innerHTML =
    "(" + twitchSubscribersCount + ")";
  twitchSubscriberLatest = data["subscriber-latest"]["name"];
  document.getElementById("twitch-subscriber-latest").innerHTML =
    twitchSubscriberLatest;

  setInterval(getCurrentDate, 1000);
});

window.addEventListener("onEventReceived", function (obj) {
  if (!obj.detail.event) {
    return;
  }
  const type = obj.detail.event.type;
  const event = obj.detail.event;
  if (event.name != undefined) {
    switch (type) {
      case "subscriber":
        twitchSubscribersCount += 1;
        userExp += gainedExp + 3;
        updateStats();
        document.getElementById("twitch-subscriber-count").innerHTML =
          twitchSubscribersCount;
        document.getElementById("twitch-subscriber-latest").innerHTML =
          event.name;
        eventNotification(type, event.name);
        break;
      case "follower":
        twitchFollowersCount += 1;
        userExp += gainedExp;
        updateStats();
        document.getElementById("twitch-follower-count").innerHTML =
          twitchFollowersCount;
        document.getElementById("twitch-follower-latest").innerHTML =
          event.name;
        eventNotification(type, event.name);
        eventNotification(type, event.name);
        break;
      case "raid":
        eventNotification(type, event.name);
        userExp += gainedExp + 2;
        updateStats();
    }
  }
});

function updateStats() {
  levelDiv.innerHTML = userLevel.toString();
  userExpDiv.innerHTML = userExp.toString();
  wantedExpDiv.innerHTML = wantedExp.toString();
  Percentage(userExp, wantedExp);
}

updateStats();
