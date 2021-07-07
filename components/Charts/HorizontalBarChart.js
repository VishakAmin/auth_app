import React from 'react';
import { Bar } from 'react-chartjs-2';


const HorizontalBarChart = ({bar_data}) => {

  console.log(bar_data);


  let o = {}
  if(bar_data){  
      o = bar_data.reduce((s, a) => {

      if(s.hasOwnProperty(a)){
        // console.log("Incre", s[a]+1);
        s[a] = s[a]+1;
      }else{
        s[a] = 1
      }

      
      return s;
   }, {});
   
   console.log(Object.values(o));
   console.log(Object.keys(o));
  }
  // for (let i = 0 ; i < bar_data.length ; i++){

  //   //dict[bar_data[i]] = 1
  //   console.log(bar_data[i]);
  // }



  const data = {
    labels: Object.keys(o),
    datasets: [
      {
        label: '# of Votes',
        data: Object.values(o),
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
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };

  return (
  <>
    <Bar data={data} options={options} />
  </>
)};

export default HorizontalBarChart;