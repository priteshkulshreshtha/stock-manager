import Card from './Card';


const GenerateCards = (props) => {
    let symbols = [];
    for(let symbol in props.selectedStocks){
        symbols.push(props.selectedStocks[symbol].symbol);
    }

    return (
        <div className="stock-cards">
            {symbols.map((value, index) => {
                return (
                    <Card key={value} symbol={value} selectedStocks={props.selectedStocks}
                    stockName={props.selectedStocks[value.toLowerCase()].company}
                    handlePopUpOpen={props.handlePopUpOpen} />
                );
            })}
        </div>
    );
}


export default GenerateCards;