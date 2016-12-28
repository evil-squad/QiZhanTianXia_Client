var BasePanelView = (function (_super) {
    __extends(BasePanelView, _super);
    function BasePanelView(controller, parent) {
        _super.call(this, controller, parent);
        this.skinName = "resource/skins/PanelSkin.exml";
    }
    var d = __define,c=BasePanelView,p=c.prototype;
    d(p, "icon"
        ,function () {
            return this._icon;
        }
        ,function (value) {
            this._icon = value;
            if (this.iconDisplay) {
                this.iconDisplay.source = this._icon;
            }
        }
    );
    d(p, "btn"
        ,function () {
            return this._btn;
        }
        ,function (value) {
            this._btn = value;
            if (this.button) {
                this.button.source = this._btn;
            }
        }
    );
    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.closeBtnClickHandler, this);
    };
    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    p.initData = function () {
        _super.prototype.initData.call(this);
        this.iconDisplay.source = this._icon;
        this.button.source = this._btn;
    };
    p.closeBtnClickHandler = function (e) {
        App.ViewManager.closeView(this);
    };
    return BasePanelView;
}(BaseEuiView));
egret.registerClass(BasePanelView,'BasePanelView');
//# sourceMappingURL=BasePanelView.js.map