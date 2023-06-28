import _ from 'lodash';

const makeNewTree = (obj1, obj2) => {
  const obj = {};
  const mergedObj = _.merge(obj, obj1, obj2);

  const children = _.sortBy(Object.entries(mergedObj)).map(([key, value]) => {
    if (!_.has(obj1, key)) {
      return { key, value, status: 'added' };
    }

    if (!_.has(obj2, key)) {
      return { key, value, status: 'deleted' };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, value: makeNewTree(obj1[key], obj2[key]), status: 'nested' };
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
  return children;
};

export default makeNewTree;
