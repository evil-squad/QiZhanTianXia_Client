class RoomUIView  extends BaseEuiView {

    public constructor($controller:BaseController, $parent:eui.Group){
        super($controller, $parent);

         this.skinName = "resource/skins/RoomUISkin.exml";
    }

    private dismissBtn:eui.Button;
    private leaveBtn:eui.Button;
    private sendBtn:eui.Button;
    private refreshBtn:eui.Button;

    private topPlayerLabel:eui.Label;
    private leftPlayerLabel:eui.Label;
    private bottomPlayerLabel:eui.Label;
    private rightPlayerLabel:eui.Label;

    private msgInput:eui.TextInput;

    public initUI():void{
        super.initUI();

        this.dismissBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dismissBtnClickHandler, this);
        this.leaveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.leaveClickHandler, this);
        this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
        this.refreshBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.refreshClickHandler, this);
    }

     public open(...param:any[]):void{
        super.open(param);
        this.refreshView();
    }

    private dismissBtnClickHandler(evt:egret.TouchEvent):void{
        this.applyFunc(HomeConst.ROOM_DISMISS_REQ);
    }

    private leaveClickHandler(evt:egret.TouchEvent):void{
        this.applyFunc(HomeConst.ROOM_LEAVE_REQ);
    }

    private sendClickHandler(evt:egret.TouchEvent):void{
        if (this.msgInput.text == "" || this.msgInput.text == null)
            return;
        App.TipsUtils.showCenter(this.msgInput.text);
    }

    private refreshClickHandler(evt:egret.TouchEvent):void{
        this.applyFunc(HomeConst.ROOM_PLAYERS_GET_REQ,RoomManager.playerIds);
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
    }
}