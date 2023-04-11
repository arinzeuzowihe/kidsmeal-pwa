export function groupBy(array: Array<any>, property: string) {
    return array.reduce((groupings, object) => {
        const key = object[property];
        if (!groupings[key]) {
            groupings[key] = [];
        }
        //Add object to list of given key's value
        groupings[key].push(object);
        return groupings;
    }, {});
}