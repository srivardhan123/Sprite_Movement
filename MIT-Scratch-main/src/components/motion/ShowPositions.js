import React, {useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const ShowPositions = ({ character, comp_id, addAction}) => {
  const [state, setState] = useState({
    show_msg: false,
    show_msgy:false,
    show_direction:false,
  });
 
  /* Display Message */

  const ShowxPosition = () => {
    const el1 = document.getElementById(`${character.active}-x-position`);
    if (state.show_msg) {
      setState({ ...state, show_msg: false });
      el1.style.display = "none";
      return;
    }
    setState({ ...state, show_msg: true });
    el1.style.display = "block";
    el1.style.position = "relative";
    const el = document.getElementById(`${character.active}-div`);
    let topNumber = parseFloat(el.style.left);
    if(isNaN(topNumber))
      topNumber  = 0;
    el1.innerHTML = "Hey, My X-cord is " + topNumber + " px";
    addAction({
      type: 'Show_X',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "My X position is  "+ topNumber,
      },
    });
    window.clearTimeout();
  };


  const ShowyPosition = () => {
    const el2 = document.getElementById(`${character.active}-y-position`);
    if (state.show_msgy) {
      setState({ ...state, show_msgy: false });
      el2.style.display = "none";
      return;
    }
    setState({ ...state, show_msgy: true });
    el2.style.display = "block";
    el2.style.position = "relative";
    const el = document.getElementById(`${character.active}-div`);
    let topNumber = parseFloat(el.style.top);
    if(isNaN(topNumber))
      topNumber  = 0;
    el2.innerHTML = "Hey, My Y-cord is " + topNumber + " px";
    addAction({
      type: 'Show_Y',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "My Y position is  "+ topNumber,
      },
    });
    window.clearTimeout();
  };

  const ShowDirection = () => {
    const el3 = document.getElementById(`${character.active}-direction`);
    if (state.show_direction) {
      setState({ ...state, show_direction: false });
      el3.style.display = "none";
      return;
    }
    setState({ ...state, show_direction: true });
    el3.style.display = "block";
    el3.style.position = "relative";
    const el = document.getElementById(character.active);
    const transform = el.style.transform;
    const rotateRegex = /rotate\(([^)]+)\)/;

    const match = transform.match(rotateRegex);
    let degree = 0; //

    if (match && match[1]) {
        degree = parseFloat(match[1]);
    }
    el3.innerHTML = "Hey! My direction is " + degree + "\u00B0";
    addAction({
      type: 'Show_Direction',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "My Direction is  "+ degree + "\u00B0",
      },
    });
    window.clearTimeout();
    window.clearTimeout();
  };


  return (
    <Paper elevation={3}>
      <div 
        id={comp_id}
        className="rounded text-center bg-blue-700 p-2 my-3 "
      >
        <div className="grid grid-cols-2 my-2">
          <label htmlFor="showPosition" className="text-white" >
           X Position
          </label>
          <input
            className="bg-red-700"
            type="checkbox"
            id="showPosition"
            checked={state.show_msg}
            onChange={() => ShowxPosition()}
          />
        </div>
        <div className="grid grid-cols-2 my-2">
          <label htmlFor="showPosition" className="text-white">
           Y Position
          </label>
          <input
            type="checkbox"
            id="showPosition"
            checked={state.show_msgy}
            onChange={() => ShowyPosition()}
          />
        </div>
        <div className="grid grid-cols-2 my-2">
          <label htmlFor="showPosition" className="text-white">
            Direction
          </label>
          <input
            type="checkbox"
            id="showPosition"
            checked={state.show_direction}
            onChange={() => ShowDirection()}
          />
        </div>
      </div>
    </Paper>
  );
};

// mapping state to component
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAction: (action) => dispatch(addAction(action)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPositions);


