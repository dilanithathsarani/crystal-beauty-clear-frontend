import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
        "https://ffsrbwooenxdcqmujayu.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmc3Jid29vZW54ZGNxbXVqYXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1OTc2ODksImV4cCI6MjA2MjE3MzY4OX0.UDqMHqLcQWPMCtwKjd3HlNt1YrIH0urTJ2P8pGOaFaY"
);

export default function mediaUpload(file){
    const promise = new Promise(
        (resolve,reject)=>{
            if(file == null){
                reject("No file selected")
            }
            const timeStamp = new Date().getTime()
            const newFileName = timeStamp+file.name

            supabase.storage.from("images").upload(newFileName, file, {
                cacheControl: "3600",
                upsert: false,
            }).then(
                ()=>{
                    const url = supabase.storage.from("images").getPublicUrl(newFileName).data.publicUrl
                    resolve(url)
                }
            ).catch(
                (error)=>{
                    console.log(error)
                    reject("File upload failed")
                }
            )
        }
    )

    return promise
}
