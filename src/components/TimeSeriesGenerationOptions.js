import AutoregressiveParameters from "../model_parameters/AutoRegressiveParameters"
import Line from "./Line"

const TimeSeriesGenerationOptions = ({ showGenerationOptions, showParameters, handleParametersClick, handleGenerateDataClick}) => {   

    return (
        <>
            {showGenerationOptions && (
                <>
                    <Line />
                    <div className="row mt-3">
                        <h4 className="form-label text-light">Generation Options</h4>
                        {/* Data Input */}
                        <div className="col-xl-3">
                            <label className="form-label text-light">Data Input</label>
                            <select className="form-select form-select-sm" aria-label="Data Input">
                                <option selected value="AR">Autoregressive (AR)</option>
                                <option value="MA">Moving Average (MA)</option>
                                <option value="ARIMA">ARIMA</option>
                                {/* Add other models here */}
                            </select>
                        </div>

                        {/* Input Options */}
                        <div className="col-xl-3 d-flex align-items-end">
                            <div className="btn-group">
                                <button type="button" onClick={handleParametersClick} className="btn btn-primary btn-sm">{showParameters ? "Close" : "Open"} Parameters</button>
                                <button type="button" onClick={handleGenerateDataClick} className="btn btn-sm btn-success">Generate!</button>
                            </div>
                        </div>
                    </div>
                    <Line />
                    {showParameters && (
                        <>
                            <AutoregressiveParameters handleGenerateDataClick={handleGenerateDataClick} />
                            <Line />
                        </>
                    )}
                </>
            )}


        </>
    );
};

export default TimeSeriesGenerationOptions;
