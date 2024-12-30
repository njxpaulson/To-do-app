function Items({ className, title, category, status, onComplete, unDoTaskCompletion, deleteTask, editTask, id }) {
  const conditionMet = status === "completed" ? "completed" : "notCompleted";
  const completedTask = status === "completed" ? "hide" : "edit";
  const reDoClass = status === "completed" ? "reDo" : "disabled";

  return (
    <section className={`items ${className}`}>
      <div className="items-inner">
        <div className="container">
          <h2>{title}</h2>
          <p className="category">{category}</p>
        </div>
        <div className="wrapper">
          <div className={completedTask}>
            <button className="editBtn" onClick={() => editTask(id)}>EDIT</button>
            <i className="fa-solid fa-trash-can" onClick={deleteTask}></i>
          </div>
          <div className={reDoClass}>
            <i className="fa-solid fa-rotate-left" onClick={unDoTaskCompletion}></i>
          </div>
          <button className={conditionMet} onClick={onComplete}>
            {status}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Items;

