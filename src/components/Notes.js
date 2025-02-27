import React, { useContext, useEffect, useRef ,useState} from "react";
import notecontext from "../context/notes/Notecontext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const context = useContext(notecontext);
  const navigate=useNavigate();
  // const{notes,setnote}=context;
  const { notes, getnotes ,editnote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getnotes();
      }
    else{
      navigate('/login')
    } 
  }, [])
  const ref = useRef(null);// This is useful for triggering modal openings or closing actions without needing to manage component state directly.
  const refclose=useRef(null);
  const[note,setnote]=useState({id:"", etitle:"",edescription:"",etag:""})
  const updatenote = (currentnote) => {
    ref.current.click();
    setnote({id:currentnote._id, etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
  };
 
  const handleclick=(e)=>{
    editnote(note.id,note.etitle,note.edescription,note.etag);
    refclose.current.click();
    // e.preventDefault();
    props.showalert("Updated successfully","success")
  }
const onChange=(e)=>{

  setnote({...note,[e.target.name]:e.target.value})
}
  return (
    <div>
      <Addnote showalert={props.showalert}/>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <form className="my-3">
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.etitle}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              onChange={onChange}
              value={note.edescription}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="etag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              onChange={onChange}
              value={note.etag}
            />
          </div>
        </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleclick}>
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your notes</h1>
        <div className="container" >{notes.length===0 &&'no notes to display'}</div>
        
        {notes.map((note) => {
          //   return note.title;
          return (
            <Noteitem key={note._id} updatenote={updatenote} showalert={props.showalert} note={note} />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
