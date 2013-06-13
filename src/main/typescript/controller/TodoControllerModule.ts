///<reference path='../libs/DefinitelyTyped/angularjs/angular.d.ts' />

///<reference path='../Model.ts' />


module Todo{

    export interface Scope extends ng.IScope{
        todos:Model.Todo[];
        content:string;
        add:() => void;
    }

    export class Controller{
        constructor(public $scope:Scope){
            this.$scope.todos = [
                new Model.Todo("Hello todo!")
            ];

            this.$scope.add = () => this.add();
        }


        public add(){
        this.$scope.todos.push(new Model.Todo(this.$scope.content));
        };
    }

}