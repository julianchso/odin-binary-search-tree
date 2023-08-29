// Write an insert and delete functions which accepts a value...

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

const buildTree = (arr, start = 0, end = arr.length - 1) => {
  if (start > end) return null;
  console.log(end);
  let mid = Math.floor((start + end) / 2);
  // console.log(mid);

  let root = arr[mid];
  let node = new Node(root);

  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);

  return node;
};

class Tree {
  constructor(arr) {
    const sortedArr = this.mergeSort(this.removeDuplicates(arr));
    console.log(typeof sortedArr);
    this.root = buildTree(sortedArr);
  }

  removeDuplicates(arr) {
    const arrNoDups = [];
    Array.from(arr).forEach((i) => {
      if (!arrNoDups.includes(i)) {
        arrNoDups.push(i);
      }
    });
    return arrNoDups;
  }

  // merge sort function
  mergeSort(arr) {
    if (arr.length < 2) return arr;

    const mid = Math.floor(arr.length / 2);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid);
    return this.merge(this.mergeSort(leftArr), this.mergeSort(rightArr));
  }

  merge(leftArr, rightArr) {
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
  }
}

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

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree);
console.log(typeof tree);
prettyPrint(buildTree(tree));

// pseudocode for Binary Search Tree
// const createBST(arr, start, end) {
//   if (start > end) return null;
//   let mid = (start + end) / 2;
//   root = new Node(array[mid]);

//   root.left(createBST(arr, start, mid-1))
//   root.right(createBST(arr, start+1, end))
// }
