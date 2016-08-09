'use strict';

/**
 * Adds `addEventListener` to `NodeList` objects. This methods adds event handlers to all
 * `Node` childs of the `NodeList` object.
 * @param  {string}   eventName     String representing the name of the event
 * @param  {function} handler       Handler which is invoked if the event is triggered
 * @param  {boolean}  useCapture    Boolean that specifies whether the event should be executed in the capturing or in the bubbling phase
 */
if (!NodeList.prototype.addEventListener) {
    NodeList.prototype.addEventListener = function (eventName, handler, useCapture = false) {
        Array.from(this).forEach((element) => {
            element.addEventListener(eventName, handler, useCapture);
        });
    };
}

/**
 * Adds `removeEventListener` to `NodeList` objects. This methods removes event handlers to all
 * `Node` childs of the `NodeList` object.
 * @param  {string}   eventName     String representing the name of the event
 * @param  {function} handler       Handler which is invoked if the event is triggered
 * @param  {boolean}  useCapture    Boolean that specifies whether the event should be executed in the capturing or in the bubbling phase
 */
 if (!NodeList.prototype.removeEventListener) {
    NodeList.prototype.removeEventListener = function (eventName, handler, useCapture = false) {
        Array.from(this).forEach((element) => {
            element.removeEventListener(eventName, handler, useCapture);
        });
    };
}

/**
 * Adds a shortcut to the `Node`, `NodeList` and `window` object for the `addEventListener` function
 * @param  {string}   eventName     String representing the name of the event
 * @param  {function} handler       Handler which is invoked if the event is triggered
 * @param  {boolean}  useCapture    Boolean that specifies whether the event should be executed in the capturing or in the bubbling phase
 */
if (!NodeList.prototype.on) {
    NodeList.prototype.on = Node.prototype.on = window.on = function (eventName, handler, useCapture = false) {
        this.addEventListener(eventName, handler, useCapture);
        return () => this.off(eventName, handler, useCapture);
    };
}

/**
 * Adds a shortcut to the `Node`, `NodeList` and `window` object for the `removeEventListener` function
 * @param  {string}   eventName     String representing the name of the event
 * @param  {function} handler       Handler which is invoked if the event is triggered
 * @param  {boolean}  useCapture    Boolean that specifies whether the event should be executed in the capturing or in the bubbling phase
 */
 if (!NodeList.prototype.off) {
     NodeList.prototype.off = Node.prototype.off = window.off = function (eventName, handler) {
         this.removeEventListener(eventName, handler);
     };
 }

/**
 * Adds a shortcut to the `Node`, `NodeList` and `window` object for listening only once to an event
 * @param  {string}   eventName     String representing the name of the event
 * @param  {function} handler       Handler which is invoked if the event is triggered
 * @param  {boolean}  useCapture    Boolean that specifies whether the event should be executed in the capturing or in the bubbling phase
 */
if (!NodeList.prototype.once) {
    NodeList.prototype.once = Node.prototype.once = window.once = function(eventName, handler, useCapture = false) {
        const localHandler = () => {
            this.off(eventName, localHandler, useCapture);
            handler();
        };

        this.on(eventName, localHandler, useCapture);
    }
}
