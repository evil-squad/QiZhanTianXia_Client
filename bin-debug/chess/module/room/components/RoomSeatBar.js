var RoomSeatBar = (function (_super) {
    __extends(RoomSeatBar, _super);
    function RoomSeatBar() {
        _super.call(this);
        this._items = new Array();
        this.timer = new egret.Timer(100, 500);
        this.init();
    }
    var d = __define,c=RoomSeatBar,p=c.prototype;
    p.init = function () {
        this._myItem = new RoomSeatItem();
        this._myItem.x = RoomSeatBar.MY_POS.x;
        this._myItem.y = RoomSeatBar.MY_POS.y;
        this.addChild(this._myItem);
        var item;
        var pos;
        for (var i = 0; i < RoomSeatBar.PLAYER_MAX; i++) {
            item = new RoomSeatItem();
            pos = RoomSeatBar.PLAY_POS[i];
            item.x = pos.x;
            item.y = pos.y;
            item.position = i;
            this.addChild(item);
            this._items.push(item);
        }
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
    };
    p.timerFunc = function () {
        console.log("计时");
        //this.timeStamp(0);
    };
    p.timerComFunc = function () {
        console.log("计时结束");
    };
    p.startCountdown = function () {
    };
    p.stopCountdown = function () {
    };
    d(p, "barWidth"
        ,function () {
            return this.numChildren * RoomSeatBar.ITEM_WIDTH;
        }
    );
    p.refresh = function () {
        this.clean();
        var players = RoomManager.players;
        var player;
        var item;
        var index = 0;
        for (var i = 0; i < players.length; i++) {
            player = players[i];
            if (player.uid != MainManager.userId) {
                if (index >= this._items.length) {
                    //this._items.push(new RoomSeatItem());
                    continue;
                }
                item = this.getItemByIndex(index);
                item.info = player;
                index++;
            }
            else {
                this._myItem.info = player;
            }
        }
    };
    p.addMyCard = function (card) {
        this._myItem.addCard(card);
    };
    d(p, "state",undefined
        ,function (value) {
            switch (value) {
                case GamingStates.NONE:
                    break;
                case GamingStates.WAITING:
                    break;
                case GamingStates.ROOM_START:
                    break;
                case GamingStates.ROUND_START:
                    break;
                case GamingStates.PLAYER_READY:
                    break;
                case GamingStates.PLAYER_BET:
                    break;
                case GamingStates.PLAYER_STAND:
                    break;
                case GamingStates.BOOM:
                    break;
                //统一控制
                case GamingStates.BETTING_START: //下注中
                case GamingStates.PLAYING_START: //要牌中
                case GamingStates.SETTLEMENT: //结算中
                case GamingStates.ROUND_FINISH:
                    this.itemsState = value;
                    break;
            }
        }
    );
    d(p, "itemsState",undefined
        ,function (value) {
            var index = 0;
            while (index < this.numChildren) {
                var item = this.getChildAt(index);
                if (item.info != null) {
                    item.state = value;
                }
                index++;
            }
        }
    );
    p.getItemByIndex = function (index) {
        if (index < RoomSeatBar.PLAYER_MAX) {
            return this._items[index];
        }
        return null;
    };
    d(p, "myItem"
        ,function () {
            return this._myItem;
        }
    );
    p.revert = function () {
        this._myItem.revert();
        for (var i = 0; i < this._items.length; i++) {
            this._items[i].revert();
        }
    };
    p.getItem = function (player) {
        if (player.uid == MainManager.userId) {
            return this._myItem;
        }
        var index = 0;
        while (index < this.numChildren) {
            var item = this.getChildAt(index);
            if (item.info != null && item.info.uid == player.uid) {
                return item;
            }
            index++;
        }
        return null;
    };
    p.setStateExcept = function (state, player) {
        var index = 0;
        while (index < this.numChildren) {
            var item = this.getChildAt(index);
            if (item.info != null && item.info.uid != player.uid) {
                item.state = state;
            }
            index++;
        }
        if (player.uid != MainManager.userId) {
            this._myItem.state = state;
        }
    };
    p.setBankerExcept = function (isBanker, player) {
        var index = 0;
        while (index < this.numChildren) {
            var item = this.getChildAt(index);
            if (item.info != null && item.info.uid != player.uid) {
                item.isBanker = isBanker;
            }
            index++;
        }
        if (player.uid != MainManager.userId) {
            this._myItem.isBanker = isBanker;
        }
    };
    p.clean = function () {
        this._myItem.revert();
        var index = 0;
        while (index < this.numChildren) {
            var item = this.getChildAt(index);
            item.revert;
            index++;
        }
        return null;
    };
    RoomSeatBar.PLAYER_MAX = 8;
    RoomSeatBar.MY_POS = new egret.Point(500, 460);
    //sort by index
    RoomSeatBar.PLAY_POS = [new egret.Point(230, 0), new egret.Point(740, 0),
        new egret.Point(20, 120), new egret.Point(970, 120),
        new egret.Point(0, 360), new egret.Point(990, 360),
        new egret.Point(230, 460), new egret.Point(740, 460)];
    RoomSeatBar.ITEM_WIDTH = 125;
    RoomSeatBar.ITEM_HEIGHT = 100;
    RoomSeatBar.PUKE_WIDTH = 30;
    RoomSeatBar.PUKE_HEIGHT = 54;
    RoomSeatBar.PUKE_STACKED_WIDTH = 15;
    return RoomSeatBar;
}(eui.Component));
egret.registerClass(RoomSeatBar,'RoomSeatBar');
//# sourceMappingURL=RoomSeatBar.js.map