import express from 'express'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
const port = 3000
let isForm = false
let updateBlog = []
let blog =[]
let id = 1

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.get('/',(req,res)=>{
        res.render(__dirname + 'index.ejs',{
            blogLength:blog.length,
            blog:blog,
            isForm,
            updateBlog:updateBlog,
        })
})
app.post('/addNew',(req,res)=>{
    isForm = true
    res.redirect('/')
    
})
app.post('/submit',(req,res)=>{
    isForm = false;
    if(req.body.title !== '' && req.body.content !== ''){
        if(updateBlog.length !== 0){
            const index = blog.findIndex(page => page.id === updateBlog.id)
            blog[index].title = req.body.title
            blog[index].content = req.body.content
            updateBlog = []
        }else{
            req.body.id = id
            blog.unshift(req.body)
            id++
        }
    }
    res.redirect('/')
})

app.delete('/delete/:id',(req,res)=>{
    const postId = parseInt(req.params.id, 10)
    blog = blog.filter(page => page.id !== postId)
    res.redirect('/')
})
app.patch('/update/:id',(req,res)=>{
    isForm = true
    const postId = parseInt(req.params.id, 10)
    updateBlog = blog.find(page => page.id === postId)
    console.log(updateBlog)
    res.redirect('/')
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})