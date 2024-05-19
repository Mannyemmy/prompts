import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET (read)

export const GET =async (req,{params})=>{
    try{
        await connectToDB();

        const prompt=await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt not found",{status:404});

        return new Response(JSON.stringify(prompt),{
            status: 200
        })
    }
    catch(err){
        return new Response("Failed to Fetch prompts",{status:500});
    }
}
//PATCH(update)
export const PATCH =async (req,{params})=>{
    const{prompt,tag}=await req.json();
    try{
        await connectToDB();

        const existingprompt=await Prompt.findById(params.id).populate('creator');
        if(!existingprompt) return new Response("Prompt not found",{status:404});

        existingprompt.prompt=prompt;
        existingprompt.tag=tag;
        
        await existingprompt.save();

        return new Response(JSON.stringify(existingprompt),{
            status: 200
        })
    }
    catch(err){
        return new Response("Failed to Fetch prompts",{status:500});
    }
}
//DELETE (delete)

export const DELETE =async (req,{params})=>{
    try{
        await connectToDB();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt deleted successfully",{
            status: 200
        })
    }
    catch(err){
        console.log(err)
        return new Response("Failed to Delete prompts",{status:500});
    }
}