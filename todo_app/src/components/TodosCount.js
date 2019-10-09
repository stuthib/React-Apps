import React from 'react';

const TodosCount = ({ todosCount }) => {

  return(
    <div className='well well-sm'>
      <h4>Todos Count : {todosCount}</h4>
    </div>
  );
}

export default TodosCount;
