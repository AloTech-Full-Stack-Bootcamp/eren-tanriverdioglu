import { nanoid } from "nanoid";

function ListHeader({ todos, setTodos }) {
  function formSubmit(e) {
    e.preventDefault();
    if (e.target.children[0].value !== "") {
      const newId = nanoid();
      const date = new Date();
      const newTodo = {
        id: newId,
        title: e.target.children[0].value,
        completed: false,
        date: date,
        editing: false,
      };
      setTodos([...todos, newTodo]);
      e.target.reset();
    }
  }

  return (
    <form onSubmit={(e) => formSubmit(e)}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  );
}

export default ListHeader;
