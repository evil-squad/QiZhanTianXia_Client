class LoginView extends BaseEuiView {

    private roomIdInput:eui.TextInput;
    private openIdInput:eui.TextInput;
    private nickInput:eui.TextInput;
    private enterBtn:eui.Button;

    public constructor($controller:BaseController, $parent:eui.Group){
        super($controller, $parent);

        this.skinName = "resource/skins/LoginSkin.exml";
        // if(App.DeviceUtils.IsMobile){
        //     this.skinName = "resource/skins/vmobile/LoginViewMSkin.exml";
        // }else{
        //     this.skinName = "resource/skins/LoginSkin.exml";
        // }
    }

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void{
        super.initUI();

        this.openIdInput.text = "openid_3_"+egret.Capabilities.os;
        this.nickInput.text = "nick"+Math.floor(Math.random()*100);

        //this.passwordInput.displayAsPassword = true;
        this.enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
    }

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData():void{
        super.initData();
    }

    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    public open(...param:any[]):void{
        super.open(param);
        if(RoomManager.hasRoomInfo){
            this.roomIdInput.text = RoomManager.roomId;
        }
    }

    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    public close(...param:any[]):void{
        super.close(param);
    }

    /**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    private onLogin():void{
        RoomManager.roomId = this.roomIdInput.text;

        var openId = this.openIdInput.text;
        openId = openId==""||openId==null?"default_openid"+egret.Capabilities.os:openId;

        var nick = this.nickInput.text;
        nick = nick==""||nick==null?"nick"+Math.floor(Math.random()*100):nick;
        // if(roomId != null && roomId != ""){
        //     RoomManager.roomId = roomId;
        // }
        //var pwd:string = this.passwordInput.text;
        //进行基础检测
        // if(userName == null || userName.length == 0){
        //     App.TipsUtils.showCenter("账号密码不能为空");
        //     return;
        // }
        // if(pwd == null || pwd.length == 0){
        //     App.TipsUtils.showCenter("账号密码不能为空");
        //     return;
        // }

        //var openId = egret.Capabilities.os+""+(Math.floor(Math.random()*10));
        var code = "2";
        
        this.applyFunc(LoginConst.LOGIN_REQ, openId, code, nick);
    }

    /**
     * 登陆成功处理
     */
    public loginSuccess():void{
        //TODO 登陆成功处理
        App.TipsUtils.showCenter("登录成功");
    }
}