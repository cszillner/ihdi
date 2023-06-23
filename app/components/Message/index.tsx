import { Form } from "@remix-run/react";
import { useEffect, useRef } from "react";

type Field = {
  name: string;
  value: string | null | undefined;
};

type MessageProps = {
  error?: string;
  success?: string;
  fields?: Field[];
  autoClose?: number;
};

export const Message = (props: MessageProps) => {
  const clearMessageButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (props.autoClose && (props.success || props.error)) {
        clearMessageButtonRef.current?.click();
      }
    }, props.autoClose);

    return () => clearTimeout(handler);
  }, [props.success, props.error, props.autoClose]);

  return (
    <Form method="POST">
      <div
        className={`
            fixed
            flex
            justify-between
            items-baseline
            w-full
            left-0
            p-2
            md:p-3
            border-t-2
            font-bold
            text-md
            md:text-lg
            transition-all
            duration-300
            ease-in-out
            ${
              props.success || props.error
                ? "bottom-0 visible opacity-100"
                : "-bottom-10 invisible opacity-0"
            }
            ${props.success && "bg-green-300 border-green-600 text-green-800"}
            ${props.error && "bg-red-300 border-red-600 text-red-800"}
        `}
      >
        <span className="inline-block text-center">
          {props.success || props.error}
        </span>

        <button
          ref={clearMessageButtonRef}
          name="clearMessage"
          value="true"
          className={`
              self-start
              flex
              justify-center
              items-center
              w-6
              h-6
              p-1
              rounded-full
              ${props.success && "hover:bg-green-900 hover:text-green-300"}
              ${props.error && "hover:bg-red-900 hover:text-red-300"}
            `}
        >
          X
        </button>

        {props.fields?.map((field) => (
          <input
            key={field.name}
            type="hidden"
            name={field.name}
            defaultValue={field.value || ""}
          />
        ))}
      </div>
    </Form>
  );
};
