import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const ChangeX = ({ character, comp_id,addAction}) => {
  const [state, setState] = useState({
        change_x: 0,
  });

  //Set Posiiton to X 
  const changeX= () => {
    const el = document.getElementById(`${character.active}-div`);
    el.style.position = "relative";
    let left_position = parseInt(el.style.left);
    if(isNaN(left_position))
    {
        left_position = 0;
    }
    el.style.left = left_position + state.change_x + "px";
    addAction({
      type: 'CHANGE_X',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "X is changed by " + state.change_x,
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
            value={state.change_x}
            onChange={(e) => {
                setState({ ...state, change_x: parseInt(e.target.value) });
            }}
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => changeX()}
        >
          Change X by : {state.change_x}
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

export default connect(mapStateToProps,mapDispatchToProps)(ChangeX);
