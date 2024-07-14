import React ,{useState} from 'react';
import { connect } from 'react-redux';
import { addAction } from '../redux/addAction/actionH';

const ActionReplay = ({ character,actionLog, addAction }) => {
  
  const [state, setState] = useState({
      action_no:0,
  });

  const handleReplay = () => 
  {
        const action = actionLog[state.action_no];
        const element = document.getElementById(`${character.active}-div`);
        const element1 = document.getElementById(character.active);
        const el1 = document.getElementById(`${character.active}-message-box`);
        const el2 = document.getElementById(`${character.active}-message-box1`);
        console.log(action);
        setTimeout(() => {
          addAction(action);
        }, 1);
        element.style.left = action.payload.property.left ;
        element.style.top = action.payload.property.top;
        element.style.transform = action.payload.property.transform;
        element.style.display = action.payload.property.display;
        element.style.filter = action.payload.property.filter;
        element.style.zIndex = action.payload.property.zIndex;
        el1.style.display = action.payload.property.displayMsg;
        el1.innerHTML = action.payload.property.innerHTML;
        el2.style.display = action.payload.property.display1;
        element1.style.display = action.payload.property.displayCat;
  };
  return (
    <div className="my-3">
      <div
      className={`text-center rounded bg-blue-700 text-white p-2 my-2 text-sm cursor-pointer mx-auto`}
      >
      Enter Action Number (0..N) {" "}
      <input
        type="number"
        className="text-black text-center w-16 mx-2"
        value={state.action_no}
        onChange={(e) => {
            setState({ ...state, action_no: parseInt(e.target.value) });
        }}
      />
        <div
          className="text-center bg-red-600 text-white px-2 py-1 my-2 text-sm cursor-pointer"
          onClick={() => handleReplay()}
        >
          Replay
        </div>
      </div>
    </div>

  );
};

const mapStateToProps = (state) => {
  return {
    // actionLog: state.character.actionLog,
    actionLog:state.addAction.actionLog,
    character: state.character,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addAction: (action) => dispatch(addAction(action)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionReplay);
