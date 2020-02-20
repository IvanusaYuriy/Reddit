import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPostService } from 'src/app/blog-post.service';
import { BlogPost } from 'src/app/blogpost/blogpost';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss']
})
export class BlogPostsComponent implements OnInit {
  blogPosts$: Observable<BlogPost[]>;

  constructor(private blogPostService: BlogPostService) {
  }

  ngOnInit() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.blogPosts$ = this.blogPostService.getBlogPosts();
  }

  delete(id) {
    const ans = confirm('Do you want to delete comment with id: ' + id);
    if (ans) {
      this.blogPostService.deleteBlogPost(id).subscribe((data) => {
        this.loadBlogPosts();
      });
    }
  }
}