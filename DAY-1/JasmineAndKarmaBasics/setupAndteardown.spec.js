xdescribe("A suite is just a function", function () {
  let cars;

  beforeAll(() => {
    console.log("beforeAll");
  });

  beforeEach(() => {
    console.log("beforeEach");
    cars = ["BMW", "AUDI", "FERRARI"];
  });

  it("checks for BMW to be present", function () {
    console.log("checks for BMW to be present");
    expect(cars).toContain("BMW");
  });
  it("checks length of cars to be 3", function () {
    console.log("checks length of cars to be 3");
    expect(cars.length).toBe(3);
  });

  afterEach(() => {
    console.log("afterEach");
  });
  afterAll(() => {
    console.log("afterAll");
  });
});
