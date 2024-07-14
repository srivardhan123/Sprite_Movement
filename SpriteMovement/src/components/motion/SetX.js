import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const SetX = ({ character, comp_id, addAction}) => {
  const [state, setState] = useState({
    goto_x: 0,
  });

  //Set Posiiton to X 
  const setX= () => {
    const el = document.getElementById(`${character.active}-div`);
    el.style.position = "relative";
    el.style.left = state.goto_x + "px";

    addAction({
      type: 'SET_X',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "New X position is set to "+ state.goto_x,
        property: {
          left: el.style.left,
          top: el.style.top,
        }
      },
    });
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-blue-700  p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white"> X</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.goto_x}
            onChange={(e) => {
                setState({ ...state, goto_x: parseInt(e.target.value) });
            }}
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => setX()}
        >
          Set X to : {state.goto_x}
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

export default connect(mapStateToProps, mapDispatchToProps)(SetX);
