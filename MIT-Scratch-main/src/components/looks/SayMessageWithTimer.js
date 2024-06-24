import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const SayMessageWithTimer = ({ character, comp_id, addAction }) => {
  const [state, setState] = useState({
    show_msg: false,
    timer_message: "",
    timer_for_msg: 0,
  });

  /* Display Message with Timer */
  const displayMessage = () => {
    const el = document.getElementById(`${character.active}-message-box`);
    const el2 = document.getElementById(`${character.active}-message-box1`);
    el2.style.display = "none";
    if (state.show_msg) {
      setState({ ...state, show_msg: false });
      el.style.display = "none";
      return;
    }
    setState({ ...state, show_msg: true });
    el.style.display = "block";
    el.style.position = "relative";
    el.innerHTML = state.timer_message;
    window.setTimeout(() => {
      setState({ ...state, show_msg: false });
      el.style.display = "none";
    }, state.timer_for_msg * 1000);
    addAction({
      type: 'Say message for T (s) ',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "The message has " + state.timer_message + " displayed for " + state.timer_for_msg + " sec",
        property: {
          displayMsg: el.style.display,
          innerHTML: el.innerHTML,
        }
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
          <div className="text-white"> Say Msg</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="text"
            value={state.timer_message}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
                setState({ ...state, timer_message: e.target.value });
            }}
          />
        </div>
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Timer:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.timer_for_msg}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
                setState({ ...state, timer_for_msg: parseInt(e.target.value) });
            }}
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

export default connect(mapStateToProps, mapDispatchToProps)(SayMessageWithTimer);
