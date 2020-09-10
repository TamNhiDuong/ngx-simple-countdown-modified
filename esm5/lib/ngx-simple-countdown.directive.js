import { __decorate, __metadata } from "tslib";
import { Directive, Input, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { interval, ReplaySubject } from 'rxjs';
import { tap, takeUntil, filter } from 'rxjs/operators';
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
export { NgxSimpleCountdownDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNpbXBsZS1jb3VudGRvd24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNpbXBsZS1jb3VudGRvd24vIiwic291cmNlcyI6WyJsaWIvbmd4LXNpbXBsZS1jb3VudGRvd24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRixPQUFPLEVBQUUsUUFBUSxFQUFjLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUt4RDtJQWVFLHFDQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBYmpDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixlQUFVLEdBQUcsa0JBQWtCLENBQUM7UUFDaEMsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLFdBQU0sR0FDYixxSEFBcUgsQ0FBQztJQVEzRSxDQUFDO0lBRTlDLDhDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGlEQUFXLEdBQVgsY0FBZSxDQUFDO0lBRVIseURBQW1CLEdBQTNCO1FBQUEsaUJBbUJDO1FBbEJDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2hELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztR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bGVtZW50UmVmLCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgZnJvbU1vZGVsIGZyb20gJy4vbW9kZWxzJztcbmltcG9ydCB7IGludGVydmFsLCBPYnNlcnZhYmxlLCBSZXBsYXlTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIHRha2VVbnRpbCwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc2ltcGxlQ291bnRkb3duXSdcbn0pXG5leHBvcnQgY2xhc3MgTmd4U2ltcGxlQ291bnRkb3duRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBkYXRlVG86IG51bWJlcjtcbiAgQElucHV0KCkgbGFuZ3VhZ2UgPSAnZW4nO1xuICBASW5wdXQoKSByZWFjdGl2ZSA9IHRydWU7XG4gIEBJbnB1dCgpIGVuZE1lc3NhZ2UgPSAnY291bnRkb3duIGZpbmlzaCc7XG4gIEBJbnB1dCgpIGhpZGVVbml0ID0gJyc7XG4gIEBJbnB1dCgpIHN0eWxlcyA9XG4gICAgJ2ZvbnQtc2l6ZToyMHB4O2NvbG9yOiNGRkY7YmFja2dyb3VuZC1jb2xvcjojMDAwO3BhZGRpbmc6MTBweCA1cHg7Zm9udC13ZWlnaHQ6Ym9sZDttaW4td2lkdGg6NDBweDt0ZXh0LWFsaWduOmNlbnRlcjsnO1xuXG4gIHB1YmxpYyBrZXl3b3JkczogZnJvbU1vZGVsLkNvdW50ZG93bktleXdvcmRzO1xuICBwdWJsaWMgY291bnRkb3duUmVzdWx0OiBmcm9tTW9kZWwuQ291bnRkb3duUmVzdWx0O1xuICBwdWJsaWMgZGF0ZU5vdzogbnVtYmVyO1xuICBwdWJsaWMgdG90YWxTZWNvbmRlczogbnVtYmVyO1xuICBwdWJsaWMgaW50ZXJ2YWwkOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ2V0RGF0ZU5vdygpO1xuICAgIHRoaXMuc2V0TGFuZ3VhZ2UodGhpcy5sYW5ndWFnZSk7XG4gICAgdGhpcy5pbml0U2ltcGxlQ291bnRkb3duKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHt9XG5cbiAgcHJpdmF0ZSBpbml0U2ltcGxlQ291bnRkb3duKCk6IHZvaWQge1xuICAgIHRoaXMudG90YWxTZWNvbmRlcyA9IHRoaXMuZGF0ZVRvIC0gdGhpcy5kYXRlTm93O1xuICAgIHRoaXMuY291bnRkb3duUmVzdWx0ID0gdGhpcy51cGRhdGVTaW1wbGVDb3VudGRvd24odGhpcy50b3RhbFNlY29uZGVzKTtcbiAgICB0aGlzLmNyZWF0ZUhUTUwoKTtcblxuICAgIHRoaXMuaW50ZXJ2YWwkID0gaW50ZXJ2YWwoMTAwMCkucGlwZShcbiAgICAgIHRha2VVbnRpbCh0aGlzLmNvbXBvbmVudERlc3Ryb3llZCh0aGlzKSksXG4gICAgICBmaWx0ZXIoXyA9PiB0aGlzLnJlYWN0aXZlICYmIHRoaXMudG90YWxTZWNvbmRlcyA+IDApLFxuICAgICAgdGFwKF8gPT4gdGhpcy50b3RhbFNlY29uZGVzLS0pLFxuICAgICAgdGFwKFxuICAgICAgICBfID0+XG4gICAgICAgICAgKHRoaXMuY291bnRkb3duUmVzdWx0ID0gdGhpcy51cGRhdGVTaW1wbGVDb3VudGRvd24oXG4gICAgICAgICAgICB0aGlzLnRvdGFsU2Vjb25kZXNcbiAgICAgICAgICApKVxuICAgICAgKSxcbiAgICAgIHRhcChfID0+IHRoaXMuY3JlYXRlSFRNTCgpKVxuICAgICk7XG5cbiAgICB0aGlzLmludGVydmFsJC5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlSFRNTCgpOiB2b2lkIHtcbiAgICBsZXQgbyA9ICcnO1xuXG4gICAgaWYgKHRoaXMudG90YWxTZWNvbmRlcyA+IDApIHtcbiAgICAgIG8gPSAnPGRpdiBzdHlsZT1cImRpc3BsYXk6ZmxleDtcIj4nO1xuXG4gICAgICBpZiAodGhpcy5pc0NvbnRlbnQoJ2QnKSkge1xuICAgICAgICBpZiAodGhpcy5jb3VudGRvd25SZXN1bHQuZGF5ID4gMCkge1xuICAgICAgICAgIG8gKz0gYDxkaXYgc3R5bGU9XCIke3RoaXMuc3R5bGVzfVwiPlxuICAgICAgICAgICR7dGhpcy5jb3VudGRvd25SZXN1bHQuZGF5fSR7dGhpcy5rZXl3b3Jkcy5kYXl9XG4gICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0NvbnRlbnQoJ2gnKSkge1xuICAgICAgICBpZiAodGhpcy5jb3VudGRvd25SZXN1bHQuaG91cnMgPiAwIHx8IHRoaXMuY291bnRkb3duUmVzdWx0LmRheSA+IDApIHtcbiAgICAgICAgICBvICs9IGA8ZGl2IHN0eWxlPVwiJHt0aGlzLnN0eWxlc31cIj5cbiAgICAgICAgICAke3RoaXMuY291bnRkb3duUmVzdWx0LmhvdXJzfSR7dGhpcy5rZXl3b3Jkcy5ob3Vyc31cbiAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0NvbnRlbnQoJ20nKSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHRoaXMuY291bnRkb3duUmVzdWx0Lm1pbnV0ZXMgPiAwIHx8XG4gICAgICAgICAgICB0aGlzLmNvdW50ZG93blJlc3VsdC5ob3VycyA+IDAgfHxcbiAgICAgICAgICAgIHRoaXMuY291bnRkb3duUmVzdWx0LmRheSA+IDApICYmXG4gICAgICAgICAgdGhpcy5yZWFjdGl2ZVxuICAgICAgICApIHtcbiAgICAgICAgICBvICs9IGA8ZGl2IHN0eWxlPVwiJHt0aGlzLnN0eWxlc31cIj5cbiAgICAgICAgICAke3RoaXMuY291bnRkb3duUmVzdWx0Lm1pbnV0ZXN9JHt0aGlzLmtleXdvcmRzLm1pbnV0ZXN9XG4gICAgICAgIDwvZGl2PmA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuaXNDb250ZW50KCdzJykpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICh0aGlzLmNvdW50ZG93blJlc3VsdC5zZWNvbmRzID4gMCB8fFxuICAgICAgICAgICAgdGhpcy5jb3VudGRvd25SZXN1bHQubWludXRlcyA+IDAgfHxcbiAgICAgICAgICAgIHRoaXMuY291bnRkb3duUmVzdWx0LmhvdXJzID4gMCB8fFxuICAgICAgICAgICAgdGhpcy5jb3VudGRvd25SZXN1bHQuZGF5ID4gMCkgJiZcbiAgICAgICAgICB0aGlzLnJlYWN0aXZlXG4gICAgICAgICkge1xuICAgICAgICAgIG8gKz0gYDxkaXYgc3R5bGU9XCIke3RoaXMuc3R5bGVzfVwiPlxuICAgICAgICAgICR7dGhpcy5jb3VudGRvd25SZXN1bHQuc2Vjb25kc30ke3RoaXMua2V5d29yZHMuc2Vjb25kc31cbiAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgICAgICBvICs9ICc8L2Rpdj4nO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5lbmRNZXNzYWdlICE9PSAnJykge1xuICAgICAgICBvICs9IGA8ZGl2IHN0eWxlPVwiJHt0aGlzLnN0eWxlc31cIj4ke3RoaXMuZW5kTWVzc2FnZX08L2Rpdj5gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmlubmVySFRNTCA9IG87XG4gIH1cblxuICBwcml2YXRlIGlzQ29udGVudCh1bml0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaGlkZVVuaXQuaW5jbHVkZXModW5pdCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVNpbXBsZUNvdW50ZG93bihzZWNvbmRlczogbnVtYmVyKTogZnJvbU1vZGVsLkNvdW50ZG93blJlc3VsdCB7XG4gICAgY29uc3QgU2Vjb25kcyA9IE1hdGguZmxvb3IoKHNlY29uZGVzIC8gMSkgJSA2MCk7XG4gICAgY29uc3QgTWludXRlcyA9IE1hdGguZmxvb3IoKHNlY29uZGVzIC8gMSAvIDYwKSAlIDYwKTtcbiAgICBjb25zdCBIb3VycyA9IE1hdGguZmxvb3IoKHNlY29uZGVzIC8gKDEgKiA2MCAqIDYwKSkgJSAyNCk7XG4gICAgY29uc3QgRGF5ID0gTWF0aC5mbG9vcihzZWNvbmRlcyAvICgxICogNjAgKiA2MCAqIDI0KSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF5OiBEYXksXG4gICAgICBob3VyczogSG91cnMsXG4gICAgICBtaW51dGVzOiBNaW51dGVzLFxuICAgICAgc2Vjb25kczogU2Vjb25kc1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldERhdGVOb3coKTogdm9pZCB7XG4gICAgdGhpcy5kYXRlTm93ID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCk7XG4gIH1cblxuICBwcml2YXRlIHNldExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAobGFuZ3VhZ2UgPT09ICdmcicpIHtcbiAgICAgIHRoaXMua2V5d29yZHMgPSB7XG4gICAgICAgIHNlY29uZHM6ICdzJyxcbiAgICAgICAgbWludXRlczogJ20nLFxuICAgICAgICBob3VyczogJ2gnLFxuICAgICAgICBkYXk6ICdqJ1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGxhbmd1YWdlID09PSAnZGUnKSB7XG4gICAgICB0aGlzLmtleXdvcmRzID0ge1xuICAgICAgICBzZWNvbmRzOiAneicsXG4gICAgICAgIG1pbnV0ZXM6ICdtJyxcbiAgICAgICAgaG91cnM6ICdzJyxcbiAgICAgICAgZGF5OiAndCdcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChsYW5ndWFnZSA9PT0gJ2VzJyB8fCBsYW5ndWFnZSA9PT0gJ3B0Jykge1xuICAgICAgdGhpcy5rZXl3b3JkcyA9IHtcbiAgICAgICAgc2Vjb25kczogJ3MnLFxuICAgICAgICBtaW51dGVzOiAnbScsXG4gICAgICAgIGhvdXJzOiAncycsXG4gICAgICAgIGRheTogJ2QnXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAobGFuZ3VhZ2UgPT09ICdjcycpIHtcbiAgICAgIHRoaXMua2V5d29yZHMgPSB7XG4gICAgICAgIHNlY29uZHM6ICdzJyxcbiAgICAgICAgbWludXRlczogJ20nLFxuICAgICAgICBob3VyczogJ2gnLFxuICAgICAgICBkYXk6ICdkJ1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGxhbmd1YWdlID09PSAncGwnKSB7XG4gICAgICB0aGlzLmtleXdvcmRzID0ge1xuICAgICAgICBzZWNvbmRzOiAncycsXG4gICAgICAgIG1pbnV0ZXM6ICdtJyxcbiAgICAgICAgaG91cnM6ICdnJyxcbiAgICAgICAgZGF5OiAnZCdcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMua2V5d29yZHMgPSB7XG4gICAgICAgIHNlY29uZHM6ICdzJyxcbiAgICAgICAgbWludXRlczogJ20nLFxuICAgICAgICBob3VyczogJ2gnLFxuICAgICAgICBkYXk6ICdkJ1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvbXBvbmVudERlc3Ryb3llZChjb21wb25lbnQ6IE9uRGVzdHJveSkge1xuICAgIGNvbnN0IG9sZE5nT25EZXN0cm95ID0gY29tcG9uZW50Lm5nT25EZXN0cm95O1xuICAgIGNvbnN0IGRlc3Ryb3llZCQgPSBuZXcgUmVwbGF5U3ViamVjdDx2b2lkPigxKTtcbiAgICBjb21wb25lbnQubmdPbkRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgICBvbGROZ09uRGVzdHJveS5hcHBseShjb21wb25lbnQpO1xuICAgICAgZGVzdHJveWVkJC5uZXh0KHVuZGVmaW5lZCk7XG4gICAgICBkZXN0cm95ZWQkLmNvbXBsZXRlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gZGVzdHJveWVkJDtcbiAgfVxufVxuIl19