// thaw-reversi-web-service/src/app.js

// A Web server that makes the functionality in the Reversi engine in thaw-reversi-engine available as a Web service.

'use strict';

const gameEngine = require('thaw-reversi-engine');

module.exports = router => {
	router.get('/:board([EXO]{64})/:player([XO])/:maxPly([0-9]{1})', (req, res) => {
		// Global replace in string: See https://stackoverflow.com/questions/38466499/how-to-replace-all-to-in-nodejs
		const boardString = req.params.board.replace(/E/g, ' ');		// Replaces all 'E' with ' '.
		const maxPly = parseInt(req.params.maxPly, 10);

		try {
			const result = gameEngine.findBestMove(boardString, req.params.player, maxPly);

			res.json(result);
		} catch (error) {
			// For a description of the Node.js Error class, see https://nodejs.org/api/errors.html#errors_class_error
			res.status(500).send(error.message);
		}
	});
};

// End of File.
