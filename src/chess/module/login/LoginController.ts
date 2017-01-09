class LoginController extends BaseController{
    //本模块的所有UI
    private loginView:LoginView;
    //本模块的Proxy
    private loginProxy:LoginProxy;

    public constructor(){
        super();

        //初始化UI
        this.loginView = new LoginView(this, LayerManager.UI_Main);
        App.ViewManager.register(ViewConst.Login, this.loginView);

        //初始化Proxy
        this.loginProxy = new LoginProxy(this);        
    }

    //注册模块间、模块内部事件监听
    public addEvents():void{
        //注册C2S消息
        this.registerFunc(LoginConst.LOGIN_REQ, this.onLogin, this);
        //注册S2C消息
        this.registerFunc(LoginConst.LOGIN_RESP, this.loginSuccess, this);
        this.registerFunc(LoginConst.ROOM_ENTER_RESP, this.enterResp, this);
    }

    public removeEvents():void{
        this.removeFunc(LoginConst.LOGIN_REQ);
        this.removeFunc(LoginConst.LOGIN_RESP);
        this.removeFunc(LoginConst.ROOM_ENTER_RESP);
    }

    /**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    private onLogin(openId:string, code:number, nick:string):void{
        this.loginProxy.login(openId, code, nick);
    }

    /**
     * 登陆成功处理
     */
    private loginSuccess(userInfo:any):void{
        //本模块UI处理
        this.loginView.loginSuccess();
        //UI跳转
        if(RoomManager.hasRoomInfo){
            this.loginProxy.enterRoom();
        }else{
            App.SceneManager.runScene(SceneConsts.Home);
        }
    }

    private enterResp(obj:any):void{
        RoomManager.parsePlayers(obj.players,"login");
        App.SceneManager.runScene(SceneConsts.Room);
    }
}