var panelProto = function(){
    // used to store the ID of the station when it is booked by the user, or when mapObj.initMap is called if there is a , 
    this.storedStation = '';
    this.enabled = false;  
    this.array = [];  
}


// Refresh the panel with station data of the corresponding marker ID
panelProto.prototype.panelRefresh = function(markerID){
    this.array = mapObj.array;
    //ajaxGet(url, function (response) {
        //var array = JSON.parse(response);
        for (i = 0; i < this.array.length; i++){
            if (this.array[i].number == markerID){
                if (this.array[i].status == 'OPEN') {
                    var statusTrad = 'Ouvert';
                } else {
                    var statusTrad = 'Fermé';
                }
                if (this.array[i].banking == true) {
                    var bankingTrad = 'Oui';
                } else {
                    var bankingTrad = 'Non';
                }
                if (this.array[i].bonus == true) {
                    var bonusTrad = 'Oui';
                } else {
                    var bonusTrad = 'Non';
                }
                document.getElementById('name').textContent = this.array[i].name;
                document.getElementById('status').textContent = statusTrad;
                if (statusTrad == 'Ouvert'){
                    document.getElementById('status').style.color = '#28a745';
                } else {
                    document.getElementById('status').style.color = '#434857';
                }
                document.getElementById('address').textContent = this.array[i].address;
                document.getElementById('bike_Stands').textContent = this.array[i].bike_stands;
                document.getElementById('available_bike_stands').textContent = this.array[i].available_bike_stands;
                document.getElementById('banking').textContent = bankingTrad;
                document.getElementById('bonus').textContent = bonusTrad;
                var bikes = this.array[i].available_bikes;
                if (mapObj.selectedMarker == panel.storedStation) {
                    bikes--;
                }
                document.getElementById('available_Bikes').textContent = bikes;
                if (this.array[i].available_bikes == 0) {
                    document.getElementById('available_Bikes').style.color = 'red';
                    document.getElementById('panelButton').classList = 'panelButton panelButtonDisabled';
                    panel.enabled = false;
                } else if (this.array[i].available_bikes == 1){
                    document.getElementById('available_Bikes_Title').textContent = 'Vélo disponible : ';
                    document.getElementById('panelButton').classList = 'panelButton panelButtonAvailable';
                    document.getElementById('available_Bikes').style.color = 'white';
                    panel.enabled = true;
                    console.log('allo?');
                } else {
                    document.getElementById('available_Bikes').style.color = 'white';
                    document.getElementById('available_Bikes_Title').textContent = 'Vélos disponibles : ';
                    document.getElementById('panelButton').classList = 'panelButton panelButtonAvailable';
                    panel.enabled = true;
                }
                if (panel.storedStation == this.array[i].number){
                    document.getElementById('panelButton').classList = 'panelButton panelButtonReserved';
                    document.getElementById('panelButton').textContent = 'Annuler'
                    document.getElementById('hintBox').textContent = '';
                } else if (panel.storedStation != ''){
                    document.getElementById('panelButton').classList = 'panelButton panelButtonDisabled';
                    document.getElementById('panelButton').textContent = 'Réserver';
                    document.getElementById('hintBox').textContent = 'Vélo déjà réserver';
                }
            }
        }
    //});
}

// Create a cookie 'storedStation' containing the station ID, and a cookie 'cookieExpiration' containing the timestamp of the cookies's expiration date
// Also calls panel.newStoredStation, subtract one bikr to 'available_Bikes' and refresh the panel button.
panelProto.prototype.storeStation = function(markerID){
    panel.newStoredStation(markerID);
    var date = new Date();
    date.setTime(date.getTime()+(4*5*60*1000));
    var expires = "; expires="+date.toGMTString();
    document.cookie = "storedStation=" + markerID + expires + "; path=/";
    footerObj.setCountdown();
    if (markerID == mapObj.selectedMarker){
        document.getElementById('available_Bikes').textContent = parseInt(document.getElementById('available_Bikes').textContent) - 1;
        document.getElementById('panelButton').classList = 'panelButton panelButtonReserved';
        document.getElementById('panelButton').textContent = 'Annuler';
    }
}

