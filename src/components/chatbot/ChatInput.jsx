import { Smile, Paperclip, Mic, Send } from 'lucide-react'

export default function ChatInput({ input, setInput, handleSend, isTyping }) {
  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  }

  return (
    <div className="bg-white border-t border-gray-100 px-4 py-3 shrink-0">
      <form onSubmit={handleSend} className="relative flex flex-col">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Compose your message..."
          rows={2}
          className="w-full bg-transparent resize-none focus:outline-none text-[14px] text-gray-900 placeholder-gray-400 py-2"
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1 text-gray-400">
            <button type="button" className="p-1.5 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"><Smile size={18} /></button>
            <button type="button" className="p-1.5 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"><Paperclip size={18} /></button>
            <button type="button" className="p-1.5 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"><Mic size={18} /></button>
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2.5 bg-gradient-to-br from-[#2F54EB] to-[#722ED1] hover:from-blue-700 hover:to-purple-700 text-white rounded-full disabled:opacity-50 disabled:hover:from-[#2F54EB] transition-all shadow-md active:scale-95"
          >
            <Send size={16} className="ml-0.5" />
          </button>
        </div>
      </form>
    </div>
  )
}
