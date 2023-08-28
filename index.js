// Write an insert and delete functions which accepts a value...

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    const sortedArr = this.mergeSort(this.removeDuplicates(arr));
    console.log(typeof sortedArr);
    this.root = this.buildTree(sortedArr);
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

  buildTree(sortedArr, start = 0, end = sortedArr.length - 1) {
    console.log(sortedArr.length);
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    let root = sortedArr[mid];
    let node = new Node(root);

    node.left = this.buildTree(sortedArr, start, mid - 1);
    node.right = this.buildTree(sortedArr, mid + 1, end);

    return node;
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
prettyPrint(tree.buildTree());

// pseudocode for Binary Search Tree
// const createBST(arr, start, end) {
//   if (start > end) return null;
//   let mid = (start + end) / 2;
//   root = new Node(array[mid]);

//   root.left(createBST(arr, start, mid-1))
//   root.right(createBST(arr, start+1, end))
// }
