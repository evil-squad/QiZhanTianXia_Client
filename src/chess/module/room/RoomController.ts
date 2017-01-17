class RoomController  extends BaseController{

	private proxy:RoomProxy;
	private roomView:RoomView;
	private roomUIView:RoomUIView;

	private totalPoints:number = 0;

	public constructor() {
		super();

		this.proxy = new RoomProxy(this);
        this.roomView = new RoomView(this, LayerManager.Room_Main);
        App.ViewManager.register(ViewConst.Room, this.roomView);
        this.roomUIView = new RoomUIView(this, LayerManager.Room_Main);
        App.ViewManager.register(ViewConst.RoomUI, this.roomUIView);

		this.registerFunc(RoomConst.NOTIFY, this.notify, this);
		App.MessageCenter.addListener(NotifyConst.PLAYER_ENTER,this.onPlayersChange, this);
		App.MessageCenter.addListener(NotifyConst.PLAYER_LEAVE,this.onPlayersChange, this);
		App.MessageCenter.addListener(NotifyConst.ROOM_START,this.onRoomStart, this);
	}

	public addEvents():void{
		this.registerFunc(RoomConst.ROOM_DISMISS_REQ, this.onDismiss, this);
		this.registerFunc(RoomConst.ROOM_ASK_DISMISS_REQ, this.onAskDismiss, this);
        this.registerFunc(RoomConst.ROOM_LEAVE_REQ, this.onLeave, this);
        this.registerFunc(RoomConst.ROOM_PLAYERS_GET_REQ, this.getPlayers, this);

        this.registerFunc(RoomConst.ROOM_DISMISS_RESP, this.dismissResp, this);
		this.registerFunc(RoomConst.ROOM_ASK_DISMISS_RESP, this.askDismissResp, this);
        this.registerFunc(RoomConst.ROOM_LEAVE_RESP, this.leaveResp, this);
        this.registerFunc(RoomConst.ROOM_PLAYERS_GET_RESP, this.onGetPlayersResp, this);

		this.registerFunc(RoomConst.ROOM_PUKE_GET_REQ, this.getPuke, this);

		this.totalPoints = 0;
	}

	public removeEvents():void{
		this.removeFunc(RoomConst.ROOM_DISMISS_REQ);
		this.removeFunc(RoomConst.ROOM_ASK_DISMISS_REQ);
		this.removeFunc(RoomConst.ROOM_LEAVE_REQ);
		this.removeFunc(RoomConst.ROOM_PLAYERS_GET_REQ);

		this.removeFunc(RoomConst.ROOM_DISMISS_RESP);
		this.removeFunc(RoomConst.ROOM_ASK_DISMISS_RESP);
		this.removeFunc(RoomConst.ROOM_LEAVE_RESP);
		this.removeFunc(RoomConst.ROOM_PLAYERS_GET_RESP);

		this.removeFunc(RoomConst.ROOM_PUKE_GET_REQ);
	}

	private onDismiss(){
		this.proxy.dismissRoom();
	}

	private onAskDismiss(){
		this.proxy.askDismissRoom();
	}

	private onLeave(){
		this.proxy.leaveRoom();
	}

	private dismissResp(){
		App.TipsUtils.showCenter("解散房间");
        App.SceneManager.runScene(SceneConsts.Home);
	}

	private askDismissResp(wait_seconds:number){
		App.TipsUtils.showCenter("发起解散,剩余时间:"+wait_seconds);
        //App.SceneManager.runScene(SceneConsts.Home);
	}

	private getPlayers(){
		this.proxy.getRoomPlayersInfo(RoomManager.playerIds);
	}

	private leaveResp(obj:any){
		App.TipsUtils.showCenter("离开房间");
        App.SceneManager.runScene(SceneConsts.Home);
	}

	private onGetPlayersResp(obj:any){
        RoomManager.parsePlayers(obj.playerInfo,"room");
		this.roomUIView.refreshView();
		this.roomView.refreshView(PukeManager.random(13));
	}

	private notify(obj:any):void{
        if(obj.type == NotifyType.PLAYER_ENTER){
			RoomManager.addPlayer(obj.player_enter.enterer);
        }
    }

	//
	private onPlayersChange(obj:any):void{
		this.roomUIView.refreshView();
	}

	private onRoomStart(obj:any):void{
		App.TipsUtils.showCenter("牌局开始");
		if(App.SceneManager.getCurrScene != SceneConsts.Room.valueOf){
			//自动进入？
			App.SceneManager.runScene(SceneConsts.Room);//进入房间
		}
	}

	//
	private getPuke(obj:any):void{
		var info:PukeInfo = this.roomView.getOnePuke();

		this.totalPoints += info.points;
		if(this.totalPoints > 10.5){
			this.roomUIView.state = GamingStates.BOOM;
		}else{
			App.TipsUtils.showCenter("当前点数："+this.totalPoints);
		}

		if(this.roomView.pukeCount >= PukeBar.PUKE_MAX_COUNT){
			this.roomUIView.state = GamingStates.SETTLEMENT;
			this.roomUIView.curtPoints = this.totalPoints;
		}
	}
}