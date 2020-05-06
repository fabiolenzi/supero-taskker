import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import TasksService from '../services/TasksService';

class NewTaskForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: ""
        }
    }

    addTask = () => {
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

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    render() {
        return (
            <div className="new-task-form">
                <span className="title">Add new task</span>
                <div className="form">
                    <span>Title</span>
                    <input
                        className="description-field"
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                    <span>Description</span>
                    <input
                        className="description-field"
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                    />
                    <div className="add-button" onClick={this.addTask}><AddIcon /></div>
                </div>
            </div>
        )
    }
}

export default NewTaskForm;