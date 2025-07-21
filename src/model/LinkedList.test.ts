// filepath: src/model/LinkedList.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LinkedList } from './LinkedList';

test('LinkedList push and length', () => {
  const list = new LinkedList<number>();
  list.push(1);
  list.push(2);
  assert.equal(list.length, 2);
  assert.equal(list.head?.value, 1);
  assert.equal(list.tail?.value, 2);
});

test('LinkedList reverse', () => {
  const list = new LinkedList<number>();
  list.push(1);
  list.push(2);
  list.push(3);
  list.reverse();
  assert.equal(list.head?.value, 3);
  assert.equal(list.tail?.value, 1);
});

test('LinkedList pop', () => {
  const list = new LinkedList<number>();
  list.push(1);
  list.push(2);
  const popped = list.pop();
  assert.equal(popped?.value, 2);
  assert.equal(list.length, 1);
  assert.equal(list.tail?.value, 1);
});

test('LinkedList unshift', () => {
  const list = new LinkedList<number>();
  list.unshift(2);
  list.unshift(1);
  assert.equal(list.head?.value, 1);
  assert.equal(list.length, 2);
});

test('LinkedList shift', () => {
  const list = new LinkedList<number>();
  list.push(1);
  list.push(2);
  const shifted = list.shift();
  assert.equal(shifted?.value, 1);
  assert.equal(list.head?.value, 2);
  assert.equal(list.length, 1);
});

test('LinkedList get valid and invalid indexes', () => {
  const list = new LinkedList<number>();
  list.push(10);
  list.push(20);
  list.push(30);
  assert.equal(list.get(0)?.value, 10);
  assert.equal(list.get(1)?.value, 20);
  assert.equal(list.get(2)?.value, 30);
  assert.equal(list.get(3), undefined);
  assert.equal(list.get(-1), undefined);
});

test('LinkedList set value', () => {
  const list = new LinkedList<number>();
  list.push(1);
  list.push(2);
  const result = list.set(42, 1);
  assert.ok(result);
  assert.equal(list.get(1)?.value, 42);
});

test('LinkedList set on invalid index', () => {
  const list = new LinkedList<number>();
  list.push(1);
  const result = list.set(99, 2);
  assert.equal(result, false);
});

