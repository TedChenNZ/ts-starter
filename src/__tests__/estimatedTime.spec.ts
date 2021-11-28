import { getReadableWaitTimeEstimate } from "../estimateTime";

describe("estimatedTime", () => {
	it("example 1", () => {
		const result = getReadableWaitTimeEstimate(
			"2021-01-10T01:30:00.000Z",
			"2021-01-10T02:02:23.000Z",
			"2021-01-10T05:07:22.000Z",
		);

		const expected = "30min - 2h";
		expect(result).toEqual(expected);
	});

	it("example 2", () => {
		const result = getReadableWaitTimeEstimate(
			"2021-01-10T01:30:00.000Z",
			"2021-01-10T02:01:11.000Z",
			"2021-01-10T02:04:22.000Z",
		);

		const expected = "30min";
		expect(result).toEqual(expected);
	});

	it("example 3", () => {
		const result = getReadableWaitTimeEstimate(
			"2021-01-10T01:30:00.000Z",
			"2021-01-10T00:02:23.000Z",
			"2021-01-10T02:07:22.000Z",
		);

		const expected = "35min";
		expect(result).toEqual(expected);
	});

	it("example 4", () => {
		const result = getReadableWaitTimeEstimate(
			"2021-01-10T01:30:00.000Z",
			"2021-01-10T00:02:23.000Z",
			"2021-01-10T00:57:22.000Z",
		);

		const expected = "as soon as possible";
		expect(result).toEqual(expected);
	});

	it("same time", () => {
		const result = getReadableWaitTimeEstimate(
			"2021-01-10T01:30:00.000Z",
			"2021-01-10T05:07:22.000Z",
			"2021-01-10T05:07:22.000Z",
		);

		const expected = "2h";
		expect(result).toEqual(expected);
	});

	it("both only hours", () => {
		const result = getReadableWaitTimeEstimate(
			"2021-01-10T03:07:00.000Z",
			"2021-01-10T04:07:22.000Z",
			"2021-01-10T05:07:22.000Z",
		);

		const expected = "1 - 2h";
		expect(result).toEqual(expected);
	});

	it("both only minutes", () => {
		const result = getReadableWaitTimeEstimate(
			"2021-01-10T01:30:00.000Z",
			"2021-01-10T01:35:23.000Z",
			"2021-01-10T01:54:22.000Z",
		);

		const expected = "5 - 20min";
		expect(result).toEqual(expected);
	});

	it("has both hours and minutes", () => {
		const result = getReadableWaitTimeEstimate(
			"2021-01-10T01:30:00.000Z",
			"2021-01-10T02:35:23.000Z",
			"2021-01-10T02:54:22.000Z",
		);

		const expected = "1h 5min - 1h 20min";
		expect(result).toEqual(expected);
	});
	it("lower has minutes upper has hour and minutes", () => {
		const result = getReadableWaitTimeEstimate(
			"2021-01-10T01:30:00.000Z",
			"2021-01-10T01:40:23.000Z",
			"2021-01-10T02:54:22.000Z",
		);

		const expected = "10min - 1h 20min";
		expect(result).toEqual(expected);
	});

	it("if lower in past, only show upper", () => {
		const result = getReadableWaitTimeEstimate(
			"2021-01-10T01:30:00.000Z",
			"2021-01-09T01:40:23.000Z",
			"2021-01-10T02:54:22.000Z",
		);

		const expected = "1h 20min";
		expect(result).toEqual(expected);
	});
	it("if lower and upper in past, show asap", () => {
		const result = getReadableWaitTimeEstimate(
			"2021-01-10T01:30:00.000Z",
			"2021-01-09T01:40:23.000Z",
			"2021-01-09T02:54:22.000Z",
		);

		const expected = "as soon as possible";
		expect(result).toEqual(expected);
	});
});
