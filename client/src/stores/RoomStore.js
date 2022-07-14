import { observable, action, makeAutoObservable } from 'mobx'

export class ItemsStore {
    constructor() {
        this.bids =[];
        this.users=[];
    
        makeAutoObservable(this, {
            bids: observable,
        })
    }

    setcategory=(category="")=>{
       this.category=category
    }
}