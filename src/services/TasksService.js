const TasksService = {
    getTasks: () => {
        return fetch('https://supero-api.herokuapp.com/tasks/')
            .then(res => TasksService.HandleResponse(res))
            .then(res => res.json());
    },

    addTask: (task) => {
        return fetch('https://supero-api.herokuapp.com/tasks/', {
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
        return fetch(`https://supero-api.herokuapp.com/tasks/${id}`, {
            method: 'DELETE'
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