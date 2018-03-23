import { Component, OnInit, Injector, Input } from '@angular/core';
import { Globals } from '../globals';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../modal/modal.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [ ModalService ]
})
export class NavigationComponent implements OnInit {

  @Input()
  query: string;

  globals;
  private router: Router;
  private route: ActivatedRoute;
  private modalService: ModalService;
  private authService: AuthService;
  constructor(injector: Injector) {
    this.globals = injector.get(Globals);
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.modalService = injector.get(ModalService);
    this.authService = injector.get(AuthService);
  }

  ngOnInit() {
  }

  changeMode(value: boolean) {
    this.globals.setMode(value);
  }

  search() {
    this.router.navigate(['/search'], {queryParams: {query: this.query}});
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  logout() {
    this.authService.logout();
  }

}
