import User from "../model/aid.model.js"

export const getAid=async (req, res)=>{
    try {
        const aid=await Aid.find();
        res.status(200).json(aid);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
}