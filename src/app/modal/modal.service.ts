import _ from 'lodash';

export class ModalService {
  private modals: any[] = [];

  add(modal: any) {
    this.modals.push(modal);
  }

  remove(id: string) {
    let modalToRemove = _.find(this.modals, {id: id});
    this.modals = _.without(this.modals, modalToRemove);
  }

  open(id: string) {
    let modal: any = _.find(this.modals, {id: id});
    modal.open();
  }

  close(id: string) {
    let modal: any = _.find(this.modals, {id: id});
    modal.close();
  }

}

