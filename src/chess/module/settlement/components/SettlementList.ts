class SettlementList extends eui.Component {

	public static ITEM_WIDTH:number = 120;
	public static ITEM_HEIGHT:number = 42;

	private _items:Array<SettlementItem> = new Array<SettlementItem>();

	public constructor() {
		super();
	}

	public set data(value:Array<any>){
		this.removeAllChildren();
		var settlements = value;
        var info;
		var item:SettlementItem;
        for (var i = 0; i < settlements.length; i++) {
            info = settlements[i];
            if(i >= this._items.length){
				this._items.push(new SettlementItem());
			}
			item = this._items[i];
			item.info = info;
			this.addChild(item);

			item.x = 10;
			item.y = SettlementList.ITEM_HEIGHT*i;
        }
	}

	private removeAllChildren():void{
		while (this.numChildren > 0) {
            var item = this.removeChildAt(0);
            item.x = 0;
            item.y = 0;
        }
	}
}