
cardUtils = {

    shuffle: function(array) {
        for (var i = array.length-1; i>0; --i) {
            var swap = Math.floor(Math.random() * (i+1));
            var temp = array[swap];
            array[swap] = array[i];
            array[i] = temp;
        }

        return array;
    }
};