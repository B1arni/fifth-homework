'use strict';

const STACK_OVERLOAD_ERROR = new Error('Стек переполнен');
const STACK_EMPTY_ERROR = new Error('Стек пуст');
const NOT_ITERABLE_ERROR = new Error('Не итерируемая сущность');

class Stack {
  constructor(stackSize = 10) {
    this.stackSize = stackSize;
    this.lastElement = null;
    this.currentStackSize = 0;
  }

  push(newElement) {
    if (this.currentStackSize < this.stackSize) {
      ++this.currentStackSize;
    } else {
      throw STACK_OVERLOAD_ERROR;
    }

    const previousElement = this.lastElement;
    const element = { previousElement, newElement };
    this.lastElement = element;
  }

  pop() {
    if (this.lastElement !== null) {
      --this.currentStackSize;
    } else {
      throw STACK_EMPTY_ERROR;
    }

    const element = this.lastElement;
    this.lastElement = element.previousElement;

    return element.newElement;
  }

  peek() {
    const element = this.lastElement;

    if (!element) {
      return null;
    }

    return element.newElement;
  }

  isEmpty() {
    if (this.lastElement === null) {
      return true;
    }

    return false;
  }

  toArray() {
    let resultArray = [];
    while (this.lastElement !== null) {
      resultArray = [this.pop(), ...resultArray];
    }

    return resultArray;
  }

  static fromIterable(iterable) {
    const currentIterable = Array.from(iterable);

    if (!currentIterable.length) {
      throw NOT_ITERABLE_ERROR;
    }

    let result = new this(currentIterable.length);
    for (let i = 0; i < currentIterable.length; i++) {
      result.push(currentIterable[i]);
    }

    return result;
  }
}

module.exports = { Stack };
