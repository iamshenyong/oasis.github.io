var ls;
(function (ls) {
    var AITiledBackground = (function (_super) {
        __extends(AITiledBackground, _super);
        function AITiledBackground() {
            _super.call(this);
            this.name = "tiledBackground";
        }
        var d = __define,c=AITiledBackground,p=c.prototype;
        p.initialize = function () {
            var url = this["url"];
            this._bitmapURL = url;
            var self = this;
            var textureDatas = ls.getTexture(url);
            if (textureDatas != null)
                var texture = textureDatas[0];
            if (texture != null) {
                self._bitmap.texture = texture;
                self._bitmap.fillMode = egret.BitmapFillMode.REPEAT;
                self._bitmap.width = self.width;
                self._bitmap.height = self.height;
                if (textureDatas) {
                    self._bitmap.x = textureDatas[1];
                    self._bitmap.y = textureDatas[2];
                }
                self._sourceWidth = texture.textureWidth;
                self._sourceHeight = texture.textureHeight;
                self.container.addChild(self._bitmap);
                self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResourceLoaded));
            }
            else {
                var onRESComplete = function (texture) {
                    if (texture) {
                        self._bitmap.texture = texture;
                        self._bitmap.fillMode = egret.BitmapFillMode.REPEAT;
                        self._bitmap.width = self.width;
                        self._bitmap.height = self.height;
                        self._sourceWidth = texture.textureWidth;
                        self._sourceHeight = texture.textureHeight;
                        self.container.addChild(self._bitmap);
                        self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResourceLoaded));
                    }
                };
                RES.getResByUrl(url, onRESComplete, this, RES.ResourceItem.TYPE_IMAGE);
            }
        };
        p.saveToJSON = function () {
            return {
                "name": this.name,
                "isModel": this.isModel,
                "paramInstances": this.paramInstances,
                "timeScale": this.timeScale,
                "x": this.x,
                "y": this.y,
                "width": this.width,
                "height": this.height,
                "scale": this.scale,
                "scaleX": this.scaleX,
                "scaleY": this.scaleY,
                "angle": this.angle,
                "alpha": this.alpha,
                "visible": this.visible,
                "mirrored": this.mirrored,
                "collision": this.collision,
                "anchorX": this.anchorX,
                "anchorY": this.anchorY,
                "layer": this.layer,
                "url": this["url"],
                "collisionsEnabled": this.collisionsEnabled,
                "collisionData": this.collisionData,
                "collisionType": this.collisionType,
                "collisionVectorData": this.collisionVectorData
            };
        };
        p.loadFromJSON = function (o) {
            if (o) {
                this.name = o["name"];
                this.isModel = o["isModel"];
                this.paramInstances = o["paramInstances"];
                this.timeScale = o["timeScale"];
                this.x = o["x"];
                this.y = o["y"];
                this.width = o["width"];
                this.height = o["height"];
                this.scale = o["scale"];
                this.scaleX = o["scaleX"];
                this.scaleY = o["scaleY"];
                this.angle = o["angle"];
                this.alpha = o["alpha"];
                this.visible = o["visible"];
                this.mirrored = o["mirrored"];
                this.collision = o["collision"];
                this.anchorX = o["anchorX"];
                this.anchorY = o["anchorY"];
                this.enabled = o["enabled"];
                this["url"] = o["url"];
                this.collisionsEnabled = o["collisionsEnabled"];
                this.collisionData = o["collisionData"];
                this.collisionType = o["collisionType"];
                this.collisionVectorData = o["collisionVectorData"];
            }
        };
        p.clone = function () {
            var cloneInstance = new AITiledBackground();
            cloneInstance.name = this.name;
            cloneInstance.x = this.x;
            cloneInstance.y = this.y;
            cloneInstance.width = this.width;
            cloneInstance.height = this.height;
            cloneInstance.scale = this.scale;
            cloneInstance.scaleX = this.scaleX;
            cloneInstance.scaleY = this.scaleY;
            cloneInstance.angle = this.angle;
            cloneInstance.alpha = this.alpha;
            cloneInstance.visible = this.visible;
            cloneInstance.mirrored = this.mirrored;
            cloneInstance.collision = this.collision;
            cloneInstance.anchorX = this.anchorX;
            cloneInstance.anchorY = this.anchorY;
            cloneInstance._bitmap.fillMode = egret.BitmapFillMode.REPEAT;
            cloneInstance.global = this.global;
            cloneInstance.layer = this.layer;
            cloneInstance.collisionsEnabled = this.collisionsEnabled;
            cloneInstance.collisionData = this.collisionData;
            cloneInstance.collisionType = this.collisionType;
            cloneInstance.collisionVectorData = this.collisionVectorData;
            cloneInstance.collisionSourceVectorData = this.collisionSourceVectorData;
            //创建显示对象
            cloneInstance["url"] = this["url"];
            cloneInstance.initialize();
            //拷贝行为
            cloneInstance.behaviors = [];
            for (var i = 0, behaivorlen = this.behaviors.length; i < behaivorlen; i++) {
                var behaivor = this.behaviors[i];
                var cloneBehaivor = behaivor.clone();
                cloneInstance.addBehavior(cloneBehaivor);
                cloneBehaivor.onCreate();
            }
            //clone variables
            for (var key in this.variables)
                cloneInstance.addVariable(key, this.variables[key]);
            return cloneInstance;
        };
        return AITiledBackground;
    }(ls.AISprite));
    ls.AITiledBackground = AITiledBackground;
    egret.registerClass(AITiledBackground,'ls.AITiledBackground');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map