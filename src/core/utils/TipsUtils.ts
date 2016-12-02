class TipsUtils extends BaseClass {

	private _ctips:Array<CenterTips>;

	public constructor() {
		super();

		this._ctips = new Array<CenterTips>();
	}

	public showCenter(message:string):void{
		var tips:CenterTips = null;
		for(var i=0; i<this._ctips.length; i++){
			//Log.trace(this._ctips[i].getStatus())
			if(this._ctips[i].getStatus() == 0){
				tips = this._ctips[i];
				//Log.trace("old");
				break;
			}
		}
		if(tips == null){
			//Log.trace("new");
			tips = new CenterTips();
			this._ctips.push(tips);
		}
		tips.show(message, LayerManager.UI_Tips, true, 4);
	}
}