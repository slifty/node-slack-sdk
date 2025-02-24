import { expectType, expectError } from 'tsd';
import { WebClient, WebAPICallResult } from '../../';
import { ChatPostMessageResponse } from '../../src/response/ChatPostMessageResponse';

const web = new WebClient('TOKEN');

const chatPostMesssageResult: ChatPostMessageResponse = { ok: true };
const result: WebAPICallResult = chatPostMesssageResult;
expectType<WebAPICallResult>(result);

// calling a method directly with arbitrary arguments should work
expectType<Promise<ChatPostMessageResponse>>(web.chat.postMessage({
  channel: 'CHANNEL',
  text: 'TEXT',
  key: 'VALUE',
}));
expectType<Promise<ChatPostMessageResponse>>(web.chat.postMessage({
  channel: 'CHANNEL',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          'text',
      },
    },
  ],
  key: 'VALUE',
}));

// calling a method directly with under-specified arguments should not work
expectError(web.chat.postMessage({
  text: 'TEXT',
}));

// assigning an object with a specific type that includes arbitrary arguments should not work
// TODO: can typescript even reliably do that? ^
// expectError(web.chat.postMessage({
//   text: 'TEXT',
//   channel: 'CHANNEL',
//   key: 'VALUE',
// }));
