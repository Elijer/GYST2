var vovels = 'eyuioa';
var consonants = 'qwrtpasdfghjklmnbvcxz';

module.exports.is_vovel = function(sym) {
	return vovels.indexOf(sym.toLowerCase()) !== -1;
};

module.exports.is_consonant = function(sym) {
	return consonants.indexOf(sym.toLowerCase()) !== -1;
};
