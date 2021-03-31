import { useEffect, useState } from "react";
import "./App.css";
import NewTask from "./components/New Task";
import ToDoTask from "./components/ToDoTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [oldLength, setOldLength] = useState();
  const [selection, setSelection] = useState([]);

  const onSubmit = (data) => {
    if (!data.id) {
      data.id = generateId();
      data.detail = false;
      data.checkbox = false;
      tasks.push(data);
    } else {
      const index = tasks.findIndex(task => task.id === data.id);
      data.detail = false;
      tasks[index] = data;
    }
    sortByDate();
  }

  const onDelete = (key) => {
    const index = tasks.findIndex(task => task.id === key);
    if (index !== -1) {
      tasks.splice(index, 1);
      setTasks(tasks => [...tasks]);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  const handleShowDetail = (key) => {
    const index = tasks.findIndex(task => task.id === key);
    if (index !== -1) {
      tasks[index].detail = true;
      setTasks(tasks => [...tasks]);
    }
  }

  const toggleBulkAction = (key) => {
    const index = tasks.findIndex(task => task.id === key);
    if (index !== -1) {
      tasks[index].checkbox = !tasks[index].checkbox;
      setTasks(tasks => [...tasks]);

    }
  }

  const doneAction = () => {
    tasks.map(task => {
      return task.checkbox = false;
    })
    setTasks(tasks => [...tasks])
  }

  const removeSelected = () => {
    tasks.map(task => {
      if (task.checkbox === true) {
        selection.push(task.id);
      }
      return setSelection(selection => [...selection]);
    });

    selection.map(element => {
      const index = tasks.findIndex(task => task.id === element);
      return tasks.splice(index, 1);
    })

    setSelection([]);
    sortByDate();
  }

  const handleSearchTerm = (keyword) => {
    setOldLength(keyword.length);
    const currentTasks = JSON.parse(localStorage.getItem("tasks"));

    if (keyword.length < oldLength) {
      setTasks([...currentTasks]);
    };

    if (keyword) {
      let arr = currentTasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
      setTasks([...arr]);
    };
  }

  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      setTasks(tasks);
    }
  }, []);

  function s4() {
    return Math.floor((Math.random() + 1) * 0x10000).toString(16).substring(1)
  }

  function generateId() {
    return `${s4()}${s4()}${s4()}-${s4()}${s4()}-${s4()}${s4()}${s4()}`
  }

  const sortByDate = () => {
    const sorted = tasks.sort((a, b) => Date.parse(a.dueDate) < Date.parse(b.dueDate) ? -1 : 1);
    setTasks([...sorted]);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  return (
    <div className="container">
      <div className="row">
        <NewTask
          onSubmit={onSubmit}
        />
        <ToDoTask
          tasks={tasks}
          onChange={onSubmit}
          handleDelete={onDelete}
          updateDetail={handleShowDetail}
          onSearch={handleSearchTerm}
          toggleBulkAction={toggleBulkAction}
          closeBulkAction={doneAction}
          removeAction={removeSelected}
        />
      </div>
    </div>
  );
}

export default App;
