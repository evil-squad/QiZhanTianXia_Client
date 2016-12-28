class RoomEnterController extends BaseController {

    private enterView:RoomEnterPanel;
	private proxy:RoomEnterProxy;

    public constructor() {
        super();

        this.enterView = new RoomEnterPanel(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.RoomEnter, this.enterView);

		this.proxy = new RoomEnterProxy(this);

		this.registerFunc(HomeConst.ROOM_ENTER_REQ, this.onEnter, this);
		this.registerFunc(HomeConst.ROOM_ENTER_RESP, this.enterResp, this);
    }

	private onEnter(roomid:string):void{
        RoomManager.roomId = roomid;
        this.proxy.enterRoom(roomid);
    }

	private enterResp(obj:any):void{
		RoomManager.parsePlayers(obj.players,"room enter");
        App.SceneManager.runScene(SceneConsts.Room);
    }
}