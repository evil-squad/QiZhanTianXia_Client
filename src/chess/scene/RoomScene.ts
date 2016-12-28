class RoomScene extends BaseScene{
    /**
     * 构造函数
     */
    public constructor(){
        super();
    }

    /**
     * 进入Scene调用
     */
    public onEnter():void{
        super.onEnter();

        this.addLayerAt(LayerManager.Room_Main, 0);
        this.addLayer(LayerManager.UI_Tips);
        
        App.ViewManager.open(ViewConst.RoomUI);
        App.ViewManager.open(ViewConst.Room);
        //播放背景音乐
        App.SoundManager.playBg("sound_bg");
    }

    /**
     * 退出Scene调用
     */
    public onExit():void{
        super.onExit();
    }
}
