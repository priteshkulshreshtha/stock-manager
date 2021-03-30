import React from 'react';
import { Line } from "react-chartjs-2";

const ChartCard = (props) => {

    return (
        <div className='card-chart-in'>
            <Line
                data= {{
                    labels: props.x,
                    datasets: [{
                        label: 'Share Price $',
                        data: props.y,
                        borderWidth: 2,
                        fill: false,
                        pointRadius: 0.05,
                        pointBorderColor: 'rgba(217, 3, 104, 0.4)',
                        borderColor: 'rgba(217, 3, 104, 0.4)' 
                    }
                ]
                }}
                width={200}
                height={240}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            display: false,
                            
                        }],
                        yAxes: [{
                            display: false
                        }]
                    }
                }}
            />
        </div>
    );
}
 
export default ChartCard;