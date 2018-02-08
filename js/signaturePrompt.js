var signProto = function () {}

// Create HTML code for the signaturePrompt
signProto.prototype.init = function () {
    var signaturePrompt = document.createElement('div');
    signaturePrompt.id = 'signaturePrompt';
    signaturePrompt.className = 'themeBox signaturePrompt';
    var signTitle = document.createElement('h3');
    signTitle.id = 'signTitle';
    signTitle.classList = 'signTitle';
    signTitle.textContent = 'Votre signature :';
    var canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.style = 'touch-action: none;';
    canvas.width = '460';
    canvas.height = '175';
    var signPromptButton = document.createElement('p');
    signPromptButton.id = 'signPromptButton';
    signPromptButton.classList = 'panelButton signPromptButton'
    signPromptButton.textContent = 'Ok';
    signaturePrompt.appendChild(signTitle);
    signaturePrompt.appendChild(canvas);
    signaturePrompt.appendChild(signPromptButton);
    document.getElementById('main').append(signaturePrompt);
    
    var context = canvas.getContext('2d');

    $('#canvas').mousedown(function(e){
      var mouseX = e.pageX - this.offsetLeft;
      var mouseY = e.pageY - this.offsetTop;

      paint = true;
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
      redraw();
    });

    $('#canvas').mousemove(function(e){
      if(paint){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
      }
    });

    $('#canvas').mouseup(function(e){
      paint = false;
    });

    $('#canvas').mouseleave(function(e){
      paint = false;
    });

    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

    function addClick(x, y, dragging)
    {
      clickX.push(x-590);
      clickY.push(y-342);
      clickDrag.push(dragging);
    }

    function redraw(){
      context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

      context.strokeStyle = "#000000";
      context.lineJoin = "round";
      context.lineWidth = 5;

      for(var i=0; i < clickX.length; i++) {
        context.beginPath();
        if(clickDrag[i] && i){
          context.moveTo(clickX[i-1], clickY[i-1]);
         }else{
           context.moveTo(clickX[i]-1, clickY[i]);
         }
         context.lineTo(clickX[i], clickY[i]);
         context.closePath();
         context.stroke();
      }
    }
}

signProto.prototype.deletePrompt = function () {
    document.getElementById('signaturePrompt').remove();
}