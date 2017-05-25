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
		App.MessageCenter.addListener(NotifyConst.UPDATE_CUR_BETTING_UID,this.updateCurBettingUid, this);
		App.MessageCenter.addListener(NotifyConst.UPDATE_CUR_PLAYING_UID,this.updateCurPlayingUid, this);
		App.MessageCenter.addListener(NotifyConst.PLAYER_HIT,this.playerHit, this);
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
		this.roomUIView.state = GamingStates.SWITCH_GET_WAITING;//点击要牌就禁用
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
		//MainManager.bankerUid = 0;
		this.totalPoints = 0;
		this.roomView.revert();
		this.roomUIView.revert();
		this.roomUIView.state = GamingStates.PLAYER_READY;//已准备，隐藏准备按钮
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
	}

	private betResp(obj:any){
		this.roomUIView.state = GamingStates.PLAYER_BET;//已下注，隐藏下注按钮
	}

	private hitResp(obj:any){//自己要到了牌
		var card = obj.card;
		//App.TipsUtils.showCenter("ID:"+card.ID+" Kind:"+card.Kind+" Point:"+card.Point);
		if(card == null)return;
		var info:PukeInfo = new PukeInfo(card.ID);
		// this.roomUIView.addMyCard(card);
		// if(MainManager.bankerUid == MainManager.userId){
		// 	this.roomView.getOnePuke(info);
		// }

		//this.totalPoints += parseInt(card.value)/2;
		if(this.totalPoints > 10.5){
			//this.roomUIView.state = GamingStates.BOOM;
		}else{
			//App.TipsUtils.showCenter("当前点数："+this.totalPoints);
		}

		// if(this.roomView.pukeCount >= PukeBar.PUKE_MAX_COUNT){
		// 	this.roomUIView.state = GamingStates.SETTLEMENT;
		// 	this.roomUIView.curtPoints = this.totalPoints;
		// }
	}

	private standResp(obj:any){
		this.roomUIView.state = GamingStates.PLAYER_STAND;//已停牌，隐藏所有按钮
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

	private roundStart(roundId:number,countdownSeconds:number,banker:any):void{//刷新庄家
		this.readyForStartResp(null);
		this.roomUIView.curtRound = roundId;
		var bankerPlayer = banker;
		this.roomUIView.message = "此局开始";
		this.roomUIView.state = GamingStates.ROUND_START;
		this.roomUIView.setPlayerView(bankerPlayer,GamingStates.ROUND_START);
	}

	private bettingStart(countdown_seconds:any):void{
		this.readyForStartResp(null);
		var countdownSeconds = countdown_seconds;
		this.roomUIView.state = GamingStates.BETTING_START;
		this.roomUIView.message = "报名结束，开始下注，倒计时："+countdownSeconds;
	}

	private playerBet(player:any,playerBet:number):void{
		var betPlayer = player;
		var item:RoomSeatItem = this.roomUIView.setPlayerView(betPlayer,GamingStates.PLAYER_BET);
		if(item != null) item.bet = playerBet;
	}

	private playingStart(countdown_seconds:any,bets:any,handInfo:any):void{//逻辑待定
		var countdownSeconds = countdown_seconds;
		this.roomUIView.message = "下注结束, 开始要牌，倒计时："+countdownSeconds;
		this.roomUIView.state = GamingStates.PLAYING_START;

		var betInfo:any;
		var i:number = 0;
		for(i=0; i<bets.length; i++){
			betInfo = bets[i];
			this.roomUIView.setPlayerBet(betInfo);
			if(betInfo.uid == MainManager.bankerUid){
				
			}
		}

		if(handInfo.uid == MainManager.userId){
			this.roomUIView.addHandcards(handInfo);
			if(handInfo.uid == MainManager.bankerUid){//庄家的牌，同时显示在桌面上
				var cards:any = handInfo.cards;
				for(var i=0; i<cards.length; i++){
					if(i == 0){
						this.roomView.getOnePuke(null);
					}else{
						this.roomView.getOnePuke(new PukeInfo(cards[i].ID));
					}
				}
			}else{//显示一张庄家的底牌在桌面上
				this.roomView.getOnePuke(null);
			}
		}
	}

	private updateCurBettingUid(player:any):void{
		var curPlayer = player;
		if(curPlayer.uid == MainManager.userId){
			this.roomUIView.state = GamingStates.SWITCH_BETTING;
		}else{
			this.roomUIView.state = GamingStates.SWITCH_BET_WAITING;
		}
		this.roomUIView.setPlayerView(curPlayer,GamingStates.SWITCH_BETTING);
	}

	private updateCurPlayingUid(player:any):void{
		var curPlayer = player;
		if(curPlayer.uid == MainManager.userId){
			this.roomUIView.state = GamingStates.SWITCH_GETTING;
		}else{
			this.roomUIView.state = GamingStates.SWITCH_GET_WAITING;
		}
		this.roomUIView.setPlayerView(curPlayer,GamingStates.SWITCH_GETTING);
	}

	private playerHit(uid:number,card:any):void{
		this.roomUIView.addCard(uid,card);
		if(uid == MainManager.bankerUid){//庄家的牌，同时显示在桌面上
			this.roomView.getOnePuke(new PukeInfo(card.ID));
		}
	}

	private playerStand(player:any,burst:Boolean,card:any):void{
		//Log.trace("停牌："+standPlayer.uid);
		if(burst){
			App.TipsUtils.showCenter(player.nick+"已爆牌");
			// 底牌(如果是爆牌, 就会把底牌公布)
			this.roomUIView.showHiddenCard(player,card);
			if(player.uid == MainManager.bankerUid){
				this.roomView.showHiddenPuke(new PukeInfo(card.ID));
			}
		}
		this.roomUIView.setPlayerView(player,GamingStates.PLAYER_STAND);
		if(player.uid == MainManager.userId){
			this.roomUIView.state = GamingStates.PLAYER_STAND;
		}
	}

	private roundFinish(roundId:number,maxCatUid:number,settlements:any):void{
		this.roomUIView.message = "此局结束";
		this.roomUIView.state = GamingStates.ROUND_FINISH;
		setTimeout(function() {
			App.ViewManager.open(ViewConst.Settlement,roundId,maxCatUid,settlements);
		}, 3000);
		
	}
	
	private gameFinish(obj:any):void{
		if(App.SceneManager.getCurrScene() == SceneConsts.Room.valueOf()){
			App.TipsUtils.showCenter("牌局结束，返回大厅");
			setTimeout(function() {
				App.SceneManager.runScene(SceneConsts.Home);//返回首页
			}, 4000);
		}
	}
}