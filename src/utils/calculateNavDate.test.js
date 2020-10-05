import { getNavRows } from "./calculateNavData";
import { navData, horizon, investmentPeriod, navResults } from "./testData";

describe("Testing getNavRows function", () => {
  test("Check if results are as expected", () => {
    const result = getNavRows({ navData, horizon, investmentPeriod });
    expect(result).toEqual(navResults);
  });
});
