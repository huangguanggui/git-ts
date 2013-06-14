///<reference path='../libs/DefinitelyTyped/angularjs/angular.d.ts' />

///<reference path='../Model.ts' />

'use strict';

module Service {

    export class TodoService {

        constructor(public $http:ng.IHttpService) {
        }

        getList():ng.IHttpPromise {
            var promise = this.$http.get("/List");
            var wrapped:ng.IHttpPromise = {
                success: (callback) => {
                    promise.success((data, status, headers, config) => {
                        var resultList:Model.Todo[] = [];
                        data.forEach((data)=> {
                            resultList.push(new Model.Todo(data));
                        });
                        callback(resultList, status, headers, config);
                    });
                },
                error: promise.error,
                then: promise.then
            };
            return wrapped;
        }
//
//        Post(data):ng.IHttpPromise {
//            var promise = this.$http.put("/Post",da);
//            var wrapped:ng.IHttpPromise = {
//                success: (callback) => {
//                    promise.success((data, status, headers, config) => {
//                        var resultList:Model.Todo[] = [];
//                        data.forEach((data)=> {
//                            resultList.push(new Model.Todo(data));
//                        });
//                        callback(resultList, status, headers, config);
//                    });
//                },
//                error: promise.error,
//                then: promise.then
//            };
//            return wrapped;
//        }
    }
}