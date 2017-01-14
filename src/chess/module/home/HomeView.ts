class HomeView extends BaseEuiView{
    public constructor($controller:BaseController, $parent:eui.Group) {
        super($controller, $parent);

        if(App.DebugUtils.isDebug){
            this.skinName = "resource/skins/HomeViewDebugSkin.exml";
        }else{
            if(App.DeviceUtils.IsMobile){
                this.skinName = "resource/skins/vmobile/HomeViewMSkin.exml";
            }else{
                this.skinName = "resource/skins/GuiScreenSkin.exml";
            }
        }
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
    public roomLabel:eui.Label;

    public createBtn:eui.Button;
    public enterBtn:eui.Button;

    private crossEnterBtn:eui.Button;

    private cmdInput:eui.TextInput;
    private bodyInput:eui.TextInput;
    private sendBtn:eui.Button;

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void{
        super.initUI();
        
        //this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP,this.menuClickHandler,this);
        //this.menuBtn.addEventListener(egret.Event.CHANGE,this.menuBtnChangeHandler,this);
        //this.friendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.friendClickHandler,this);
        //this.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.shopClickHandler,this);
        //this.warehouseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.warehouseClickHandler,this);
        //this.factoryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.factoryClickHandler,this);
        //this.moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.moreClickHandler,this);

        this.createBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.createClickHandler, this);
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterClickHandler, this);

        this.crossEnterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.crossEnterClickHandler, this);
        if(App.DebugUtils.isDebug){
            this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
        }
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
        if(RoomManager.hasRoomInfo){
            this.applyFunc(HomeConst.ROOM_ENTER_REQ);
        }else{
            App.ViewManager.open(ViewConst.RoomEnter);
        }
    }

    public crossEnterClickHandler():void{
        //App.SceneManager.runScene(SceneConsts.Room);
        App.ViewManager.open(ViewConst.RoomEnter);
    }

    private sendClickHandler(e:egret.TouchEvent):void{
        if(this.cmdInput != null && this.cmdInput.text != ""){
            var cmd:number = parseInt(this.cmdInput.text);
            this.applyFunc(HomeConst.GM, cmd, this.bodyInput.text);
        }
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
        this.coinsDisplay.text = "" + MainManager.userInfo.roomCard;
        if (RoomManager.hasRoomInfo) {
            this.createBtn.enabled = false;
            this.enterBtn.enabled = true;
            this.enterBtn.label = "进入【" + RoomManager.roomId + "】房间";
            this.roomLabel.text = "房间号：" + RoomManager.roomId;
        }
        else {
            this.createBtn.enabled = true;
            this.enterBtn.enabled = false;
            this.enterBtn.label = "进入房间";
            this.roomLabel.text = "房间"
        }
    }
}