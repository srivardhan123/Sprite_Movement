import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH"; 

const ThinkWithTimer = ({ character, comp_id, addAction }) => {
  const [state, setState] = useState({
    show_msg: false,
    timer_message: "",
    timer_for_msg: 0,
  });
  /* Display Think Message with Timer */
  const displayMessage = () => {
    const el = document.getElementById(`${character.active}-message-box`);
    const el2 = document.getElementById(`${character.active}-message-box1`);
    if (state.show_msg && state.character_id === character.active) {
      setState({ ...state, show_msg: false });
      el.style.display = "none";
      el2.style.display = "none";
      return;
    }
    setState({ ...state, show_msg: true });
    el.style.display = "inline-block";
    el.style.position = "relative";

    el2.style.display = "block";
    el2.style.position = "relative";

    el.innerHTML = state.timer_message;
    window.setTimeout(() => {
      setState({ ...state, show_msg: false });
      el.style.display = "none";
      el2.style.display = "none";
    }, state.timer_for_msg * 1000);
    addAction({
      type: 'Think for T(s)',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "The sprite is thinking on " + state.message + " for " + state.timer_for_msg + " secs ",
      },
    });
  };

  return (
    <Paper elevation={3}>
      <div className="rounded text-center bg-purple-700 p-2 my-3"
                id={comp_id}
                onClick={() => displayMessage()}
      >
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Think</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="text"
            value={state.timer_message}
            onChange={(e) => {
                setState({ ...state, timer_message: e.target.value });
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Timer:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.timer_for_msg}
            onChange={(e) => {
                setState({ ...state, timer_for_msg: parseInt(e.target.value) });
            }}
            onClick={(e) => e.stopPropagation()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ThinkWithTimer);
