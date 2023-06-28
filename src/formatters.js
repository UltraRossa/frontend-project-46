import _ from 'lodash';

const isPlain = (node) => node.type === 'plain';

const stylish = (diff) => {
  const iter = (node, depth) => {
    if (!_.isObject(node)) {

    }
  };

  return iter(diff, 1);
};

export default stylish;
