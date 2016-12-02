var HomeController = (function (_super) {
    __extends(HomeController, _super);
    function HomeController() {
        _super.call(this);
        this.proxy = new HomeProxy(this);
        this.homeView = new HomeView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Home, this.homeView);
    }
    var d = __define,c=HomeController,p=c.prototype;
    return HomeController;
}(BaseController));
egret.registerClass(HomeController,'HomeController');
//# sourceMappingURL=HomeController.js.map