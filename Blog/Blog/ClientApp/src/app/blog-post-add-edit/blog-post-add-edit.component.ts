import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPostService } from 'src/app/blog-post.service';
import { BlogPost } from 'src/app/blogpost/blogpost';

@Component({
  selector: 'app-blog-post-add-edit',
  templateUrl: './blog-post-add-edit.component.html',
  styleUrls: ['./blog-post-add-edit.component.scss']
})
export class BlogPostAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formBody: string;
  id: number;
  errorMessage: any;
  existingBlogPost: BlogPost;

  constructor(private blogPostService: BlogPostService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'authorName';
    this.formBody = 'text';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        authorName: ['', [Validators.required]],
        text: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {

    if (this.id > 0) {
      this.actionType = 'Edit';
      this.blogPostService.getBlogPost(this.id)
        .subscribe(data => (
          this.existingBlogPost = data,
          this.form.controls[this.formTitle].setValue(data.authorName),
          this.form.controls[this.formBody].setValue(data.text)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let blogPost: BlogPost = {
        createAt: new Date(),
        authorName: this.form.get(this.formTitle).value,
        text: this.form.get(this.formBody).value
      };

      this.blogPostService.saveBlogPost(blogPost)
        .subscribe((data) => {
          this.router.navigate(['/blogpost', data.id]);
        });
    }

    if (this.actionType === 'Edit') {
      let blogPost: BlogPost = {
        id: this.existingBlogPost.id,
        createAt: this.existingBlogPost.createAt,
        authorName: this.form.get(this.formTitle).value,
        text: this.form.get(this.formBody).value
      };
      this.blogPostService.updateBlogPost(blogPost.id, blogPost)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get authorName() { return this.form.get(this.formTitle); }
  get text() { return this.form.get(this.formBody); }
}