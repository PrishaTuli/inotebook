import React ,{useContext,useState} from 'react'

import notecontext from "../context/notes/Notecontext"
const Addnote = (props) => {
    const context=useContext(notecontext);
    const{addnote}=context;
    const[note,setnote]=useState({title:"",description:"",tag:"default"})
    const handleclick=(e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tag);
        props.showalert("Added successfully","success")
    }
    const onChange=(e)=>{ 
      setnote({...note,[e.target.name]:e.target.value})
    }
  return (
      <div className="container my-3">
        <h1>Add a note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleclick}>
            Add note
          </button>
        </form>
      </div>
    
  )
}
export default Addnote
