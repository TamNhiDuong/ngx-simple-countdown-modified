import { __decorate, __metadata } from "tslib";
import { Directive, Input, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { interval, ReplaySubject } from 'rxjs';
import { tap, takeUntil, filter } from 'rxjs/operators';
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
export { NgxSimpleCountdownDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXNpbXBsZS1jb3VudGRvd24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXNpbXBsZS1jb3VudGRvd24vIiwic291cmNlcyI6WyJsaWIvbmd4LXNpbXBsZS1jb3VudGRvd24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVoRixPQUFPLEVBQUUsUUFBUSxFQUFjLGFBQWEsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUt4RCxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUEyQjtJQWV0QyxZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBYmpDLGFBQVEsR0FBRyxJQUFJLENBQUM7UUFDaEIsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixlQUFVLEdBQUcsa0JBQWtCLENBQUM7UUFDaEMsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLFdBQU0sR0FDYixxSEFBcUgsQ0FBQztJQVEzRSxDQUFDO0lBRTlDLFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVcsS0FBSSxDQUFDO0lBRVIsbUJBQW1CO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2hELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztR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SUFBSSxDQUFDLFFBQVEsR0FBRztnQkFDZCxPQUFPLEVBQUUsR0FBRztnQkFDWixPQUFPLEVBQUUsR0FBRztnQkFDWixLQUFLLEVBQUUsR0FBRztnQkFDVixHQUFHLEVBQUUsR0FBRzthQUNULENBQUM7U0FDSDtJQUNILENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxTQUFvQjtRQUM3QyxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQzdDLE1BQU0sVUFBVSxHQUFHLElBQUksYUFBYSxDQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzlDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsR0FBRyxFQUFFO1lBQzNCLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMzQixVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDeEIsQ0FBQyxDQUFDO1FBQ0YsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGLENBQUE7O1lBdktpQyxVQUFVOztBQWRqQztJQUFSLEtBQUssRUFBRTs7MkRBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7OzZEQUFpQjtBQUNoQjtJQUFSLEtBQUssRUFBRTs7NkRBQWlCO0FBQ2hCO0lBQVIsS0FBSyxFQUFFOzsrREFBaUM7QUFDaEM7SUFBUixLQUFLLEVBQUU7OzZEQUFlO0FBQ2Q7SUFBUixLQUFLLEVBQUU7OzJEQUNnSDtBQVA3RywyQkFBMkI7SUFIdkMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtLQUM5QixDQUFDO3FDQWdCZ0MsVUFBVTtHQWYvQiwyQkFBMkIsQ0FzTHZDO1NBdExZLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEVsZW1lbnRSZWYsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBmcm9tTW9kZWwgZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgaW50ZXJ2YWwsIE9ic2VydmFibGUsIFJlcGxheVN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgdGFrZVVudGlsLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tzaW1wbGVDb3VudGRvd25dJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hTaW1wbGVDb3VudGRvd25EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgpIGRhdGVUbzogbnVtYmVyO1xuICBASW5wdXQoKSBsYW5ndWFnZSA9ICdlbic7XG4gIEBJbnB1dCgpIHJlYWN0aXZlID0gdHJ1ZTtcbiAgQElucHV0KCkgZW5kTWVzc2FnZSA9ICdjb3VudGRvd24gZmluaXNoJztcbiAgQElucHV0KCkgaGlkZVVuaXQgPSAnJztcbiAgQElucHV0KCkgc3R5bGVzID1cbiAgICAnZm9udC1zaXplOjIwcHg7Y29sb3I6I0ZGRjtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7cGFkZGluZzoxMHB4IDVweDtmb250LXdlaWdodDpib2xkO21pbi13aWR0aDo0MHB4O3RleHQtYWxpZ246Y2VudGVyOyc7XG5cbiAgcHVibGljIGtleXdvcmRzOiBmcm9tTW9kZWwuQ291bnRkb3duS2V5d29yZHM7XG4gIHB1YmxpYyBjb3VudGRvd25SZXN1bHQ6IGZyb21Nb2RlbC5Db3VudGRvd25SZXN1bHQ7XG4gIHB1YmxpYyBkYXRlTm93OiBudW1iZXI7XG4gIHB1YmxpYyB0b3RhbFNlY29uZGVzOiBudW1iZXI7XG4gIHB1YmxpYyBpbnRlcnZhbCQ6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXREYXRlTm93KCk7XG4gICAgdGhpcy5zZXRMYW5ndWFnZSh0aGlzLmxhbmd1YWdlKTtcbiAgICB0aGlzLmluaXRTaW1wbGVDb3VudGRvd24oKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge31cblxuICBwcml2YXRlIGluaXRTaW1wbGVDb3VudGRvd24oKTogdm9pZCB7XG4gICAgdGhpcy50b3RhbFNlY29uZGVzID0gdGhpcy5kYXRlVG8gLSB0aGlzLmRhdGVOb3c7XG4gICAgdGhpcy5jb3VudGRvd25SZXN1bHQgPSB0aGlzLnVwZGF0ZVNpbXBsZUNvdW50ZG93bih0aGlzLnRvdGFsU2Vjb25kZXMpO1xuICAgIHRoaXMuY3JlYXRlSFRNTCgpO1xuXG4gICAgdGhpcy5pbnRlcnZhbCQgPSBpbnRlcnZhbCgxMDAwKS5waXBlKFxuICAgICAgdGFrZVVudGlsKHRoaXMuY29tcG9uZW50RGVzdHJveWVkKHRoaXMpKSxcbiAgICAgIGZpbHRlcihfID0+IHRoaXMucmVhY3RpdmUgJiYgdGhpcy50b3RhbFNlY29uZGVzID4gMCksXG4gICAgICB0YXAoXyA9PiB0aGlzLnRvdGFsU2Vjb25kZXMtLSksXG4gICAgICB0YXAoXG4gICAgICAgIF8gPT5cbiAgICAgICAgICAodGhpcy5jb3VudGRvd25SZXN1bHQgPSB0aGlzLnVwZGF0ZVNpbXBsZUNvdW50ZG93bihcbiAgICAgICAgICAgIHRoaXMudG90YWxTZWNvbmRlc1xuICAgICAgICAgICkpXG4gICAgICApLFxuICAgICAgdGFwKF8gPT4gdGhpcy5jcmVhdGVIVE1MKCkpXG4gICAgKTtcblxuICAgIHRoaXMuaW50ZXJ2YWwkLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVIVE1MKCk6IHZvaWQge1xuICAgIGxldCBvID0gJyc7XG5cbiAgICBpZiAodGhpcy50b3RhbFNlY29uZGVzID4gMCkge1xuICAgICAgbyA9ICc8ZGl2IHN0eWxlPVwiZGlzcGxheTpmbGV4O1wiPic7XG5cbiAgICAgIGlmICh0aGlzLmlzQ29udGVudCgnZCcpKSB7XG4gICAgICAgIGlmICh0aGlzLmNvdW50ZG93blJlc3VsdC5kYXkgPiAwKSB7XG4gICAgICAgICAgbyArPSBgPGRpdiBzdHlsZT1cIiR7dGhpcy5zdHlsZXN9XCI+XG4gICAgICAgICAgJHt0aGlzLmNvdW50ZG93blJlc3VsdC5kYXl9JHt0aGlzLmtleXdvcmRzLmRheX1cbiAgICAgICAgICA8L2Rpdj5gO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzQ29udGVudCgnaCcpKSB7XG4gICAgICAgIGlmICh0aGlzLmNvdW50ZG93blJlc3VsdC5ob3VycyA+IDAgfHwgdGhpcy5jb3VudGRvd25SZXN1bHQuZGF5ID4gMCkge1xuICAgICAgICAgIG8gKz0gYDxkaXYgc3R5bGU9XCIke3RoaXMuc3R5bGVzfVwiPlxuICAgICAgICAgICR7dGhpcy5jb3VudGRvd25SZXN1bHQuaG91cnN9JHt0aGlzLmtleXdvcmRzLmhvdXJzfVxuICAgICAgICA8L2Rpdj5gO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzQ29udGVudCgnbScpKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAodGhpcy5jb3VudGRvd25SZXN1bHQubWludXRlcyA+IDAgfHxcbiAgICAgICAgICAgIHRoaXMuY291bnRkb3duUmVzdWx0LmhvdXJzID4gMCB8fFxuICAgICAgICAgICAgdGhpcy5jb3VudGRvd25SZXN1bHQuZGF5ID4gMCkgJiZcbiAgICAgICAgICB0aGlzLnJlYWN0aXZlXG4gICAgICAgICkge1xuICAgICAgICAgIG8gKz0gYDxkaXYgc3R5bGU9XCIke3RoaXMuc3R5bGVzfVwiPlxuICAgICAgICAgICR7dGhpcy5jb3VudGRvd25SZXN1bHQubWludXRlc30ke3RoaXMua2V5d29yZHMubWludXRlc31cbiAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0NvbnRlbnQoJ3MnKSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHRoaXMuY291bnRkb3duUmVzdWx0LnNlY29uZHMgPiAwIHx8XG4gICAgICAgICAgICB0aGlzLmNvdW50ZG93blJlc3VsdC5taW51dGVzID4gMCB8fFxuICAgICAgICAgICAgdGhpcy5jb3VudGRvd25SZXN1bHQuaG91cnMgPiAwIHx8XG4gICAgICAgICAgICB0aGlzLmNvdW50ZG93blJlc3VsdC5kYXkgPiAwKSAmJlxuICAgICAgICAgIHRoaXMucmVhY3RpdmVcbiAgICAgICAgKSB7XG4gICAgICAgICAgbyArPSBgPGRpdiBzdHlsZT1cIiR7dGhpcy5zdHlsZXN9XCI+XG4gICAgICAgICAgJHt0aGlzLmNvdW50ZG93blJlc3VsdC5zZWNvbmRzfSR7dGhpcy5rZXl3b3Jkcy5zZWNvbmRzfVxuICAgICAgICA8L2Rpdj5gO1xuICAgICAgICB9XG4gICAgICAgIG8gKz0gJzwvZGl2Pic7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmVuZE1lc3NhZ2UgIT09ICcnKSB7XG4gICAgICAgIG8gKz0gYDxkaXYgc3R5bGU9XCIke3RoaXMuc3R5bGVzfVwiPiR7dGhpcy5lbmRNZXNzYWdlfTwvZGl2PmA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuaW5uZXJIVE1MID0gbztcbiAgfVxuXG4gIHByaXZhdGUgaXNDb250ZW50KHVuaXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5oaWRlVW5pdC5pbmNsdWRlcyh1bml0KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlU2ltcGxlQ291bnRkb3duKHNlY29uZGVzOiBudW1iZXIpOiBmcm9tTW9kZWwuQ291bnRkb3duUmVzdWx0IHtcbiAgICBjb25zdCBTZWNvbmRzID0gTWF0aC5mbG9vcigoc2Vjb25kZXMgLyAxKSAlIDYwKTtcbiAgICBjb25zdCBNaW51dGVzID0gTWF0aC5mbG9vcigoc2Vjb25kZXMgLyAxIC8gNjApICUgNjApO1xuICAgIGNvbnN0IEhvdXJzID0gTWF0aC5mbG9vcigoc2Vjb25kZXMgLyAoMSAqIDYwICogNjApKSAlIDI0KTtcbiAgICBjb25zdCBEYXkgPSBNYXRoLmZsb29yKHNlY29uZGVzIC8gKDEgKiA2MCAqIDYwICogMjQpKTtcblxuICAgIHJldHVybiB7XG4gICAgICBkYXk6IERheSxcbiAgICAgIGhvdXJzOiBIb3VycyxcbiAgICAgIG1pbnV0ZXM6IE1pbnV0ZXMsXG4gICAgICBzZWNvbmRzOiBTZWNvbmRzXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0ZU5vdygpOiB2b2lkIHtcbiAgICB0aGlzLmRhdGVOb3cgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0TGFuZ3VhZ2UobGFuZ3VhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmIChsYW5ndWFnZSA9PT0gJ2ZyJykge1xuICAgICAgdGhpcy5rZXl3b3JkcyA9IHtcbiAgICAgICAgc2Vjb25kczogJ3MnLFxuICAgICAgICBtaW51dGVzOiAnbScsXG4gICAgICAgIGhvdXJzOiAnaCcsXG4gICAgICAgIGRheTogJ2onXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAobGFuZ3VhZ2UgPT09ICdkZScpIHtcbiAgICAgIHRoaXMua2V5d29yZHMgPSB7XG4gICAgICAgIHNlY29uZHM6ICd6JyxcbiAgICAgICAgbWludXRlczogJ20nLFxuICAgICAgICBob3VyczogJ3MnLFxuICAgICAgICBkYXk6ICd0J1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGxhbmd1YWdlID09PSAnZXMnIHx8IGxhbmd1YWdlID09PSAncHQnKSB7XG4gICAgICB0aGlzLmtleXdvcmRzID0ge1xuICAgICAgICBzZWNvbmRzOiAncycsXG4gICAgICAgIG1pbnV0ZXM6ICdtJyxcbiAgICAgICAgaG91cnM6ICdzJyxcbiAgICAgICAgZGF5OiAnZCdcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChsYW5ndWFnZSA9PT0gJ2NzJykge1xuICAgICAgdGhpcy5rZXl3b3JkcyA9IHtcbiAgICAgICAgc2Vjb25kczogJ3MnLFxuICAgICAgICBtaW51dGVzOiAnbScsXG4gICAgICAgIGhvdXJzOiAnaCcsXG4gICAgICAgIGRheTogJ2QnXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAobGFuZ3VhZ2UgPT09ICdwbCcpIHtcbiAgICAgIHRoaXMua2V5d29yZHMgPSB7XG4gICAgICAgIHNlY29uZHM6ICdzJyxcbiAgICAgICAgbWludXRlczogJ20nLFxuICAgICAgICBob3VyczogJ2cnLFxuICAgICAgICBkYXk6ICdkJ1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5rZXl3b3JkcyA9IHtcbiAgICAgICAgc2Vjb25kczogJ3MnLFxuICAgICAgICBtaW51dGVzOiAnbScsXG4gICAgICAgIGhvdXJzOiAnaCcsXG4gICAgICAgIGRheTogJ2QnXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29tcG9uZW50RGVzdHJveWVkKGNvbXBvbmVudDogT25EZXN0cm95KSB7XG4gICAgY29uc3Qgb2xkTmdPbkRlc3Ryb3kgPSBjb21wb25lbnQubmdPbkRlc3Ryb3k7XG4gICAgY29uc3QgZGVzdHJveWVkJCA9IG5ldyBSZXBsYXlTdWJqZWN0PHZvaWQ+KDEpO1xuICAgIGNvbXBvbmVudC5uZ09uRGVzdHJveSA9ICgpID0+IHtcbiAgICAgIG9sZE5nT25EZXN0cm95LmFwcGx5KGNvbXBvbmVudCk7XG4gICAgICBkZXN0cm95ZWQkLm5leHQodW5kZWZpbmVkKTtcbiAgICAgIGRlc3Ryb3llZCQuY29tcGxldGUoKTtcbiAgICB9O1xuICAgIHJldHVybiBkZXN0cm95ZWQkO1xuICB9XG59XG4iXX0=