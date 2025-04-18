# Browserless PDF Generator

A Next.js application that generates PDFs from webpages using Browserless.io and Puppeteer.

## Features Based on Requirement

- **API Endpoint**: Generate PDFs from any webpage with a simple JSON payload
- **Input Validation**: Strict validation of JSON payloads
- **Custom Image Loading**: Special handling to ensure images are loaded before PDF generation
- **Memory-Efficient Streaming**: PDF data is streamed to the client
- **User Interface**: Simple UI for testing PDF generation

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [Browserless.io](https://browserless.io/) account and API token

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   bun install
   ```

3. Create a `.env.local` file with your Browserless.io token:
   ```
   TOKEN=your_browserless_token_here
   ```

### Running the Application

Start the development server:

```bash
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the application.

### API Usage

To generate a PDF, send a POST request to `/api/generate-pdf` with a JSON payload:

```json
{
  "url": "https://example.com"
}
```

The API will return a PDF file as the response.

### Implementation Details Based on Requirement

- **JSON Validation**: The API validates that the payload contains exactly one property named `url` and rejects any additional properties.
- **Image Loading**: Custom solution to ensure all images are loaded before PDF generation, without relying on `networkidle0`.
- **PDF Streaming**: The PDF is streamed directly to the client without buffering the entire file in memory.

## Production Build

To create a production build:

```bash
bun run build
bun run start
```

## Technology Stack

- Next.js 15
- TypeScript
- Puppeteer
- Browserless.io
- Tailwind CSS + Shadcn
