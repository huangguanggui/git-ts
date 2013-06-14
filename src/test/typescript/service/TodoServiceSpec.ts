///<reference path='../libs/DefinitelyTyped/jasmine/jasmine.d.ts' />

///<reference path='../../../main/typescript/libs/DefinitelyTyped/angularjs/angular.d.ts' />
///<reference path='../libs/DefinitelyTyped/angularjs/angular-mocks.d.ts' />

///<reference path='../../../main/typescript/service/TodoService.ts.ts' />

'use strict';

describe("Serviceの", ()=> {
    var $injector:ng.auto.IInjectorService;
    beforeEach(()=> {
        $injector = angular.injector(['ngMock', 'gae-standards.service']);
    });

    describe("Service.TodoService", ()=> {
        var $httpBackend:ng.IHttpBackendService;
        var service:Service.TodoService;

        beforeEach(()=> {
            $httpBackend = $injector.get("$httpBackend");

            service = $injector.instantiate(Service.TodoService, {
            });
        });

        it("Listメソッドのテスト", ()=> {
            $httpBackend.expect("GET", "/List").respond(200, [{title:"testList"}]);
            var promise = service.getList();

            var model;
            promise.success((data)=> model = data);

            $httpBackend.flush();

            expect(model).toBeDefined();
            // expect(model instanceof Model.Sample).toBeTruthy();
        });
    });
});
