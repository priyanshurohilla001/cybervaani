# CyberVaani – Mid-Term Evaluation  

**Team Name:** CyberVeer  
**Hackathon:** Innerve 9  
**Sponsor Track:** Josh (Online)  
**Institution:** IIIT Kota  

## 🚀 Project Overview  
CyberVaani is an AI-powered scam detection system that processes real-time speech and text data to identify fraudulent activities and alert users.  

## 🔍 Problem Statement  
India faces a rising number of scams across multiple domains, but there is no structured, localized dataset for effective detection. Our goal is to bridge this gap by developing a robust dataset, training an efficient AI model, and integrating real-time transcription for scam classification.  

## 🔧 What We Have Done So Far  
- **Dataset Creation:**  
  - Researched scam patterns via news articles, research papers, and surveys.  
  - Categorized major scam types:  
    - **Government Impersonation:** Electricity, Police, Income Tax, Aadhaar, Banking, etc.  
    - **Other Scams:** Remote Access, Lottery, E-commerce, Banking Fraud.  
  - Defined subcategories and verified dataset accuracy with public tagging.  

- **Model Development:**  
  - Preprocessed text using TF-IDF vectorization and lemmatization.  
  - Selected a **Naïve Bayes classifier**, achieving **96% accuracy, 95% recall**.  
  - Used label encoding to optimize computation.  
  - Split dataset (70/30) to prevent overfitting.  
  - Deployed model using **Hugging Face + Docker** for scalability.  

- **Real-Time Transcription & Detection:**  
  - Initial setup with Azure Speech AI (faced errors).  
  - Migrated to **Google Cloud Speech-to-Text** for better stability.  
  - Developing a **React Native frontend + Node.js backend** for real-time scam detection.  
  - Implemented WebSocket-based backend to process live audio streams.  

## 🎯 Next Steps  
- Finalize frontend (React Web or React Native based on audio compatibility).  
- Optimize backend to handle live scam probability detection.  
- Implement an **alert module** for user warnings and feedback collection.  
- Enhance model accuracy with real-time data and retraining.  

