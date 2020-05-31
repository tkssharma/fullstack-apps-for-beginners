import React, { useEffect, useRef, useState } from "react";


export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [field, setField] = useState('');

  function handleChange(e) {
    setField(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props._id, field);
    setField("");
    setEditing(false);
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props._id}>
          New name for {props.title}
        </label>
        <input
          id={props._id}
          className="todo-text"
          type="text"
          value={field}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">

        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={props._id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props._id)}
          />
          <label className="todo-label" htmlFor={props._id}>
            {props.title}
          </label>
        </div>
        <div className="btn-group">
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          >
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props._id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>
  );



  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}