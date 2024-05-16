const returnData = async(modal) =>{
    const data = await modal.find();
    return data;    
}

module.exports = returnData;