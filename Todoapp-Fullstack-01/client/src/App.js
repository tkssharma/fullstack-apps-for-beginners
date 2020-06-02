import React, { useState, useRef, useEffect } from "react";
import Form from "./todo/form";
import './App.css';
import Storage from './store/index';
import FilterButton from "./todo/filterButton";
import Todo from "./todo/todo";
const uuid = require('uuid');

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {


  useEffect(() => {
    Storage.getTodos()
    .then(data => {
      setTasks(data);
    }).catch(err => {
      setTasks([]);
      setError(err);
    })
    return () => null
  }, [])
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task._id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  function deleteTask(id) {
    Storage.deleteTodo(id).then(data => {
      const remainingTasks = tasks.filter(task => id !== task._id);
      setTasks(remainingTasks);
    }).catch(err => {
      setError(err);
    })
  }


  function editTask(id, title) {
    Storage.updateTodos(id, title).then(data => {
      const editedTaskList = tasks.map(task => {
        if (id === task._id) {
          return {...task, title: title}
        }
        return task;
      });
      setTasks(editedTaskList);
    }).catch(err => {
      setError(err);
    })
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      _id={task._id}
      name={task.title}
      title={task.title}
      completed={task.completed}
      key={task._id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    Storage.createTodo(name).then(data => {
      const newTask = data;
      setTasks([...tasks, newTask]);
    }).catch(err => {
      setError(err);
    })
  }


  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" >
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;