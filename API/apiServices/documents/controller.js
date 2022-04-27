const Document = require('./model');

// Me voy a ahorrar DAO y DTO porque es super simple esta app
module.exports = {

    async getDocuments(req, res) {
        // Empieza en la page 0
        const page = parseInt((req.query.page || 0).toString(), 10);
        const limit = parseInt((req.query.limit || 10).toString(), 10);

        var filtro = {};
      
        /**
         * Query para filtrar si los documentos han sido archivados TRUE o si son new FALSE
         * en caso de no usarse este filtro devuelve toda la coleccion
         * req.query.filtro = true ->
         */
        if (req.query.filtro) filtro = {archiveDate: { $exists: req.query.filtro }}

        await Document.find(filtro).sort({'date' : 'desc'}).skip(page * limit).limit(limit).exec((err, docs) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(docs);
        });

    },

    async createDocument(req, res) {

        if (!req.body.title) return res.sendStatus(400);
        if (!req.body.description) return res.sendStatus(400);
        if (!req.body.content) return res.sendStatus(400);
        if (!req.body.author) return res.sendStatus(400);



        const doc = new Document({
            title: req.body.title,
            description: req.body.description,
            content: req.body.content,
            author: req.body.author
        })

        // La vuelta rapida para comprobar que funciona, no debería devolver el item subido
        return await doc.save(function (err) {
            if (err) return res.status(500).json(err)

            if (!err)
                return res.status(201).json(doc);
        });


    },

    async deleteDocument(req, res) {
        if (!req.params.id) return res.sendStatus(400);
        const id = req.params.id
        try {
            const doc = await Document.findById(req.params.id)
            if(doc!=null){
                // control completo de checkear si ha sido borrado
                doc.remove();
                return res.status(200).json({docBorrado:doc, mensaje:"Borrado con exito"});

            }
            return res.status(500).json({"mensaje": "No existe un dato con ese ID"}) // hacer control real

        } catch (err) {
            return res.status(500).json(err)

        }
    },

    async archivarDocument(req,res) {
        if (!req.params.id) return res.sendStatus(400);
        const id = req.params.id

        try{
            const doc = await Document.findByIdAndUpdate(id, { archiveDate: Date.now() });
            if(doc!=null){
                // control completo de checkear si ha sido modificado
                return res.status(200).json({docModificado:doc, mensaje:"Modificado con exito"});

            }
            return res.status(500).json({"mensaje": "No existe un dato con ese ID"}) // hacer control real
        }catch(err){
            console.log(err)
            return res.status(500).json(err)

        }
    }


















}
