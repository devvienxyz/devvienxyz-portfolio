import deepFreeze from "./deep-freeze";

describe("deepFreeze", () => {
  it("should freeze a simple object", () => {
    const obj = { a: 1, b: 2 };
    const frozenObj = deepFreeze(obj);

    expect(Object.isFrozen(frozenObj)).toBe(true);
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    expect(() => (frozenObj.a = 3)).toThrow();
  });

  it("should freeze a nested object", () => {
    const obj = { a: { b: { c: 1 } } };
    const frozenObj = deepFreeze(obj);

    expect(Object.isFrozen(frozenObj)).toBe(true);
    expect(Object.isFrozen(frozenObj.a)).toBe(true);
    expect(Object.isFrozen(frozenObj.a.b)).toBe(true);
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    expect(() => (frozenObj.a.b.c = 2)).toThrow();
  });

  it("should freeze an array", () => {
    const arr = [1, 2, 3];
    const frozenArr = deepFreeze(arr);

    expect(Object.isFrozen(frozenArr)).toBe(true);
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    expect(() => (frozenArr[0] = 4)).toThrow();
  });

  it("should freeze an array with objects", () => {
    const arr = [{ a: 1 }, { b: 2 }];
    const frozenArr = deepFreeze(arr);

    expect(Object.isFrozen(frozenArr)).toBe(true);
    expect(Object.isFrozen(frozenArr[0])).toBe(true);
    expect(Object.isFrozen(frozenArr[1])).toBe(true);
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    expect(() => (frozenArr[0].a = 3)).toThrow();
  });

  it("should handle null and undefined gracefully", () => {
    expect(deepFreeze(null)).toBe(null);
    expect(deepFreeze(undefined)).toBe(undefined);
  });

  it("should handle primitive values gracefully", () => {
    expect(deepFreeze(42)).toBe(42);
    expect(deepFreeze("string")).toBe("string");
    expect(deepFreeze(true)).toBe(true);
  });
});
