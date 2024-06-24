import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const ChangeY = ({ character, comp_id, addAction }) => {
  const [state, setState] = useState({
        change_y: 0,
  });

  //Change Position By Y
  const changeY= () => {
    const el = document.getElementById(`${character.active}-div`);
    el.style.position = "relative";
    let top_position = parseInt(el.style.top);
    if(isNaN(top_position))
    {
        top_position = 0;
    }
    el.style.top = top_position + state.change_y + "px";

    addAction({
      type: 'CHANGE_Y',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "Y is changed by " + state.change_y,
      },
    });
    
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-blue-700  p-2 my-3">
        <div className="grid grid-cols-2 my-2">
          <div className="text-white"> Y</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.change_y}
            onChange={(e) => {
                setState({ ...state, change_y: parseInt(e.target.value) });
            }}
          />
        </div>
        <div
          id={comp_id}
          className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => changeY()}
        >
          Change Y by : {state.change_y}
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

export default connect(mapStateToProps,mapDispatchToProps)(ChangeY);
