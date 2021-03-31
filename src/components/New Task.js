import TaskForm from "./TaskForm";

function NewTask(props) {
  const { onSubmit } = props;

  return (
    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
      <div className="panel-heading">
        <h3 className="panel-title center">New Task</h3>
      </div>
      <TaskForm
        addTask={onSubmit}
      />
    </div>
  );
}

export default NewTask;