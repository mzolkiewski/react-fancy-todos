import Counter from '../../utils/counter';
import TodoStore from './TodoStore';

const todoCounter = new Counter(1);

const create = (name, categoryId) => {
  return {
    id: todoCounter.next(),
    name,
    description: '',
    completed: false,
    categoryId
  };
};

const getById = (id) => {
  return TodoStore.getState().todos.find((todo) => {
    return todo.id === +id;
  });
};

const getByCategoryId = (categoryId) => {
  return TodoStore.getState().todos.filter((todo) => {
    return todo.categoryId === categoryId;
  });
};

export default {
  create,
  getById,
  getByCategoryId
};
