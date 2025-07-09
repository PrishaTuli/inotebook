// import react from "react";
import Notecontext from "./Notecontext";
import { useState } from "react";
const Notestate = (props) => {
  const host = "http://localhost:5000";
  const notesinitial=[];
  const [notes, setnotes] = useState(notesinitial);
  //get note
  const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }
    });
    const json=await response.json();
    console.log(json);
    setnotes(json)
  };
  //add note
  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const note=await response.json();
    setnotes(notes.concat(note));
  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
    });
    const json = response.json();
    console.log(json);
    const newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newnotes);
  };
  const editnote = async (id, title, description,tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json=await response.json();
    console.log(json);
    let newnotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newnotes.length; index++){
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
      
    }
    setnotes(newnotes);
  };
  return (
    <Notecontext.Provider value={{ notes, addnote, deletenote, editnote ,getnotes}}>
      {props.children}
    </Notecontext.Provider>
  );
};
export default Notestate;
