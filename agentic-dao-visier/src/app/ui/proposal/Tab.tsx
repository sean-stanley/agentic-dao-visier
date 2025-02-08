import { MDXRemote } from "next-mdx-remote/rsc";

export default function Tab({ content }: { content: string }) {
  return (
    <div>
      <div className="p-4">
        <MDXRemote source={content} />
      </div>
    </div>
  );
}
