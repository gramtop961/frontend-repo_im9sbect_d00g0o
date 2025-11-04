import { useMemo } from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

export default function ExamplesSidebar({ onUse }) {
  const examples = useMemo(() => [
    {
      title: 'User Signup Flow',
      prompt: 'Flowchart: Start -> Enter Email -> Validate -> Create Account -> Send Welcome Email -> End',
    },
    {
      title: 'E-commerce ERD',
      prompt: 'ERD: Users, Orders, Products, OrderItems with relationships',
    },
    {
      title: 'Auth Sequence',
      prompt: 'Sequence: Client -> API -> DB -> API -> Client for login process',
    },
    {
      title: 'Service Classes',
      prompt: 'Class diagram for UserService, OrderService, ProductService and BaseService',
    },
  ], []);

  return (
    <aside className="h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-4">
      <div className="mb-3 flex items-center gap-2 text-violet-300">
        <Lightbulb className="h-4 w-4" />
        <span className="text-xs uppercase tracking-wider">Examples</span>
      </div>
      <div className="space-y-2">
        {examples.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => onUse?.(ex.prompt)}
            className="group block w-full rounded-xl border border-white/10 bg-black/30 p-3 text-left text-sm text-zinc-200 transition hover:border-violet-600/40 hover:bg-black/40"
          >
            <div className="font-medium">{ex.title}</div>
            <div className="mt-1 line-clamp-2 text-xs text-zinc-400">{ex.prompt}</div>
            <div className="mt-2 inline-flex items-center gap-1 text-xs text-violet-300">
              Use this <ArrowRight className="h-3 w-3" />
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
