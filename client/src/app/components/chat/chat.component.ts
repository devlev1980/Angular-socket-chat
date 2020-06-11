import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'yl-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatForm: FormGroup;
  output: any[] = [];
  isTyping: string;

  constructor(private chatService: ChatService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.chatForm = this.fb.group({
      userName: [''],
      message: ['']
    });
    this.chatService.listen('typing').subscribe((data) => this.updateFeedback(data));
    this.chatService.listen('chat').subscribe((data) => this.updateMessage(data));
  }

  messageTyping(): void {
    this.chatService.emit('typing', this.username);
  }

  onSubmit(chatForm: FormGroup) {

    this.chatService.emit('chat', {
      message: this.message,
      handle: this.username
    });
    this.chatForm.get('message').patchValue('');
  }

  updateMessage(data: any) {
    this.isTyping = '';
    if (data) {
      console.log(`${data.handle} : ${data.message}`);
      this.output.push(data);
    } else {
      return;
    }
  }

   updateFeedback(data: any) {
     this.isTyping = `${data} is typing...`;
  }

  get username() {
    return this.chatForm.get('userName').value;
  }

  get message() {
    return this.chatForm.get('message').value;
  }

}
