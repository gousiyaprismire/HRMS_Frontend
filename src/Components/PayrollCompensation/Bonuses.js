import React from "react";

const Bonuses = ({ goBack }) => {
  return (
    <div>
      <h2>Bonuses & Incentives</h2>
      <p>Manage employee bonuses and incentives here.</p>
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default Bonuses;

