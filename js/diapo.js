var diapoProto = function(sliders){
    // Keeps track of the slider's position
    this.position = 1;
    this.sliders = sliders;
}

diapoProto.prototype.init = function(){
    var diaporama = document.createElement('div');
    var diapoShadow = document.createElement('div');
    var leftArrow = document.createElement('img');
    var rightArrow = document.createElement('img');
    var img = [];
    for(i=0;i<diapo.sliders;i++){
        img[i] = document.createElement('img');
        img[i].className = 'diapoImg';
        img[i].src = 'img/diapo' + i + '.png';
    }
    diaporama.id = 'diaporama';
    diaporama.className = 'themeBox';
    diapoShadow.id = 'diapoShadow';
    diapoShadow.className = 'diapoShadow';
    leftArrow.id = 'leftArrow';
    leftArrow.className = 'arrow leftArrow';
    leftArrow.src = 'img/arrowright1.png';
    rightArrow.id = 'rightArrow';
    rightArrow.className = 'arrow rightArrow';
    rightArrow.src = 'img/arrowright1.png';
    diapoShadow.appendChild(leftArrow);
    diapoShadow.appendChild(rightArrow);
    diaporama.appendChild(diapoShadow);
    for(i=0;i<diapo.sliders;i++){
        diaporama.appendChild(img[i]);
    }
    document.getElementById('main').prepend(diaporama);
}

diapoProto.prototype.goLeft = function(){
    var imgs = document.getElementsByClassName('diapoImg');
    for (i = 0; i < imgs.length; i++){
        var loc = imgs[i].style.left;
        loc = loc.slice(0, -2);
        loc = (loc - 1196) + 'px'; 
        imgs[i].style.left = loc;
    }
    diapo.position++;
}

diapoProto.prototype.goRight = function(){
    var imgs = document.getElementsByClassName('diapoImg');
    for (i = 0; i < imgs.length; i++){
        var loc = imgs[i].style.left;
        loc = loc.slice(0, -2);
        loc = (parseInt(loc) + 1196) + 'px'; 
        imgs[i].style.left = loc;
    }
    diapo.position--;
}



