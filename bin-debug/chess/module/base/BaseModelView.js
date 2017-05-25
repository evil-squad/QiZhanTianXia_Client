var BaseModelView = (function (_super) {
    __extends(BaseModelView, _super);
    function BaseModelView(controller, parent) {
        _super.call(this, controller, parent);
        this._bg = new eui.Group();
        this._bg.width = App.StageUtils.getWidth();
        this._bg.height = App.StageUtils.getHeight();
        this.addChild(this._bg);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    }
    var d = __define,c=BaseModelView,p=c.prototype;
    d(p, "view",undefined
        ,function (value) {
            this._view = value;
            this.addChild(this._view);
            this._view.x = (this.width - this._view.width) * .5;
            this._view.y = (this.height - this._view.height) * .5;
        }
    );
    p.clickHandler = function (e) {
        Log.trace(e.currentTarget, e.target);
        Log.trace(e.target == this._bg);
        if (e.target == this._bg) {
            App.ViewManager.closeView(this);
        }
    };
    return BaseModelView;
}(BaseEuiView));
egret.registerClass(BaseModelView,'BaseModelView');
//# sourceMappingURL=BaseModelView.js.map