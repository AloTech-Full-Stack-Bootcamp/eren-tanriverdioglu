import { useState } from "react";

import ToDoItem from "./ToDoItem";
import ListFooter from "./ListFooter";
import ListHeader from "./ListHeader";
import ToggleAll from "./ToggleAll";

function ItemList({ todos, filter, setTodos, editing, setEditing }) {
  const itemList = todos
    .filter((todo) => todo.completed !== filter)
    .map((todo) => (
      <ToDoItem
        key={todo.id}
        item={todo}
        todos={todos}
        setTodos={setTodos}
        editing={editing}
        setEditing={setEditing}
      />
    ));
  return itemList;
}

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(undefined);

  return (
    <section className="main">
      <ListHeader todos={todos} setTodos={setTodos} />
      <ToggleAll todos={todos} setTodos={setTodos} />
      <ul className="todo-list">
        <ItemList todos={todos} filter={filter} setTodos={setTodos} />
      </ul>
      {todos.length > 0 && (
        <ListFooter
          todos={todos}
          filter={filter}
          setTodos={setTodos}
          setFilter={setFilter}
        />
      )}
    </section>
  );
}

export default ToDoList;
