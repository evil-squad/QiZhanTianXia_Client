class PukeBar extends eui.Component {

	public static ITEM_WIDTH:number = 100;
	public static ITEM_HEIGHT:number = 120;

    public static ITEM_STACKED_WIDTH:number = 60;

    public static PUKE_MAX_COUNT:number = 5;

	private _infos:Array<PukeInfo>;
	private _items:Array<PukeItem>;

	private _curtItem:PukeItem;

	public constructor() {
		super();
		this._infos = new Array<PukeInfo>();
		this._items = new Array<PukeItem>();
	}

	public set data(value:Array<PukeInfo>){
		this._infos = value;
        this.render();
	}

    public get pukeCount():number{
		return this._infos.length;
	}

    public addItem(info:PukeInfo):void{
        if(this._infos.length >= PukeBar.PUKE_MAX_COUNT){
            App.TipsUtils.showCenter("最多为"+PukeBar.PUKE_MAX_COUNT+"张");
            return;
        }
        this._infos.push(info);
        var item:PukeItem = new PukeItem(PukeBar.ITEM_WIDTH,PukeBar.ITEM_HEIGHT);
        item.info = info;
        this.addChild(item);
        egret.Tween.get(item).to({ x: PukeBar.ITEM_STACKED_WIDTH * this._infos.length }, 500);
    }

	public switchItem(item:PukeItem){
		if (this._curtItem == null) {
            this._curtItem = item;
            this._curtItem.switchMove();
        }
        else {
            if (this._curtItem != item) {
                this._curtItem.revertPos();
            }
            this._curtItem = item;
            this._curtItem.switchMove();
        }
	}

    public revert():void{
        this.removeAllChildren();
        this._infos = new Array<PukeInfo>();
    }

	private render():void{
		this.removeAllChildren();
        var count = this._infos.length;
        var item:PukeItem;
        this._infos.sort(this.sortFun);
        for (var i = 0; i < count; i++) {
            if (i > this._items.length - 1) {
                item = new PukeItem(PukeBar.ITEM_WIDTH,PukeBar.ITEM_HEIGHT);
                this._items.push(item);
            }
            item = this._items[i];
            item.info = this._infos[i];
            this.addChild(item);
            egret.Tween.get(item).to({ x: PukeBar.ITEM_STACKED_WIDTH * i }, 1000);
        }
	}

	private sortFun(a:PukeInfo,b:PukeInfo){
		if (a.pid == b.pid)
            return 0;
        if (a.pid > b.pid)
            return 1;
        return -1;
	}

	private removeAllChildren():void{
		while (this.numChildren > 0) {
            var item = this.removeChildAt(0);
            item.x = 0;
            item.y = 0;
        }
	}
}