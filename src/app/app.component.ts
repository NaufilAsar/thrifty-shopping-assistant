import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { slideInAnimation } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation],
})
export class AppComponent {
  isDarkModeEnable = false;
  title = 'major-project';
  constructor(private contexts: ChildrenOutletContexts) {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }

  changeTheme() {
    this.isDarkModeEnable = !this.isDarkModeEnable;
    const bd = document.body;
    bd.classList.toggle('dark');
    if (!this.isDarkModeEnable)
      bd.className = 'bg-gradient-to-br from-[#7cccc6] to-[#97d9e7]';
    else bd.className = 'bg-gradient-to-br from-[#0f172a] to-[#1e293b]';
  }
}
