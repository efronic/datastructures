export interface NodeType<T> {
    value: T;
    next: NodeType<T> | null;
}

export class Node<T> {
    value: T;
    next: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}
export class LinkedList<T> {
    head: Node<T> | null = null;
    tail: Node<T> | null = null;
    length: number = 0;
    constructor(node?: Node<T>) {
        if (node) {
            this.head = node;
            this.tail = node;
            this.length = 1;
        }
    }
    printList(): void {
        let current = this.head;
        if (!current) return console.log("List is empty");
        while (current) {
            console.log('Node: ', current.value);
            current = current.next;
        }
    }

    getHead() {
        if (this.head) console.log('Head: ', this.head.value);
        else console.log('Head: No head');
    }
    getTail() {
        if (this.tail) console.log('Tail: ', this.tail.value);
        else console.log('Tail: No Tail');
    }
    getLength() {
        console.log('Length: ', this.length);
    }

    makeEmpty() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value: T) {
        const newNode = new Node(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        this.length++;
        return;
    }

    pop(): Node<T> | undefined {
        if (this.length == 0) return undefined;
        let prev: Node<T> | null;
        let current = this.head;

        while (current && current.next) {
            prev = current;
            current = current!.next;
        }

        this.length--;
        this.tail = prev!;
        this.tail.next = null;

        if (this.length == 0) {
            this.head = null;
            this.tail = null;
        }

        return current!;
    }

    unshift(value: T) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        if (!this.head)
            this.tail = newNode;
        this.length++;
        return this;
    }
    shift() {
        if (this.length == 0) return undefined;
        let current = null;
        current = this.head;
        this.head = this.head!.next;
        current!.next = null;
        this.length--;
        if (this.length == 0) {
            this.tail = null;
        }
        return current;
    }
    get(index: number) {
        if (index < 0 || index >= this.length) return undefined;
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current!.next;
        }
        return current;
    }
    set(value: T, index: number) {
        let current = this.get(index);
        if (current) {
            current.value = value;
            return true;
        }
        return false;
    }

    insert(value: T, index: number) {
        if (index > this.length || index < 0) return false;
        if (index === this.length) return this.push(value);
        if (index === 0) return this.unshift(value);

        const newNode = new Node(value);
        let current = this.get(index - 1);
        newNode.next = current!.next;
        current!.next = newNode;
        this.length++;
        return true;
    }

    remove(index: number) {
        if (index > this.length || index < 0) return false;
        if (this.length === 0) return false;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();

        let before = this.get(index - 1);
        let current = before!.next;

        before!.next = current!.next;
        current!.next = null;
        this.length--;
        return current;
    }

    reverse() {
        let temp = this.head;
        this.head = this.tail;
        this.tail = temp;

        let prev = null;
        for (let i = 0; i < this.length; i++) {
            let next = temp!.next;
            temp!.next = prev;
            prev = temp;
            temp = next;

        }
        return this;
    }
    findMiddleNode(): Node<T> | null {
        if (!this.head) return null;
        let slow = this.head;
        let fast: Node<T> | null = this.head!;

        while (fast && fast.next) {
            slow = slow.next!;
            fast = fast!.next!.next;
        }
        return slow;
    }
    hasLoop() {
        if (!this.head) return false;
        let slow = this.head!;
        let fast = this.head!;

        while (fast && fast.next) {
            slow = slow.next!;
            fast = fast.next!.next!;
            if (slow === fast) {
                return true;
            }
        }
        return false;

    }
    removeDuplicates() {
        const seen = new Set();
        let prev = null;
        let current = this.head;

        while (current !== null) {
            if (seen.has(current.value)) {
                // Duplicate found, skip this node
                prev!.next = current.next;
                this.length--; // Decrement the length
            } else {
                // First time seeing this value, add to set
                seen.add(current.value);
                prev = current; // Move prev forward
            }
            current = current.next; // Move current forward
        }
    }
    binaryToDecimal() {
        let current = this.head;
        let decimalValue = 0;
        while (current) {
            if (
                typeof current.value !== 'number' ||
                !Number.isInteger(current.value) ||
                (current.value !== 0 && current.value !== 1)
            ) {
                throw new Error('LinkedList is not a binary linked list. All values must be integers 0 or 1.');
            }
            decimalValue = decimalValue * 2 + current.value;
            current = current.next;
        }
        return decimalValue;
    }
    partitionList(x: number): void {
        const dummy1 = new Node<T>(0 as T);
        const dummy2 = new Node<T>(0 as T);

        let prev1 = dummy1;
        let prev2 = dummy2;
        let current = this.head;

        while (current !== null) {
            const nextNode = current.next;
            current.next = null;

            if (typeof current.value === "number" && current.value < x) {
                prev1.next = current;
                prev1 = prev1.next;
            } else {
                prev2.next = current;
                prev2 = prev2.next;
            }

            current = nextNode;
        }

        prev1.next = dummy2.next;
        this.head = dummy1.next;
    }


    reverseBetween(m: number, n: number): void {
        if (this.head === null || m === n) return;

        const dummy = new Node<T>(0 as T); // Need a dummy with default generic
        dummy.next = this.head;
        let prev: Node<T> = dummy;

        for (let i = 0; i < m; i++) {
            if (!prev.next) return;
            prev = prev.next;
        }

        let current = prev.next!;
        for (let i = 0; i < n - m; i++) {
            const nodeToMove = current.next!;
            current.next = nodeToMove.next;
            nodeToMove.next = prev.next;
            prev.next = nodeToMove;
        }

        this.head = dummy.next;
    }


    swapPairs(): void {
        const dummy = new Node<T>(0 as T);
        dummy.next = this.head;

        let prev = dummy;

        while (prev.next && prev.next.next) {
            const first = prev.next;
            const second = first.next!;

            first.next = second.next;
            second.next = first;
            prev.next = second;
            prev = first;
        }

        this.head = dummy.next;
    }

}

