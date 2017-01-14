var ServerChooseController = (function (_super) {
    __extends(ServerChooseController, _super);
    function ServerChooseController() {
        _super.call(this);
        this.chooseView = new ServerChooseView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.ServerChoose, this.chooseView);
    }
    var d = __define,c=ServerChooseController,p=c.prototype;
    return ServerChooseController;
}(BaseController));
egret.registerClass(ServerChooseController,'ServerChooseController');
//# sourceMappingURL=ServerChooseController.js.map