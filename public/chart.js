import "https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js";

export default class RaChart {
  constructor(canvasElement, initialRatings = {}) {
    this.ratings = {
      acidity: 5,
      sweetness: 5,
      bitterness: 5,
      body: 5,
      aroma: 5,
      aftertaste: 5
    };

    for (let key in initialRatings) {
      this.ratings[key] = initialRatings[key];
    }

    this.chart = new window.Chart(canvasElement, this.getChartConfig());
  }

  getChartConfig() {
    return {
      type: "radar",
      data: {
        labels: ["Acidity", "Sweetness", "Bitterness", "Body", "Aroma", "Aftertaste"],
        datasets: [{
          data: [
            this.ratings.acidity,
            this.ratings.sweetness,
            this.ratings.bitterness,
            this.ratings.body,
            this.ratings.aroma,
            this.ratings.aftertaste
          ],
          backgroundColor: "rgba(66, 188, 188, 0.2)",
          borderColor: "grey",
          borderWidth: 2,
          pointBackgroundColor: "rgb(77, 205, 205)",
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            suggestedMin: 0,
            suggestedMax: 10,
            ticks: {
              stepSize: 2,
              backdropColor: "transparent"
            },
            grid: {
              color: "black"
            },
            pointLabels: {
              font: {
                size: 1
              }
            }
          }
        },
        plugins: {
          legend: { display: false }
        },
        elements: {
          line: { tension: 0.1 }
        }
      }
    };
  }

  updateRatings(newRatings) {
    for (let key in newRatings) {
      this.ratings[key] = newRatings[key];
    }

    this.chart.data.datasets[0].data = [
      this.ratings.acidity,
      this.ratings.sweetness,
      this.ratings.bitterness,
      this.ratings.body,
      this.ratings.aroma,
      this.ratings.aftertaste
    ];
    this.chart.update();
  }

  kill() {
    this.chart.destroy();
  }
}
