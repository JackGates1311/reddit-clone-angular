import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../auth/service/auth.service";
import {LocalStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-comment-tile',
  templateUrl: './comment-tile.component.html',
  styleUrls: ['./comment-tile.component.scss']
})
export class CommentTileComponent implements OnInit {

  @Input() comments;

  constructor(public authService: AuthService, public localStorage: LocalStorageService) { }

  ngOnInit(): void {
  }

  deleteComment(commentId: any) {
    
  }
}
