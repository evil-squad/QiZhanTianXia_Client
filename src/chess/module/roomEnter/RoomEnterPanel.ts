class RoomEnterPanel extends BasePanelView {
    public constructor(controller:BaseController, parent:eui.Group) {
        super(controller, parent);

        this.icon = "table_shop";
    }

	private _roomIdInput:eui.TextInput;
	private _enterBtn:eui.Button;

    /**
     *对面板数据的初始化，用于子类继承
     */
    public initData():void {
        super.initData();

		this.height = 200;

       this._roomIdInput = new eui.TextInput();
	   this._roomIdInput.skinName = "skins.TextInputSkin";
	   this._roomIdInput.prompt = "输入房间号";
	   this.contentGroup.addChild(this._roomIdInput);

	   this._roomIdInput.x = 10;
	   this._roomIdInput.y = 10;
	   this._roomIdInput.width = 400;

	   this._enterBtn = new eui.Button();
	   this._enterBtn.skinName = "skins.ButtonSkin";
	   this.contentGroup.addChild(this._enterBtn);
	   this._enterBtn.width = 200;
	   this._enterBtn.label = "进入";

	   this._enterBtn.x = (this.width-this._enterBtn.width)*.5;
	   this._enterBtn.y = this.height-30;

	   this._enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterClickHandler, this);
    }

	public open(...param:any[]):void{
        super.open(param);
		if(RoomManager.hasRoomInfo){
			this._roomIdInput.text = RoomManager.roomId;
		}
    }

	private enterClickHandler(evt:egret.TouchEvent):void{
		var roomid = this._roomIdInput.text;
		if(roomid == null || roomid == ""){
			App.TipsUtils.showCenter("请输入房间号");
			return;
		}
		this.applyFunc(HomeConst.ROOM_ENTER_REQ, roomid);
	}
}