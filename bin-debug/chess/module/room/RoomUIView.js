var RoomUIView = (function (_super) {
    __extends(RoomUIView, _super);
    function RoomUIView($controller, $parent) {
        _super.call(this, $controller, $parent);
        this._state = GamingStates.NONE;
        //this.skinName = "resource/skins/RoomDebugSkin.exml";
        this.skinName = "resource/skins/RoomUISkin.exml";
        // if(App.DeviceUtils.IsMobile){
        //     this.skinName = "resource/skins/vmobile/RoomViewMSkin.exml";
        // }else{
        //     this.skinName = "resource/skins/RoomUISkin.exml";
        // }
        //this.skinName = "resource/skins/RoomUISkin.exml";
    }
    var d = __define,c=RoomUIView,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        // var bp = new egret.Bitmap();
        // bp.texture = RES.getRes("puke204");
        // this.addChild(bp);
        //this.refreshBtn.visible = false;
        this.inviteBtn.visible = this.refreshBtn.visible = false;
        this.dismissBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissBtnClickHandler, this);
        this.leaveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leaveClickHandler, this);
        //this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
        //this.refreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClickHandler, this);
        this.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.inviteClickHandler, this);
        // if(!App.DeviceUtils.IsMobile){
        //     this.readyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.readyClickHandler, this);
        //     this.bettingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingClickHandler, this);
        //     this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getClickHandler, this);
        //     this.stopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stopClickHandler, this);
        // }
        this.readyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.readyClickHandler, this);
        this.bettingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingClickHandler, this);
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getClickHandler, this);
        this.stopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stopClickHandler, this);
        this.chatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chatClickHandler, this);
        if (App.DebugUtils.isDebug) {
        }
        this.seatBar = new RoomSeatBar();
        this.addChild(this.seatBar);
        this.seatBar.y = 10;
        this.seatBar.x = (this.width - this.seatBar.width) * .5;
    };
    p.gmHandler = function () {
        if (this.cmdInput != null && this.cmdInput.text != "") {
            var cmd = parseInt(this.cmdInput.text);
            this.applyFunc(RoomConst.GM, cmd, "");
        }
    };
    p.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i - 0] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.state = GamingStates.WAITING;
        this.refreshView();
    };
    p.dismissBtnClickHandler = function (evt) {
        //直接解除或发起解除
        //if(xx)//判断条件未明确
        //this.applyFunc(RoomConst.ROOM_DISMISS_REQ);
        this.applyFunc(RoomConst.ROOM_ASK_DISMISS_REQ);
    };
    p.leaveClickHandler = function (evt) {
        this.applyFunc(RoomConst.ROOM_LEAVE_REQ);
    };
    p.sendClickHandler = function (evt) {
        if (this.msgInput.text == "" || this.msgInput.text == null)
            return;
        App.TipsUtils.showCenter(this.msgInput.text);
    };
    p.refreshClickHandler = function (evt) {
        this.applyFunc(RoomConst.ROOM_PLAYERS_GET_REQ, RoomManager.playerIds);
    };
    p.inviteClickHandler = function (evt) {
        Log.trace("close");
        App.Socket.cutoff();
        // WeixinApi.ready(function(api:WeixinApi){
        //     App.TipsUtils.showCenter("WeixinAPI ready");
        //     var info:WeixinShareInfo = new WeixinShareInfo();
        //     info.title = "invite friend";
        //     info.desc = "邀请好友";
        //     info.link = "www";
        //     //info.imgUrl = "";
        //     api.shareToFriend(info);
        //     api.shareToTimeline(info);
        // })
    };
    p.refreshView = function () {
        this.state = GamingStates.WAITING;
        var players = RoomManager.players;
        this.seatBar.refresh();
        //this.seatBar.x = (this.width-this.seatBar.width)*.5;
        egret.Tween.get(this.seatBar).to({ x: (this.width - this.seatBar.barWidth) * .5 }, 600);
        //this.myLabel.text = MainManager.userInfo.nick;
        if (RoomManager.hasRoomInfo) {
            this.roomLabel.text = "房间：" + RoomManager.roomId;
        }
        else {
            this.roomLabel.text = "房间";
        }
        if (players != null && players.length > 1) {
            this.state = GamingStates.WAITING;
        }
    };
    d(p, "curtPoints",undefined
        ,function (value) {
            this.myStateLbl.text = "当前点数：" + value;
        }
    );
    //
    p.readyClickHandler = function (evt) {
        this.applyFunc(RoomConst.READY_FOR_START_REQ);
    };
    p.bettingClickHandler = function (evt) {
        //this.applyFunc(RoomConst.BET_REQ,200);
        this.state = GamingStates.PLAYER_BET;
        App.ViewManager.open(ViewConst.Bet);
    };
    p.getClickHandler = function (evt) {
        this.applyFunc(RoomConst.HIT_REQ);
    };
    p.stopClickHandler = function (evt) {
        this.applyFunc(RoomConst.STAND_REQ);
    };
    p.chatClickHandler = function (evt) {
        App.ViewManager.open(ViewConst.Chat);
    };
    d(p, "message",undefined
        ,function (value) {
            this.messageLbl.text = value;
        }
    );
    d(p, "curtRound",undefined
        ,function (value) {
            this.roundLabel.text = "牌局：" + (value + 1) + "/10";
        }
    );
    p.setPlayerBet = function (betInfo) {
        var player = RoomManager.getPlayer(betInfo.uid);
        if (player != null) {
            var nick = player.uid == MainManager.userId ? "我" : player.nick;
            this.msgTxt.text = this.msgTxt.text + "【" + nick + "】下注了 " + betInfo.bet + "\n"; //-
            var item = this.seatBar.getItem(player);
            if (item != null) {
                item.bet = betInfo.bet;
            }
        }
    };
    p.addMyCard = function (card) {
        //this.seatBar.addMyCard(card);
        //this.msgTxt.text = this.msgTxt.text+"【我】要了张牌 "+card.point+"\n";//-
    };
    p.addCard = function (uid, card) {
        var player = RoomManager.getPlayer(uid);
        if (player != null) {
            var nick = player.uid == MainManager.userId ? "我" : player.nick;
            this.msgTxt.text = this.msgTxt.text + "【" + nick + "】 要了张牌 " + card.point + " [庄]" + MainManager.bankerNick + "\n"; //-
            var item = this.seatBar.getItem(player);
            if (item != null) {
                item.addCard(card);
            }
            else {
                App.TipsUtils.showCenter("!!!!!!!!!!!!!!!!不存在此玩家的位子");
            }
        }
        else {
            App.TipsUtils.showCenter("!!!!!!!!!!!!!!!!不存在此玩家");
        }
    };
    p.addHandcards = function (handInfo) {
        var uid = handInfo.uid;
        var player = RoomManager.getPlayer(uid);
        if (player != null) {
            var nick = player.uid == MainManager.userId ? "我" : player.nick;
            this.msgTxt.text = this.msgTxt.text + "【" + nick + "】 获得了手牌 " + handInfo.cards.length + " [庄]" + MainManager.bankerNick + "\n"; //-
            var item = this.seatBar.getItem(player);
            if (item != null) {
                item.addCards(handInfo.cards);
            }
        }
    };
    p.setPlayerView = function (player, state) {
        var item = this.seatBar.getItem(player);
        if (state == GamingStates.SWITCH_GETTING) {
            var nick = player.uid == MainManager.userId ? "我" : player.nick;
            this.msgTxt.text = this.msgTxt.text + "【" + nick + "】 开始要牌 " + " [庄]" + MainManager.bankerNick + "\n"; //-
            if (item != null) {
                item.state = GamingStates.SWITCH_GETTING;
                item.startCountdown(5);
            }
            this.seatBar.setStateExcept(GamingStates.SWITCH_GET_WAITING, player);
        }
        else if (state == GamingStates.SWITCH_BETTING) {
            var nick = player.uid == MainManager.userId ? "我" : player.nick;
            this.msgTxt.text = this.msgTxt.text + "【" + nick + "】 开始下注 \n"; //-
            if (item != null) {
                item.state = GamingStates.SWITCH_BETTING;
                item.startCountdown(5);
            }
            this.seatBar.setStateExcept(GamingStates.SWITCH_BET_WAITING, player);
        }
        else {
            if (item != null) {
                item.state = state;
                if (state == GamingStates.ROUND_START) {
                    item.isBanker = true;
                    this.seatBar.setBankerExcept(false, player);
                    var nick = player.uid == MainManager.userId ? "我" : player.nick;
                    this.msgTxt.text = this.msgTxt.text + "【" + nick + "】 是庄家 \n"; //-
                }
                return item;
            }
        }
        return null;
    };
    p.showHiddenCard = function (player, card) {
        var nick = player.uid == MainManager.userId ? "我" : player.nick;
        this.msgTxt.text = this.msgTxt.text + "【" + nick + "】 显示底牌 " + card.point + " [庄]" + MainManager.bankerNick + " \n"; //-
        var item = this.seatBar.getItem(player);
        if (item != null) {
            item.showHiddenCard(card);
        }
    };
    p.revert = function () {
        //this.myLabel.text = MainManager.userInfo.nick;
        this.seatBar.revert();
    };
    d(p, "state",undefined
        ,function (value) {
            this._state = value;
            this.seatBar.state = this._state;
            //Log.trace("+++++++++++++++++++++"+this._state+" "+GamingStates.getName(this._state));
            this.readyBtn.enabled = this.bettingBtn.enabled = this.getBtn.enabled = this.stopBtn.enabled = false;
            this.readyBtn.visible = this.bettingBtn.visible = this.getBtn.visible = this.stopBtn.visible = false;
            switch (this._state) {
                case GamingStates.NONE:
                    this.myStateLbl.text = "游客";
                    break;
                case GamingStates.WAITING:
                    this.seatBar.revert();
                    this.readyBtn.visible = true;
                    this.readyBtn.enabled = true; //启用准备按钮
                    this.myStateLbl.text = "等待中";
                    break;
                case GamingStates.PLAYER_READY:
                    this.myStateLbl.text = "已准备";
                    break;
                case GamingStates.ROOM_START:
                    break;
                case GamingStates.ROUND_START:
                    this.myStateLbl.text = "新的一局开始了";
                    break;
                case GamingStates.BETTING_START:
                case GamingStates.SWITCH_BETTING:
                    this.bettingBtn.visible = true;
                    this.bettingBtn.enabled = true; //启用下注按钮
                    this.myStateLbl.text = "下注中";
                    break;
                case GamingStates.SWITCH_BET_WAITING:
                    break;
                case GamingStates.PLAYER_BET:
                    this.myStateLbl.text = "已下注";
                    break;
                case GamingStates.PLAYING_START:
                    this.myStateLbl.text = "开始要牌";
                    break;
                case GamingStates.SWITCH_GETTING:
                    this.getBtn.visible = true;
                    this.getBtn.enabled = true;
                    this.stopBtn.visible = true;
                    this.stopBtn.enabled = true;
                    break;
                case GamingStates.SWITCH_GET_WAITING:
                    break;
                case GamingStates.PLAYER_STAND:
                    this.myStateLbl.text = "已停牌";
                    break;
                case GamingStates.BOOM:
                    this.myStateLbl.text = "已爆牌";
                    break;
                case GamingStates.SETTLEMENT:
                    this.myStateLbl.text = "结算中";
                    break;
                case GamingStates.ROUND_FINISH:
                    this.myStateLbl.text = "此局结束";
                    this.readyBtn.visible = true;
                    this.readyBtn.enabled = true; //启用准备按钮
                    break;
            }
        }
    );
    return RoomUIView;
}(BaseEuiView));
egret.registerClass(RoomUIView,'RoomUIView');
//# sourceMappingURL=RoomUIView.js.map