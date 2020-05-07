import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import TasksService from '../services/TasksService';

class NewTaskForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            invalidField: false
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    addTask = () => {
        if (this.state.title === "") {
            this.setState({ invalidField: true });
            return;
        }

        let task = {
            title: this.state.title,
            description: this.state.description,
            isCompleted: false
        }

        TasksService.addTask(task)
            .then(res => {
                this.clearForm();
                this.props.handleCompletion(res);
            })
            .catch(err => console.log(err));
    }

    clearForm = () => {
        this.setState({
            title: "",
            description: ""
        })
    }

    removeFieldMark = () => {
        this.setState({ invalidField: false })
    }

    render() {
        return (
            <div className="new-task-form">
                <span className="title">Add new task</span>
                <div className="form">
                    <div className="field-container">
                        <span>Title</span>
                        <input
                            className={`description-field ${this.state.invalidField ? "invalid-field" : ""}`}
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            onFocus={this.removeFieldMark}
                        />
                    </div>
                    <div className="field-container">
                        <span>Description</span>
                        <input
                            className="description-field"
                            type="text"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />

                    </div>
                    <div className="add-button" onClick={this.addTask}><AddIcon fontSize="large" /></div>
                </div>
            </div>
        )
    }
}

export default NewTaskForm;