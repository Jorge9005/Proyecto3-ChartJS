(()=>{
    console.log("Entró a la función anónima");
    const BASE_URL = "https://sample-api-29g5.onrender.com/";
    const myChart = document.getElementById('myChart').getContext('2d');
    const tablaLibros = document.getElementById('tablaLibros');

    const txtNombre = document.getElementById('txtNombre');
    const btnAgregar = document.getElementById('btnAgregar');
    const btnEditar = document.getElementById('btnEditar');
    const btnEliminar = document.getElementById('btnEliminar');

    btnAgregar.addEventListener("click", ()=>{
        console.log('Entró al botón Agregar');
        console.log(txtNombre.value);

        let nombre = txtNombre.value;
        fetch(BASE_URL + "libros",
        {
            method: "POST",
            headers: {
                "Content-Type": "aplication/json",
            },
            body: JSON.stringify({
                nombre: nombre,
                cantidad: cantidad
            })
        })
        .then(response => response.json())
        .then(response => {
            document.location.reload(); //Refresca la página para que se actualicen los datos
        })
        .catch(error => console.log(error))
    });

    const loadData = () => {
        fetch(BASE_URL + "libros",
        {
            method: "GET"
        })
        .then(response => response.json())
        .then(response => {
            console.log(response.data);
            let labels_for_chart = response.data.map((item) => {
                return item.title.toUpperCase();
            });

            let data_for_chart = response.data.map((item) => {
                return item.count;
            });

            const grafica = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels: labels_for_chart,
                    datasets: [{
                        label: 'Libros',
                        data: data_for_chart,
                        fill: true,
                        backgroundColor: '#00008B',
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

            for(const libro of response.results){
                let tr = `<tr>
                    <td>${lirbo.title.toUpperCase()}</td>
                    <td>${animal.count}</td>
                    </tr>
                `;
                tablaLibros.innerHTML += tr;
            }
        })
        .catch(error => console.log(error))
    }
    loadData();
})()