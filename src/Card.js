import ChartCard from './ChartCard';

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

const Card = (props) => {


    let num = Number(props.selectedStocks[props.symbol.toLowerCase()].open) - Number(props.selectedStocks[props.symbol.toLowerCase()].lastOpen);
    let profitStock = Math.round((num ) * 100) / 100; 
    let profitStockPercent = Math.abs(Math.round(profitStock/Number(props.selectedStocks[props.symbol.toLowerCase()].open) * 100) / 100);
    let currentStock = props.selectedStocks[props.symbol.toLowerCase()].open;

    let color = (profitStock < 0) ? 'red' : 'green';

    return (
        <div className='card' onClick={(e) => { props.handlePopUpOpen(props.symbol)}}>
            <div className='card-header'>
                <div className='card-title'>
                    <strong>{props.stockName}</strong>
                </div>
            </div>
            <div className='card-content'>
                <div className='card-stats'>
                    <div className='card-intro'>
                        {currentStock}<span className='currency'>$</span>
                        <div className='card-profit' style={{ color: color }}>
                            {profitStock} ({profitStockPercent})%
                    </div>
                    </div>
                    <div className='card-detail'>
                        <div className='card-detail-category'>
                            <span>Last</span>
                            <span>Close</span>
                            <span>High</span>
                            <span>Low</span>
                            <span>Volume</span>
                        </div>
                        <div className='card-detail-val'>
                            <span >{ props.selectedStocks[props.symbol.toLowerCase()].lastOpen }</span>
                            <span >{ props.selectedStocks[props.symbol.toLowerCase()].close }</span>
                            <span >{ props.selectedStocks[props.symbol.toLowerCase()].high }</span>
                            <span >{ props.selectedStocks[props.symbol.toLowerCase()].low }</span>
                            <span >{ nFormatter(props.selectedStocks[props.symbol.toLowerCase()].volume, 2) }</span>
                        </div>
                    </div>
                </div>
                <div className='card-chart'>
                    <ChartCard x={props.selectedStocks[props.symbol.toLowerCase()].x} y={props.selectedStocks[props.symbol.toLowerCase()].yOpen}/>
                </div>
            </div>
        </div >
    );
}

export default Card;