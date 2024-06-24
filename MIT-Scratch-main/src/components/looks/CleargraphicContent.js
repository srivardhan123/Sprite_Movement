import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { addAction} from "../../redux/addAction/actionH";

const ClearGraphics = ({ character, comp_id,addAction }) => {
  // To handle clearing graphic contents
  const handleClear = () => {
    const el = document.getElementById(character.active);
    if (el) {
    //     here i didnt do any actions as we dont have graphic content..
    //one more option to remove the sprite..just make innerHTML 0!
    }
    addAction({
      type: 'Clear_Graphic_Content',
      payload: {
        characterId: character.active,
        timestamp: new Date().toISOString(),
        message: "Graphic Content is Cleared",
      },
    });
  };

  return (
    <Paper elevation={3}>
      <div
        id={comp_id}
        className="text-center rounded bg-purple-700 text-white px-2 py-1 my-2 text-sm cursor-pointer mx-auto"
        onClick={() => handleClear()}
      >
        Clear Graphic Contents
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

export default connect(mapStateToProps, mapDispatchToProps)(ClearGraphics);
