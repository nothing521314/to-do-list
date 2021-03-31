import { useEffect, useState } from "react";

function TaskForm(props) {
  const { updateTasks, addTask, changeTasks } = props;
  let currentDate;

  const today = () => {
    const now = new Date();
    const dd = now.getDate();
    const month = now.getMonth();
    const mm = (month < 10) ? `0${month + 1}` : `${month + 1}`;
    const yyyy = now.getFullYear();
    currentDate = `${yyyy}-${mm}-${dd}`;
    return { month, dd, yyyy }
  }

  const initTask = {
    name: "",
    desc: "",
    dueDate: formatDate(today()),
    priority: 0
  }

  const [inputValues, setInputValues] = useState(initTask);

  const changeDate = (params) => {
    const yyyy = Number(params.slice(0, 4));
    const month = params.slice(5, 7) - 1;
    const dd = Number(params.slice(-2));
    return formatDate({ month, dd, yyyy });
  }

  useEffect(() => {
    if (updateTasks) {
      const cache = updateTasks;
      setInputValues(cache);
    }
  }, [updateTasks])

  function formatDate(obj) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${obj.dd} ${monthNames[obj.month]} ${obj.yyyy}`;
  }

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: (name === "dueDate") ? changeDate(value) : value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof inputValues.priority === "string") {
      inputValues.priority = Number(inputValues.priority);
    };
    if (!inputValues.id) {
      addTask(inputValues);
    } else {
      changeTasks(inputValues);
    }
    onClear();
  }

  const onClear = () => {
    setInputValues(initTask)
  }

  return (
    <form>
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="form-group fl-col">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Add new task..."
            required="required"
            value={inputValues.name}
            onChange={handleOnChange}
          />
          <label className="mt-20">Description</label>
          <textarea
            name="desc"
            className="form-control"
            rows="6"
            value={inputValues.desc}
            onChange={handleOnChange}
          >
          </textarea>
        </div>
        <div className="form-group">
          <div className="row fl-row">
            <div className="w-50 pd-15">
              <label className="mt-20">Due date</label>
              <div className="form-control w-date">{inputValues.dueDate}
                <div className="datepicker-toggle"></div>
                <input
                  type="date"
                  name="dueDate"
                  className="datepicker-input"
                  min={currentDate}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="w-50 pd-15">
              <label className="mt-20">Priority</label>
              <select
                name="priority"
                className="form-control w-select"
                value={inputValues.priority}
                onChange={handleOnChange}
              >
                <option value={-1}>Low</option>
                <option value={0}>Normal</option>
                <option value={1}>High</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="pd-15 center">
        <button
          type="submit"
          className="btn btn-default"
          onClick={handleSubmit}
        >
          {!(inputValues.id) ? "Add" : "Update"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;