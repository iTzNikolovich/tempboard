let isHumidityShowing = false;
let cardAnimating = false;

function rotateCard(roomId) {
  if (cardAnimating) {
    // avoid multiple animation
    return;
  }

  const card = document.querySelector('.card');
  const temperatureElement = document.getElementById('T1');
  const humidityElement = document.getElementById('H1');

  cardAnimating = true; // avoid animation interruption

  if (isHumidityShowing) {
    // card switch: hum > temp
    card.classList.add('rotate');
    setTimeout(() => {
      temperatureElement.style.display = 'block';
      humidityElement.style.display = 'none';
      isHumidityShowing = false;
      card.classList.remove('rotate');
      cardAnimating = false;
    }, 1000); // = to animation time
  } else {
    // card switch: temp > hum
    card.classList.add('rotate');
    setTimeout(() => {
      temperatureElement.style.display = 'none';
      humidityElement.style.display = 'block';
      isHumidityShowing = true;
      card.classList.remove('rotate');
      cardAnimating = false;
    }, 1000); // = to animation time
  }
}
