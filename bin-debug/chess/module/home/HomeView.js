var HomeView = (function (_super) {
    __extends(HomeView, _super);
    function HomeView($controller, $parent) {
        _super.call(this, $controller, $parent);
        this.skinName = "resource/skins/GuiScreenSkin.exml";
    }
    var d = __define,c=HomeView,p=c.prototype;
    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    p.initUI = function () {
        _super.prototype.initUI.call(this);
        this.menu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuClickHandler, this);
        this.menuBtn.addEventListener(egret.Event.CHANGE, this.menuBtnChangeHandler, this);
        this.friendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendClickHandler, this);
        this.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shopClickHandler, this);
        this.warehouseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.warehouseClickHandler, this);
        this.factoryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.factoryClickHandler, this);
        this.moreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moreClickHandler, this);
    };
    p.playSound = function () {
        App.SoundManager.playEffect("sound_dianji");
    };
    p.friendClickHandler = function (e) {
        App.TipsUtils.showCenter("" + Math.random());
        return;
        function send() {
            Log.trace("home send");
            var msg = {};
            msg.key = "user_login_c2s";
            msg.body = {
                "accid": 888,
                "tstamp": 999,
                "ticket": "海潮"
            };
            App.Socket.send(msg);
        }
        send();
        this.playSound();
        //App.ViewManager.open(ViewConst.Friend);
    };
    p.shopClickHandler = function (e) {
        this.playSound();
        App.ViewManager.open(ViewConst.Shop);
    };
    p.warehouseClickHandler = function (e) {
        this.playSound();
        App.ViewManager.open(ViewConst.Warehouse);
    };
    p.factoryClickHandler = function (e) {
        this.playSound();
        App.ViewManager.open(ViewConst.Factory);
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
            App.ViewManager.open(ViewConst.Task);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
        else if (e.target == this.menu.dailyBtn) {
            this.playSound();
            App.ViewManager.open(ViewConst.Daily);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
        else if (e.target == this.menu.mailBtn) {
            this.playSound();
            App.ViewManager.open(ViewConst.Mail);
            this.menuBtn.selected = false;
            this.menu.visible = false;
        }
    };
    return HomeView;
}(BaseEuiView));
egret.registerClass(HomeView,'HomeView');
//# sourceMappingURL=HomeView.js.map