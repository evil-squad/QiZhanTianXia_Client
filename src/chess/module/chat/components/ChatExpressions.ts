class ChatExpressions extends eui.Group {

	private _scroller:eui.Scroller;
	private _container:eui.Group;
	private _items:Array<ExpressionItem>;

	public static ITEM_WIDTH:number = 50;

	public constructor() {
		super();
		this.init();
	}

	private init():void{

		this._container = new eui.Group();
		this.addChild(this._container);

		this._scroller = new eui.Scroller();
		this._scroller.width = ChatExpressions.ITEM_WIDTH*4;
		this._scroller.height = ChatExpressions.ITEM_WIDTH*3;
		this._scroller.viewport = this._container;
		this.addChild(this._scroller);

		this._items = [];
		var item:ExpressionItem;
		for(var i:number=0; i<=23; i++){
			if(i < 10){
				item = new ExpressionItem("0"+i);
			}else{
				item = new ExpressionItem(""+i);
			}
			this._items.push(item);
			this._container.addChild(item);

			item.x = i%4*ChatExpressions.ITEM_WIDTH;
			item.y = Math.floor(i/4)*ChatExpressions.ITEM_WIDTH;

			item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
		}
	}

	private onClickItem(event:egret.TouchEvent){
		App.MessageCenter.dispatch(ChatConst.EXPRESSION_ITEM_CLICK,event.target.id);
	}
}