import React from 'react';
import TodoForm from './TodoForm';
import FilterLinks from './FilterLinks';
import TodoList from './TodoList';
import TodosCount from './TodosCount';
import constants from '../constants';

const { ALL, ACTIVE, COMPLETED } = constants;

class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm : '',
      currentFilter : ALL,
      todos : []
    }
    this.handleNewTodo = this.handleNewTodo.bind(this);
    this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handleFilterLinkChange = this.handleFilterLinkChange.bind(this);
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
  }

  handleNewTodo() {
    this.setState(( {searchTerm, todos} ) => {
      var todoItem = {
        todo : searchTerm,
        id : Date.now().toString(),
        completed : false
      };
      todos = [ ...todos, todoItem];

      return {
        todos : todos,
        searchTerm : ''
      };
    });
  }

  handleDeleteBtnClick(event) {
    var id = event.target.value;
    this.setState(({ todos }) => {
      todos = todos.filter(({ id: todoId }) => {
        return (todoId !== id);
      });
      return {
        todos : todos
      };
    });
  }

  handleCheckboxClick(evt) {
    var id = evt.target.value;
    this.setState(({ todos }) => {
      var index = todos.findIndex(({ id: todoId }) => {
        return todoId === id;
      });

      const { todo, completed } = todos[index];

      todos = [
        ...todos.slice(0, index),
        {
          todo : todo,
          id : id,
          completed : !completed
        },
        ...todos.slice(index + 1)
      ];

      return {
        todos : todos
      };
    });
  }

  handleFilterLinkChange(evt, currentFilter) {
    evt.preventDefault();

      this.setState((prevState) => {
        return {
          currentFilter : currentFilter
        }
      });
  }

  filterTodos() {
    const { todos, currentFilter, searchTerm } = this.state;
    var filteredTodos = todos.filter(({ todo, completed}) => {
      if((todo.indexOf(searchTerm) === -1) ||
          (currentFilter === ACTIVE && completed) ||
          (currentFilter === COMPLETED && !completed)) {
            return false;
          }
      return true;
    });
    return filteredTodos;
  }

  handleSearchTerm(searchTerm) {
    this.setState(() => {
      return {
        searchTerm : searchTerm
      }
    });
  }

  render() {
    const todos = this.filterTodos();

    const {
            state : { searchTerm, currentFilter, completed },
            handleSearchTerm,
            handleNewTodo,
            handleFilterLinkChange,
            handleDeleteBtnClick,
            handleCheckboxClick
          } = this;

    return(
      <div>
        <TodoForm
          todoText={searchTerm}
          onSearchTerm={handleSearchTerm}
          addNewTodoItem={handleNewTodo}
        />
        <FilterLinks
          onFilterChangeClick={handleFilterLinkChange}
          currentFilter={currentFilter}
        />
        <TodoList
          todos={todos}
          onDeleteBtnClick={handleDeleteBtnClick}
          completed={completed}
          onCheckboxClick={handleCheckboxClick}
        />
        <TodosCount todosCount={todos.length}/>
      </div>
    );
  }
}

export default Todo;
