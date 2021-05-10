//inserts and lookups matter for interviews***

class Node {
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor(){
    this.root = null;
  }

  search(value){
    //if tree is empty, nothing to search for
    if (this.root === null){
      return false;
    }
    //start at the root
    let currentNode = this.root;

    //We will traverse all the way to the botttom, but we may not find anything. This loop condition exits when currentNode evaluates to null which is falsy.
    while(currentNode) {
      //go left if value < currentNode
      if(value < currentNode.value){
        currentNode = currentNode.left;
      } 
      //go right if value > currentNode
      else if (value > currentNode.value){
        currentNode = currentNode.right;
      } 
      //we have a match! return the currentNode
      else if (currentNode.value === value) {
        return currentNode;
      }
    }
    //If have no matches, return false. The other returns inside the while loop will exit us out of the function before we return false, unless we cant find the node we want.
    return false;
  }

  insert(value){
    const newNode = new Node(value);

    //if tree is empty, newNode is our root
    if(this.root === null) {
      this.root = newNode;
    } 
    //otherwise, if we have a root
    else {
      //we need to traverse down the tree. To do so, we start from the root. 
      let currentNode = this.root;
      //this loop will be an infinite loop, but we create exit conditions below. This helps us travel down the whole tree.
      while(true) {
        //if value provided is less than our currentNode value. GO LEFT
        if(value < currentNode.value){
          //if the currentNode does not have a left child, set currentNode.left to our new Node. **Use return this; to break out the loop**
          if(!currentNode.left){
            currentNode.left = newNode;
            return this;
          }
          //keep going left until above condition is met
          currentNode = currentNode.left;
        } 
        
        //if value provided is greater or equal to our currentNode value. GO RIGHT
        else {
          //if the currentNode does not have a right child, set currentNode.right to our new Node. **Use return this; to break out the loop**
          if(!currentNode.right){
            currentNode.right = newNode;
            return this;
          }
          //keep going right until the above condition is met
          currentNode = currentNode.right;
        }
      }
    }
  }

  delete(value){
    //if tree empty, nothing to delete
    if (this.root === null) {
      return false;
    }

    //track the currentNode. Start at root.
    let currentNode = this.root;
    //create/save a reference to the parentNode
    let parentNode = null;

    //While our currentNode exists,
    while(currentNode){
      //go left if value provided < currNode.
      //assign val of parentNode to our currNode
      if(value < currentNode.value){
        parentNode = currentNode;
        currentNode = currentNode.left;
      } 
      //go right if value provided > currNode.
      //assign val of parentNode to our currNode
      else if(value > currentNode.value){
        parentNode = currentNode;
        currentNode = currentNode.right;
      } 
      //We have a match, get to work!
      else if (currentNode.value === value) {

        //Option 1: No right child: 
        if (currentNode.right === null) {
          //
          if (parentNode === null) {
            this.root = currentNode.left;
          } 
          else {
            //if parent > current value, make current left child a child of parent
            if(currentNode.value < parentNode.value) {
              parentNode.left = currentNode.left;
            
            //if parent < current value, make left child a right child of parent
            } else if(currentNode.value > parentNode.value) {
              parentNode.right = currentNode.left;
            }
          }
        
        //Option 2: Right child which doesnt have a left child
        } else if (currentNode.right.left === null) {
          currentNode.right.left = currentNode.left;
          if(parentNode === null) {
            this.root = currentNode.right;
          } else {
            
            //if parent > current, make right child of the left the parent
            if(currentNode.value < parentNode.value) {
              parentNode.left = currentNode.right;
            
            //if parent < current, make right child a right child of the parent
            } else if (currentNode.value > parentNode.value) {
              parentNode.right = currentNode.right;
            }
          }
        
        //Option 3: Right child that has a left child
        } else {

          //find the Right child's left most child
          let leftmost = currentNode.right.left;
          let leftmostParent = currentNode.right;
          while(leftmost.left !== null) {
            leftmostParent = leftmost;
            leftmost = leftmost.left;
          }
          
          //Parent's left subtree is now leftmost's right subtree
          leftmostParent.left = leftmost.right;
          leftmost.left = currentNode.left;
          leftmost.right = currentNode.right;

          if(parentNode === null) {
            this.root = leftmost;
          } else {
            if(currentNode.value < parentNode.value) {
              parentNode.left = leftmost;
            } else if(currentNode.value > parentNode.value) {
              parentNode.right = leftmost;
            }
          }
        }
      return true;
      }
    }
  }
 
