class DynamicObject<T = unknown> {
  private fields: Record<string, T>;

  constructor() {
    this.fields = {} as Record<string, T>;
  }

  addField(key: string, value: T): void {
    this.fields[key] = value;
  }

  removeField(key: string): void {
    delete this.fields[key];
  }

  getField(key: string): T | undefined {
    return this.fields[key];
  }

  getAllFields(): Record<string, T> {
    return this.fields;
  }
}

export default DynamicObject;
