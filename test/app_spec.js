// thaw-reversi-web-service/test/app_spec.js

'use strict';

// Use chai and chai-http to test our app.
// See https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html

// **** BEGIN : Construct an Express app that contains a router that has our game engine in it ****
// TODO? : Use require('express-mixin') instead.
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const router = express.Router();				// eslint-disable-line new-cap

require('..')(router);

app.use('/reversi', router);
// **** END : Construct an Express app that contains a router that has our game engine in it ****

const engine = require('thaw-reversi-engine');

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
						testDescriptor.assertFunction(engine, initialData, expect, result.body);
					}

					done();
				});
			});
		});
	});
});
