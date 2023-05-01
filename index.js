const express = require("express");
const app = express();
const cors = require('cors')
//cors -> cualquier origen funciona en la api
app.use(cors())
app.use(express.json());

//Object
const notes = [
  {
    id: 3,
    content: "Tengo que estudiar express para el back end",
    date: "2019-05-30T18:39:34.091Z",
    important: true,
  },
  {
    id: 1,
    content: "Tengo que estudiar react para el frontend",
    date: "2019-05-30T18:39:34.091Z",
    important: true,
  },
  {
    id: 2,
    content:
      "Tengo que estudiar nodemon para el back end como el live-server de frontend",
    date: "2019-05-30T18:39:34.091Z",
    important: true,
  },
];
//Servidor

app.get("/", (req, resp) => {
  resp.send("<h1>Welcome!!!</h1>");
  resp.status(200).end();
});
app.get("/api/notes", (req, resp) => {
  resp.json(notes);
  resp.status(200).end();
});
app.get("/api/notes/:id", (req, resp) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    resp.json(note);
  } else {
    resp.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, resp) => {
  const id = Number(req.params.id);
  const notes = notes.filter((note) => note.id !== id);
  resp.status(204).end();
});

app.post("/api/notes", (req, resp) => {
  const note = req.body;

  if(!note || !note.content){
    return resp.status(400).json({
        error: "Note.content is missing"
    })
  }

  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.import !== "undefined" ? note.important : false,
    date: new Date().toISOString,
  };
  notes = [...notes, newNote];
  //notes = notes.concat(newNote)
  resp.status(201).json(newNote);
});

app.use((req,resp)=>{
  resp.status(404).json({
    error: "Not found"
  })
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listen on PORT ${PORT}`);
});
