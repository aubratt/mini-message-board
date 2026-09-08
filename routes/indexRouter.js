const { Router } = require("express");

const indexRouter = Router();
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];
const getTimeSince = (date) => {
  const diff = Date.now() - new Date(date).getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
  if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;

  return `${years} year${years !== 1 ? "s" : ""} ago`;
};

indexRouter.get("/", (req, res) =>
  res.render("index", { messages: messages, getTimeSince: getTimeSince }),
);
indexRouter.get("/new", (req, res) => res.render("form"));
indexRouter.post("/new", (req, res) => {
  messages.push({
    text: req.body.message,
    user: req.body.name,
    added: new Date(),
  });
  res.redirect("/");
});

module.exports = indexRouter;
