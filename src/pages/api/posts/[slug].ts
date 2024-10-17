import type { APIRoute, GetStaticPaths } from 'astro';
import { getEntry } from 'astro:content';

export const prerender = false; 
export const GET:APIRoute = async({params, request}) => {

    const  {slug} = params;
    const post=await getEntry('blog',slug as any);

   //Si el post no existe

   if (!post){
    return new Response(
        JSON.stringify(post),{
            status:400,
            headers:{
                'Content-Type': 'application/json',
            },
        }); 
   }


    return new Response(
        JSON.stringify(post),{
            status:200,
            headers:{
                'Content-Type': 'application/json',
            },
        
        })
}

// export const getStatiPaths:GetStaticPaths = async()=> {
//     return [
//             {
//             params:{slug:'first-posts'},

//             }
//     ];
// }