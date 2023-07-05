import _ from 'lodash';

const [specSymLength, indentSymbol, spaceCount] = [2, ' ', 4];

const stringifyObject = (object, depth) => {
  const indentSize = depth * spaceCount;
  const bracketIndent = indentSymbol.repeat(indentSize - spaceCount);
  const keys = Object.keys(object);
  const lines = keys.map((key) => {
    if (_.isObject(object[key])) {
      return `${indentSymbol.repeat(indentSize)}${key}: ${stringifyObject(object[key], depth + 1)}`;
    }
    return `${indentSymbol.repeat(indentSize)}${key}: ${object[key]}`;
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const getSpecialSymbol = (node) => {
  const { status } = node;
  switch (status) {
    case 'added':
      return '+ ';
    case 'deleted':
      return '- ';
    case 'unchanged':
      return '  ';
    case 'nested':
      return '  ';
    case 'changed':
      return ['- ', '+ '];
    default:
      throw new Error(`Uncorrect status: '${status}'!`);
  }
};

const getStrFromOldValue = (node, depth, symbol) => {
  const { oldValue, key } = node;
  const indentSize = depth * spaceCount;
  if (_.isObject(oldValue)) {
    return `${indentSymbol.repeat(indentSize - specSymLength)}${symbol}${key}: ${stringifyObject(oldValue, depth + 1)}`;
  }
  return `${indentSymbol.repeat(indentSize - specSymLength)}${symbol}${key}: ${oldValue}`;
};

const getStrFromNewValue = (node, depth, symbol) => {
  const { newValue, key } = node;
  const indentSize = depth * spaceCount;
  if (_.isObject(newValue)) {
    return `${indentSymbol.repeat(indentSize - specSymLength)}${symbol}${key}: ${stringifyObject(newValue, depth + 1)}`;
  }
  return `${indentSymbol.repeat(indentSize - specSymLength)}${symbol}${key}: ${newValue}`;
};

const stringify = (node, depth) => {
  const { key, status } = node;
  const indentSize = depth * spaceCount;
  const specialSymbol = getSpecialSymbol(node);

  if (status === 'added' || status === 'deleted' || status === 'unchanged') {
    if (_.isObject(node.value)) {
      return `${indentSymbol.repeat(depth * spaceCount - 2)}${specialSymbol}${node.key}: ${stringifyObject(node.value, depth + 1)}`;
    }
    return `${indentSymbol.repeat(indentSize - specSymLength)}${specialSymbol}${node.key}: ${node.value}`;
  }

  if (status === 'changed') {
    const [minus, plus] = specialSymbol;
    const oldValue = getStrFromOldValue(node, depth, minus);
    const newValue = getStrFromNewValue(node, depth, plus);
    const lines = [oldValue, newValue].join('\n');
    return lines;
  }

  // node.status === 'nested'
  const { children } = node;
  const bracketIndent = indentSymbol.repeat(indentSize);
  const lines = children.map((child) => stringify(child, depth + 1));
  const result = ['{', ...lines, `${bracketIndent}}`].join('\n');
  return `${indentSymbol.repeat(indentSize - specSymLength)}${specialSymbol}${key}: ${result}`;
};

const stylish = (diff) => {
  const result = diff.map((child) => stringify(child, 1));
  return ['{', ...result, '}'].join('\n');
};

export default stylish;
