import React from "react";

const ParameterList = ({ parameters }) => {
  return (
    <div className="row">
      <label className="form-label text-light">Parameters</label>
      {Object.entries(parameters).map(([key, value]) => (
        <div className="col-xl-1">
          <label className="form-label text-light">({key}){value}</label>
        </div>
      ))}
    </div>
  );
};

export default ParameterList;
