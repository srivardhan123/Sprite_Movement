import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const LayerEffect = ({ character, comp_id, addAction }) => {
  const [selectedLayer, setSelectedLayer] = useState("front");

  const handleDisplay = () => {
    const el = document.getElementById(`${character.active}-div`);
    switch (selectedLayer) {
      case "front":
        el.style.zIndex = 10;  // Assuming front layer has higher z-index
        break;
      case "back":
        el.style.zIndex = 0;  // Assuming back layer has lower z-index
        break;
      default:
        break;
    }
    addAction({
      type: 'Front_OR_Back',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "Set Layer to " + selectedLayer ,
      },
    });
  };

  return (
    <Paper elevation={3}>
      <div 
        id={comp_id}
        className="text-center rounded bg-purple-700 text-white p-2 my-2 text-sm cursor-pointer mx-auto"
        onClick={() => handleDisplay()}
      >
        <div className="grid grid-cols-2 my-2">
          <span className="text-white">Set Layer</span>
          <select
            className="text-black mx-2 p-1"
            value={selectedLayer}
            onChange={(e) => setSelectedLayer(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="front">Front</option>
            <option value="back">Back</option>
          </select>
        </div>
      </div>
    </Paper>
  );
};

// Mapping state to component props
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

export default connect(mapStateToProps, mapDispatchToProps)(LayerEffect);
