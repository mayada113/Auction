import { observable, action, makeAutoObservable } from 'mobx'

export class ItemsStore {
    constructor() {
        this.items =[];
        this.category="Cell Phones";
    
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