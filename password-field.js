
webix.protoUI({
    name: 'vux-text-field',
    $cssName: 'text',
    defaults: {
        type: 'text',
        inputHeight: 40,
        inputPadding: 0,
        labelPosition: 'top',
        labelHeight: 18,
        labelBottomOffset: 9
    },
    $init(config) {
        var _this = this;
        this.$view.className += ' vux_text_field vux_form_control';
        this.attachEvent('onAfterRender', function () {
            return _this._setSize();
        });
    },

    _setSize() {
        var _a = this.config,
            inputHeight = _a.inputHeight,
            labelHeight = _a.labelHeight,
            labelBottomOffset = _a.labelBottomOffset;
        this._label = this.$view.querySelector('label');
        this._input = this.$view.querySelector('input');
        if (this._label) {
            this._label.style.lineHeight = labelHeight + 'px';
            this._label.style.marginBottom = labelBottomOffset + 'px';
            this.define('height', inputHeight + labelHeight + labelBottomOffset);
        } else {
            this.define('height', inputHeight);
        }
        this.resize();
        this.callEvent('onReadyView');
    }
}, webix.ui.text);


webix.protoUI({
    name: 'vux-password-field',
    defaults: {
        iconBtnProvider: 'webix_icon',
        iconBtnShow: 'vuxicon-viewoff',
        iconBtnHide: 'vuxicon-view'
    },
    $init(config) {
        var _this = this;
        config.type = 'password';
        this.$view.className += ' vux_password_field';
        this.attachEvent('onAfterRender', function () {
            _this.attachEvent('onReadyView', function () {
                return _this._setButtonShowPassword();
            });
        });
    },
    _setButtonShowPassword() {
        if (!this._btnShowPassword) {
            this._btnShowPassword = this._createButtonShow();
        }
        this._input.parentElement.appendChild(this._btnShowPassword);
    },
    _createButtonShow() {
        var _a = this.config,
            iconBtnProvider = _a.iconBtnProvider,
            iconBtnHide = _a.iconBtnHide;
        var button = document.createElement('span');
        button.className = "vux_password_field_show_btn " + iconBtnProvider + " " + iconBtnHide;
        webix.event(button, 'click', this._tooglePassword.bind(this));
        return button;
    },
    _tooglePassword() {
        if (this._isShowedPassword) {
            this._hidePassword();
        } else {
            this._showPassword();
        }
    },
    _showPassword() {
        var _a = this.config,
            iconBtnShow = _a.iconBtnShow,
            iconBtnHide = _a.iconBtnHide;
        this._btnShowPassword.classList.remove(iconBtnHide);
        this._btnShowPassword.classList.add(iconBtnShow, 'selected');
        this._input.type = 'text';
        this._isShowedPassword = true;
    },
    _hidePassword() {
        var _a = this.config,
            iconBtnShow = _a.iconBtnShow,
            iconBtnHide = _a.iconBtnHide;
        this._btnShowPassword.classList.remove(iconBtnShow, 'selected');
        this._btnShowPassword.classList.add(iconBtnHide);
        this._input.type = 'password';
        this._isShowedPassword = false;
    }
}, webix.ui['vux-text-field']);
