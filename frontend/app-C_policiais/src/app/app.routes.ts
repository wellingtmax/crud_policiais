import { Routes } from '@angular/router';
import { CadastroPolicialComponent } from './components/cadastro-policial/cadastro-policial.component';
import { ListaPoliciaisComponent } from './components/lista-policiais/lista-policiais.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'lista', pathMatch: 'full' },
	{ path: 'cadastro', component: CadastroPolicialComponent },
	{ path: 'lista', component: ListaPoliciaisComponent }
];
