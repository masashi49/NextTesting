// サーバーサイドの処理を書く
import fetch from "node-fetch" // サーバー側で行うと意思表示

export const getAllPostData = async () => {
    const res = await fetch(new URL("https://jsonplaceholder.typicode.com/posts?_limit=10")) // postを取ってくる
    const posts = await res.json()
    return posts
}

export const getAllTasksData = async () => {
    const res = await fetch(new URL("https://jsonplaceholder.typicode.com/todos?_limit=10")) // taskを取ってくる
    const tasks = await res.json()
    return tasks
}

export const getAllPostIds = async () => {
    const res = await fetch(new URL("https://jsonplaceholder.typicode.com/posts?_limit=10")) // taskを取ってくる
    const posts = await res.json()
    return posts.map((post) => {
        params: {
            id:String(post.id)
        }
    })
    
}

export const getPostData = async (id:string) => {
    const res = await fetch(new URL(`https://jsonplaceholder.typicode.com/post/${id}`)) // postを取ってくる
    const posts = await res.json()
    return posts
}
