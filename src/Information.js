const Information = (props) => {
    let sign = (props.netProfit>0) ? '+ ' : '- ';
    let netProfit = sign + Math.abs(props.netProfit).toFixed(2);
    let percentProfit = sign + Math.abs(props.percentProfit) + " %";
    let color = (props.netProfit<0) ? 'red' : 'green';
    return (
        <div className='info'>
            <div className='info-text'>
                <div className='info-name'>
                    {props.name}
                </div>
                <div className='info-stat' style={{color: color}}>
                    <div>
                        {netProfit}<span className='currency'>USD</span>
                    </div>
                    <div>
                        {percentProfit}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Information;