import BulkAction from "./BulkAction";
import Search from "./Search";
import Tasks from "./Tasks";

function ToDoTask(props) {
  const { tasks, onSearch, handleDelete,
    updateDetail, onChange, toggleBulkAction,
    closeBulkAction, removeAction } = props

  return (
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <div className="panel-heading">
        <h3 className="panel-title center">To Do Task</h3>
      </div>
      <div className="form-group fl-col mg-15">
        <Search handleSearch={onSearch} />
      </div>
      <div className="panel-heading tasks-height">
        {tasks.map((task, index) => {
          return <Tasks
            key={index}
            outputTasks={task}
            onDelete={handleDelete}
            showDetail={updateDetail}
            onChange={onChange}
            onToggleBulk={toggleBulkAction}
          />
        })}
      </div>
      {(tasks.findIndex(task => task.checkbox === true) !== -1) ?
        <BulkAction
          closeBulkAction={closeBulkAction}
          handleRemoveSelection={removeAction}
        />
        : ""}
    </div>
  );
}

export default ToDoTask;