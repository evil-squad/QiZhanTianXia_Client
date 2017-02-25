class RoomSeatBar extends eui.Component {

	public static ITEM_WIDTH:number = 125;
	public static ITEM_HEIGHT:number = 100;

	public static PUKE_WIDTH:number = 100;
	public static PUKE_HEIGHT:number = 80;
	public static PUKE_STACKED_WIDTH:number = 30;

	private _items:Array<RoomSeatItem> = new Array<RoomSeatItem>();

	public constructor() {
		super();
	}

	public get barWidth():number{
		return this.numChildren*RoomSeatBar.ITEM_WIDTH;
	}

	public refresh():void{
		this.removeAllChildren();
		var players = RoomManager.players;
        var player;
		var item:RoomSeatItem;
		var index = 0;
        for (var i = 0; i < players.length; i++) {
            player = players[i];
			Log.trace(player.uid);
            if(player.uid != MainManager.userId){
				if(index >= this._items.length){
					this._items.push(new RoomSeatItem());
				}
				item = this._items[index];
				item.info = player;
				this.addChild(item);
				egret.Tween.get(item).to({ x: RoomSeatBar.ITEM_WIDTH * index }, 500);

				index++;
			}
        }
	}

	public revert():void{
		for(var i=0; i<this._items.length; i++){
			this._items[i].revert();
		}
	}

	public getItem(player:any):RoomSeatItem{
		var index = 0;
		while(index<this.numChildren){
			var item = this.getChildAt(index);
			if((item as RoomSeatItem).info.uid == player.uid){
				return item as RoomSeatItem;
			}
			index++;
		}
		return null;
	}

	private removeAllChildren():void{
		while (this.numChildren > 0) {
            var item = this.removeChildAt(0);
            item.x = 0;
            item.y = 0;
        }
	}
}