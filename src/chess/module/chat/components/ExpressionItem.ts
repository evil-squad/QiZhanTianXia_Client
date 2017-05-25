class ExpressionItem extends eui.Group{

	private _id:string;
	private _img:egret.Bitmap;

	public constructor(id:string) {
		super();

		this._img = new egret.Bitmap();
        this.addChild(this._img);
        this._img.width = ChatExpressions.ITEM_WIDTH;
        this._img.height = ChatExpressions.ITEM_WIDTH

		this.id = id;
	}

	public set id(value:string){
		this._id = value;
		this._img.texture = RES.getRes("expression"+value);
	}

	public get id():string{
		return this._id;
	}
}