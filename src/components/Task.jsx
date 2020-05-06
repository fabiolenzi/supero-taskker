import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import TasksService from '../services/TasksService';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

class Task extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            editingTitle: props.task.title,
            editingDescription: props.task.description
        }
    }

    openEditor = () => {
        this.setState({ isEditing: true })
    }

    cancelEdit = () => {
        this.setState({
            isEditing: false,
            editingTitle: this.props.task.title,
            editingDescription: this.props.task.description
        })
    }

    completeEdit = () => {
        this.setState({
            isEditing: false
        })
    }

    deleteTask = () => {
        TasksService.deleteTask(this.props.task.id)
            .then(res => {
                this.props.handleDelete(this.props.task.id);
            })
            .catch(err => console.log(err));
    }

    editTask = () => {
        let editedTask = {
            id: this.props.task.id,
            title: this.state.editingTitle,
            description: this.state.editingDescription,
            isCompleted: false
        }

        TasksService.editTask(editedTask)
            .then(res => {
                this.completeEdit();
                this.props.handleEdit(res);
            })
            .catch(err => console.log(err));
    }

    toggleStatus = () => {
        let completedTask = this.props.task;
        completedTask.isCompleted = !completedTask.isCompleted;
        
        console.log(completedTask);

        TasksService.editTask(completedTask)
            .then(res => {
                this.completeEdit();
                this.props.handleEdit(res);
            })
            .catch(err => console.log(err));
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    renderStatusIcon = () => {
        return this.props.task.isCompleted ? <CheckCircleOutlineIcon onClick={this.toggleStatus} /> : <RadioButtonUncheckedIcon onClick={this.toggleStatus} />
    }

    renderEditingTask = () => {
        return (
            <div className="task editing-task">
                <div className="texts">
                    <input
                        className="title-field"
                        type="text"
                        name="editingTitle"
                        value={this.state.editingTitle}
                        onChange={this.handleChange} />
                    <input
                        className="description-field"
                        type="text"
                        name="editingDescription"
                        value={this.state.editingDescription}
                        onChange={this.handleChange} />
                </div>
                <div className="buttons">
                    <div onClick={this.editTask}><DoneIcon /></div>
                    <div onClick={this.cancelEdit}><CloseIcon /></div>
                </div>
            </div>
        )
    }

    renderDefaultTask = () => {
        return (
            <div className={`task ${this.props.task.isCompleted ? "completed-task" : ""}`}>
                { this.renderStatusIcon() }
                <div className="texts" onClick={this.toggleStatus}>
                    <span className="title">{this.props.task.title}</span>
                    {this.props.task.description ? <span className="description">{this.props.task.description}</span> : ""}

                </div>
                <div className="buttons">
                    {this.props.task.isCompleted ? "" : <div onClick={this.openEditor}><EditIcon /></div>}
                    <div onClick={this.deleteTask}><DeleteIcon /></div>
                </div>
            </div>
        )
    }

    render() {
        return this.state.isEditing ? this.renderEditingTask() : this.renderDefaultTask();
    }
}

export default Task;