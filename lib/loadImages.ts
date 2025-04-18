import { Page } from "puppeteer-core";

export async function waitForImagesToLoad(page: Page): Promise<void> {
  await page.evaluate(() => {
    return new Promise<void>((resolve) => {
      // Get all images on the page
      const images = document.querySelectorAll("img");
      let loadedImages = 0;
      const totalImages = images.length;

      // If there are no images, resolve immediately
      if (totalImages === 0) {
        return resolve();
      }

      // Function to check if all images have loaded
      const imageLoaded = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
          resolve();
        }
      };

      // Set up load and error handlers for each image
      images.forEach((img) => {
        // Check if image is already loaded
        if (img.complete) {
          imageLoaded();
        } else {
          img.addEventListener("load", imageLoaded);
          img.addEventListener("error", imageLoaded); // Count error as "loaded" to avoid hanging
        }
      });

      // Set a timeout to prevent hanging indefinitely (10 seconds)
      setTimeout(() => {
        resolve();
      }, 10000);
    });
  });
}
