
import React, { useState } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const GoToRandomPosition = ({ character, comp_id,addAction }) => {
  const [moveType, setMoveType] = useState("mouse");

  const handleMouseMove = (event) => {
    const el = document.getElementById(`${character.active}-div`);
    const container = document.getElementById(`${character.active}-div`);
    const containerRect = container.getBoundingClientRect();

    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;

    el.style.position = "absolute";
    el.style.left = `${mouseX}px`;
    el.style.top = `${mouseY}px`;
    addAction({
      type: 'GOTO_MousePosition',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(), 
        message: "X, Y position is " + mouseX + " and " + mouseY,
        property: {
          left: el.style.left,
          top: el.style.top,
        }
      },
    });
  };

  const goToRandomPosition = () => {
    const el = document.getElementById(`${character.active}-div`);
    const container = document.getElementById(`${character.active}-div`);
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const randomX = Math.floor(Math.random() * containerWidth);
    const randomY = Math.floor(Math.random() * containerHeight);

    el.style.position = "absolute";
    el.style.left = `${randomX}px`;
    el.style.top = `${randomY}px`;

    addAction({
      type: 'GOTO_RandomPosition',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(), 
        message: "X, Y position is " + randomX + " and " + randomY,
        property: {
          left: el.style.left,
          top: el.style.top,
        }
      },
    });
  };

  const handleClick = (event) => {
    if (moveType === "mouse") {
      handleMouseMove(event);
    } else if (moveType === "random") {
      goToRandomPosition();
    }
  };

  return (
    <Paper elevation={3}>
      <div className="text-center bg-blue-700 text-white px-2 py-1 my-2 text-sm cursor-pointer"
       id={comp_id}
       onClick={handleClick}
      >
        <div className="grid grid-rows-2 my-2 items-center">
          <div className="text-white ">Go To</div>
          <div >
          <select
            className="text-black mx-2 p-1"
            value={moveType}
            onChange={(e) => setMoveType(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="random">Random Position</option>
            <option value="mouse">Mouse Pointer</option>
          </select>
          </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(GoToRandomPosition);
