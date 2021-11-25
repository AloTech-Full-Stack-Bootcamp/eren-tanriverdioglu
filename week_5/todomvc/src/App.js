import PageFooter from "./components/page/PageFooter";
import PageHeader from "./components/page/PageHeader";
import ToDoList from "./components/todo/ToDoList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="todoapp">
        <PageHeader />
        <ToDoList />
      </div>
      <PageFooter />
    </div>
  );
}

export default App;
