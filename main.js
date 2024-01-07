const countriesEl = document.querySelector(".countries");
const dropDownBtn = document.querySelector(".dropDown");
const dropDownEl = document.querySelector(".drop");
const regionEls = document.querySelectorAll(".region");
const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");
const searchBox = document.querySelector(".search-box");
const toggle = document.querySelector(".toggle");
const moon = document.querySelector(".moon");
const backEl = document.querySelector(".back");
const countryModal = document.querySelector(".countryModal");

async function getCountry()
{

    const url = await fetch("http://127.0.0.1:5500/data.json");
    const res = await url.json();
    console.log(res);
    res.forEach(element => {
        showCountry(element);
    });
}

function showCountry(data)
{

    const country = document.createElement("div");
    country.classList.add("country");
    country.innerHTML = ` 
        <div class="country-img">
            <img src="${data.flag}" alt="">
        </div>
        <div class="country-info">
            <h5 class="countryName">${data.name}</h5>
            <p><strong>Population</strong>:${data.population}</p>
            <p class="regionName"><strong>Region</strong>:${data.region}</p>
            <p><strong>Capital</strong>:${data.capital}</p>
        </div>`;
    countriesEl.appendChild(country);
    country.addEventListener('click', () => {
        showCountryDetails(data)
    })
}

dropDownBtn.addEventListener("click", ()=>{
    dropDownEl.classList.toggle("showDropDown");
})

regionEls.forEach(element => {
    element.addEventListener("click", ()=>{
        Array.from(regionName).forEach(x => {
            if(x.innerText.includes(element.innerText) || element.innerText == "All"){
                x.parentElement.parentElement.style.display="grid";
            }else{
                x.parentElement.parentElement.style.display="none";
            }
        });
    })
})

searchBox.addEventListener("input", ()=>{
    Array.from(countryName).forEach(x => {
        if(x.innerText.toLowerCase().includes(searchBox.value.toLowerCase())){
            x.parentElement.parentElement.style.display="grid";
        }else{
            x.parentElement.parentElement.style.display="none";
        }
    });
})

toggle.addEventListener("click", ()=>{
    document.body.classList.toggle("dark");
    // moon.classList.toggle("fas")
})

backEl.addEventListener("click", () => {
    countryModal.classList.toggle("show")
})

function showCountryDetails(data) 
{

    countryModal.classList.toggle("show");
    countriesEl.innerHTML = `
        <button class="back">Back</button>

        <div class="modal">
            <div class="leftModal">
                <img src="${data.flag}" alt="">
            </div>
            <div class="rightModal">
                <h1>Albania</h1>
                <div class="modalInfo inner">
                    <div class="innerLeft">
                        <p><strong>Native Name</strong>: ${data.nativeName}</p>
                        <p><strong>Population</strong>: ${data.population}</p>
                        <p><strong>Sub Region</strong>: ${data.subregion}</p>
                        <p><strong>Capital</strong>: ${data.capital}</p>
                    </div>
                    <div class="innerRight inner">
                        <p><strong>Top Level Domain</strong>: ${data.topLevelDomain}</p>
                        <p><strong>Currencies</strong>: ${data.currencies.symbol + ' ' + data.currencies.name}</p>
                        <p><strong>Languages</strong>: Albanian</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
}

getCountry();