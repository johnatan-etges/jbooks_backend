function UmMaisUmEhDois() {
  return 1 + 1 === 2;
}

describe("teste", () => {
  it("should return true if 1 + 1 = 2", () => {
    expect(UmMaisUmEhDois()).toBe(true);
  });
});