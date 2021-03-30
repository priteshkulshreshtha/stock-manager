import PopupChart from './PopupChart';

function nFormatter(num, digits) {
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

const Popup = (props) => {

    const selectedStockObj = props.selectedStock[props.symbol.toLowerCase()]

    return (

        <div className='outer-popup' >
            <div className='inner-popup' style={{ marginTop: window.innerHeight * 0.10 + window.pageYOffset }}>

                <span className='popup-header'>
                    <span className='popup-title'><strong>{selectedStockObj.company}</strong></span>
                    <button onClick={props.handlePopUpClose}>&#x2715;</button>
                </span>

                <div className='popup-data'>
                    <div className='popup-stat'>

                        <div className='popup-stat-square' >
                            <div className='popup-stat-inner-div'>
                                <div className='popup-stat-value'>
                                    {selectedStockObj.open}
                                </div>
                                <div style={{ fontSize: '1vw', textAlign: 'center', color: '#008DD5' }}>
                                    Open
                                </div>
                            </div>
                        </div>

                        <div className='popup-stat-square'>
                            <div className='popup-stat-inner-div'>
                                <div className='popup-stat-value'>
                                    {selectedStockObj.close}
                                </div>
                                <div style={{ fontSize: '1vw', textAlign: 'center', color: '#008DD5' }}>
                                    Close
                                </div>
                            </div>
                        </div>
                        <div className='popup-stat-square'>
                            <div className='popup-stat-inner-div'>
                                <div className='popup-stat-value'>
                                    {selectedStockObj.high}
                                </div>
                                <div style={{ fontSize: '1vw', textAlign: 'center', color: '#008DD5' }}>
                                    High
                                </div>
                            </div>
                        </div>
                        <div className='popup-stat-square'>
                            <div className='popup-stat-inner-div'>
                                <div className='popup-stat-value'>
                                    {selectedStockObj.low}
                                </div>
                                <div style={{ fontSize: '1vw', textAlign: 'center', color: '#008DD5' }}>
                                    Low
                                </div>
                            </div>
                        </div>
                        <div className='popup-stat-square'>
                            <div className='popup-stat-inner-div'>
                                <div className='popup-stat-value'>
                                    {nFormatter(selectedStockObj.volume, 3)}
                                </div>
                                <div style={{ fontSize: '1vw', textAlign: 'center', color: '#008DD5'}}>
                                    Volume
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='popup-chart'>
                        <PopupChart x={selectedStockObj.x} yOpen={selectedStockObj.yOpen} yClose={selectedStockObj.yClose} yVolume={selectedStockObj.volValues}/>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Popup;