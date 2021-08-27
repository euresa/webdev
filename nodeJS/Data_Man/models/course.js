"use strict";

const mongoose = require("mongoose"),
    {Schema} = require("mongoose");

var courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            requried: true
        },
        maxStudents: {
            type: Number,
            default: 0,
            min: [0, "COurse cannot have a negative number of students"]
        },
        cost: {
            type: Number,
            default: 0,
            min: [0, "Course cannot have a negative cost"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Course", courseSchema);