var TipsUtils = (function (_super) {
    __extends(TipsUtils, _super);
    function TipsUtils() {
        _super.call(this);
        this._ctips = new Array();
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
    return TipsUtils;
}(BaseClass));
egret.registerClass(TipsUtils,'TipsUtils');
