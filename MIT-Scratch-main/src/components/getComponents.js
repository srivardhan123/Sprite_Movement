import React from "react";
import Move from "./motion/Move";
import TurnAntiClockwise from "./motion/TurnAntiClockwise";
import TurnClockwise from "./motion/TurnClockwise";
import GotoXY from "./motion/Goto";
import SetX from "./motion/SetX";
import SetY from "./motion/SetY";
import ChangeX from "./motion/ChangeX";
import ChangeY from "./motion/ChangeY";
import PointDirection from "./motion/PointDirection";
import GlidetoRandomPosition from "./motion/GlidetoRandomPosition";
import GlidetoFixedPosition from "./motion/GlidetoFixedPosition";
import SayMessage from "./looks/SayMessage";
import SayMessageWithTimer from "./looks/SayMessageWithTimer";
import Size from "./looks/Size";
import Show from "./looks/Show";
import Hide from "./looks/Hide";
import MoveY from "./motion/MoveY";
import Think from "./looks/Think";
import ThinkWithTimer from "./looks/ThinkWithTimer";
import SetcolorEffect from "./looks/SetcolorEffect";
import LayerEffect from "./looks/LayerEffect";
import Go_forward_by_10layers from "./looks/Go_forward_by_10layers";
import ShowPositions from "./motion/ShowPositions"
import ChangeColorEffect from "./looks/ChangeColorEffect";
import CleargraphicContent from "./looks/CleargraphicContent";
import ChangeSize from "./looks/ChangeSize";
import GoToRandomPosition from "./motion/GoToRandomPosition";
import PointRandomDirection from "./motion/PointRandomDirection";

// fetch components based on different keys
export const getComponent = (key, id) => {
  switch (key) {
    case "MOVE_Y":
      return <MoveY comp_id={id} />;
    case "MOVE":
      return <Move comp_id={id} />;

    case "TURN_CLOCKWISE":
      return <TurnClockwise comp_id={id} />;

    case "TURN_ANTI_CLOCKWISE":
      return <TurnAntiClockwise comp_id={id} />;
    
    case "POINT_DIRECTION":
      return <PointDirection comp_id={id}/>

    case "GOTO_XY":
      return <GotoXY comp_id={id} />;
    

    case "SET_X":
      return <SetX comp_id={id} />

    case "SET_Y":
        return <SetY comp_id={id} />

    case "CHANGE_X":
        return <ChangeX comp_id = {id} />

    case "CHANGE_Y":
        return <ChangeY comp_id ={id} />

    case "GLIDE_RANDOM":
        return <GlidetoRandomPosition comp_id = {id} />

    case "GLIDE_FIXED":
        return <GlidetoFixedPosition comp_id = {id} />
        
    case "SAY_MESSAGE":
      return <SayMessage comp_id={id} />;

    case "SAY_MESSAGE_WITH_TIMER":
      return <SayMessageWithTimer comp_id={id} />;

    case "SIZE":
      return <Size comp_id={id} />;

    case "CHANGE_SIZE":
      return <ChangeSize comp_id = {id} />;

    case "SHOW":
      return <Show comp_id={id} />;

    case "HIDE":
      return <Hide comp_id={id} />;

    case "LAYER":
      return <LayerEffect comp_id = {id}/>

    case "NUMBERLAYER":
      return <Go_forward_by_10layers comp_id ={id} />

    case "THINK":
      return <Think comp_id={id} />;

    case "THINK_TIMER":
      return <ThinkWithTimer comp_id={id} />;
    
    case "SET_COLOR":
      return <SetcolorEffect comp_id={id} />;

    case "CHANGE_COLOR":
      return <ChangeColorEffect comp_id={id} />;

    case "SHOWPOSITION":
      return <ShowPositions comp_id = {id} />;

    case "GRAPHIC":
      return <CleargraphicContent comp_id = {id} />

    case "Go_TO_RANDOM":
      return <GoToRandomPosition comp_id = {id} />

    case "POINT_MOUSE":
      return <PointRandomDirection comp_id = {id} />

    default:
      return React.null;
  }
};
