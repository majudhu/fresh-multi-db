import { useState } from "preact/hooks";
import type { ComponentProps } from "preact";
import axiod from "axiod";
import { JSX } from "preact/jsx-runtime";

interface CounterProps {
  src: string;
  count: number;
  name: string;
  href: string;
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
        <a href={props.href}>{props.name}</a>: {count}
      </p>
      <Button disabled={loading} onClick={() => saveCount(count - 1)}>
        -1
      </Button>
      <Button disabled={loading} onClick={() => saveCount(count + 1)}>
        +1
      </Button>
      <Button disabled={loading} onClick={reload}>
        ↺
      </Button>
    </div>
  );
}

const Button = (props: ComponentProps<"button">) => (
  <button
    className="bg-gray-700 text-white disabled:opacity-50 px-4 hover:bg-gray-600"
    {...props}
  >
    {props.children}
  </button>
);
