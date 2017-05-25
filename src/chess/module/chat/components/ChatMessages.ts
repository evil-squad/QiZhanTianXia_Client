class ChatMessages extends eui.Group {

	private _scroller:eui.Scroller;
	private _container:eui.Group;
	private _items:Array<MessageItem>;

	public static ITEM_HEIGHT:number = 30;

	public constructor() {
		super();

		this.init();
	}

	private init():void{

		this._container = new eui.Group();
		this.addChild(this._container);

		this._scroller = new eui.Scroller();
		this._scroller.width = 200;
		this._scroller.height = ChatMessages.ITEM_HEIGHT*5;
		this._scroller.viewport = this._container;
		this.addChild(this._scroller);

		this._items = [];

		var data:Array<string> = [];
		data.push("快点啊，等得我花都谢了");
		data.push("怎么又断线了啊，网络怎么这么差啊");
		data.push("不要走，决战到天亮");
		data.push("你的牌打得太好啦");
		data.push("你个xxx");
		data.push("你个渣渣");

		var item:MessageItem;
		for(var i:number=0; i<data.length; i++){
			item = new MessageItem(data[i]);
			this._items.push(item);
			this._container.addChild(item);

			item.x = 0;
			item.y = i*ChatMessages.ITEM_HEIGHT;

			item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickItem, this);
		}
	}

	private onClickItem(event:egret.TouchEvent){
		App.MessageCenter.dispatch(ChatConst.MESSAGE_ITEM_CLICK,event.target.text);
	}

}

class MessageItem extends eui.Group {
	private _label:eui.Label;

	public constructor(text:string) {
		super();
		this._label = new eui.Label;
		this.addChild(this._label);
		this._label.size = 12;
		this.text = text;
	}

	public set text(value:string){
		this._label.text = value;
	}

	public get text():string{
		return this._label.text;
	}

}