var slideShowProto = function (numberOfSlides) {
    // Keeps track of the slider's position
    this.position = 1;
    // Stores all slides images. Used to know how many they are, and what are their length
    this.numberOfSlides = numberOfSlides;
}

// Create HTML code for the slideshow
slideShowProto.prototype.init = function () {
    var slideShowDiv = document.createElement('div');
    var slideShowShadow = document.createElement('div');
    var leftArrow = document.createElement('img');
    var rightArrow = document.createElement('img');
    var img = [];
    for (i = 0; i < slideShow.numberOfSlides; i++) {
        img[i] = document.createElement('img');
        img[i].className = 'slideShowImg';
        img[i].src = 'img/diapo' + i + '.png';
    }
    slideShowDiv.id = 'slideShow';
    slideShowDiv.className = 'themeBox';
    slideShowShadow.id = 'slideShowShadow';
    slideShowShadow.className = 'slideShowShadow';
    leftArrow.id = 'leftArrow';
    leftArrow.className = 'arrow leftArrow';
    leftArrow.src = 'img/arrowright1.png';
    rightArrow.id = 'rightArrow';
    rightArrow.className = 'arrow rightArrow';
    rightArrow.src = 'img/arrowright1.png';
    slideShowShadow.appendChild(leftArrow);
    slideShowShadow.appendChild(rightArrow);
    slideShowDiv.appendChild(slideShowShadow);
    for (i = 0; i < slideShow.numberOfSlides; i++) {
        slideShowDiv.appendChild(img[i]);
    }
    document.getElementById('main').prepend(slideShowDiv);
}

// Moves slides behind the slideshow
slideShowProto.prototype.goLeft = function () {
    var imgs = document.getElementsByClassName('slideShowImg');
    for (i = 0; i < slideShow.numberOfSlides; i++) {
        var loc = imgs[i].style.left;
        // Slice converts style.left output into usable coordinate
        loc = loc.slice(0, -2);
        loc = (loc - 1196) + 'px';
        imgs[i].style.left = loc;
    }
    slideShow.position++;
}

// Same as above
slideShowProto.prototype.goRight = function () {
    var imgs = document.getElementsByClassName('slideShowImg');
    for (i = 0; i < slideShow.numberOfSlides; i++) {
        var loc = imgs[i].style.left;
        loc = loc.slice(0, -2);
        loc = (parseInt(loc) + 1196) + 'px';
        imgs[i].style.left = loc;
    }
    slideShow.position--;
}

//  When left and right arrow are pressed, this event will call  slideShow.goLeft /  slideShow.goRight
document.addEventListener("keydown", function (e) {
    if (e.keyCode == 39 && slideShow.position >= 1 && slideShow.position <= (slideShow.numberOfSlides - 1)) {
        slideShow.goLeft();
    }
});

document.addEventListener("keydown", function (e) {
    if (e.keyCode == 37 && slideShow.position >= 2 && slideShow.position <= slideShow.numberOfSlides) {
        slideShow.goRight();
    }
});

// Same as above, but when the arrows images on the slideshow are clicked
document.addEventListener('click', function (event) {
    if (event.target.id == 'rightArrow' && slideShow.position >= 1 && slideShow.position <= 3) {
        slideShow.goLeft();
    }
});

document.addEventListener('click', function (event) {
    if (event.target.id == 'leftArrow' && slideShow.position >= 2 && slideShow.position <= 4) {
        slideShow.goRight();
    }
});