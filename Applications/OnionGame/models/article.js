"use strict";

const mongoose = require("mongoose"),
    {Schema} = require("mongoose");

var articleSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        real: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

articleSchema.methods.getInfo = function() {
    return `Title: ${this.title} Real: ${this.real}`;
};

module.exports = mongoose.model("Article", articleSchema);