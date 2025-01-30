import React from "react";

const AutoregressiveParameters = ({arParameters, setArParameters, handleSynthesizeClick,}) => {

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setArParameters((prev) => ({
            ...prev,
            [name]: parseFloat(value), // Ensure numeric values are properly set
        }));
    };

    return (
        <div className="row mt-3">
            <h4 className="form-label text-light">Data Input Parameters</h4>

            <div className="col-xl-2 mb-4">
                <label className="form-label text-light">Phi (AR Coefficient)</label>
                <input
                    className="form-control"
                    type="number"
                    name="phi" 
                    value={arParameters.phi}
                    step="0.1"
                    min="0" 
                    max="1"
                    onChange={handleInputChange}
                />
            </div>

            <div className="col-xl-2 mb-4">
                <label className="form-label text-light">Sigma (Standard Deviation)</label>
                <input
                    className="form-control"
                    type="number"
                    name="sigma"
                    value={arParameters.sigma}
                    step="0.1"
                    min="0" 
                    max="1"
                    onChange={handleInputChange}
                />
            </div>
            
            <div className="col-xl-2 mb-4">
                <label className="form-label text-light">n (Number of Points)</label>
                <input
                    className="form-control"
                    type="number"
                    name="n" 
                    value={arParameters.n}
                    step="500"
                    min="0" 
                    onChange={handleInputChange}
                />
            </div>

            <div className="row">
                <div className="col-xl-2 d-flex">
                    <div className="btn-group">
                        <button onClick={handleSynthesizeClick} className="btn btn-sm btn-success">Synthesize!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutoregressiveParameters;
