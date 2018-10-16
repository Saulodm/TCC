import { UsuarioService } from './../../services/usuario.service';
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
  public nav = [];
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor( @Inject(SESSION_STORAGE)
  public storage: StorageService,
    public router: Router,
    public userService: UsuarioService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
    
    var user = userService.getUsuario(storage.get(StorageKeys.userId))[0];
    navItems.forEach(el => {
      if(user.perfil == el["perfil"]){
        this.nav.push(el);
      }
    });
  }

  deslogar() {
    this.storage.remove(StorageKeys.userId)
    this.router.navigate(['login']);
  }
}
