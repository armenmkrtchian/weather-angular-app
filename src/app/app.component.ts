import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BooleanInput } from '@angular/cdk/coercion';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'weather-app';

  mdcBackdrop: BooleanInput = false;
  drawerMode: MatDrawerMode = 'push';

  readonly breakpoint$ = this.breakpointObserver.observe([
    '(max-width: 500px)',
  ]);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpoint$.subscribe(() => this.breakpointChanges());
  }

  breakpointChanges(): void {
    if (this.breakpointObserver.isMatched('(max-width: 500px)')) {
      this.drawerMode = 'over';
      this.mdcBackdrop = true;
    } else {
      this.drawerMode = 'push';
      this.mdcBackdrop = false;
    }
  }
}
