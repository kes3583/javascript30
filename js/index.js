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


    const removeTransition = function (e) {
        //console.log(e.propertyName) // check all the transition effects
        if(e.propertyName !== 'transform') return; // skip it if it's not a transform, if there is transfrom effect, run the code below. 
        //console.log(this)
        //console.log(e.propertyName)
        this.classList.remove('active');
    }
    const keySounds = function (e){
          const keycode = e.which || e.code; // cross-broswer
          const audio = audioContainer.querySelector(`audio[data-key='${keycode}']`);
          const key = keyContainer.querySelector(`div[data-key='${keycode}']`);

        if(!audio) return; // if other keys are down, exits this function.

        // for (var i = 0; i < keys.length; i++) {
        //     keys[i].classList.remove('active');
        // } //remove active class before keydown


        audio.currentTime = 0; // rewind to the start
        audio.play();
        key.classList.add('active')


      }
      //key Events




/**
   * Events/APIs/init
   */


   window.addEventListener('keydown', keySounds)
   //console.log(keys);
   //keys.forEach(el => el.addEventListener('transitionend', removeTransition));
   keys.forEach(function(el){
       el.addEventListener('transitionend', removeTransition)
   });


})(window, document);
