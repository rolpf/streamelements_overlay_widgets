let twitchSubscribersCount = 0;
let twitchSubscribersGoal = 0;
let twitchFollowersCount = 0;
let twitchSubscriberLatest = "";
let twitchFollowerLatest = "";
let currentStreamSubsCount = 0;
let currentStreamFollowersCount = 0;

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

function displayNotification() {}

const eventNotification = async (event, name) => {
  console.log("function event notif");
  let notifDiv = document.getElementById("notification-div");
  let notification = document.createElement("notification");
  notification.classList.add(
    "invisible",
    "absolute",
    "left-0",
    "bottom-12",
    "h-12",
    "flex",
    "px-12",
    "bg-stone-950/60",
    "p-2",
    "border-t-2",
    "border-slate-50/75",
    "{{fontSize}}",
    "inline-block",
    "font-bold",
    "text-white",
    "animate__animated",
  );
  switch (event) {
    case "follower":
      notifDiv.appendChild(notification);
      notification.innerHTML = `${name} vient de suivre la chaîne, merci !`;
      notification.classList.remove("invisible");
      notification.classList.add("animate__fadeInLeftBig");
      await delay(5000);
      notification.classList.add("animate__fadeOut");
      notification.addEventListener("animationend", () => {
        notification.classList.remove("animate__fadeInLeftBig");
        notification.classList.remove("animate__fadeOut");
        notification.classList.add("invisible");
      });
      break;
    case "subscriber":
      notifDiv.appendChild(notification);
      notification.innerHTML = `${name} vient de s'abonner à la chaîne, merci !`;
      notification.classList.remove("invisible");
      notification.classList.add("animate__fadeInLeftBig");
      await delay(5000);
      notification.classList.add("animate__fadeOut");
      notification.addEventListener("animationend", () => {
        notification.classList.remove("animate__fadeInLeftBig");
        notification.classList.remove("animate__fadeOut");
        notification.classList.add("invisible");
      });
      break;
    case "raid":
      notifDiv.appendChild(notification);
      notification.innerHTML = `${name} vient de raid la chaîne avec des viewers, merci !`;
      notification.classList.remove("invisible");
      notification.classList.add("animate__fadeInLeftBig");
      await delay(5000);
      notification.classList.add("animate__fadeOut");
      notification.addEventListener("animationend", () => {
        notification.classList.remove("animate__fadeInLeftBig");
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
    twitchFollowersCount + " followers";
  twitchFollowerLatest = data["follower-latest"]["name"];
  document.getElementById("twitch-follower-latest").innerHTML =
    twitchFollowerLatest;
  twitchSubscribersCount = data["subscriber-month"]["count"];
  document.getElementById("twitch-subscriber-count").innerHTML =
    twitchSubscribersCount + " subs";
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
  console.log("yo" + event);
  if (event.name != undefined) {
    switch (type) {
      case "subscriber":
        twitchSubscribersCount += 1;
        document.getElementById("twitch-subscriber-count").innerHTML =
          twitchSubscribersCount;
        document.getElementById("twitch-subscriber-latest").innerHTML =
          event.name;
        eventNotification(type, event.name);
        break;
      case "follower":
        twitchFollowersCount += 1;
        document.getElementById("twitch-follower-count").innerHTML =
          twitchFollowersCount;
        document.getElementById("twitch-follower-latest").innerHTML =
          event.name;
        eventNotification(type, event.name);
        eventNotification(type, event.name);
        break;
      case "raid":
        eventNotification(type, event.name);
    }
  }
});
