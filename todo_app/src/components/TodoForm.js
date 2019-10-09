import React from 'react';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChangeEvt = this.handleInputChangeEvt.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleSubmitForm(event) {
    event.preventDefault();
    this.props.addNewTodoItem();
  }

  handleInputChangeEvt(evt) {
    var todoText = evt.target.value;
    this.props.onSearchTerm(todoText);
  }

  handleInputRef(inputRef) {
    inputRef.focus();
  }

  render() {
    const { todoText } = this.props;
    return(
      <form className='form-group' onSubmit={evt => this.handleSubmitForm(evt)}>
        <input
          value={todoText}
          className='form-control'
          type='text'
          placeholder='Add Todo Item'
          ref={this.handleInputRef}
          onChange={evt => this.handleInputChangeEvt(evt)}
        />
      </form>
    );
  }
}

export default TodoForm;
