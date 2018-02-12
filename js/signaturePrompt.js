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
        var box = document.getElementById('signaturePrompt');
      var mouseX = e.pageX - (box.offsetLeft + 20);
      var mouseY = e.pageY - (box.offsetTop + 32);
    console.log('e.pageX = ' + e.pageX + ', box.offsetLeft = ' + (box.offsetLeft + 20) + ', mouseX = ' + mouseX);
    console.log('e.pageY = ' + e.pageY + ', box.offsetTop = ' + (box.offsetTop + 32) + ', mouseY = ' + mouseX);
    console.log(' ');
      paint = true;
      addClick(e.pageX - (box.offsetLeft + 20), e.pageY - (box.offsetTop + 32));
      redraw();
    });

    $('#canvas').mousemove(function(e){
      if(paint){
          var box = document.getElementById('signaturePrompt');
        addClick(e.pageX - (box.offsetLeft + 20), e.pageY - (box.offsetTop + 32), true);
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
      clickX.push(x);
      clickY.push(y);
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