var ls;
(function (ls) {
    var ScrollToBehavior = (function (_super) {
        __extends(ScrollToBehavior, _super);
        function ScrollToBehavior() {
            _super.call(this);
        }
        var d = __define,c=ScrollToBehavior,p=c.prototype;
        p.onCreate = function () {
        };
        p.tick = function () {
            if (!this.inst)
                return;
            var now = egret.getTimer();
            var offx = 0;
            var offy = 0;
            if (now >= this._shakeStart && now < this._shakeEnd) {
                var mag = this._magnitude;
                //衰减幅度
                if (this._mode === 1)
                    mag *= 1 - (now - this._shakeStart) / (this._shakeEnd - this._shakeStart);
                var r = Math.random() * Math.PI * 2;
                var d = Math.random() * mag;
                offx = Math.cos(r) * d;
                offy = Math.sin(r) * d;
            }
            //暂时获取1个实例的位置
            //EgretWorld.getInstance().scrollToX(this.inst.x / (1 + offx));
            //EgretWorld.getInstance().scrollToY(this.inst.y / (1 + offy));
            ls.World.getInstance().scrollToTarget(this.inst);
        };
        p.saveToJSON = function () {
            return {
                "enabled": this.enabled,
                "name": this.name,
                "paramInstances": this.paramInstances
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.enabled = o["enabled"];
                this.name = o["name"];
                this.paramInstances = o["paramInstances"];
            }
        };
        p.shake = function (magnitude, duration, mode) {
            this._magnitude = ls.eval_e(magnitude);
            this._duration = ls.eval_e(duration);
            this._mode = ls.eval_e(mode);
            this._shakeStart = egret.getTimer();
            this._shakeEnd = this._shakeStart + this._duration;
        };
        p.clone = function () {
            var bh = new ScrollToBehavior();
            bh.enabled = this.enabled;
            bh.name = this.name;
            return bh;
        };
        return ScrollToBehavior;
    }(ls.BaseBehavior));
    ls.ScrollToBehavior = ScrollToBehavior;
    egret.registerClass(ScrollToBehavior,'ls.ScrollToBehavior');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map