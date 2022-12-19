import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit{
  postForm:FormGroup =  {} as FormGroup
  constructor(private fb:FormBuilder,private postServices:PostService, private router:Router,
    private _snackBar:MatSnackBar ){

  }
  ngOnInit(): void {
    this.createpost();
  }
  createpost(){
    this.postForm = this.fb.group({
    title:[null, [Validators.required]],
    body:[null, [Validators.required]]
    })
  }
  onSubmit(){
    console.log(this.postForm.value);
    let obj = {
      ...this.postForm.value
    }
    this.postServices.createPost(obj).subscribe(res=>{
      this.openSnackBar('Post Created is Successfully', 'ok')
      this.router.navigate(['/dashboard'])

    })
  }
  openSnackBar(message:string, action:string){
    this._snackBar.open(message,action)
  }
}
