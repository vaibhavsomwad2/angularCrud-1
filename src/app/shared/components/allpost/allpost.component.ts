import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ipost } from '../../model/post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-allpost',
  templateUrl: './allpost.component.html',
  styleUrls: ['./allpost.component.scss']
})
export class AllpostComponent implements OnInit {
  allpost :Ipost[] =[]; 
  errMsg :string = '';
  constructor(private postServices:PostService,
               private _snackBar:MatSnackBar       ){

  }
  ngOnInit(): void {
    this.getPostAll()
  }
  getPostAll(){
    this.postServices.getPost().subscribe(res =>{
      this.allpost = res;
    }, (err) =>{
      console.log(err.message);
      this.errMsg =err.message 
    })
  }
  onDelete(id:number){
    this.postServices.deletePost(id).subscribe(res => {
      this.allpost = this.allpost.filter(data => data.id !=id)
      this.openSnackBar('post Remove/Delete is Successfully', 'ok')
    }); 
    // this.postServices.deletePost(id).subscribe(res => {
    //   console.log(res);
    //   this.openSnackBar('post Remove/Delete is Successfully', 'ok')
    // }); 
  }
  openSnackBar(message:string, action:string){
    this._snackBar.open(message,action)
  }
}
