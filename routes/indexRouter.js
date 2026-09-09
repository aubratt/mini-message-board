const { Router } = require("express");

const indexRouter = Router();
const messages = [
  {
    id: crypto.randomUUID(),
    message: "Hi there!",
    name: "Amando",
    added: new Date(),
  },
  {
    id: crypto.randomUUID(),
    message: "Hello World!",
    name: "Charles",
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

const formatFullDate = (date) => {
  const dateString = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${dateString} at ${timeString}`;
};

indexRouter.get("/", (req, res) =>
  res.render("index", { messages: messages, getTimeSince: getTimeSince }),
);
indexRouter.get("/message/:messageId", (req, res) => {
  const message = messages.find(
    (message) => message.id === req.params.messageId,
  );
  res.render("message", {
    message: message,
    getTimeSince: getTimeSince,
    formatFullDate: formatFullDate,
  });
});
indexRouter.get("/new", (req, res) => res.render("form", { errors: {} }));
indexRouter.post("/new", (req, res) => {
  const errors = {};
  if (req.body.name.trim() === "") {
    errors.name = "Name is required";
  }
  if (req.body.message.trim() === "") {
    errors.message = "Message is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).render("form", { errors: errors });
  }

  messages.push({
    id: crypto.randomUUID(),
    message: req.body.message,
    name: req.body.name,
    added: new Date(),
  });
  res.redirect("/");
});

module.exports = indexRouter;
