const metricKey = "6d91d69ab451239f072d8ce2700db674";

fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  })
  .catch((err) => {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`;
    document.getElementById("author").textContent = `By: Dodi Achmad`;
  });

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} />
            <span>${data.name}</span>
        `;

    document.getElementById("crypto").innerHTML += `
       <p>🎯: ${data.market_data.current_price.usd}</p>
       <p>👆: ${data.market_data.high_24h.usd}</p>
       <p>👇: ${data.market_data.low_24h.usd}</p>
      `;
  })
  .catch((err) => console.error(err));

setInterval(() => {
  const now = new Date();
  const currentTime = now.toLocaleTimeString("en-US", {
    timeStyle: "short",
  });
  document.getElementById("currentTime").textContent = currentTime;
}, 1000);

navigator.geolocation.getCurrentPosition((position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial`
  )
    .then((res) => {
      if (!res.ok) {
        throw "Weather data is not available";
      }
      return res.json();
    })
    .then((data) => {
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      document.getElementById("weather").innerHTML = `
            <img src=${iconUrl}>
            <p class="weather-temp">${Math.round(data.main.temp)}</p>
            <p class="weather-city">${data.name}</p>
        `;
      console.log(data);
    })
    .catch((err) => console.error(err));
});
