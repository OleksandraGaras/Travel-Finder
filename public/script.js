async function searchCountry() {

    const country = document.getElementById("countryInput").value;
    const resultDiv = document.getElementById("result");

    
    resultDiv.innerHTML = `<p>Carregant...</p>`;

    const response = await fetch(
        `https://restcountries.com/v3.1/name/${country}`
    );

    const data = await response.json();

    if (!response.ok) {
        resultDiv.innerHTML = `<p>País no trobat</p>`;
        return;
    }

    const countryData = data[0];

    resultDiv.innerHTML = `
        <h3>${countryData.name.common}</h3>
        <p>Capital: ${countryData.capital}</p>
        <p>Població: ${countryData.population}</p>
        <img src="${countryData.flags.png}" width="100">
        <br><br>
        <button onclick="addFavorite('${countryData.name.common}')">
        Afegir a favorits
        </button>
    `;

}

async function addFavorite(country) {

    await fetch("https://tu-proyecto.up.railway.app/favorites", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ country: country })

    });

    loadFavorites();
}

async function loadFavorites() {

    const response = await fetch("https://tu-proyecto.up.railway.app/favorites");

    const data = await response.json();

    const list = document.getElementById("favorites");

    list.innerHTML = "";

    data.forEach(f => {

        const li = document.createElement("li");

        li.innerHTML = `
        ${f.country}
        <button onclick="deleteFavorite(${f.id})">Eliminar</button>
        `;

        list.appendChild(li);
    });
}

async function deleteFavorite(id) {

    await fetch(`https://tu-proyecto.up.railway.app/favorites/${id}`, {
        method: "DELETE"
    });

    loadFavorites();
}

loadFavorites();