import TaskForm from "./TaskForm";

function Tasks(props) {
  const { showDetail, onToggleBulk, outputTasks, onDelete, onChange } = props;

  const handleShowDetail = () => {
    showDetail(outputTasks.id);
  }

  const handleDelete = () => {
    onDelete(outputTasks.id);
  }

  const toggleBulk = () => {
    onToggleBulk(outputTasks.id);
  }

  return (
    <div className="tasks-box">
      <div className="tasks ">
        <div className="panel-heading w-50">
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={outputTasks.checkbox === true}
                onChange={toggleBulk}
              />
              {outputTasks.name}
            </label>
          </div>
        </div>
        <div className="w-50 pd-15 mr-15">
          <span>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleShowDetail}
            >
              Detail
            </button>
          </span>
          <span>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Remove
            </button>
          </span>
        </div>
      </div >
      <div className="border-top-1">
        {outputTasks.detail ?
          <TaskForm
            updateTasks={outputTasks}
            changeTasks={onChange}
          />
          : ""
        }
      </div>
    </div >
  );
}

export default Tasks;