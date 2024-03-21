/**
 * Get the name for the unit
 * @param {C | F} unit
 */
function getUnits(unit) {
	return unit === 'C' ? 'metric' : 'imperial';
}

export { getUnits };
