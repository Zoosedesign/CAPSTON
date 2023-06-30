import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isHomePage: boolean = false;
  plantsPage!: string

  constructor(private router: Router) {
    //verifico se sono in homepage
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = (event.url === '/' || event.url === '/#header');
      }
    });

    this.setPage();
  }

  //riparto dall'ultima pagina ricercata nel catalogo piante
  setPage(): void {
    const actualPage: string | null = localStorage.getItem('actual_page');
    this.plantsPage = actualPage ? actualPage : '1';
    console.log('set page avvenuto', this.plantsPage, localStorage.getItem('actual_page'))
  }
}
