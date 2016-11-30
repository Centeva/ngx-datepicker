/* tslint:disable:no-unused-variable */
"use strict";
var cdux_1 = require('../../../cdux');
var home_component_1 = require('./home.component');
describe('Component: home', function () {
    it('should create an instance', function () {
        var state = new cdux_1.AppState();
        var store = new cdux_1.Store(cdux_1.dataReducer, state);
        var component = new home_component_1.HomeComponent(store);
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=home.component.spec.js.map