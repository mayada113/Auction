import { observable, action, makeAutoObservable } from 'mobx'

export class AuthStore {
    constructor() {
        this.auth = false;
        this.user=null;
    
        makeAutoObservable(this, {
            auth: observable,
            user:observable,
            setLogInStatus: action
        })
    }

    setLogInStatus = (auth,user) => {
        this.auth = auth
        this.user=user
    }
}