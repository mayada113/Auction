import { observable, action, makeAutoObservable } from 'mobx'

export class ItemsStore {
    constructor() {
        this.items =[];
        this.category="";
    
        makeAutoObservable(this, {
            items: observable,
            category:observable,
            setcategory:action
        })
    }

    setcategory=(category="")=>{
       this.category=category
    }
}