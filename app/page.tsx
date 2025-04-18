"use client";

import SubmitButton from "@/components/SubmitButton";
import ModalViewPDF from "@/components/ModalViewPDF";
import axios from "axios";
import React, { useState } from "react";

function Spinner() {
  return (
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
  );
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/generate-pdf",
        { url },
        {
          responseType: "blob",
        }
      );
      const blob = response.data;
      const urlObj = URL.createObjectURL(blob);
      setPdfUrl(urlObj);
      setModalOpen(true);
    } catch (err: any) {
      alert("Error: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">PDF Generator</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="url"
          placeholder="Enter full URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-accent-foreground rounded px-4 py-2 mb-2"
          required
        />
        <SubmitButton
          type="submit"
          disabled={loading}
          className="bg-primary text-accent px-4 py-2 rounded w-full"
          loading={loading}
        >
          Generate PDF
        </SubmitButton>
      </form>
      <ModalViewPDF
        open={modalOpen}
        onOpenChange={setModalOpen}
        pdfUrl={pdfUrl}
      />
    </div>
  );
}
