import Cookies from "universal-cookie";

const cookies = new Cookies();
class CookieService{
    // get
    get(name:string){
       return cookies.get(name);
    }
    // set=> option expeir بعد قد ايه 
    set(name:string,value:string,options:object){
        cookies.set(name,value,options);
    }
    // remove
    remove(name:string){
        return cookies.remove(name)
    }
}

export default new CookieService();