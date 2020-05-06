const local = false;
const url = local ? 'http://localhost:8080/tasks/' : 'https://supero-api.herokuapp.com/tasks/'

const TasksService = {
    getTasks: () => {
        return fetch(url)
            .then(res => TasksService.HandleResponse(res))
            .then(res => res.json());
    },

    addTask: (task) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => TasksService.HandleResponse(res))
            .then(res => res.json());
    },

    deleteTask: (id) => {
        return fetch(`${url}${id}`, {
            method: 'DELETE'
        })
            .then(res => TasksService.HandleResponse(res))
    },

    editTask: (task) => {
        return fetch(`${url}${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => TasksService.HandleResponse(res))
            .then(res => res.json());
    },

    HandleResponse: res => {
        if (!res.ok) {
            throw Error(res.responseText);
        }
        return res;
    }
}

export default TasksService;