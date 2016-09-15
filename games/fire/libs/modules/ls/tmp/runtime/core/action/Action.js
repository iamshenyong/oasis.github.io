'use strict';
var ls;
(function (ls) {
    var Action = (function (_super) {
        __extends(Action, _super);
        function Action() {
            _super.call(this);
            //动作索引
            this.index = 0;
            this.instances = {};
        }
        var d = __define,c=Action,p=c.prototype;
        return Action;
    }(ls.BaseClass));
    ls.Action = Action;
    egret.registerClass(Action,'ls.Action');
})(ls || (ls = {}));
//# sourceMappingURL=Action.js.map