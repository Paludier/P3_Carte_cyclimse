var headerProto = function(){}

headerProto.prototype.init = function(){
    var header = document.createElement('header');
    var h2 = document.createElement('h2');
    header.className = 'themeBox';
    h2.textContent = 'Carte des Vélo\'v de Lyon';
    header.appendChild(h2)
    document.getElementById('main').prepend(header);
}