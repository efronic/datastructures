import { LinkedList } from './model/LinkedList';

const list = new LinkedList<number>();
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
list.push(6);

console.log('Initial list:');
list.printList();
console.log('---');

list.getHead();
list.getTail();
list.getLength();
console.log('---');

console.log('After reverse:');
list.reverse();
list.printList();
console.log('---');

console.log('Pop:');
console.log(list.pop());
list.printList();
console.log('---');

console.log('Unshift 99:');
list.unshift(99);
list.printList();
console.log('---');

console.log('Shift:');
console.log(list.shift());
list.printList();
console.log('---');

console.log('Get index 2:', list.get(2));
console.log('Set index 2 to 42:', list.set(42, 2));
list.printList();
console.log('---');

console.log('Insert 77 at index 2:');
list.insert(77, 2);
list.printList();
console.log('---');

console.log('Remove at index 2:');
console.log(list.remove(2));
list.printList();
console.log('---');

console.log('Find middle node:');
console.log(list.findMiddleNode());
console.log('---');

console.log('Has loop:', list.hasLoop());
console.log('---');

console.log('Add duplicates and removeDuplicates:');
list.push(2);
list.push(2);
list.push(3);
list.printList();
list.removeDuplicates();
console.log('After removeDuplicates:');
list.printList();
console.log('---');

console.log('Binary to decimal:');
const binList = new LinkedList<number>();
[1, 0, 1, 1].forEach(v => binList.push(v));
binList.printList();
console.log('Decimal:', binList.binaryToDecimal());
console.log('---');

console.log('Partition list around 4:');
const partList = new LinkedList<number>();
[1, 4, 3, 2, 5, 2].forEach(v => partList.push(v));
partList.printList();
partList.partitionList(4);
console.log('After partition:');
partList.printList();
console.log('---');

console.log('Reverse between 1 and 3:');
const revList = new LinkedList<number>();
[1, 2, 3, 4, 5].forEach(v => revList.push(v));
revList.printList();
revList.reverseBetween(1, 3);
console.log('After reverseBetween:');
revList.printList();
console.log('---');

console.log('Swap pairs:');
const swapList = new LinkedList<number>();
[1, 2, 3, 4].forEach(v => swapList.push(v));
swapList.printList();
swapList.swapPairs();
console.log('After swapPairs:');
swapList.printList();
console.log('---');