  breadthFirstSearch(){
    let currentNode = this.root; //start at root
    let list = []; //output array
    let queue = []; //keeps track of the level we're at so we can access the child nodes. This queue can get large if the tree is wide.
    queue.push(currentNode)

    //start with the root. "While we have items in our queue"
    while(queue.length > 0) {
      //assign currentNode to the next(first) value in our queue
      currentNode = queue.shift(); //shift takes and removes first value
      console.log(currentNode.value)
      //push that node's value into our result array
      list.push(currentNode.value)
      
      //now we ask, does that current node have a left child?
      if (currentNode.left){
        //add left child to queue
        queue.push(currentNode.left)
      }
      //does that current node have a right child?
      if(currentNode.right){
        //add right child to queue
        queue.push(currentNode.right)
      }
    }
    return list;
  }

  dfsInOrder(){
    //here we are returning the value which will be a list array from the recursive function we created for inOrder below. We pass 2 arguments, the root node and an empty array.
    return traverseInOrder(this.root, [])
  }

  dfsPreOrder(){
    //here we are returning the value which will be a list array from the recursive function we created for preOrder below. We pass 2 arguments, the root node and an empty array.
    return traversePreOrder(this.root, [])
  }

  dfsPostOrder(){
    //here we are returning the value which will be a list array from the recursive function we created for postOrder below. We pass 2 arguments, the root node and an empty array.
    return traversePostOrder(this.root, [])
  }
}

//inOrder- [1, 4, 6, 9, 15, 20, 170]
//preOrder- [9, 4, 1, 6, 20, 15, 170]
//postOrder- [1, 6, 4, 15, 170, 20, 9]

//        9
//    4      20
// 1   6   15  170

function traverse(node){
  const tree = { value: node.value };
  tree.left = node.left === null ? null :  
  traverse(node.left);
  tree.right = node.right === null ? null :
  traverse(node.right);
  return tree;
}

//traverse all the way left. 1 doesnt have a left child, so we push 1. 
//Then it bubbles back up to 6? 6 has a right child, so we push 4.
//Then we push 6
//Then we bubble back up to the root and push 9 and go down the right side all the way left
//We reach 15 which doesnt have a left child, so we push 15.
//We bubble back up to 20 and then push 170

function traverseInOrder(node, list){
  // console.log(node.value)

  //start at the top, if the root node has a left child,keep going left. This function will keep getting called (recursion) until theres no more child nodes
  if(node.left) {
    traverseInOrder(node.left, list);
  }
  //when we reach the bottom, push the value to our list. 
  list.push(node.value)
  if(node.right) {
    traverseInOrder(node.right, list);
  }
  return list;
}

function traversePreOrder(node, list){
  // console.log(node.value)
  //start at the parent first and push that value and go all the way down
  list.push(node.value)
  if(node.left) {
    traversePreOrder(node.left, list);
  }
  //when we reach the bottom, push the value to our list. 
  if(node.right) {
    traversePreOrder(node.right, list);
  }
  return list;
}

function traversePostOrder(node, list){
  // console.log(node.value)
  if(node.left) {
    traversePostOrder(node.left, list);
  }
  //when we reach the bottom, push the value to our list. 
  if(node.right) {
    traversePostOrder(node.right, list);
  }
  list.push(node.value)
  return list;
}

const tree = new BinarySearchTree();
tree.insert(9);
tree.insert(4);
tree.insert(6);
tree.insert(20);
tree.insert(170);
tree.insert(15);
tree.insert(1);
// tree.breadthFirstSearch();
//remove JSON.stringify() when testing .search()
// JSON.stringify(traverse(tree.root));
// tree.search(9);
console.log(tree.dfsInOrder());
console.log(tree.dfsPreOrder());
console.log(tree.dfsPostOrder());


//https://www.youtube.com/watch?v=gm8DUJJhmY4 around 8 minutes explaining how the recursive calls work
