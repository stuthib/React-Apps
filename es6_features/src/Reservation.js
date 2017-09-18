import React from 'react';

const Reservation = function(props) {
  return(
    <div>
      <form onSubmit={props.onReservationFormSubmit}>
        <label>
          Are you going to the part?
          <input
            type="checkbox"
            name="isGoing"
            checked={props.isGoing}
            onChange={props.onInputChange}
          />
        </label>
        <br />
        <label>
          How many guests will you bring?
          <input
            type="number"
            name="numOfGuests"
            value={props.numOfGuests}
            onChange={props.onInputChange} />
        </label>
        <br />
        <label>
          Select your theme:
            <select name="myTheme" value={props.myTheme} onChange={props.onInputChange}>
              <option value="retro">Retro</option>
              <option value="classical">Classical</option>
              <option value="pop">Pop</option>
            </select>
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Reservation;
