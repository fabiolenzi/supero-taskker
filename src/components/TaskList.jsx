import React, { Fragment } from 'react';
import Task from './Task';

class TaskList extends React.Component {

    renderCompletedList = () => {
        return (
            <Fragment>
                <h2>Completed tasks</h2>

                <div className="list">
                    {this.props.tasks
                        .filter(task => task.isCompleted)
                        .map(task =>
                            <Task key={task.id} task={task} {...this.props} />
                        )}
                </div>
            </Fragment>
        )
    }

    render() {
        return (
            <Fragment>
                <div className="list">
                    {this.props.tasks
                        .filter(task => !task.isCompleted)
                        .map(task =>
                            <Task key={task.id} task={task} {...this.props} />
                        )}
                </div>

                {this.props.tasks.some(task => task.isCompleted) ? this.renderCompletedList() : ""}
            </Fragment>
        )
    }
}

export default TaskList;