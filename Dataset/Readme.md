# Scam Detection Dataset - Indian Scam Calls Dataset

## Introduction

The **Indian Scam Calls Dataset** is an extensive dataset designed to detect and classify scam calls specifically in the Indian context. With no pre-existing dataset covering Indian scams in detail, this dataset was built from the ground up by conducting extensive research through news sources, research papers, surveys, and public contributions.

Scammers frequently impersonate government officials, banks, telecom providers, and other authorities to exploit victims. The dataset aims to categorize different types of scam calls and differentiate them from legitimate calls to help with fraud detection and machine learning applications.

## Problem Statement

India faces a rising problem of scam calls, with criminals impersonating government agencies, banks, and financial institutions to extract money or sensitive information. However, the lack of structured datasets on these scams makes it difficult to train AI models for scam detection.

To bridge this gap, this dataset was developed by manually categorizing and tagging scam call transcripts based on real-world cases, public surveys, and verification from actual victims.

## Data Collection Process

1. **Research from News & Reports:**
   - Scanned multiple Indian news websites to identify scam call trends.
   - Read cybersecurity reports and scam analysis papers to understand fraudulent tactics.

2. **Categorization of Scam Calls:**
   - Identified **five major categories** of scam calls based on patterns observed.

3. **Sub-Categorization:**
   - Each major category was further divided into subcategories to improve classification accuracy.

4. **Legitimate vs. Scam Classification:**
   - Genuine service-related calls were included for contrast.
   - Scam messages were collected, analyzed, and manually labeled.

5. **Validation:**
   - Conducted public surveys to cross-verify the legitimacy of collected scam examples.
   - Used expert feedback to refine the dataset.

## Categories of Scam Calls

The dataset consists of **five primary categories**, each further divided into multiple subcategories.

### 1. Government Impersonation Scams
Scammers pretend to be government officials to threaten victims or extract money.

#### Subcategories:
- **Electricity Scam:** Fake calls from the power company demanding immediate payment.
- **Police Scam:** Fake police officers threatening legal action.
- **Income Tax Scam:** Impersonation of the tax department claiming unpaid dues.
- **Aadhaar Scam:** Fake UIDAI representatives asking for Aadhaar OTPs.
- **Identity Document Scam:** Fraudsters pretending to help with PAN, Passport, or other documents.
- **Property Tax Scam:** Calls from fake municipal officials demanding property tax payments.
- **Telecom Scam:** Impersonation of TRAI or mobile operators claiming SIM card deactivation.

### 2. Remote Access Requests (Tech Support Scams)
Fraudsters convince victims to install remote access software (AnyDesk, TeamViewer, etc.) to steal banking details or personal data.

- **Banking Scam:** Fake bank officials requesting remote access to "secure" accounts.
- **E-commerce Scam:** Fake refund agents from Amazon/Flipkart demanding remote access.
- **Police Scam:** Impersonating cybercrime police to "investigate" a fraud case.
- **Electricity Scam:** Fake calls claiming power disconnection due to unpaid bills.
- **Job Offer Scam:** Fraudulent work-from-home job providers asking for remote access.

### 3. Lottery/Prize Scams
Victims are told they have won a huge lottery or contest and need to pay fees to claim their winnings.

- **Fake Lottery Calls:** "You have won ₹1 crore! Pay processing fees to claim."
- **Festival Scams:** Scammers use Diwali, New Year, and other events to lure victims.
- **Fake International Lotteries:** "You won a UK lottery! Pay ₹10,000 in taxes."
- **Bank Rewards Scam:** "Your account has won a ₹50,000 reward! Share your OTP."

### 4. E-commerce Scams
Scammers pose as customer service agents from Amazon, Flipkart, Swiggy, etc., to steal money or data.

- **Refund Scam:** Fake agents claim refund issues and demand OTPs.
- **Fake Orders:** "You have won a free product! Pay a shipping fee."
- **Cashback Scams:** "You are eligible for a ₹5,000 cashback. Provide card details."
- **Delivery Scams:** "Your package is stuck. Pay extra to release it."

### 5. Banking & Financial Scams
Fraudsters impersonate banks or financial institutions to steal money.

- **KYC Update Scam:** "Your bank account will be frozen unless you update your KYC."
- **Fake RBI Officials:** "Your account is under investigation by RBI. Transfer funds for safety."
- **Loan Fraud:** "Pre-approved loan! Pay ₹5,000 processing fees."
- **Account Freeze Scam:** "Your bank account has been suspended. Share your OTP to reactivate."

## Dataset Structure

The dataset contains labeled call transcripts categorized as **Legitimate** and **Scam**.

### Example Entries:
#### **Legitimate Call:**
**Category:** Electricity Bill Reminder  
**Transcript:** "This is UPPCL. Your electricity bill of ₹1,200 is due on 15th March. Pay via the official website."
**Label:** Legitimate

#### **Scam Call:**
**Category:** Income Tax Scam  
**Transcript:** "This is the Income Tax Department. You owe ₹50,000 in unpaid taxes. Pay immediately to avoid legal action."
**Label:** Scam

## Usage & Applications

This dataset is useful for:
- **Fraud Detection Models:** Training machine learning models to detect scam calls.
- **NLP & Text Classification:** Developing AI solutions for scam detection.
- **Telecom Fraud Prevention:** Helping service providers filter scam calls.
- **Cybersecurity Training:** Educating users about scam call patterns.

## How to Contribute

We welcome contributions to expand the dataset. You can contribute:
- New scam call transcripts.
- Verified legitimate call samples.
- Feedback on categorization.

## Future Scope

- **Expand Dataset:** Add more scam types like investment fraud, employment scams, etc.
- **Audio Dataset:** Incorporate voice recordings of scam calls.
- **Automated Detection Model:** Build an open-source scam call detection AI model.

## License

This dataset is available under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** license. You are free to use and modify the dataset for research and non-commercial purposes.

## Contact
For questions, contributions, or feedback, feel free to contact me at priyanshurohilla001@gmail.com

