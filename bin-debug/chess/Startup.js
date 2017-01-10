var Startup = (function () {
    function Startup() {
        var groupName = "preload";
        var subGroups = ["preload_core", "preload_ui", "preload_puke"];
        App.ResourceUtils.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }
    var d = __define,c=Startup,p=c.prototype;
    /**
     * 资源组加载完成
     */
    p.onResourceLoadComplete = function () {
        this.initModule();
        this.initListener();
        App.Init();
        //音乐音效处理
        App.SoundManager.setBgOn(false);
        App.SoundManager.setEffectOn(!App.DeviceUtils.IsHtml5 || !App.DeviceUtils.IsMobile);
        App.SceneManager.runScene(SceneConsts.Enter);
    };
    /**
     * 资源组加载进度
     */
    p.onResourceLoadProgress = function (itemsLoaded, itemsTotal) {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    };
    /**
     * 初始化所有模块
     */
    p.initModule = function () {
        App.ControllerManager.register(ControllerConst.Servers, new ServerChooseController());
        App.ControllerManager.register(ControllerConst.Login, new LoginController());
        App.ControllerManager.register(ControllerConst.Home, new HomeController());
        App.ControllerManager.register(ControllerConst.Room, new RoomController());
        App.ControllerManager.register(ControllerConst.RoomEnter, new RoomEnterController());
    };
    p.initListener = function () {
        new RoomNotifyCmdListener(null);
    };
    return Startup;
}());
egret.registerClass(Startup,'Startup');
