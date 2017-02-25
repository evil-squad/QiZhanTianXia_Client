var RoomSeatItem = (function (_super) {
    __extends(RoomSeatItem, _super);
    function RoomSeatItem() {
        _super.call(this);
        this.skinName = "resource/skins/RoomSeatItemSkin.exml";
        var sp = new egret.Shape();
        sp.graphics.beginFill(0xcccccc, .9);
        sp.graphics.drawRect(0, 0, 120, 120);
        sp.graphics.endFill();
        this.addChildAt(sp, 0);
    }
    var d = __define,c=RoomSeatItem,p=c.prototype;
    d(p, "info"
        ,function () {
            return this._info;
        }
        ,function (value) {
            this._info = value;
            this.nickLbl.text = this._info.nick;
            this.state = GamingStates.NONE;
        }
    );
    d(p, "bet",undefined
        ,function (value) {
            this.betLbl.text = "" + value;
        }
    );
    d(p, "isBanker",undefined
        ,function (value) {
            if (value) {
                this.nickLbl.text = "[庄]" + this._info.nick;
            }
            else {
                this.nickLbl.text = this._info.nick;
            }
        }
    );
    p.revert = function () {
        this.isBanker = false;
    };
    d(p, "state",undefined
        ,function (value) {
            this._state = value;
            switch (this._state) {
                case GamingStates.NONE:
                    this.stateLbl.text = "";
                    this.betLbl.text = "";
                    break;
                case GamingStates.ROUND_START:
                    this.stateLbl.text = "正在准备";
                    break;
                case GamingStates.PLAYER_READY:
                    this.removeAllCards();
                    this.stateLbl.text = "已准备";
                    this.betLbl.text = "";
                    break;
                case GamingStates.BETTING_START:
                    this.stateLbl.text = "请下注";
                    this.betLbl.text = "";
                    break;
                case GamingStates.PLAYER_BET:
                    this.stateLbl.text = "已下注";
                    break;
                case GamingStates.PLAYING_START:
                    this.stateLbl.text = "开始要牌";
                    break;
                case GamingStates.BOOM:
                    this.stateLbl.text = "已爆牌";
                    break;
                case GamingStates.PLAYER_STAND:
                    this.stateLbl.text = "已停牌";
                    break;
            }
        }
    );
    p.addCards = function (cards) {
        this.removeAllCards();
        for (var i = 0; i < cards.length; i++) {
            var item = new PukeItem(RoomSeatBar.PUKE_WIDTH, RoomSeatBar.PUKE_HEIGHT);
            item.info = new PukeInfo(cards[i].ID);
            this.container.addChild(item);
            item.x = RoomSeatBar.PUKE_STACKED_WIDTH * i;
        }
    };
    p.removeAllCards = function () {
        while (this.container.numChildren > 0) {
            this.container.removeChildAt(0);
        }
    };
    return RoomSeatItem;
}(eui.Component));
egret.registerClass(RoomSeatItem,'RoomSeatItem');
//# sourceMappingURL=RoomSeatItem.js.map