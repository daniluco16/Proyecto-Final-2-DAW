import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ListadoComponent } from '../listado/listado.component';
import { UserService } from '../../services/user.service';

export interface DialogData {
  nick: string;
  idUser: number;
}

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers: [UserService]

})
export class ConfirmationComponent implements OnInit {

  public token;


  constructor(
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    public dialogRef: MatDialogRef<ListadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData

  ) {
    this.token = this._userService.getToken();
   }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUser(id){
    this._userService.delete(this.token, id).subscribe(

      response => {

      },
      error => {

        console.log(<any>error);

      }


    );

  }

}
