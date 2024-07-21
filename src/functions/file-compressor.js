const { app } = require('@azure/functions');
const path = require("path");
const fs = require('fs');
const { compress } = require('compress-pdf');

app.http('file-compressor', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const FilePathName = request.query.get('FilePathName');

        console.log("===================== FilePathName ===============================");
        console.log(FilePathName);
        console.log("==================================================================");

        //============================ File Compress Starts ============================

        const pdf = path.resolve(__dirname, 'Free_Test_PDF.pdf');
        
        let bufferData = fs.readFileSync(pdf);

        let Fistbuffer = await compress(bufferData);

        let buffer = await compress(Fistbuffer);

        const Resultantbase64String = buffer.toString('base64');

        //============================ File Compress Ends ==============================

        return { body: Resultantbase64String };
    }
});


  

  
