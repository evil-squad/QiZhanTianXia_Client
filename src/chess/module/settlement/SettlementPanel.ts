class SettlementPanel extends BasePanelView {

	private list:SettlementList;

	private closeButton:eui.Button;

    public constructor(controller:BaseController, parent:eui.Group) {
        super(controller, parent);

        this.icon = "table_shop";
    }

 	public initData():void {
        super.initData();

		this.width = 350;
		this.height = 200;

		this.list = new SettlementList();
		this.contentGroup.addChild(this.list);

		this.list.x = 30;
		this.list.y = 30;

		this.closeButton = new eui.Button();
		this.closeButton.label = "关闭";
		this.closeButton.x = (this.width-this.closeButton.width)*.5;
		this.closeButton.y = this.height - 20;
		this.contentGroup.addChild(this.closeButton);
		this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClickHandler, this);
 	}

	 public open(...param:any[]):void{
        super.open(param);

		this.list.data = param[2];
    }

	private closeClickHandler(evt:egret.TouchEvent):void{
		App.ViewManager.closeView(this);
	}

}