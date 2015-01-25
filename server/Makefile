REPORTER = nyan
MOCHA_OPTS = --ui bdd

test:
	clear
	echo Starting test *********************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	tests/*.js
	echo Ending test

console:
	node -e \
	'var mongoose = require("mongoose"); \
	mongoose.connect("mongodb://admin:upstarter@ds041157.mongolab.com:41157/upstarter"); \
	var Startup = require("./models/startups"); \
	repl = require("repl").start("> "); \
	console.log("Loaded with Mongoose ORM methods available, press enter to continue");'