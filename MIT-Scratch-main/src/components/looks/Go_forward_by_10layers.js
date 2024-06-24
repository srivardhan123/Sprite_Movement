import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";
import { ListItem } from "@material-ui/core";

const LayerEffect = ({ character, comp_id, addAction }) => {
  const [selectedLayer, setSelectedLayer] = useState("front");
  const [layerOffset, setLayerOffset] = useState(0);

  const handleDisplay = () => {
    const el = document.getElementById(`${character.active}-div`);
    let currentZIndex = parseInt(window.getComputedStyle(el).zIndex) || 0;

    switch (selectedLayer) {
      case "forward":
        el.style.zIndex = currentZIndex + parseInt(layerOffset);
        break;
      case "backward":
        el.style.zIndex = currentZIndex - parseInt(layerOffset);
        break;
      default:
        break;
    }
    addAction({
      type: 'Move_Layer',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "The layers are moved by  " + layerOffset,
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
          <span className="text-white">Move Layer</span>
          <select
            className="text-black mx-2 p-1"
            value={selectedLayer}
            onChange={(e) => setSelectedLayer(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="forward">forward</option>
            <option value="backward">bckwrd</option>
          </select>
        </div>
          <div className="grid grid-cols-2 my-2">
            <span className="text-white">Layers</span>
            <input
              type="number"
              className="text-black mx-2 p-1"
              value={layerOffset}
              onChange={(e) => setLayerOffset(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
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
