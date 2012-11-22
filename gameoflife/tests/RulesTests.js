(function () {
	module("Live Cell Rules");
	var liveCellRule = new LiveCellRule();
	test("Live cell with fewer than two neighbours dies", function() {    
	    equal(liveCellRule.isAlive(1), false);    
	});

	test("Live cell with two neighbours lives", function() {    
	    equal(liveCellRule.isAlive(2), true);
	});

	test("Live cell with three neighbours lives", function() {    
	    equal(liveCellRule.isAlive(3), true);
	});

	test("Live cell with more than three neighbours dies", function() {    
	    equal(liveCellRule.isAlive(4), false);
	});

	module("Dead Cell Rules");
	var deadCellRule = new DeadCellRule();
	test("Dead cell with three neighbours lives", function() {    
	    equal(deadCellRule.isAlive(3), true);
	});

	test("Dead cell with two neighbours stays dead", function() {    
	    equal(deadCellRule.isAlive(2), false);
	});
}());