import { ChatMessage } from '@/types';

export const MessageUI = (message: ChatMessage) => {
  let content;
  if (!message.content) {
    content = '';
  } else {
    // gross hacks but oh well
    try {
      const parsed = JSON.parse(message.content);
      if (typeof parsed === 'string') {
        content = parsed;
      } else if ('text' in parsed && typeof parsed.text === 'string') {
        content = parsed.text;
      } else if (
        'user_message' in parsed &&
        typeof parsed.user_message === 'string'
      ) {
        content = parsed.user_message;
      } else if ('action' in parsed && parsed.action === 'exit') {
        content = 'Your response was successfully submitted.';
      } else {
        content = message.content;
      }
    } catch (e) {
      content = message.content;
    }
  }
  return (
    // <div
    //   className={`my-2 p-3 rounded-lg ${
    //     message.role === 'assistant'
    //       ? 'bg-blue-400 text-white'
    //       : 'bg-gray-300 text-black'
    //   }`}
    // >
    //   {/* {message.role === 'assistant' ? <pre className='whitespace-pre-wrap'>{content}</pre> : <span>{content}</span>} */}
    //   {content}
    // </div>
    <div
  className={`my-2 p-3 rounded-lg ${
    message.role === 'assistant'
      ? 'bg-gray-200 text-black'
      : 'bg-white text-black'
  }`}
  // style={{ borderBottom: '1px solid #ccc' }}
>
  <div className="flex items-start">
    <div className="mr-4">
      {message.role === 'assistant' ? (
        // <FaRobot size={16} />
        '🤖'
      ) : (
        // <FaUser size={16} />
        '👤'
      )}
    </div>
    <div>
      {/* {message.role === 'assistant' ? (
        <pre className="whitespace-pre-wrap">{content}</pre>
      ) : (
        <span>{content}</span>
      )} */}
      <span>{content}</span>
    </div>
  </div>
</div>
  );
};
