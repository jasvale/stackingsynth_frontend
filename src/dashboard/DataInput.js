const DataInput = ({showParameters, handleDataInputChange, handleParametersClick, handleSynthesizeClick}) => {
    return (
        <>
            {/* Data Input */}
            <div className="col-xl-3">
                <label className="form-label text-light">Data Input</label>
                <select onChange={handleDataInputChange} className="form-select form-select-sm" aria-label="Data Input">
                    <option selected value="AR">Autoregressive (AR)</option>
                    <option value="MA">Moving Average (MA)</option>
                    <option value="ARIMA">ARIMA</option>
                    {/* Add other models here */}
                </select>
            </div>

            {/* Input Options */}
            <div className="col-xl-3 d-flex align-items-end">
                <div className="btn-group">
                    <button onClick={handleParametersClick} className="btn btn-primary btn-sm">{showParameters ? "Close" : "Open"} Parameters</button>
                    <button onClick={handleSynthesizeClick} className="btn btn-sm btn-success">Synthesize!</button>
                </div>
            </div>
        </>
    );
};

export default DataInput;
