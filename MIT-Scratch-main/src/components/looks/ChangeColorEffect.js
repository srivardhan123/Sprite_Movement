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
        let brightness = colorEffect;
        const filter = el.style.filter;
        const brightnessRegex = /brightness\(([^)]+)\)/;
        const match = filter.match(brightnessRegex);
        let olderbrightness = 0;
        if (match && match[1]) {
          olderbrightness = parseFloat(match[1]);
        }
        el.style.filter = `brightness(${olderbrightness - brightness}%)`;
        break;
      case "whirl":
        const filter1 = el.style.filter;
        const hueRotateRegex = /hue-rotate\(([^)]+)\)/;
        const match1 = filter1.match(hueRotateRegex);
        let hueRotate = 0; // Default value if no hue-rotate is found
        if (match1 && match1[1]) {
          hueRotate = parseFloat(match1[1]);
        }
        el.style.filter = `hue-rotate(${hueRotate - colorEffect}deg)`;
        break;
      case "fisheye":
        const filter2 = el.style.filter;
        // Regular expression to match the blur value
        const blurRegex = /blur\(([^)]+)\)/;
        const match2 = filter2.match(blurRegex);
        let blur = 0; 
        if (match2 && match2[1]) {
          blur = parseFloat(match2[1]);
        }
        el.style.filter = `blur(${blur - colorEffect}px)`;
        break;
      case "ghost":
        const filter3 = el.style.filter;
        // Regular expression to match the blur value
        const OpaciityRegex = /opacity\(([^)]+)\)/;
        const match3 = filter3.match(OpaciityRegex);
        let opacity = 0; 
        if (match3 && match3[1]) {
          opacity = parseFloat(match3[1]);
        }
        el.style.filter = `opacity(${opacity-colorEffect}%)`;
        break;
      default:
        break;
    }
    addAction({
      type: 'Alter_Color_Effect',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "Here the change effect has performed! ",
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
          <span className="text-white">Alter</span>
          <select
            className="text-black mx-2 p-1"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="brightness">Color</option>
            <option value="whirl">Whirl</option>
            <option value="fisheye">Eye</option>
            <option value="ghost">Ghost</option>
          </select>
          <span className="text-white"> By</span>
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

