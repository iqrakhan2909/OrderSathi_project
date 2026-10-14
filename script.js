
import { pipeline, env } from
  'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2';

// OrderSaathi: local-first customer message intelligence
const MODEL_ID = 'Xenova/flan-t5-small';

env.allowLocalModels = false;
env.useBrowserCache = true;

let orderModel = null;
let isLoadingModel = false;
let lastBrief = '';

const messageInput = document.getElementById('customerMessage');
const businessSelect = document.getElementById('businessType');
const analyzeBtn = document.getElementById('analyzeBtn');
const analyzeLabel = document.getElementById('analyzeLabel');
const analyzeIcon = document.getElementById('analyzeIcon');
const modelStatus = document.getElementById('modelStatus');
const modelBadge = document.getElementById('modelBadge');
const charCount = document.getElementById('charCount');
const results = document.getElementById('results');
const analysisOutput = document.getElementById('analysisOutput');
const errorBox = document.getElementById('errorBox');

const sampleMessage =
  'Didi 2 chocolate cakes chahiye Sunday ko, one is 1 kg and dusra half kg, naam Aanya likhna hai, budget 1200 ke andar ho toh batao.';

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}

function hideError() {
  errorBox.hidden = true;
  errorBox.textContent = '';
}

function updateCharacterCount() {
  charCount.textContent = `${messageInput.value.length} / 1500`;
}

messageInput.addEventListener('input', updateCharacterCount);

document.getElementById('sampleBtn').addEventListener('click', () => {
  messageInput.value = sampleMessage;
  businessSelect.value = 'home bakery';
  updateCharacterCount();
  messageInput.focus();
  hideError();
});

async function loadModel() {
  if (orderModel) return orderModel;

  if (isLoadingModel) {
    throw new Error('The model is already loading. Please wait a moment.');
  }

  isLoadingModel = true;
  modelBadge.textContent = 'LOADING MODEL';
  modelStatus.textContent =
    'Downloading the open-weight model. The first run may take a while.';

  try {
    orderModel = await pipeline(
      'text2text-generation',
      MODEL_ID,
      {
        progress_callback: (progress) => {
          if (progress.status === 'progress' &&
              typeof progress.progress === 'number') {
            const percent = Math.round(progress.progress);
            modelStatus.textContent =
              `Preparing AI model: ${percent}%`;
          }
        }
      }
    );

    modelBadge.textContent = 'MODEL READY';
    modelStatus.textContent =
      'Model ready. Order analysis runs locally in your browser.';
    return orderModel;
  } catch (error) {
    orderModel = null;
    modelBadge.textContent = 'LOAD FAILED';
    modelStatus.textContent =
      'Model could not load. Check your connection and retry.';
    throw error;
  } finally {
    isLoadingModel = false;
  }
}

function buildPrompt(message, businessType) {
  return `You are OrderSaathi, an assistant for a ${businessType}.
Read the customer message carefully. It may contain informal English,
Indian English, or Hinglish. Do not invent missing facts, dates,
prices, quantities, or promises.

Customer message:
${message}

Write a concise business order brief in English using these sections:

ORDER SUMMARY:
List the products or service, quantity, sizes, names, dates, and
preferences explicitly stated by the customer.

MISSING DETAILS TO CONFIRM:
List only important details that are unclear or absent. If a date
such as Sunday is given without a calendar date, ask which date.
Never assume a date or a price.

BUDGET AND PRICING:
State the customer's budget if one is given. Do not invent the
seller's prices or claim that the order fits the budget.

CUSTOMER REPLY:
Write a warm, professional, ready-to-send reply. Ask for the
most important missing details. Do not confirm availability,
payment, or acceptance unless the customer message establishes it.

Keep the answer practical and easy for a small business owner
to use. Clearly distinguish known facts from questions.`;
}

async function analyzeOrder() {
  hideError();

  const message = messageInput.value.trim();
  const businessType = businessSelect.value;

  if (!message) {
    showError('Paste a customer message first, or click “Try sample”.');
    messageInput.focus();
    return;
  }

  if (message.length < 8) {
    showError('Please enter a little more detail so the AI can analyze it.');
    messageInput.focus();
    return;
  }

  analyzeBtn.disabled = true;
  analyzeLabel.textContent = 'Preparing AI...';
  analyzeIcon.textContent = '◌';
  results.hidden = true;

  try {
    const model = await loadModel();

    analyzeLabel.textContent = 'Reading the message...';
    modelStatus.textContent =
      'Your message is being processed by the browser model.';

    const prompt = buildPrompt(message, businessType);

    const output = await model(prompt, {
      max_new_tokens: 240,
      do_sample: false
    });

    const generatedText = output?.[0]?.generated_text;

    if (typeof generatedText !== 'string' || !generatedText.trim()) {
      throw new Error('The model returned an empty response. Please retry.');
    }

    lastBrief = generatedText.trim();
    analysisOutput.textContent = lastBrief;

    results.hidden = false;
    modelBadge.textContent = 'MODEL READY';
    modelStatus.textContent =
      'Analysis complete. Your customer message was processed in the browser.';

    results.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } catch (error) {
    console.error('OrderSaathi error:', error);

    showError(
      `Could not complete the analysis. ${error.message || 'Please retry.'} ` +
      'If the model download failed, check your internet connection and reload.'
    );
  } finally {
    analyzeBtn.disabled = false;
    analyzeLabel.textContent = 'Decode this order';
    analyzeIcon.textContent = '✳';
  }
}

analyzeBtn.addEventListener('click', analyzeOrder);

document.getElementById('copyBtn').addEventListener('click', async () => {
  if (!lastBrief) return;

  const button = document.getElementById('copyBtn');

  try {
    await navigator.clipboard.writeText(lastBrief);
    button.textContent = 'Copied ✓';
    setTimeout(() => {
      button.textContent = 'Copy order brief';
    }, 1800);
  } catch {
    showError(
      'Clipboard access was blocked. Select the order brief and copy it manually.'
    );
  }
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  if (!lastBrief) return;

  const blob = new Blob([lastBrief], {
    type: 'text/plain;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'ordersaathi-order-brief.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
});

updateCharacterCount();
