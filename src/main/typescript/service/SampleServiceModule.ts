///<reference path='../libs/DefinitelyTyped/angularjs/angular.d.ts' />

///<reference path='../Model.ts' />

'use strict';

module Service {

    export class SampleService {

        constructor(public $http:ng.IHttpService) {
        }

        test():ng.IHttpPromise {
            return this.$http.get("");
        }
    }
}