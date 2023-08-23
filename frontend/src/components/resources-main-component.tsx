import { ResourcesMainComponentProps } from "../types";

export default function ResourcesMainComponent({
  component,
}: ResourcesMainComponentProps) {
  return (
    <main className="absolute top-56 left-1/2 translate-x-[-50%] min-h-[65vh] w-[1250px] z-50 rounded-2xl bg-white text-slate-900">
      {component}
    </main>
  );
}
