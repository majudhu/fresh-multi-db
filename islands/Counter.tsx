import { useState } from "preact/hooks";
import axiod from "axiod";

interface CounterProps {
  src: string;
  count: number;
}

export default function Counter(props: CounterProps) {
  const [count, setCount] = useState(props.count);
  const [loading, setLoading] = useState(false);

  async function saveCount(count: number) {
    setLoading(true);
    try {
      await axiod.post(props.src, { count });
      setCount(count);
    } catch (ex) { /**/ }
    setLoading(false);
  }

  async function reload() {
    setLoading(true);
    try {
      const { data } = await axiod.get(props.src);
      setCount(data.count);
    } catch (ex) { /**/ }
    setLoading(false);
  }

  return (
    <div class="flex gap-2 w-full">
      <p class="flex-grow-1 font-bold text-xl capitalize">
        {props.src}: {count}
      </p>
      <button
        disabled={loading}
        className="bg-gray-700 text-white disabled:opacity-50 px-4"
        onClick={() => saveCount(count - 1)}
      >
        -1
      </button>
      <button
        disabled={loading}
        className="bg-gray-700 text-white disabled:opacity-50 px-4"
        onClick={() => saveCount(count + 1)}
      >
        +1
      </button>
      <button
        disabled={loading}
        className="bg-gray-700 text-white disabled:opacity-50 px-4"
        onClick={reload}
      >
        ↺
      </button>
    </div>
  );
}
