        // http://paulirish.com/2011/requestanimationframe-for-smart-animating
         // shim layer with setTimeout fallback
        
        /** returns appropriate Animation Frame for the browser index.html is executed in, sets time out for the function if no appropriate Animation Frame is found
        */
        window.requestAnimFrame = (function () {

            return window.requestAnimationFrame     ||
                window.webkitRequestAnimationFrame  ||
                window.mozRequestAnimationFrame     ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
            };
        })();