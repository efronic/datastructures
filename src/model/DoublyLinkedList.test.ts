// filepath: src/model/DoublyLinkedList.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DoublyLinkedList, Node } from './DoublyLinkedList';

// Basic push and length
test('DoublyLinkedList push and length', () => {
  const list = new DoublyLinkedList<number>();
  list.push(1);
  list.push(2);
  assert.equal(list.length, 2);
  assert.equal(list.head?.value, 1);
  assert.equal(list.tail?.value, 2);
  assert.equal(list.head?.next, list.tail);
  assert.equal(list.tail?.prev, list.head);
});

// Reverse
test('DoublyLinkedList reverse', () => {
  const list = new DoublyLinkedList<number>();
  list.push(1);
  list.push(2);
  list.push(3);
  list.reverse();
  assert.equal(list.head?.value, 3);
  assert.equal(list.tail?.value, 1);
  assert.equal(list.head?.next?.value, 2);
  assert.equal(list.head?.prev, null);
  assert.equal(list.tail?.prev?.value, 2);
  assert.equal(list.tail?.next, null);
});

// Pop
test('DoublyLinkedList pop', () => {
  const list = new DoublyLinkedList<number>();
  list.push(1);
  list.push(2);
  const popped = list.pop();
  assert.equal(popped?.value, 2);
  assert.equal(list.length, 1);
  assert.equal(list.tail?.value, 1);
  assert.equal(list.tail?.next, null);
});

// Unshift
test('DoublyLinkedList unshift', () => {
  const list = new DoublyLinkedList<number>();
  list.unshift(2);
  list.unshift(1);
  assert.equal(list.head?.value, 1);
  assert.equal(list.length, 2);
  assert.equal(list.head?.next?.value, 2);
  assert.equal(list.head?.prev, null);
  assert.equal(list.tail?.value, 2);
  assert.equal(list.tail?.prev?.value, 1);
});

// Shift
test('DoublyLinkedList shift', () => {
  const list = new DoublyLinkedList<number>();
  list.push(1);
  list.push(2);
  const shifted = list.shift();
  assert.equal(shifted?.value, 1);
  assert.equal(list.head?.value, 2);
  assert.equal(list.length, 1);
  assert.equal(list.head?.prev, null);
});

// Get valid and invalid indexes
test('DoublyLinkedList get valid and invalid indexes', () => {
  const list = new DoublyLinkedList<number>();
  list.push(10);
  list.push(20);
  list.push(30);
  assert.equal(list.get(0)?.value, 10);
  assert.equal(list.get(1)?.value, 20);
  assert.equal(list.get(2)?.value, 30);
  assert.equal(list.get(3), undefined);
  assert.equal(list.get(-1), undefined);
});

// Set value
test('DoublyLinkedList set value', () => {
  const list = new DoublyLinkedList<number>();
  list.push(1);
  list.push(2);
  const result = list.set(42, 1);
  assert.ok(result);
  assert.equal(list.get(1)?.value, 42);
});

// Set on invalid index
test('DoublyLinkedList set on invalid index', () => {
  const list = new DoublyLinkedList<number>();
  list.push(1);
  const result = list.set(99, 2);
  assert.equal(result, false);
});

// Insert at beginning, middle, end
test('DoublyLinkedList insert at beginning, middle, end', () => {
  const list = new DoublyLinkedList<number>();
  list.push(1);
  list.push(3);
  list.insert(0, 0); // beginning
  list.insert(2, 2); // middle
  list.insert(4, 4); // end
  assert.deepEqual(list.get(0)?.value, 0);
  assert.deepEqual(list.get(1)?.value, 1);
  assert.deepEqual(list.get(2)?.value, 2);
  assert.deepEqual(list.get(3)?.value, 3);
  assert.deepEqual(list.get(4)?.value, 4);
});

// Insert invalid index
test('DoublyLinkedList insert invalid index', () => {
  const list = new DoublyLinkedList<number>();
  assert.equal(list.insert(10, -1), false);
  assert.equal(list.insert(10, 2), false); // too large
});

// Remove at index
test('DoublyLinkedList remove at index', () => {
  const list = new DoublyLinkedList<number>();
  list.push(1);
  list.push(2);
  list.push(3);
  const removed = list.remove(1);
  assert.ok(removed !== false);
  assert.equal(removed!.value, 2);
  assert.equal(list.length, 2);
  assert.equal(list.get(1)?.value, 3);
  assert.equal(list.get(1)?.prev?.value, 1);
});

// Remove at head and tail
test('DoublyLinkedList remove at head and tail', () => {
  const list = new DoublyLinkedList<number>();
  list.push(1);
  list.push(2);
  list.push(3);
  const headRemoved = list.remove(0);
  const tailRemoved = list.remove(1); // tail is now at index 1
  assert.ok(headRemoved !== false && headRemoved?.value === 1);
  assert.ok(tailRemoved !== false && tailRemoved?.value === 3);
});

