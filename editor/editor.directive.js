var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output, forwardRef } from '@angular/core';
import FroalaEditor from 'ssr-froala-editor';
var FroalaEditorDirective = /** @class */ (function () {
    function FroalaEditorDirective(el, zone) {
        this.zone = zone;
        // editor options
        this._opts = {
            immediateAngularModelUpdate: false,
            angularIgnoreAttrs: null
        };
        this.SPECIAL_TAGS = ['img', 'button', 'input', 'a'];
        this.INNER_HTML_ATTR = 'innerHTML';
        this._hasSpecialTag = false;
        this._editorInitialized = false;
        this._oldModel = null;
        // Begin ControlValueAccesor methods.
        this.onChange = function (_) { };
        this.onTouched = function () { };
        // froalaModel directive as output: update model if editor contentChanged
        this.froalaModelChange = new EventEmitter();
        // froalaInit directive as output: send manual editor initialization
        this.froalaInit = new EventEmitter();
        var element = el.nativeElement;
        // check if the element is a special tag
        if (this.SPECIAL_TAGS.indexOf(element.tagName.toLowerCase()) != -1) {
            this._hasSpecialTag = true;
        }
        this._element = element;
        this.zone = zone;
    }
    FroalaEditorDirective_1 = FroalaEditorDirective;
    // Form model content changed.
    FroalaEditorDirective.prototype.writeValue = function (content) {
        this.updateEditor(content);
    };
    FroalaEditorDirective.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    FroalaEditorDirective.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    Object.defineProperty(FroalaEditorDirective.prototype, "froalaEditor", {
        // End ControlValueAccesor methods.
        // froalaEditor directive as input: store the editor options
        set: function (opts) {
            this._opts = opts || this._opts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FroalaEditorDirective.prototype, "froalaModel", {
        // froalaModel directive as input: store initial editor content
        set: function (content) {
            this.updateEditor(content);
        },
        enumerable: true,
        configurable: true
    });
    // Update editor with model contents.
    FroalaEditorDirective.prototype.updateEditor = function (content) {
        if (JSON.stringify(this._oldModel) == JSON.stringify(content)) {
            return;
        }
        if (!this._hasSpecialTag) {
            this._oldModel = content;
        }
        else {
            this._model = content;
        }
        if (this._editorInitialized) {
            if (!this._hasSpecialTag) {
                this._editor.html.set(content);
            }
            else {
                this.setContent();
            }
        }
        else {
            if (!this._hasSpecialTag) {
                this._element.innerHTML = content || '';
            }
            else {
                this.setContent();
            }
        }
    };
    // update model if editor contentChanged
    FroalaEditorDirective.prototype.updateModel = function () {
        var _this = this;
        this.zone.run(function () {
            var modelContent = null;
            if (_this._hasSpecialTag) {
                var attributeNodes = _this._element.attributes;
                var attrs = {};
                for (var i = 0; i < attributeNodes.length; i++) {
                    var attrName = attributeNodes[i].name;
                    if (_this._opts.angularIgnoreAttrs && _this._opts.angularIgnoreAttrs.indexOf(attrName) != -1) {
                        continue;
                    }
                    attrs[attrName] = attributeNodes[i].value;
                }
                if (_this._element.innerHTML) {
                    attrs[_this.INNER_HTML_ATTR] = _this._element.innerHTML;
                }
                modelContent = attrs;
            }
            else {
                var returnedHtml = _this._editor.html.get();
                if (typeof returnedHtml === 'string') {
                    modelContent = returnedHtml;
                }
            }
            if (_this._oldModel !== modelContent) {
                _this._oldModel = modelContent;
                // Update froalaModel.
                _this.froalaModelChange.emit(modelContent);
                // Update form model.
                _this.onChange(modelContent);
            }
        });
    };
    FroalaEditorDirective.prototype.registerEvent = function (eventName, callback) {
        if (!eventName || !callback) {
            return;
        }
        if (!this._opts.events) {
            this._opts.events = {};
        }
        this._opts.events[eventName] = callback;
    };
    FroalaEditorDirective.prototype.initListeners = function () {
        var self = this;
        // Check if we have events on the editor.
        if (this._editor.events) {
            // bind contentChange and keyup event to froalaModel
            this._editor.events.on('contentChanged', function () {
                setTimeout(function () {
                    self.updateModel();
                }, 0);
            });
            this._editor.events.on('mousedown', function () {
                setTimeout(function () {
                    self.onTouched();
                }, 0);
            });
            if (this._opts.immediateAngularModelUpdate) {
                this._editor.events.on('keyup', function () {
                    setTimeout(function () {
                        self.updateModel();
                    }, 0);
                });
            }
        }
        this._editorInitialized = true;
    };
    FroalaEditorDirective.prototype.createEditor = function () {
        var _this = this;
        if (this._editorInitialized) {
            return;
        }
        this.setContent(true);
        // init editor
        this.zone.runOutsideAngular(function () {
            // Add listeners on initialized event.
            if (!_this._opts.events)
                _this._opts.events = {};
            // Register initialized event.
            _this.registerEvent('initialized', _this._opts.events && _this._opts.events.initialized);
            var existingInitCallback = _this._opts.events.initialized;
            // Default initialized event.
            if (!_this._opts.events.initialized || !_this._opts.events.initialized.overridden) {
                _this._opts.events.initialized = function () {
                    _this.initListeners();
                    existingInitCallback && existingInitCallback.call(_this._editor, _this);
                };
                _this._opts.events.initialized.overridden = true;
            }
            // Initialize the Froala Editor.
            _this._editor = new FroalaEditor(_this._element, _this._opts);
        });
    };
    FroalaEditorDirective.prototype.setHtml = function () {
        this._editor.html.set(this._model || "");
        // This will reset the undo stack everytime the model changes externally. Can we fix this?
        this._editor.undo.reset();
        this._editor.undo.saveStep();
    };
    FroalaEditorDirective.prototype.setContent = function (firstTime) {
        if (firstTime === void 0) { firstTime = false; }
        var self = this;
        // Set initial content
        if (this._model || this._model == '') {
            this._oldModel = this._model;
            if (this._hasSpecialTag) {
                var tags = this._model;
                // add tags on element
                if (tags) {
                    for (var attr in tags) {
                        if (tags.hasOwnProperty(attr) && attr != this.INNER_HTML_ATTR) {
                            this._element.setAttribute(attr, tags[attr]);
                        }
                    }
                    if (tags.hasOwnProperty(this.INNER_HTML_ATTR)) {
                        this._element.innerHTML = tags[this.INNER_HTML_ATTR];
                    }
                }
            }
            else {
                if (firstTime) {
                    this.registerEvent('initialized', function () {
                        self.setHtml();
                    });
                }
                else {
                    self.setHtml();
                }
            }
        }
    };
    FroalaEditorDirective.prototype.destroyEditor = function () {
        if (this._editorInitialized) {
            this._editor.destroy();
            this._editorInitialized = false;
        }
    };
    FroalaEditorDirective.prototype.getEditor = function () {
        if (this._element) {
            return this._editor;
        }
        return null;
    };
    // send manual editor initialization
    FroalaEditorDirective.prototype.generateManualController = function () {
        var controls = {
            initialize: this.createEditor.bind(this),
            destroy: this.destroyEditor.bind(this),
            getEditor: this.getEditor.bind(this),
        };
        this.froalaInit.emit(controls);
    };
    // TODO not sure if ngOnInit is executed after @inputs
    FroalaEditorDirective.prototype.ngAfterViewInit = function () {
        // check if output froalaInit is present. Maybe observers is private and should not be used?? TODO how to better test that an output directive is present.
        if (!this.froalaInit.observers.length) {
            this.createEditor();
        }
        else {
            this.generateManualController();
        }
    };
    FroalaEditorDirective.prototype.ngOnDestroy = function () {
        this.destroyEditor();
    };
    var FroalaEditorDirective_1;
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], FroalaEditorDirective.prototype, "froalaEditor", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], FroalaEditorDirective.prototype, "froalaModel", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FroalaEditorDirective.prototype, "froalaModelChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], FroalaEditorDirective.prototype, "froalaInit", void 0);
    FroalaEditorDirective = FroalaEditorDirective_1 = __decorate([
        Directive({
            selector: '[froalaEditor]',
            exportAs: 'froalaEditor',
            providers: [{
                    provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(function () { return FroalaEditorDirective_1; }),
                    multi: true
                }]
        }),
        __metadata("design:paramtypes", [ElementRef, NgZone])
    ], FroalaEditorDirective);
    return FroalaEditorDirective;
}());
export { FroalaEditorDirective };
//# sourceMappingURL=editor.directive.js.map