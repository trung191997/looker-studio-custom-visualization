const ctx = document.createElement("canvas");
ctx.width = 600;
ctx.height = 400;
document.body.appendChild(ctx);

function roundBarChart(data, context) {
  const rows = data.tables.DEFAULT;
  const categories = rows.map(row => row[0]);
  const values = rows.map(row => row[1]);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categories,
      datasets: [{
        label: 'Rounded Bars',
        data: values,
        backgroundColor: '#4285F4',
        borderRadius: 12,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#333' } },
        y: { beginAtZero: true, ticks: { color: '#333' } }
      }
    }
  });
}

looker.plugins.visualizations.add({
  id: "rounded_bar_chart",
  label: "Rounded Bar Chart",
  create: function (element, config) {
    element.appendChild(ctx);
  },
  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
    ctx.getContext('2d').clearRect(0, 0, ctx.width, ctx.height);
    roundBarChart(data, element);
    doneRendering();
  }
});
