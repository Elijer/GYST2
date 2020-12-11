var symbols = require('../');

describe('Symbol helpers', function() {
	it('Should detect vovels', function() {
		'eyuioa'.split('').forEach(function(letter) {
			symbols.is_vovel(letter).should.be.ok;
		});
	});

	it('Should detect vovels', function() {
		'qwrtpasdfghjklmnbvcxz'.split('').forEach(function(letter) {
			symbols.is_consonant(letter).should.be.ok;
		});
	});
});
