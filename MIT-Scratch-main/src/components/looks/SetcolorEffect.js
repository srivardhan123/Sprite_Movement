import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const ColorEffect = ({ character, comp_id, addAction }) => {
  const [colorEffect, setColorEffect] = useState(0);
  const [selectedOption, setSelectedOption] = useState("brightness");

  const handleDisplay = () => {
    const el = document.getElementById(`${character.active}-div`);
    switch (selectedOption) {
      case "brightness":
        let brightness = colorEffect + 100;
        el.style.filter = `brightness(${brightness}%)`;
        break;
      case "whirl":
        el.style.filter = `hue-rotate(${colorEffect}deg)`;
        break;
      case "fisheye":
        el.style.filter = `blur(${colorEffect}px)`;
        break;
      case "ghost":
        el.style.filter = `opacity(${100 - colorEffect}%)`;
        break;
      default:
        break;
    }
    addAction({
      type: 'Set_Color_Effect',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "I have changed the color effect...",
      },
    });
  };

  return (
    <Paper elevation={3}>
      <div 
      id={comp_id}
      className={`text-center rounded bg-purple-700 text-white p-2 my-2 text-sm cursor-pointer mx-auto`}    
      onClick={() => handleDisplay()}
      >
        <div className="flex items-center justify-center" >
          <span className="text-white">Set</span>
          <select
            className="text-black mx-2 p-1"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="brightness">Color</option>
            <option value="whirl">Whirl</option>
            <option value="fisheye">Fish Eye</option>
            <option value="ghost">Ghost</option>
          </select>
          <span className="text-white">To</span>
          <input
            type="number"
            className="text-black text-center w-16 mx-2"
            value={colorEffect}
            onChange={(e) => setColorEffect(parseInt(e.target.value))}
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

export default connect(mapStateToProps, mapDispatchToProps)(ColorEffect);

