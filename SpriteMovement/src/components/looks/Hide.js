import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const Hide = ({ character, comp_id, addAction }) => {
  // To handle hide component
  const handleDisplay = () => {
    const el = document.getElementById(character.active);
    el.style.display = "none";
    addAction({
      type: 'Hide',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "The sprite is in hide mode...",
        property: {
          displayCat: el.style.display,
        }
      },
    });
  };
  return (
    <Paper elevation={3}>
      <div
        id={comp_id}
        className="text-center rounded bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto"
        onClick={() => handleDisplay()}
      >
        Hide Sprite
      </div>
    </Paper>
  );
};

// mapping state to props
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

export default connect(mapStateToProps, mapDispatchToProps)(Hide);
