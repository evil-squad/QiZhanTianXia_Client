class RoomUIView  extends BaseEuiView {

    public constructor($controller:BaseController, $parent:eui.Group){
        super($controller, $parent);

        this.skinName = "resource/skins/RoomUISkin.exml";
        // if(App.DeviceUtils.IsMobile){
        //     this.skinName = "resource/skins/vmobile/RoomViewMSkin.exml";
        // }else{
        //     this.skinName = "resource/skins/RoomUISkin.exml";
        // }
    }

    private _state:number = GamingStates.NONE;

    private dismissBtn:eui.Button;
    private leaveBtn:eui.Button;
    private sendBtn:eui.Button;
    private refreshBtn:eui.Button;
    private inviteBtn:eui.Button;

    private topPlayerLabel:eui.Label;
    private leftPlayerLabel:eui.Label;
    private bottomPlayerLabel:eui.Label;
    private rightPlayerLabel:eui.Label;
    public roomLabel:eui.Label;

    private msgInput:eui.TextInput;

    //
    private readyBtn:eui.Button;
    private bettingBtn:eui.Button;
    private getBtn:eui.Button;
    private stopBtn:eui.Button;

    private stateLbl:eui.Label;

    public initUI():void{
        super.initUI();

        // var bp = new egret.Bitmap();
        // bp.texture = RES.getRes("puke204");
        // this.addChild(bp);

        this.dismissBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissBtnClickHandler, this);
        this.leaveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leaveClickHandler, this);
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
        this.refreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClickHandler, this);
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
    }

     public open(...param:any[]):void{
        super.open(param);
        this.state = GamingStates.NONE;
        this.refreshView();
    }

    private dismissBtnClickHandler(evt:egret.TouchEvent):void{
        //直接解除或发起解除
        //if(xx)//判断条件未明确
        //this.applyFunc(RoomConst.ROOM_DISMISS_REQ);
        this.applyFunc(RoomConst.ROOM_ASK_DISMISS_REQ);
    }

    private leaveClickHandler(evt:egret.TouchEvent):void{
        this.applyFunc(RoomConst.ROOM_LEAVE_REQ);
    }

    private sendClickHandler(evt:egret.TouchEvent):void{
        if (this.msgInput.text == "" || this.msgInput.text == null)
            return;
        App.TipsUtils.showCenter(this.msgInput.text);
    }

    private refreshClickHandler(evt:egret.TouchEvent):void{
        this.applyFunc(RoomConst.ROOM_PLAYERS_GET_REQ,RoomManager.playerIds);
    }

    private inviteClickHandler(evt:egret.TouchEvent):void{
        Log.trace("invite");
        WeixinApi.ready(function(api:WeixinApi){

            App.TipsUtils.showCenter("WeixinAPI ready");

            var info:WeixinShareInfo = new WeixinShareInfo();
            info.title = "HelloEgret";
            info.desc = "欢迎使用Egret";
            info.link = "www.egret-labs.org";
//                        info.imgUrl = "";

            api.shareToFriend(info);
            api.shareToTimeline(info);
        })
    }

    public refreshView(){
        this.state = GamingStates.WAITING;
        var players = RoomManager.players;
        var player;
        this.revert();
        for (var i = 0; i < players.length; i++) {
            player = players[i];
            switch (player.seatid) {
                case 0:
                    this.topPlayerLabel.text = player.nick;
                    break;
                case 1:
                    this.leftPlayerLabel.text = player.nick;
                    break;
                case 2:
                    this.bottomPlayerLabel.text = player.nick;
                    break;
                case 3:
                    this.rightPlayerLabel.text = player.nick;
                    break;
                default:
                    this.rightPlayerLabel.text = "无座位:"+player.nick+" s:"+player.seatid;
                    break;
            }
        }
        if(RoomManager.hasRoomInfo){
            this.roomLabel.text = "房间号："+RoomManager.roomId;
        }else{
            this.roomLabel.text = "房间";
        }
    }

    private revert():void{
        this.topPlayerLabel.text = "0";
        this.leftPlayerLabel.text = "1";
        this.bottomPlayerLabel.text = "2";
        this.rightPlayerLabel.text = "3";
    }

    public set curtPoints(value:number){
        this.stateLbl.text = "当前点数："+value;
    }

    //
    private readyClickHandler(evt:egret.TouchEvent):void{
        this.state = GamingStates.READY_GET;
    }

    private bettingClickHandler(evt:egret.TouchEvent):void{
        this.state = GamingStates.BETTING;
    }

    private getClickHandler(evt:egret.TouchEvent):void{
        this.applyFunc(RoomConst.ROOM_PUKE_GET_REQ);
    }

    private stopClickHandler(evt:egret.TouchEvent):void{
         this.state = GamingStates.STOP;
    }

    public set state(value:number){
        this._state = value;
        this.readyBtn.enabled = this.bettingBtn.enabled = this.getBtn.enabled = this.stopBtn.enabled = false;
        switch(this._state){
            case GamingStates.NONE:
                this.stateLbl.text = "游客";
            break;
            case GamingStates.WAITING:
                this.readyBtn.enabled = true;
                this.stateLbl.text = "等待中";
                App.TipsUtils.showCenter("等待中");
            break;
            case GamingStates.READY_GET:
                this.bettingBtn.enabled = true;
                this.stateLbl.text = "已准备";
                App.TipsUtils.showCenter("已准备");
            break;
            case GamingStates.BETTING:
                this.getBtn.enabled = true;
                this.stopBtn.enabled = true;
                this.stateLbl.text = "已下注";
                App.TipsUtils.showCenter("已下注");
            break;
            case GamingStates.GETTING:

            break;
            case GamingStates.GAMING:
                this.bettingBtn.enabled = true;
            break;
            case GamingStates.BOOM:
                this.stateLbl.text = "已爆牌";
                App.TipsUtils.showCenter("已爆牌");
            break;
            case GamingStates.STOP:
                this.stateLbl.text = "已停牌";
                App.TipsUtils.showCenter("已停牌");
            break;
            case GamingStates.SETTLEMENT:
                this.stateLbl.text = "结算中";
                App.TipsUtils.showCenter("结算中");
            break;
            case GamingStates.END:
                this.stateLbl.text = "此局结束";
                App.TipsUtils.showCenter("此局结束");
            break;
        }
    }
}