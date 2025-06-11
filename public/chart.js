/*var xValues = [];
var yValues = [];

generateData("12 * Math.pow(x, 5) * Math.pow(1 - x, 2.5)", 0.3, 1, 0.01);

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      pointRadius: 2,
      borderColor: "rgba(0,0,255,0.8)",
      borderWidth: 2,
      backgroundColor: "rgba(0,0,255,0.1)",
      data: yValues,
      tension: 0.1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "How's the taste?",
        font: { size: 18, weight: 'bold' },
        padding: { top: 10, bottom: 20 }
      },
      annotation: {
        annotations: {
          zone1: {
            type: 'box',
            xMin: 0,
            xMax: 0.55,
            backgroundColor: 'rgba(255, 99, 132, 0.2)'
          },
          zone2: {
            type: 'box',
            xMin: 0.55,
            xMax: 0.79,
            backgroundColor: 'rgba(255, 206, 86, 0.2)'
          },
          zone3: {
            type: 'box',
            xMin: 0.79,
            xMax: 1,
            backgroundColor: 'rgba(75, 192, 192, 0.2)'
          }
        }
      }
    },
    scales: {
      x: { display: false, grid: { display: false } },
      y: { display: false, grid: { display: false } }
    },
    elements: {
      line: {
        borderWidth: 2
      }
    }
  }
});
*/