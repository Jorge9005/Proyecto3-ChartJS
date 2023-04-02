(()=>{
    console.log("Entró a la función anónima");
    const BASE_URL = "https://pokeapi.co/api/v2";
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
        fetch(BASE_URL + "/evolution-chain/1/",
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
        fetch(BASE_URL + "/evolution-chain",
        {
            method: "GET"
        })
        .then(response => response.json())
        .then(response => {
            console.log(response.count);
            let labels_for_chart = response.count.map((item) => {
                return item.nombre.toUpperCase();
            });

            const grafica = new CharacterData(myChart, {
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

            for(const pokemon of response.const){
                let tr = `<tr>
                    <td>${pokemon.id}</td>
                    <td>${pokemon.nombre.toUpperCase()}</td>
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