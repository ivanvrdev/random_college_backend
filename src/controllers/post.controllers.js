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

        const created = await (await newPost.save()).populate('author')

        res.status(201).json({
          message: 'Publicación creada correctamente!',
          type: 'success',
          post: created
        })

    } catch(e) {
        res.status(400).json({
          message: 'Error al crear publicación...',
          type: 'danger'
        })
        console.log('Error al crear publicación: ', e)
    }
}

export const getPublicPosts = async (req, res) => {
  try{
    const posts = await Post.find({type: 'público'})
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
  }catch(error){
    res.status(400).json({
      message: 'Error al obtener la lista de publicaciones'
    })
    console.log('Error al obtener la lista de publicaciones: ', error)
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
        // console.log(fields)

        const updated = await Post.findByIdAndUpdate(id, fields, {new: true})
        .populate('author')
        .populate('comments.author')

        res.status(201).json({
            message: 'Publicación actualizado correctamente!',
            post: updated,
            type: 'success'
        })
    } catch(e) {
        res.status(400).json({
            message: 'Error al actualizar publicación...',
            type: 'error'
        })
        console.log('Error al actualizar publicación: ', e)
    }
}

export const deletePost = async (req, res) => {
    try{
        const { id } = req.params

        await Post.findByIdAndDele1e(id)

        res.status(201).json({
            message: 'Publicación eliminado correctamente!',
            type: 'success'
        })
    }catch(e){
        res.status(400).json({
            message:  'Error al eliminar publicación...',
            type: 'danger'
        })
        console.log('Error al eliminar publicación: ', e)
    }
}