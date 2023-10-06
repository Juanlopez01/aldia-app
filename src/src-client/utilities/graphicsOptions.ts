export const options = {
  animation: {
    animateScale: true,
  },

  plugins: {
    legend: {
        position: 'right' as const,
				labels: {
          color: "#747881",
					fontColor: "#747881"
				},
      },
    datalabels: {
      formatter: (value: any, ctx: any) => {
        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        dataArr.map((data: any) => {
          sum += data;
        });
        let percentage = ((value * 100) / sum).toFixed(2) + "%";
        return percentage;
      },
      color: "#fff",
      onClick: () => {
        console.log("event");
      },
    },
  },
};

export const optionsMobile = {
  animation: {
    animateScale: true,
  },

  plugins: {
    legend: {
        position: 'bottom' as const,
				labels: {
					color: "#747881", // Set the text color to white
					fontColor: "#747881"
				},
      },
    datalabels: {
      formatter: (value: any, ctx: any) => {
        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        dataArr.map((data: any) => {
          sum += data;
        });
        let percentage = ((value * 100) / sum).toFixed(2) + "%";
        return percentage;
      },
      color: "#fff",
      onClick: () => {
        console.log("event");
      },
    },
  },
};
