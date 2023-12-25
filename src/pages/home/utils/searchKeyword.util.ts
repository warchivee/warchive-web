class ArrayHandler<T> {
  private array: T[];

  constructor(array: T[] = []) {
    this.array = array;
  }

  delete(item: T): void {
    const index = this.array.indexOf(item);

    if (index !== -1) {
      this.array.splice(index, 1);
    }
  }

  add(item: T): void {
    this.array.push(item);
  }

  get(index: number): T {
    return this.array[index];
  }

  getArray(): T[] {
    return this.array;
  }
}

export default ArrayHandler;
