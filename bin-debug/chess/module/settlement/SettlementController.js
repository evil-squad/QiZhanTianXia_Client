var SettlementController = (function (_super) {
    __extends(SettlementController, _super);
    function SettlementController() {
        _super.call(this);
        this.settlementView = new SettlementPanel(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Settlement, this.settlementView);
    }
    var d = __define,c=SettlementController,p=c.prototype;
    return SettlementController;
}(BaseController));
egret.registerClass(SettlementController,'SettlementController');
//# sourceMappingURL=SettlementController.js.map