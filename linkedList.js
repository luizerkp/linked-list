const Node = (data = null) => {
  return {
    value: data,
    nextNode: null,
  }
}

const LinkedList = () => {
  let head = null;
  let size = 0;

  const append = (value) => {
    const newNode = Node(value);
    size += 1;
    if (head === null) {
       head = newNode
       return head;
    }

    let ptr = head;
    while(head.nextNode !== null) {
      ptr = ptr.nextNode;
    }
    ptr.nextNode = newNode;
  }

  const prepend = (value) => {
    const newNode = Node(value);
    size += 1;
    if (head === null) {
       head = newNode
       return head;
    }
    newNode.newNode = head;
    head = newNode;
  }

  const getSize = () => {
    return size;
  }

  const getHead = () => {
    return head.value;
  }

  const getTail = () => {
    if (head.newNode === null) {
      return head.value
    }
    let ptr = head;
    
    while (head.newNode !== null) {
      ptr = ptr.nextNode;
    }
    return ptr.value;
  }

}