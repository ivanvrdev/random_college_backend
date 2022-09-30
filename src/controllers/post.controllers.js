import Post from '../models/post.model.js'

export const createPost = async (req, res) => {
    
    try {
        const {
            autor,
            type,
            classroom,
            content
        } = req.body

        const newPost = new Post({
            autor,
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

export const getPost = async (req, res) => {
    try {
        const posts = await Post.find({active: true})

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

export const updatePost = async (req, res) => {
    try {
        const {id, ...body} = req.body

        const updated = await Post.findByIdAndUpdate(id, body, {new: true})

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
        const {id} = req.body

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