xdescribe("test suites for commonMatchers", () => {
  it("toMatch - regEx", () => {
    expect("Good Day !").toMatch(/Good/i);
  });

  it("toContain - To find substring", () => {
    expect("Good Day !").toContain("Good");
  });

  it("toBeUndefined", () => {
    let x;
    expect(x).toBeUndefined();
  });

  it("toBe: ===", () => {
    // expect("60").toBe(60);
    expect({ name: "Sumeet" }).toBe({ name: "Sumeet" });
  });

  it("toEquals: ===  + object Inspection", () => {
    // expect("60").toBe(60);
    // expect({ name: "Sumeet" }).toEqual({ name: "Sumeet" });// passes

    expect({ name: "Sumeet" }).toEqual({ name: "Sumit" }); // fails
  });
});
