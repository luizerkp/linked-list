const Node = (data = null) => ({
  value: data,
  nextNode: null,
});

const LinkedList = () => {
  let head = null;
  let size = 0;

  const handleError = (index, operation) => {
    const emptyListErrorMsg = `Can not perform ${operation} index: ${index} on an empty list`;
    const beyondRangeErrorMsg = `Can not perform ${operation} index: ${index} last item on list located at index: ${
      size - 1
    }`;
    const negativeIndexErrorMsg = `Can not perform ${operation} index: ${index} index can only be a positive interger`;
    const notAnIntergerErrorMsg = `Can not perform ${operation} with a non-interger index found index: ${index} of type ${typeof index}`;

    if (head === null && index !== 0) {
      return emptyListErrorMsg;
    }
    if (index > size || index < 0) {
      return index > size ? beyondRangeErrorMsg : negativeIndexErrorMsg;
    }

    if (!Number.isInteger(index)) {
      return notAnIntergerErrorMsg;
    }

    if (index === size && (operation === "removeAt" || operation === "updateValueAt")) {
      return head === null ? emptyListErrorMsg : beyondRangeErrorMsg;
    }

    return null;
  };

  const append = (value) => {
    const newNode = Node(value);
    size += 1;
    if (head === null) {
      head = newNode;
      return head;
    }

    let ptr = head;

    while (ptr.nextNode !== null) {
      ptr = ptr.nextNode;
    }
    ptr.nextNode = newNode;
    return head;
  };

  const prepend = (value) => {
    const newNode = Node(value);
    size += 1;
    if (head === null) {
      head = newNode;
      return head;
    }
    newNode.nextNode = head;
    head = newNode;
    return head;
  };

  const getSize = () => size;

  const getHead = () => (head !== null ? head.value : head);

  const getTail = () => {
    if (head === null || head.nextNode === null) {
      return head === null ? head : head.value;
    }
    let ptr = head;

    while (ptr.nextNode !== null) {
      ptr = ptr.nextNode;
    }
    return ptr.value;
  };

  const at = (index) => {
    if (index > size - 1 || index < 0) {
      return null;
    }

    let ptr = head;

    for (let i = 0; i < index; i += 1) {
      ptr = ptr.nextNode;
    }
    return ptr;
  };

  const pop = () => {
    if (head === null || head.nextNode === null) {
      head = null;
      return head;
    }

    // last node is at size - 1 setting it's nextNode to null removes the pointer to the last node from the list
    at(size - 2).nextNode = null;
    size -= 1;
    return size;
  };

  const contains = (val) => {
    if (head === null || head.nextNode === null) {
      return head === null ? false : head.value === val;
    }

    let ptr = head;

    while (ptr.nextNode !== null) {
      ptr = ptr.nextNode;
    }

    return ptr.value === val;
  };

  const find = (val) => {
    if (head === null) {
      return null;
    }

    let ptr = head;
    let idx = 0;

    while (ptr.nextNode !== null && ptr.value !== val) {
      ptr = ptr.nextNode;
      idx += 1;
    }

    return ptr.value === val ? idx : null;
  };

  const toString = () => {
    let linkeListString = "";

    if (head === null) {
      return ["Linked list is empty"];
    }

    let ptr = head;

    while (ptr.nextNode !== null) {
      const stringNode = `( ${ptr.value} ) -> `;
      linkeListString = linkeListString.concat(stringNode);
      ptr = ptr.nextNode;
    }

    const lastNode = `( ${ptr.value} ) -> null`;
    linkeListString = linkeListString.concat(lastNode);

    return linkeListString;
  };

  const insertAt = (newValue, index) => {
    const error = handleError(index, "insertAt");
    if (error) {
      return console.log(error);
    }

    // if inserting at the beginning or attaching at the end, prepend or append newValue respectively
    if (index === 0 || index === size) {
      return index === 0 ? prepend(newValue) : append(newValue);
    }
    const newNode = Node(newValue);
    let ptr = head;
    let previousNode = null;
    for (let currentIndex = 0; currentIndex <= index - 1; currentIndex += 1) {
      previousNode = ptr;
      ptr = ptr.nextNode;
    }

    previousNode.nextNode = newNode;
    size += 1;
    newNode.nextNode = ptr;
    return head;
  };

  const removeAt = (index) => {
    const error = handleError(index, "removeAt");
    if (error) {
      return console.log(error);
    }
    if (index === size - 1) {
      size -= 1;
      return pop();
    }

    if (index === 0) {
      const ptr = head.nextNode;
      head = ptr;
      return head;
    }

    let ptr = head;
    let previousNode = null;
    for (let currentIndex = 0; currentIndex <= index - 1; currentIndex += 1) {
      previousNode = ptr;
      ptr = ptr.nextNode;
    }

    size -= 1;
    previousNode.nextNode = ptr.nextNode;
    return head;
  };

  const updateValueAt = (newValue, index) => {
    const error = handleError(index, "updateValueAt");

    if (error) {
      return console.log(error);
    }

    if (index === 0) {
      head.value = newValue;
      return head;
    }
    let ptr = head;
    for (let currentIndex = 0; currentIndex <= index - 1; currentIndex += 1) {
      ptr = ptr.nextNode;
    }

    ptr.value = newValue;
    return head;
  };

  return {
    append,
    prepend,
    getSize,
    getHead,
    getTail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
    updateValueAt,
  };
};

const newList = LinkedList();
const node1 = "node1";
const node2 = "node2";
const node3 = "node3";

// Usage demo use node in terminal to test

console.log("Append operation (Adds node3):");
newList.append(node3);
console.log(`String List: ${newList.toString()}`); // ( node3 ) -> null

console.log("\n");

console.log("Prepend operation (Adds node1 as head):");
newList.prepend(node1);
console.log(`String List: ${newList.toString()}`); // ( node1 ) -> ( node3 ) -> null

console.log("\n");

console.log("Insert operation (insert node2 at index 1):");
newList.insertAt(node2, 1);
console.log(`Size: ${newList.getSize()}`); // 3
console.log(`String List: ${newList.toString()}`); // ( node1 ) -> ( node2 ) -> ( node3 ) -> null

console.log("\n");

console.log("Update value operation (update node3 at index 2):");
newList.updateValueAt("newNode3", 2);
console.log(`String List: ${newList.toString()}`); // ( node1 ) -> ( node2 ) -> ( newNode3 ) -> null

console.log("\n");

console.log(`Size: ${newList.getSize()}`); // 3
console.log(`Head: ${newList.getHead()}`); // node1
console.log(`Tail: ${newList.getTail()}`); // newNode3
console.log(`At Index 1: ${newList.at(1).value}`); // node2
console.log(`Contains node1: ${newList.contains("newNode3")}`); // true
console.log(`Find node2 Index: ${newList.find(`${node2}`)}`); // 1

console.log("\n");

console.log("Remove value operation (remove node2 at index 1):");
newList.removeAt(1);
console.log(`Size: ${newList.getSize()}`); // 2
console.log(`String List: ${newList.toString()}`); // ( node1 ) -> ( newNode3 ) -> null

console.log("\n");

console.log("Pop value operation (remove last node):");
newList.pop();
console.log(`String List: ${newList.toString()}`); // ( node1 ) -> null