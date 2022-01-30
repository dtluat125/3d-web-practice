import React from "react";
import "./index.scss";

function BlackBoardForm(props) {
  const { onPasswordChange, password, onSubmit } = props;
  return (
    <div class="blackboard">
      <div className="form-label">Enter the secret key to get access</div>
      <div class="form">
        <p>
          <label>Secret key: </label>
          <input value={password} onChange={onPasswordChange} type="password" />
        </p>
        <p class="wipeout">
          <div
            role="button"
            onClick={() => onSubmit()}
            className="submit-button"
          >
            Send
          </div>
        </p>
      </div>
    </div>
  );
}

export default BlackBoardForm;
