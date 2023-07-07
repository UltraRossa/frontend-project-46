import _ from 'lodash';

const addQuotesToStr = (data) => (_.isString(data) ? `'${data}'` : data);

const iter = (node, path) => {
  const { key: currentKey, status } = node;
  const newPath = [...path, currentKey];

  if (status === 'deleted') {
    const resultedPath = newPath.join('.');
    return `Property '${resultedPath}' was removed`;
  }

  if (status === 'added') {
    const resultedPath = newPath.join('.');
    const addedValue = _.isObject(node.value) ? '[complex value]' : addQuotesToStr(node.value);
    return `Property '${resultedPath}' was added with value: ${addedValue}`;
  }

  if (status === 'changed') {
    const resultedPath = newPath.join('.');
    const oldValue = _.isObject(node.oldValue) ? '[complex value]' : addQuotesToStr(node.oldValue);
    const newValue = _.isObject(node.newValue) ? '[complex value]' : addQuotesToStr(node.newValue);
    return `Property '${resultedPath}' was updated. From ${oldValue} to ${newValue}`;
  }

  if (status === 'unchanged') {
    return [];
  }

  // status === 'nested'
  const { children } = node;
  const formattedChildren = children.flatMap((child) => iter(child, newPath));
  return formattedChildren;
};

const plain = (diff) => {
  const formattedDiff = diff.flatMap((child) => iter(child, [])).join('\n');
  return formattedDiff;
};

export default plain;
