import type { APIRoute } from "astro";
import { getCollection, getEntries, getEntry } from "astro:content";
import { id } from "../../../../dist/server/chunks/first-post_2NrKQ1-b.mjs";

export const prerender = false  //le decimos que no sea generada de manera estatica en el build, necesito que sea generada cuando se hace una solicitud
 
export const GET:APIRoute = async({params, request}) => { 
    
    const url = new URL(request.url);
    
    const slug = url.searchParams.get('slug');
    // console.log(slug);
    
    
    
    //preguntamos si tenemos el slug
    if(slug){
        const post =await getEntry('blog',slug);
        
        if(post){
            return new Response(
                JSON.stringify(post),{
                    status:200,
                    headers:{
                        'Content-Type':'aplication/json'
                    },
                });  
        }
        return new Response(
            JSON.stringify(post),{
                status:400,
                headers:{
                    'Content-Type':'aplication/json'
                },
            });  
    }
    
    const posts = await getCollection('blog');




    console.log(request); //la request es toda la info que se esta solicitando

    return new Response(
        JSON.stringify(posts),{
            status:201,
            headers:{
                'Content-Type':'aplication/json'
            }
        });
}
