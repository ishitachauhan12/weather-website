const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");

const app = express();

//the paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialPath);

//send static server
app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
app.set("views", viewsPath);

//rendering dynamic pages
app.get("/help", (req, res) => {
  res.render("help.hbs", {
    name: "Ishita Chauhan",
    title: "Help",
    helpText: "for any kind of help pls refer the .readme file",
  });
});

app.get("/", (req, res) => {
  res.render("index.hbs", {
    name: "Ishita Chauhan",
    title: "WEATHER",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    name: "Ishita Chauhan",
    title: "about",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  forecast(address, (error, response = "") => {
    if (!address) {
      return res.send("error: you must have an error!!");
    } else if (error) {
      return res.send("error: type a valid place");
    } else {
      res.send({
        forecast: response.weather,
        location: response.location,
        description: response.description,
      });
    }
  });
});

app.get("*", (req, res) => {
  res.render("404.hbs", {
    name: "Ishita Chauhan",
    title: "Error 404:Page not found!!",
  });
});

app.listen(3000, () => {
  console.log("server started at port 3000");
});
