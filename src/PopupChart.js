import React from 'react';
import { Line } from "react-chartjs-2";

const ChartCard = (props) => {
    let timeStamp = props.x;
    let dataOpen = props.yOpen;
    let dataClose = props.yClose;

    return (
        <div className='popup-chart-in'>
            <Line
                data= {{
                    labels: timeStamp,
                    datasets: [{
                        label: 'Open $',
                        data: dataOpen,
                        borderWidth: 4,
                        backgroundColor: 'rgba(217, 3, 104, 0.2)',
                        fill: true,
                        pointRadius: 2,
                        pointBorderColor: 'rgba(217, 3, 104, 0.4)',
                        borderColor: 'rgba(217, 3, 104, 0.4)' 
                    },
                    {
                        label: 'Close $',
                        data: dataClose,
                        borderWidth: 4,
                        backgroundColor: 'rgba(0, 141, 213, 0.2)',
                        fill: true,
                        pointRadius: 2,
                        pointBorderColor: 'rgba(0, 141, 213, 0.4)',
                        borderColor: 'rgba(0, 141, 213, 0.4 )'
                    }
                ]
                }}
                
                height={460}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    
                }}
                
            />
        </div>
    );
}
 
export default ChartCard;