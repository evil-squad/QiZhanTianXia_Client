class RoomEnterPanel extends BasePanelView {
    public constructor(controller:BaseController, parent:eui.Group) {
        super(controller, parent);

        //this.icon = "table_shop";
    }

	private _numberInputView:NumberInputView;

    /**
     *对面板数据的初始化，用于子类继承
     */
    public initData():void {
        super.initData();

		this.height = 400;

		this._numberInputView = new NumberInputView();
		this.contentGroup.addChild(this._numberInputView);
		this._numberInputView.enterPanel = this;
    }

	public open(...param:any[]):void{
        super.open(param);
		if(RoomManager.hasRoomInfo){
			this._numberInputView.roomNumber = RoomManager.roomId;
		}
    }
}