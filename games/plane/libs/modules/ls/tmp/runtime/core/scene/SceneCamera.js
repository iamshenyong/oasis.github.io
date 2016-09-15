var ls;
(function (ls) {
    var SceneCamera = (function () {
        function SceneCamera(scene) {
            this.oldSceneX = 0;
            this.oldSceneY = 0;
            this.newSceneX = 0;
            this.newSceneY = 0;
            this.updateCamera = false;
            this.scene = scene;
        }
        var d = __define,c=SceneCamera,p=c.prototype;
        p.lookAtPoint = function (pos) {
            if (this.pos != pos) {
                this.pos = pos;
                this._scrollX = this.pos.x;
                this._scrollY = this.pos.y;
                this.updateCamera = true;
            }
        };
        p.lookAtX = function (x) {
            if (this._scrollX != x) {
                this.updateCamera = true;
                this._scrollX = x;
            }
        };
        p.lookAtY = function (y) {
            if (this._scrollY != y) {
                this.updateCamera = true;
                this._scrollY = y;
            }
        };
        p.lookAtChar = function (target) {
            this.lookAtTarget = target;
            if (this._scrollX != this.lookAtTarget.x || this._scrollY != this.lookAtTarget.y) {
                this.updateCamera = true;
                this._scrollX = this.lookAtTarget.x;
                this._scrollY = this.lookAtTarget.y;
                console.log(this._scrollX, this._scrollY);
                this.render2();
            }
        };
        //先判断当前老的坐标是否是舞台居中，如果是舞台居中，那么，不进行移动
        p.render2 = function () {
            if (!this.updateCamera)
                return;
            this.updateCamera = false;
            var sceneWidth = ls.LayoutDecoder.sceneWidth;
            var sceneHeight = ls.LayoutDecoder.sceneHeight;
            var stageWidth = ls.GameUILayer.stage.stageWidth;
            var stageHeight = ls.GameUILayer.stage.stageHeight;
            var sceneContainer = ls.GameUILayer.renderContainer;
            var objects = ls.World.getInstance().objectList;
            var cameras = [];
            var others = [];
            //查找带摄像机的对象
            if (objects && objects.length > 0) {
                for (var i = 0; i < objects.length; i++) {
                    var o = objects[i];
                    if (o.isHasCamera)
                        cameras.push(o);
                    else
                        others.push(o);
                }
            }
            //先根据目标的坐标来计算其它对象的坐标
            //新的坐标
            var isLockX = false;
            if (this._scrollX > stageWidth / 2 && this._scrollX < sceneWidth - stageWidth / 2) {
                this.newSceneX = stageWidth / 2 - this._scrollX;
                isLockX = true;
            }
            else if (this._scrollX <= ls.GameUILayer.stage.stageWidth / 2)
                this.newSceneX = 0;
            else if (this._scrollX > sceneWidth - stageWidth / 2)
                this.newSceneX = stageWidth - sceneWidth;
            //垂直方向坐标更新
            var isLockY = false;
            if (this._scrollY > stageHeight / 2 && this._scrollY < sceneHeight - stageHeight / 2) {
                this.newSceneY = stageHeight / 2 - this._scrollY;
                isLockY = true;
            }
            else if (this._scrollY <= stageHeight / 2)
                this.newSceneY = 0;
            else if (this._scrollY > sceneHeight - stageHeight / 2)
                this.newSceneY = stageHeight - sceneHeight;
            // for (var i: number = 0; i < others.length; i++){
            //     if (!isNaN(this.oldSceneX) && !isNaN(this.oldSceneY)) {
            //         var instance: AIDisplayObject = others[i];
            //         //增量
            //         instance.x += 2 / 2 * -((this.newSceneX - this.oldSceneX) * (100 - instance.parallaxX) / 100);
            //         instance.y += 2 / 2 * -((this.newSceneY - this.oldSceneY) * (100 - instance.parallaxY) / 100);
            //     }
            // }
            if (!isNaN(this.oldSceneX) && !isNaN(this.oldSceneY)) {
                sceneContainer.x += (this.newSceneX - this.oldSceneX);
                sceneContainer.y += (this.newSceneY - this.oldSceneY);
            }
            // egret.callLater(function (newX:number,newY:number,oldX:number,oldY:number) {
            //     if (!isNaN(oldX) && !isNaN(oldY)) {
            //         sceneContainer.x += (newX - oldX);
            //         sceneContainer.y += (newY - oldY);
            //     }
            // }, this, [this.newSceneX, this.newSceneY, this.oldSceneX, this.oldSceneY]);
            //更新摄像机控制的目标坐标
            var localPos = sceneContainer.globalToLocal(stageWidth / 2, stageHeight / 2);
            if (isLockX)
                this.lookAtTarget.x = localPos.x;
            if (isLockY)
                this.lookAtTarget.y = localPos.y;
            this.oldSceneX = this.newSceneX;
            this.oldSceneY = this.newSceneY;
        };
        /**摄像机以左上角为视角 */
        p.render = function () {
            if (!this.updateCamera)
                return;
            this.updateCamera = false;
            var sceneWidth = ls.LayoutDecoder.sceneWidth;
            var sceneHeight = ls.LayoutDecoder.sceneHeight;
            var stageWidth = ls.GameUILayer.stage.stageWidth;
            var stageHeight = ls.GameUILayer.stage.stageHeight;
            var sceneContainer = ls.GameUILayer.renderContainer;
            var objects = ls.World.getInstance().objectList;
            //新的坐标
            if (this._scrollX > stageWidth / 2 && this._scrollX < sceneWidth - stageWidth / 2) {
                this.newSceneX = stageWidth / 2 - this._scrollX;
            }
            else if (this._scrollX <= ls.GameUILayer.stage.stageWidth / 2)
                this.newSceneX = 0;
            else if (this._scrollX > sceneWidth - stageWidth / 2)
                this.newSceneX = stageWidth - sceneWidth;
            //垂直方向坐标更新
            if (this._scrollY > stageHeight / 2 && this._scrollY < sceneHeight - stageHeight / 2) {
                this.newSceneY = stageHeight / 2 - this._scrollY;
            }
            else if (this._scrollY <= stageHeight / 2)
                this.newSceneY = 0;
            else if (this._scrollY > sceneHeight - stageHeight / 2)
                this.newSceneY = stageHeight - sceneHeight;
            for (var i = 0; i < objects.length; i++) {
                var instance = objects[i];
                if (!instance.isHasCamera) {
                    if (!isNaN(this.oldSceneX) && !isNaN(this.oldSceneY)) {
                        //增量
                        instance.x += 2 / 2 * -((this.newSceneX - this.oldSceneX) * (100 - instance.parallaxX) / 100);
                        instance.y += 2 / 2 * -((this.newSceneY - this.oldSceneY) * (100 - instance.parallaxY) / 100);
                    }
                }
            }
            if (!isNaN(this.oldSceneX) && !isNaN(this.oldSceneY)) {
                sceneContainer.x += (this.newSceneX - this.oldSceneX);
                sceneContainer.y += (this.newSceneY - this.oldSceneY);
            }
            this.oldSceneX = this.newSceneX;
            this.oldSceneY = this.newSceneY;
        };
        return SceneCamera;
    }());
    ls.SceneCamera = SceneCamera;
    egret.registerClass(SceneCamera,'ls.SceneCamera');
})(ls || (ls = {}));
//# sourceMappingURL=SceneCamera.js.map