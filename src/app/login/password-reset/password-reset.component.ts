import { Component, OnInit } from '@angular/core';
import { UserService, UserPasswordResetContext } from '@app/core/services/user.service';
import { Logger } from '@app/core';
import { ActivatedRoute } from '@angular/router';


const log = new Logger('User-roles');


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  public token: string;
  public password = "";
  public passwordMassage = "";
  public straithMassage = "";
  public matchValidation = false;

  public userPasswordContext:UserPasswordResetContext;

  constructor(private _userService:UserService, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];  
    }); 
    this.userPasswordContext = new UserPasswordResetContext();
  }


  ngOnInit() {
  }
    //Reset Password
    resetPassword(){
      this.userPasswordContext.token = this.token;
      console.log(this.password);
      this._userService.resetPassword(this.userPasswordContext)
        .subscribe(
          response => {
            log.debug(`${response['data'].password} created.`);
          }, 
          error => {
            log.debug(`Get reset password error: ${error}`);
          }
        );
    }

    //Password Starainth Massage
    passwordStraithMassage(e){
      let stainth = e.target.value;
      if(stainth.length >= 10){
        this.straithMassage = "Strong Password";     
      }
      else if(stainth.length > 6){
        this.straithMassage = "Medium Password";
      }
      else{
        this.straithMassage = "Very Weak Password";
      }

    }

    //Password matching massage
    matchedPassword(ev){
      let matchedPassword = ev.target.value;
      if(this.password === matchedPassword){
          this.passwordMassage = "Password matched";   
          this.matchValidation = true;
      }
      else{
        this.passwordMassage = "Password did not matched";
        this.matchValidation = false;
      }

      
      
    }
    
}
