var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 普通子弹
 */
var Bullet = (function (_super) {
    __extends(Bullet, _super);
    function Bullet($controller, $layer) {
        var _this = _super.call(this, $controller, $layer) || this;
        _this._id = App.CommonUtils.Token;
        return _this;
    }
    /** 设置子弹攻击的目标 */
    Bullet.prototype.setTarget = function (bulletId, $x, $y, $target) {
        var self = this;
        self._bulletVO = GlobleVOData.getData(GlobleVOData.BulletVO, bulletId);
        self._target = $target;
        if (self._bulletImg)
            App.DisplayUtils.removeFromParent(self._bulletImg);
        self._bulletImg = ObjectPool.pop(egret.Bitmap, "egret.Bitmap");
        self._bulletImg.texture = RES.getRes(self._bulletVO.assetname);
        // self._bulletImg.x = -self._bulletImg.width / 2;
        // self._bulletImg.y = -self._bulletImg.height / 2;
        self.addChild(self._bulletImg);
        self.x = $x + (self._target.width >> 1) + (self._bulletImg.width >> 1);
        self.y = $y + self._target.height + (self._bulletImg.height >> 1);
    };
    Bullet.prototype.onUpdate = function () {
        _super.prototype.onUpdate.call(this);
        if (!this._bulletVO)
            return;
        this.move();
    };
    Bullet.prototype.move = function () {
        if (this._target.HP <= 0) {
            this._target = null;
            this._bulletVO = null;
            this.release();
            return;
        }
        var distance = egret.Point.distance(this.point, this._target.point);
        if (distance <= this._bulletVO.radius) {
            this._target.HP = this._target.HP - this._bulletVO.damage;
            this._target = null;
            this._bulletVO = null;
            this.release();
        }
        else {
            var targetSpeed = App.CommonUtils.getSpeed(this._target.point, this.point, this._bulletVO.speed);
            var xDistance = 10 * targetSpeed.x;
            var yDistance = 10 * targetSpeed.y;
            this.x = this.x + xDistance;
            this.y = this.y + yDistance;
        }
    };
    /** 释放 */
    Bullet.prototype.release = function () {
        var self = this;
        self.controller.getModel().bulletDic.Remove(self._id);
        ObjectPool.push(self._bulletImg);
        ObjectPool.push(self);
        App.DisplayUtils.removeFromParent(self._bulletImg);
        App.DisplayUtils.removeFromParent(self);
    };
    Object.defineProperty(Bullet.prototype, "point", {
        get: function () {
            return new egret.Point(this.x, this.y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bullet.prototype, "ID", {
        /** 子弹的唯一ID 不是 子弹表ID */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    return Bullet;
}(BaseBullet));
__reflect(Bullet.prototype, "Bullet");
//# sourceMappingURL=Bullet.js.map