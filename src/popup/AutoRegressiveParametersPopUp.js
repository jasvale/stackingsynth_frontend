import React from "react";

const AutoregressiveParameters = ({ handleClosePopup, handleSynthesizeClick }) => {
    return (
        <div class="popup-overlay">
            <div class="card mb-4 col-xl-4">
                <div class="card-header">
                    Auto Regressive (AR) Parameters
                </div>
                <div class="card-body">
                    <div class="col-xl-12 mb-4">
                        <label className="form-label">Phi (AR Coefficient)</label>
                        <input className="form-select form-select-sm" type="number" step="0.1" />
                    </div>
                    <div className="row">
                        <div className="col-xl-2 d-flex">
                            <div className="btn-group">
                                <button onClick={handleClosePopup} className="btn btn-sm btn-primary">Close</button>
                                <button onClick={handleSynthesizeClick} className="btn btn-sm btn-success">Synthesize!</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CSS for Popup */}
                <style>
                    {`.popup-overlay {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100vw;
                            height: 100vh;
                            background: rgba(0, 0, 0, 0.5);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            z-index: 1000;
                        }`}
                </style>
            </div>
        </div>
    );
};

export default AutoregressiveParameters;
