import { test, expect, Download } from "@playwright/test";
import path from "path";

test("File upload", async ({ page }) => {
  await page.goto("https://testing.qaautomationlabs.com/file-upload.php");
  await page.getByLabel("Choose file to upload").setInputFiles([]); //remove the uploaded file
  await page
    .getByLabel("Choose file to upload")
    .setInputFiles("testdata/Playwright Interview question.pdf"); //Single file Upload
  await page.waitForSelector('[data-testid="upload-file-info"]');

  await expect(page.getByTestId("upload-file-info")).toHaveText(
    "Selected File: Playwright Interview question.pdf & File Size is 146.83 KB",
  );
  //   multiple file upload
  await page
    .getByLabel("Choose file to upload")
    .setInputFiles(["file1", "file2", "file3"]);
});

test("File upload using es module", async ({ page }) => {
  await page.goto("https://testing.qaautomationlabs.com/file-upload.php");
  await page.getByLabel("Choose file to upload").setInputFiles([]); //remove the uploaded file
  //Single file Upload
  await page
    .getByLabel("Choose file to upload")
    .setInputFiles(
      path.join(__dirname, "../testdata", "Playwright Interview question.pdf"),
    );
  await page.waitForSelector('[data-testid="upload-file-info"]');

  await expect(page.getByTestId("upload-file-info")).toHaveText(
    "Selected File: Playwright Interview question.pdf & File Size is 146.83 KB",
  );
  //   multiple file upload
  /*   await page
    .getByLabel("Choose file to upload")
    .setInputFiles(["file1", "file2", "file3"]); */
});

// Download a File
test("download a file", async ({ page }) => {
  await page.goto("https://testing.qaautomationlabs.com/file-download.php");
  await page
    .getByTestId("download-text-input")
    .pressSequentially("This is a Automation practice", { delay: 200 });
  await page.getByRole("button", { name: "Generate File" }).click();
  const [downloadedFile]: [Download, void] = await Promise.all([
    page.waitForEvent("download", { timeout: 10000 }),
    page.getByRole("link", { name: " Download File" }).click(),
  ]);
  await downloadedFile.saveAs("download/dummy.pdf");
  console.log(downloadedFile.suggestedFilename());
  // await downloadedFile.saveAs(`download/${downloadedFile.suggestedFilename()}`)
  expect(await downloadedFile.failure()).toBeNull();
});

test("Download Now", async ({ page }) => {
  await page.goto("https://practice-automation.com/file-download/");
  // const [DownloadPdf] : [Download,void] = await Promise.all([
  //     page.waitForEvent("download",{timeout:10000}),
  //     await page.locator('a[data-downloadurl]').click(),
  // ])
  // await DownloadPdf.saveAs(download/${DownloadPdf.suggestedFilename()});
  // await page.pause();
  await page.locator('a[data-package="921"]').click();
  //   await page.waitForTimeout(3000);

  await page
    .frameLocator("#wpdm-lock-frame")
    .locator('input[type="password"]')
    .fill("automateNow");

  const [DownloadDocx] = await Promise.all([
    page.waitForEvent("download", { timeout: 10000 }),
    page.frameLocator("#wpdm-lock-frame").locator(".wpdm_submit").click(),
  ]);

  await DownloadDocx.saveAs(`download/${DownloadDocx.suggestedFilename()}`);

  // expect(DownloadPdf.failure()).toBeNull();
  expect(await DownloadDocx.failure()).toBeNull();
});
