var RoomSeatItem = (function (_super) {
    __extends(RoomSeatItem, _super);
    function RoomSeatItem() {
        _super.call(this);
        this._totalPoints = 0;
        this._position = 0;
        this.angle = 0;
        this.i = 1;
        this.gap = 72;
        this.skinName = "resource/skins/RoomSeatItemSkin.exml";
        // var sp:egret.Shape = new egret.Shape();
        // sp.graphics.beginFill(0xcccccc,.9);
        // sp.graphics.drawRect(0,0,120,120);
        // sp.graphics.endFill();
        // this.addChildAt(sp,0);
        this.nickLbl.text = "";
        this.pointsLbl.text = "";
        this.betContainer.visible = false;
        for (var i = 0; i < 5; i++) {
            var item = new PukeItem(RoomSeatBar.PUKE_WIDTH, RoomSeatBar.PUKE_HEIGHT);
            item.info = null;
            this.container.addChild(item);
            item.x = RoomSeatBar.PUKE_STACKED_WIDTH * i;
        }
        this.init();
    }
    var d = __define,c=RoomSeatItem,p=c.prototype;
    p.init = function () {
        this._circle = new egret.Shape();
        this._circle.graphics.lineStyle(4, 0xff0000, 1);
        this._circle.graphics.drawCircle(58, 58, 51);
        this.addChild(this._circle);
        this._circle.x = 0;
        this._circle.y = 20;
        this._mask = new egret.Shape();
        this.addChild(this._mask);
        this._mask.x = 58;
        this._mask.y = 78;
        this._circle.mask = this._mask;
    };
    p.startCountdown = function (count) {
        this.gap = 360 / count;
        this.timeStamp();
    };
    p.removeCountdown = function (count) {
        this._mask.graphics.clear();
    };
    p.timeStamp = function () {
        this.countdown(this.angle, this.i);
        this.angle += this.gap / 10;
        if (this.angle >= 360) {
            //angle = angle % 360;
            //i *= -1;
            this.angle = 0;
            this.i = 1;
        }
        return false;
    };
    p.countdown = function (angle, i) {
        this._mask.graphics.clear();
        this._mask.graphics.beginFill(0xffff00, 1);
        this._mask.graphics.moveTo(0, 0);
        this._mask.graphics.lineTo(100, 0);
        this._mask.graphics.drawArc(0, 0, 100, 0, angle * Math.PI / 180, i == -1);
        this._mask.graphics.lineTo(0, 0);
        this._mask.graphics.endFill();
    };
    d(p, "info"
        ,function () {
            return this._info;
        }
        ,function (value) {
            this._info = value;
            this.nickLbl.text = this._info.nick;
            this.state = GamingStates.NONE;
            this.betContainer.visible = false;
        }
    );
    d(p, "bet",undefined
        ,function (value) {
            this.betLbl.text = "" + value;
            this.betContainer.visible = true;
        }
    );
    d(p, "isBanker",undefined
        ,function (value) {
            if (this._info == null || this._info == undefined)
                return;
            if (value) {
                this.nickLbl.text = "[庄]" + this._info.nick;
            }
            else {
                this.nickLbl.text = this._info.nick;
            }
            Log.trace(this.nickLbl.text);
        }
    );
    p.revert = function () {
        this._totalPoints = 0;
        this.revertAllCards();
        //this.isBanker = false;
        this.state = GamingStates.NONE;
        this.betContainer.visible = false;
    };
    d(p, "state",undefined
        ,function (value) {
            this._state = value;
            this.container.visible = true;
            this.betContainer.visible = false;
            switch (this._state) {
                case GamingStates.NONE:
                    //this.nickLbl.text = "";
                    this.stateLbl.text = "";
                    this.betLbl.text = "";
                    this.pointsLbl.text = "";
                    this.container.visible = false;
                    break;
                case GamingStates.ROUND_START:
                    this.stateLbl.text = "准备中";
                    break;
                case GamingStates.PLAYER_READY:
                    this.stateLbl.text = "已准备";
                    this.betLbl.text = "";
                    break;
                case GamingStates.BETTING_START:
                    this.stateLbl.text = "下注中";
                    this.betLbl.text = "";
                    break;
                case GamingStates.SWITCH_BETTING:
                    this.stateLbl.text = "下注中";
                    break;
                case GamingStates.PLAYER_BET:
                    this.stateLbl.text = "已下注";
                    this.betContainer.visible = true;
                    break;
                case GamingStates.PLAYING_START:
                    this.stateLbl.text = "要牌中";
                    this.betContainer.visible = true;
                    break;
                case GamingStates.SWITCH_GETTING:
                    this.stateLbl.text = "要牌中";
                    this.betContainer.visible = true;
                    break;
                case GamingStates.SWITCH_BET_WAITING:
                case GamingStates.SWITCH_GET_WAITING:
                    this.stateLbl.text = "等待中";
                    this.betContainer.visible = true;
                    break;
                case GamingStates.BOOM:
                    this.stateLbl.text = "已爆牌";
                    this.betContainer.visible = true;
                    break;
                case GamingStates.PLAYER_STAND:
                    this.stateLbl.text = "等待中"; //已停牌/等待中
                    this.betContainer.visible = true;
                    break;
                case GamingStates.SWITCH_GETTING:
                    this.stateLbl.text = "要牌中";
                    this.betContainer.visible = true;
                    break;
                case GamingStates.SWITCH_GETTING:
                    this.stateLbl.text = "等待中";
                    this.betContainer.visible = true;
                    break;
            }
        }
    );
    p.addCard = function (card) {
        var item = null;
        var num = this.container.numChildren;
        for (var i = 1; i < num; i++) {
            item = this.container.getChildAt(i);
            if (item.info == null) {
                break;
            }
        }
        item.info = new PukeInfo(card.ID);
        //this.container.addChild(item);
        //item.x = RoomSeatBar.PUKE_STACKED_WIDTH*this.container.numChildren;
        this._totalPoints += parseInt(card.value) / 2;
        this.pointsLbl.text = "" + this._totalPoints;
    };
    p.addCards = function (cards) {
        this.revertAllCards();
        for (var i = 0; i < cards.length; i++) {
            //var item:PukeItem = new PukeItem(RoomSeatBar.PUKE_WIDTH,RoomSeatBar.PUKE_HEIGHT);
            var item = this.container.getChildAt(i);
            item.info = new PukeInfo(cards[i].ID);
            //this.container.addChild(item);
            //item.x = RoomSeatBar.PUKE_STACKED_WIDTH*i;
            this._totalPoints += parseInt(cards[i].value) / 2;
            this.pointsLbl.text = "" + this._totalPoints;
        }
    };
    p.showHiddenCard = function (card) {
        var item = this.container.getChildAt(0);
        item.info = new PukeInfo(card.ID);
        if (this._info != null && this._info.uid != MainManager.userId) {
            this._totalPoints += parseInt(card.value) / 2;
            this.pointsLbl.text = "" + this._totalPoints;
        }
        //this._totalPoints += parseInt(card.value)/2;
        //this.pointsLbl.text = ""+this._totalPoints;
    };
    p.revertAllCards = function () {
        // while(this.container.numChildren>0){
        // 	this.container.removeChildAt(0);
        // }
        var num = this.container.numChildren;
        var item;
        for (var i = 0; i < num; i++) {
            item = this.container.getChildAt(i);
            item.info = null;
        }
    };
    d(p, "position"
        ,function () {
            return this._position;
        }
        ,function (value) {
            this._position = value;
            //117x170
            switch (this._position) {
                case 0:
                case 1:
                    this.betContainer.y = 180;
                    this.pointsLbl.y = 230;
                    break;
                case 2:
                    this.betContainer.x = 140;
                    this.betContainer.y = 110;
                    this.pointsLbl.x = 200;
                    this.pointsLbl.y = 110;
                    break;
                case 3:
                    this.betContainer.x = -140;
                    this.betContainer.y = 110;
                    this.pointsLbl.x = -200;
                    this.pointsLbl.y = 110;
                    break;
                case 4:
                    this.betContainer.x = 130;
                    this.betContainer.y = 20;
                    this.pointsLbl.x = 190;
                    this.pointsLbl.y = 20;
                    break;
                case 5:
                    this.betContainer.x = -130;
                    this.betContainer.y = 20;
                    this.pointsLbl.x = -190;
                    this.pointsLbl.y = 20;
                    break;
            }
        }
    );
    return RoomSeatItem;
}(eui.Component));
egret.registerClass(RoomSeatItem,'RoomSeatItem');
//# sourceMappingURL=RoomSeatItem.js.map