import EditorContent from "@/components/editor/EditorContent";
import { Suspense } from "react";

export default function EditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">Memuat Editor...</p>
          </div>
        </div>
      }>
      <EditorContent />
    </Suspense>
  );
}
