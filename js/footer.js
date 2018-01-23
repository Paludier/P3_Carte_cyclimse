var footerProto = function(){
    this.countdownOn = false;
}

footerProto.prototype.setCountdown = function(){
    var now = Math.floor(Date.now() / 1000);
    var countdown = mapObj.getCookie('cookieExpiration') - now;
    var x = setInterval(function() {
        if (footerObj.countdownOn == true){
            var date = new Date(null);
            date.setSeconds(countdown);
            var result = date.toISOString().substr(14, 5);
            document.getElementById("timer").innerHTML = 'Expire dans ' + result;
            if (countdown < 0) {
                clearInterval(x);
                document.getElementById("timer").innerHTML = "Réservation expirée";
            }
            countdown--;
        } else {
            clearInterval(x);
        }
    }, 1000);
}

footerProto.prototype.init = function(){
    var footer = document.createElement('footer');
    var storedStationH2 = document.createElement('h2');
    var timerP = document.createElement('p');
    footer.className = 'themeBox';
    storedStationH2.id = 'storedStation';
    storedStationH2.textContent = 'Aucun Vélo réservé';
    timerP.id = 'timer';
    footer.appendChild(storedStationH2);
    footer.appendChild(timerP);
    document.getElementById('main').prepend(footer);
}