function BulkAction(props) {
  const { closeBulkAction, handleRemoveSelection } = props;

  const clearCheckBox = () => {
    closeBulkAction();
  }

  const handleRemove = () => {
    handleRemoveSelection();
  }

  return (
    <div className="tasks border-top-1 bulk-action-tasks">
      <div className="panel-heading w-50">
        Bulk Action:
      </div>
      <div className="w-50 pd-15 mr-15">
        <span>
          <button
            type="button"
            className="btn btn-done"
            onClick={clearCheckBox}
          >
            Done
          </button>
        </span>
        <span>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleRemove}
          >
            Remove
          </button>
        </span>
      </div>
    </div >
  );
}

export default BulkAction;