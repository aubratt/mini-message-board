const { Router } = require("express");

const formRouter = Router();

formRouter.get("/", (req, res) => res.render("form"));

module.exports = formRouter;
