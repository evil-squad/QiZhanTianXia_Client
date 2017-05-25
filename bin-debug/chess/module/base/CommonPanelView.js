var CommonPanelView = (function (_super) {
    __extends(CommonPanelView, _super);
    function CommonPanelView(controller, parent) {
        _super.call(this, controller, parent);
        this.skinName = "resource/skins/CommonPanelSkin.exml";
    }
    var d = __define,c=CommonPanelView,p=c.prototype;
    d(p, "icon"
        ,function () {
            return this._icon;
        }
        ,function (value) {
            this._icon = value;
        }
    );
    d(p, "btn"
        ,function () {
            return this._btn;
        }
        ,function (value) {
            this._btn = value;
        }
    );
    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        //this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.closeBtnClickHandler,this);
    };
    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    p.initData = function () {
        _super.prototype.initData.call(this);
    };
    p.closeBtnClickHandler = function (e) {
        App.ViewManager.closeView(this);
    };
    return CommonPanelView;
}(BaseEuiView));
egret.registerClass(CommonPanelView,'CommonPanelView');
//# sourceMappingURL=CommonPanelView.js.map