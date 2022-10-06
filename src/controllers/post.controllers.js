import Post from '../models/post.model.js'

export const createPost = async (req, res) => {
    
    try {
        const {
            author,
            type,
            classroom,
            content
        } = req.body

        const newPost = new Post({
            author,
            type,
            classroom,
            content
        })

        await newPost.save()

        res.status(201).json({
            message: 'Publicación creado correctamente!'
        })

    } catch(e) {
        res.status(400).json({
            message: 'Error al crear publicación...'
        })
        console.log('Error al crear publicación: ', e)
    }
}

export const getPosts = async (req, res) => {
    try {

        const { author, type, classroom } = req.query

        const filters = {}

        if(author) filters.author = author
        if(type) filters.type = type
        if(classroom) filters.classroom = classroom

        const posts = await Post.find({...filters, active: true})
        .populate('author')
        .populate('comments.author')

        if(posts.length < 1) {
            res.status(404).json({
                message: 'No se ha encontrado ninguna publicación'
            })
            return
        }

        res.status(200).json({
            message: 'Lista de publicaciones',
            posts
        })

    }catch(e){
        res.status(400).json({
            message: 'Error al obtener la lista de publicaciones'
        })
        console.log('Error al obtener la lista de publicaciones: ', e)
    }
}

export const getPostById = async (req, res) => {
    try {

        const { id } = req.params

        const post = await Post.findById(id)
        .populate('author')
        .populate('comments.author')

        if(!post) {
            res.status(404).json({
                message: 'No se ha encontrado ninguna publicación'
            })
            return
        }

        res.status(200).json({
            message: 'Publicación encontrada',
            post
        })
    }catch(e){
        res.status(400).json({
            message: 'Error al obtener la lista de publicaciones'
        })
        console.log('Error al obtener la lista de publicaciones: ', e)
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params

        const fields = req.body

        const updated = await Post.findByIdAndUpdate(id, fields, {new: true})

        res.status(201).json({
            message: 'Publicación actualizado correctamente!',
            post: updated
        })
    } catch(e) {
        res.status(400).json({
            message: 'Error al actualizar publicación...'
        })
        console.log('Error al actualizar publicación: ', e)
    }
}

export const deletePost = async (req, res) => {
    try{
        const { id } = req.params

        await Post.findByIdAndDele1e(id)

        res.status(201).json({
            message: 'Publicación eliminado correctamente!'
        })
    }catch(e){
        res.status(400).json({
            message:  'Error al eliminar publicación...'
        })
        console.log('Error al eliminar publicación: ', e)
    }
}