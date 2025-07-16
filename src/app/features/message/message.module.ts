import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageRoutingModule } from './message-routing.module';
import { ConversationComponent } from './conversation/conversation.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MessageRoutingModule,
    ConversationComponent
  ]
})
export class MessageModule { } 