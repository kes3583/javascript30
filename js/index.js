// keep things outside the global scope plz
(function (window, document, undefined) {
'use strict';

/**
   * Selectors
   */
  var container = document.querySelector('.container');

/**
   * Methods
   */

  //load callback
  var textAnimation = function (el) {

    this.el = el;
    console.log(this.el);

  }

/**
   * Events/APIs/init
   */

  var text_ = new textAnimation(container);



})(window, document);
