///<reference path='../libs/DefinitelyTyped/angularjs/angular.d.ts' />

///<reference path='../Model.ts' />


module Todo{

    export interface Scope extends ng.IScope{
        todos:Model.Todo[];
        content:string;
        newcontent:string;
        add:() => void;

        remove:(index:number) => void;

        modify:(index:number) => void;
        edit:(index:number) => void;
        w:Window;
    }

    export class Controller{
        constructor(public $scope:Scope,public $window:Window){
            this.$scope.todos = [
                new Model.Todo("Hello todo!")
            ];

            this.$scope.w = $window;

            this.$scope.add = () => this.add();
            this.$scope.remove = (index:number) => this.remove(index);
            this.$scope.modify = (index:number) => this.modify(index);
            this.$scope.edit = (index:number) => this.edit(index);

        }


        add(){
            this.$scope.todos.push(new Model.Todo(this.$scope.content));
        };

        remove(index:number){
            this.$scope.todos.splice(index,1);
        };

        modify(index:number){

            this.$scope.newcontent = this.$scope.w.prompt("",this.$scope.todos[index].content);
            if(this.$scope.newcontent != null)
                this.$scope.todos[index].content = this.$scope.newcontent;
        };

        edit(index:number){

            this.$scope.newcontent = this.$scope.w.prompt("",this.$scope.todos[index].content);
            if(this.$scope.newcontent != null)
                this.$scope.todos[index].content = this.$scope.newcontent;
        };

    }

}