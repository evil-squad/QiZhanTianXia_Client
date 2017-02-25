/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        //注入自定义的素材解析器
        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //适配方式
        if (App.DeviceUtils.IsPC) {
            App.StageUtils.setScaleMode(egret.StageScaleMode.SHOW_ALL);
        }
        else if (App.DeviceUtils.IsMobile) {
            App.StageUtils.setScaleMode(egret.StageScaleMode.EXACT_FIT);
        }
        else {
        }
        //初始化
        this.initScene();
        this.initModule();
        //设置加载进度界面
        App.SceneManager.runScene(SceneConsts.LOADING);
        //加载资源版本号
        if (false) {
            App.ResVersionManager.loadConfig("resource/resource_version.json", this.loadResVersionComplate, this);
        }
        else {
            this.loadResVersionComplate();
        }
    };
    p.loadResVersionComplate = function () {
        //初始化Resource资源加载库
        App.ResourceUtils.addConfig("resource/default.res.json", "resource/");
        App.ResourceUtils.addConfig("resource/resource_core.json", "resource/");
        App.ResourceUtils.addConfig("resource/resource_ui.json", "resource/");
        //App.ResourceUtils.addConfig("resource/resource_battle.json", "resource/");
        //App.ResourceUtils.addConfig("resource/resource_mj.json", "resource/");
        App.ResourceUtils.addConfig("resource/resource_puke.json", "resource/");
        App.ResourceUtils.loadConfig(this.onConfigComplete, this);
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    p.onConfigComplete = function () {
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    /**
     * 主题文件加载完成
     */
    p.onThemeLoadComplete = function () {
        var roomid = egret.getOption("roomid");
        if (roomid != undefined && roomid != null) {
            RoomManager.setRoomInfo(roomid);
        }
        new Startup();
        //new RoomTest();
    };
    /**
     * 初始化所有场景
     */
    p.initScene = function () {
        App.SceneManager.register(SceneConsts.LOADING, new LoadingScene());
        App.SceneManager.register(SceneConsts.Enter, new EnterScene());
        App.SceneManager.register(SceneConsts.Home, new HomeScene());
        App.SceneManager.register(SceneConsts.Room, new RoomScene());
    };
    /**
     * 初始化所有模块
     */
    p.initModule = function () {
        App.ControllerManager.register(ControllerConst.Loading, new LoadingController());
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map