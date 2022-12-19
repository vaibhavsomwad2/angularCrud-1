import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit{
  // updateBn:boolean = true;
  postForm!:FormGroup;
  constructor(private postServices:PostService,private fb:FormBuilder, private route:ActivatedRoute, private _snackBar:MatSnackBar, private router:Router ){

  }
  ngOnInit(): void {
    this.createpost()
    this.editePost()
  }
  createpost(){
    this.postForm = this.fb.group({
    title:[null, [Validators.required]],
    body:[null, [Validators.required]]
    })
  }
  editePost(){
    this.route.params.subscribe((param:Params)=>{
      
      let id = +param['id']
      console.log(id);
      localStorage.setItem('postId',""+id)
      this.postServices.getSignalPost(id).subscribe(res => {      
        this.postForm.setValue({
          title : res.title,
          body : res.body
        })
      })
    })
  }
  updatePost(){
  let upId = +localStorage.getItem('postId')!
  let obj = {
    ...this.postForm.value
  }
  this.postServices.UpdatePost(upId,obj).subscribe(res=>{
    console.log(res);
    this.openSnackBar('Post Updated is Successfully', 'ok')
    this.router.navigate(['dashboard'])
  }) 
  }
  openSnackBar(message:string, action:string){
    this._snackBar.open(message,action)
  }
}
