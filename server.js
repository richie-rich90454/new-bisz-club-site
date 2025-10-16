let path=require("path");
let fs=require("fs");
let fastify=require("fastify")({logger: false});
let PORT=8080;
let publicDir=path.join(__dirname, "public");
let clubsJsonPath=path.join(__dirname, "clubs.json");
fastify.register(require("@fastify/static"),{
    root: publicDir,
    prefix: "/public/",
    cacheControl: false,
    maxAge: 0,
    immutable: false
});
fastify.get("/api/clubs", async (request, reply)=>{
    try{
        let data=await fs.promises.readFile(clubsJsonPath, "utf8");
        let json=JSON.parse(data);
        reply.send(json);
    }
    catch (err){
        reply.code(500).send({ error: "Failed to load clubs data" });
    }
});
fastify.setNotFoundHandler((request, reply)=>{
    reply.sendFile("error.html");
});
fastify.setErrorHandler((error, request, reply)=>{
    request.log.error(error);
    reply.code(500).type("text/plain").send(`Server error: ${error.message}`);
});
let start=async()=>{
    try{
        await fastify.listen({port: PORT, host: "::"});//Guys just for explanation, "::" refers to all subjects in both IPv4 and IPv6 and is basically a 0.0.0.0 for dual stack
        console.log(`Server running at http://localhost:${PORT}`);
    }
    catch (err){
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};
start();