import { Component, OnInit, Injector, Input } from '@angular/core';
import { Globals } from '../globals';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [ ModalService ]
})
export class NavigationComponent implements OnInit {

  @Input()
  query: string;

  login: string = '';
  password: string = '';

  globals;
  private router: Router;
  private route: ActivatedRoute;
  private modalService: ModalService;
  constructor(injector: Injector) {
    this.globals = injector.get(Globals);
    this.route = injector.get(ActivatedRoute);
    this.router = injector.get(Router);
    this.modalService = injector.get(ModalService);
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

}
