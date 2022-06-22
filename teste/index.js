import express from "express";
import fetch from "node-fetch";
// const express = require("express");
// const fetch = require("node-fetch");
const app = express();

app.get("/", async function (req, res) {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const app = await response.json();
  console.log(app);
  return res.json(app);
});
app.listen(3333, () => {
  console.log("http://localhost:3333");
});
// module.export = app;
export { app };
