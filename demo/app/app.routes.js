"use strict";
var home_routes_1 = require('./component/home/home.routes');
var router_1 = require('@angular/router');
var routes = home_routes_1.HomeRoutes.concat([
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    }
]);
exports.appRouterProviders = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map