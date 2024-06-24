import React from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

const ActionLogDisplay = ({ actionLog }) => {
  
  return (
    // <Paper elevation={3}>
      <div className="text-center rounded p-2 my-3 h-full">
        <h3 className="text-lg font-bold mb-3">Action Log</h3>
        <div className="overflow-y-auto ">
          {actionLog.map((action, index) => (
            <div key={index} className="border p-2 mb-2">
              <p className="text-sm">
                <strong>Action:</strong> {action.type}
              </p>
              <p className="text-sm">
                <strong>Character ID:</strong> {action.payload.characterId}
              </p>
              <p className="text-sm">
                <strong>Chnages Occured:</strong> {action.payload.message}
              </p>
              <p className="text-sm">
                <strong>Timestamp:</strong> {action.payload.timestamp}
              </p>
            </div>
          ))}
        </div>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // actionLog: state.character.actionLog,
    actionLog: state.addAction.actionLog,
  };
};

export default connect(mapStateToProps)(ActionLogDisplay);
