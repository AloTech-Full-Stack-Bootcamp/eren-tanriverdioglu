function removeCompletedHandle(todos, setTodos) {
  const newToDos = todos.filter((todo) => !todo.completed);
  setTodos(newToDos);
}

function ListFooter({ todos, filter, setTodos, setFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>
          {todos.filter((todo) => todo.completed === false).length}{" "}
        </strong>
        items left
      </span>
      <ul className="filters">
        <li>
          <button
            onClick={() => {
              setFilter(undefined);
            }}
            className={filter === undefined ? "selected" : ""}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setFilter(true);
            }}
            className={filter === true ? "selected" : ""}
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setFilter(false);
            }}
            className={filter === false ? "selected" : ""}
          >
            Completed
          </button>
        </li>
      </ul>

      <button
        onClick={() => removeCompletedHandle(todos, setTodos)}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
}

export default ListFooter;
