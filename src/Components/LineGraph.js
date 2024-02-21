import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
import APIService from './APIService';
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);

function LineGraph() {

    const [graphData, setGraphData] = useState({
        labels: ['Total', 'PDF', 'Word', 'Excel', 'Image', 'Handwritten'],
        datasets: [
          {
            label: 'Number of Documents Uploaded',
            backgroundColor: ['#3498db', '#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6'],
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [0, 0, 0, 0, 0, 0],
          },
        ],
      });
    
      useEffect(() => {
        // Fetch document statistics
        APIService.fetchDashboardStats()
          .then((data) => {
            setGraphData((prevData) => ({
              ...prevData,
              datasets: [
                {
                  ...prevData.datasets[0],
                  data: [data.totalDocuments, data.pdfDocuments, data.wordDocuments, data.excelDocuments, data.imageDocuments, data.handwrittenDocuments],
                },
              ],
            }));
          })
          .catch((error) => {
            console.error('Error fetching graph data:', error);
          });
      }, []);


  return (
    <div className='doughgraphComp'>
      <Line
          data={graphData}
          options={{
            scales: {
              x: {
                type: 'category', // Specify the scale type for X-axis
                ticks: {
                    color: '#ebebeb', // Change the color of x-axis labels
                  },
              },
              y: {
                beginAtZero: true,
                ticks: {
                    color: '#ebebeb', // Change the color of x-axis labels
                  },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
    </div>
  )
}

export default LineGraph