// Remove with invalid index
test('DoublyLinkedList remove with invalid index', () => {
  const list = new DoublyLinkedList<number>();
  assert.equal(list.remove(-1), false);
  assert.equal(list.remove(1), false);
});

// MakeEmpty
test('DoublyLinkedList makeEmpty', () => {
  const list = new DoublyLinkedList<number>();
  list.push(1);
  list.push(2);
  list.makeEmpty();
  assert.equal(list.length, 0);
  assert.equal(list.head, null);
  assert.equal(list.tail, null);
});

// Empty pop/shift
test('DoublyLinkedList empty pop/shift', () => {
  const list = new DoublyLinkedList<number>();
  assert.equal(list.pop(), undefined);
  assert.equal(list.shift(), undefined);
});

// Reverse single element
test('DoublyLinkedList reverse single element', () => {
  const list = new DoublyLinkedList<number>();
  list.push(42);
  list.reverse();
  assert.equal(list.head?.value, 42);
  assert.equal(list.tail?.value, 42);
});

// Get/set/insert/remove on empty list
test('DoublyLinkedList get/set/insert/remove on empty list', () => {
  const list = new DoublyLinkedList<number>();
  assert.equal(list.get(0), undefined);
  assert.equal(list.set(1, 0), false);
  assert.equal(list.insert(1, 1), false);
  assert.equal(list.remove(0), false);
});

// Head/tail consistency after multiple operations
test('DoublyLinkedList head/tail consistency after multiple operations', () => {
  const list = new DoublyLinkedList<number>();
  list.push(1);
  list.push(2);
  list.push(3);
  list.pop();
  list.unshift(0);
  list.shift();
  assert.equal(list.head?.value, 1);
  assert.equal(list.tail?.value, 2);
  assert.equal(list.length, 2);
});

// findMiddleNode returns correct node
test('DoublyLinkedList findMiddleNode returns correct node', () => {
  const list = new DoublyLinkedList<number>();
  assert.equal(list.findMiddleNode(), null);

  list.push(1);
  list.push(2);
  list.push(3);
  assert.equal(list.findMiddleNode()?.value, 2);

  list.push(4);
  assert.equal(list.findMiddleNode()?.value, 3);
});

// findMiddleNode edge cases
test('DoublyLinkedList findMiddleNode edge cases', () => {
  const single = new DoublyLinkedList<number>();
  single.push(99);
  assert.equal(single.findMiddleNode()?.value, 99);

  const two = new DoublyLinkedList<number>();
  two.push(1);
  two.push(2);
  assert.equal(two.findMiddleNode()?.value, 2);

  const five = new DoublyLinkedList<number>();
  [10, 20, 30, 40, 50].forEach(v => five.push(v));
  assert.equal(five.findMiddleNode()?.value, 30);

  five.pop();
  five.pop();
  assert.equal(five.findMiddleNode()?.value, 20);
});

// hasLoop detects loops
test('DoublyLinkedList hasLoop detects loops', () => {
  const list = new DoublyLinkedList<number>();
  assert.equal(list.hasLoop(), false);

  list.push(1);
  list.push(2);
  list.push(3);
  assert.equal(list.hasLoop(), false);

  // Create a loop manually: tail.next = head
  if (list.tail && list.head) {
    list.tail.next = list.head;
    list.head.prev = list.tail;
  }
  assert.equal(list.hasLoop(), true);
});

// hasLoop edge cases
test('DoublyLinkedList hasLoop edge cases', () => {
  const single = new DoublyLinkedList<number>();
  single.push(1);
  assert.equal(single.hasLoop(), false);

  // Single node, self-loop
  if (single.head) {
    single.head.next = single.head;
    single.head.prev = single.head;
  }
  assert.equal(single.hasLoop(), true);

  // Two nodes, second points to first
  const two = new DoublyLinkedList<number>();
  two.push(1);
  two.push(2);
  if (two.head && two.head.next) {
    two.head.next.next = two.head;
    two.head.prev = two.head.next;
  }
  assert.equal(two.hasLoop(), true);

  // Three nodes, last points to middle
  const three = new DoublyLinkedList<number>();
  three.push(1);
  three.push(2);
  three.push(3);
  if (three.head && three.head.next && three.tail) {
    three.tail.next = three.head.next;
    three.head.next.prev = three.tail;
  }
  assert.equal(three.hasLoop(), true);

  // Remove loop and check again
  if (three.tail) {
    three.tail.next = null;
    if (three.head && three.head.next) three.head.next.prev = three.tail;
  }
  assert.equal(three.hasLoop(), false);
});

