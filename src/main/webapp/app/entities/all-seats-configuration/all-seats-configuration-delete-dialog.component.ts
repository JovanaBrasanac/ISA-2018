import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAllSeatsConfiguration } from 'app/shared/model/all-seats-configuration.model';
import { AllSeatsConfigurationService } from './all-seats-configuration.service';

@Component({
    selector: 'jhi-all-seats-configuration-delete-dialog',
    templateUrl: './all-seats-configuration-delete-dialog.component.html'
})
export class AllSeatsConfigurationDeleteDialogComponent {
    allSeatsConfiguration: IAllSeatsConfiguration;

    constructor(
        protected allSeatsConfigurationService: AllSeatsConfigurationService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.allSeatsConfigurationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'allSeatsConfigurationListModification',
                content: 'Deleted an allSeatsConfiguration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-all-seats-configuration-delete-popup',
    template: ''
})
export class AllSeatsConfigurationDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ allSeatsConfiguration }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AllSeatsConfigurationDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.allSeatsConfiguration = allSeatsConfiguration;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
