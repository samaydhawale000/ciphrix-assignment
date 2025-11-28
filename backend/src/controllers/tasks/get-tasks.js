const Tasks = require("../../models/task-model");

const getTasks = async (request, response) => {
    try { 
        const { page, searchString } = request.body;

        let filter = {}
            if (searchString) {
                filter["$or"] = [
                    { name: { $regex: searchString, $options: "i" } },
                    { description: { $regex: searchString, $options: "i" } },
                    { status: { $regex: searchString, $options: "i" } },
                ];
            }
            if (page < 1) {
                page = 1;
            }
            const totalRecords = await Tasks.countDocuments(filter);
            const result = await Tasks.find(filter, {})
                .sort({ createdAt: -1 })
                .skip((page - 1) * 10)
                .limit(10);

        if (result?.length > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "list fetched successfully",
                totalPages:  Math.ceil(totalRecords / 10),
                result,
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Data not available."
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error?.message
        })
    }
};

module.exports = getTasks;
