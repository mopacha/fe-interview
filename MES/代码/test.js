var arr = [1, 2, [3, 4, 5, [6, 7, 8], 9], 10, [11, 12]];

const flat = (arr, deep) => {
  let result = [];

  let fn = (arr, deep) => {
    deep--;
    if (deep < 0) {
      return;
    }
    for (i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        fn(arr, deep)
      } else {
        result.push(arr[i]);
      }
    }
  };

  fn(arr, deep);

  return result;
};

const result = flat(arr,3);
console.log(result)
