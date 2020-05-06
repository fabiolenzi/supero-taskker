import React from 'react';
import Task from './Task';

class TaskList extends React.Component {
    render() {
        return (
            <div className="list">
                {this.props.tasks.map(task =>
                    <Task key={task.id} task={task} />
                )}
            </div>
        )
    }

}

export default TaskList;