import { Component, ElementRef, Input, OnInit, Injector } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  moduleId: module.id.toString(),
  selector: 'modal',
  template: '<ng-content></ng-content>'
})
export class ModalComponent implements OnInit {

  @Input()
  id: string;

  private element: JQuery;
  private modalService: ModalService;
  private el: ElementRef;

  constructor(injector: Injector) {
    this.modalService = injector.get(ModalService);
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
}
