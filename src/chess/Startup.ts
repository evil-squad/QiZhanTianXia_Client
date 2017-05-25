class Startup {
	public constructor() {
		var groupName:string = "preload";
        var subGroups:Array<string> = ["preload_core", "preload_ui", "preload_puke"];
        App.ResourceUtils.loadGroups(groupName, subGroups, this.onResourceLoadComplete, this.onResourceLoadProgress, this);
	}

	/**
     * 资源组加载完成
     */
    private onResourceLoadComplete():void {
        App.Init();

        this.initModule();
        this.initListener();

        //音乐音效处理
        App.SoundManager.setBgOn(false);
        App.SoundManager.setEffectOn(!App.DeviceUtils.IsHtml5 || !App.DeviceUtils.IsMobile);
        App.SceneManager.runScene(SceneConsts.Enter);
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(itemsLoaded:number, itemsTotal:number):void {
        App.ControllerManager.applyFunc(ControllerConst.Loading, LoadingConst.SetProgress, itemsLoaded, itemsTotal);
    }

    /**
     * 初始化所有模块
     */
    private initModule():void{
        App.ControllerManager.register(ControllerConst.Servers, new ServerChooseController());
        App.ControllerManager.register(ControllerConst.Login, new LoginController());
        App.ControllerManager.register(ControllerConst.Home, new HomeController());
        App.ControllerManager.register(ControllerConst.Room, new RoomController());
        App.ControllerManager.register(ControllerConst.RoomEnter, new RoomEnterController());
        App.ControllerManager.register(ControllerConst.ReplyDismiss, new ReplyDismissController());
        App.ControllerManager.register(ControllerConst.Settlement, new SettlementController());
        App.ControllerManager.register(ControllerConst.Bet, new BetController());
        App.ControllerManager.register(ControllerConst.Chat, new ChatController());
    }

    private initListener():void{
        new RoomNotifyCmdListener(null);
    }
    
}