import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { Queue } from 'bullmq';

const app = express();

const queue = new Queue('file-upload-queue',{connection:{
  host:"localhost",
  port:"6379"
}});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

app.use(express.json());
app.use(cors());

app.post('/upload/file', upload.single('file'), async (req, res) => { 
    if(req.file){
        console.log(req.file);
        await queue.add('file-ready', JSON.stringify({ 
          filename: req.file.originalname,
          destination: req.file.destination,
          path: req.file.path,
        }));
        res.status(200).json({ message: 'File uploaded successfully' });
    }else{
        res.status(400).json({ message: 'File not uploaded' });
    }
});


app.get('/chat', async (req, res) => {
  const userQuery = req.query.message;

  const embeddings = new OpenAIEmbeddings({
    model: 'text-embedding-3-small',
    apiKey: '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',
  });
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: 'http://localhost:6333',
      collectionName: 'langchainjs-testing',
    }
  );
  const ret = vectorStore.asRetriever({
    k: 2,
  });
  const result = await ret.invoke(userQuery);

  const SYSTEM_PROMPT = `
  You are helfull AI Assistant who answeres the user query based on the available context from PDF File.
  Context:
  ${JSON.stringify(result)}
  `;

  const chatResult = await client.chat.completions.create({
    model: 'gpt-4.1',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userQuery },
    ],
  });

  return res.json({
    message: chatResult.choices[0].message.content,
    docs: result,
  });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
