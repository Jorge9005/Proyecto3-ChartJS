
// funcion anonima y arrow function
(() => {
    console.log("Soy la función anónima");
    const BASE_URL = "https://sample-api-29g5.onrender.com/libros";
    const myChart = document.getElementById('myChart').getContext('2d');
    const tablaLibros = document.getElementById('tablaLibros');


    const loadData = () => {
        axios.get(BASE_URL)
        .then(response => {
            console.log(response.data.data)
            let dataReady = response.data.data;
            let labels_for_chart = dataReady.map((item) => {
                return item.title.toUpperCase();
            });
            let data_for_chart = dataReady.map((item) => {
                return item.count;
            });
            const grafica = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels: labels_for_chart,
                    datasets: [{
                        label: 'Animales del zoologico',
                        data: data_for_chart,
                        fill: true,
                        backgroundColor: '#000000',
                        borderColor: '#00008B'
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            tablaLibros.innerHTML = "";
            for (const animal of dataReady) {
                let tr = `<tr>
                    <td>${animal.title.toUpperCase()}</td>
                    <td>${animal.count}</td>
                </tr>
                `;
                tablaLibros.innerHTML += tr;
            }

        })
            .catch(function (error) {
                console.log("Error de axios");
                console.log(error);
            })
            .finally(function () {
                console.log("Finally de axios");
            });

    }

    loadData();
})()
