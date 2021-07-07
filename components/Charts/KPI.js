import React from 'react'

import classes from './KPI.module.css';

const KPI = ({bar_data , title}) => {

  let payment = 0, tickets = 0
  if(title === 'Payment' && bar_data){
    bar_data.map(e => {
        payment = payment + parseInt(e)
    })
  }

  if(title === 'Total Tickets' && bar_data){
    bar_data.map(e => {
        tickets++
    })
  }

  var item;
  if(title === 'Most Travel City' && bar_data){
  var m = 0;
  var mf = 1;
  for (var i=0; i<bar_data.length; i++)
  {
        for (var j=i; j<bar_data.length; j++)
        {
                if (bar_data[i] == bar_data[j])
                 m++;
                if (mf<m)
                {
                  mf=m; 
                  item = bar_data[i];
                }
        }
        m=0;
  }
}


  console.log(item);


  return (
    <div className={classes.container}>
        <h3>{title}</h3>
        <span className={classes.value}>{ title === "Payment" ? `$${payment}`  : title === "Total Tickets" ? tickets : item}</span>
    </div>
  )
}

export default KPI
