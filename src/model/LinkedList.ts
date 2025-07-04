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
}

