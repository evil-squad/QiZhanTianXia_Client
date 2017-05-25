var RoomController = (function (_super) {
    __extends(RoomController, _super);
    function RoomController() {
        _super.call(this);
        this.totalPoints = 0;
        this.proxy = new RoomProxy(this);
        this.roomView = new RoomView(this, LayerManager.Room_Main);
        App.ViewManager.register(ViewConst.Room, this.roomView);
        this.roomUIView = new RoomUIView(this, LayerManager.Room_Main);
        App.ViewManager.register(ViewConst.RoomUI, this.roomUIView);
        this.registerFunc(RoomConst.NOTIFY, this.notify, this);
        App.MessageCenter.addListener(NotifyConst.PLAYER_ENTER, this.onPlayersChange, this);
        App.MessageCenter.addListener(NotifyConst.PLAYER_LEAVE, this.onPlayersChange, this);
        App.MessageCenter.addListener(NotifyConst.PLAYER_READY, this.playerReady, this);
        App.MessageCenter.addListener(NotifyConst.ROOM_START, this.onRoomStart, this);
        App.MessageCenter.addListener(NotifyConst.GO_NEXT_ROUND, this.goNextRound, this);
        App.MessageCenter.addListener(NotifyConst.ROUND_START, this.roundStart, this);
        App.MessageCenter.addListener(NotifyConst.BETTING_START, this.bettingStart, this);
        App.MessageCenter.addListener(NotifyConst.PLAYER_BET, this.playerBet, this);
        App.MessageCenter.addListener(NotifyConst.PLAYING_START, this.playingStart, this);
        App.MessageCenter.addListener(NotifyConst.UPDATE_CUR_BETTING_UID, this.updateCurBettingUid, this);
        App.MessageCenter.addListener(NotifyConst.UPDATE_CUR_PLAYING_UID, this.updateCurPlayingUid, this);
        App.MessageCenter.addListener(NotifyConst.PLAYER_HIT, this.playerHit, this);
        App.MessageCenter.addListener(NotifyConst.PLAYER_STAND, this.playerStand, this);
        App.MessageCenter.addListener(NotifyConst.ROUND_FINISH, this.roundFinish, this);
        App.MessageCenter.addListener(NotifyConst.GAME_FINISH, this.gameFinish, this);
    }
    var d = __define,c=RoomController,p=c.prototype;
    p.addEvents = function () {
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
    };
    p.removeEvents = function () {
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
    };
    p.gmReq = function (cmd, body) {
        this.proxy.gmReq(cmd, body);
    };
    p.onDismiss = function () {
        this.proxy.dismissRoom();
    };
    p.onAskDismiss = function () {
        this.proxy.askDismissRoom();
    };
    p.onLeave = function () {
        this.proxy.leaveRoom();
    };
    p.dismissResp = function () {
        App.TipsUtils.showCenter("解散房间");
        App.SceneManager.runScene(SceneConsts.Home);
    };
    p.askDismissResp = function (wait_seconds) {
        App.TipsUtils.showCenter("发起解散,剩余时间:" + wait_seconds);
        //App.SceneManager.runScene(SceneConsts.Home);
    };
    p.getPlayers = function () {
        this.proxy.getRoomPlayersInfo(RoomManager.playerIds);
    };
    p.leaveResp = function (obj) {
        App.TipsUtils.showCenter("离开房间");
        App.SceneManager.runScene(SceneConsts.Home);
    };
    p.onGetPlayersResp = function (obj) {
        RoomManager.parsePlayers(obj.playerInfo, "room");
        this.roomUIView.refreshView();
        //this.roomView.refreshView(PukeManager.random(13));
    };
    p.notify = function (obj) {
        if (obj.type == NotifyType.PLAYER_ENTER) {
            RoomManager.addPlayer(obj.player_enter.enterer);
        }
    };
    //
    p.onPlayersChange = function (obj) {
        this.roomUIView.refreshView();
    };
    //
    p.getPuke = function (obj) {
        //var info:PukeInfo = this.roomView.getOnePuke();
        //this.totalPoints += info.points;
        if (this.totalPoints > 10.5) {
            this.roomUIView.state = GamingStates.BOOM;
        }
        else {
            App.TipsUtils.showCenter("当前点数：" + this.totalPoints);
        }
        if (this.roomView.pukeCount >= PukeBar.PUKE_MAX_COUNT) {
            this.roomUIView.state = GamingStates.SETTLEMENT;
            this.roomUIView.curtPoints = this.totalPoints;
        }
    };
    //game
    p.readyForStartReq = function () {
        this.proxy.readyForStartReq();
    };
    // private betReq(bet:number){
    // 	this.roomUIView.state = GamingStates.PLAYER_BET;//点击下注就禁用
    // 	this.proxy.betReq(bet);
    // }
    p.hitReq = function () {
        this.roomUIView.state = GamingStates.SWITCH_GET_WAITING; //点击要牌就禁用
        this.proxy.hitReq();
    };
    p.standReq = function () {
        this.roomUIView.state = GamingStates.PLAYER_STAND; //点击停牌就禁用
        this.proxy.standReq();
    };
    p.getGameDataReq = function () {
        this.proxy.getGameDataReq();
    };
    //
    p.readyForStartResp = function (obj) {
        //MainManager.bankerUid = 0;
        this.totalPoints = 0;
        this.roomView.revert();
        this.roomUIView.revert();
        this.roomUIView.state = GamingStates.PLAYER_READY; //已准备，隐藏准备按钮
    };
    p.onRoomStart = function (obj) {
        App.TipsUtils.showCenter("牌局开始");
        this.roomUIView.state = GamingStates.ROOM_START;
        if (App.SceneManager.getCurrScene() != SceneConsts.Room.valueOf()) {
        }
    };
    p.goNextRound = function (obj, roundId) {
        this.roomUIView.curtRound = roundId;
    };
    p.betResp = function (obj) {
        this.roomUIView.state = GamingStates.PLAYER_BET; //已下注，隐藏下注按钮
    };
    p.hitResp = function (obj) {
        var card = obj.card;
        //App.TipsUtils.showCenter("ID:"+card.ID+" Kind:"+card.Kind+" Point:"+card.Point);
        if (card == null)
            return;
        var info = new PukeInfo(card.ID);
        // this.roomUIView.addMyCard(card);
        // if(MainManager.bankerUid == MainManager.userId){
        // 	this.roomView.getOnePuke(info);
        // }
        //this.totalPoints += parseInt(card.value)/2;
        if (this.totalPoints > 10.5) {
        }
        else {
        }
        // if(this.roomView.pukeCount >= PukeBar.PUKE_MAX_COUNT){
        // 	this.roomUIView.state = GamingStates.SETTLEMENT;
        // 	this.roomUIView.curtPoints = this.totalPoints;
        // }
    };
    p.standResp = function (obj) {
        this.roomUIView.state = GamingStates.PLAYER_STAND; //已停牌，隐藏所有按钮
    };
    p.getGameDataResp = function (obj) {
        // var cards = obj.cards;
        // var count = cards.length;
        // var str = "";
        // for(var i=0; i<count; i++){
        // 	str += cards[i].Kind + cards[i].Point+" ";
        // }
        // App.TipsUtils.showCenter(str);
        this.roomUIView.state = GamingStates.ROUND_FINISH;
        App.ViewManager.open(ViewConst.Settlement);
    };
    //
    p.playerReady = function (obj) {
        var readyPlayer = obj;
        this.roomUIView.message = "玩家" + readyPlayer.nick + "已准备";
        this.roomUIView.setPlayerView(readyPlayer, GamingStates.PLAYER_READY);
    };
    p.roundStart = function (roundId, countdownSeconds, banker) {
        this.readyForStartResp(null);
        this.roomUIView.curtRound = roundId;
        var bankerPlayer = banker;
        this.roomUIView.message = "此局开始";
        this.roomUIView.state = GamingStates.ROUND_START;
        this.roomUIView.setPlayerView(bankerPlayer, GamingStates.ROUND_START);
    };
    p.bettingStart = function (countdown_seconds) {
        this.readyForStartResp(null);
        var countdownSeconds = countdown_seconds;
        this.roomUIView.state = GamingStates.BETTING_START;
        this.roomUIView.message = "报名结束，开始下注，倒计时：" + countdownSeconds;
    };
    p.playerBet = function (player, playerBet) {
        var betPlayer = player;
        var item = this.roomUIView.setPlayerView(betPlayer, GamingStates.PLAYER_BET);
        if (item != null)
            item.bet = playerBet;
    };
    p.playingStart = function (countdown_seconds, bets, handInfo) {
        var countdownSeconds = countdown_seconds;
        this.roomUIView.message = "下注结束, 开始要牌，倒计时：" + countdownSeconds;
        this.roomUIView.state = GamingStates.PLAYING_START;
        var betInfo;
        var i = 0;
        for (i = 0; i < bets.length; i++) {
            betInfo = bets[i];
            this.roomUIView.setPlayerBet(betInfo);
            if (betInfo.uid == MainManager.bankerUid) {
            }
        }
        if (handInfo.uid == MainManager.userId) {
            this.roomUIView.addHandcards(handInfo);
            if (handInfo.uid == MainManager.bankerUid) {
                var cards = handInfo.cards;
                for (var i = 0; i < cards.length; i++) {
                    if (i == 0) {
                        this.roomView.getOnePuke(null);
                    }
                    else {
                        this.roomView.getOnePuke(new PukeInfo(cards[i].ID));
                    }
                }
            }
            else {
                this.roomView.getOnePuke(null);
            }
        }
    };
    p.updateCurBettingUid = function (player) {
        var curPlayer = player;
        if (curPlayer.uid == MainManager.userId) {
            this.roomUIView.state = GamingStates.SWITCH_BETTING;
        }
        else {
            this.roomUIView.state = GamingStates.SWITCH_BET_WAITING;
        }
        this.roomUIView.setPlayerView(curPlayer, GamingStates.SWITCH_BETTING);
    };
    p.updateCurPlayingUid = function (player) {
        var curPlayer = player;
        if (curPlayer.uid == MainManager.userId) {
            this.roomUIView.state = GamingStates.SWITCH_GETTING;
        }
        else {
            this.roomUIView.state = GamingStates.SWITCH_GET_WAITING;
        }
        this.roomUIView.setPlayerView(curPlayer, GamingStates.SWITCH_GETTING);
    };
    p.playerHit = function (uid, card) {
        this.roomUIView.addCard(uid, card);
        if (uid == MainManager.bankerUid) {
            this.roomView.getOnePuke(new PukeInfo(card.ID));
        }
    };
    p.playerStand = function (player, burst, card) {
        //Log.trace("停牌："+standPlayer.uid);
        if (burst) {
            App.TipsUtils.showCenter(player.nick + "已爆牌");
            // 底牌(如果是爆牌, 就会把底牌公布)
            this.roomUIView.showHiddenCard(player, card);
            if (player.uid == MainManager.bankerUid) {
                this.roomView.showHiddenPuke(new PukeInfo(card.ID));
            }
        }
        this.roomUIView.setPlayerView(player, GamingStates.PLAYER_STAND);
        if (player.uid == MainManager.userId) {
            this.roomUIView.state = GamingStates.PLAYER_STAND;
        }
    };
    p.roundFinish = function (roundId, maxCatUid, settlements) {
        this.roomUIView.message = "此局结束";
        this.roomUIView.state = GamingStates.ROUND_FINISH;
        setTimeout(function () {
            App.ViewManager.open(ViewConst.Settlement, roundId, maxCatUid, settlements);
        }, 3000);
    };
    p.gameFinish = function (obj) {
        if (App.SceneManager.getCurrScene() == SceneConsts.Room.valueOf()) {
            App.TipsUtils.showCenter("牌局结束，返回大厅");
            setTimeout(function () {
                App.SceneManager.runScene(SceneConsts.Home); //返回首页
            }, 4000);
        }
    };
    return RoomController;
}(BaseController));
egret.registerClass(RoomController,'RoomController');
//# sourceMappingURL=RoomController.js.map