REPORTER = nyan
MOCHA_OPTS = --ui bdd

mocha:
	clear
	echo Starting test *********************************************************
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	test/*.js
	echo Ending test

console:
	node -e \
	'var mongoose = require("mongoose"); \
	mongoose.connect("mongodb://admin:upstarter@ds041157.mongolab.com:41157/upstarter"); \
	var Startup = require("./models/startups"); \
	repl = require("repl").start("> "); \
	console.log("Loaded with Mongoose ORM methods available, press enter to continue");'

startseed:
	curl "http://upstarter-server.herokuapp.com/startups/seed"

restartseed:
	node -e 'process.exit(0)'
	curl "http://upstarter-server.herokuapp.com/startups/seed"