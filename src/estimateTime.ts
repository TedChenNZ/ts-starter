/**
 * Assumptions
 * - inputs are all correct
 * - the upperWaitTimestamp is always more in the future than the lowerWaitTimestamp
 */
export function getReadableWaitTimeEstimate(
	currentTimestamp: string,
	lowerWaitTimestamp: string,
	upperWaitTimestamp: string,
): string {
	const current = new Date(currentTimestamp);
	const lower = new Date(lowerWaitTimestamp);
	const upper = new Date(upperWaitTimestamp);

	const lowerEstimate = lower.getTime() - current.getTime();
	const lowerTimes = convertMSToRoundedAndCappedTime(lowerEstimate);

	const upperEstimate = upper.getTime() - current.getTime();
	const upperTimes = convertMSToRoundedAndCappedTime(upperEstimate);

	return getReadableTimeRange(lowerTimes, upperTimes);
}

/**
 * Readable time as hours and minutes
 */
interface ITime {
	hours: number;
	minutes: number;
}

/**
 * Rounds, caps, and returns ITime
 * @param milliseconds
 */
function convertMSToRoundedAndCappedTime(milliseconds: number): ITime {
	const rounded = roundToNearest(milliseconds, 1000 * 60 * 5); // 5 minutes
	const capped = capAtMax(rounded, 1000 * 60 * 60 * 2); // 2 hours
	return getTime(capped);
}

function roundToNearest(number: number, roundTo: number): number {
	return roundTo * Math.floor(number / roundTo);
}

function capAtMax(number: number, max: number): number {
	return number > max ? max : number;
}

function getTime(ms: number): ITime {
	const minuteInMS = 1000 * 60;
	const hourInMS = minuteInMS * 60;

	const hours = Math.floor(ms / hourInMS);
	const minutes = (hours ? ms - hours * hourInMS : ms) / minuteInMS;
	return { hours, minutes };
}

function getReadableSingleTime(time: ITime): string {
	const words: string[] = [];
	if (time.hours > 0) {
		words.push(`${time.hours}h`);
	}
	if (time.minutes > 0) {
		words.push(`${time.minutes}min`);
	}
	return words.join(" ");
}

function getReadableTimeRange(lower: ITime, upper: ITime): string {
	const isLowerInPast = lower.hours < 0 || lower.minutes < 0;
	const isUpperInPast = upper.hours < 0 || upper.hours < 0;

	// Return ‘as soon as possible’ if both the lower and upper estimates are in the past
	if (isLowerInPast && isUpperInPast) {
		return "as soon as possible";
	}

	// Only display the upper estimate value if the lower estimate value is in the past
	if (isLowerInPast) {
		return getReadableSingleTime(upper);
	}

	// If the lower and upper estimates are the same, just display lower
	if (lower.hours === upper.hours && lower.minutes === upper.minutes) {
		return getReadableSingleTime(lower);
	}

	// If both estimates are in hours, only show h once
	if (!lower.hours && !upper.hours) {
		return `${lower.minutes} - ${upper.minutes}min`;
	}

	// If both estimates are in minutes, only show min once
	if (!lower.minutes && !upper.minutes) {
		return `${lower.hours} - ${upper.hours}h`;
	}

	return `${getReadableSingleTime(lower)} - ${getReadableSingleTime(upper)}`;
}
