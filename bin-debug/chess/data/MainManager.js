var MainManager = (function () {
    function MainManager() {
    }
    var d = __define,c=MainManager,p=c.prototype;
    MainManager.setUserInfo = function (player) {
        this._userInfo = new UserInfo(player);
        this._userId = this._userInfo.uid;
        App.Head.uid = player.uid;
    };
    d(MainManager, "userId"
        ,function () {
            return this._userId;
        }
    );
    d(MainManager, "userInfo"
        ,function () {
            return this._userInfo;
        }
    );
    d(MainManager, "bankerUid"
        ,function () {
            return this._bankerUid;
        }
        ,function (value) {
            this._bankerUid = value;
        }
    );
    d(MainManager, "bankerNick"
        ,function () {
            if (this._bankerUid != 0) {
                var banker = RoomManager.getPlayer(this._bankerUid);
                if (banker != null)
                    return banker.nick;
            }
            return null;
        }
    );
    MainManager.initLoginInfo = function (openId, nick, code) {
        this._openId = openId;
        this._nick = nick;
        this._code = code;
    };
    MainManager.autologin = function () {
        if (this._openId == null)
            return;
        var debug = App.lookupProtoMessage(Msg.DEBUG).create({ openid: this._openId, nick: this._nick });
        var wechat = App.lookupProtoMessage(Msg.WECHAT).create({ code: this._code });
        var body = {
            "head": App.Head,
            "debug": debug,
            "type": 0 //DEBUG:0,WECHAT:1
        };
        App.Socket.writeAndFlush(Cmd.LOGIN, 0, body);
    };
    MainManager.logged = false;
    MainManager._bankerUid = 0;
    MainManager._openId = null;
    return MainManager;
}());
egret.registerClass(MainManager,'MainManager');
//# sourceMappingURL=MainManager.js.map