import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>;

  beforeEach(async () => {
    const breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', [
      'observe',
      'isMatched',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
      ],
      declarations: [AppComponent],
      providers: [
        { provide: BreakpointObserver, useValue: breakpointObserverSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    breakpointObserver = TestBed.inject(
      BreakpointObserver
    ) as jasmine.SpyObj<BreakpointObserver>;

    const breakpointState: BreakpointState = {
      matches: false,
      breakpoints: {},
    };
    breakpointObserver.observe.and.returnValue(of(breakpointState));
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct title', () => {
    expect(component.title).toBe('weather-app');
  });

  it('should set drawer mode and backdrop based on breakpoint changes', () => {
    breakpointObserver.isMatched.and.returnValue(true);
    component.breakpointChanges();
    expect(component.drawerMode).toBe('over');
    expect(component.mdcBackdrop).toBe(true);

    breakpointObserver.isMatched.and.returnValue(false);
    component.breakpointChanges();
    expect(component.drawerMode).toBe('push');
    expect(component.mdcBackdrop).toBe(false);
  });

  it('should call breakpointChanges on breakpoint observer subscription', () => {
    spyOn(component, 'breakpointChanges');
    component.breakpoint$.subscribe();
    expect(component.breakpointChanges).toHaveBeenCalled();
  });
});
