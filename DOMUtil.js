
DOMUtils = {
    addTransform: function(element, transformString) {
        element.style.webkitTransform = transformString;
        element.style.MozTransform = transformString;
        element.style.msTransform = transformString;
        element.style.OTransform = transformString;
        element.style.transform = transformString;
    }
}