// Refresh the footer when a new bike is booked, and store the booked station ID to panel.storedStation.
panelProto.prototype.newStoredStation = function(storedStation){
    this.array = mapObj.array;
    for (i = 0; i < this.array.length; i++){
        if (this.array[i].number == storedStation){
            this.array[i].available_bikes = this.array[i].available_bikes - 1;
            document.getElementById('storedStation').innerHTML = 'Vélo réservé : ' + this.array[i].name + ' <a id=\'footerButton\' class=\'footerButton\'>=></a>';
        }
    }
    panel.storedStation = storedStation;
}


// Remove storedStation and cookieExpiration cookies, add a bike to 'available_Bikes',refresh the panel button and the footer.
panelProto.prototype.removeStoredStation = function(){
    document.cookie = "storedStation=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "cookieExpiration=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    footerObj.countdownOn = false;
    document.getElementById('timer').innerHTML = '';
    panel.storedStation = '';
    document.getElementById('available_Bikes').textContent = Number(document.getElementById('available_Bikes').textContent) + 1;
    document.getElementById('panelButton').classList = 'panelButton panelButtonAvailable';
    document.getElementById('panelButton').textContent = 'Réserver';
    document.getElementById('storedStation').innerHTML = 'Aucun Vélo réservé';
}
    
    
panelProto.prototype.init = function(){
    var panelDiv = document.createElement('div');
    var nameH2 = document.createElement('h2');
    var statusH3 = document.createElement('h3');
    var addressH3 = document.createElement('h3');
    var p1 = document.createElement('p');
    var available_Bikes_TitleSpan = document.createElement('span');
    var available_BikesSpan = document.createElement('span');
    var bike_StandsSpan = document.createElement('span');
    var p2 = document.createElement('p');
    var available_bike_standsSpan = document.createElement('span');
    var p3 = document.createElement('p');
    var bankingSpan = document.createElement('span');
    var spanMarginSpan = document.createElement('span');
    var bonusSpan = document.createElement('span');
    var panelButtonP = document.createElement('p');
    var hintBoxP = document.createElement('p');
    panelDiv.id = 'panel';
    panelDiv.className = 'themeBox';
    nameH2.id = 'name';
    nameH2.textContent = 'Selectionez une station';
    statusH3.id = 'status';
    addressH3.id = 'address';
    p1.textContent = '/';
    available_Bikes_TitleSpan.id = 'available_Bikes_Title';
    available_Bikes_TitleSpan.textContent = 'Vélos disponibles : ';
    available_BikesSpan.id = 'available_Bikes';
    bike_StandsSpan.id = 'bike_Stands';
    p2.textContent = 'Point(s) d\'attache disponible(s) : ';
    available_bike_standsSpan.id = 'available_bike_stands';
    p3.textContent = 'Terminal de paiement : ';
    bankingSpan.id = 'banking';
    spanMarginSpan.id = 'spanMargin';
    spanMarginSpan.textContent = 'Station bonus : ';
    bonusSpan.id = 'bonus';
    panelButtonP.id = 'panelButton';
    panelButtonP.className = 'panelButton panelButtonDisabled';
    panelButtonP.textContent = 'Réserver';
    hintBoxP.id = 'hintBox';
    hintBoxP.className = 'hintBox';
    p1.prepend(available_BikesSpan);
    p1.prepend(available_Bikes_TitleSpan);
    p1.appendChild(bike_StandsSpan);
    p2.appendChild(available_bike_standsSpan);
    spanMarginSpan.appendChild(bonusSpan);
    p3.appendChild(bankingSpan);
    p3.appendChild(spanMarginSpan);
    panelDiv.appendChild(nameH2);
    panelDiv.appendChild(statusH3);
    panelDiv.appendChild(addressH3);
    panelDiv.appendChild(p1);
    panelDiv.appendChild(p2);
    panelDiv.appendChild(p3);
    panelDiv.appendChild(panelButtonP);
    panelDiv.appendChild(hintBoxP);
    document.getElementById('main').prepend(panelDiv);
}