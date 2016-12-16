class RoomView extends BaseEuiView {

	private bbar:BMahjongBar;

    public constructor($controller:BaseController, $parent:eui.Group){
        super($controller, $parent);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
    }

	public initUI(){
		super.initUI();

        this.bbar = new BMahjongBar();
        this.bbar.x = 100;
        this.bbar.y = App.StageUtils.getHeight() - 100;
        this.addChild(this.bbar);
	}

	public open(...param:any[]):void{
        super.open(param);
		this.refreshView(MahjongManager.random(20));
    }

	public refreshView(data:Array<MahjongInfo>):void{
		this.bbar.data = data;
	}

	private onClickItem(evt:egret.TouchEvent){
		if (evt.target instanceof MahjongItem) {
            this.bbar.switchItem(evt.target);
        }
	}
}