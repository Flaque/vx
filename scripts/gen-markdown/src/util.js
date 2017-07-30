
const headers = ["name", "type", "required", "description", "default value"];

/**
 * Given a key and a prop, converts the collection to an array like this:
 * [name, type, requiredOrNot, description, defaultValue]
 */
function getRow(key, prop) {
  const defaultValue = (prop.defaultValue)
    ? prop.defaultValue.value
    : undefined;
  const type = (prop.type)
    ? prop.type.name
    : undefined;
  return [key, type, prop.required, prop.description, defaultValue];
}

function propsToArray(props) {
    let collection = [headers];
    for (const key in props) {
        collection.push(getRow(key, props[key]));
    }
    return collection;
}

module.exports = {
    propsToArray
}
