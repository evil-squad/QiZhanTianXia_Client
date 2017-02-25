var RoomScene = (function (_super) {
    __extends(RoomScene, _super);
    /**
     * 构造函数
     */
    function RoomScene() {
        _super.call(this);
    }
    var d = __define,c=RoomScene,p=c.prototype;
    /**
     * 进入Scene调用
     */
    p.onEnter = function () {
        _super.prototype.onEnter.call(this);
        this.addLayerAt(LayerManager.Room_Main, 0);
        this.addLayer(LayerManager.UI_Popup);
        this.addLayer(LayerManager.UI_Tips);
        App.ViewManager.open(ViewConst.RoomUI);
        App.ViewManager.open(ViewConst.Room);
        //播放背景音乐
        App.SoundManager.playBg("sound_bg");
    };
    /**
     * 退出Scene调用
     */
    p.onExit = function () {
        _super.prototype.onExit.call(this);
    };
    return RoomScene;
}(BaseScene));
egret.registerClass(RoomScene,'RoomScene');
//# sourceMappingURL=RoomScene.js.map