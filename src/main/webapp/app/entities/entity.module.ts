import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'persona',
        loadChildren: () => import('./persona/persona.module').then(m => m.Rrhh2PersonaModule),
      },
      {
        path: 'licencia',
        loadChildren: () => import('./licencia/licencia.module').then(m => m.Rrhh2LicenciaModule),
      },
      {
        path: 'otros-servicios-prestados',
        loadChildren: () =>
          import('./otros-servicios-prestados/otros-servicios-prestados.module').then(m => m.Rrhh2OtrosServiciosPrestadosModule),
      },
      {
        path: 'penas-disciplinarias-sufridas',
        loadChildren: () =>
          import('./penas-disciplinarias-sufridas/penas-disciplinarias-sufridas.module').then(
            m => m.Rrhh2PenasDisciplinariasSufridasModule
          ),
      },
      {
        path: 'garantia',
        loadChildren: () => import('./garantia/garantia.module').then(m => m.Rrhh2GarantiaModule),
      },
      {
        path: 'altas-ascensos-bajas',
        loadChildren: () => import('./altas-ascensos-bajas/altas-ascensos-bajas.module').then(m => m.Rrhh2AltasAscensosBajasModule),
      },
      {
        path: 'embargos',
        loadChildren: () => import('./embargos/embargos.module').then(m => m.Rrhh2EmbargosModule),
      },
      {
        path: 'concpremios',
        loadChildren: () => import('./concpremios/concpremios.module').then(m => m.Rrhh2ConcpremiosModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class Rrhh2EntityModule {}
