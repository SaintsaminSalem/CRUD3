import Task from "../model/taskModel.js";


export const createTask = async (req, res) => {

    try {

        const {
            title,
            description
        } = req.body;


        // Controller validation
        if (!title) {

            return res.status(400).json({
                message: "Task title is required"
            });

        }


        // Create task after validation

        const task = await Task.create({

            title,

            description,

            user: req.user.id

        });


        res.status(201).json({

            message: "Task created successfully",

            task

        });


    } catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};

const tasks = await Task.find().populate("user");