var HomeView = (function (_super) {
    __extends(HomeView, _super);
    function HomeView($controller, $parent) {
        _super.call(this, $controller, $parent);
        if (App.DeviceUtils.IsMobile) {
            this.skinName = "resource/skins/vmobile/HomeViewMSkin.exml";
        }
        else {
            this.skinName = "resource/skins/GuiScreenSkin.exml";
        }
        //this.skinName = "resource/skins/vmobile/HomeViewMSkin.exml";
        //this.skinName = "resource/skins/HomeViewDebugSkin.exml";
    }
    var d = __define,c=HomeView,p=c.prototype;
    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    p.initUI = function () {
        _super.prototype.initUI.call(this);
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
        if (App.DeviceUtils.IsPC) {
        }
    };
    p.playSound = function () {
        App.SoundManager.playEffect("sound_dianji");
    };
    p.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i - 0] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.refreshView();
    };
    p.createClickHandler = function (e) {
        this.applyFunc(HomeConst.ROOM_CREATE_REQ);
    };
    p.enterClickHandler = function (e) {
        if (RoomManager.hasRoomInfo) {
            this.applyFunc(HomeConst.ROOM_ENTER_REQ);
        }
        else {
            App.ViewManager.open(ViewConst.RoomEnter);
        }
    };
    p.crossEnterClickHandler = function () {
        App.ViewManager.open(ViewConst.RoomEnter);
    };
    p.sendClickHandler = function (e) {
        if (this.cmdInput != null && this.cmdInput.text != "") {
            var cmd = parseInt(this.cmdInput.text);
            this.applyFunc(HomeConst.GM, cmd, this.bodyInput.text);
        }
    };
    p.friendClickHandler = function (e) {
        //App.ViewManager.open(ViewConst.Friend);
    };
    p.shopClickHandler = function (e) {
        this.playSound();
        //App.ViewManager.open(ViewConst.Shop);
    };
    p.warehouseClickHandler = function (e) {
        this.playSound();
        //App.ViewManager.open(ViewConst.Warehouse);
    };
    p.factoryClickHandler = function (e) {
        this.playSound();
        //App.ViewManager.open(ViewConst.Factory);
    };
    p.moreClickHandler = function (e) {
        this.playSound();
    };
    p.menuBtnChangeHandler = function (e) {
        this.playSound();
        if (this.menu) {
            this.menu.visible = this.menuBtn.selected;
        }
    };
    p.menuClickHandler = function (e) {
        console.log(e.target);
        if (e.target == this.menu.taskBtn) {
            this.playSound();
            //App.ViewManager.open(ViewConst.Task);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
        else if (e.target == this.menu.dailyBtn) {
            this.playSound();
            //App.ViewManager.open(ViewConst.Daily);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
        else if (e.target == this.menu.mailBtn) {
            this.playSound();
            //App.ViewManager.open(ViewConst.Mail);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
    };
    p.createRoomSuccess = function () {
        this.refreshView();
    };
    p.refreshView = function () {
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
            this.roomLabel.text = "房间";
        }
    };
    return HomeView;
}(BaseEuiView));
egret.registerClass(HomeView,'HomeView');
//# sourceMappingURL=HomeView.js.map