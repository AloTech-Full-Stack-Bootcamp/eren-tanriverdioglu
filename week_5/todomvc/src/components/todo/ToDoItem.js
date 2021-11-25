function editHandle(event, item, todos, setTodos) {
  let newTitle = event.target.value;
  const updatedToDos = todos.map((todo) => {
    if (item.id === todo.id) return { ...todo, title: newTitle };
    return todo;
  });
  setTodos(updatedToDos);
}

function labelClickHandle(item, todos, setTodos) {
  const updatedToDos = todos.map((todo) => {
    if (item.id === todo.id) return { ...todo, editing: true };
    return todo;
  });
  setTodos(updatedToDos);
}

function onBlurHandle(item, todos, setTodos) {
  if (item.title !== "") {
    const updatedToDos = todos.map((todo) => {
      if (item.id === todo.id) return { ...todo, editing: false };
      return todo;
    });
    setTodos(updatedToDos);
  } else {
    const updatedToDos = todos.filter((todo) => todo.id !== item.id);
    setTodos(updatedToDos);
  }
}

function onEnterHandle(event, item, todos, setTodos) {
  if (item.title !== "") {
    if (event.key === "Enter") {
      const updatedToDos = todos.map((todo) => {
        if (item.id === todo.id) return { ...todo, editing: false };
        return todo;
      });
      setTodos(updatedToDos);
    }
  } else {
    const updatedToDos = todos.filter((todo) => todo.id !== item.id);
    setTodos(updatedToDos);
  }
}

function completeToggleHandle(item, todos, setTodos) {
  const updatedToDos = todos.map((todo) => {
    if (item.id === todo.id) return { ...todo, completed: !item.completed };
    return todo;
  });
  setTodos(updatedToDos);
}

function removeHandle(item, todos, setTodos) {
  const updatedToDos = todos.filter((todo) => todo.id !== item.id);
  setTodos(updatedToDos);
}

function ToDoItem({ item, todos, editing, setTodos, setEditing }) {
  if (!item.editing) {
    return (
      <li className={item.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={item.completed ? true : false}
            onChange={() => completeToggleHandle(item, todos, setTodos)}
          />
          <label onClick={() => labelClickHandle(item, todos, setTodos)}>
            {item.title}
          </label>
          <button
            onClick={() => removeHandle(item, todos, setTodos)}
            className="destroy"
          ></button>
        </div>
      </li>
    );
  } else {
    return (
      <li className={item.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={item.completed ? true : false}
            onChange={() => completeToggleHandle(item, todos, setTodos)}
          />
          <input
            className="editing"
            autoFocus
            type="text"
            onKeyPress={(event) => onEnterHandle(event, item, todos, setTodos)}
            onBlur={() => onBlurHandle(item, todos, setTodos)}
            onChange={(event) => editHandle(event, item, todos, setTodos)}
            value={item.title}
          />
          <button
            onClick={() => removeHandle(item, todos, setTodos)}
            className="destroy"
          ></button>
        </div>
      </li>
    );
  }
}

export default ToDoItem;
