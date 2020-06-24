import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPenasDisciplinariasSufridas } from 'app/shared/model/penas-disciplinarias-sufridas.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PenasDisciplinariasSufridasService } from './penas-disciplinarias-sufridas.service';
import { PenasDisciplinariasSufridasDeleteDialogComponent } from './penas-disciplinarias-sufridas-delete-dialog.component';

@Component({
  selector: 'jhi-penas-disciplinarias-sufridas',
  templateUrl: './penas-disciplinarias-sufridas.component.html',
})
export class PenasDisciplinariasSufridasComponent implements OnInit, OnDestroy {
  penasDisciplinariasSufridas?: IPenasDisciplinariasSufridas[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected penasDisciplinariasSufridasService: PenasDisciplinariasSufridasService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number, dontNavigate?: boolean): void {
    const pageToLoad: number = page || this.page || 1;

    this.penasDisciplinariasSufridasService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IPenasDisciplinariasSufridas[]>) => this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.registerChangeInPenasDisciplinariasSufridas();
  }

  protected handleNavigation(): void {
    combineLatest(this.activatedRoute.data, this.activatedRoute.queryParamMap, (data: Data, params: ParamMap) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get('sort') ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === 'asc';
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    }).subscribe();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPenasDisciplinariasSufridas): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPenasDisciplinariasSufridas(): void {
    this.eventSubscriber = this.eventManager.subscribe('penasDisciplinariasSufridasListModification', () => this.loadPage());
  }

  delete(penasDisciplinariasSufridas: IPenasDisciplinariasSufridas): void {
    const modalRef = this.modalService.open(PenasDisciplinariasSufridasDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.penasDisciplinariasSufridas = penasDisciplinariasSufridas;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IPenasDisciplinariasSufridas[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    if (navigate) {
      this.router.navigate(['/penas-disciplinarias-sufridas'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }
    this.penasDisciplinariasSufridas = data || [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
