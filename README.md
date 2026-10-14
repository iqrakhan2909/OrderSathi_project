# OrderSaathi — Small Business, Smarter Orders 🌿

**Turn messy customer messages into business-ready order briefs using open-weight AI in your browser.**

OrderSaathi is a privacy-conscious AI assistant designed for home bakers, tiffin-service providers, handmade-product sellers, freelancers, and other small business owners who receive customer orders through informal messages.

Instead of manually interpreting every message, sellers can paste a customer's request and generate a structured order brief, identify missing details, and draft a professional reply.

Built for the **Side Hustle: Open-Source AI Challenge**.

---

## ✨ The Problem

Small business owners often receive orders in informal English, Indian English, Hinglish, abbreviations, and incomplete messages.

For example:

> Didi 2 chocolate cakes chahiye Sunday ko, one is 1 kg and dusra half kg, naam Aanya likhna hai, budget 1200 ke andar ho toh batao.

A seller needs to understand the quantities, cake sizes, requested name, delivery date, and budget while figuring out what still needs confirmation.

When multiple customers send messages throughout the day, this repetitive work can become time-consuming and lead to missed details.

## 💡 The Solution

OrderSaathi transforms a raw customer message into an organized business brief using an open-weight language model running in the browser.

### Core Features

- **Smart Order Analysis:** Extracts products, quantities, sizes, customer preferences, dates, and other details mentioned in a message.
- **Missing Detail Detection:** Highlights information that may need confirmation before accepting an order.
- **Budget Awareness:** Identifies the customer's stated budget without inventing the seller's prices.
- **Customer Reply Generator:** Drafts a warm, professional response that the seller can review and send.
- **Business Personalization:** Supports different business categories, including home bakeries, tiffin services, handmade-product shops, freelance services, and other small businesses.
- **Copy Order Brief:** Copies the generated analysis for convenient use elsewhere.
- **Downloadable Reports:** Exports an order brief as a `.txt` file.
- **Responsive Interface:** Provides a clean workspace for desktop and mobile screens.
- **Browser-Based Inference:** Processes messages using an open-weight model in the browser rather than a paid hosted AI API.

---

## 🎯 Who Is It For?

| Target User | How OrderSaathi Helps |
|---|---|
| Home bakers | Organizes cake orders, sizes, names, and requested dates |
| Tiffin providers | Helps clarify meal requests and delivery preferences |
| Handmade-product sellers | Structures custom product requests |
| Freelancers | Summarizes client requirements and drafts follow-up questions |
| Small local businesses | Reduces repetitive message interpretation |

## 🧠 How It Works

1. **Choose your business type.** Select the category that best describes your business.
2. **Paste the customer message.** Keep the original wording, even if it is informal or incomplete.
3. **Run the AI analysis.** The browser loads the open-weight model and generates a structured response.
4. **Review the order brief.** Check the summary, missing details, budget information, and suggested customer reply.
5. **Copy or download.** Use the generated brief as a starting point for your workflow.

The AI provides assistance, not automatic order confirmation. Sellers should verify important details before accepting an order.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Page structure and accessible interface |
| CSS3 | Responsive layout, styling, and visual design |
| JavaScript (ES Modules) | Application logic and user interactions |
| Transformers.js | Runs supported machine-learning models in the browser |
| Hugging Face model ecosystem | Supplies the model files |
| `Xenova/flan-t5-small` | Open-weight text-generation model used in the prototype |
| Browser Clipboard API | Copies generated order briefs |
| JavaScript Blob API | Creates downloadable `.txt` reports |

The project uses three application files and does not require a custom backend or a paid AI API.

---

## 🔓 Why Open-Source AI Matters

Open innovation is central to OrderSaathi, not just an additional feature.

### 1. Greater Control Over Customer Data

Customer messages may contain names, delivery information, personal preferences, and other sensitive details.

OrderSaathi performs model inference in the browser, avoiding the need to send message text to a hosted AI inference API in this implementation.

However, external package and model downloads are required initially, and browser caching does not guarantee complete offline operation. Privacy claims should be evaluated against the actual network behavior of the deployed application.

### 2. No Per-Request AI API Charges

The prototype does not rely on a paid, hosted AI API for each analysis. This can help keep the marginal inference cost low for a small business.

Users still need a compatible device and browser, and downloading or running models consumes bandwidth and computing resources.

### 3. Model Flexibility

Open-weight models allow developers to experiment with different model sizes, prompting strategies, and deployment options.

Future versions could compare models for informal Indian English and Hinglish, or explore domain-specific adaptation using appropriately collected and consented data.

### 4. More Accessible AI for Small Businesses

Many micro-businesses do not need an expensive enterprise platform. They need a practical tool that reduces repetitive work and is easy to understand.

