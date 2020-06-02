const Store = {
    getTodos: () => {
        return fetch('http://localhost:3000/api/todos').then(r => r.json());
    },
    createTodo: (title) => {
        return fetch('http://localhost:3000/api/todos', {
            method: 'post',
            body: JSON.stringify({ title: title }),
            headers: { "content-type": "application/json" }
        })
    },
    updateTodos: (id, title) => {
        return fetch(`http://localhost:3000/api/todo/${id}`, {
            method: 'put',
            body: JSON.stringify({ title: title }),
            headers: { "content-type": "application/json" }
        });
    },
    deleteTodo: (id) => {
        return fetch(`http://localhost:3000/api/todo/${id}`, {
            method: 'delete',
            headers: { "content-type": "application/json" }
        });
    }
}

export default Store;