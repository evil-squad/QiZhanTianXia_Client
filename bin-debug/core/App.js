var App = (function () {
    function App() {
    }
    var d = __define,c=App,p=c.prototype;
    /**
     * 初始化函数
     * @constructor
     */
    App.Init = function () {
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
        protobuf.load("resource/proto/package.proto?" + Math.random()).then(function (root) {
            App.ProtoRoot = root;
        });
        Log.trace(App.GlobalData.ReqConfig, App.GlobalData.RespConfig);
        App.ReqConfig = RES.getRes(App.GlobalData.ReqConfig);
        App.RespConfig = RES.getRes(App.GlobalData.RespConfig);
        App.Socket.initServer(App.GlobalData.SocketServer, App.GlobalData.SocketPort, new ByteArrayMsgByProtobuf());
    };
    App.lookupProtoMessage = function (key) {
        return App.ProtoRoot.lookup(key);
    };
    d(App, "Head"
        ,function () {
            if (this._head == null) {
                this._head = App.lookupProtoMessage(Msg.Head).create({ uid: 12, err: 0, errmsg: "" });
            }
            return this._head;
        }
    );
    d(App, "Http"
        /**
         * Http请求
         * @type {Http}
         */
        ,function () {
            return Http.getInstance();
        }
    );
    d(App, "Socket"
        /**
         * Socket请求
         * @type {null}
         */
        ,function () {
            return Socket.getInstance();
        }
    );
    d(App, "EasyLoading"
        /**
         * 通用Loading动画
         * @returns {any}
         * @constructor
         */
        ,function () {
            return EasyLoading.getInstance();
        }
    );
    d(App, "ResVersionManager"
        /**
         * 单一资源通过版本号加载管理类
         */
        ,function () {
            return ResVersionManager.getInstance();
        }
    );
    d(App, "DebugUtils"
        /**
         * 调试工具
         * @type {DebugUtils}
         */
        ,function () {
            return DebugUtils.getInstance();
        }
    );
    d(App, "MessageCenter"
        /**
         * 服务器返回的消息处理中心
         * @type {MessageCenter}
         */
        ,function () {
            return MessageCenter.getInstance(0);
        }
    );
    d(App, "TimerManager"
        /**
         * 统一的计时器和帧刷管理类
         * @type {TimerManager}
         */
        ,function () {
            return TimerManager.getInstance();
        }
    );
    d(App, "DeviceUtils"
        /**
         * 设备工具类
         */
        ,function () {
            return DeviceUtils.getInstance();
        }
    );
    d(App, "DisplayUtils"
        /**
         * 显示对象工具类
         * @type {DisplayUtils}
         */
        ,function () {
            return DisplayUtils.getInstance();
        }
    );
    d(App, "StageUtils"
        /**
         * Stage操作相关工具类
         */
        ,function () {
            return StageUtils.getInstance();
        }
    );
    d(App, "ResourceUtils"
        /**
         * 资源加载工具类
         */
        ,function () {
            return ResourceUtils.getInstance();
        }
    );
    d(App, "SoundManager"
        /**
         * 音乐管理类
         */
        ,function () {
            return SoundManager.getInstance();
        }
    );
    d(App, "ControllerManager"
        /**
         * 模块管理类
         * @type {ControllerManager}
         */
        ,function () {
            return CtrlManager.getInstance();
        }
    );
    d(App, "ViewManager"
        /**
         * View管理类
         * @type {ViewManager}
         */
        ,function () {
            return ViewManager.getInstance();
        }
    );
    d(App, "SceneManager"
        /**
         * 场景管理类
         * @type {SceneManager}
         */
        ,function () {
            return SceneManager.getInstance();
        }
    );
    d(App, "TipsUtils"
        /**
         * 提示相关工具类
         * @type {TipsUtils}
         */
        ,function () {
            return TipsUtils.getInstance();
        }
    );
    /**
     * 请求服务器使用的用户标识
     * @type {string}
     */
    App.ProxyUserFlag = "";
    /**
     * 全局配置数据
     * @type {null}
     */
    App.GlobalData = null;
    /**
    * ProtoFile
    * @type {null}
    */
    App.ProtoFile = null;
    /**
     * ProtoConfig
     * @type {null}
     */
    App.ProtoConfig = null;
    return App;
}());
egret.registerClass(App,'App');
//# sourceMappingURL=App.js.map