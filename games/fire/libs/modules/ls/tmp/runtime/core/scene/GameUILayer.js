var ls;
(function (ls) {
    var GameUILayer = (function (_super) {
        __extends(GameUILayer, _super);
        function GameUILayer() {
            _super.call(this);
        }
        var d = __define,c=GameUILayer,p=c.prototype;
        GameUILayer.init = function ($stage) {
            if ($stage) {
                this.stage = $stage;
                if (this.renderContainer == null) {
                    this.renderContainer = new egret.Sprite();
                    this.renderContainer.name = "renderContainer";
                    $stage.addChild(this.renderContainer);
                }
                if (this.debugContainer == null) {
                    this.debugContainer = new egret.Sprite();
                    this.debugContainer.name = "debugContainer";
                    $stage.addChild(this.debugContainer);
                }
                if (this.testContainer == null) {
                    this.testContainer = new egret.Sprite();
                    this.testContainer.name = "testContainer";
                    $stage.addChild(this.testContainer);
                }
                if (this.preContainer == null) {
                    this.preContainer = new egret.Sprite();
                    this.preContainer.name = "preContainer";
                    $stage.addChild(this.preContainer);
                }
                if (this.loadingContainer == null) {
                    this.loadingContainer = new egret.Sprite();
                    this.loadingContainer.name = "loadingContainer";
                    $stage.addChild(this.loadingContainer);
                }
            }
        };
        return GameUILayer;
    }(egret.DisplayObjectContainer));
    ls.GameUILayer = GameUILayer;
    egret.registerClass(GameUILayer,'ls.GameUILayer');
})(ls || (ls = {}));
//# sourceMappingURL=GameUILayer.js.map