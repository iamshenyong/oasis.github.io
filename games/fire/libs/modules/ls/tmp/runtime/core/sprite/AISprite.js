var ls;
(function (ls) {
    var AISprite = (function (_super) {
        __extends(AISprite, _super);
        function AISprite() {
            _super.call(this);
            this._sourceWidth = 0;
            this._sourceHeight = 0;
            this._isResourceLoaded = false;
            this.name = "Sprite";
            this._bitmap = new egret.Bitmap();
        }
        var d = __define,c=AISprite,p=c.prototype;
        d(p, "bitmapURL"
            ,function () {
                return this._bitmapURL;
            }
        );
        p.initialize = function () {
            this.createBitmap(this["url"]);
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
                this.layer = o["layer"];
                this.collisionsEnabled = o["collisionsEnabled"];
                this.collisionData = o["collisionData"];
                this.collisionType = o["collisionType"];
                this.collisionVectorData = o["collisionVectorData"];
            }
        };
        /**创建位图*/
        p.createBitmap = function ($url) {
            if ($url && $url != "") {
                this._bitmapURL = $url;
                var self = this;
                var textureDatas = ls.getTexture($url);
                if (textureDatas != null)
                    var texture = textureDatas[0];
                //先从spriteSheet中找
                if (texture != null) {
                    this._bitmap.texture = texture;
                    this._sourceWidth = texture.textureWidth;
                    this._sourceHeight = texture.textureHeight;
                    this._bitmap.width = this.width;
                    this._bitmap.height = this.height;
                    if (textureDatas) {
                        this._bitmap.x = textureDatas[1];
                        this._bitmap.y = textureDatas[2];
                    }
                    this.container.addChild(this._bitmap);
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResourceLoaded));
                    this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                }
                else {
                    var onRESComplete = function (texture) {
                        if (texture) {
                            self._bitmap.texture = texture;
                            self._sourceWidth = texture.textureWidth;
                            self._sourceHeight = texture.textureHeight;
                            self._bitmap.width = self.width;
                            self._bitmap.height = self.height;
                            self.container.addChild(self._bitmap);
                            self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResourceLoaded));
                            self.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                        }
                    };
                    RES.getResByUrl($url, onRESComplete, this, RES.ResourceItem.TYPE_IMAGE);
                }
            }
        };
        p.addChild = function ($aiSprite) {
            ls.World.getInstance().addChild($aiSprite, this);
        };
        p.removeChild = function ($aiSprite) {
            ls.World.getInstance().removeChild($aiSprite);
        };
        //加载图片 动作
        p.loadImage = function ($url) {
            var curUrl = ls.eval_e($url);
            this.createBitmap(curUrl);
        };
        d(p, "width"
            ,function () {
                return this._width;
            }
            ,function (value) {
                if (this._bitmap) {
                    if (this._bitmap.width != value)
                        this._bitmap.width = value;
                }
                if (this._sourceWidth == 0)
                    this._sourceWidth = value;
                this._scaleX = value / this._sourceWidth;
                if (this._width != value) {
                    this.update = true;
                    this._width = value;
                }
                if (this.anchorX)
                    this.container.anchorOffsetX = this.width * this.anchorX;
            }
        );
        d(p, "height"
            ,function () {
                return this._height;
            }
            ,function (value) {
                if (this._bitmap) {
                    if (this._bitmap.height != value)
                        this._bitmap.height = value;
                }
                if (this._sourceHeight == 0)
                    this._sourceHeight = value;
                this._scaleY = value / this._sourceHeight;
                if (this._height != value) {
                    this._height = value;
                    this.update = true;
                }
                if (this.anchorY)
                    this.container.anchorOffsetY = this.height * this.anchorY;
            }
        );
        ////////////////////////////////////conditions///////////////////////////////////
        //当资源加载完毕
        p.onResourceLoaded = function ($onResourceLoaded) {
            return { instances: [this], status: true };
        };
        ////////////////////////////////////action///////////////////////////////////
        p.subtractFrom = function ($instanceVariables, $value) {
            var value = ls.eval_e($value);
            ls.assert(typeof value !== "number", "AIObject subtractFrom parameter type incorrect!!");
            this[$instanceVariables] -= value;
        };
        ////////////////////////////////////behaviors///////////////////////////////////
        p.clone = function () {
            var cloneInstance = new AISprite();
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
            cloneInstance.global = this.global;
            cloneInstance.layer = this.layer;
            cloneInstance.collisionsEnabled = this.collisionsEnabled;
            cloneInstance.collisionData = this.collisionData;
            cloneInstance.collisionType = this.collisionType;
            cloneInstance.collisionVectorData = this.collisionVectorData;
            //创建显示对象
            cloneInstance.createBitmap(this._bitmapURL);
            //拷贝行为
            cloneInstance.behaviors = [];
            for (var i = 0; i < this.behaviors.length; i++) {
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
        return AISprite;
    }(ls.AIDisplayObject));
    ls.AISprite = AISprite;
    egret.registerClass(AISprite,'ls.AISprite');
    var OnResourceLoadedEvent = (function (_super) {
        __extends(OnResourceLoadedEvent, _super);
        function OnResourceLoadedEvent() {
            _super.call(this);
        }
        var d = __define,c=OnResourceLoadedEvent,p=c.prototype;
        return OnResourceLoadedEvent;
    }(ls.BaseEvent));
    ls.OnResourceLoadedEvent = OnResourceLoadedEvent;
    egret.registerClass(OnResourceLoadedEvent,'ls.OnResourceLoadedEvent');
})(ls || (ls = {}));
//# sourceMappingURL=AISprite.js.map