import { UserService } from "../services/user.service";

export class UserInformation {
 
  constructor(private userService: UserService){
      
  }
  getUser(){
this.userService.getAll().subscribe((state) => {
      console.log(state);
     // this.states = state;
     // console.log(this.states);
     return state;
    });  }
}