import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
	{
		path: '', redirectTo: '', pathMatch: 'full'
	}
];

export const appRouterProviders = RouterModule.forRoot(routes);
