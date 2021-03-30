import React from 'react';
import GenerateCards from "./GenerateCards";
import Popup from './Popup';
import AddStock from './AddStock';
import AddStockPopUp from './AddStockPopUp';


class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "pritesh kulshreshtha",
            userStocks: {
                // 'amzn': {
                //     'symbol': 'AMZN',
                //     'company': 'AMAZON',
                //     'x': []
                // },
                'ibm': {
                    'symbol': 'IBM',
                    'company': 'IBM',
                    'x': []
                },
                'fb': {
                    'symbol': 'FB',
                    'company': 'FACEBOOK',
                    'x': [],
                   
                },
                'aapl': {
                    'symbol': 'AAPL',
                    'company': 'APPLE',
                    'x': []
                    
                }
            },
            triggerPopUp: false,
            popUpStock: null,
            percentProfit: +75.125,
            netProfit: +21043.7545,
            triggerAddStock: false,
            API_KEY: '2TOMCM7HDXXWG8AV'
        }
        this.handlePopUpClose = this.handlePopUpClose.bind(this);
        this.handlePopUpOpen = this.handlePopUpOpen.bind(this);
        this.handleAddStockOpen = this.handleAddStockOpen.bind(this);
        this.handleAddStockClose = this.handleAddStockClose.bind(this);
        this.updateAllStock = this.updateAllStock.bind(this);
        this.updatePerticularStock = this.updatePerticularStock.bind(this);
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    }

    async componentDidMount() {
        //API Call
        this.updateAllStock();
    }

    async updateAllStock() {
        let stockUpdateObj = { ...this.state.userStocks };
        let responses = [];

        for (let symbol in this.state.userStocks) {
            let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol.toUpperCase()}&apikey=${this.state.API_KEY}`;
            const response = await fetch(API_CALL).then(res => res.json())
            if (response["Meta Data"]) {
                responses.push(response);
            }
            else {
                console.log("Max API Limit Reached!");
            }
        }


        responses.map((data) => {

            let symbol = data["Meta Data"]["2. Symbol"];
            let openValues = [];
            let closeValues = [];
            let volValues = [];
            let dateStamp = Object.keys(data["Time Series (Daily)"]);
            for (let date in data["Time Series (Daily)"]) {
                openValues.push(data["Time Series (Daily)"][date]["1. open"])
                closeValues.push(data["Time Series (Daily)"][date]["4. close"])
                volValues.push(data["Time Series (Daily)"][date]["6. volume"])
            }

            let high = openValues.reduce(function (a, b) {
                return Math.max(a, b);
            });

            let low = openValues.reduce(function (a, b) {
                return Math.min(a, b);
            });

            stockUpdateObj[symbol.toLowerCase()] = {
                'symbol': symbol,
                'company': this.state.userStocks[symbol.toLowerCase()].company,
                'x': dateStamp,
                'yOpen': openValues,
                'yClose': closeValues,
                'open': openValues[openValues.length - 1],
                'volValues': volValues,
                'volume': volValues[volValues.length - 1],
                'close': closeValues[closeValues.length - 1],
                'high': high,
                'low': low,
                'lastOpen': openValues[openValues.length - 2]
            };

            return null;
        })

        this.setState({
            userStocks: stockUpdateObj
        })
    }

    async updatePerticularStock(symbolStock) {
        let stockUpdateObj = { ...this.state.userStocks };

        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbolStock.toUpperCase()}&apikey=${this.state.API_KEY}`;
        const response = await fetch(API_CALL).then(res => res.json())
        if (!response["Meta Data"]) {
            console.log("Max API Limit Reached!");
            return null;
        }

        let symbol = symbolStock;
        let openValues = [];
        let closeValues = [];
        let volValues = [];

        let dateStamp = Object.keys(response["Time Series (Daily)"])
        for (let date in response["Time Series (Daily)"]) {
            openValues.push(response["Time Series (Daily)"][date]["1. open"])
            closeValues.push(response["Time Series (Daily)"][date]["4. close"])
            volValues.push(response["Time Series (Daily)"][date]["6. volume"])
        }

        let high = openValues.reduce(function (a, b) {
            return Math.max(a, b);
        });

        let low = openValues.reduce(function (a, b) {
            return Math.min(a, b);
        });

        stockUpdateObj[symbol.toLowerCase()] = {
            'symbol': symbol,
            'company': this.state.userStocks[symbol.toLowerCase()].company,
            'x': dateStamp,
            'yOpen': openValues,
            'yClose': closeValues,
            'open': openValues[openValues.length - 1],
            'volValues': volValues,
            'volume': volValues[volValues.length - 1],
            'close': closeValues[closeValues.length - 1],
            'high': high,
            'low': low,
            'lastOpen': openValues[openValues.length - 2]
        };

        this.setState({
            userStocks: stockUpdateObj
        })

    }

    handlePopUpOpen(value) {
        this.updatePerticularStock(value);
        document.body.style.overflow = "hidden";
        this.setState({
            triggerPopUp: true,
            popUpStock: value
        })
    }

    handlePopUpClose() {
        document.body.style.overflow = "scroll";
        this.setState({
            triggerPopUp: false,
            popUpStock: null
        })
    }

    handleAddStockOpen() {
        document.body.style.overflow = "hidden";
        this.setState({
            triggerAddStock: true
        })
    }

    handleAddStockClose() {
        document.body.style.overflow = "scroll";
        this.setState({
            triggerAddStock: false
        })
    }

    handleSubmitAdd(e) {
        let stockUpdateObj = {...this.state.userStocks};
        let stockSymbol = e.target.parentElement.children[0].value.toLowerCase();
        let companyName = e.target.parentElement.children[1].value.toUpperCase();
        if(stockSymbol.length<=0) return null;

        stockUpdateObj[stockSymbol] = {
            'symbol': stockSymbol,
            'company': companyName
        }
        
        this.setState({
            userStocks: stockUpdateObj
        })

        this.handleAddStockClose();

        this.updatePerticularStock(stockSymbol);

    }

    render() {
        return (
            <div>
                <AddStock handleAddStockOpen={this.handleAddStockOpen} />
                {this.state.triggerAddStock && <AddStockPopUp handlePopUpClose={this.handleAddStockClose} handleSubmitAdd={this.handleSubmitAdd}     />}
                <GenerateCards selectedStocks={this.state.userStocks} handlePopUpOpen={this.handlePopUpOpen} />
                {this.state.triggerPopUp && <Popup selectedStock={this.state.userStocks} symbol={this.state.popUpStock} handlePopUpClose={this.handlePopUpClose} />}
            </div>
        );
    }
}

export default UserProfile;