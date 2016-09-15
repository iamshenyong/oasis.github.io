var ls;
(function (ls) {
    var AIEvent = (function (_super) {
        __extends(AIEvent, _super);
        function AIEvent() {
            _super.apply(this, arguments);
            //事件索引
            this.index = 0;
        }
        var d = __define,c=AIEvent,p=c.prototype;
        return AIEvent;
    }(ls.BaseEvent));
    ls.AIEvent = AIEvent;
    egret.registerClass(AIEvent,'ls.AIEvent');
})(ls || (ls = {}));
//# sourceMappingURL=AIEvent.js.map