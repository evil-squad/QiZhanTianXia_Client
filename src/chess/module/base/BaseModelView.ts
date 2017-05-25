class BaseModelView extends BaseEuiView {

	private _bg:eui.Group;
	private _view:eui.Component;

	public constructor(controller:BaseController, parent:eui.Group) {
        super(controller, parent);

		this._bg = new eui.Group();
		this._bg.width = App.StageUtils.getWidth();
		this._bg.height = App.StageUtils.getHeight();
		this.addChild(this._bg);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickHandler,this);
    }

	public set view(value:eui.Component){
		this._view = value;
		this.addChild(this._view);
		this._view.x = (this.width-this._view.width)*.5;
		this._view.y = (this.height-this._view.height)*.5;
	}

	private clickHandler(e:egret.TouchEvent):void{
		Log.trace(e.currentTarget,e.target);
		Log.trace(e.target == this._bg);
		if(e.target == this._bg){
			App.ViewManager.closeView(this);
		}
    }
}