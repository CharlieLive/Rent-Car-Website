//  Filter Category Car
const showButton = document.querySelectorAll(".show-button");

showButton.forEach((btn) => {
  btn.addEventListener("click", function () {
    this.parentElement.parentElement.classList.toggle("show");
  });
});
// Menu Button

const menuButton = document.querySelector(".menu-toggle");
const navItem = document.querySelector(".nav-item");

function toggleMenu() {
  menuButton.classList.toggle("show");
  navItem.classList.toggle("show");
}

// CALC

function rangeSlider(value) {
  document.getElementById("rangeValue").innerHTML = value;
}

function calculateCost() {
  const range = document.getElementById("range").value;
  const licenseYear = document.getElementById("licenseYear").value;
  const startDate = new Date(document.getElementById("startDate").value);
  const endDate = new Date(document.getElementById("endDate").value);
  const fuelPrice = document.getElementById("fuelPrice").value;
  const carCategory = document.getElementById("carCategory").value;
  const carLocation = document.getElementById("carLocation").value;
  const baseRentalPrice = document.getElementById("baseRentalPrice").value;
  const averageConsumption =
    document.getElementById("averageConsumption").value;
  const availableCars = document.getElementById("availableCars").value;


  const yearsSinceLicense = new Date().getFullYear() - licenseYear;
  const rentalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const costPerKilometer = 0.1; 
  const categoryMultiplier = getCategoryMultiplier(carCategory);
  const locationMultiplier = getLocationMultiplier(carLocation);
  const consumptionMultiplier = 1 + averageConsumption / 100;

  let totalCost =
    range * costPerKilometer * consumptionMultiplier +
    rentalDays * baseRentalPrice * categoryMultiplier * locationMultiplier;

 
  if (yearsSinceLicense < 5) {
    totalCost *= 1.2; 
  }

  if (yearsSinceLicense < 3 && carCategory === "premium") {
    document.getElementById("result").innerHTML =
      "Unfortunately, you cannot rent a Premium category car if you have had a driver's license for less than 3 years.";
    return;
  }

  if (availableCars < 3) {
    totalCost *= 1.15; 
  }


  document.getElementById("result").innerHTML = `
Estimated rental cost: ${totalCost.toFixed(2)} $`;
}

function getCategoryMultiplier(category) {
  switch (category) {
    case "basic":
      return 1;
    case "standard":
      return 1.3;
    case "medium":
      return 1.6;
    case "premium":
      return 2;
    default:
      return 1;
  }
}

function getLocationMultiplier(location) {
  switch (location) {
    case "local":
      return 1;
    case "abroad":
      return 1.5;
    default:
      return 1;
  }
}