OrderSaathi explores how open-weight AI can make useful automation more accessible to smaller sellers.

---

## 🚀 Getting Started

### Prerequisites

- A modern browser with JavaScript module support.
- [Visual Studio Code](https://code.visualstudio.com/) or another code editor.
- Internet access for the initial package and model downloads.
- The [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for a convenient local development server.

### Installation

**Step 1: Clone the repository**

Replace the placeholder below with your actual GitHub repository URL.

```bash
git clone <YOUR-REPOSITORY-URL>
cd OrderSaathi
```

Alternatively, download the repository ZIP and extract it.

**Step 2: Check the project structure**

```text
OrderSaathi/
├── index.html
├── style.css
├── script.js
└── README.md
```

**Step 3: Open the project**

Open the folder in Visual Studio Code.

**Step 4: Start Live Server**

Right-click `index.html` and choose **Open with Live Server**.

The application should open in your default browser.

**Step 5: Generate your first order brief**

1. Click **Try sample**.
2. Click **Decode this order**.
3. Wait for the model to download and initialize.
4. Review the generated order analysis.

The initial model download may take time depending on your connection and device.

---

## 🧪 Example Use Case

**Input message**

```text
Didi 2 chocolate cakes chahiye Sunday ko,
one is 1 kg and dusra half kg,
naam Aanya likhna hai,
budget 1200 ke andar ho toh batao.
```

**Expected analysis structure**

```text
ORDER SUMMARY:
Two chocolate cakes requested.
One cake is 1 kg and the other is 0.5 kg.
The name Aanya should be written on the cake(s).

MISSING DETAILS TO CONFIRM:
Confirm the exact calendar date for Sunday.
Clarify which cake or cakes need the name Aanya.

BUDGET AND PRICING:
The customer's budget is ₹1,200.
The seller's pricing and order feasibility
need to be confirmed.

CUSTOMER REPLY:
Thank you for your order inquiry!
Could you please confirm the exact date
and whether the name Aanya should be on
both cakes? I'll check the pricing against
your budget and get back to you.
```

*Illustrative example only. Actual model output may differ and should be verified before use.*

---

## ⚠️ Limitations

OrderSaathi is an early prototype, and its AI output is not guaranteed to be accurate.

- **Model quality:** The compact Flan-T5 model may struggle with complex instructions, informal Hinglish, or ambiguous messages.
- **No guaranteed structured extraction:** The model is prompted to produce sections, but their formatting and completeness may vary.
- **No automatic price verification:** The prototype does not maintain a real product catalogue or calculate verified quotations.
- **No order persistence:** Generated briefs are not saved in a database or synchronized between devices.
- **Internet requirements:** Initial dependencies and model files must be downloaded. Offline functionality depends on successful caching and browser behavior.
- **Device requirements:** Model inference speed and compatibility vary by device and browser.
- **Human verification:** Sellers should confirm quantities, dates, prices, and other important details before accepting orders.

OrderSaathi should not be treated as a complete order-management or payment-processing system.

---

## 🗺️ Future Roadmap

Potential improvements include:

- [ ] More reliable extraction of Hinglish and informal customer messages.
- [ ] Seller-defined product catalogues and pricing rules.
- [ ] Deterministic quote calculations using seller-provided prices.
- [ ] Locally stored order history and search.
- [ ] Downloadable invoices and printable order slips.
- [ ] Bulk processing of customer messages.
- [ ] Model comparison for small-business workflows.
- [ ] Improved offline support with explicit model-download and cache management.
- [ ] Optional integration with messaging platforms, subject to their APIs and permissions.
- [ ] Evaluation against consented, anonymized real-world examples.

## 🤝 Contributing

Contributions are welcome!

You can help by:

1. Testing the app with different kinds of customer messages.
2. Reporting incorrect or confusing AI outputs.
3. Improving accessibility and mobile responsiveness.
4. Suggesting better open-weight models.
5. Contributing bug fixes or new small-business workflows.

When reporting examples, avoid including real customer names, phone numbers, addresses, or other personal information.

To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the application.
5. Open a pull request describing the change.

## 📜 License

This project can be released under the MIT License for reuse and contributions, provided you add an appropriate `LICENSE` file to the repository.

The project code's license is separate from the model's license and the licenses of its dependencies. Check the applicable model and dependency terms before redistributing them or using them commercially.

## 🌱 Final Thought

**Small businesses deserve smarter tools, too.**

OrderSaathi explores how open-weight AI can turn an everyday business headache into a simpler workflow while giving developers more control over model choice, inference, and deployment.

The goal is not to replace the business owner. It is to give them more time to focus on their customers.

---

**Built for the Side Hustle Open-Source AI Challenge.**

*Open innovation. Practical AI. Less order chaos.*