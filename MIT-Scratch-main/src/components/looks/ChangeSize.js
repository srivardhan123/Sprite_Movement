import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const Size = ({ character, comp_id, addAction }) => {
  const [state, setState] = useState({
    scale: 1,
  });
  // To change Size of Sprint
  const changeSize = () => {
    const el = document.getElementById(character.active);
    const transformStyle = el.style.transform;
    const scaleRegex = /scale\(([^)]+)\)/;
    const scaleMatch = transformStyle.match(scaleRegex);
    let overallScale = 1;
    if (scaleMatch) {
      overallScale = parseFloat(scaleMatch[1]);
    }
    overallScale = overallScale*100;
    overallScale = overallScale + state.scale;
    el.style.transform = `scale(${overallScale/100})`;
    addAction({
      type: 'ALTER_SIZE',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "The new size scale is " + overallScale/100,
      },
    });
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-purple-700 p-2 my-3"
        id={comp_id}
        onClick={() => changeSize()}
      >
        <div className="grid grid-cols-2 my-2">
          <div className="text-white">Alter Size:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={state.scale}
            onChange={(e) =>
              setState({ ...state, scale: parseInt(e.target.value) })
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(Size);
