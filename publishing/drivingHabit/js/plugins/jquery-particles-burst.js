(function($){
    var settings = {
        particle: 'images/settings/howTo/particle'
      , partoffset: 150
      , duration: 1000
      , frequency: 100
    };

    var methods = {
        init : function (options) {
            settings = $.extend(settings, options);
            return this;
        }
      , create_part: function () {
            var imgIndex = Math.floor((Math.random() * 20) + 1);
            var particle = $('<img />').addClass('jquery-particle').addClass("part" + imgIndex);
            particle.attr('src', settings.particle + imgIndex + ".png");
            this.append(particle);
            var distance = Math.floor(Math.random() * settings.partoffset * 2) - settings.partoffset;
            var angle = Math.floor(Math.random() * 360);
            var x = distance * Math.cos(angle);
            var y = distance * Math.sin(angle);
            particle.animate(
                {'top': x + 'px', 'left': y + 'px', 'opacity': 1}
              , {
                   'duration': Math.floor(Math.random() * 1000) + settings.duration
                 , 'complete': function () {
                       $(this).animate(
                           /*{'opacity': 0}
                         ,*/ {'complete': function () {
                               $(this).remove();
                           }}
                       )
                   }
                }
            );
            return this;
        }
      , burst_part: function (i) {
          if (i > 0) {
              var emiter = this;
              methods['create_part'].apply(emiter);
              setTimeout(function () {
                  methods['burst_part'].apply(emiter, [--i])
              }, Math.floor(Math.random() * settings.frequency));
          }
          return this;
        }
    };

    $.fn.pburst = function (method) { 
        if (methods[method]) {
            return methods[method].apply( this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.particles.burst');
        }    
    };

})(jQuery);

function shuffleRandom(n){
        var ar = new Array();
        var temp;
        var rnum;
       
        //전달받은 매개변수 n만큼 배열 생성 ( 1~n )
        for(var i=1; i<=n; i++){
            ar.push(i);
        }
 
        //값을 서로 섞기
        for(var i=0; i< ar.length ; i++)
        {
            rnum = Math.floor(Math.random() *n); //난수발생
            temp = ar[i];
            ar[i] = ar[rnum];
            ar[rnum] = temp;
        }
 
        return ar;
}