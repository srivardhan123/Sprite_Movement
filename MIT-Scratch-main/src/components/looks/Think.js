import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const ThinkMessage = ({ character, comp_id, addAction }) => {
  const [state, setState] = useState({
    show_msg: false,
    message: "",
    character_id: "",
  });
  /* Display Think Message */
  const displayMessage = () => {
    const el = document.getElementById(`${character.active}-message-box`);
    const el2 = document.getElementById(`${character.active}-message-box1`);
    if (state.show_msg) {
      setState({ ...state, show_msg: false });
      el.style.display = "none";
      el2.style.display = "none";
      return;
    }
    setState({ ...state, show_msg: true });
    el.style.display = "block";
    el.style.position = "relative";

    el2.style.display = "block";
    el2.style.position = "relative";

    window.clearTimeout();
    el.innerHTML = state.message;
    addAction({
      type: 'Think',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "The sprite is thinking on " + state.message,
        property: {
          displayMsg: el.style.display,
          display1:el2.style.display,
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
          <div className="text-white">Think </div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="text"
            value={state.message}
            onChange={(e) => {
                setState({ ...state, message: e.target.value });
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

export default connect(mapStateToProps, mapDispatchToProps)(ThinkMessage);
