export function estimateTime(currentTimestamp: string, lowerWaitTimestamp: string, upperWaitTimestamp: string): string {
	const current = new Date(currentTimestamp);
	const lower = new Date(lowerWaitTimestamp);
	const upper = new Date(upperWaitTimestamp);

	const lowerEstimate = lower.getTime() - current.getTime();
	const lowerTimes = convertMSToRoundedAndCappedTime(lowerEstimate);

	const upperEstimate = upper.getTime() - current.getTime();
	const upperTimes = convertMSToRoundedAndCappedTime(upperEstimate);

	if (lowerTimes.totalMilliseconds === upperTimes.totalMilliseconds) {
		return displaySingleTime(lowerTimes);
	}

	if (isBefore(lower, current)) {
		if (isBefore(upper, current)) {
			return "as soon as possible";
		}
		return displaySingleTime(upperTimes);
	}

	return displayLowerUpperTimes(lowerTimes, upperTimes);
}

/**
 * Returns whether or not the first date is before the second date
 * @param date
 * @param dateToCompare
 * @returns
 */
function isBefore(date: Date, dateToCompare: Date): boolean {
	return date.getTime() - dateToCompare.getTime() < 0;
}

interface ITime {
	hours: number;
	minutes: number;
	totalMilliseconds: number;
}

/**
 * Rounds, caps, and returns as in hour and string
 * @param ms
 */
function convertMSToRoundedAndCappedTime(ms: number): ITime {
	const rounded = roundToNearest(ms, 1000 * 60 * 5); // 5 minutes
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
	return { hours, minutes, totalMilliseconds: ms };
}

function displaySingleTime(time: ITime): string {
	const words: string[] = [];
	if (time.hours > 0) {
		words.push(`${time.hours}h`);
	}
	if (time.minutes > 0) {
		words.push(`${time.minutes}min`);
	}
	return words.join(" ");
}

function displayLowerUpperTimes(lower: ITime, upper: ITime): string {
	if (!lower.hours && !upper.hours) {
		return `${lower.minutes} - ${upper.minutes}min`;
	}
	if (!lower.minutes && !upper.minutes) {
		return `${lower.hours} - ${upper.hours}h`;
	}
	return `${displaySingleTime(lower)} - ${displaySingleTime(upper)}`;
}
