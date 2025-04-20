import { inject } from "@angular/core"
import { AuthService } from "./auth.service"
import { Router } from "@angular/router"

export const canActivateAuth = ()=>{
    const isloggedIn = inject(AuthService).isAuth
    if (isloggedIn){
        return true
    }
    return inject(Router).createUrlTree(['/login'])
}