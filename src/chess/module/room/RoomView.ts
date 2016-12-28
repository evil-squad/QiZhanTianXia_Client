class RoomView extends BaseEuiView {

	//private bbar:BMahjongBar;
	private bbar:PukeBar;

    public constructor($controller:BaseController, $parent:eui.Group){
        super($controller, $parent);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
    }

	public initUI(){
		super.initUI();

        this.bbar = new PukeBar();
        this.bbar.x = 100;
        this.bbar.y = App.StageUtils.getHeight() - 100;
        this.addChild(this.bbar);
	}

	public open(...param:any[]):void{
        super.open(param);
		this.refreshView(PukeManager.random(13));
    }

	public refreshView(data:Array<PukeInfo>):void{
		this.bbar.data = data;
	}

	private onClickItem(evt:egret.TouchEvent){
		if (evt.target instanceof PukeItem) {
            this.bbar.switchItem(evt.target);
        }
	}
}