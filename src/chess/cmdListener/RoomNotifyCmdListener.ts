class RoomNotifyCmdListener extends BaseProxy{

	public constructor($controller:BaseController){
		super($controller);
		this.receiveServerMsg(Cmd.ROOM_NOTIFY, this.onRoomNotify, this);
	}

	private onRoomNotify(obj:any):void{

		App.TipsUtils.showTips("[通知]"+obj.notify.type+" "+NotifyType.getDesc(parseInt(obj.notify.type)),Direction.TOP);
		Log.trace("-------------------"+"[通知]"+obj.notify.type+" "+NotifyType.getDesc(parseInt(obj.notify.type)));
		
		switch(obj.notify.type){
			case NotifyType.NOOP:
				break;
			case NotifyType.ROOM_CLOSE:
				this.closeRoom(obj.notify);
				break;
			case NotifyType.PLAYER_ENTER:// 进入通知: 房间所有人(不包括进入者自己)
				this.playerEnter(obj.notify);
				break;
			case NotifyType.PLAYER_LEAVE:// 离开通知: 房间所有人(不包括退出者自己)
				this.playerLeave(obj.notify);
				break;
			case NotifyType.ASK_DISMISS_ROOM:// 解散通知: 不包括解散者自己, 包括ob
				this.askDismissRoom(obj.notify);
				break;
			case NotifyType.PLAYER_READY:
				this.playerReady(obj.notify);
			break;
			case NotifyType.ROOM_START:
				this.startRoom(obj.notify);
				break;
			case NotifyType.REPLY_DISMISS_ROOM:
				this.replyDismissRoom(obj.notify);
				break;
			case NotifyType.FAIL_DISMISS_ROOM:
				this.failDismissRoom(obj.notify);
				break;

			case NotifyType.GO_NEXT_ROUND:
				this.goNextRound(obj.notify);
				break;
			case NotifyType.ROUND_START:
				this.roundStart(obj.notify);
				break;
			case NotifyType.BETTING_START:
				this.bettingStart(obj.notify);
				break;
			case NotifyType.PLAYER_BET:
				this.playerBet(obj.notify);
				break;
			case NotifyType.PLAYING_START:
				this.playingStart(obj.notify);
				break;
			case NotifyType.PLAYER_STAND:
				this.playerStand(obj.notify);
				break;
			case NotifyType.ROUND_FINISH:
				this.roundFinish(obj.notify);
				break;
			case NotifyType.GAME_FINISH:
				this.gameFinish(obj.notify);
				break;
			default:
				App.TipsUtils.showCenter("未知通知："+obj.notify.type)
				break;
		}
	}

	private closeRoom(obj:any):void{
		var roomCloseInfo = obj.roomClose;

		RoomManager.clearPlayers();
		RoomManager.clearRoomInfo();

		if(RoomManager.hasRoomInfo && roomCloseInfo.roomid == RoomManager.roomId){
			switch(roomCloseInfo.reason){
				case RoomCloseReason.EMPTY:
					App.TipsUtils.showCenter("房间无人");
				break;
				case RoomCloseReason.DISMISS:
					App.TipsUtils.showCenter("房间已解散");
				break;
				case RoomCloseReason.ROOMSRV_CLOSE:
					App.TipsUtils.showCenter("服务器停服");
				break;
			}
			if(App.SceneManager.getCurrScene() != SceneConsts.Home.valueOf()){
				App.SceneManager.runScene(SceneConsts.Home);//返回主页
			}
			App.SceneManager.runScene(SceneConsts.Home);//返回Home页
		}else{
			App.TipsUtils.showCenter("房间关闭数据有误"+roomCloseInfo.roomid);
		}
	}

	private playerEnter(obj:any):void{
		var playerEnterInfo = obj.playerEnter;
		if(RoomManager.hasRoomInfo){
			RoomManager.addPlayer(playerEnterInfo.enterer);
			if(App.SceneManager.getCurrScene() != SceneConsts.Room.valueOf()){
				App.SceneManager.runScene(SceneConsts.Room);//进入房间
			}else{//刷新房间
				App.MessageCenter.dispatch(NotifyConst.PLAYER_ENTER);
			}
		}else{
			Log.trace(obj);
			App.TipsUtils.showCenter("系统错误：无房间信息，玩家不可进入");
		}
	}

	private playerLeave(obj:any):void{
		var playerLeaveInfo = obj.playerLeave;
		var leaver = playerLeaveInfo.leaver;
		if(leaver != undefined && leaver != null){
			//移除相应玩家
			RoomManager.removePlayer(leaver.uid);//bool ob,int 32 idx
			//刷新房间
			App.MessageCenter.dispatch(NotifyConst.PLAYER_LEAVE);
		}
	}

	private askDismissRoom(obj:any):void{
		var askDismissInfo = obj.askDismiss;
		var dismisser = askDismissInfo.dismisser;
		if(dismisser != undefined && dismisser != null){
			var ask_second = askDismissInfo.askSecond;
			var wait_seconds = askDismissInfo.waitSeconds;
			var info = RoomManager.getPlayer(dismisser);
			if(info != null){
				App.TipsUtils.showCenter(info.nick+"发起解散，发起时间："+ask_second+"，剩余时间："+wait_seconds);

				//弹出同意/不同意对话框
				App.ViewManager.open(ViewConst.ReplyDismiss);
			}else{
				App.TipsUtils.showCenter("系统错误：该玩家不可发起解散请求，玩家id="+dismisser);
			}
		}
		App.ViewManager.open(ViewConst.ReplyDismiss);
	}

	private startRoom(obj:any):void{
		var roomStartInfo = obj.roomStart;
		var roomId = roomStartInfo.roomid;
		if(RoomManager.hasRoomInfo && RoomManager.roomId == roomId){
			//人齐了, 牌局开始
			App.MessageCenter.dispatch(NotifyConst.ROOM_START);
		}else{
			App.TipsUtils.showCenter("系统错误：游戏开始失败，不在此房间，roomid="+roomId);
		}
	}

	private replyDismissRoom(obj:any):void{
		var reply_dismiss = obj.replyDismiss;
		var replier:number = reply_dismiss.replier;
		var agree:boolean = reply_dismiss.agree;
		if(agree){
			App.TipsUtils.showCenter("同意解散");
		}else{
			App.TipsUtils.showCenter("不同意解散");
		}
	}

	private failDismissRoom(obj:any):void{
		var fail_dismiss = obj.failDismiss;
		var roomid:string = fail_dismiss.roomid;
		var reason:number = fail_dismiss.reason;
		if(reason == 0){
			App.TipsUtils.showCenter("解除失败，多数不同意");
		}else{
			App.TipsUtils.showCenter("解除失败，原因未知，reason="+reason);
		}
	}

	//
	private goNextRound(obj:any):void{
		var go_next_round = obj.goNextRound;
		var room_id = go_next_round.roomid;
		var round_id = go_next_round.roundId;
		//App.TipsUtils.showCenter("开始第"+round_id+"局");
		App.MessageCenter.dispatch(NotifyConst.GO_NEXT_ROUND,room_id,round_id);//-------------------转到下一局
	}

	private playerReady(obj:any):void{
		var player_ready = obj.playerReady;
		var uid = player_ready.uid;//已准备的玩家uid
		var player = RoomManager.getPlayer(uid);
		if(player != null){
			App.MessageCenter.dispatch(NotifyConst.PLAYER_READY,player);//-------------------牌友已准备好，刷新显示
		}else{
			App.TipsUtils.showCenter("uid错误，不存在此玩家，uid="+uid);
		}
	}

	private roundStart(obj:any):void{
		var round_start = obj.roundStart;
		var round_id = round_start.roundId;// 第几局
		var countdown_seconds = round_start.countdownSeconds;// 倒计时多少秒
		var banker = round_start.banker;// 庄家 uid
		var bankerPlayer = RoomManager.getPlayer(banker);
		if(bankerPlayer != null){
			App.TipsUtils.showCenter("开始第"+round_id+"局，倒计时："+countdown_seconds);
			App.MessageCenter.dispatch(NotifyConst.ROUND_START,round_id,countdown_seconds,bankerPlayer);//-------------------牌局开始，倒计时
		}else{
			App.TipsUtils.showCenter("庄家uid错误，不存在此庄家，uid="+banker)
		}
	}

	private bettingStart(obj:any):void{
		var betting_start = obj.bettingStart;
		var countdown_seconds = betting_start.countdownSeconds;
		App.TipsUtils.showCenter("下注，倒计时："+countdown_seconds);//-------------------刷新下注倒计时
		App.MessageCenter.dispatch(NotifyConst.BETTING_START,countdown_seconds);
	}

	private playerBet(obj:any):void{
		var player_bet = obj.playerBet;
		var uid = player_bet.uid;
		var bet = player_bet.bet;// 下注数
		var player = RoomManager.getPlayer(uid);
		if(player != null){
			App.TipsUtils.showCenter(player.nick+"下注"+bet)
			App.MessageCenter.dispatch(NotifyConst.PLAYER_BET,player,bet);//-------------------刷新用户下注信息
		}else{
			App.TipsUtils.showCenter("下注玩家uid错误，不存在此玩家，uid="+uid)
		}
	}

	private playingStart(obj:any):void{
		var playing_start = obj.playingStart;
		var countdown_seconds = playing_start.countdownSeconds;
		var bets = playing_start.bets;
		var hands = playing_start.hands;
		App.TipsUtils.showCenter("开始要牌，倒计时："+countdown_seconds);
		App.MessageCenter.dispatch(NotifyConst.PLAYING_START,countdown_seconds,bets,hands);//-------------------刷新要牌倒计时
	}

	private playerStand(obj:any):void{
		var player_stand = obj.playerStand;
		var uid = player_stand.uid;
		var player = RoomManager.getPlayer(uid);
		if(player != null){
			App.TipsUtils.showCenter(player.nick+"停牌");
			App.MessageCenter.dispatch(NotifyConst.PLAYER_STAND,player);//-------------------刷新停牌
		}else{
			App.TipsUtils.showCenter("停牌玩家uid错误，不存在此玩家，uid="+uid);
		}
	}

	private roundFinish(obj:any):void{
		var round_finish = obj.roundFinish;
		var roundId:number = round_finish.roundId;
		var maxCatUid:number = round_finish.maxCatUid;
		var settlements = round_finish.settlements;
		var count = settlements.length;
		for(var i=0; i<count; i++){
			
		}
		App.MessageCenter.dispatch(NotifyConst.ROUND_FINISH,roundId,maxCatUid,settlements);//-------------------牌局结束，重置页面
	}

	private gameFinish(obj:any):void{
		var game_finish = obj.gameFinish;
		var roomid = game_finish.roomid;
		if(roomid != RoomManager.roomId){
			App.TipsUtils.showCenter("房间结束，房间号错误，roomID:"+roomid)
		}
		App.MessageCenter.dispatch(NotifyConst.GAME_FINISH);//-------------------游戏结束，回到首页
	}
}