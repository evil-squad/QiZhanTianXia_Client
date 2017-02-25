var RoomUIView = (function (_super) {
    __extends(RoomUIView, _super);
    function RoomUIView($controller, $parent) {
        _super.call(this, $controller, $parent);
        this._state = GamingStates.NONE;
        //this.skinName = "resource/skins/RoomDebugSkin.exml";
        if (App.DeviceUtils.IsMobile) {
            this.skinName = "resource/skins/vmobile/RoomViewMSkin.exml";
        }
        else {
            this.skinName = "resource/skins/RoomUISkin.exml";
        }
        //this.skinName = "resource/skins/RoomUISkin.exml";
    }
    var d = __define,c=RoomUIView,p=c.prototype;
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        // var bp = new egret.Bitmap();
        // bp.texture = RES.getRes("puke204");
        // this.addChild(bp);
        //this.refreshBtn.visible = false;
        this.dismissBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissBtnClickHandler, this);
        this.leaveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leaveClickHandler, this);
        //this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
        //this.refreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClickHandler, this);
        //this.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.inviteClickHandler, this);
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
        if (App.DebugUtils.isDebug) {
        }
        this.seatBar = new RoomSeatBar();
        this.addChild(this.seatBar);
        this.seatBar.y = 60;
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
        this.state = GamingStates.NONE;
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
        Log.trace("invite");
        WeixinApi.ready(function (api) {
            App.TipsUtils.showCenter("WeixinAPI ready");
            var info = new WeixinShareInfo();
            info.title = "invite friend";
            info.desc = "邀请好友";
            info.link = "www";
            //info.imgUrl = "";
            api.shareToFriend(info);
            api.shareToTimeline(info);
        });
    };
    p.refreshView = function () {
        this.state = GamingStates.WAITING;
        var players = RoomManager.players;
        this.seatBar.refresh();
        egret.Tween.get(this.seatBar).to({ x: (this.width - this.seatBar.barWidth) * .5 }, 600);
        this.myLabel.text = MainManager.userInfo.nick;
        if (RoomManager.hasRoomInfo) {
            this.roomLabel.text = "房间：" + RoomManager.roomId;
        }
        else {
            this.roomLabel.text = "房间";
        }
        if (players != null && players.length > 1) {
            this.state = GamingStates.ROUND_START;
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
    p.setMyBet = function (value) {
        this.myBetLbl.text = "" + value;
    };
    p.setPlayerBet = function (betInfo) {
        var player = RoomManager.getPlayer(betInfo.uid);
        if (player != null) {
            var item = this.seatBar.getItem(player);
            if (item != null) {
                item.bet = betInfo.bet;
            }
        }
    };
    p.addHandcards = function (hand) {
        var uid = hand.uid;
        var player = RoomManager.getPlayer(uid);
        if (player != null) {
            var item = this.seatBar.getItem(player);
            if (item != null) {
                item.addCards(hand.cards);
            }
        }
    };
    p.setPlayerView = function (player, state) {
        if (MainManager.userId != player.uid) {
            var item = this.seatBar.getItem(player);
            if (item != null) {
                item.state = state;
                if (state == GamingStates.ROUND_START) {
                    item.isBanker = true;
                }
            }
            else {
                throw new Error(player.uid + "不在闲家列表里");
            }
        }
        else {
            this.state = state;
            if (state == GamingStates.ROUND_START) {
                this.myLabel.text = "[庄]" + MainManager.userInfo.nick;
            }
        }
    };
    p.revert = function () {
        this.myLabel.text = MainManager.userInfo.nick;
        this.seatBar.revert();
    };
    d(p, "state",undefined
        ,function (value) {
            this._state = value;
            Log.trace("+++++++++++++++++++++" + this._state + " " + GamingStates.getName(this._state));
            this.readyBtn.enabled = this.bettingBtn.enabled = this.getBtn.enabled = this.stopBtn.enabled = false;
            switch (this._state) {
                case GamingStates.NONE:
                    this.myStateLbl.text = "游客";
                    break;
                case GamingStates.WAITING:
                    this.seatBar.revert();
                    //this.readyBtn.enabled = true;
                    this.myStateLbl.text = "等待中";
                    //App.TipsUtils.showCenter("等待中");
                    break;
                case GamingStates.ROOM_START:
                    break;
                case GamingStates.ROUND_START:
                    this.readyBtn.enabled = true; //启用准备按钮
                    this.myStateLbl.text = "等待报名";
                    break;
                case GamingStates.PLAYER_READY:
                    this.myStateLbl.text = "已准备";
                    App.TipsUtils.showCenter("已准备");
                    break;
                case GamingStates.BETTING_START:
                    this.bettingBtn.enabled = true; //启用下注按钮
                    App.TipsUtils.showCenter("请下注");
                    break;
                case GamingStates.PLAYER_BET:
                    this.myStateLbl.text = "已下注";
                    App.TipsUtils.showCenter("已下注");
                    break;
                case GamingStates.PLAYING_START:
                    this.getBtn.enabled = true; //启用要牌按钮
                    this.stopBtn.enabled = true; //启用停牌按钮
                    this.myStateLbl.text = "开始要牌";
                    App.TipsUtils.showCenter("开始要牌");
                    break;
                case GamingStates.PLAYER_STAND:
                    this.myStateLbl.text = "已停牌";
                    App.TipsUtils.showCenter("已停牌");
                    break;
                case GamingStates.BOOM:
                    this.myStateLbl.text = "已爆牌";
                    App.TipsUtils.showCenter("已爆牌");
                    break;
                case GamingStates.SETTLEMENT:
                    this.myStateLbl.text = "结算中";
                    App.TipsUtils.showCenter("结算中");
                    break;
                case GamingStates.ROUND_FINISH:
                    this.myStateLbl.text = "此局结束";
                    App.TipsUtils.showCenter("此局结束");
                    break;
            }
        }
    );
    return RoomUIView;
}(BaseEuiView));
egret.registerClass(RoomUIView,'RoomUIView');
//# sourceMappingURL=RoomUIView.js.map