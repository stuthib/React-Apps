import React from 'react';

const TodoItem = ({ todoItem: { completed, id, todo}, onCheckboxClick, onDeleteBtnClick }) => {
  return(
    <li className='list-group-item'>
      <h3>
        <input
          className='pull-left'
          type='checkbox'
          checked={completed}
          value={id}
          onChange={onCheckboxClick}
        />
        {todo}
        <button
          className='btn btn-default btn-danger pull-right'
          onClick={onDeleteBtnClick}
          value={id}
        >
          Delete
        </button>
      </h3>
    </li>
  );
};

export default TodoItem
