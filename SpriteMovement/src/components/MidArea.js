import React from "react";
// import { connect } from "react-redux";
// import { addList } from "../redux/midarea/actions";
// import { Droppable, Draggable } from "react-beautiful-dnd";
// import { getComponent } from "./getComponents";
// import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import { yellow } from "@material-ui/core/colors";
import ActionlogDisplay from "./ActionlogDisplay";
import ActionReplay from "./ActionReplay";

function MidArea(){
  return (
    <div className="flex-1 h-full overflow-auto p-3">
    <div className="h-1/9 font-bold mb-5 text-center border border-2 rounded text-white bg-pink-700 p-2 w-auto">
      Mid Area
    </div>
      <ActionReplay/>
      <ActionlogDisplay className="relative overflow" /> 
      {/* Assuming ActionlogDisplay is a component */}
  </div>
  );
}

export default MidArea;