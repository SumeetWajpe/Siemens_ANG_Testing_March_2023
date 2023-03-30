describe("A suite for spying", function () {
  beforeEach(function () {
    this.increment = function (x, y) {
      console.log("Within Increment");
      return x + 1;
    };
    spyOn(this, "increment");
  });

  xit("spying on increment - if it is called", function () {
    let result = this.increment(20);
    expect(this.increment).toHaveBeenCalled();
    expect(result).toBe(undefined);
  });
  xit("spying on increment - if it has returned a value ", function () {
    this.increment.and.callThrough();
    let result = this.increment(20);
    console.log(result);
    expect(this.increment).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
  xit("spying on increment - if it called with value 20 ", function () {
    // this.increment.and.callThrough();
    this.increment(10);

    // expect(this.increment).toHaveBeenCalledWith(20);
    expect(this.increment).toHaveBeenCalledWith(jasmine.any(Number));
  });

  xit("spying on increment - with a fakeCall (Mock function)", function () {
    this.increment.and.callFake(function (y) {
      return y * 2;
    });
    let result = this.increment(20);
    expect(result).toBe(40);
  });

  xit("spying on increment - no of invocations", function () {
    this.increment(20);
    this.increment(20);
    this.increment(20);
    this.increment(20);
    this.increment(20);

    expect(this.increment.calls.count()).toBe(5);
  });

  it("spying on increment - called with argument", function () {
    this.increment(20, 30);

    expect(this.increment.calls.argsFor(0)[1]).toBe(30);
  });
});
