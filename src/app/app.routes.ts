import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  // Fallback when no prior route is matched
  { 
    path: '**', redirectTo: '', pathMatch: 'full' 
  },
  {
    path: 'error', component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
