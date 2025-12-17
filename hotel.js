function searchHotels() {
  const destination = document.getElementById("destination").value;

  if (destination.trim() === "") {
    alert("Please enter a destination");
  } else {
    alert("Searching hotels in: " + destination);
  }
}

