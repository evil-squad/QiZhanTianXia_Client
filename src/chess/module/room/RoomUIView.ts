class RoomUIView  extends BaseEuiView {

    public constructor($controller:BaseController, $parent:eui.Group){
        super($controller, $parent);

         this.skinName = "resource/skins/RoomUISkin.exml";
    }

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
    }

     public open(...param:any[]):void{
        super.open(param);
        this.refreshView();
    }

    private dismissBtnClickHandler(evt:egret.TouchEvent):void{
        this.applyFunc(RoomConst.ROOM_DISMISS_REQ);
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
        var players = RoomManager.players;
        var player;
        for (var i = 0; i < players.length; i++) {
            player = players[i];
            switch (player.seatId) {
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
            }
        }
        if(RoomManager.hasRoomInfo){
            this.roomLabel.text = "房间号："+RoomManager.roomId;
        }else{
            this.roomLabel.text = "房间";
        }
    }
}