EmbeddingGemma-300M is a lightweight, open text-embedding model from Google designed for efficient, on-device AI applications. Key features include multilingual support, flexible output dimensions, offline functionality, and high performance relative to its compact size. 
Key Features
Compact Size: The model has approximately 308 million parameters, making it small and efficient enough to run on consumer devices like phones, laptops, and desktops with less than 200MB of RAM when quantized.
On-Device & Offline Operation: It can generate embeddings locally on the device's hardware, ensuring sensitive user data remains private and secure without requiring an internet connection.
Multilingual Support: The model was trained on data in over 100 languages, enabling broad linguistic understanding for a wide range of global applications.
Flexible Output Dimensions (MRL): Utilizing Matryoshka Representation Learning (MRL), developers can customize the output embedding dimension from the full 768 down to 512, 256, or 128. This allows for a balance between performance, speed, and storage requirements.
High Performance: Despite its small size, it delivers state-of-the-art results on benchmarks (like MTEB) for models under 500M parameters and offers performance comparable to models double its size.
Efficient Architecture: It uses an encoder-style architecture with bidirectional attention, which is highly effective for retrieval tasks. It also supports a substantial 2048-token context window for processing longer documents.
Low Latency: It can generate embeddings very quickly, in under 22ms on an EdgeTPU, for fast and fluid application experiences. 
Primary Use Cases
The embeddings produced by EmbeddingGemma-300M are well-suited for various AI tasks: 
Semantic Search and Retrieval: Powering in-app search for personal files, emails, or documents without a network connection.
Retrieval-Augmented Generation (RAG): Integrating with other local language models (like Gemma 3n) to build efficient, private RAG pipelines.
Text Classification and Clustering: Grouping or labeling text data based on meaning, such as sentiment analysis or document organization.
Semantic Similarity: Assessing text similarity for tasks like recommendation systems or duplicate detection. 
For more technical details, you can refer to the official Google AI for Developers documentation or the model card. 

google
/
embeddinggemma-300m 

like
1.28k

Follow
Google
36.8k
Sentence Similarity
sentence-transformers
Safetensors
gemma3_text
feature-extraction
text-embeddings-inference

arxiv:
2509.20354

License:
gemma
Model card
Files and versions
xet
Community
35
Access EmbeddingGemma on Hugging Face
This repository is publicly accessible, but you have to accept the conditions to access its files and content.

To access EmbeddingGemma on Hugging Face, you’re required to review and agree to Google’s usage license. To do this, please ensure you’re logged in to Hugging Face and click below. Requests are processed immediately.

or
to review the conditions and access this model content.

EmbeddingGemma model card
Model Page: EmbeddingGemma

Resources and Technical Documentation:

Responsible Generative AI Toolkit
EmbeddingGemma on Kaggle
EmbeddingGemma on Vertex Model Garden
Terms of Use: Terms

Authors: Google DeepMind

Model Information
Description
EmbeddingGemma is a 300M parameter, state-of-the-art for its size, open embedding model from Google, built from Gemma 3 (with T5Gemma initialization) and the same research and technology used to create Gemini models. EmbeddingGemma produces vector representations of text, making it well-suited for search and retrieval tasks, including classification, clustering, and semantic similarity search. This model was trained with data in 100+ spoken languages.

The small size and on-device focus makes it possible to deploy in environments with limited resources such as mobile phones, laptops, or desktops, democratizing access to state of the art AI models and helping foster innovation for everyone.

For more technical details, refer to our paper: EmbeddingGemma: Powerful and Lightweight Text Representations.

Inputs and outputs
Input:

Text string, such as a question, a prompt, or a document to be embedded
Maximum input context length of 2048 tokens
Output:

