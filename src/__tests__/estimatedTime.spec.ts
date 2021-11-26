import { estimateTime } from "../estimateTime";

describe("estimatedTime", () => {
	it("example 1", () => {
		const result = estimateTime("2021-01-10T01:30:00.000Z", "2021-01-10T02:02:23.000Z", "2021-01-10T05:07:22.000Z");

		const expected = "30min - 2h";
		expect(result).toEqual(expected);
	});

	it("example 2", () => {
		const result = estimateTime("2021-01-10T01:30:00.000Z", "2021-01-10T02:01:11.000Z", "2021-01-10T02:04:22.000Z");

		const expected = "30min";
		expect(result).toEqual(expected);
	});

	it("example 3", () => {
		const result = estimateTime("2021-01-10T01:30:00.000Z", "2021-01-10T00:02:23.000Z", "2021-01-10T02:07:22.000Z");

		const expected = "35min";
		expect(result).toEqual(expected);
	});

	it("example 4", () => {
		const result = estimateTime("2021-01-10T01:30:00.000Z", "2021-01-10T00:02:23.000Z", "2021-01-10T00:57:22.000Z");

		const expected = "as soon as possible";
		expect(result).toEqual(expected);
	});
});
