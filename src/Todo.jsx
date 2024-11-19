import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, editStatus, removeTodo } from "./features/todoSlice.js";

const TodoList = () => {
  const [inputValue, setInputValue] = useState("");
  const [tab, setTab] = useState("all");
  console.log(tab);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch(addTodo({ id: Date.now(), text: inputValue, status: false }));
      setInputValue("");
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };
  const handleTogalTodo = (id) => {
    dispatch(editStatus(id));
  };
  let filteredTodos= todos
  if (tab =='completed'){
    filteredTodos=todos.filter(todo=>todo.status==true)
  }
  if (tab =='panding'){
    filteredTodos=todos.filter(todo=>todo.status==false)
  }
  
 
  return (
    <div>
      <div className="todo">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Добавить новую задачу "
        />
        <button className="button_add" onClick={handleAddTodo}>
          Добавить
        </button>
      </div>
      <nav className="nav_todos">
        <button onClick={() => setTab("all")}>Все</button>
        <button onClick={() => setTab("completed")}>Завершенные</button>
        <button onClick={() => setTab("panding")}>Незавершенные</button>
      </nav>
      <ul className="nav_text">
        {filteredTodos.map((todo) => (
          <li className="nav_li" key={todo.id}>
            
            <span className={todo.status ? "greenline" : "redline"}>
              {" "}
              {todo.text}
            </span>
            <button
              className="button_delete"
              onClick={() => handleRemoveTodo(todo.id)}>
              Удалить
            </button>
            <button
              className={todo.status ? "green" : "red"}
              onClick={() => handleTogalTodo(todo.id)}>
              {todo.status ? "Выполнено" : "Невыполнено"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
