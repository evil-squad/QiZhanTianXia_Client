class RoomController  extends BaseController{

	private proxy:RoomProxy;
	private roomView:RoomView;
	private roomUIView:RoomUIView;

	public constructor() {
		super();

		this.proxy = new RoomProxy(this);
        this.roomView = new RoomView(this, LayerManager.Room_Main);
        App.ViewManager.register(ViewConst.Room, this.roomView);
        this.roomUIView = new RoomUIView(this, LayerManager.Room_Main);
        App.ViewManager.register(ViewConst.RoomUI, this.roomUIView);
        this.registerFunc(HomeConst.ROOM_DISMISS_REQ, this.onDismiss, this);
        this.registerFunc(HomeConst.ROOM_LEAVE_REQ, this.onLeave, this);
        this.registerFunc(HomeConst.ROOM_PLAYERS_GET_REQ, this.getPlayers, this);
        this.registerFunc(HomeConst.ROOM_DISMISS_RESP, this.dismissResp, this);
        this.registerFunc(HomeConst.ROOM_LEAVE_RESP, this.leaveResp, this);
        this.registerFunc(HomeConst.ROOM_PLAYERS_GET_RESP, this.onGetPlayersResp, this);
	}

	private onDismiss(){
		this.proxy.dismissRoom();
	}

	private onLeave(){
		this.proxy.leaveRoom();
	}

	private dismissResp(){
		App.TipsUtils.showCenter("解释房间");
        App.SceneManager.runScene(SceneConsts.Home);
	}

	private getPlayers(){
		this.proxy.getRoomPlayersInfo(RoomManager.playerIds);
	}

	private leaveResp(obj:any){
		App.TipsUtils.showCenter("离开房间");
        App.SceneManager.runScene(SceneConsts.Home);
	}

	private onGetPlayersResp(obj:any){
		var players = obj.playerInfo;
        var player;
        var ps = "";
        RoomManager.clearPlayers();
        for (var i = 0; i < players.length; i++) {
            ps += players[i].nick + " ";
            RoomManager.addPlayer(new PlayerInfo(players[i]));
        }
		this.roomView.refreshView(MahjongManager.random(20));
        App.TipsUtils.showCenter("牌友: " + ps);
	}
}