import { useEffect, useState } from "react";

function toggleAllHandle(todos, setTodos, toggleAll) {
  const updatedToDos = todos.map((todo) => {
    return { ...todo, completed: !toggleAll };
  });
  setTodos(updatedToDos);
}

function ToggleAll({ todos, setTodos }) {
  const [toggleAll, setToggleAll] = useState(false);

  useEffect(() => {
    for (let todo of todos) {
      if (todo.completed === false) {
        setToggleAll(false);
        return;
      }
      setToggleAll(true);
    }
  }, [todos]);

  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={toggleAll}
        onChange={() => toggleAllHandle(todos, setTodos, toggleAll)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
}

export default ToggleAll;
