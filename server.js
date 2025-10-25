let path=require("path");
let fs=require("fs");
let fastify=require("fastify")({ logger: false });
let fastifyStatic=require("@fastify/static");
let fastifyCors=require("@fastify/cors");
let PORT=8080;
let publicDir=path.join(__dirname, "public");
fastify.register(fastifyCors,{
    origin: "*",
});
fastify.register(fastifyStatic,{
    root: publicDir,
    prefix: "/",
    cacheControl: false,
    maxAge: 0,
    immutable: false,
});
fastify.get("/images.json/*", async (request, reply)=>{
    try{
        let urlPath=request.params["*"];
        let folderPath=path.join(publicDir, urlPath);
        if (!fs.existsSync(folderPath)){
            return reply.code(404).send({error: "Folder not found"});
        }
        let files=fs.readdirSync(folderPath).filter(file=>/\.(jpe?g|png|webp)$/i.test(file));
        reply.type("application/json").send(files);
    }
    catch (err){
        console.error("Error listing images:", err);
        reply.code(500).send({ error: "Server error" });
    }
});
fastify.setNotFoundHandler((request, reply)=>{
    let errorPagePath = path.join(publicDir, "error.html");
    if (fs.existsSync(errorPagePath)){
        reply.code(404).type("text/html").sendFile("error.html");
    }
    else{
        reply.code(404).type("text/plain").send("404 Not Found");
    }
});
fastify.setErrorHandler((error, request, reply)=>{
    request.log.error(error);
    reply.code(500).type("text/plain").send(`Server error: ${error.message}`);
});
let start=async()=>{
    try{
        await fastify.listen({port: PORT, host: "::"});
        console.log(`Server running at http://localhost:${PORT}`);
    }
    catch (err){
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};
start();