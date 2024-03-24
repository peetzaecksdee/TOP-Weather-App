function getUnits(unit) {
	return unit === 'metric' ? 'C' : 'F';
}

/**
 * 
 * @param {metric, imperial} unit Target Unit
 * @param {number} temp 
 * @returns 
 */
function convertUnits(unit, temp) {
	if (unit === 'metric') {
		return ((temp - 32) / 1.79999999).toFixed(2);
	}
	
	return ((temp * 1.79999999) + 32).toFixed(2);
}

export { getUnits, convertUnits };
