const loadPhone = async (searchInput, limit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInput}`
    const response = await fetch(url);
    const data = await response.json();
    displayPhones(data.data, limit);

}

const displayPhones = (phones, limit) => {
    const phoneContainer = document.getElementById('phone-container');

    //Clear Search Result with button
    const clearSearchItems = document.getElementById('clear-btn').addEventListener('click', function () {
        phoneContainer.textContent = " ";
        showAll.classList.add('d-none');
    })


    const showAll = document.getElementById('show-all');
    if (limit && phones.length > 10) {
        showAll.classList.remove('d-none');
        phones = phones.slice(0, 10);
    }
    else {
        showAll.classList.add('d-none');
    }

    //Show limited Result 


    // Invalid Result
    const noResult = document.getElementById('no-result');
    if (phones.length === 0) {
        noResult.classList.remove('d-none')
    }
    else {
        noResult.classList.add('d-none')
    }

    //Valid Result
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <button onclick="moreDetails('${phone.slug}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#phoneInfoModal">Info</button>
                </div>
              </div>
        `;
        phoneContainer.appendChild(phoneDiv);

    });

    loader(false);

}
const data = (limit) => {
    loader(true);
    const inputValue = document.getElementById('search-input').value;
    loadPhone(inputValue, limit);
}
//Show limited Data
document.getElementById('search-btn').addEventListener('click', function () {
    data(10);
})


//Show all data
document.getElementById('show-all-btn').addEventListener('click', function () {
    data();
})

//search on keyboard enter button
document.getElementById('search-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        data(10);
    }
});

const spinner = document.getElementById('loader');
const loader = isLoading => {
    if (isLoading) {
        spinner.classList.remove('d-none')
    }
    else {
        spinner.classList.add('d-none')
    }
}

const moreInfo = (allData) => {
    const title = document.getElementById('phoneInfoModalLabel');
    title.innerText = allData.data.name;

    const infoBody = document.getElementById('info-body');
    infoBody.innerHTML=`
    <img src='${allData.data.image}' alt="">
    <p>Release Date: ${allData.data.releaseDate ? allData.data.releaseDate :'No Release Date Found' } </p>
    <p>Storage: ${allData.data.mainFeatures ? allData.data.mainFeatures.storage : 'No Storage Info Found'}</p>
    <p>Display: ${allData.data.mainFeatures ? allData.data.mainFeatures.displaySize :'No Display info  Found'}</p>
    <p>Memory: ${allData.data.mainFeatures ? allData.data.mainFeatures.memory :'No Memory info Found'}</p>
    <p>Chip: ${allData.data.mainFeatures ? allData.data.mainFeatures.chipSet :'No Chip info Found'}</p>

    

     `;
};

const moreDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const allData = await res.json();
    console.log(allData);
    moreInfo(allData);
}

