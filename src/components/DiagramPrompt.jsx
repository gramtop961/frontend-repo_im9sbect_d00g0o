import { useState } from 'react';
import { Loader2, Wand2, Send } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function DiagramPrompt({ onResult, onError, initialPrompt = '' }) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);

  async function handleGenerate(e) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    onError?.(null);
    try {
      const res = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: 'Failed to generate' }));
        throw new Error(err.detail || 'Failed to generate');
      }
      const data = await res.json();
      onResult?.(data);
    } catch (err) {
      console.error(err);
      onError?.(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleGenerate} className="w-full">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-4 backdrop-blur">
        <label className="mb-2 block text-sm font-medium text-zinc-200">Describe your diagram</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., ERD for users, orders, products with relationships; or flowchart: Start -> Login -> Browse -> Checkout -> End"
          className="min-h-[120px] w-full resize-y rounded-xl border border-white/10 bg-black/30 p-4 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-zinc-400">Flows, ERD, Class, Sequence, Mindmap</div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-600/30 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
            {loading ? 'Thinking' : 'Generate'}
          </button>
        </div>
      </div>

      <div className="mt-3 text-xs text-zinc-400">
        Tip: Use natural language or specify nodes like: Start -> Collect Input -> Validate -> Save -> End
      </div>
    </form>
  );
}
