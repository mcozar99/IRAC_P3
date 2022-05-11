// For drawing the lines
var tiempo = [0]
var bitrate = [0];
var buffer = [0];
var recording = true; // Boolean que dice si recogemos o no valores


var ctx = document.getElementById("statistics");

function newChart(){
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: tiempo,
        datasets: [
              {
                label: 'BitRate',
                data: bitrate,
                borderColor: 'rgb(255, 99, 132)',
                yAxisID: 'y',
                tension: 0.5,
                options:{
                    plugins : {
                          legend: {
                                position: 'top'
                          },
                    }
                }
              },
              {
                label: 'Buffer',
                data: buffer,
                borderColor: 'rgb(54, 162, 235)',
                yAxisID: 'y1',
                tension:0.5,
                options:{
                        plugins : {
                          legend: {
                                position: 'top'
                          },
                    }
                }
              }
        ]
      },
      stacked: false,
      plugins: {
          title: {
            display: true,
            text: 'Stream Statistics'
            }
      },
      options: {
          responsive: false,
          plugins: {
              title: {
                display: true,
                text: 'Stream Statistics'
              }
          },
          scales: {
            y: {
                display: true,
                labelString: 'prueba',
                title: {display:true,
                        text: 'BitRate (    Kbps)'},
                position: 'left',
            },
            y1: {
                display:true,
                title: {display:true,
                        text: 'Buffer Size (seconds)'},
                position: 'right',
            },
            x: {
                title: {
                    display: true,
                    text: 'Time (s)'
                }
            }
          }
      }
    });
 }

var myChart = newChart()

var intervalId = setInterval(function() {
        bitrate.push(parseFloat(document.getElementById("bitrate").innerHTML.replace(/\D/g,'')));
        buffer.push(parseFloat(document.getElementById("buffer").innerHTML.replace(/\D/g,'')) / 1000);
        tiempo.push(tiempo[tiempo.length - 1] + 1);
        myChart.update();
}, 1000);


function stopChart(){
    if(document.getElementById("pause").value == "Pause Graph"){
    recording = false;
    clearInterval(intervalId);
    document.getElementById("pause").value = "Resume";
    }
    else{
    intervalId = setInterval(function() {
        bitrate.push(parseFloat(document.getElementById("bitrate").innerHTML.replace(/\D/g,'')));
        buffer.push(parseFloat(document.getElementById("buffer").innerHTML.replace(/\D/g,'')) / 1000);
        tiempo.push(tiempo[tiempo.length - 1] + 1);
        myChart.update();
    }, 1000);
    recording = true;
    document.getElementById("pause").value = "Pause Graph";
    }
}

function clearChart(){
    console.log('Hola')
    tiempo = [0]
    bitrate = [0];
    buffer = [0];
    myChart.destroy()
    myChart = newChart();
    clearInterval(intervalId);
    document.getElementById("pause").value = "Resume";
}
