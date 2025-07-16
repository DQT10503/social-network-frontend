import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { MessageComponent } from './message/message.component';
import { ConversationComponent } from './conversation/conversation.component';

export const MESSAGE_ROUTES: Routes = [
  {
    path: '',
    component: MessageComponent,
    canActivate: [authGuard],
    children: [
      {
        path: ':id',
        component: ConversationComponent
      }
    ]
  }
]; 