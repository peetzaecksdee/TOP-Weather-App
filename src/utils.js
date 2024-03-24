/**
 * Get the name for the unit
 * @param {C | F} unit
 */
function getUnits(unit) {
	return unit === 'C' ? 'metric' : 'imperial';
}

/**
 * 
 * @param {C | F} unit Target Unit
 * @param {number} temp 
 * @returns 
 */
function convertUnits(unit, temp) {
	if (unit === 'C') {
		return ((temp - 32) / 1.79999999).toFixed(2);
	}
	
	return ((temp * 1.79999999) + 32).toFixed(2);
}

export { getUnits, convertUnits };
