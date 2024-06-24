import React, { useState } from "react";
import { connect } from "react-redux";
import { setCharacterAngle } from "../../redux/character/actions";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const PointDirection = ({ character, characterAngle, comp_id, addAction }) => {
  const [angle, setAngle] = useState(0);

  //point direction!!
  const handleClick = () => {
    const el = document.getElementById(character.active);
    const character_angle = character.characters.find(
      (x) => x.id === character.active
    );
    if (character_angle) {
      el.style.transform = `rotate(${angle}deg)`;
      characterAngle(angle);
    }
    addAction({
      type: 'POINT_DIRECTION',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "My point direction is " + angle + " degrees.",
      },
    });
  };

  return (
    <Paper elevation={3}>
      <div className="text-center rounded bg-blue-700 p-2 my-3">
        <div className="grid grid-cols-2">
          <div className="text-white">Set Direction:</div>
          <input
            className="mx-2 p-1 py-0 text-center"
            type="number"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
          />
        </div>
        <div
          id={comp_id}
          className={`flex bg-red-600 text-white px-2 py-1 mt-3 mb-1 text-sm cursor-pointer text-center`}
          onClick={() => handleClick()}
        >
          <div className="flex mx-auto">
            Point in  Direction : {angle}&deg;
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

// const mapDispatchToProps1 = (dispatch) => {
//   return {
//     addAction: (action) => dispatch(addAction(action)),
//   };
// };

export default connect(mapStateToProps,mapDispatchToProps)(PointDirection);
