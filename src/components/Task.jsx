import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import TasksService from '../services/TasksService';

class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            editingTitle: "",
            editingDescription: ""
        }
    }


    handleEditClick = () => {
        console.log(`edit id ${this.props.task.id}`)
        this.setState({ isEditing: true })
    }

    handleDelete = () => {
        console.log(`delete id ${this.props.task.id}`);
        TasksService.deleteTask(this.props.task.id)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    completeTask = () => {
        console.log('complete');
    }

    handleChange = (event) => {
        let fieldValue = event.target.value
        if (this.validateName(fieldValue)) {
            this.setState({ name: fieldValue })
        }
    }

    render() {
        let task = this.props.task;

        if (this.state.isEditing) {
            return (
                <div className="task editing-task">
                    <div className="texts">
                        <input
                            className="title-field"
                            type="text"
                            value={this.state.editingTitle}
                            onChange={this.handleChange} />
                        <input
                            className="description-field"
                            type="text"
                            value={this.state.editingDescription}
                            onChange={this.handleChange} />
                    </div>
                    <div className="buttons">
                        <div onClick={this.handleEditClick}><DoneIcon /></div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="task">
                    <div className="texts" onClick={this.completeTask}>
                        <span className="title">{task.title}</span>
                        {task.description ? <span className="description">{task.description}</span> : ""}

                    </div>
                    <div className="buttons">
                        <div onClick={this.handleEditClick}><EditIcon /></div>
                        <div onClick={this.handleDelete}><DeleteIcon /></div>
                    </div>
                </div>
            )
        }
    }
}

export default Task;