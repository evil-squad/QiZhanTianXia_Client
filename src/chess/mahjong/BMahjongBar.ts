class BMahjongBar extends eui.Component {

	public static ITEM_WIDTH:number = 40;
	public static ITEM_HEIGHT:number = 60;

	private _infos:Array<MahjongInfo>;
	private _items:Array<MahjongItem>;

	private _curtItem:MahjongItem;

	public constructor() {
		super();
		this._infos = new Array<MahjongInfo>();
		this._items = new Array<MahjongItem>();
	}

	public set data(value:Array<MahjongInfo>){
		this._infos = value;
        this.render();
	}

	public switchItem(item:MahjongItem){
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
        var item;
        this._infos.sort(this.sortFun);
        for (var i = 0; i < count; i++) {
            if (i > this._items.length - 1) {
                item = new MahjongItem();
                this._items.push(item);
            }
            item = this._items[i];
            item.info = this._infos[i];
            this.addChild(item);
            egret.Tween.get(item).to({ x: BMahjongBar.ITEM_WIDTH * i }, 1000);
        }
	}

	private sortFun(a:MahjongInfo,b:MahjongInfo){
		if (a.mid == b.mid)
            return 0;
        if (a.mid > b.mid)
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