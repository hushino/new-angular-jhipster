import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { JhiEventManager, JhiParseLinks, JhiDataUtils } from 'ng-jhipster';

import { IPersona } from 'app/shared/model/persona.model';
import { AccountService } from 'app/core/auth/account.service';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PersonaService } from './persona.service';

@Component({
  selector: 'jhi-persona',
  templateUrl: './persona.component.html'
})
export class PersonaComponent implements OnInit, OnDestroy {
  currentAccount: any;
  personas: IPersona[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;
  private userIdSubject = new Subject<string>();
  readonly blogPosts$ = this.userIdSubject.pipe(
    debounceTime(100),
    distinctUntilChanged(),
    switchMap(userId => this.personaService.fetchPosts(userId))
  );
  constructor(
    protected personaService: PersonaService,
    protected parseLinks: JhiParseLinks,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected dataUtils: JhiDataUtils,
    protected router: Router,
    protected eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.reverse = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
    });
  }
  searchPosts(userId: string) {
    if (userId.length > 3) {
      this.userIdSubject.next(userId);
    } else {
      //null
      this.userIdSubject.next('09080000');
    }
    //setTimeout(() => {
    // this.blogPosts$ = null
    // }, 120000);
  }

  loadAll() {
    this.personaService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IPersona[]>) => this.paginatePersonas(res.body, res.headers));
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/persona'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.router.navigate([
      '/persona',
      {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    ]);
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPersonas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPersona) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInPersonas() {
    this.eventSubscriber = this.eventManager.subscribe('personaListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginatePersonas(data: IPersona[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.personas = data;
  }
}
