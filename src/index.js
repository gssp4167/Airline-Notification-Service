const express=require('express');

const {ServerConfig,Logger}=require('./config');
const apiRoutes=require('./routes');

const mailsender=require('./config/email-config');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,async ()=>{
    console.log(`Successfully started the server on PORT: ${ServerConfig.PORT}`);
    // Logger.info("Successfully started the server",{msg:"success"});
    try {
        const response=await mailsender.sendMail({
            from:ServerConfig.GMAIL_EMAIL,
            to:'abc@gmail.com',
            subject:'Testing email api',
            text:'Email API working fine, sent by Gautham'
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
});
