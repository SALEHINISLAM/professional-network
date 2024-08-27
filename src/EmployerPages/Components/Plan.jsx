import React from "react";
import PropTypes from "prop-types";

const Plan = (props) => {
  return (
    <div>
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Plan.propTypes = {};

export default Plan;
