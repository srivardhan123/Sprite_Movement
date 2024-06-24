import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";


const GlidetoRandomPosition = ({ character, comp_id,addAction}) => {
  const [state, setState] = useState({
    goto_x: 0,
    goto_y: 0,
    glide_time: 0, // Default glide time in seconds
  });

  const glideToRandomPosition = () => {
    const el = document.getElementById(`${character.active}-div`);
    const container = el.parentElement; // Assuming the parent element is the container
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const randomX = Math.floor(Math.random() * containerWidth);
    const randomY = Math.floor(Math.random() * containerHeight);

    setState({ goto_x: randomX, goto_y: randomY });

    el.style.position = "relative";
    el.style.transition = `left ${state.glide_time}s ease, top ${state.glide_time}s ease`; // Adding transition for smooth glide
    el.style.left = `${randomX}px`;
    el.style.top = `${randomY}px`;

    addAction({
      type: 'Glide_Random',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "Glide Time is " + state.glide_time + " X, Y Position is " + randomX + " and " + randomY,
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
        <div
          id={comp_id}
          className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={glideToRandomPosition}
        >
          Glide to Random Position
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

export default connect(mapStateToProps,mapDispatchToProps)(GlidetoRandomPosition);
