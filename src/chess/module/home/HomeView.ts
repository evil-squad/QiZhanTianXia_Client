class HomeView extends BaseEuiView{
    public constructor($controller:BaseController, $parent:eui.Group) {
        super($controller, $parent);

        this.skinName = "resource/skins/GuiScreenSkin.exml";
    }

    public menuBtn:eui.ToggleButton;
    public menu:Menu;

    public friendBtn:eui.Image;
    public shopBtn:eui.Image;
    public warehouseBtn:eui.Image;
    public factoryBtn:eui.Image;
    public moreBtn:eui.Image;

    public nameDisplay:eui.Label;
    public coinsDisplay:eui.Label;

    public createBtn:eui.Button;
    public enterBtn:eui.Button;

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void{
        super.initUI();
        
        this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP,this.menuClickHandler,this);
        this.menuBtn.addEventListener(egret.Event.CHANGE,this.menuBtnChangeHandler,this);
        this.friendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.friendClickHandler,this);
        this.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shopClickHandler,this);
        this.warehouseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.warehouseClickHandler,this);
        this.factoryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.factoryClickHandler,this);
        this.moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.moreClickHandler,this);

        this.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createClickHandler, this);
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterClickHandler, this);
    }

    private playSound():void{
        App.SoundManager.playEffect("sound_dianji");
    }

    public open(...param:any[]):void{
        super.open(param);
        this.refreshView();
    }

    private createClickHandler(e:egret.TouchEvent):void{
        this.applyFunc(HomeConst.ROOM_CREATE_REQ);
    }

    private enterClickHandler(e:egret.TouchEvent):void{
        this.applyFunc(HomeConst.ROOM_ENTER_REQ);
    }

    private friendClickHandler(e:egret.TouchEvent):void{
        //App.ViewManager.open(ViewConst.Friend);
    }

    private shopClickHandler(e:egret.TouchEvent):void{
        this.playSound();
        //App.ViewManager.open(ViewConst.Shop);
    }

    private warehouseClickHandler(e:egret.TouchEvent):void{
        this.playSound();
        //App.ViewManager.open(ViewConst.Warehouse);
    }

    private factoryClickHandler(e:egret.TouchEvent):void{
        this.playSound();
        //App.ViewManager.open(ViewConst.Factory);
    }

    private moreClickHandler(e:egret.TouchEvent):void{
        this.playSound();
    }


    private menuBtnChangeHandler(e:egret.Event):void{
        this.playSound();
        if(this.menu){
            this.menu.visible = this.menuBtn.selected;
        }
    }

    private menuClickHandler(e:egret.TouchEvent):void{
        console.log(e.target)
        if(e.target == this.menu.taskBtn){
            this.playSound();
            //App.ViewManager.open(ViewConst.Task);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
        else if(e.target == this.menu.dailyBtn){
            this.playSound();
            //App.ViewManager.open(ViewConst.Daily);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
        else if(e.target == this.menu.mailBtn){
            this.playSound();
            //App.ViewManager.open(ViewConst.Mail);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
    }

    public createRoomSuccess():void{
        this.refreshView();
    }

    private refreshView():void{
        this.nameDisplay.text = MainManager.userInfo.nick;
        this.coinsDisplay.text = "" + MainManager.userInfo.coins;
        if (RoomManager.hasRoomInfo) {
            this.createBtn.enabled = false;
            this.enterBtn.enabled = true;
            this.enterBtn.label = "进入【" + RoomManager.roomId + "】房间";
        }
        else {
            this.createBtn.enabled = true;
            this.enterBtn.enabled = false;
            this.enterBtn.label = "进入房间";
        }
    }
}