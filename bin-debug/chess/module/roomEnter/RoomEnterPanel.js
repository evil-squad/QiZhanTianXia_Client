var RoomEnterPanel = (function (_super) {
    __extends(RoomEnterPanel, _super);
    function RoomEnterPanel(controller, parent) {
        _super.call(this, controller, parent);
        //this.icon = "table_shop";
    }
    var d = __define,c=RoomEnterPanel,p=c.prototype;
    /**
     *对面板数据的初始化，用于子类继承
     */
    p.initData = function () {
        _super.prototype.initData.call(this);
        this.height = 400;
        this._numberInputView = new NumberInputView();
        this.contentGroup.addChild(this._numberInputView);
        this._numberInputView.enterPanel = this;
    };
    p.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i - 0] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        if (RoomManager.hasRoomInfo) {
            this._numberInputView.roomNumber = RoomManager.roomId;
        }
    };
    return RoomEnterPanel;
}(BasePanelView));
egret.registerClass(RoomEnterPanel,'RoomEnterPanel');
//# sourceMappingURL=RoomEnterPanel.js.map