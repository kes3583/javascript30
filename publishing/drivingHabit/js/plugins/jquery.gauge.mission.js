  var pos=186;
(function($) {
  $.fn.gauge = function(value, options) {
    return this.each(function() {

      var settings = $.extend({
        min: 0,
        max: 100,
        unit: "%",
        color: "lightgreen",
        colorAlpha: 1,
        bgcolor: "#e6e6e6",
        type: "default",
        lineWidth : this.width * 0.13,
        noCounting : true
        
      }, options);

      //canvas initialization
      var ctx = this.getContext("2d");

      var W = this.width;
      var H = this.height;
      var centerW = (W/2);

      var position = 0;
      var new_position = 0;
      var difference = 0;

      var text;
      var animation_loop, redraw_loop;

      // Angle in radians = angle in degrees * PI / 180
      function radians(degrees) {
        return degrees * Math.PI / 180;
      }

      if (settings.type === "default") {
        (function() {
          function update() {
            ctx.clearRect(0, 0, W, H);

            // The gauge will be an arc
            ctx.beginPath();
            ctx.strokeStyle = settings.bgcolor;
            ctx.lineWidth = settings.lineWidth;
            ctx.lineCap = 'round';
            ctx.arc(centerW, H - (centerW - ctx.lineWidth), (centerW) - ctx.lineWidth, radians(135), radians(45), false);            
            ctx.stroke();

            ctx.beginPath();
            ctx.lineCap = 'round';
            ctx.strokeStyle = settings.color;
            ctx.lineWidth = settings.lineWidth;

            if (position > 0) {
              ctx.globalAlpha = settings.colorAlpha;
              ctx.arc(centerW, H - (centerW - ctx.lineWidth), (centerW) - ctx.lineWidth, radians(135), radians(135 + position), false);
              ctx.stroke();
              ctx.globalAlpha = 1;
            }

            // Add the text
            ctx.fillStyle = settings.color;
            var fontArgs = ctx.font.split(' ');
            ctx.font = (W*0.16) + ' ' + fontArgs[fontArgs.length - 1];
            text = value + settings.unit;
            // Center the text, deducting half of text width from position x            
            text_width = ctx.measureText(text).width;
            //ctx.fillText(text, centerW - text_width / 2, H - (centerW - ctx.lineWidth) + 15);
          }

          function draw() {
            // Cancel any animation if a new chart is requested
            if (typeof animation_loop !== undefined) clearInterval(animation_loop);
            
            new_position = Math.round((value / (settings.max - settings.min)) * 270);
            difference = new_position - position;            
            animation_loop = setInterval(animate_to, 100 / difference);
          }

          // Make the chart move to new degrees
          function animate_to() {
            // Clear animation loop if degrees reaches the new_degrees
            if (position == new_position){
              clearInterval(animation_loop); 

              if(settings.noCounting != true){                
                $(ctx.canvas).next().text(settings.noCounting)
              }else{
                if(settings.bgcolor != settings.color){
                  $(ctx.canvas).next().text(value)
                }else{
                  $(ctx.canvas).next().text(0)
                }
              }             
              return;
            }
              

            if (position < new_position)
              position++;
            else
              position--;
            
            if(settings.noCounting != true){
              $(ctx.canvas).next().text(settings.noCounting)
            }else{
              if(settings.bgcolor != settings.color){
                $(ctx.canvas).next().text(parseInt(position / 270 * 100))
              }else{
                $(ctx.canvas).next().text(0)
              }
            }
            //

            update();
          }

          draw();
        })();
      }

      if (settings.type === "halfcircle") {
        (function() {
          function update() {
            ctx.clearRect(0, 0, W, H);
            // The gauge will be an arc
            
            ctx.beginPath();
            ctx.strokeStyle = settings.bgcolor;
            ctx.lineWidth = settings.lineWidth;
            ctx.lineCap = 'round';
            ctx.arc(centerW, H, (centerW) - ctx.lineWidth, radians(183), radians(-3), false);
            
            ctx.stroke();
            
            ctx.beginPath();         
            ctx.strokeStyle = settings.color;
            ctx.lineWidth = settings.lineWidth;
     
            if (position > 0) {
              ctx.arc(centerW, H, (centerW) - ctx.lineWidth, radians(183), radians(pos+ position), false);
              ctx.stroke();
              //console.log(pos)
            }

            // Add the text
            ctx.fillStyle = settings.color;
       
          }

          function draw() {
            // Cancel any animation if a new chart is requested
            if (typeof animation_loop !== undefined) clearInterval(animation_loop);
            new_position = Math.round((value / (settings.max - settings.min)) * 180);
            difference = new_position - position;
            animation_loop = setInterval(animate_to, 100 / difference);
          }

          // Make the chart move to new degrees
          function animate_to() {
              // Clear animation loop if degrees reaches the new_degrees
              if (position == new_position){
                clearInterval(animation_loop); 

                if(settings.noCounting != true){                
                  $(ctx.canvas).next().text(settings.noCounting)
                }else{
                  if(settings.bgcolor != settings.color){
                    $(ctx.canvas).next().text(value);
                  }else{
                	  $(ctx.canvas).next().text(0)
                  }
                }             
                return;
              }
                

              if (position < new_position)
                position++;
              else
                position--;
              
              if(settings.noCounting != true){
                $(ctx.canvas).next().text(settings.noCounting)
              }else{
                if(settings.bgcolor != settings.color){
                  $(ctx.canvas).next().text(parseInt(position /177 * 100))
                }else{
                  $(ctx.canvas).next().text(0)
                }
              }
              //

              update();
            }

          draw();
        })();
      }
    });
  };
})(jQuery);
