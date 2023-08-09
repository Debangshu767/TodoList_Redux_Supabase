import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice(
    {
        name : "Todo",
        initialState : {
          todos : [],
          loading : true,
        },
        reducers : {
            setTodos(state,action) {
              state.todos = action.payload
              state.loading = false;

            },
             createTodo(state,action) {
              state.todos.push(action.payload)

              },
            // removeTodo(state, action) { 
            //   console.log(action.payload)
            //   state.todos.filter((todo) => todo.id !== action.payload)
            // },
            removeTodo(state, action) {
              const idToRemove = action.payload;
              state.todos = state.todos.filter((todo) => todo.id !== idToRemove);
            }
    },
    });

    export const {setTodos,createTodo,removeTodo} = todosSlice.actions
export default todosSlice.reducer;