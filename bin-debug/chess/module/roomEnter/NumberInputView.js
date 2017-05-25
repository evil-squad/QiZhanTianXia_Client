var NumberInputView = (function (_super) {
    __extends(NumberInputView, _super);
    function NumberInputView() {
        _super.call(this);
        this.skinName = "resource/skins/NumberInputSkin.exml";
        this.init();
    }
    var d = __define,c=NumberInputView,p=c.prototype;
    p.init = function () {
        this.zeroBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.oneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.twoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.threeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.fourBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.fiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.sixBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.sevenBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.eightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.nineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.deleteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.numberLabl.maxChars = 8;
        this.numberLabl.restrict = "0-9";
        this.numberLabl.text = "";
        var image = new eui.Image();
        image.source = "num_input_return";
        this.deleteBtn.iconDisplay = image;
    };
    d(p, "roomNumber",undefined
        ,function (value) {
            this.numberLabl.text = value;
        }
    );
    d(p, "enterPanel",undefined
        ,function (value) {
            this._enterPanel = value;
        }
    );
    p.addNumber = function (value) {
        if (this.numberLabl.text.length > 8)
            return;
        if (value != 0) {
            this.numberLabl.text = this.numberLabl.text + value;
        }
        else {
            if (this.numberLabl.text != "" && this.numberLabl.text != "0") {
                this.numberLabl.text = this.numberLabl.text + "0";
            }
        }
    };
    p.deleteNumber = function () {
        if (this.numberLabl.text.length != 0) {
            this.numberLabl.text = this.numberLabl.text.substring(0, this.numberLabl.text.length - 1);
        }
    };
    p.clickHandler = function (event) {
        switch (event.currentTarget) {
            case this.zeroBtn:
                this.addNumber(0);
                break;
            case this.oneBtn:
                this.addNumber(1);
                break;
            case this.twoBtn:
                this.addNumber(2);
                break;
            case this.threeBtn:
                this.addNumber(3);
                break;
            case this.fourBtn:
                this.addNumber(4);
                break;
            case this.fiveBtn:
                this.addNumber(5);
                break;
            case this.sixBtn:
                this.addNumber(6);
                break;
            case this.sevenBtn:
                this.addNumber(7);
                break;
            case this.eightBtn:
                this.addNumber(8);
                break;
            case this.nineBtn:
                this.addNumber(9);
                break;
            case this.deleteBtn:
                this.deleteNumber();
                break;
            case this.confirmBtn:
                if (this._enterPanel != null) {
                    var roomid = this.numberLabl.text;
                    if (roomid == null || roomid == "") {
                        App.TipsUtils.showCenter("请输入房间号");
                        return;
                    }
                    this._enterPanel.applyFunc(HomeConst.ROOM_ENTER_REQ, roomid);
                }
                break;
        }
    };
    return NumberInputView;
}(eui.Component));
egret.registerClass(NumberInputView,'NumberInputView');
//# sourceMappingURL=NumberInputView.js.map