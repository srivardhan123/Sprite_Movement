import React, { useState } from "react";
import { connect } from "react-redux";
import { setCharacterAngle } from "../../redux/character/actions";
import UndoIcon from "@material-ui/icons/Undo";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const TurnAntiClockWise = ({ character, characterAngle, comp_id,addAction }) => {
  const [angle, setAngle] = useState(0);

  // handle anti-clockwise rotation
  const handleClick = () => {
    let anti_angle = -1 * angle;
    const el = document.getElementById(character.active);
    const character_angle = character.characters.find(
      (x) => x.id === character.active
    );
    if (character_angle) {
      el.style.transform = `rotate(${character_angle.angle + anti_angle}deg)`;
      characterAngle(character_angle.angle + anti_angle);
    }
    addAction({
      type: 'Turn_Anti-Clock',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "I have turned in anti-clockwise by "+ angle + "\u00B0",
      },
    });
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-blue-700 p-2 my-3">
        <div className="grid grid-cols-2">
          <div className="text-white">Rotate By:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={angle}
            onChange={(e) => {
              setAngle(parseInt(e.target.value));
            }}
          />
        </div>
        <div
          id={comp_id}
          className={`flex bg-red-600 text-white px-2 py-1 mt-3 mb-1 text-sm cursor-pointer`}
          onClick={() => handleClick()}
        >
          <div className="flex mx-auto">
            Turn
            <UndoIcon className="mx-2" />
            {angle} degrees
          </div>
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

// mapping function to component
const mapDispatchToProps = (dispatch) => {
  return {
    characterAngle: (angle) => dispatch(setCharacterAngle(angle)),
    addAction: (action) => dispatch(addAction(action)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TurnAntiClockWise);
