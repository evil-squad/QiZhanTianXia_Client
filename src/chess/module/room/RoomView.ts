class RoomView extends BaseEuiView {

	//private bbar:BMahjongBar;
	private bbar:PukeBar;

	private _pukes:Array<PukeInfo> = new Array<PukeInfo>();

    public constructor($controller:BaseController, $parent:eui.Group){
        super($controller, $parent);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
    }

	public initUI(){
		super.initUI();

        this.bbar = new PukeBar();
		this.bbar.x = (App.StageUtils.getWidth()-PukeBar.ITEM_STACKED_WIDTH*5)/2;
        this.bbar.y = App.StageUtils.getHeight() - 290;
        this.addChild(this.bbar);
	}

	public open(...param:any[]):void{
        super.open(param);
		//this.refreshView(PukeManager.random(13));
		this.refreshView([]);
    }

	public refreshView(data:Array<PukeInfo>):void{
		this.bbar.data = data;
	}

	public getOnePuke():PukeInfo{
		//this._pukes.push();
		var info:PukeInfo = PukeManager.randomOne(this._pukes.length);
		this.bbar.addItem(info);
		return info;
	}

	public get pukeCount():number{
		return this.bbar.pukeCount;
	}

	private onClickItem(evt:egret.TouchEvent){
		if (evt.target instanceof PukeItem) {
            this.bbar.switchItem(evt.target);
        }
	}
}