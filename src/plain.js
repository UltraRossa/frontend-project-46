import _ from 'lodash';

const addQuotesToStr = (data) => (_.isString(data) ? `'${data}'` : data);

const iter = (node, path) => {
  let resultedPath;
  const { key: currentKey } = node;
  const newPath = path;
  newPath.push(currentKey);

  if (node.status === 'deleted') {
    resultedPath = newPath.join('.');
    newPath.pop();
    return `Property '${resultedPath}' was removed`;
  }

  if (node.status === 'added') {
    resultedPath = newPath.join('.');
    newPath.pop();
    const addedValue = _.isObject(node.value) ? '[complex value]' : addQuotesToStr(node.value);
    return `Property '${resultedPath}' was added with value: ${addedValue}`;
  }

  if (node.status === 'changed') {
    resultedPath = newPath.join('.');
    newPath.pop();
    const oldValue = _.isObject(node.oldValue) ? '[complex value]' : addQuotesToStr(node.oldValue);
    const newValue = _.isObject(node.newValue) ? '[complex value]' : addQuotesToStr(node.newValue);
    return `Property '${resultedPath}' was updated. From ${oldValue} to ${newValue}`;
  }

  if (node.status === 'unchanged') {
    newPath.pop();
    return [];
  }

  const { children } = node;
  const result = children.flatMap((child) => iter(child, newPath));
  newPath.pop();
  return result;
};

const plain = (diff) => {
  const result = diff.flatMap((child) => iter(child, []));
  return result.join('\n');
};

export default plain;
