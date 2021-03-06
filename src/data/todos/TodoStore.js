import Immutable from 'seamless-immutable';
import { ReduceStore } from 'flux/utils';

import TodoActionTypes from './TodoActionTypes';
import TodoDispatcher from './TodoDispatcher';
import TodoDAO from './TodoDAO';

class TodoStore extends ReduceStore {
  constructor() {
    super(TodoDispatcher);
  }

  getInitialState() {
    return {
      selectedTodoId: null,
      todos: Immutable([])
    };
  }

  getByCategoryId(categoryId) {
    return TodoDAO.getByCategoryId(categoryId);
  }

  reduce(state, action) {
    switch (action.type) {
      case TodoActionTypes.ADD_TODO:
        return {
          ...state,
          todos: [...state.todos, TodoDAO.create(action.name, action.categoryId)].sort((a, b) => a.id - b.id).reverse()
        };
      case TodoActionTypes.SELECT_TODO:
        return {
          ...state,
          selectedTodoId: action.id
        };
      case TodoActionTypes.UPDATE_TODO:
        return {
          ...state,
          todos: state.todos.map((todo) => {
            if (todo.id === action.todo.id) {
              todo = action.todo;
            }
            return todo;
          })
        };
      case TodoActionTypes.DELETE_TODOS_BY_CATEGORIES:
        return {
          ...state,
          todos: state.todos.filter((todo) => {
            return !action.ids.includes(todo.categoryId);
          })
        };
      case TodoActionTypes.SET_COMPLETED:
        return {
          ...state,
          todos: state.todos.map((todo) => {
            if (todo.id === action.id) {
              todo.completed = action.completed || false;
            }
            return todo;
          })
        }
      default:
        return state;
    }
  }
}

export default new TodoStore();
