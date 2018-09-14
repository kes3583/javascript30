// keep things outside the global scope plz
(function (window, document, undefined) {
'use strict';

/**
   * Selectors
   */

  //const audio = document.querySelector(`audio[data-key=${e.keyCode}]`);
  const keyContainer = document.querySelector('.key-container')
  const keys= keyContainer.querySelectorAll('div');
  const audioContainer = document.querySelector('.audio-container')



/**
   * Methods
   */


  //key Events
window.addEventListener('keydown',function(e){
      const keycode = e.which || e.code; // cross-broswer
      const audio = audioContainer.querySelector(`audio[data-key='${keycode}']`);
      const key = keyContainer.querySelector(`div[data-key='${keycode}']`);


    if(!audio) return; // if other keys are down, exits this function.
    //console.log(audio)
    //console.log(key)

    // for (var i = 0; i < keys.length; i++) {
    //     keys[i].classList.remove('active');
    // }
    key.classList.add('active')
    audio.currentTime = 0; // rewind to the start
    audio.play();


  })
//console.log(keys);
//keys.forEach(key => key.addEventListener('transitionend', removeTransition));



/**
   * Events/APIs/init
   */

  //var text_ = new textAnimation(container);



})(window, document);
