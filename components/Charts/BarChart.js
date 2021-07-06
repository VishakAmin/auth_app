import React from 'react';
import { Bar } from 'react-chartjs-2';

const VerticalBar = ({bar_data}) => {


let business = 0, eco = 0;

if(bar_data){
  bar_data.map((row, index) => {
    if (row === "Business"){
      business++;
    }
    else if (row === "Economy"){
      eco++;
    }
    
  })
}


const data = {
  labels: ['Business', 'Economy' ],
  datasets: [
    {
      label: 'Business v/s Economy Tickets',
      data: [business, eco],
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
    ],
  },
};


console.log(bar_data);

return(
  <>
    <Bar data={data} options={options} />
  </>

)
};

export default VerticalBar;