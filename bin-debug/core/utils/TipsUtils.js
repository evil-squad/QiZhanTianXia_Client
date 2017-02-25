var TipsUtils = (function (_super) {
    __extends(TipsUtils, _super);
    function TipsUtils() {
        _super.call(this);
        this._ctips = new Array();
        this._dtips = new Array();
    }
    var d = __define,c=TipsUtils,p=c.prototype;
    p.showCenter = function (message) {
        var tips = null;
        for (var i = 0; i < this._ctips.length; i++) {
            //Log.trace(this._ctips[i].getStatus())
            if (this._ctips[i].getStatus() == 0) {
                tips = this._ctips[i];
                //Log.trace("old");
                break;
            }
        }
        if (tips == null) {
            //Log.trace("new");
            tips = new CenterTips();
            this._ctips.push(tips);
        }
        tips.show(message, LayerManager.UI_Tips, true, 4);
    };
    p.showTips = function (message, direction) {
        var tips = null;
        for (var i = 0; i < this._dtips.length; i++) {
            if (this._dtips[i].getStatus() == 0) {
                tips = this._dtips[i];
                break;
            }
        }
        if (tips == null) {
            tips = new NormalTips();
            this._dtips.push(tips);
        }
        tips.showForDirection(message, LayerManager.UI_Tips, direction);
    };
    return TipsUtils;
}(BaseClass));
egret.registerClass(TipsUtils,'TipsUtils');
//# sourceMappingURL=TipsUtils.js.map