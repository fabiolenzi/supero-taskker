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
          <h1>Taskker!</h1>
          <NewTaskForm handleCompletion={this.addNewTask} />
          <TaskList tasks={this.state.tasks} />
      </div>
    );
  }
}

export default App;
