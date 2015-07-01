'use strict';

function formatCommandLine(line) {
	return line.trim().replace(/, /g, ',').split(' ');
}

module.exports = {
	formatCommandLine: formatCommandLine
};