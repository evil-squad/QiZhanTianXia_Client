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
var egret;
(function (egret) {
    /**
     * @class egret.MovieClip
     * @classdesc 影片剪辑，可以通过影片剪辑播放序列帧动画。
     * @extends egret.DisplayObjectContainer
     */
    var MovieClip2 = (function (_super) {
        __extends(MovieClip2, _super);
        function MovieClip2(data, texture) {
            _super.call(this);
            /**
             * @member {number} egret.MovieClip#frameRate
             * 动画的播放帧频
             */
            this.frameRate = 60;
            this.delegate = new DefaultMovieClipDelegate2(data, texture);
            this.delegate.setMovieClip(this);
        }
        var d = __define,c=MovieClip2,p=c.prototype;
        /**
         * 播放指定动画
         * @method egret.MovieClip#gotoAndPlay
         * @param frameName {string} 指定帧的帧名称

         */
        p.gotoAndPlay = function (frameName) {
            this.delegate.gotoAndPlay(frameName);
        };
        /**
         * 播放并暂停指定动画
         * @method egret.MovieClip#gotoAndStop
         * @param frameName {string} 指定帧的帧名称

         */
        p.gotoAndStop = function (frameName) {
            this.delegate.gotoAndStop(frameName);
        };
        /**
         * 暂停动画
         * @method egret.MovieClip#stop
         */
        p.stop = function () {
            this.delegate.stop();
        };
        /**
         * @method egret.MovieClip#dispose
         */
        p.dispose = function () {
            this.delegate.dispose();
        };
        /**
         * 方法名改为 dispose
         * @method egret.MovieClip#release
         * @deprecated
         */
        p.release = function () {
            Log.trace("MovieClip#release方法即将废弃");
            this.dispose();
        };
        /**
         * @method egret.MovieClip#getCurrentFrameIndex
         * @deprecated
         * @returns {number}
         */
        p.getCurrentFrameIndex = function () {
            Log.trace("MovieClip#getCurrentFrameIndex方法即将废弃");
            return this.delegate["_currentFrameIndex"];
        };
        /**
         * 获取当前影片剪辑的帧频数
         * @method egret.MovieClip#getTotalFrame
         * @deprecated
         * @returns {number}
         */
        p.getTotalFrame = function () {
            Log.trace("MovieClip#getTotalFrame方法即将废弃");
            return this.delegate["_totalFrame"];
        };
        /**
         * @method egret.MovieClip#setInterval
         * @deprecated
         * @param value {number}
         */
        p.setInterval = function (value) {
            Log.trace("MovieClip#setInterval方法即将废弃,请使用MovieClip#frameRate代替");
            this.frameRate = 60 / value;
        };
        /**
         * @method egret.MovieClip#getIsPlaying
         * @deprecated
         * @returns {boolean}
         */
        p.getIsPlaying = function () {
            Log.trace("MovieClip#getIsPlaying方法即将废弃");
            return this.delegate["isPlaying"];
        };
        return MovieClip2;
    }(egret.DisplayObjectContainer));
    egret.MovieClip2 = MovieClip2;
    egret.registerClass(MovieClip2,'egret.MovieClip2');
    var DefaultMovieClipDelegate2 = (function () {
        function DefaultMovieClipDelegate2(data, texture) {
            this.data = data;
            this._totalFrame = 0;
            this._frameRate = 0;
            this._passTime = 0;
            this._currentFrameIndex = 0;
            this._isPlaying = false;
            this._frameData = data;
            this._spriteSheet = new egret.SpriteSheet(texture);
        }
        var d = __define,c=DefaultMovieClipDelegate2,p=c.prototype;
        p.setMovieClip = function (movieClip) {
            this.movieClip = movieClip;
            this.bitmap = new egret.Bitmap();
            this.movieClip.addChild(this.bitmap);
        };
        p.gotoAndPlay = function (frameName) {
            this.checkHasFrame(frameName);
            this._isPlaying = true;
            this._currentFrameIndex = 0;
            this._currentFrameName = frameName;
            this._totalFrame = this._frameData.frames[frameName].totalFrame;
            this._frameRate = this._frameData.frames[frameName].frameRate;
            this.playNextFrame();
            this._passTime = 0;
            egret.Ticker.getInstance().register(this.update, this);
        };
        p.gotoAndStop = function (frameName) {
            this.checkHasFrame(frameName);
            this.stop();
            this._passTime = 0;
            this._currentFrameIndex = 0;
            this._currentFrameName = frameName;
            this._totalFrame = this._frameData.frames[frameName].totalFrame;
            this.playNextFrame();
        };
        p.stop = function () {
            this._isPlaying = false;
            egret.Ticker.getInstance().unregister(this.update, this);
        };
        p.dispose = function () {
        };
        p.checkHasFrame = function (name) {
            if (this._frameData.frames[name] == undefined) {
                Log.trace("MovieClip没有对应的frame：", name);
            }
        };
        p.update = function (advancedTime) {
            console.log("frame:" + this._frameRate);
            var oneFrameTime = 1000 / (this._frameRate || this.movieClip.frameRate);
            var last = this._passTime % oneFrameTime;
            var num = Math.floor((last + advancedTime) / oneFrameTime);
            while (num >= 1) {
                if (num == 1) {
                    this.playNextFrame();
                }
                else {
                    this.playNextFrame(false);
                }
                num--;
            }
            this._passTime += advancedTime;
        };
        p.playNextFrame = function (needShow) {
            if (needShow === void 0) { needShow = true; }
            var frameData = this._frameData.frames[this._currentFrameName].childrenFrame[this._currentFrameIndex];
            if (needShow) {
                var texture = this.getTexture(frameData.res);
                var bitmap = this.bitmap;
                bitmap.x = frameData.x;
                bitmap.y = frameData.y;
                bitmap.texture = texture;
            }
            if (frameData.action != null) {
                this.movieClip.dispatchEventWith(frameData.action);
            }
            this._currentFrameIndex++;
            if (this._currentFrameIndex == this._totalFrame) {
                this._currentFrameIndex = 0;
            }
        };
        p.getTexture = function (name) {
            var resData = this._frameData.res[name];
            var texture = this._spriteSheet.getTexture(name);
            if (!texture) {
                texture = this._spriteSheet.createTexture(name, resData.x, resData.y, resData.w, resData.h);
            }
            return texture;
        };
        return DefaultMovieClipDelegate2;
    }());
    egret.DefaultMovieClipDelegate2 = DefaultMovieClipDelegate2;
    egret.registerClass(DefaultMovieClipDelegate2,'egret.DefaultMovieClipDelegate2',["egret.MovieClipDelegate2"]);
})(egret || (egret = {}));
//# sourceMappingURL=MovieClip2.js.map