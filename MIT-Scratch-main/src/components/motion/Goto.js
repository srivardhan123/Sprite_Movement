import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const GotoXY = ({ character, comp_id , addAction}) => {
  const [state, setState] = useState({
    goto_x: 0,
    goto_y: 0,
  });

  // go to posiiton X and Y
  const gotoXY = () => {
    const el = document.getElementById(`${character.active}-div`);
    el.style.position = "relative";
    el.style.left = state.goto_x + "px";
    el.style.top = state.goto_y + "px";

    addAction({
      type: 'GOTO_XY',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(), 
        message: "X, Y position is " +state.goto_x + " and " + state.goto_y,
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
              // parseInt(e.target.value) !== 0 &&
                setState({ ...state, goto_x: parseInt(e.target.value) });
            }}
          />
        </div>
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Y</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.goto_y}
            onChange={(e) => {
              // parseInt(e.target.value) !== 0 &&
                setState({ ...state, goto_y: parseInt(e.target.value) });
            }}
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => gotoXY()}
        >
          Set X to : {state.goto_x} Y : {state.goto_y}
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


export default connect(mapStateToProps,mapDispatchToProps)(GotoXY);
