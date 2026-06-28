let like = 0;
let dislike = 0;
let totalValue = like + dislike;
let percentage = 50;
let likeDiv = document.getElementById("like-div");

const Percentage = (partialValue, totalValue) => {
  percentage = Math.round((100 * partialValue) / totalValue);
  likeDiv.style.width = percentage + "%";
  return percentage;
};

window.addEventListener("onWidgetLoad", function (obj) {
  window.addEventListener("onEventReceived", function (obj) {
    if (obj.detail.listener === "message") {
      const data = obj.detail.event.data;

      const chat_message = data.text.toLowerCase();
      const chat_roles = data.badges;

      chat_roles.forEach((chat_role) => {
        if (chat_role.type === "broadcaster" || chat_role === "moderator") {
          if (chat_message === "!resetvote") {
            ((like = 0), (dislike = 0), (totalValue = 0), (percentage = 50));
            likeDiv.style.width = percentage + "%";
          } else if (chat_message === "!endvote") {
            console.log("vote ended");
          }
        }
      });

      if (chat_message === "j'aime") {
        like += 1;
        totalValue += 1;
        Percentage(like, totalValue);
      } else if (chat_message === "j'aime pas") {
        dislike += 1;
        totalValue += 1;
        Percentage(like, totalValue);
      }
      console.log(dislike + "dislike , " + like + "likes", percentage);
    }
  });
});
