export const options = {
    responsive : true,
    maintainAspectRatio: false,
    scales : {
        y : {
            title : {
                display : true,
                text : "Features",
                font : {
                    size : 18
                }
            }
        },
        x : {
            title : {
                display : true,
                text : "Total time spent",
                font : {
                    size : 18
                }
            },
        }
    },
    plugins: {
        tooltip: { enabled: true },
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: "x",
          },
        },
      },
    indexAxis : 'y'
}