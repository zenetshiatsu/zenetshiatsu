// map-loader.js

function loadGoogleMapsScript() {
  if (typeof GOOGLE_MAPS_API_KEY === "undefined" || !GOOGLE_MAPS_API_KEY) {
    console.error("Clé Google Maps manquante !");
    return;
  }

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

// Fonction globale attendue par Google Maps
window.initMap = function () {
  const geocoder = new google.maps.Geocoder();
  const address = "14 Boulevard Baille, 13006 Marseille, France";

  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: results[0].geometry.location,
      });

      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });
    } else {
      console.error("Erreur de géocodage : " + status);
    }
  });
};

loadGoogleMapsScript();