test('LinkedList insert at beginning, middle, end', () => {
  const list = new LinkedList<number>();
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

test('LinkedList insert invalid index', () => {
  const list = new LinkedList<number>();
  assert.equal(list.insert(10, -1), false);
  assert.equal(list.insert(10, 2), false); // too large
});

test('LinkedList remove at index', () => {
  const list = new LinkedList<number>();
  list.push(1);
  list.push(2);
  list.push(3);
  const removed = list.remove(1);
  assert.ok(removed !== false);
  assert.equal(removed!.value, 2);
  assert.equal(list.length, 2);
  assert.equal(list.get(1)?.value, 3);
});

test('LinkedList remove at head and tail', () => {
  const list = new LinkedList<number>();
  list.push(1);
  list.push(2);
  list.push(3);
  const headRemoved = list.remove(0);
  const tailRemoved = list.remove(1); // tail is now at index 1
  assert.ok(headRemoved !== false && headRemoved?.value === 1);
  assert.ok(tailRemoved !== false && tailRemoved?.value === 3);
});

test('LinkedList remove with invalid index', () => {
  const list = new LinkedList<number>();
  assert.equal(list.remove(-1), false);
  assert.equal(list.remove(1), false);
});

test('LinkedList makeEmpty', () => {
  const list = new LinkedList<number>();
  list.push(1);
  list.push(2);
  list.makeEmpty();
  assert.equal(list.length, 0);
  assert.equal(list.head, null);
  assert.equal(list.tail, null);
});

test('LinkedList empty pop/shift', () => {
  const list = new LinkedList<number>();
  assert.equal(list.pop(), undefined);
  assert.equal(list.shift(), undefined);
});

test('LinkedList reverse single element', () => {
  const list = new LinkedList<number>();
  list.push(42);
  list.reverse();
  assert.equal(list.head?.value, 42);
  assert.equal(list.tail?.value, 42);
});

test('LinkedList get/set/insert/remove on empty list', () => {
  const list = new LinkedList<number>();
  assert.equal(list.get(0), undefined);
  assert.equal(list.set(1, 0), false);
  assert.equal(list.insert(1, 1), false);
  assert.equal(list.remove(0), false);
});

test('LinkedList head/tail consistency after multiple operations', () => {
  const list = new LinkedList<number>();
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

test('LinkedList findMiddleNode returns correct node', () => {
  const list = new LinkedList<number>();
  // Empty list
  assert.equal(list.findMiddleNode(), null);

  // Odd number of elements
  list.push(1);
  list.push(2);
  list.push(3);
  assert.equal(list.findMiddleNode()?.value, 2);

  // Even number of elements
  list.push(4);
  assert.equal(list.findMiddleNode()?.value, 3);
});

test('LinkedList findMiddleNode edge cases', () => {
  // Single element
  const single = new LinkedList<number>();
  single.push(99);
  assert.equal(single.findMiddleNode()?.value, 99);

  // Two elements
  const two = new LinkedList<number>();
  two.push(1);
  two.push(2);
  assert.equal(two.findMiddleNode()?.value, 2);

  // Five elements
  const five = new LinkedList<number>();
  [10, 20, 30, 40, 50].forEach(v => five.push(v));
  assert.equal(five.findMiddleNode()?.value, 30);

  // Remove elements and check again
  five.pop();
  five.pop();
  assert.equal(five.findMiddleNode()?.value, 20);
});

test('LinkedList hasLoop detects loops', () => {
  const list = new LinkedList<number>();
  // No loop in empty list
  assert.equal(list.hasLoop(), false);

  // No loop in normal list
  list.push(1);
  list.push(2);
  list.push(3);
  assert.equal(list.hasLoop(), false);

  // Create a loop manually: tail.next = head
  if (list.tail && list.head) {
    list.tail.next = list.head;
  }
  assert.equal(list.hasLoop(), true);
});

test('LinkedList hasLoop edge cases', () => {
  // Single node, no loop
  const single = new LinkedList<number>();
  single.push(1);
  assert.equal(single.hasLoop(), false);

  // Single node, self-loop
  if (single.head) single.head.next = single.head;
  assert.equal(single.hasLoop(), true);

  // Two nodes, second points to first
  const two = new LinkedList<number>();
  two.push(1);
  two.push(2);
  if (two.head && two.head.next) two.head.next.next = two.head;
  assert.equal(two.hasLoop(), true);

  // Three nodes, last points to middle
  const three = new LinkedList<number>();
  three.push(1);
  three.push(2);
  three.push(3);
  if (three.head && three.head.next && three.tail) three.tail.next = three.head.next;
  assert.equal(three.hasLoop(), true);

  // Remove loop and check again
  if (three.tail) three.tail.next = null;
  assert.equal(three.hasLoop(), false);
});

test('LinkedList removeDuplicates removes duplicate values', () => {
  const list = new LinkedList<number>();
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

test('LinkedList binaryToDecimal returns correct decimal value', () => {
  const list = new LinkedList<number>();
  [1, 0, 1, 1].forEach(v => list.push(v)); // binary 1011 = 11
  assert.equal(list.binaryToDecimal(), 11);

  const list2 = new LinkedList<number>();
  [0, 0, 0].forEach(v => list2.push(v));
  assert.equal(list2.binaryToDecimal(), 0);

  const list3 = new LinkedList<number>();
  [1].forEach(v => list3.push(v));
  assert.equal(list3.binaryToDecimal(), 1);
});

test('LinkedList binaryToDecimal throws on non-binary values', () => {
  const list = new LinkedList<number>();
  [1, 2, 0].forEach(v => list.push(v));
  assert.throws(() => list.binaryToDecimal());
});

test('LinkedList partitionList partitions nodes around x', () => {
  const list = new LinkedList<number>();
  [1, 4, 3, 2, 5, 2].forEach(v => list.push(v));
  list.partitionList(3);
  // All nodes < 3 should come before nodes >= 3
  const values = [];
  let node = list.head;
  while (node) {
    values.push(node.value);
    node = node.next;
  }
  // Valid partition: [1,2,2,4,3,5] or [2,2,1,4,3,5] etc. (order within partitions preserved)
  const idx = values.findIndex(v => v >= 3);
  assert.ok(idx > 0);
  assert.ok(values.slice(0, idx).every(v => v < 3));
  assert.ok(values.slice(idx).every(v => v >= 3));
});

test('LinkedList reverseBetween reverses sublist', () => {
  const list = new LinkedList<number>();
  [1, 2, 3, 4, 5].forEach(v => list.push(v));
  list.reverseBetween(1, 3); // reverse [2,3,4] -> [4,3,2]
  const values = [];
  let node = list.head;
  while (node) {
    values.push(node.value);
    node = node.next;
  }
  assert.deepEqual(values, [1, 4, 3, 2, 5]);
});

test('LinkedList reverseBetween with m == n does nothing', () => {
  const list = new LinkedList<number>();
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

test('LinkedList swapPairs swaps adjacent nodes', () => {
  const list = new LinkedList<number>();
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

test('LinkedList swapPairs with odd number of nodes', () => {
  const list = new LinkedList<number>();
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
