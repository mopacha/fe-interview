var tree = {
  value: "-",
  left: {
    value: "+",
    left: {
      value: "a",
    },
    right: {
      value: "*",
      left: {
        value: "b",
      },
      right: {
        value: "c",
      },
    },
  },
  right: {
    value: "/",
    left: {
      value: "d",
    },
    right: {
      value: "e",
    },
  },
};


var levelOrderBottom = function(root) {
  var queue = [];
  var result = [];
  if (root !== null) {
    queue.push(root);
  }
  while(queue.length !== 0) {
    var level = [];
    var len = queue.length;
    for (var i = 0; i < len; i ++) {
      var currentNode = queue.shift();
      level.push(currentNode.value);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
    }
    result.push(level);
  }
  return result.reverse();

}

let r = levelOrderBottom(tree)

console.log(r)