// activateClusters : true activate googlemap api clusters, false or empty disable them
var mapProto = function (activateClusters) {
    // This variable is used to store the ID of the selected marker to show on the panel
    this.selectedMarker = '';
    // this.array and this.marker are used to store API data for later use
    this.array = []
    this.marker = []
    if (activateClusters != ''){
        this.activateClusters = activateClusters;
    }
}

// Create HTML code for the map
mapProto.prototype.init = function () {
    var mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    document.getElementById('main').prepend(mapDiv);
}

// Zoom at selected marker ID
mapProto.prototype.goToMarker = function (markerID) {
    for (i = 0; i < mapObj.array.length; i++) {
        if (this.array[i].number == markerID) {
            mapObj.map.setCenter(mapObj.array[i].position);
            mapObj.map.setZoom(18);
            panel.panelRefresh(markerID);
        }
    }
}

// Exctracts data from specified key
mapProto.prototype.getStoredData = function (cname) {
    var data = sessionStorage.getItem(cname);
    return data;
}

// Create and center the map at specified coordinates
mapProto.prototype.initMap = function (centerLat, centerLng) {
    mapObj.map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 45.753,
            lng: 4.850
        },
        zoom: 12
    });

}

// if there is a expiration stored key, asks footer to display a timer and what station is booked
mapProto.prototype.refreshFooter = function () {
    var data = this.getStoredData('Expiration');
    if (data != null) {
        var storedStation = this.getStoredData("storedStation");
        footerObj.countdownOn = true;
        panel.newStoredStation(storedStation);
        footerObj.setCountdown();
        if (storedStation == mapObj.selectedMarker) {
            document.getElementById('available_Bikes').textContent = parseInt(document.getElementById('available_Bikes').textContent) - 1;
            document.getElementById('panelButton').classList = 'panelButton panelButtonReserved';
            document.getElementById('panelButton').textContent = 'Annuler';
        }
        panel.storedStation = storedStation;
        mapObj.goToMarker(storedStation);
    }
}

// Displays markers on the map and actuvate clusters if mapObj.activateClusters is set on 'true'
mapProto.prototype.refreshMarkers = function (centerLat, centerLng) {
    var marker = [];
    for (i = 0; i < mapObj.array.length; i++) {
        marker[i] = new google.maps.Marker({
            position: {
                lat: mapObj.array[i].position.lat,
                lng: mapObj.array[i].position.lng
            },
            map: mapObj.map,
            title: 'Station Vélo\'v',
            clickable: true,
            icon: 'img/marker_icon.png',
        });
        marker[i].addListener('click', function (that) {
            for (i = 0; i < mapObj.array.length; i++) {
                if (mapObj.array[i].position.lat == precisionRound(that.latLng.lat(), 6)) {
                    if (mapObj.array[i].position.lng == precisionRound(that.latLng.lng(), 6)) {
                        mapObj.map.setCenter(mapObj.marker[i].getPosition());
                        mapObj.selectedMarker = mapObj.array[i].number;
                        panel.panelRefresh(mapObj.array[i].number);
                    }
                }
            };
        });
    };
    mapObj.marker = marker;
    if (mapObj.activateClusters) {
        var markerCluster = new MarkerClusterer(mapObj.map, mapObj.marker, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
    }
}