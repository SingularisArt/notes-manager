import express from "express";
import cors from "cors";
import createCourseRouters from "./routes/courses.js";
import path from "path";
import YAML from "yamljs";

const configPath = path.join(process.env.HOME, ".config/lesson-manager/config.yaml");
const config = YAML.load(configPath);

const app = express()

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.get("/yaml", (_, res) => {
  res.send(config);
});

app.use("/courses", createCourseRouters(config));

app.listen(3000);