Numerical vector representations of input text data
Output embedding dimension size of 768, with smaller options available (512, 256, or 128) via Matryoshka Representation Learning (MRL). MRL allows users to truncate the output embedding of size 768 to their desired size and then re-normalize for efficient and accurate representation.
Citation
@article{embedding_gemma_2025,
    title={EmbeddingGemma: Powerful and Lightweight Text Representations},
    author={Schechter Vera, Henrique* and Dua, Sahil* and Zhang, Biao and Salz, Daniel and Mullins, Ryan and Raghuram Panyam, Sindhu and Smoot, Sara and Naim, Iftekhar and Zou, Joe and Chen, Feiyang and Cer, Daniel and Lisak, Alice and Choi, Min and Gonzalez, Lucas and Sanseviero, Omar and Cameron, Glenn and Ballantyne, Ian and Black, Kat and Chen, Kaifeng and Wang, Weiyi and Li, Zhe and Martins, Gus and Lee, Jinhyuk and Sherwood, Mark and Ji, Juyeong and Wu, Renjie and Zheng, Jingxiao and Singh, Jyotinder and Sharma, Abheesht and Sreepat, Divya and Jain, Aashi and Elarabawy, Adham and Co, AJ and Doumanoglou, Andreas and Samari, Babak and Hora, Ben and Potetz, Brian and Kim, Dahun and Alfonseca, Enrique and Moiseev, Fedor and Han, Feng and Palma Gomez, Frank and Hernández Ábrego, Gustavo and Zhang, Hesen and Hui, Hui and Han, Jay and Gill, Karan and Chen, Ke and Chen, Koert and Shanbhogue, Madhuri and Boratko, Michael and Suganthan, Paul and Duddu, Sai Meher Karthik and Mariserla, Sandeep and Ariafar, Setareh and Zhang, Shanfeng and Zhang, Shijie and Baumgartner, Simon and Goenka, Sonam and Qiu, Steve and Dabral, Tanmaya and Walker, Trevor and Rao, Vikram and Khawaja, Waleed and Zhou, Wenlei and Ren, Xiaoqi and Xia, Ye and Chen, Yichang and Chen, Yi-Ting and Dong, Zhe and Ding, Zhongli and Visin, Francesco and Liu, Gaël and Zhang, Jiageng and Kenealy, Kathleen and Casbon, Michelle and Kumar, Ravin and Mesnard, Thomas and Gleicher, Zach and Brick, Cormac and Lacombe, Olivier and Roberts, Adam and Sung, Yunhsuan and Hoffmann, Raphael and Warkentin, Tris and Joulin, Armand and Duerig, Tom and Seyedhosseini, Mojtaba},
    publisher={Google DeepMind},
    year={2025},
    url={https://arxiv.org/abs/2509.20354}
}

Usage
These model weights are designed to be used with Sentence Transformers, using the Gemma 3 implementation from Hugging Face Transformers as the backbone.

First install the Sentence Transformers library:

pip install -U sentence-transformers

Then you can load this model and run inference.

from sentence_transformers import SentenceTransformer

# Download from the 🤗 Hub
model = SentenceTransformer("google/embeddinggemma-300m")

# Run inference with queries and documents
query = "Which planet is known as the Red Planet?"
documents = [
    "Venus is often called Earth's twin because of its similar size and proximity.",
    "Mars, known for its reddish appearance, is often referred to as the Red Planet.",
    "Jupiter, the largest planet in our solar system, has a prominent red spot.",
    "Saturn, famous for its rings, is sometimes mistaken for the Red Planet."
]
query_embeddings = model.encode_query(query)
document_embeddings = model.encode_document(documents)
print(query_embeddings.shape, document_embeddings.shape)
# (768,) (4, 768)

# Compute similarities to determine a ranking
similarities = model.similarity(query_embeddings, document_embeddings)
print(similarities)
# tensor([[0.3011, 0.6359, 0.4930, 0.4889]])

NOTE: EmbeddingGemma activations do not support float16. Please use float32 or bfloat16 as appropriate for your hardware.

Model Data
Training Dataset
This model was trained on a dataset of text data that includes a wide variety of sources totaling approximately 320 billion tokens. Here are the key components:

Web Documents: A diverse collection of web text ensures the model is exposed to a broad range of linguistic styles, topics, and vocabulary. The training dataset includes content in over 100 languages.
Code and Technical Documents: Exposing the model to code and technical documentation helps it learn the structure and patterns of programming languages and specialized scientific content, which improves its understanding of code and technical questions.
Synthetic and Task-Specific Data: Synthetically training data helps to teach the model specific skills. This includes curated data for tasks like information retrieval, classification, and sentiment analysis, which helps to fine-tune its performance for common embedding applications.
The combination of these diverse data sources is crucial for training a powerful multilingual embedding model that can handle a wide variety of different tasks and data formats.

Data Preprocessing
Here are the key data cleaning and filtering methods applied to the training data:

CSAM Filtering: Rigorous CSAM (Child Sexual Abuse Material) filtering was applied at multiple stages in the data preparation process to ensure the exclusion of harmful and illegal content.
Sensitive Data Filtering: As part of making Gemma pre-trained models safe and reliable, automated techniques were used to filter out certain personal information and other sensitive data from training sets.
Additional methods: Filtering based on content quality and safety in line with our policies.
Model Development
Hardware
EmbeddingGemma was trained using the latest generation of Tensor Processing Unit (TPU) hardware (TPUv5e), for more details refer to the Gemma 3 model card.

Software
Training was done using JAX and ML Pathways. For more details refer to the Gemma 3 model card.

Evaluation
Benchmark Results
The model was evaluated against a large collection of different datasets and metrics to cover different aspects of text understanding.

Full Precision Checkpoint
MTEB (Multilingual, v2)
Dimensionality	Mean (Task)	Mean (TaskType)
768d	61.15	54.31
512d	60.71	53.89
256d	59.68	53.01
128d	58.23	51.77
MTEB (English, v2)
Dimensionality	Mean (Task)	Mean (TaskType)
768d	69.67	65.11
512d	69.18	64.59
256d	68.37	64.02
128d	66.66	62.70
MTEB (Code, v1)
Dimensionality	Mean (Task)	Mean (TaskType)
768d	68.76	68.76
512d	68.48	68.48
256d	66.74	66.74
128d	62.96	62.96
QAT Checkpoints
MTEB (Multilingual, v2)
Quant config (dimensionality)	Mean (Task)	Mean (TaskType)
Q4_0 (768d)	60.62	53.61
Q8_0 (768d)	60.93	53.95
Mixed Precision* (768d)	60.69	53.82
MTEB (English, v2)
Quant config (dimensionality)	Mean (Task)	Mean (TaskType)
Q4_0 (768d)	69.31	64.65
Q8_0 (768d)	69.49	64.84
Mixed Precision* (768d)	69.32	64.82
MTEB (Code, v1)
Quant config (dimensionality)	Mean (Task)	Mean (TaskType)
Q4_0 (768d)	67.99	67.99
Q8_0 (768d)	68.70	68.70
Mixed Precision* (768d)	68.03	68.03
Note: QAT models are evaluated after quantization

* Mixed Precision refers to per-channel quantization with int4 for embeddings, feedforward, and projection layers, and int8 for attention (e4_a8_f4_p4).

Prompt Instructions
EmbeddingGemma can generate optimized embeddings for various use cases—such as document retrieval, question answering, and fact verification—or for specific input types—either a query or a document—using prompts that are prepended to the input strings. Query prompts follow the form task: {task description} | query: where the task description varies by the use case, with the default task description being search result. Document-style prompts follow the form title: {title | "none"} | text: where the title is either none (the default) or the actual title of the document. Note that providing a title, if available, will improve model performance for document prompts but may require manual formatting.

Use the following prompts based on your use case and input data type. These may already be available in the EmbeddingGemma configuration in your modeling framework of choice.


Use Case (task type enum)	
Descriptions	
Recommended Prompt

Retrieval (Query)	
Used to generate embeddings that are optimized for document search or information retrieval	
task: search result | query: {content}

Retrieval (Document)	
title: {title | "none"} | text: {content}

Question Answering	
task: question answering | query: {content}

Fact Verification	
task: fact checking | query: {content}

Classification	
Used to generate embeddings that are optimized to classify texts according to preset labels	
task: classification | query: {content}

Clustering	
Used to generate embeddings that are optimized to cluster texts based on their similarities	
task: clustering | query: {content}

Semantic Similarity	
Used to generate embeddings that are optimized to assess text similarity. This is not intended for retrieval use cases.	
task: sentence similarity | query: {content}

Code Retrieval	
Used to retrieve a code block based on a natural language query, such as sort an array or reverse a linked list. Embeddings of the code blocks are computed using retrieval_document.	
task: code retrieval | query: {content}
Usage and Limitations
These models have certain limitations that users should be aware of.

Intended Usage
Open embedding models have a wide range of applications across various industries and domains. The following list of potential uses is not comprehensive. The purpose of this list is to provide contextual information about the possible use-cases that the model creators considered as part of model training and development.

Semantic Similarity: Embeddings optimized to assess text similarity, such as recommendation systems and duplicate detection

Classification: Embeddings optimized to classify texts according to preset labels, such as sentiment analysis and spam detection

Clustering: Embeddings optimized to cluster texts based on their similarities, such as document organization, market research, and anomaly detection

Retrieval

Document: Embeddings optimized for document search, such as indexing articles, books, or web pages for search
Query: Embeddings optimized for general search queries, such as custom search
Code Query: Embeddings optimized for retrieval of code blocks based on natural language queries, such as code suggestions and search
Question Answering: Embeddings for questions in a question-answering system, optimized for finding documents that answer the question, such as chatbox.

Fact Verification: Embeddings for statements that need to be verified, optimized for retrieving documents that contain evidence supporting or refuting the statement, such as automated fact-checking systems.

Limitations
Training Data

The quality and diversity of the training data significantly influence the model's capabilities. Biases or gaps in the training data can lead to limitations in the model's responses.
The scope of the training dataset determines the subject areas the model can handle effectively.
Language Ambiguity and Nuance

Natural language is inherently complex. Models might struggle to grasp subtle nuances, sarcasm, or figurative language.
Ethical Considerations and Risks
Risks identified and mitigations:

Perpetuation of biases: It's encouraged to perform continuous monitoring (using evaluation metrics, human review) and the exploration of de-biasing techniques during model training, fine-tuning, and other use cases.
Misuse for malicious purposes: Technical limitations and developer and end-user education can help mitigate against malicious applications of embeddings. Educational resources and reporting mechanisms for users to flag misuse are provided. Prohibited uses of Gemma models are outlined in the Gemma Prohibited Use Policy.
Privacy violations: Models were trained on data filtered for removal of certain personal information and other sensitive data. Developers are encouraged to adhere to privacy regulations with privacy-preserving techniques.
Benefits
At the time of release, this family of models provides high-performance open embedding model implementations designed from the ground up for responsible AI development compared to similarly sized models. Using the benchmark evaluation metrics described in this document, these models have shown superior performance to other, comparably-sized open model alternatives.
Lanzamos el Gemma 3n con entrada de audio y optimizado para su uso en dispositivos cotidianos. Más información
 Se usó la API de Cloud Translation para traducir esta página.
Switch to English
Página principal
Gemma
Modelos
Documentos
¿Te resultó útil?

Enviar comentariosDescripción general del modelo EmbeddingGemma

content_copy



EmbeddingGemma es un modelo de incorporación de texto multilingüe con 308 millones de parámetros basado en Gemma 3. Está optimizado para su uso en dispositivos cotidianos, como teléfonos, laptops y tablets. El modelo produce representaciones numéricas del texto que se usarán para tareas posteriores, como la recuperación de información, la búsqueda de similitud semántica, la clasificación y la agrupación en clústeres.

EmbeddingGemma incluye las siguientes funciones clave:

Compatibilidad con varios idiomas: Amplia comprensión de datos lingüísticos, con entrenamiento en más de 100 idiomas
Dimensiones de salida flexibles: Personaliza tus dimensiones de salida de 768 a 128 para obtener un equilibrio entre velocidad y almacenamiento con el aprendizaje de representación de Matryoshka (MRL).
Contexto de 2,000 tokens: Contexto de entrada sustancial para procesar datos de texto y documentos directamente en tu hardware.
Eficiente en el almacenamiento: Ejecútalo con menos de 200 MB de RAM con cuantificación.
Baja latencia: Las incorporaciones generativas tardan menos de 22 ms en EdgeTPU, lo que permite crear aplicaciones rápidas y fluidas.
Sin conexión y seguro: Genera incorporaciones de documentos directamente en tu hardware. Funciona sin conexión a Internet para mantener seguros los datos sensibles.
Sugerencia: Implementa EmbeddingGemma con Gemma 3n para crear canalizaciones y chatbots de Generación mejorada por recuperación (RAG) que sean relevantes para el contexto y estén optimizados para dispositivos móviles. Consulta nuestro notebook de inicio rápido de RAG para comenzar.
Obtenerlo en Hugging Face Obtenerlo en Kaggle Acceder en Vertex

Al igual que con otros modelos de Gemma, EmbeddingGemma se proporciona con pesos abiertos y se licencia para un uso comercial responsable, lo que te permite ajustarlo y, luego, implementarlo en tus propios proyectos y aplicaciones.