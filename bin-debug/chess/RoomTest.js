var RoomTest = (function () {
    function RoomTest() {
        var groupName = "preload";
        var subGroups = ["preload_core", "preload_ui", "preload_puke"];
        App.ResourceUtils.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
    }
    var d = __define,c=RoomTest,p=c.prototype;
    /**
     * 资源组加载完成
     */
    p.onResourceLoadComplete = function () {
        this.initModule();
        App.Init();
        //音乐音效处理
        App.SoundManager.setBgOn(true);
        App.SoundManager.setEffectOn(!App.DeviceUtils.IsHtml5 || !App.DeviceUtils.IsMobile);
        App.SceneManager.runScene(SceneConsts.Room);
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
        App.ControllerManager.register(ControllerConst.Room, new RoomController());
    };
    return RoomTest;
}());
egret.registerClass(RoomTest,'RoomTest');
