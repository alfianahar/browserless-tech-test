"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";

type ModalViewPDFProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pdfUrl: string | null;
};

export default function ModalViewPDF({
  open,
  onOpenChange,
  pdfUrl,
}: ModalViewPDFProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>PDF Preview</DialogTitle>
          <DialogClose className="absolute top-4 right-4 opacity-70 hover:opacity-100">
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="flex-1 overflow-hidden rounded border mt-2 bg-white">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              title="PDF Preview"
              className="w-full h-full"
              style={{ minHeight: "60vh" }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No PDF to display.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
