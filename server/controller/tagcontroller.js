const Tag = require("../models/Tagschema.js");

const tagcontroller = {
    getAllTags: (async(req, res) => {
        try {
            
            const tags = await Tag.find();
            if(tags.length>0){
            res.status(200).send({msg: "Tags founded", tags: tags})
            }else {
                res.status(404).send({msg: "No tags found"})
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({msg: "something went wrong"})
        }
    }),
    createTag: (async(req, res) => {
        const {name} = req.body;
        try {
            
            const tag =  new Tag({name});
            const result = await tag.save();
            console.log(result);
            if(result.id){
                res.status(200).send({msg: "Tag created", tag: tag})
            } else {
                res.status(500).send({msg: "something went wrong"})
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({msg: "something went wrong"})
        }

    }),
    getTag: (async(req, res) => {
        const {id} = req.params;
        try {
            let tag = await Tag.findById(id);
            if(tag){
            res.status(200).send({msg: "Tag foundeded", tag: tag})
            } else {
                res.status(404).send({msg: "No tag founded"})
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).send({msg: "something went wrong"})
        }
    }),
    updateTag: (async(req, res) => {
        const {id} = req.params;
        const {name} = req.body;

        try {
            
            const tag = await Tag.findByIdAndUpdate(id, {name: name});
            if(tag){
            res.status(200).send({msg: "Tag updated", tag: tag})
            } else {
                res.status(404).send({msg: "No tag updated"})
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({msg: "something went wrong"}) 
        }

    }),
    deleteTag: (async(req, res) => {
        const {id} = req.params;
        
        try {
            const tag = await Tag.findByIdAndDelete(id);
            console.log(tag);
            res.status(200).send({msg: "Tag deleted", tag: tag})
            
        } catch (error) {
            console.log(error)
            res.status(500).send({msg: "something went wrong"})
        }

    }),
}
module.exports = tagcontroller