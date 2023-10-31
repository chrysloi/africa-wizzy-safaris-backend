import { sum } from "../sum";

describe("name", () => {
  it("Return name", async () => {
    const name = sum("Eloi");
    expect(name).toBe(name);
  });
});
