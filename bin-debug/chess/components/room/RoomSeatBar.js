var RoomSeatBar = (function (_super) {
    __extends(RoomSeatBar, _super);
    function RoomSeatBar() {
        _super.call(this);
        this._items = new Array();
    }
    var d = __define,c=RoomSeatBar,p=c.prototype;
    d(p, "barWidth"
        ,function () {
            return this.numChildren * RoomSeatBar.ITEM_WIDTH;
        }
    );
    p.refresh = function () {
        this.removeAllChildren();
        var players = RoomManager.players;
        var player;
        var item;
        var index = 0;
        for (var i = 0; i < players.length; i++) {
            player = players[i];
            Log.trace(player.uid);
            if (player.uid != MainManager.userId) {
                if (index >= this._items.length) {
                    this._items.push(new RoomSeatItem());
                }
                item = this._items[index];
                item.info = player;
                this.addChild(item);
                egret.Tween.get(item).to({ x: RoomSeatBar.ITEM_WIDTH * index }, 500);
                index++;
            }
        }
    };
    p.revert = function () {
        for (var i = 0; i < this._items.length; i++) {
            this._items[i].revert();
        }
    };
    p.getItem = function (player) {
        var index = 0;
        while (index < this.numChildren) {
            var item = this.getChildAt(index);
            if (item.info.uid == player.uid) {
                return item;
            }
            index++;
        }
        return null;
    };
    p.removeAllChildren = function () {
        while (this.numChildren > 0) {
            var item = this.removeChildAt(0);
            item.x = 0;
            item.y = 0;
        }
    };
    RoomSeatBar.ITEM_WIDTH = 125;
    RoomSeatBar.ITEM_HEIGHT = 100;
    RoomSeatBar.PUKE_WIDTH = 100;
    RoomSeatBar.PUKE_HEIGHT = 80;
    RoomSeatBar.PUKE_STACKED_WIDTH = 30;
    return RoomSeatBar;
}(eui.Component));
egret.registerClass(RoomSeatBar,'RoomSeatBar');
//# sourceMappingURL=RoomSeatBar.js.map