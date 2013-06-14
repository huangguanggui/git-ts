///<reference path='libs/DefinitelyTyped/angularjs/angular.d.ts' />

/**
 * モデルのモジュール。
 */
module Model {
	export class Sample {
		test:string;

		/**
		 * @constructor
		 * @param data JSONObjectまたはJSON文字列
		 */
			constructor() {
			//if (angular.isString(data)) {
				//data = angular.fromJson(data);
			//}
			//this.test = data.test;
		}
	}


    /**
     * 1件TODOを表すクラス
     * */
    export class Todo{
        id:number;
        title:string;
        createAt:number;

//        constructor(public content:string = "Unknown"){
//        }
        constructor(data:any){
            this.id = data.id;
            this.title = data.title;
            this.createAt = data.createAt;
        }
    }
}
