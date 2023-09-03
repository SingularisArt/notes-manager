import express from "express";
import { spawn } from "child_process";

const cmdRouters = express.Router();

// Open a pdf
cmdRouters.get("/open-pdf/:pdfLocation", (req, res) => {
  const pdfLocation = req.params.pdfLocation;
  const zathura = spawn("zathura", [pdfLocation], {
    detached: true,
    stdio: "ignore",
  });

  zathura.unref();

  res.send("Opening PDF in the background with Zathura");
});

// Open a file
cmdRouters.get("/open-file/:fileLocation", (req, res) => {
  const fileLocation = req.params.fileLocation;
  const kitty = spawn("kitty nvim", [fileLocation], {
    detached: true,
    stdio: "ignore",
  });

  kitty.unref();

  res.send("Opening file in the background with kitty nvim");
});

// Run a bash command
cmdRouters.get("/command/:cmd", (req, res) => {
  const cmd = req.params.cmd;
  const process = spawn("sh", ["-c", cmd], {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  let output = "";

  process.stdout.on("data", (data) => {
    output += data.toString();
  });

  process.stderr.on("data", (data) => {
    output += data.toString();
  });

  process.on("exit", (code) => {
    if (code === 0) {
      res.send(`Command executed successfully:\n${output}`);
    } else {
      res.status(500).send(`Command failed with error code ${code}:\n${output}`);
    }
  });

  process.unref();
});

export default cmdRouters;
