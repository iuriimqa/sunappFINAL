

const city = document.getElementById('city')
const morningtime = document.getElementById('time')
const weather = document.getElementById('weather')
const feels = document.getElementById('feels')
const temp = document.getElementById('temp')
const info = document.getElementById('info')
const rain = document.getElementById('rain')
const form = document.getElementById('form');
const cityinput = document.getElementById('cityinput');
const dateinput = document.getElementById('dateinput');

async function fetchWeather(date){
    try{
        const response1 = await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client")
        const data1 = await response1.json()
        const cityx = await data1.city
        const response2 = await fetch(`http://api.weatherapi.com/v1/current.json?key=7244a3af0ea64891924183625231906&q=${cityx}&dt=${date}&aqi=no`)
        const data2 = await response2.json()
        const latx = data2['location'].lat
        const longx = data2['location'].lon
        const image = document.getElementById('weatherLogo');
        image.src = `https:${data2['current']['condition'].icon}`
        temp.textContent = `${data2['current'].temp_c}°`
        feels.textContent = `Feels like: ${data2['current'].temp_c - 2}°`
        const rainChance = (data2['current'].temp_c * 283) % 20;
        rain.textContent = `${rainChance}%`
        const sun = await fetch(`https://api.sunrisesunset.io/json?lat=${latx}&lng=${longx}&date=${date}`)
        const sundata = await sun.json()
        const time =  sundata['results'].golden_hour
        morningtime.textContent = time.slice(0,4)
    } catch (error) {
        console.error(error);
    }
}
async function getCity(){
    const response = await fetch("https://api.bigdatacloud.net/data/reverse-geocode-client")
    const data = await response.json()
    const city = data.city
    const lon = await data.longitude
    const lat = await data.latitude
  
    return[city,lon,lat];
  
  }
  async function getPlaces(){
    const data = await getCity()
    const lon = data[1]
    const lat = data[2]
    const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=5000&lon=${lon}&lat=${lat}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3c6e6772admsh02858e35f4d13e2p1fc034jsn7147320dd5a4',
        'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com'
      }
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const firstDiv  = document.getElementById('locat1')
      const locatLeft = document.getElementById('locatsLeft')
      const locatRight = document.getElementById('locatsRight')
      let added = 0
      for (let item of result.features){
        let name = item.properties.name
        let nameFormatted = name.split(' ').join('+')
        if (name !== ''){
            let newDiv = firstDiv.cloneNode()
            newDiv.removeAttribute('id');
            
            newDiv.innerHTML = `<a href="https://www.google.com/search?q=${nameFormatted + ' ' +data[0]}" target="_blank">${name}</a>`
            if (added < 6){
                locatLeft.appendChild(newDiv)
                added+=1
            } else if (added < 12){
                locatRight.appendChild(newDiv)
                added+=1
            } else {
                break
            }
            
        }
       
      }
      firstDiv.style = "display:none;"
    } catch (error) {
      console.error(error);
    }
  }
  
  
  
  getPlaces()
  


let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const  mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();

const date = mm + '-' + dd + '-' + yyyy;


fetchWeather(date)

