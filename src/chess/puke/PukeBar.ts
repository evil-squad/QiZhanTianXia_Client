class PukeBar extends eui.Component {

	public static ITEM_WIDTH:number = 40;
	public static ITEM_HEIGHT:number = 60;

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

	private render():void{
		this.removeAllChildren();
        var count = this._infos.length;
        var item:PukeItem;
        this._infos.sort(this.sortFun);
        for (var i = 0; i < count; i++) {
            if (i > this._items.length - 1) {
                item = new PukeItem();
                this._items.push(item);
            }
            item = this._items[i];
            item.info = this._infos[i];
            this.addChild(item);
            egret.Tween.get(item).to({ x: PukeBar.ITEM_WIDTH * i }, 1000);
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