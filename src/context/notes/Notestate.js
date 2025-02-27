// import react from "react";
import Notecontext from "./Notecontext";
import { useState } from "react";
const Notestate = (props) => {
  const host = "http://localhost:5000";
  // const notesinitial = [
  //   {
  //     _id: "66cdcc776cead93e785d587a",
  //     user: "66cade131996fd08881cb1d3",
  //     title: "my title",
  //     description: "please wake up early",
  //     tag: "personal",
  //     date: "2024-08-27T12:54:15.409Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "66d80a59f7c575e86d3f4b48",
  //     user: "66cade131996fd08881cb1d3",
  //     title: "my title pretty1",
  //     description: "please wake up early1",
  //     tag: "personal",
  //     date: "2024-09-04T07:20:57.412Z",
  //     __v: 0,
  //   },
  // ];
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
    // const note = {
    //   _id: "66d80a59f7c575e86d3f4b428",
    //   user: "66cade131996fd08881cb1d3",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2024-09-04T07:20:57.412Z",
    //   __v: 0,
    // };
    // setnotes(notes.concat(note));
  };
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
  // const s1={
  //     "name":"harry",
  //     "class":"5b"
  // }
  // const[state,setstate]=useState(s1);
  // const update=()=>{
  //     setTimeout(()=>{
  //         setstate({
  //             "name":"larry",
  //             "class":"10b"
  //         })
  //     },1000);
  // }
  return (
    // <Notecontext.Provider value={{state,update}}>
    //     {props.children}
    // </Notecontext.Provider>
    //
    // <Notecontext.Provider value={{notes,setnotes}}>
    //     {props.children}
    // </Notecontext.Provider>
    <Notecontext.Provider value={{ notes, addnote, deletenote, editnote ,getnotes}}>
      {props.children}
    </Notecontext.Provider>
  );
};
export default Notestate;
