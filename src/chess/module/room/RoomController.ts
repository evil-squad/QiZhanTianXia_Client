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

		App.MessageCenter.addListener(NotifyConst.PLAYER_READY,this.playerReady, this);
		App.MessageCenter.addListener(NotifyConst.ROOM_START,this.onRoomStart, this);
		App.MessageCenter.addListener(NotifyConst.GO_NEXT_ROUND,this.goNextRound, this);
		App.MessageCenter.addListener(NotifyConst.ROUND_START,this.roundStart, this);
		App.MessageCenter.addListener(NotifyConst.BETTING_START,this.bettingStart, this);
		App.MessageCenter.addListener(NotifyConst.PLAYER_BET,this.playerBet, this);
		App.MessageCenter.addListener(NotifyConst.PLAYING_START,this.playingStart, this);
		App.MessageCenter.addListener(NotifyConst.PLAYER_STAND,this.playerStand, this);
		App.MessageCenter.addListener(NotifyConst.ROUND_FINISH,this.roundFinish, this);
		App.MessageCenter.addListener(NotifyConst.GAME_FINISH,this.gameFinish, this);
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

		this.registerFunc(RoomConst.READY_FOR_START_REQ, this.readyForStartReq, this);
		//this.registerFunc(RoomConst.BET_REQ, this.betReq, this);
		this.registerFunc(RoomConst.HIT_REQ, this.hitReq, this);
		this.registerFunc(RoomConst.STAND_REQ, this.standReq, this);
		this.registerFunc(RoomConst.GET_GAME_DATA_REQ, this.getGameDataReq, this);

		this.registerFunc(RoomConst.READY_FOR_START_RESP, this.readyForStartResp, this);
		this.registerFunc(RoomConst.BET_RESP, this.betResp, this);
		this.registerFunc(RoomConst.HIT_RESP, this.hitResp, this);
		this.registerFunc(RoomConst.STAND_RESP, this.standResp, this);
		this.registerFunc(RoomConst.GET_GAME_DATA_RESP, this.getGameDataResp, this);

		this.registerFunc(RoomConst.GM, this.gmReq, this);

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

		this.removeFunc(RoomConst.READY_FOR_START_REQ);
		//this.removeFunc(RoomConst.BET_REQ);
		this.removeFunc(RoomConst.HIT_REQ);
		this.removeFunc(RoomConst.STAND_REQ);
		this.removeFunc(RoomConst.GET_GAME_DATA_REQ);

		this.removeFunc(RoomConst.READY_FOR_START_RESP);
		this.removeFunc(RoomConst.BET_RESP);
		this.removeFunc(RoomConst.HIT_RESP);
		this.removeFunc(RoomConst.STAND_RESP);
		this.removeFunc(RoomConst.GET_GAME_DATA_RESP);

		this.removeFunc(RoomConst.GM);
	}

	private gmReq(cmd:number,body:string){
        this.proxy.gmReq(cmd,body);
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
		//this.roomView.refreshView(PukeManager.random(13));
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

	//
	private getPuke(obj:any):void{
		//var info:PukeInfo = this.roomView.getOnePuke();

		//this.totalPoints += info.points;
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

	//game
	private readyForStartReq(){
		this.proxy.readyForStartReq();
	} 

	// private betReq(bet:number){
	// 	this.roomUIView.state = GamingStates.PLAYER_BET;//点击下注就禁用
	// 	this.proxy.betReq(bet);
	// }

	private hitReq(){
		this.proxy.hitReq();
	}

	private standReq(){
		this.roomUIView.state = GamingStates.PLAYER_STAND;//点击停牌就禁用
		this.proxy.standReq();
	}

	private getGameDataReq(){
		this.proxy.getGameDataReq();
	}

	//
	private readyForStartResp(obj:any){
		this.totalPoints = 0;
		this.roomView.revert();
		this.roomUIView.revert();
		this.roomUIView.state = GamingStates.PLAYER_READY;
	}

	private onRoomStart(obj:any):void{
		App.TipsUtils.showCenter("牌局开始");
		this.roomUIView.state = GamingStates.ROOM_START;
		if(App.SceneManager.getCurrScene() != SceneConsts.Room.valueOf()){
			//自动进入？
			//App.SceneManager.runScene(SceneConsts.Room);//进入房间
		}
	}

	private goNextRound(obj:any,roundId:number){
		this.roomUIView.curtRound = roundId;
		this.roomUIView.state = GamingStates.ROUND_START;//Waiting
	}

	private betResp(obj:any){
		//this.roomUIView.state = GamingStates.PLAYER_BET;//交给Notify的PlayingStart来控制按钮
	}

	private hitResp(obj:any){
		var card = obj.card;
		//App.TipsUtils.showCenter("ID:"+card.ID+" Kind:"+card.Kind+" Point:"+card.Point);

		var info:PukeInfo = new PukeInfo(card.ID);
		this.roomView.getOnePuke(info);

		this.totalPoints += parseInt(card.Point);
		if(this.totalPoints > 10.5){
			this.roomUIView.state = GamingStates.BOOM;
		}else{
			//App.TipsUtils.showCenter("当前点数："+this.totalPoints);
		}

		if(this.roomView.pukeCount >= PukeBar.PUKE_MAX_COUNT){
			this.roomUIView.state = GamingStates.SETTLEMENT;
			this.roomUIView.curtPoints = this.totalPoints;
		}
	}

	private standResp(obj:any){
		//this.roomUIView.state = GamingStates.PLAYER_STAND;//
	}

	private getGameDataResp(obj:any){
		// var cards = obj.cards;
		// var count = cards.length;
		// var str = "";
		// for(var i=0; i<count; i++){
		// 	str += cards[i].Kind + cards[i].Point+" ";
		// }
		// App.TipsUtils.showCenter(str);
		this.roomUIView.state = GamingStates.ROUND_FINISH;

		App.ViewManager.open(ViewConst.Settlement);
	}

	//
	private playerReady(obj:any):void{
		var readyPlayer = obj;
		this.roomUIView.message = "玩家"+readyPlayer.nick+"已准备";
		this.roomUIView.setPlayerView(readyPlayer,GamingStates.PLAYER_READY);
	}

	private roundStart(roundId:number,countdownSeconds:number,banker:any):void{
		this.roomUIView.curtRound = roundId;
		var bankerPlayer = banker;
		this.roomUIView.message = "此局开始";
		this.roomUIView.state = GamingStates.ROUND_START;
		this.roomUIView.setPlayerView(bankerPlayer,GamingStates.ROUND_START);
	}

	private bettingStart(countdown_seconds:any):void{
		var countdownSeconds = countdown_seconds;
		this.roomUIView.state = GamingStates.BETTING_START;
		this.roomUIView.message = "报名结束，开始下注，倒计时："+countdownSeconds;
	}

	private playerBet(player:any,playerBet:number):void{
		var betPlayer = player;
		var bet = playerBet;
		this.roomUIView.setPlayerView(betPlayer,GamingStates.PLAYER_BET);
	}

	private playingStart(countdown_seconds:any,bets:any,hands:any):void{
		var countdownSeconds = countdown_seconds;
		this.roomUIView.message = "下注结束, 开始要牌，倒计时："+countdownSeconds;
		this.roomUIView.state = GamingStates.PLAYING_START;

		var betInfo:any;
		var i:number = 0;
		for(i=0; i<bets.length; i++){
			betInfo = bets[i];
			if(betInfo.uid == MainManager.userId){
				this.roomUIView.setMyBet(betInfo.bet);
			}else{
				this.roomUIView.setPlayerBet(betInfo);
			}
		}

		var handInfo:any;
		var cards:any;
		var cardIndx:number = 0;
		for(i=0; i<hands.length; i++){
			handInfo = hands[i];
			if(handInfo.uid == MainManager.userId){
				cards = handInfo.cards;
				for(cardIndx=0; cardIndx<cards.length; cardIndx++){
					this.roomView.getOnePuke(new PukeInfo(cards[cardIndx].ID));
				}
			}else{
				this.roomUIView.addHandcards(handInfo);
			}
		}
	}

	private playerStand(obj:any):void{
		var standPlayer = obj;
		Log.trace("停牌："+standPlayer.uid);
		this.roomUIView.setPlayerView(standPlayer,GamingStates.PLAYER_STAND);
	}

	private roundFinish(roundId:number,maxCatUid:number,settlements:any):void{
		this.roomUIView.message = "此局结束";
		App.ViewManager.open(ViewConst.Settlement,roundId,maxCatUid,settlements);
	}
	
	private gameFinish(obj:any):void{
		if(App.SceneManager.getCurrScene() == SceneConsts.Room.valueOf()){
			App.SceneManager.runScene(SceneConsts.Home);//返回首页
		}
	}
}