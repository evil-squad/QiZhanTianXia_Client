class PukeItem extends BasePukeItem {

	private _info:PukeInfo;
	
	private _status:number = 0;
	private _img:egret.Bitmap;

	public constructor(itemWidth:number,itemHeight:number) {
		super();
		this._status = 0;
        this._img = new egret.Bitmap();
        this.addChild(this._img);
        this._img.width = itemWidth;
        this._img.height = itemHeight
	}

	public set info(value:PukeInfo){
		this._info = value;
        this.refresh();
	}

	public switchMove(){
		egret.Tween.removeTweens(this);
        if (this._status == 0) {
            this._status = 1;
            egret.Tween.get(this).to({ y: -20 }, 300);
        }
        else {
            this._status = 0;
            egret.Tween.get(this).to({ y: 0 }, 300);
        }
	}

	public revertPos(){
		 egret.Tween.get(this).to({ y: 0 }, 300);
	}

	public discard(){

	}

	private refresh(){
		if (this._info != null) {
            this._img.texture = RES.getRes("puke" + this._info.pid);
        }else{
			this._img.texture = RES.getRes("puke_bg");
		}
	}
}