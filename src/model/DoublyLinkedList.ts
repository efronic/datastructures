export interface NodeType<T> {
    value: T;
    next: NodeType<T> | null;
    prev: NodeType<T> | null;
}

export class Node<T> {
    value: T;
    next: Node<T> | null;
    prev: Node<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}
export class DoublyLinkedList<T> {
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
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
        return;
    }

    pop(): Node<T> | undefined {
        if (this.length == 0) return undefined;
        let temp = this.tail;
        if (!temp) return undefined;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = temp.prev;
            this.tail!.next = null;
            temp.prev = null;
        }
        this.length--;
        return temp;
    }

    unshift(value: T) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        if (!this.head) {
            this.tail = newNode;
            this.head = newNode;
        } else {
            newNode.next! = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
        return this;
    }

    shift() {
        if (this.length == 0) return undefined;
        let current = this.head;
        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head!.next;
            this.head!.prev = null;
            current!.next = null;
        }
        this.length--;
        return current;

    }

    get(index: number) {
        if (index < 0 || index >= this.length) return undefined;
        let current = this.head;
        if (index < this.length / 2) {
            for (let i = 0; i < index; i++) {
                current = current!.next;
            }
        } else {
            current = this.tail;
            for (let i = this.length - 1; i > index; i--) {
                current = current!.prev;
            }
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
        const before = this.get(index - 1);
        const after = before!.next;
        before!.next = newNode;
        newNode.prev = before!;
        newNode.next = after;
        after!.prev = newNode;

        this.length++;
        return true;
    }

    remove(index: number) {
        if (index >= this.length || index < 0) return false;
        if (this.length === 0) return false;
        if (index === 0) return this.shift();
        if (index === this.length - 1) return this.pop();

        let current = this.get(index);

        current!.prev!.next = current!.next;
        current!.next!.prev = current!.prev;

        current!.next = null;
        current!.prev = null;

        this.length--;
        return current;
    }
    isPalindrome() {
        if (!this.head || !this.tail) return true;
        if (this.length === 0 || this.length === 1) return true;

        let result = false;
        if (this.length === 2) {
            if (this.head.value === this.tail.value) return true;
            else return false;
        }
        for (let i = 0; i < this.length / 2; i++) {
            let headTemp = this.head;
            let tailTemp = this.tail;

            if (headTemp.value === tailTemp.value) result = true;
            else result = false;
            headTemp = headTemp.next!;
            tailTemp = tailTemp.prev!;
        }
        return result;
    }

    reverse() {
        let current = this.head;
        let temp: Node<T> | null = null;
        // Swap next and prev for all nodes
        while (current) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }
        // Swap head and tail
        if (temp) {
            this.tail = this.head;
            this.head = temp.prev;
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

