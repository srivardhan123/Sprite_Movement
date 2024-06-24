import React, { useState } from "react";
import { connect } from "react-redux";
import { setCharacterAngle } from "../../redux/character/actions";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const PointDirection = ({ character, characterAngle, comp_id, addAction}) => {
  const [angle, setAngle] = useState(0);
  const [moveType, setMoveType] = useState("mouse");

  // Function to calculate the angle between the sprite and the mouse pointer
  const calculateAngleToMouse = (event) => {
    const el = document.getElementById(character.active);
    const rect = el.getBoundingClientRect();
    const spriteX = rect.left + rect.width / 2;
    const spriteY = rect.top + rect.height / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const deltaX = mouseX - spriteX;
    const deltaY = mouseY - spriteY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    addAction({
      type: 'POINT_TO_MOUSE',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "My point direction is " + angle + " degrees.",
      },
    });
    return angle;
  };

  // Function to get a random angle
  const getRandomAngle = () => {
    const angle = Math.floor(Math.random() * 360);
    addAction({
      type: 'POINT_TO_RANDOM',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "My point direction is " + angle + " degrees.",
      },
    });
    return angle;
  };

  // Point direction!!
  const handleClick = (event) => {
    const el = document.getElementById(character.active);
    const character_angle = character.characters.find(
      (x) => x.id === character.active
    );
    if (character_angle) {
      let newAngle;
      if (moveType === "mouse") {
        newAngle = calculateAngleToMouse(event);
      } else if (moveType === "random") {
        newAngle = getRandomAngle();
      }
      el.style.transform = `rotate(${newAngle}deg)`;
      setAngle(newAngle); // Update the state with the new angle
      characterAngle(newAngle);
    }
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-blue-700 p-2 my-3"
       id={comp_id}
       onClick={(event) => handleClick(event)}
      >
        <div className="grid grid-rows-2 items-center">
          <div className="text-white">Point Direction:</div>
          <div >
          <select
            className="text-black mx-2 p-1"
            value={moveType}
            onChange={(e) => setMoveType(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="random">Random Direction</option>
            <option value="mouse">Mouse Direction</option>
          </select>
          </div >
        </div>
      </div>
    </Paper>
  );
};

// Mapping state to component
const mapStateToProps = (state) => {
  return {
    character: state.character,
  };
};

// Mapping function to component
const mapDispatchToProps = (dispatch) => {
  return {
    characterAngle: (angle) => dispatch(setCharacterAngle(angle)),
    addAction: (action) => dispatch(addAction(action)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PointDirection);
