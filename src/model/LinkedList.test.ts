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
