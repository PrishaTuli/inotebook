import React,{useContext} from "react";
import notecontext from "../context/notes/Notecontext"
const Noteitem = (props) => {
  const { note,updatenote } = props;
  const context=useContext(notecontext);
  const{deletenote}=context;
  return (
    <div className="col-md-3">
      {/* {note.title}
      {note.description} */}
      <div className="card my-3" >
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <i className="far fa-trash-alt mx-2" onClick={()=>{deletenote(note._id);props.showalert("deleted successfully","success")}}></i>
          <i className="far fa-edit mx-2" onClick={()=>{updatenote(note)}}></i>

        </div>
      </div>
    </div>
  );
};

export default Noteitem;
