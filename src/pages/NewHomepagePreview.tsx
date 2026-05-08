const PREVIEW_URL = "http://localhost:5174";

export default function NewHomepagePreview() {
  return (
    <div className="h-screen w-full bg-neutral-950">
      <iframe
        title="New homepage redesign preview"
        src={PREVIEW_URL}
        className="h-full w-full border-0"
      />
    </div>
  );
}
