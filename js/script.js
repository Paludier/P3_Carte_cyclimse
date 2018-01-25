var footerObj = new footerProto();
footerObj.init();

var panel = new panelProto();
panel.init();

var mapObj = new mapProto(true);
mapObj.init();

var diapo = new diapoProto(4);
diapo.init();

var header = new headerProto(true);
header.init();



document.addEventListener("keydown", function (e) {
    if (e.keyCode == 39 && diapo.position >= 1 && diapo.position <= 3) {
        diapo.goLeft();
    }
});

document.addEventListener("keydown", function (e) {
    if (e.keyCode == 37 && diapo.position >= 2 && diapo.position <= 4) {
        diapo.goRight();
    }
});

document.addEventListener('click', function (event) {
    if (event.target.id == 'rightArrow' && diapo.position >= 1 && diapo.position <= 3) {
        diapo.goLeft();
    }
});

document.addEventListener('click', function (event) {
    if (event.target.id == 'leftArrow' && diapo.position >= 2 && diapo.position <= 4) {
        diapo.goRight();
    }
});




function getStationLocations(callback) {
    ajaxGet('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=' + APIKey , function (response) {
        mapObj.array = JSON.parse(response);
        callback();
    });

}

function initMap() {
    mapObj.initMap(45.753, 4.850);
    getStationLocations(refresh);
}

function refresh() {
    mapObj.refreshMarkers();
    mapObj.refreshFooter();
}

document.addEventListener('click', function (event) {
    if (event.target.id == 'footerButton') {
        mapObj.goToMarker(panel.storedStation);
    }
});



document.addEventListener('click', function (event) {
    if (event.target.id == 'panelButton' && panel.enabled && document.getElementById('panelButton').classList == 'panelButton panelButtonAvailable') {
        footerObj.countdownOn = true;
        panel.storeStation(mapObj.selectedMarker);
        var expiration = parseInt(Math.floor(Date.now() / 1000)) + 1200;
        var date = new Date();
        date.setTime(date.getTime() + (4 * 5 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = "cookieExpiration=" + expiration + expires + "; path=/";
        footerObj.setCountdown();
    } else if (event.target.id == 'panelButton' && document.getElementById('panelButton').classList == 'panelButton panelButtonReserved') {
        panel.removeStoredStation();
    }
});

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

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}



var test = [];
var marker = [];
var map;
var array = [];



document.getElementById('main').style.height = window.innerHeight - 10000 + 'px';
