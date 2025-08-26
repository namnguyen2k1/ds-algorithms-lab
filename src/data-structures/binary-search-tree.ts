type KeyType = number;

class Node {
  key: KeyType;
  left: Node | null = null;
  right: Node | null = null;

  constructor(key: KeyType) {
    this.key = key;
  }
}

export class BST {
  root: Node | null = null;

  isEmpty(): boolean {
    return this.root === null;
  }

  height(node: Node | null = this.root): number {
    if (!node) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  search(x: KeyType, node: Node | null = this.root): Node | null {
    if (!node) {
      return null;
    }
    if (node.key === x) {
      return node;
    }
    if (x < node.key) {
      return this.search(x, node.left);
    } else {
      return this.search(x, node.right);
    }
  }

  insert(x: KeyType): void {
    const node = new Node(x);

    if (!this.root) {
      this.root = node;
      return;
    }

    let currentNode = this.root;

    while (true) {
      if (x < currentNode.key) {
        if (!currentNode.left) {
          currentNode.left = node;
          return;
        }
        currentNode = currentNode.left;
      } else if (x > currentNode.key) {
        if (!currentNode.right) {
          currentNode.right = node;
          return;
        }
        currentNode = currentNode.right;
      } else {
        return;
      }
    }
  }

  delete(x: KeyType): void {
    this.root = this.deleteRecursive(this.root, x);
  }

  private deleteRecursive(node: Node | null, x: KeyType): Node | null {
    if (!node) {
      return null;
    }

    if (x < node.key) {
      node.left = this.deleteRecursive(node.left, x);
    } else if (x > node.key) {
      node.right = this.deleteRecursive(node.right, x);
    } else {
      // Node to be deleted is found
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }
      // Node has two children: get the smallest value in the right subtree
      node.key = this.minNode(node.right)!.key;
      node.right = this.deleteRecursive(node.right, node.key);
    }

    return node;
  }

  private minNode(node: Node): Node | null {
    while (node.left) {
      node = node.left;
    }

    return node;
  }

  private maxNode(node: Node): Node | null {
    while (node.right) {
      node = node.right;
    }

    return node;
  }

  preOrder(node: Node | null = this.root, result: KeyType[] = []) {
    if (!node) {
      return result;
    }

    result.push(node.key);
    this.preOrder(node.left, result);
    this.preOrder(node.right, result);

    return result;
  }

  inOrder(node: Node | null = this.root, result: KeyType[] = []) {
    if (!node) {
      return result;
    }

    this.inOrder(node.left, result);
    result.push(node.key);
    this.inOrder(node.right, result);

    return result;
  }

  postOrder(node: Node | null = this.root, result: KeyType[] = []) {
    if (!node) {
      return result;
    }

    this.postOrder(node.left, result);
    this.postOrder(node.right, result);
    result.push(node.key);

    return result;
  }

  getParent(x: KeyType, node: Node | null = this.root, parent: Node | null = null): Node | null {
    if (!node) {
      return null;
    }
    if (node.key === x) {
      return parent;
    }
    if (x < node.key) {
      return this.getParent(x, node.left, node);
    } else {
      return this.getParent(x, node.right, node);
    }
  }

  getNext(x: KeyType): Node | null {
    let node = this.search(x);

    if (!node) {
      return null;
    }
    if (node.right) {
      return this.minNode(node.right);
    }

    let successor: Node | null = null;
    let current = this.root;

    while (current) {
      if (x < current.key) {
        successor = current;
        current = current.left;
      } else if (x > current.key) {
        current = current.right;
      } else {
        break;
      }
    }

    return successor;
  }

  getPrevious(x: KeyType): Node | null {
    let node = this.search(x);

    if (!node) {
      return null;
    }
    if (node.left) {
      return this.maxNode(node.left);
    }

    let predecessor: Node | null = null;
    let current = this.root;

    while (current) {
      if (x > current.key) {
        predecessor = current;
        current = current.right;
      } else if (x < current.key) {
        current = current.left;
      } else {
        break;
      }
    }

    return predecessor;
  }
}
export function runBSTPlayground() {
  const bst = new BST();
  const arr = [50, 30, 70, 20, 40, 60, 80];

  console.log('Insert nodes:', arr);
  arr.forEach(v => bst.insert(v));

  console.log('\nIn-order (sorted): ', bst.inOrder());

  console.log('\nPre-order (root-left-right): ', bst.preOrder());

  console.log('\nPost-order (left-right-root): ', bst.postOrder());

  console.log('\n--- Queries ---');
  console.log('Is empty?', bst.isEmpty());
  console.log('Search 40:', bst.search(40)?.key);
  console.log('Parent of 40:', bst.getParent(40)?.key);
  console.log('Next of 50:', bst.getNext(50)?.key);
  console.log('Previous of 50:', bst.getPrevious(50)?.key);
  console.log('Height of tree:', bst.height());

  console.log('\n--- Delete nodes ---');
  console.log('Delete 50 (root)');
  bst.delete(50);
  console.log('In-order after delete 50:', bst.inOrder());

  console.log('\nDelete 30');
  bst.delete(30);
  console.log('In-order after delete 30: ', bst.inOrder());

  console.log('\nDelete 70');
  bst.delete(70);
  console.log('In-order after delete 70: ', bst.inOrder());

  console.log('\n--- Clear tree ---');
  [20, 40, 60, 80].forEach(v => bst.delete(v));
  console.log('Is empty now?', bst.isEmpty());
}
