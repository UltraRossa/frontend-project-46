import _ from 'lodash';

const makeDiffTree = (obj1, obj2) => {
  const mergedObj = _.merge({}, obj1, obj2);
  const entries = Object.entries(mergedObj);

  const diff = _.sortBy(entries).map(([key, value]) => {
    if (!_.has(obj1, key)) {
      return { key, value, status: 'added' };
    }

    if (!_.has(obj2, key)) {
      return { key, value, status: 'deleted' };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, children: makeDiffTree(obj1[key], obj2[key]), status: 'nested' };
    }

    if (obj1[key] !== obj2[key]) {
      return {
        key,
        oldValue: obj1[key],
        newValue: obj2[key],
        status: 'changed',
      };
    }

    return { key, value, status: 'unchanged' };
  });
  return diff;
};

export default makeDiffTree;
