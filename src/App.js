import './App.css';
import Header from "./Component/Header";
import Todos from "./Component/Todos";
import footer from "./Component/Footer";
import TodoItem from './Component/TodoItem';
import AddTodo from "./Component/AddTodo";
import About from "./Component/About";
import React, { useEffect, useState } from 'react';
import Footer from './Component/Footer';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";


function App() {
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("im onDelete of todo", todo);
    // let index = todos.indexOf(todo);
    // todos.splice(index,1);

    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
  }

  const addTodo = (tittle, desc) => {
    console.log("im adding this todo", tittle, desc)
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      let sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      tittle: tittle,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }
  const [todos, setTodos] = useState([initTodo]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]
  );

  return (
    <>
      <Router>
        <Header title="my todos list" ></Header>
        <Routes>
         
          <Route path="/" element={
            <>
              <AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} />
            </>
          } />
         
          <Route path="/about" element={<About />} >
          </Route>
        </Routes>
      </Router>
      <Footer />


    </>
  );
}

export default App;
