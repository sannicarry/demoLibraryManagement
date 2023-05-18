import Librarian from "../models/librarianModel";

const getLibrarianDetail = async (req, res) => {
    try {
        const librarianDetail = await Librarian.getLibrarianDetail();
        return res.status(200).json({
            message: 'OK',
            librarianDetail: librarianDetail
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        })
    }
}


module.exports = {
    getLibrarianDetail
}