// components/ActionReplay.js

import React ,{useState} from 'react';
import { connect } from 'react-redux';
import { addAction } from '../redux/addAction/actionH';
import { styled } from '@material-ui/core';

const ActionReplay = ({ character,actionLog, addAction }) => {
  
  const [state, setState] = useState({
      action_no:0,
  });

  const handleReplay = () => {
        const action = actionLog[state.action_no];
        setTimeout(() => {
          addAction(action); // Dispatch action
        }, 1); // Delay between actions (adjust as needed)
  };

  return (
    <div className="my-3">
      <div
      className={`text-center rounded bg-blue-700 text-white p-2 my-2 text-sm cursor-pointer mx-auto`}
      >
      Replay Action Number {" "}
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
