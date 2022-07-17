import { observable, action, makeAutoObservable } from 'mobx'
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000")
export class ItemsStore {
    constructor() {
        this.items =[];
        this.category="Cell Phones";
        this.socket=socket;
        this.load=2;
        makeAutoObservable(this, {
            items: observable,
            load:observable,
            category:observable,
            setcategory:action,
            setItems:action, 
            setLoad:action 
        })

    }
    setItems(items){
        this.items=items
    } 

    setItems(items){
        this.items=items
    } 
    setLoad(isload){
        this.load=isload
    }
    setcategory=(category)=>{
       this.category=category
    }
   
}