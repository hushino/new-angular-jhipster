import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Rrhh2TestModule } from '../../../test.module';
import { EmbargosDetailComponent } from 'app/entities/embargos/embargos-detail.component';
import { Embargos } from 'app/shared/model/embargos.model';

describe('Component Tests', () => {
  describe('Embargos Management Detail Component', () => {
    let comp: EmbargosDetailComponent;
    let fixture: ComponentFixture<EmbargosDetailComponent>;
    const route = ({ data: of({ embargos: new Embargos(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Rrhh2TestModule],
        declarations: [EmbargosDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EmbargosDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmbargosDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load embargos on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.embargos).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
