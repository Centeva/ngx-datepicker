import { HomeRoutes } from './component/home/home.routes';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
	...HomeRoutes,
	{
		path: '', redirectTo: 'home', pathMatch: 'full'
	}
];

export const appRouterProviders = RouterModule.forRoot(routes);
