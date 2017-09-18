import React from 'react';

const Form = function(props) {
  console.log(props);
  return(
    <div>
      <form onSubmit={props.onFormSubmit}>
        <div className="form-group">
          <input type="text" form="form-control" placeholder="Enter some input" value={props.myInput} onChange={props.onInputChange}></input>
        </div>
        <div>
          <textarea placeholder="Enter some text" value={props.myText} onChange={props.onTextChange}></textarea>
        </div>
        <div>
          <label className="mr-sm-2">Select your input:
            <select className="custom-select mb-2 mr-sm-2 mb-sm-0" onChange={props.onOptionsChange}>
              <option value="Apple">Apple</option>
              <option value="Banana">Banana</option>
              <option value="Mango">Mango</option>
            </select>
          </label>
        </div>
        <button className="btn btn-default btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Form;
