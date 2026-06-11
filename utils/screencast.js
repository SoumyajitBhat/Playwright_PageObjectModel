export class Screencast {
  static async showStep(page, message, duration = 1500) {
    await page.evaluate((msg) => {
      let el = document.getElementById("playwright-step-overlay");

      if (!el) {
        el = document.createElement("div");
        el.id = "playwright-step-overlay";

        Object.assign(el.style, {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "999999",
          background: "rgba(0,0,0,0.8)",
          color: "white",
          padding: "20px 30px",
          borderRadius: "10px",
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          maxWidth: "700px",
          width: "fit-content",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        });

        document.body.appendChild(el);
      }

      el.textContent = msg;
      el.style.display = "block";
    }, message);

    await page.waitForTimeout(duration);
  }

  static async hideStep(page) {
    await page.evaluate(() => {
      const el = document.getElementById("playwright-step-overlay");
      if (el) {
        el.style.display = "none";
      }
    });
  }

  static async removeOverlay(page) {
    await page.evaluate(() => {
      const el = document.getElementById("playwright-step-overlay");
      if (el) {
        el.remove();
      }
    });
  }
}