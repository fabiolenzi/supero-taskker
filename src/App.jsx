import React from 'react';
import './App.scss';
import TasksService from './services/TasksService';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tasks: []
    };
  }

  addNewTask = (task) => {
    this.setState({
      tasks: [...this.state.tasks, task]
    });
  }

  removeTask = (id) => {
    let newList = this.state.tasks.filter(task => task.id !== id);
    this.setState({
      tasks: newList
    })
  }

  editTask = (editedTask) => {
    let newList = this.state.tasks.map(task => {
      return task.id !== editedTask.id ? task : editedTask;
    });
    this.setState({
      tasks: newList
    })
  }

  componentDidMount() {
    TasksService.getTasks()
      .then(res => {
        this.setState({ tasks: res });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="app">
        <header >
          <h1>Taskker!</h1>
          <NewTaskForm handleCompletion={this.addNewTask} />
        </header>
        <TaskList tasks={this.state.tasks} handleDelete={this.removeTask} handleEdit={this.editTask} />
      </div>
    );
  }
}

export default App;
