// Write an insert and delete functions which accepts a value...

const createNode = (data, left = null, right = null) => {
  return {
    data: data,
    left: left,
    right: right,
  };
};

const tree = (arr) => {
  const sortedArr = mergeSort(removeDuplicates(arr));
  root = buildTree(sortedArr);
  const insert = (val, root = this.root) => {
    if (root == null) {
      root = createNode(val);
      return root;
    }

    if (val < root.data) {
      root.left = insert(val, root.left);
    } else {
      root.right = insert(val, root.right);
    }
    return root;
  };

  return { root, insert };
};

const buildTree = (sortedArr, start = 0, end = sortedArr.length - 1) => {
  if (start > end) return null;

  let mid = Math.floor((start + end) / 2);

  let root = sortedArr[mid];
  let node = createNode(root);

  node.left = buildTree(sortedArr, start, mid - 1);
  node.right = buildTree(sortedArr, mid + 1, end);
  return node;
};

const removeDuplicates = (arr) => {
  const arrNoDups = [];
  Array.from(arr).forEach((i) => {
    if (!arrNoDups.includes(i)) {
      arrNoDups.push(i);
    }
  });
  return arrNoDups;
};

// merge sort function
const mergeSort = (arr) => {
  if (arr.length < 2) return arr;

  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);
  return merge(mergeSort(leftArr), mergeSort(rightArr));
};

const merge = (leftArr, rightArr) => {
  const sortedArr = [];
  let countL = 0;
  let countR = 0;
  while (countL < leftArr.length && countR < rightArr.length) {
    if (leftArr[countL] < rightArr[countR]) {
      sortedArr.push(leftArr[countL]);
      countL++;
    } else {
      sortedArr.push(rightArr[countR]);
      countR++;
    }
  }

  while (countL < leftArr.length) {
    sortedArr.push(leftArr[countL]);
    countL++;
  }

  while (countR < rightArr.length) {
    sortedArr.push(rightArr[countR]);
    countR++;
  }
  return sortedArr;
};

// Console log tree visual
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

const newTree = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(newTree);
console.log(newTree.insert(0));
console.log(newTree);
prettyPrint(newTree);

// pseudocode for Binary Search Tree
// const createBST(arr, start, end) {
//   if (start > end) return null;
//   let mid = (start + end) / 2;
//   root = new Node(array[mid]);

//   root.left(createBST(arr, start, mid-1))
//   root.right(createBST(arr, start+1, end))
// }
