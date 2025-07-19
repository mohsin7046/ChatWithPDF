import { Worker } from 'bullmq';
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from '@langchain/core/documents';
import {PDFLoader} from '@langchain/community/document_loaders/fs/pdf'
import { CharacterTextSplitter } from "@langchain/textsplitters";

const worker = new Worker('file-upload-queue', async (job) => {
  try {
    console.log("the file is ",job.data);
    const data = JSON.parse(job.data);
  
    const loader = new PDFLoader(data.path);
    const docs = await loader.load();
    
    
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-large",
      apiKey:'YOUR_API_KEY'
    });

    console.log("Embeding",embeddings.model);
    
  
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
      url: 'http://localhost:6333',
      collectionName: "langchainjs-testing",
    });
    console.log("Vector",vectorStore);
    
    
    await vectorStore.addDocuments(docs);
    console.log("All documnet are added to the vectore store");
  } catch (error) {
    console.log(error)
  }
  
}, { concurrency: 1,connection:{
    host:"localhost",
    port:"6379"
} });