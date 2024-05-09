import tape from 'tape';

var foo = function () {
    return 'foo';
};
var uncovered = function () {
    return 'uncovered';
};
console.log(5);

tape('foo', function (_a) {
    var same = _a.same, end = _a.end;
    same(foo(), 'foo');
    end();
});
//# sourceMappingURL=index.mjs.map
