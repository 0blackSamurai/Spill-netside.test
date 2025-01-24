const tagcontroller = {
    getAllTags: (async(req, res) => {
        const tags = await Tag.find();
        if(tags.length>0){
        res.status(200).send({msg: "Tags founded", tags: tags})
        }else {
            res.status(404).send({msg: "No tags found"})
        }
    }),
    createTag: (async(req, res) => {
        const {name} = req.body;

        const tag =  new Tag({name});
        const result = await tag.save();
        console.log(result);
        if(result.id){
            res.status(200).send({msg: "Tag created", tag: tag})
        } else {
            res.status(500).send({msg: "something went wrong"})
        }
    }),
    getTag: ((req, res) => {
        const {id} = req.params;
    }),
    updateTag: ((req, res) => {
        const {id} = req.params;
    }),
    deleteTag: ((req, res) => {
        const {id} = req.params;
    }),
}
module.exports = tagcontroller