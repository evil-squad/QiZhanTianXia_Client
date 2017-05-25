class CommonPanelView extends BaseEuiView {
    public closeBtn:eui.Button;
    public contentGroup:eui.Group;

    private _icon:string;
    private _btn:string;

    public constructor(controller:BaseController, parent:eui.Group) {
        super(controller, parent);
        this.skinName = "resource/skins/CommonPanelSkin.exml";
    }

    public set icon(value:string){
        this._icon = value;
    }

    public get icon():string{
        return this._icon;
    }

    public set btn(value:string){
         this._btn = value;
    }

    public get btn():string{
        return this._btn;
    }

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void {
        super.initUI();
        //this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.closeBtnClickHandler,this);
    }

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData():void{
        super.initData();
    }

    private closeBtnClickHandler(e:egret.TouchEvent):void{
        App.ViewManager.closeView(this);
    }
}