xdescribe("A suite is just a function", function () {
  let a;
  let b;

  it("tests if a is true", function () {
    a = true;

    expect(a).toBe(true);
  });

  it("tests for b to be also true", function () {
    b = true;

    expect(b).toBe(true);
  });
});
