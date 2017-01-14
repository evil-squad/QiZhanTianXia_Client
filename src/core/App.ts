class App {
	public constructor() {
	}

    /**
     * 初始化函数
     * @constructor
     */
    public static Init():void {
        //全局配置数据
         App.GlobalData = RES.getRes("global");
        //开启调试
        App.DebugUtils.isOpen(App.GlobalData.IsDebug);
        App.DebugUtils.setThreshold(5);
        //扩展功能初始化
        //App.EgretExpandUtils.init();
        //实例化Http请求
        App.Http.initServer(App.GlobalData.HttpSerever);
        //实例化ProtoBuf和Socket请求
        protobuf.load("../resource/proto/package.proto", ProtoManager.getProtoContents(), null,  function (err, root) {
            App.ProtoRoot = root;
        });
        App.ReqConfig = RES.getRes(App.GlobalData.ReqConfig);
        App.RespConfig = RES.getRes(App.GlobalData.RespConfig);
        App.Socket.initServer(App.GlobalData.SocketServer, App.GlobalData.SocketPort, new ByteArrayMsgByProtobuf());
    }

    public static lookupProtoMessage(key:string){
        return App.ProtoRoot.lookup(key);
    }

    public static ProtoRoot:any;
    public static ReqConfig:any;
    public static RespConfig:any;

    /**
     * 请求服务器使用的用户标识
     * @type {string}
     */
    public static ProxyUserFlag:string = "";

    /**
     * 全局配置数据
     * @type {null}
     */
    public static GlobalData:any = null;

     /**
     * ProtoFile
     * @type {null}
     */
    public static ProtoFile:any = null;

    /**
     * ProtoConfig
     * @type {null}
     */
    public static ProtoConfig:any = null;

    private static _head:any;
    public static get Head(){
        if (this._head == null) {
                this._head = App.lookupProtoMessage(Msg.Head).create({ uid: 12, err: 0, errmsg: "" });
        }
        return this._head;
    }

    /**
     * Http请求
     * @type {Http}
     */
    public static get Http():Http {
        return Http.getInstance();
    }

    /**
     * Socket请求
     * @type {null}
     */
    public static get Socket():Socket {
        return Socket.getInstance();
    }

    /**
     * 通用Loading动画
     * @returns {any}
     * @constructor
     */
    public static get EasyLoading():EasyLoading {
        return EasyLoading.getInstance();
    }

    /**
     * 单一资源通过版本号加载管理类
     */
    public static get ResVersionManager():ResVersionManager {
        return ResVersionManager.getInstance();
    }

	/**
     * 调试工具
     * @type {DebugUtils}
     */
    public static get DebugUtils():DebugUtils {
        return DebugUtils.getInstance();
    }

	/**
     * 服务器返回的消息处理中心
     * @type {MessageCenter}
     */
    public static get MessageCenter():MessageCenter {
        return MessageCenter.getInstance(0);
    }

	/**
     * 统一的计时器和帧刷管理类
     * @type {TimerManager}
     */
    public static get TimerManager():TimerManager {
        return TimerManager.getInstance();
    }

    /**
     * 设备工具类
     */
    public static get DeviceUtils():DeviceUtils {
        return DeviceUtils.getInstance();
    }

    /**
     * 显示对象工具类
     * @type {DisplayUtils}
     */
    public static get DisplayUtils():DisplayUtils {
        return DisplayUtils.getInstance();
    }

    /**
     * Stage操作相关工具类
     */
    public static get StageUtils():StageUtils {
        return StageUtils.getInstance();
    }

    /**
     * 资源加载工具类
     */
    public static get ResourceUtils():ResourceUtils {
        return ResourceUtils.getInstance();
    }

    /**
     * 音乐管理类
     */
    public static get SoundManager():SoundManager {
        return SoundManager.getInstance();
    }

    /**
     * 模块管理类
     * @type {ControllerManager}
     */
    public static get ControllerManager():CtrlManager {
        return CtrlManager.getInstance();
    }

    /**
     * View管理类
     * @type {ViewManager}
     */
    public static get ViewManager():ViewManager {
        return ViewManager.getInstance();
    }

    /**
     * 场景管理类
     * @type {SceneManager}
     */
    public static get SceneManager():SceneManager {
        return SceneManager.getInstance();
    }

    /**
     * 提示相关工具类
     * @type {TipsUtils}
     */
    public static get TipsUtils():TipsUtils {
        return TipsUtils.getInstance();
    }
}