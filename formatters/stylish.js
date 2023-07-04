import _ from 'lodash';

const [plus, minus, space, indentSymbol, spaceCount] = ['+ ', '- ', '  ', ' ', 4];

const stringify = (node, depth) => {
  const indentSize = depth * spaceCount;

  if (node.status === 'added') {
    if (!_.isObject(node.value)) {
      return `${indentSymbol.repeat(indentSize - 2)}${plus}${node.key}: ${node.value}`;
    }
    return `${indentSymbol.repeat(depth * spaceCount - 2)}${plus}${node.key}: ${stringify(node.value, depth + 1)}`;
  }

  if (node.status === 'deleted') {
    if (!_.isObject(node.value)) {
      return `${indentSymbol.repeat(indentSize - 2)}${minus}${node.key}: ${node.value}`;
    }
    return `${indentSymbol.repeat(indentSize - 2)}${minus}${node.key}: ${stringify(node.value, depth + 1)}`;
  }

  if (node.status === 'unchanged') {
    if (!_.isObject(node.value)) {
      return `${indentSymbol.repeat(indentSize - 2)}${space}${node.key}: ${node.value}`;
    }
    return `${indentSymbol.repeat(indentSize - 2)}${space}${node.key}: ${stringify(node.value, depth + 1)}`;
  }

  if (node.status === 'changed') {
    let oldValue;
    let newValue;
    if (_.isObject(node.oldValue)) {
      oldValue = `${indentSymbol.repeat(indentSize - 2)}${minus}${node.key}: ${stringify(node.oldValue, depth + 1)}`;
      newValue = `${indentSymbol.repeat(indentSize - 2)}${plus}${node.key}: ${node.newValue}`;
    }

    if (_.isObject(node.newValue)) {
      oldValue = `${indentSymbol.repeat(indentSize - 2)}${minus}${node.key}: ${node.oldValue}`;
      newValue = `${indentSymbol.repeat(indentSize - 2)}${plus}${node.key}: ${stringify(node.newValue, depth + 1)}`;
    }

    if (!_.isObject(node.oldValue) && !_.isObject(node.newValue)) {
      oldValue = `${indentSymbol.repeat(indentSize - 2)}${minus}${node.key}: ${node.oldValue}`;
      newValue = `${indentSymbol.repeat(indentSize - 2)}${plus}${node.key}: ${node.newValue}`;
    }

    return [
      oldValue,
      newValue,
    ].join('\n');
  }

  if (node.status === 'nested') {
    const { children } = node;
    const bracketIndent = indentSymbol.repeat(indentSize);
    const lines = children.map((child) => stringify(child, depth + 1));
    const result = [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
    return `${indentSymbol.repeat(indentSize - 2)}${space}${node.key}: ${result}`;
  }

  const bracketIndent = indentSymbol.repeat(indentSize - spaceCount);
  const keys = Object.keys(node);
  const result = keys.map((key) => {
    if (!_.isObject(node[key])) {
      return `${indentSymbol.repeat(indentSize)}${key}: ${node[key]}`;
    }
    return `${indentSymbol.repeat(indentSize)}${key}: ${stringify(node[key], depth + 1)}`;
  });

  return [
    '{',
    ...result,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (diff) => {
  const result = diff.map((child) => stringify(child, 1));
  return [
    '{',
    ...result,
    '}',
  ].join('\n');
};

export default stylish;
