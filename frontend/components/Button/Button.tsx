export type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

export function Button(props: ButtonProps) {
  return (
    <>
      <button
        className="bg-brand text-white px-4 py-2 rounded-lg text-[14px] font-medium flex flex-row items-center gap-2
            hover:opacity-70 transition-opacity duration-100 ease-in-out active:opacity-50
        "
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
}
