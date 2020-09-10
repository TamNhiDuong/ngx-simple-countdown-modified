import { __decorate, __metadata } from 'tslib';
import { ElementRef, Input, Directive, NgModule } from '@angular/core';
import { interval, ReplaySubject } from 'rxjs';
import { takeUntil, filter, tap } from 'rxjs/operators';

let NgxSimpleCountdownDirective = class NgxSimpleCountdownDirective {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.language = 'en';
        this.reactive = true;
        this.endMessage = 'countdown finish';
        this.hideUnit = '';
        this.styles = 'font-size:20px;color:#FFF;background-color:#000;padding:10px 5px;font-weight:bold;min-width:40px;text-align:center;';
    }
    ngOnInit() {
        this.getDateNow();
        this.setLanguage(this.language);
        this.initSimpleCountdown();
    }
    ngOnDestroy() { }
    initSimpleCountdown() {
        this.totalSecondes = this.dateTo - this.dateNow;
        this.countdownResult = this.updateSimpleCountdown(this.totalSecondes);
        this.createHTML();
        this.interval$ = interval(1000).pipe(takeUntil(this.componentDestroyed(this)), filter(_ => this.reactive && this.totalSecondes > 0), tap(_ => this.totalSecondes--), tap(_ => (this.countdownResult = this.updateSimpleCountdown(this.totalSecondes))), tap(_ => this.createHTML()));
        this.interval$.subscribe();
    }
    createHTML() {
        let o = '';
        if (this.totalSecondes > 0) {
            o = '<div style="display:flex;">';
            if (this.isContent('d')) {
                if (this.countdownResult.day > 0) {
                    o += `<div style="${this.styles}">
          ${this.countdownResult.day}${this.keywords.day}
          </div>`;
                }
            }
            if (this.isContent('h')) {
                if (this.countdownResult.hours > 0 || this.countdownResult.day > 0) {
                    o += `<div style="${this.styles}">
          ${this.countdownResult.hours}${this.keywords.hours}
        </div>`;
                }
            }
            if (this.isContent('m')) {
                if ((this.countdownResult.minutes > 0 ||
                    this.countdownResult.hours > 0 ||
                    this.countdownResult.day > 0) &&
                    this.reactive) {
                    o += `<div style="${this.styles}">
          ${this.countdownResult.minutes}${this.keywords.minutes}
        </div>`;
                }
            }
            if (this.isContent('s')) {
                if ((this.countdownResult.seconds > 0 ||
                    this.countdownResult.minutes > 0 ||
                    this.countdownResult.hours > 0 ||
                    this.countdownResult.day > 0) &&
                    this.reactive) {
                    o += `<div style="${this.styles}">
          ${this.countdownResult.seconds}${this.keywords.seconds}
        </div>`;
                }
                o += '</div>';
            }
        }
        else {
            if (this.endMessage !== '') {
                o += `<div style="${this.styles}">${this.endMessage}</div>`;
            }
        }
        this.elementRef.nativeElement.innerHTML = o;
    }
    isContent(unit) {
        return !this.hideUnit.includes(unit);
    }
    updateSimpleCountdown(secondes) {
        const Seconds = Math.floor((secondes / 1) % 60);
        const Minutes = Math.floor((secondes / 1 / 60) % 60);
        const Hours = Math.floor((secondes / (1 * 60 * 60)) % 24);
        const Day = Math.floor(secondes / (1 * 60 * 60 * 24));
        return {
            day: Day,
            hours: Hours,
            minutes: Minutes,
            seconds: Seconds
        };
    }
    getDateNow() {
        //this.dateNow = Math.floor(Date.now() / 1000);
        var formatCurrent = new Date().toLocaleString('en-US', { timeZone: 'Europe/Stockholm' });
        var current = new Date(formatCurrent);
        this.dateNow = Math.floor(current.getTime() / 1000);
    }
    setLanguage(language) {
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
    }
    componentDestroyed(component) {
        const oldNgOnDestroy = component.ngOnDestroy;
        const destroyed$ = new ReplaySubject(1);
        component.ngOnDestroy = () => {
            oldNgOnDestroy.apply(component);
            destroyed$.next(undefined);
            destroyed$.complete();
        };
        return destroyed$;
    }
};
NgxSimpleCountdownDirective.ctorParameters = () => [
    { type: ElementRef }
];
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

let NgxSimpleCountdownModule = class NgxSimpleCountdownModule {
};
NgxSimpleCountdownModule = __decorate([
    NgModule({
        declarations: [NgxSimpleCountdownDirective],
        imports: [],
        exports: [NgxSimpleCountdownDirective]
    })
], NgxSimpleCountdownModule);

/*
 * Public API Surface of ngx-simple-countdown
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxSimpleCountdownDirective, NgxSimpleCountdownModule };
//# sourceMappingURL=ngx-simple-countdown.js.map
