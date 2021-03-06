mapboxgl.accessToken = maptoken;

var map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/light-v10", // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${campground.title} </h3> <p>${campground.location}</p>`
        )
    )
    .addTo(map);

map.addControl(new mapboxgl.NavigationControl(), "bottom-left");
//"geometry":{"coordinates":[-113.1331,47.0202],"type":"Point"}
