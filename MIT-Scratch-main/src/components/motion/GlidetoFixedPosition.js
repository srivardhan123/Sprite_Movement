import React, { useState} from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const GlideToFixedPosition = ({ character, comp_id,addAction }) => {
  const [state, setState] = useState({
    target_x: 0,
    target_y: 0,
    glide_time: 0, // Default glide time in seconds
  });

  const glideToFixedPosition = () => {
    const el = document.getElementById(`${character.active}-div`);

    const { target_x, target_y, glide_time } = state;

    el.style.position = "relative";
    el.style.transition = `left ${glide_time}s ease, top ${glide_time}s ease`; // Adding transition for smooth glide
    el.style.left = `${target_x}px`;
    el.style.top = `${target_y}px`;

    addAction({
      type: 'Glide_Fixed',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "Glide Time is " + state.glide_time + " X, Y Position is " + state.target_x + " and " + state.target_y,
      },
    });
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-blue-700 p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Time (s) </div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.glide_time}
            onChange={(e) => {
              setState({ ...state, glide_time: parseInt(e.target.value, 10) || 0 });
            }}
          />
        </div>
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Target X</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.target_x}
            onChange={(e) => {
              setState({ ...state, target_x: parseInt(e.target.value, 10) || 0 });
            }}
          />
        </div>
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Target Y</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.target_y}
            onChange={(e) => {
              setState({ ...state, target_y: parseInt(e.target.value, 10) || 0 });
            }}
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={glideToFixedPosition}
        >
          Glide to Fixed Position ({state.target_x}, {state.target_y})
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

export default connect(mapStateToProps,mapDispatchToProps)(GlideToFixedPosition);
