const Document = require('./model');



// Me voy a ahorrar DAO y DTO porque es super simple esta app
module.exports = {

    async getDocuments(req, res) {
        // Empieza en la page 0
        const page = parseInt((req.query.page || 0).toString(), 10);
        const limit = parseInt((req.query.limit || 10).toString(), 10);

        var filtro = {};
        var sort = {'date' : 'desc'};
      
        /**
         * Query para filtrar si los documentos han sido archivados TRUE o si son new FALSE
         * en caso de no usarse este filtro devuelve toda la coleccion
         * req.query.filtro = true -> archiveDate Exists
         */
        if (req.query.filtro) 
        {
            filtro = {archiveDate: { $exists: req.query.filtro }}
            //Si es true ordenaremos por archiveDate
            if ( req.query.filtro == "true" )  sort = {'archiveDate' : 'desc'}; 
           
        }
       
        await Document.find(filtro).sort(sort).skip(page * limit).limit(limit).exec((err, docs) => {
            if (err) return res.status(500).json(err)
            return res.status(200).json(docs);
        });

    },

    async createDocument(req, res) {
        // Lo correcto no seria devolver asi la respuesta, pero lo dejo para desmotracion :)
        if (!req.body.title) return res.status(400).json({mensaje:"No ha llegado el title"});
        if (!req.body.description) return res.status(400).json({mensaje:"No ha llegado el description"});
        if (!req.body.content) return res.status(400).json({mensaje:"No ha llegado el content"});
        if (!req.body.author) return res.status(400).json({mensaje:"No ha llegado el author"});



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
