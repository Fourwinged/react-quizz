
/* Helpers
**
** General utility functions, mostly helping with the data formatting and filtering
*/

export function filterData(items) {
    var newItems = [];
    var done = [];
    var itemsLength = items.length;

    for(var i = 0; i < itemsLength; i++) {
        if(
            items[i].NOM_FR.length > 2
            && items[i].NOM_FR.slice(0, 1) !== ' '
            && items[i].DOCUMENTATION.length > 2
            && done.indexOf(items[i].NOM_FR) === -1
        ) {
            done.push(items[i].NOM_FR);
            newItems.push(items[i]);
        }
    }

    return newItems;
}

export function filterCompleted(items, completed) {
    if(!completed) {
        return items;
    }
    var newItems = [];
    var itemsLength = items.length;

    for(var i = 0; i < itemsLength; i++) {
        if(items[i].completed !== true && items[i].NOM_FR !== completed) {
            newItems.push(items[i]);
        }
    }

    return newItems;
}

export function randomize(array, range = 1) {
    var items = [];
    var done = [];
    var max = array.length;

    if(max <= range) {
        return array;
    }

    for(var i = 0; i < range; null) {
        var rand = Math.floor(Math.random() * max);

        if(done.indexOf(rand) === -1) {
            done.push(rand);
            items.push(array[rand]);
            i++;
        }
    }
    if(range === 1) {
        return items[0];
    }
    return items;
}
