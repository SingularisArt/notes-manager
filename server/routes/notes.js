import express from "express";
const notesRoutes = express.Router()

notesRoutes.get("/", (req, res) => {
  console.log(req.query.name)
  res.send("Notes")
})

notesRoutes.get("/:name", (req, res) => {
  console.log(req.params.name)
  res.send(`Notes: ${req.params.name}`)
})

export default notesRoutes;
