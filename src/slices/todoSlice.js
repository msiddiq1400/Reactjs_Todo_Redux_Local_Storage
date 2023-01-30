import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
    const localTodoList = window.localStorage.getItem('todoList');
    if(localTodoList) {
        return JSON.parse(localTodoList);
    }
    window.localStorage.setItem('todoList', JSON.stringify([]))
    return [];
}

const initialValue = {
    todoList: getInitialTodo(),
    filterStatus: 'all'
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialValue,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
            const todoList = window.localStorage.getItem('todoList');
            if(todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.push({...action.payload});
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr))
            } else {
                window.localStorage.setItem('todoList', JSON.stringify([{...action.payload}]))
            }
        },
        deleteTodo: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if(todoList) {
                let todoListArr = JSON.parse(todoList);
                todoListArr = todoListArr.filter((todo) => todo.id !== action.payload)
                window.localStorage.setItem('todoList', JSON.stringify(todoListArr))
                state.todoList = todoListArr;
            }
        },
        updateTodo: (state, action) => {
            const todoList = window.localStorage.getItem('todoList');
            if(todoList) {
                const todoListArr = JSON.parse(todoList);
                const updatedArray = todoListArr.map((todo) => {
                    if(todo.id === action.payload.id) {
                        return {...todo, title: action.payload.title, status: action.payload.status, time: action.payload.time}
                    }
                    return todo;
                })

                window.localStorage.setItem('todoList', JSON.stringify(updatedArray))
                state.todoList = updatedArray;
            }
        },
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        }
    }
})

export const {addTodo, deleteTodo, updateTodo, updateFilterStatus} = todoSlice.actions;
export default todoSlice.reducer;