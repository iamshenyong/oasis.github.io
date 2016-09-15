var ls;
(function (ls) {
    var AIBitmapText = (function (_super) {
        __extends(AIBitmapText, _super);
        function AIBitmapText() {
            _super.call(this);
            this.name = "bitmapText";
        }
        var d = __define,c=AIBitmapText,p=c.prototype;
        p.initialize = function () {
            var url = decodeURIComponent(this["bmpUrl"]);
            var fnturl = decodeURIComponent(this["fntUrl"]);
            this._bitmapURL = url;
            this._fntUrl = fnturl;
            var self = this;
            var textureDatas = ls.getTexture(url);
            if (textureDatas != null)
                var texture = textureDatas[0];
            //加载fnt
            var onFntResComplete = function (bitmapFont) {
                self._bitmapText = new egret.BitmapText();
                self._bitmapText.font = bitmapFont;
                self._sourceWidth = self._bitmapText.width;
                self._sourceHeight = self._bitmapText.height;
                if (self.text)
                    self._bitmapText.text = self.text.toString();
                if (self.width)
                    self._bitmapText.width = self.width;
                if (self.height)
                    self._bitmapText.height = self.height;
                if (self.letterSpacing)
                    self._bitmapText.letterSpacing = self.letterSpacing;
                if (self.lineSpacing)
                    self._bitmapText.lineSpacing = self.lineSpacing;
                self.container.addChild(self._bitmapText);
                if (textureDatas) {
                    self._bitmapText.x = textureDatas[1];
                    self._bitmapText.y = textureDatas[2];
                }
                self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResourceLoaded));
            };
            RES.getResByUrl(self._fntUrl, onFntResComplete, this, RES.ResourceItem.TYPE_FONT);
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
                "bmpUrl": this["bmpUrl"],
                "fntUrl": this["fntUrl"],
                "text": this.text,
                "letterSpacing": this.letterSpacing,
                "lineSpacing": this.lineSpacing,
                "enabled": this.enabled,
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
                this["bmpUrl"] = o["bmpUrl"];
                this["fntUrl"] = o["fntUrl"];
                this.text = o["text"];
                this.letterSpacing = o["letterSpacing"];
                this.lineSpacing = o["lineSpacing"];
                this.enabled = o["enabled"];
                this.collisionsEnabled = o["collisionsEnabled"];
                this.collisionData = o["collisionData"];
                this.collisionType = o["collisionType"];
                this.collisionVectorData = o["collisionVectorData"];
            }
        };
        d(p, "letterSpacing"
            ,function () {
                return this._letterSpacing;
            }
            ,function (value) {
                if (this._letterSpacing != value) {
                    if (this._bitmapText)
                        this._bitmapText.letterSpacing = value;
                    else
                        this._letterSpacing = value;
                }
            }
        );
        d(p, "lineSpacing"
            ,function () {
                return this._lineSpacing;
            }
            ,function (value) {
                if (this._lineSpacing != value) {
                    if (this._bitmapText)
                        this._bitmapText.lineSpacing = value;
                    else
                        this._lineSpacing = value;
                }
            }
        );
        d(p, "text"
            ,function () {
                return this._text;
            }
            ,function ($text) {
                if (this._bitmapText)
                    this._bitmapText.text = $text;
                else
                    this._text = $text;
            }
        );
        d(p, "width"
            ,function () {
                return this._width;
            }
            ,function (value) {
                if (this._bitmapText) {
                    if (this._bitmapText.width != value)
                        this._bitmapText.width = value;
                }
                if (this._width != value) {
                    this.update = true;
                    this._width = value;
                }
            }
        );
        d(p, "height"
            ,function () {
                return this._height;
            }
            ,function (value) {
                if (this._bitmapText) {
                    if (this._bitmapText.height != value)
                        this._bitmapText.height = value;
                }
                if (this._height != value) {
                    this.update = true;
                    this._height = value;
                }
            }
        );
        d(p, "scaleX"
            ,function () {
                return this._scaleX;
            }
            ,function (value) {
                if (this._scaleX != value) {
                    this._scaleX = value;
                    this.width = this._scaleX * this._sourceWidth;
                    this.update = true;
                }
            }
        );
        d(p, "scaleY"
            ,function () {
                return this._scaleY;
            }
            ,function (value) {
                if (this._scaleY != value) {
                    this._scaleY = value;
                    this.height = this._scaleY * this._sourceHeight;
                    this.update = true;
                }
            }
        );
        d(p, "scale"
            ,function () {
                if (this._scaleX == this._scaleY)
                    return this._scaleX;
                else
                    return 1;
            }
            ,function (value) {
                if (this.scale != value) {
                    this.update = true;
                    this.scaleX = this.scaleY = value;
                }
            }
        );
        ///////////////////////////////conditions///////////////////////////////
        p.compareBitmapFontText = function (event) {
            return { instances: [this], status: this._text == ls.eval_e(event.text) };
        };
        ///////////////////////////////actions///////////////////////////////
        p.setBitmapText = function ($text) {
            var text = ls.eval_e($text);
            if (this._text != text) {
                if (this._bitmapText) {
                    if (typeof text === "number")
                        this._bitmapText.text = text.toString();
                    else
                        this._bitmapText.text = text;
                }
                this._text = text;
            }
        };
        p.appendBitmapText = function ($text) {
            var text = ls.eval_e($text);
            if (this._bitmapText) {
                if (typeof text === "number")
                    this._bitmapText.text += text.toString();
                else
                    this._bitmapText.text += text;
            }
            this._text += text;
        };
        p.setBitmapLetterSpace = function ($letterSpace) {
            var letterSpace = ls.eval_e($letterSpace);
            if (this._bitmapText) {
                this._bitmapText.letterSpacing = letterSpace;
            }
            this._letterSpacing = letterSpace;
        };
        p.setBitmapLineSpace = function ($lineSpace) {
            var lineSpace = ls.eval_e($lineSpace);
            if (this._bitmapText) {
                this._bitmapText.lineSpacing = lineSpace;
            }
            this._lineSpacing = lineSpace;
        };
        d(p, "bitmapText"
            ///////////////////////////////exps///////////////////////////////
            ,function () {
                return this._bitmapText;
            }
        );
        p.clone = function () {
            var cloneInstance = new AIBitmapText();
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
            cloneInstance.collision = this.collision;
            cloneInstance.mirrored = this.mirrored;
            cloneInstance.anchorX = this.anchorX;
            cloneInstance.anchorY = this.anchorY;
            cloneInstance.text = this.text;
            cloneInstance.letterSpacing = this.letterSpacing;
            cloneInstance.lineSpacing = this.lineSpacing;
            cloneInstance.global = this.global;
            cloneInstance.layer = this.layer;
            cloneInstance.collisionsEnabled = this.collisionsEnabled;
            cloneInstance.collisionData = this.collisionData;
            cloneInstance.collisionType = this.collisionType;
            cloneInstance.collisionVectorData = this.collisionVectorData;
            cloneInstance.collisionSourceVectorData = this.collisionSourceVectorData;
            cloneInstance["bmpUrl"] = this["bmpUrl"];
            cloneInstance["fntUrl"] = this["fntUrl"];
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
        return AIBitmapText;
    }(ls.AISprite));
    ls.AIBitmapText = AIBitmapText;
    egret.registerClass(AIBitmapText,'ls.AIBitmapText');
    var CompareBitmapFontTextEvent = (function (_super) {
        __extends(CompareBitmapFontTextEvent, _super);
        function CompareBitmapFontTextEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareBitmapFontTextEvent,p=c.prototype;
        return CompareBitmapFontTextEvent;
    }(ls.BaseEvent));
    ls.CompareBitmapFontTextEvent = CompareBitmapFontTextEvent;
    egret.registerClass(CompareBitmapFontTextEvent,'ls.CompareBitmapFontTextEvent');
})(ls || (ls = {}));
//# sourceMappingURL=runtime.js.map