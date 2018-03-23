import { Component, ElementRef, Input, OnInit, Injector } from '@angular/core';
import { ModalService } from './modal.service';
import { AuthService } from '../auth/auth.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {

  @Input()
  id: string;

  username: string = '';
  password: string = '';

  private element: JQuery;
  private modalService: ModalService;
  private el: ElementRef;
  private authService: AuthService;

  constructor(injector: Injector) {
    this.modalService = injector.get(ModalService);
    this.authService = injector.get(AuthService);
    this.el = injector.get(ElementRef);
    this.element = $(this.el.nativeElement);
  }

  ngOnInit(): void {
    let modal = this;

    if (!this.id) {
      console.log('modal must have an id');
      return;
    }

    this.element.appendTo('body');

    this.element.on('click', function(e: any) {
      var target = $(e.target);
      if (!target.closest('.modal-body').length) {
        modal.close();
      }
    });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.show();
    $('body').addClass('modal-open');
  }

  close(): void {
    this.element.hide();
    $('body').removeClass('modal-open');
  }

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(result => {
        if (result === true) {
          console.log('SUCCESS');
        } else {
          console.log('FAIL ', result);
        }
      });
  }
}

