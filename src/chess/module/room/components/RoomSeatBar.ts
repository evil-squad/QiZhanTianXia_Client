class RoomSeatBar extends eui.Component {

	private static PLAYER_MAX:number = 8;
	private static MY_POS:egret.Point = new egret.Point(500,460);
	//sort by index
	private static PLAY_POS:Array<egret.Point> = [new egret.Point(230,0),new egret.Point(740,0),
										new egret.Point(20,120),new egret.Point(970,120),
										new egret.Point(0,360),new egret.Point(990,360),
										new egret.Point(230,460),new egret.Point(740,460)];

	public static ITEM_WIDTH:number = 125;
	public static ITEM_HEIGHT:number = 100;

	public static PUKE_WIDTH:number = 30;
	public static PUKE_HEIGHT:number = 54;
	public static PUKE_STACKED_WIDTH:number = 15;

	private _items:Array<RoomSeatItem> = new Array<RoomSeatItem>();
	private _myItem:RoomSeatItem;

	private timer:egret.Timer = new egret.Timer(100,500);

	public constructor() {
		super();
		this.init();
	}

	private init():void{
		this._myItem = new RoomSeatItem();
		this._myItem.x = RoomSeatBar.MY_POS.x;
		this._myItem.y = RoomSeatBar.MY_POS.y;
		this.addChild(this._myItem);

		var item:RoomSeatItem;
		var pos:egret.Point;
		for(var i:number=0; i<RoomSeatBar.PLAYER_MAX; i++){
			item = new RoomSeatItem();
			pos = RoomSeatBar.PLAY_POS[i];
			item.x = pos.x;
			item.y = pos.y;
			item.position = i;
			this.addChild(item);
			this._items.push(item);
		}

		//注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
	}

	private timerFunc()
    {
        console.log("计时");
		//this.timeStamp(0);
    }
    private timerComFunc()
    {
        console.log("计时结束");
    }

	public startCountdown(){

	}

	public stopCountdown(){
		
	}

	public get barWidth():number{
		return this.numChildren*RoomSeatBar.ITEM_WIDTH;
	}

	public refresh():void{
		this.clean();
		var players = RoomManager.players;
        var player;
		var item:RoomSeatItem;
		var index = 0;
        for (var i = 0; i < players.length; i++) {
            player = players[i];
            if(player.uid != MainManager.userId){
				if(index >= this._items.length){
					//this._items.push(new RoomSeatItem());
					continue;
				}
				item = this.getItemByIndex(index);
				item.info = player;

				index++;
			}else{
				this._myItem.info = player;
			}
        }
	}

	public addMyCard(card:any){
		this._myItem.addCard(card);
	}

	public set state(value:number){
		 switch(value){
            case GamingStates.NONE:
            break;
            case GamingStates.WAITING:
            break;

            case GamingStates.ROOM_START://游戏开始(意味着要扣房卡)
                
                break;
            case GamingStates.ROUND_START:
                break;
            case GamingStates.PLAYER_READY:
            break;

            case GamingStates.PLAYER_BET:
                break;
            case GamingStates.PLAYER_STAND:
            break;
                
            case GamingStates.BOOM:
            break;
			//统一控制
			case GamingStates.BETTING_START://下注中
			case GamingStates.PLAYING_START://要牌中
            case GamingStates.SETTLEMENT://结算中
            case GamingStates.ROUND_FINISH://已结束
				this.itemsState = value;
            break;
        }
	}

	private set itemsState(value:number){
		var index = 0;
		while(index<this.numChildren){
			var item:RoomSeatItem = this.getChildAt(index) as RoomSeatItem;
			if(item.info != null){
				item.state = value;
			}
			index++;
		}
	}

	private getItemByIndex(index:number):RoomSeatItem{
		if(index < RoomSeatBar.PLAYER_MAX){
			return this._items[index];
		}
		return null;
	}

	private get myItem():RoomSeatItem{
		return this._myItem;
	}

	public revert():void{
		this._myItem.revert();
		for(var i=0; i<this._items.length; i++){
			this._items[i].revert();
		}
	}

	public getItem(player:any):RoomSeatItem{
		if(player.uid == MainManager.userId) {
			return this._myItem;
		}
		var index = 0;
		while(index<this.numChildren){
			var item:RoomSeatItem = this.getChildAt(index) as RoomSeatItem;
			if(item.info != null && item.info.uid == player.uid){//==
				return item as RoomSeatItem;
			}
			index++;
		}
		return null;
	}

	public setStateExcept(state:number,player:any){
		var index = 0;
		while(index<this.numChildren){
			var item:RoomSeatItem = this.getChildAt(index) as RoomSeatItem;
			if(item.info != null && item.info.uid != player.uid){//!=
				item.state = state;
			}
			index++;
		}
		if(player.uid != MainManager.userId){
			this._myItem.state = state;
		}
	}

	public setBankerExcept(isBanker:boolean,player:any){
		var index = 0;
		while(index<this.numChildren){
			var item:RoomSeatItem = this.getChildAt(index) as RoomSeatItem;
			if(item.info != null && item.info.uid != player.uid){
				item.isBanker = isBanker;
			}
			index++;
		}
		if(player.uid != MainManager.userId){
			this._myItem.isBanker = isBanker;
		}
	}

	private clean():void{
		this._myItem.revert();
		var index = 0;
		while(index<this.numChildren){
			var item:RoomSeatItem = this.getChildAt(index) as RoomSeatItem;
			item.revert;
			index++;
		}
		return null;
	}
}