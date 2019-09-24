// thaw-reversi-web-service/test/app_spec.js

'use strict';

// Use chai and chai-http to test our app.
// See https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html

// **** BEGIN : Construct an Express app that contains a router that has our game engine in it ****
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const router = express.Router();				// eslint-disable-line new-cap

require('..')(router);

app.use('/reversi', router);
// **** END : Construct an Express app that contains a router that has our game engine in it ****

const engine = require('thaw-reversi-engine');
/*
const testDescriptors = [
	{
		name: 'SmokeTest00Bogus',
		// . . .
		// . . .
		// . . .
		// boardString: '        ' + '        ' + '        ' + '   XO   ' + '   OX   ' + '        ' + '        ' + '        ',
		// boardString: engine.createInitialBoard().replace(/ /g, 'E'),
		boardString: engine.createInitialState().boardAsString.replace(/ /g, 'E'),
		player: 'X',
		maxPly: 5,
		verificationFunction: (engine, expect, result) => {
			// expect(result.bestScore).to.satisfy(bestScore => bestScore < engine.victoryScore);
			// expect(result.bestScore).to.satisfy(bestScore => bestScore > engine.defeatScore);
			console.log('SmokeTest00Bogus result:', result);
			expect(result).is.not.null;	// eslint-disable-line no-unused-expressions
			expect(result.bestRow).is.not.null;	// eslint-disable-line no-unused-expressions
			expect(result.bestColumn).is.not.null;	// eslint-disable-line no-unused-expressions
			expect(result.bestScore).to.equal(3);
			expect(result.bestMoves).to.be.deep.equal([
				{ row: 2, column: 4 },
				{ row: 3, column: 5 },
				{ row: 4, column: 2 },
				{ row: 5, column: 3 }
			]);
		}
	}
];
 */

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('App', () => {
	engine.testDescriptors.filter(t => !t.doNotTestThroughWebService).forEach(testDescriptor => {
		describe(testDescriptor.name, () => {
			it('Rocks!', done => {
				// Arrange
				const initialData = testDescriptor.arrangeFunction(engine);
				// const url = '/reversi/' + testDescriptor.boardString.replace(/ /g, 'E') + '/' + testDescriptor.player + '/' + testDescriptor.maxPly;
				const url = `/reversi/${initialData.boardAsString}/${initialData.player}/${initialData.maxPly}`;

				// Act
				chai.request(app).get(url).end((error, result) => {
					// Assert

					if (error) {
						console.error(`Error in test ${testDescriptor.name} :`, error);
						//expect(testDescriptor.errorHandlingFunction).to.be.not.null;	// eslint-disable-line no-unused-expressions
						// testDescriptor.errorHandlingFunction(engine, expect, error);
						// testDescriptor.errorHandlingFunction(engine, expect, result.error.text);
					} else {
						expect(error).to.be.null;										// eslint-disable-line no-unused-expressions
						expect(result).to.be.not.null;									// eslint-disable-line no-unused-expressions
						expect(result.body).to.be.not.null;								// eslint-disable-line no-unused-expressions
						expect(testDescriptor.verificationFunction).to.be.not.null;		// eslint-disable-line no-unused-expressions
						// console.log('chai request get result:', result);
						testDescriptor.assertFunction(engine, initialData, expect, result.body);
					}

					done();
				});
			});
		});
	});
});
