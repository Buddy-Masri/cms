import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Posts } from 'src/app/models/posts';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostService } from 'src/app/services/post.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.css'],
})
export class NewPostsComponent implements OnInit {
  titleValue: string = '';
  permalink: string = '';
  imgSrc: any = './assets/default_placeholder.png';
  selectedImg: any;
  categoryList: Array<object> = [];
  form: FormGroup;
  formCategory: string;
  queryParams: string = '';
  singlePost;
  postHeader: string = 'Add New Post';
  trustedHTML: SafeHtml;

  constructor(
    private catgsr: CategoriesService,
    private frm: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {

    this.route.queryParamMap.subscribe((value) => {
      this.queryParams = value.get('id');
    });

    if (this.queryParams) {
      this.postService.loadSinglePost(this.queryParams).subscribe((value) => {
        this.postHeader = 'Edit Post';
        this.singlePost = value;
        this.imgSrc = this.singlePost.postImgPath;
        this.form = this.frm.group({
          title: [
            this.singlePost.title,
            [Validators.required, Validators.minLength(10)],
          ],
          permalink: [
            { value: this.singlePost.permalink, disabled: true },
            [Validators.required, Validators.minLength(10)],
          ],
          excerpt: [
            this.singlePost.excerpt,
            [Validators.required, Validators.minLength(50)],
          ],
          category: [
            `${this.singlePost.category.category}-${this.singlePost.category.categoryId}`,
            Validators.required,
          ],
          postImg: ['', Validators.required],
          content: [this.singlePost.content, Validators.required],
        });
      });
    } else {
      this.form = this.frm.group({
        title: ['', [Validators.required, Validators.minLength(10)]],
        permalink: [
          { value: '', disabled: true },
          [Validators.required, Validators.minLength(10)],
        ],
        excerpt: ['', [Validators.required, Validators.minLength(50)]],
        category: ['', Validators.required],
        postImg: ['', Validators.required],
        content: ['', Validators.required],
      });
    }
    const yourHtmlContent = `
    <angular-editor
    placeholder="Add Your Content Here"
    formControlName="content"
    ></angular-editor>
    `;
    this.trustedHTML = this.sanitizer.bypassSecurityTrustHtml(yourHtmlContent);
  }

  ngOnInit(): void {
    this.catgsr.loadData().subscribe((data) => {
      this.categoryList = data;
    });
  }

  get frmctrl() {
    return this.form.controls;
  }

  onTitleChange($event) {
    const value = $event.target.value;
    this.titleValue = value;
    this.permalink = value.replace(/\s/g, '-');
  }

  imgPreview($event) {
    this.selectedImg = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImg);
    reader.onload = () => {
      this.imgSrc = reader.result;
    };
  }

  onFormSubmit() {
    let splitted = this.form.controls.category.value.split('-');
    const postData: Posts = {
      title: this.form.value.title,
      permalink: this.permalink,
      category: {
        categoryId: splitted[1],
        category: splitted[0],
      },
      postImgPath: '',
      excerpt: this.form.value.excerpt,
      content: this.form.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };
    // if (this.postHeader == 'Add New Post') {
    this.postService.uploadImage(this.selectedImg, postData, this.queryParams);
    // } else if (this.postHeader == 'Edit Post') {
    //   this.postService.savePostChanges(
    //     this.selectedImg,
    //     postData,
    //     this.queryParams
    //   );
    // }
    this.form.reset();
    this.imgSrc = './assets/default_placeholder.png';
    this.router.navigate(['/posts']);
  }
}
