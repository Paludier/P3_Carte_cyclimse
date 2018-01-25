var test = [];
var marker = [];
var map;
var array = [];

var footerObj = new footerProto();
footerObj.init();

var panel = new panelProto();
panel.init();

var mapObj = new mapProto(true);
mapObj.init();

var slideShow = new slideShowProto(4);
slideShow.init();

var header = new headerProto(true);
header.init();

// Ajax request function
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

// Gets velo'v data from api.jcdecaux.com and store them into mapObj.array
function getStationLocations(callback) {
    ajaxGet('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=' + APIKey, function (response) {
        mapObj.array = JSON.parse(response);
        callback();
    });

}

// Initialize the map, calls getStationLocations to get velo'v data, then calls mapObj.refreshMarkers to refresh 
// markers on the map and mapObj.refreshFooter to refresh the footer if a bike has been booked. This function is called from index.html
function initMap() {
    mapObj.initMap(45.753, 4.850);
    getStationLocations(refresh);
}

function refresh() {
    mapObj.refreshMarkers();
    mapObj.refreshFooter();
}

// Simply rounds a number to a specified number of digits.
function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}
