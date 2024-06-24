import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction } from "../../redux/addAction/actionH";

const Show = ({ character, comp_id, addAction }) => {
  // To handle show component
  const handleDisplay = () => {
    const el = document.getElementById(character.active);
    el.style.display = "inline-block";
    addAction({
      type: 'Show',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "The sprite is in visible mode...",
        property: {
          display: el.style.display,
        }
      },
    });
  };
  return (
    <Paper elevation={3}>
      <div
        id={comp_id}
        className="rounded text-center bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto"
        onClick={() => handleDisplay()}
      >
        Show Sprite
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

export default connect(mapStateToProps, mapDispatchToProps)(Show);
