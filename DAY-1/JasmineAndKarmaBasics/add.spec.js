function Add(x, y) {
  return x + y;
}

xdescribe("test suites for Add method", () => {
  it("adds two numbers", () => {
    // arrange
    let result;
    let mockResult = 50;
    // act
    result = Add(20, 30);
    // assert
    expect(result).toBe(mockResult);
  });
});
