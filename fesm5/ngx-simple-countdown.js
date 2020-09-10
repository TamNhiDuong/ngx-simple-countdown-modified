import { __decorate, __metadata } from 'tslib';
import { ElementRef, Input, Directive, NgModule } from '@angular/core';
import { interval, ReplaySubject } from 'rxjs';
import { takeUntil, filter, tap } from 'rxjs/operators';

var NgxSimpleCountdownDirective = /** @class */ (function () {
    function NgxSimpleCountdownDirective(elementRef) {
        this.elementRef = elementRef;
        this.language = 'en';
        this.reactive = true;
        this.endMessage = 'countdown finish';
        this.hideUnit = '';
        this.styles = 'font-size:20px;color:#FFF;background-color:#000;padding:10px 5px;font-weight:bold;min-width:40px;text-align:center;';
    }
    NgxSimpleCountdownDirective.prototype.ngOnInit = function () {
        this.getDateNow();
        this.setLanguage(this.language);
        this.initSimpleCountdown();
    };
    NgxSimpleCountdownDirective.prototype.ngOnDestroy = function () { };
    NgxSimpleCountdownDirective.prototype.initSimpleCountdown = function () {
        var _this = this;
        this.totalSecondes = this.dateTo - this.dateNow;
        this.countdownResult = this.updateSimpleCountdown(this.totalSecondes);
        this.createHTML();
        this.interval$ = interval(1000).pipe(takeUntil(this.componentDestroyed(this)), filter(function (_) { return _this.reactive && _this.totalSecondes > 0; }), tap(function (_) { return _this.totalSecondes--; }), tap(function (_) {
            return (_this.countdownResult = _this.updateSimpleCountdown(_this.totalSecondes));
        }), tap(function (_) { return _this.createHTML(); }));
        this.interval$.subscribe();
    };
    NgxSimpleCountdownDirective.prototype.createHTML = function () {
        var o = '';
        if (this.totalSecondes > 0) {
            o = '<div style="display:flex;">';
            if (this.isContent('d')) {
                if (this.countdownResult.day > 0) {
                    o += "<div style=\"" + this.styles + "\">\n          " + this.countdownResult.day + this.keywords.day + "\n          </div>";
                }
            }
            if (this.isContent('h')) {
                if (this.countdownResult.hours > 0 || this.countdownResult.day > 0) {
                    o += "<div style=\"" + this.styles + "\">\n          " + this.countdownResult.hours + this.keywords.hours + "\n        </div>";
                }
            }
            if (this.isContent('m')) {
                if ((this.countdownResult.minutes > 0 ||
                    this.countdownResult.hours > 0 ||
                    this.countdownResult.day > 0) &&
                    this.reactive) {
                    o += "<div style=\"" + this.styles + "\">\n          " + this.countdownResult.minutes + this.keywords.minutes + "\n        </div>";
                }
            }
            if (this.isContent('s')) {
                if ((this.countdownResult.seconds > 0 ||
                    this.countdownResult.minutes > 0 ||
                    this.countdownResult.hours > 0 ||
                    this.countdownResult.day > 0) &&
                    this.reactive) {
                    o += "<div style=\"" + this.styles + "\">\n          " + this.countdownResult.seconds + this.keywords.seconds + "\n        </div>";
                }
                o += '</div>';
            }
        }
        else {
            if (this.endMessage !== '') {
                o += "<div style=\"" + this.styles + "\">" + this.endMessage + "</div>";
            }
        }
        this.elementRef.nativeElement.innerHTML = o;
    };
    NgxSimpleCountdownDirective.prototype.isContent = function (unit) {
        return !this.hideUnit.includes(unit);
    };
    NgxSimpleCountdownDirective.prototype.updateSimpleCountdown = function (secondes) {
        var Seconds = Math.floor((secondes / 1) % 60);
        var Minutes = Math.floor((secondes / 1 / 60) % 60);
        var Hours = Math.floor((secondes / (1 * 60 * 60)) % 24);
        var Day = Math.floor(secondes / (1 * 60 * 60 * 24));
        return {
            day: Day,
            hours: Hours,
            minutes: Minutes,
            seconds: Seconds
        };
    };
    NgxSimpleCountdownDirective.prototype.getDateNow = function () {
        //this.dateNow = Math.floor(Date.now() / 1000);
        var formatCurrent = new Date().toLocaleString('en-US', { timeZone: 'Europe/Stockholm' });
        var current = new Date(formatCurrent);
        this.dateNow = Math.floor(current.getTime() / 1000);
    };
    NgxSimpleCountdownDirective.prototype.setLanguage = function (language) {
        if (language === 'fr') {
            this.keywords = {
                seconds: 's',
                minutes: 'm',
                hours: 'h',
                day: 'j'
            };
        }
        else if (language === 'de') {
            this.keywords = {
                seconds: 'z',
                minutes: 'm',
                hours: 's',
                day: 't'
            };
        }
        else if (language === 'es' || language === 'pt') {
            this.keywords = {
                seconds: 's',
                minutes: 'm',
                hours: 's',
                day: 'd'
            };
        }
        else if (language === 'cs') {
            this.keywords = {
                seconds: 's',
                minutes: 'm',
                hours: 'h',
                day: 'd'
            };
        }
        else if (language === 'pl') {
            this.keywords = {
                seconds: 's',
                minutes: 'm',
                hours: 'g',
                day: 'd'
            };
        }
        else {
            this.keywords = {
                seconds: 's',
                minutes: 'm',
                hours: 'h',
                day: 'd'
            };
        }
    };
    NgxSimpleCountdownDirective.prototype.componentDestroyed = function (component) {
        var oldNgOnDestroy = component.ngOnDestroy;
        var destroyed$ = new ReplaySubject(1);
        component.ngOnDestroy = function () {
            oldNgOnDestroy.apply(component);
            destroyed$.next(undefined);
            destroyed$.complete();
        };
        return destroyed$;
    };
    NgxSimpleCountdownDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], NgxSimpleCountdownDirective.prototype, "dateTo", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgxSimpleCountdownDirective.prototype, "language", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgxSimpleCountdownDirective.prototype, "reactive", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgxSimpleCountdownDirective.prototype, "endMessage", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgxSimpleCountdownDirective.prototype, "hideUnit", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NgxSimpleCountdownDirective.prototype, "styles", void 0);
    NgxSimpleCountdownDirective = __decorate([
        Directive({
            selector: '[simpleCountdown]'
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], NgxSimpleCountdownDirective);
    return NgxSimpleCountdownDirective;
}());

var NgxSimpleCountdownModule = /** @class */ (function () {
    function NgxSimpleCountdownModule() {
    }
    NgxSimpleCountdownModule = __decorate([
        NgModule({
            declarations: [NgxSimpleCountdownDirective],
            imports: [],
            exports: [NgxSimpleCountdownDirective]
        })
    ], NgxSimpleCountdownModule);
    return NgxSimpleCountdownModule;
}());

/*
 * Public API Surface of ngx-simple-countdown
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxSimpleCountdownDirective, NgxSimpleCountdownModule };
//# sourceMappingURL=ngx-simple-countdown.js.map
