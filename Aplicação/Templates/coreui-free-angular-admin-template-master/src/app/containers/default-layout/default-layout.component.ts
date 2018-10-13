import { StorageKeys } from './../../../shared/storage-keys';
import { Router } from '@angular/router';
import { Component, Input, Inject } from '@angular/core';
import { navItems } from './../../_nav';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor( @Inject(SESSION_STORAGE)
  public storage: StorageService,
    public router: Router) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  deslogar() {
    this.storage.remove(StorageKeys.userId)
    this.router.navigate(['login']);
  }
}
