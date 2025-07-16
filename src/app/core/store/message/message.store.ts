import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Message, Conversation } from '../../models/message.interface';

interface MessageState {
  conversations: Conversation[];
  messages: { [conversationId: string]: Message[] };
  loading: boolean;
  error: any;
}

const initialState: MessageState = {
  conversations: [],
  messages: {},
  loading: false,
  error: null
};

export const MessageStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ conversations, messages }) => ({
    conversationCount: computed(() => conversations().length),
    hasConversations: computed(() => conversations().length > 0)
  })),
  withMethods((store) => ({
    setConversations(conversations: Conversation[]) {
      patchState(store, { conversations });
    },
    addConversation(conversation: Conversation) {
      patchState(store, { conversations: [...store.conversations(), conversation] });
    },
    setMessages(conversationId: string, messages: Message[]) {
      patchState(store, {
        messages: { ...store.messages(), [conversationId]: messages }
      });
    },
    addMessage(conversationId: string, message: Message) {
      const currentMessages = store.messages()[conversationId] || [];
      patchState(store, {
        messages: { ...store.messages(), [conversationId]: [...currentMessages, message] }
      });
    },
    setLoading(loading: boolean) {
      patchState(store, { loading });
    },
    setError(error: any) {
      patchState(store, { error });
    }
  }))
);

export type MessageStore = InstanceType<typeof MessageStore>; 