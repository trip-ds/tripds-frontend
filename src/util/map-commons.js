const toEok = (value) => (value / 10000).toFixed(2)

const toSecond = (value) => value.toFixed(2)

const toPercent = (value, all) => (value/all)*100

function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              resolve({ lat, lng });
            },
            (error) => {
              reject(error);
            }
          );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }


export {toEok, toSecond, toPercent, getLocation}