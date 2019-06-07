import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
  providers: [UserService]
})
export class EditarComponent implements OnInit {

  public title: string;
  public user: User;
  public status: string;
  public confirm_passwordModel: string;
  public token;
  public identity;
  public url: any;
  public newUserImage;
  public newNick;

  constructor(

    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService

    

  ) {

    this.title = 'Editar usuario';

    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();


    this.user = new User(1, '', '', '', '', '', '', '');


   }

  ngOnInit() {

    this._route.params.subscribe(

      params => {

        let id = +params['id'];

        this.getUser(id);

  });

  }

  readUrl(event:any) 
  {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.onload = (event: ProgressEvent) => {
           this.url = (<FileReader>event.target).result;
           this.user.image = this.url;
        }

        reader.readAsDataURL(event.target.files[0]);
         (event.target.files[0]);
      }
  }


  getUser(id){

        this._userService.getUser(id).subscribe(

          response => {

            if(response.status == 'success'){

              this.user = response.user;

            }else{

              this._router.navigate(['home']);

            }
          },
          error => {

            console.log(<any>error);

            this.status = 'error';
          }
        );
  }

  onSubmit(form) {

   this._userService.updateUser(this.token, this.user, this.user.id).subscribe(

    response => {

      if(response.status == 'success'){

        this.status = 'success';

        if(this.identity.sub == this.user.id){

          if(response.user_image){
          
            this.newUserImage = response.user_image;
    
            this.identity.image = this.newUserImage;
    
            }
    
            this.newNick = response.new_nick;
            this.identity.nick = this.newNick;
    
            localStorage.setItem('identity', JSON.stringify(this.identity));    

        }
        
        this._router.navigate(['listadoUser']);


      }else{
        this.status = 'error';
      }
    },
    error => {
      console.log(<any>error);
      this.status = 'error';
    }
   );
  }

}
