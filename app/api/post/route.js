
import connectToDB from "@/lib/connectToDB";
import deleteImage from "@/lib/deleteImage";
import { Blog } from "@/models/Blog";



export const POST=async(req)=>{
    // const {title,content,banner,summary,author}=await req.json();
    try{
    await  connectToDB();
    const data=await req.json();
        
    const post=await Blog.create(data);
    // const blog=await Blog.populate(post,'author');
    return new Response(JSON.stringify({success:true}));
    }catch(error){
        
        return new Response(JSON.stringify({success:false}));
    }
}

export const GET=async()=>{
    try{
        await  connectToDB();
        const allBlogs=await Blog.find().populate("author").sort({createdAt:-1})
        return new Response(JSON.stringify(allBlogs));
    }catch(error){
        return new Response(JSON.stringify(error));
    }
}

export const DELETE=async(req)=>{
try {
    await  connectToDB();
    const {blogId,authorId,userId,delBanner}=await req.json();
   if(authorId!==userId)  return new Response(JSON.stringify({success:false,error}))
    let res=await Blog.findByIdAndDelete(blogId);
deleteImage(delBanner);
    return new Response({success:true})
} catch (error) {
    return new Response(JSON.stringify({success:false,error}))
}
}


export const PUT=async(req)=>{
try{
    await  connectToDB();
    const {blogId,blog}=await req.json();
    const updateBlog = await Blog.findByIdAndUpdate(blogId, {$set:{...blog}}, { new: true });
    return new Response({success:true});
}catch(error){
    return new Response({success:false});
}
}