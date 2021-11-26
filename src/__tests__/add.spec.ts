import { add } from "../add";

describe("add", () => {
	it("adds positive numbers", () => {
		expect(add(3, 4)).toEqual(7);
	});
});