// removeDuplicates removes duplicate values
test('DoublyLinkedList removeDuplicates removes duplicate values', () => {
  const list = new DoublyLinkedList<number>();
  [1, 2, 2, 3, 1, 4, 4].forEach(v => list.push(v));
  list.removeDuplicates();
  const values = [];
  let node = list.head;
  while (node) {
    values.push(node.value);
    node = node.next;
  }
  assert.deepEqual(values, [1, 2, 3, 4]);
  assert.equal(list.length, 4);
});

// binaryToDecimal returns correct decimal value
test('DoublyLinkedList binaryToDecimal returns correct decimal value', () => {
  const list = new DoublyLinkedList<number>();
  [1, 0, 1, 1].forEach(v => list.push(v));
  assert.equal(list.binaryToDecimal(), 11);

  const list2 = new DoublyLinkedList<number>();
  [0, 0, 0].forEach(v => list2.push(v));
  assert.equal(list2.binaryToDecimal(), 0);

  const list3 = new DoublyLinkedList<number>();
  [1].forEach(v => list3.push(v));
  assert.equal(list3.binaryToDecimal(), 1);
});

// binaryToDecimal throws on non-binary values
test('DoublyLinkedList binaryToDecimal throws on non-binary values', () => {
  const list = new DoublyLinkedList<number>();
  [1, 2, 0].forEach(v => list.push(v));
  assert.throws(() => list.binaryToDecimal());
});

// partitionList partitions nodes around x
test('DoublyLinkedList partitionList partitions nodes around x', () => {
  const list = new DoublyLinkedList<number>();
  [1, 4, 3, 2, 5, 2].forEach(v => list.push(v));
  list.partitionList(3);
  const values = [];
  let node = list.head;
  while (node) {
    values.push(node.value);
    node = node.next;
  }
  const idx = values.findIndex(v => v >= 3);
  assert.ok(idx > 0);
  assert.ok(values.slice(0, idx).every(v => v < 3));
  assert.ok(values.slice(idx).every(v => v >= 3));
});

// reverseBetween reverses sublist
test('DoublyLinkedList reverseBetween reverses sublist', () => {
  const list = new DoublyLinkedList<number>();
  [1, 2, 3, 4, 5].forEach(v => list.push(v));
  list.reverseBetween(1, 3);
  const values = [];
  let node = list.head;
  while (node) {
    values.push(node.value);
    node = node.next;
  }
  assert.deepEqual(values, [1, 4, 3, 2, 5]);
});

// reverseBetween with m == n does nothing
test('DoublyLinkedList reverseBetween with m == n does nothing', () => {
  const list = new DoublyLinkedList<number>();
  [1, 2, 3].forEach(v => list.push(v));
  list.reverseBetween(1, 1);
  const values = [];
  let node = list.head;
  while (node) {
    values.push(node.value);
    node = node.next;
  }
  assert.deepEqual(values, [1, 2, 3]);
});

// swapPairs swaps adjacent nodes
test('DoublyLinkedList swapPairs swaps adjacent nodes', () => {
  const list = new DoublyLinkedList<number>();
  [1, 2, 3, 4].forEach(v => list.push(v));
  list.swapPairs();
  const values = [];
  let node = list.head;
  while (node) {
    values.push(node.value);
    node = node.next;
  }
  assert.deepEqual(values, [2, 1, 4, 3]);
});

// swapPairs with odd number of nodes
test('DoublyLinkedList swapPairs with odd number of nodes', () => {
  const list = new DoublyLinkedList<number>();
  [1, 2, 3].forEach(v => list.push(v));
  list.swapPairs();
  const values = [];
  let node = list.head;
  while (node) {
    values.push(node.value);
    node = node.next;
  }
  assert.deepEqual(values, [2, 1, 3]);
});

// isPalindrome edge cases
test('DoublyLinkedList isPalindrome edge cases', () => {
  const list = new DoublyLinkedList<number>();
  assert.equal(list.isPalindrome(), true);

  list.push(1);
  assert.equal(list.isPalindrome(), true);

  list.push(1);
  assert.equal(list.isPalindrome(), true);

  list.makeEmpty();
  [1, 2, 1].forEach(v => list.push(v));
  assert.equal(list.isPalindrome(), true);

  list.makeEmpty();
  [1, 2, 2, 1].forEach(v => list.push(v));
  assert.equal(list.isPalindrome(), true);

  list.makeEmpty();
  [1, 2, 3, 2, 1].forEach(v => list.push(v));
  assert.equal(list.isPalindrome(), true);

  list.makeEmpty();
  [1, 2, 3].forEach(v => list.push(v));
  assert.equal(list.isPalindrome(), false);

  list.makeEmpty();
  [1, 2, 3, 4].forEach(v => list.push(v));
  assert.equal(list.isPalindrome(), false);
});
