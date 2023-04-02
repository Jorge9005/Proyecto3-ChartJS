(()=>{
    console.log("Entró a la función anónima");
    const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
    const myChart = document.getElementById('myChart').getContext('2d');
    const tblPokemons = document.getElementById('tblPokemons');

    const txtId = document.getElementById('txtId');
    const txtNombre = document.getElementById('txtNombre');

    const btnAgregar = document.getElementById('btnAgregar');
    const btnEditar = document.getElementById('btnEditar');
    const btnEliminar = document.getElementById('btnEliminar');

    btnAgregar.addEventListener("click", ()=>{
        console.log('Entró al botón Agregar');
        console.log(txtNombre.value);

        let nombre = txtNombre.value;
        fetch(BASE_URL + "/pokemon/",
        {
            method: "POST",
            headers: {
                "Content-Type": "aplication/json",
            },
            body: JSON.stringify({
                nombre: nombre
            })
        })
        .then(response => response.json())
        .then(response => {
            document.location.reload(); //Refresca la página para que se actualicen los datos
        })
        .catch(error => console.log(error))
    });

    const loadData = () => {
        fetch(BASE_URL,
        {
            method: "GET"
        })
        .then(response => response.json())
        .then(response => {
            console.log(response.results);
            let labels_for_chart = response.results.map((item) => {
                return item.name.toUpperCase();
            });

            let data_for_chart = response.results.map((item) => {
                fetch (BASE_URL + "1"),
                {
                    method: "GET"
                })
                .then(response => response.json())
                .then(response => {
                    console.log(response.results);
                    let data = response.results.map((item) => {
                        return item.name.toUpperCase();
                    });
                return data;
            });

            const grafica = new Chart(myChart, {
                type: 'bar',
                data: {
                    labels: labels_for_chart,
                    datasets: [{
                        label: 'Pokemons',
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

            tblPokemons.innerHTML = "";

            for(const pokemon of response.results){
                let tr = `<tr>
                    <td>${pokemon.id}</td>
                    <td>${pokemon.name.toUpperCase()}</td>
                    <td>${animal.cantidad}</td>
                    </tr>
                `;
                tblPokemons.innerHTML += tr;
            }
        })
        .catch(error => console.log(error))
    }
    loadData();
})()