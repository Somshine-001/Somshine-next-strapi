export default function Button({
  name,
  type,
  onClick,
}: {
  name: string;
  type?: string;
  onClick?: () => void;
}) {
  return (
    <div>
      {!type || type == "comfirm" ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={onClick}
        >
          {name}
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
