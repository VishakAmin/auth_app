import React from 'react';
import { Bar } from 'react-chartjs-2';
import moment  from 'moment';


const HorizontalBarChart = ({bar_data}) => {

  

  const chartDataPoints = [
    { label: 'Jan', value: 0 },
    { label: 'Feb', value: 0 },
    { label: 'Mar', value: 0 },
    { label: 'Apr', value: 0 },
    { label: 'May', value: 0 },
    { label: 'Jun', value: 0 },
    { label: 'Jul', value: 0 },
    { label: 'Aug', value: 0 },
    { label: 'Sep', value: 0 },
    { label: 'Oct', value: 0 },
    { label: 'Nov', value: 0 },
    { label: 'Dec', value: 0 },
  ];

  for (let i =0; i < bar_data.length ; i++){
      const d = Date.parse(bar_data[i])
      const month = parseInt(moment(d).format("M"))
      // console.log((month));
      chartDataPoints[month-1].value += 1
  }

  const months = chartDataPoints.map(data => data.label)
  console.log(months); 
  
  const data = {
    labels: chartDataPoints.map(data => data.label),
    datasets: [
      {
        label: 'Travel per month',
        data: chartDataPoints.map(data => data.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ]
    }
  }

  return (
  <>
    <Bar data={data} options={options} />
  </>
)};


export default HorizontalBarChart;