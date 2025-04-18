import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import { validatePayload } from "@/lib/validatePayload";
import { waitForImagesToLoad } from "@/lib/loadImages";

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON payload
    const payload = await request.json();

    // Validate the payload
    const validation = validatePayload(payload);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errorMessage },
        { status: 400 }
      );
    }

    // Get the URL from the payload
    const { url } = payload;

    // Check token
    const browserlessToken = process.env.TOKEN;
    if (!browserlessToken) {
      return NextResponse.json(
        { error: "Browserless token not configured" },
        { status: 500 }
      );
    }

    // Create a browserless connection string
    const browserWSEndpoint = `wss://production-sfo.browserless.io?token=${browserlessToken}`;

    // Connect to Browserless
    const browser = await puppeteer.connect({
      browserWSEndpoint,
    });

    // Create a new page
    const page = await browser.newPage();

    // Set viewport size for consistent PDF generation
    await page.setViewport({ width: 1280, height: 800 });

    // Navigate to the URL
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Custom solution to wait for images to load
    await waitForImagesToLoad(page);

    // Generate PDF as a buffer
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    // Close the browser connection
    await browser.close();

    // Setup headers for PDF download
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set("Content-Disposition", `attachment; filename="webpage.pdf"`);
    headers.set("Content-Length", pdfBuffer.length.toString());

    // Return the PDF as a stream
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
